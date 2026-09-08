"""
Версійовані міграції схеми.

Як це поєднано з `models.py`:

  • `models.py` описує **базову схему** — CREATE TABLE IF NOT EXISTS,
    CREATE INDEX IF NOT EXISTS і кілька ранніх ALTER-ів, які виконуються
    з перевіркою наявності колонки. Усе це ідемпотентне й проганяється
    щоразу на старті: на порожній базі створює структуру, на робочій —
    нічого не змінює.

  • цей файл — **усі зміни після переходу в production**. Номер останньої
    застосованої міграції лежить у таблиці schema_version, тому кожна
    виконується рівно один раз, скільки б разів бот не перезапустився.

Правило одне: **міграції ніколи не переписуються і не видаляються**.
Кожна нова зміна — новий рядок у кінці MIGRATIONS з номером на одиницю
більшим. Правити SQL уже випущеної міграції не можна: на робочому сервері
вона давно застосована, і зміна туди просто не доїде — бази розійдуться.

Перевіряти нову міграцію треба на копії бази, а не на бойовій:
    cp /var/lib/profitime-bot/bot.db /tmp/test.db && DB_PATH=/tmp/test.db python bot.py
"""

from __future__ import annotations

import logging
import sqlite3

logger = logging.getLogger(__name__)

# (номер, опис для лога, SQL-команди)
Migration = tuple[int, str, tuple[str, ...]]

MIGRATIONS: tuple[Migration, ...] = (
    (
        1,
        "Позначка про те, що користувач заблокував бота",
        (
            "ALTER TABLE users ADD COLUMN is_blocked INTEGER NOT NULL DEFAULT 0",
            "ALTER TABLE users ADD COLUMN blocked_at TEXT",
            "CREATE INDEX IF NOT EXISTS ix_users_blocked ON users(is_blocked)",
        ),
    ),
    (
        2,
        "Службова таблиця стану: heartbeat та інші позначки",
        (
            """
            CREATE TABLE IF NOT EXISTS bot_state (
                key        TEXT PRIMARY KEY,
                value      TEXT,
                updated_at TEXT NOT NULL
            )
            """,
        ),
    ),
    (
        3,
        "Журнал помилок — для щоденного звіту власниці",
        (
            """
            CREATE TABLE IF NOT EXISTS error_log (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                occurred_at TEXT NOT NULL,
                kind        TEXT NOT NULL,
                message     TEXT
            )
            """,
            "CREATE INDEX IF NOT EXISTS ix_error_log_at ON error_log(occurred_at)",
        ),
    ),
)

TARGET_VERSION: int = max(number for number, _, _ in MIGRATIONS)


def _current_version(conn: sqlite3.Connection) -> int:
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS schema_version (
            version    INTEGER PRIMARY KEY,
            applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
        """
    )
    row = conn.execute("SELECT MAX(version) AS v FROM schema_version").fetchone()
    return int(row["v"]) if row and row["v"] is not None else 0


def _column_exists(conn: sqlite3.Connection, table: str, column: str) -> bool:
    try:
        rows = conn.execute(f"PRAGMA table_info({table})")
    except sqlite3.OperationalError:
        return False
    return any(row["name"] == column for row in rows)


def _execute(conn: sqlite3.Connection, statement: str) -> None:
    """
    Виконати один крок міграції.

    ALTER TABLE … ADD COLUMN пропускається, якщо колонка вже на місці.
    Це страховка для баз, які встигли пожити до появи schema_version:
    там частина колонок уже додана старим механізмом із models.py,
    а версія не записана. Без цієї поблажки перше ж оновлення впало б
    на «duplicate column name» і бот не піднявся б.
    """
    normalized = " ".join(statement.split()).upper()
    if normalized.startswith("ALTER TABLE") and "ADD COLUMN" in normalized:
        parts = statement.split()
        table, column = parts[2], parts[5]
        if _column_exists(conn, table, column):
            logger.debug("Колонка %s.%s вже існує — крок пропущено", table, column)
            return

    conn.execute(statement)


def apply_migrations(conn: sqlite3.Connection) -> int:
    """
    Догнати схему до останньої версії. Повертає підсумкову версію.

    Кожна міграція йде однією транзакцією: або застосувалася повністю,
    або не застосувалася зовсім і номер версії не змінився. Проміжного
    «наполовину оновленого» стану бути не може.
    """
    version = _current_version(conn)

    if version >= TARGET_VERSION:
        logger.info("Схема БД актуальна (версія %s)", version)
        return version

    for number, description, statements in MIGRATIONS:
        if number <= version:
            continue

        conn.execute("BEGIN")
        try:
            for statement in statements:
                _execute(conn, statement)
            conn.execute("INSERT INTO schema_version(version) VALUES (?)", (number,))
            conn.execute("COMMIT")
        except Exception:
            conn.execute("ROLLBACK")
            logger.exception("Міграція %s («%s») не застосувалася", number, description)
            raise

        logger.info("Міграція %s застосована: %s", number, description)
        version = number

    return version
