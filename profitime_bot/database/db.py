"""
Подключение к SQLite и инициализация схемы.

Синхронный sqlite3 из стандартной библиотеки выносится в отдельный поток
через asyncio.to_thread — event loop aiogram при этом не блокируется,
а в зависимостях не появляется лишних пакетов.

Записи сериализуются глобальным замком: для одной студии этого заведомо
достаточно и полностью исключает гонки.
"""

from __future__ import annotations

import asyncio
import logging
import sqlite3
import threading
from pathlib import Path
from typing import Callable, TypeVar

import config
from database.migrations import apply_migrations
from database.models import INDEXES, MIGRATIONS, TABLES

logger = logging.getLogger(__name__)

# Шлях задається в config і на сервері вказує поза каталогом коду
# (/var/lib/profitime-bot/bot.db). Завдяки цьому `git pull` і deploy.sh
# фізично не можуть зачепити базу із заявками, а бекап знає єдине місце,
# де її шукати.
DB_PATH: Path = config.DB_PATH

_write_lock = threading.Lock()

T = TypeVar("T")


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=15, isolation_level=None)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA busy_timeout=8000")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def _run_sync(func: Callable[[sqlite3.Connection], T]) -> T:
    conn = _connect()
    try:
        return func(conn)
    finally:
        conn.close()


async def run(func: Callable[[sqlite3.Connection], T]) -> T:
    """Операция чтения в отдельном потоке."""
    return await asyncio.to_thread(_run_sync, func)


async def run_write(func: Callable[[sqlite3.Connection], T]) -> T:
    """Операция записи под глобальным замком."""

    def wrapped() -> T:
        with _write_lock:
            return _run_sync(func)

    return await asyncio.to_thread(wrapped)


async def init_db() -> None:
    """
    Підготувати базу до роботи.

    Три кроки, саме в такому порядку:
      1) базова схема з models.py — ідемпотентна, на робочій базі нічого
         не змінює, на порожній створює структуру;
      2) ранні ALTER-и звідти ж — залишок механізму, що діяв до появи
         версійованих міграцій;
      3) версійовані міграції — усе, що додано після переходу в production.
    """
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    def _init(conn: sqlite3.Connection) -> None:
        for statement in TABLES:
            conn.execute(statement)

        # Догоняем колонки, добавленные после первого релиза, — чтобы
        # обновление кода не требовало удалять рабочую базу с заявками.
        for table, column, statement in MIGRATIONS:
            existing = {row["name"] for row in conn.execute(f"PRAGMA table_info({table})")}
            if column not in existing:
                conn.execute(statement)
                logger.info("Міграція: до таблиці %s додано колонку %s", table, column)

        for statement in INDEXES:
            conn.execute(statement)

        apply_migrations(conn)

    await run_write(_init)
    logger.info("База даних готова: %s", DB_PATH)
