"""
Доступ к SQLite.

Синхронный sqlite3 из стандартной библиотеки выносится в отдельный поток
через asyncio.to_thread — event loop aiogram при этом не блокируется,
а в зависимостях не появляется лишних пакетов.

Записи сериализуются глобальным замком + BEGIN IMMEDIATE: для одного мастера
это заведомо достаточно и полностью исключает гонки при бронировании.
"""

from __future__ import annotations

import asyncio
import logging
import sqlite3
import threading
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Literal, NamedTuple, TypeVar

import config
from database.models import (
    CANCELLED_BY_CLIENT,
    MIGRATIONS,
    SCHEMA,
    STATUS_ACTIVE,
    STATUS_CANCELLED,
    STATUS_DONE,
    Block,
    Booking,
)
from utils import dt

logger = logging.getLogger(__name__)

DB_PATH: Path = Path(__file__).resolve().parent.parent / "bot.db"

_write_lock = threading.Lock()

T = TypeVar("T")

CreateStatus = Literal["ok", "busy", "limit"]


class CreateResult(NamedTuple):
    """Результат попытки создать запись."""

    status: CreateStatus
    booking: Booking | None = None


# --------------------------------------------------------------------------- #
# Инфраструктура
# --------------------------------------------------------------------------- #


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


async def _run(func: Callable[[sqlite3.Connection], T]) -> T:
    """Выполнить операцию чтения в отдельном потоке."""
    return await asyncio.to_thread(_run_sync, func)


async def _run_write(func: Callable[[sqlite3.Connection], T]) -> T:
    """Выполнить операцию записи под глобальным замком."""

    def wrapped() -> T:
        with _write_lock:
            return _run_sync(func)

    return await asyncio.to_thread(wrapped)


async def init_db() -> None:
    """Создать файл БД и схему, если их ещё нет, и догнать миграции."""

    def _init(conn: sqlite3.Connection) -> None:
        for statement in SCHEMA:
            conn.execute(statement)

        # Догоняем колонки, добавленные после первого релиза, — чтобы
        # обновление кода не требовало удалять рабочую базу с записями.
        for table, column, statement in MIGRATIONS:
            existing = {row["name"] for row in conn.execute(f"PRAGMA table_info({table})")}
            if column not in existing:
                conn.execute(statement)
                logger.info("Міграція: до таблиці %s додано колонку %s", table, column)

    await _run_write(_init)
    logger.info("База даних готова: %s", DB_PATH)


# --------------------------------------------------------------------------- #
# Записи: создание
# --------------------------------------------------------------------------- #


def _has_overlap(conn: sqlite3.Connection, start: str, end: str) -> bool:
    """Есть ли активная запись или блокировка, пересекающая интервал."""
    row = conn.execute(
        "SELECT 1 FROM bookings WHERE status = ? AND start_at < ? AND end_at > ? LIMIT 1",
        (STATUS_ACTIVE, end, start),
    ).fetchone()
    if row is not None:
        return True
    row = conn.execute(
        "SELECT 1 FROM blocked WHERE start_at < ? AND end_at > ? LIMIT 1",
        (end, start),
    ).fetchone()
    return row is not None


async def create_booking(
    *,
    user_id: int,
    username: str | None,
    client_name: str,
    phone: str,
    category_code: str,
    service_code: str,
    service_name: str,
    price: int,
    duration: int,
    start_at: datetime,
    end_at: datetime,
) -> CreateResult:
    """
    Создать запись в одной транзакции.

    Внутри BEGIN IMMEDIATE ещё раз проверяются: лимит активных записей,
    пересечение с чужими записями и с блокировками мастера. Если между
    показом слотов и подтверждением время успели занять — вернётся "busy".
    """

    start_db = dt.to_db(start_at)
    end_db = dt.to_db(end_at)
    now_db = dt.to_db(dt.now())

    def _create(conn: sqlite3.Connection) -> CreateResult:
        conn.execute("BEGIN IMMEDIATE")
        try:
            active = conn.execute(
                "SELECT COUNT(*) AS n FROM bookings "
                "WHERE user_id = ? AND status = ? AND start_at > ?",
                (user_id, STATUS_ACTIVE, now_db),
            ).fetchone()["n"]
            if active >= config.MAX_ACTIVE_BOOKINGS:
                conn.execute("ROLLBACK")
                return CreateResult("limit")

            if _has_overlap(conn, start_db, end_db):
                conn.execute("ROLLBACK")
                return CreateResult("busy")

            cursor = conn.execute(
                """
                INSERT INTO bookings (
                    user_id, username, client_name, phone,
                    category_code, service_code, service_name,
                    price, duration, start_at, end_at,
                    status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user_id, username, client_name, phone,
                    category_code, service_code, service_name,
                    price, duration, start_db, end_db,
                    STATUS_ACTIVE, now_db,
                ),
            )
            booking_id = cursor.lastrowid
            conn.execute("COMMIT")
        except sqlite3.IntegrityError:
            # Сработал UNIQUE-индекс ux_active_slot — слот заняли параллельно.
            conn.execute("ROLLBACK")
            logger.info("Конфликт слота %s — запись отклонена БД", start_db)
            return CreateResult("busy")
        except sqlite3.Error:
            conn.execute("ROLLBACK")
            raise

        row = conn.execute("SELECT * FROM bookings WHERE id = ?", (booking_id,)).fetchone()
        return CreateResult("ok", Booking.from_row(row))

    return await _run_write(_create)


# --------------------------------------------------------------------------- #
# Записи: чтение
# --------------------------------------------------------------------------- #


async def get_booking(booking_id: int) -> Booking | None:
    def _get(conn: sqlite3.Connection) -> Booking | None:
        row = conn.execute("SELECT * FROM bookings WHERE id = ?", (booking_id,)).fetchone()
        return Booking.from_row(row) if row else None

    return await _run(_get)


async def get_user_active_bookings(user_id: int) -> list[Booking]:
    """Будущие активные записи конкретного пользователя."""
    now_db = dt.to_db(dt.now())

    def _get(conn: sqlite3.Connection) -> list[Booking]:
        rows = conn.execute(
            "SELECT * FROM bookings WHERE user_id = ? AND status = ? AND start_at > ? "
            "ORDER BY start_at",
            (user_id, STATUS_ACTIVE, now_db),
        ).fetchall()
        return [Booking.from_row(row) for row in rows]

    return await _run(_get)


async def get_bookings_between(start: datetime, end: datetime) -> list[Booking]:
    """Активные записи, начинающиеся в интервале [start, end)."""
    start_db, end_db = dt.to_db(start), dt.to_db(end)

    def _get(conn: sqlite3.Connection) -> list[Booking]:
        rows = conn.execute(
            "SELECT * FROM bookings WHERE status = ? AND start_at >= ? AND start_at < ? "
            "ORDER BY start_at",
            (STATUS_ACTIVE, start_db, end_db),
        ).fetchall()
        return [Booking.from_row(row) for row in rows]

    return await _run(_get)


async def get_busy_intervals(start: datetime, end: datetime) -> list[tuple[datetime, datetime]]:
    """
    Все занятые интервалы, пересекающие [start, end): чужие записи + блокировки.

    Используется генератором слотов.
    """
    start_db, end_db = dt.to_db(start), dt.to_db(end)

    def _get(conn: sqlite3.Connection) -> list[tuple[datetime, datetime]]:
        rows = conn.execute(
            """
            SELECT start_at, end_at FROM bookings
             WHERE status = ? AND start_at < ? AND end_at > ?
            UNION ALL
            SELECT start_at, end_at FROM blocked
             WHERE start_at < ? AND end_at > ?
            """,
            (STATUS_ACTIVE, end_db, start_db, end_db, start_db),
        ).fetchall()
        return [(dt.from_db(row["start_at"]), dt.from_db(row["end_at"])) for row in rows]

    return await _run(_get)


async def count_active_in_range(start: datetime, end: datetime) -> int:
    """Сколько активных записей попадает в интервал — нужно перед блокировкой времени."""
    start_db, end_db = dt.to_db(start), dt.to_db(end)

    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute(
            "SELECT COUNT(*) AS n FROM bookings "
            "WHERE status = ? AND start_at < ? AND end_at > ?",
            (STATUS_ACTIVE, end_db, start_db),
        ).fetchone()["n"]

    return await _run(_count)


# --------------------------------------------------------------------------- #
# Записи: отмена и служебные обновления
# --------------------------------------------------------------------------- #


async def cancel_booking(
    booking_id: int,
    *,
    by: str,
    only_user_id: int | None = None,
) -> Booking | None:
    """
    Отменить активную запись.

    only_user_id — защита от отмены чужой записи клиентом.
    Возвращает отменённую запись или None, если отменять было нечего.
    """

    def _cancel(conn: sqlite3.Connection) -> Booking | None:
        conn.execute("BEGIN IMMEDIATE")
        try:
            query = "SELECT * FROM bookings WHERE id = ? AND status = ?"
            params: list[Any] = [booking_id, STATUS_ACTIVE]
            if only_user_id is not None:
                query += " AND user_id = ?"
                params.append(only_user_id)

            row = conn.execute(query, params).fetchone()
            if row is None:
                conn.execute("ROLLBACK")
                return None

            conn.execute(
                "UPDATE bookings SET status = ?, cancelled_by = ? WHERE id = ?",
                (STATUS_CANCELLED, by, booking_id),
            )
            conn.execute("COMMIT")
        except sqlite3.Error:
            conn.execute("ROLLBACK")
            raise

        booking = Booking.from_row(row)
        booking.status = STATUS_CANCELLED
        booking.cancelled_by = by
        return booking

    return await _run_write(_cancel)


async def mark_reminded(booking_id: int, *, kind_24: bool = False, kind_2: bool = False) -> None:
    """Отметить, что напоминание отправлено (переживает перезапуск бота)."""
    fields: list[str] = []
    if kind_24:
        fields.append("reminded_24 = 1")
    if kind_2:
        fields.append("reminded_2 = 1")
    if not fields:
        return

    sql = f"UPDATE bookings SET {', '.join(fields)} WHERE id = ?"

    def _mark(conn: sqlite3.Connection) -> None:
        conn.execute(sql, (booking_id,))

    await _run_write(_mark)


async def get_followup_candidates(oldest: datetime, newest: datetime) -> list[Booking]:
    """
    Завершённые визиты, по которым ещё не предлагали записаться снова.

    Берём окно [oldest, newest]: слишком старые визиты не трогаем вообще,
    чтобы бот не написал клиентке про процедуру полугодовой давности.
    """
    oldest_db, newest_db = dt.to_db(oldest), dt.to_db(newest)

    def _get(conn: sqlite3.Connection) -> list[Booking]:
        rows = conn.execute(
            "SELECT * FROM bookings "
            " WHERE status = ? AND followup_sent = 0 AND end_at BETWEEN ? AND ? "
            " ORDER BY end_at",
            (STATUS_DONE, oldest_db, newest_db),
        ).fetchall()
        return [Booking.from_row(row) for row in rows]

    return await _run(_get)


async def get_last_visit_end(user_id: int) -> datetime | None:
    """
    Когда клиентка была у мастера в последний раз (или записана в будущем).

    Нужно, чтобы предложение записаться снова уходило только по самому
    свежему визиту, а не по каждому старому подряд.
    """

    def _get(conn: sqlite3.Connection) -> datetime | None:
        row = conn.execute(
            "SELECT MAX(end_at) AS last FROM bookings WHERE user_id = ? AND status IN (?, ?)",
            (user_id, STATUS_DONE, STATUS_ACTIVE),
        ).fetchone()
        return dt.from_db(row["last"]) if row and row["last"] else None

    return await _run(_get)


async def mark_followup_sent(booking_ids: list[int]) -> None:
    """Отметить визиты как отработанные — повторно предлагать по ним не будем."""
    if not booking_ids:
        return

    placeholders = ", ".join("?" for _ in booking_ids)
    sql = f"UPDATE bookings SET followup_sent = 1 WHERE id IN ({placeholders})"

    def _mark(conn: sqlite3.Connection) -> None:
        conn.execute(sql, booking_ids)

    await _run_write(_mark)


async def close_past_bookings() -> int:
    """Перевести прошедшие активные записи в статус done. Возвращает их количество."""
    now_db = dt.to_db(dt.now())

    def _close(conn: sqlite3.Connection) -> int:
        cursor = conn.execute(
            "UPDATE bookings SET status = ? WHERE status = ? AND end_at <= ?",
            (STATUS_DONE, STATUS_ACTIVE, now_db),
        )
        return cursor.rowcount

    return await _run_write(_close)


# --------------------------------------------------------------------------- #
# Недоступное время мастера
# --------------------------------------------------------------------------- #


async def add_block(start: datetime, end: datetime, reason: str | None) -> int:
    start_db, end_db = dt.to_db(start), dt.to_db(end)
    created = dt.to_db(dt.now())

    def _add(conn: sqlite3.Connection) -> int:
        cursor = conn.execute(
            "INSERT INTO blocked (start_at, end_at, reason, created_at) VALUES (?, ?, ?, ?)",
            (start_db, end_db, reason, created),
        )
        return int(cursor.lastrowid)

    return await _run_write(_add)


async def get_blocks(since: datetime | None = None) -> list[Block]:
    """Блокировки, которые ещё не закончились."""
    boundary = dt.to_db(since or dt.now())

    def _get(conn: sqlite3.Connection) -> list[Block]:
        rows = conn.execute(
            "SELECT * FROM blocked WHERE end_at > ? ORDER BY start_at",
            (boundary,),
        ).fetchall()
        return [Block.from_row(row) for row in rows]

    return await _run(_get)


async def delete_block(block_id: int) -> bool:
    def _delete(conn: sqlite3.Connection) -> bool:
        cursor = conn.execute("DELETE FROM blocked WHERE id = ?", (block_id,))
        return cursor.rowcount > 0

    return await _run_write(_delete)


async def delete_past_blocks() -> int:
    """Убрать блокировки, которые уже в прошлом, чтобы таблица не росла."""
    now_db = dt.to_db(dt.now())

    def _delete(conn: sqlite3.Connection) -> int:
        cursor = conn.execute("DELETE FROM blocked WHERE end_at <= ?", (now_db,))
        return cursor.rowcount

    return await _run_write(_delete)


__all__ = [
    "CANCELLED_BY_CLIENT",
    "CreateResult",
    "DB_PATH",
    "add_block",
    "cancel_booking",
    "close_past_bookings",
    "count_active_in_range",
    "create_booking",
    "delete_block",
    "delete_past_blocks",
    "get_blocks",
    "get_booking",
    "get_bookings_between",
    "get_busy_intervals",
    "get_followup_candidates",
    "get_user_active_bookings",
    "init_db",
    "mark_followup_sent",
    "mark_reminded",
]
