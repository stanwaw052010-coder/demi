"""
Схема БД и модели строк.

Ключевой момент защиты от двойного бронирования — частичный UNIQUE-индекс
ux_active_slot: на один и тот же момент начала не может существовать двух
активных записей. Это гарантия на уровне SQLite, а не на уровне кода.
Пересечение по длительности дополнительно проверяется в транзакции
(см. database/db.py::create_booking).
"""

from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from datetime import datetime

from utils import dt

SCHEMA: tuple[str, ...] = (
    """
    CREATE TABLE IF NOT EXISTS bookings (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id       INTEGER NOT NULL,
        username      TEXT,
        client_name   TEXT    NOT NULL,
        phone         TEXT    NOT NULL,
        category_code TEXT    NOT NULL,
        service_code  TEXT    NOT NULL,
        service_name  TEXT    NOT NULL,
        price         INTEGER NOT NULL,
        duration      INTEGER NOT NULL,
        start_at      TEXT    NOT NULL,
        end_at        TEXT    NOT NULL,
        status        TEXT    NOT NULL DEFAULT 'active',
        cancelled_by  TEXT,
        reminded_24   INTEGER NOT NULL DEFAULT 0,
        reminded_2    INTEGER NOT NULL DEFAULT 0,
        followup_sent INTEGER NOT NULL DEFAULT 0,
        created_at    TEXT    NOT NULL
    )
    """,
    # Один активный запис на один момент времени — гарантия уровня БД.
    """
    CREATE UNIQUE INDEX IF NOT EXISTS ux_active_slot
        ON bookings(start_at) WHERE status = 'active'
    """,
    "CREATE INDEX IF NOT EXISTS ix_bookings_user ON bookings(user_id, status)",
    "CREATE INDEX IF NOT EXISTS ix_bookings_start ON bookings(start_at, status)",
    """
    CREATE TABLE IF NOT EXISTS blocked (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        start_at   TEXT NOT NULL,
        end_at     TEXT NOT NULL,
        reason     TEXT,
        created_at TEXT NOT NULL
    )
    """,
    "CREATE INDEX IF NOT EXISTS ix_blocked_start ON blocked(start_at)",
)

# Колонки, добавленные после первого релиза. Применяются к уже существующему
# bot.db, если их там ещё нет: обновление кода не ломает рабочую базу.
# Формат: (таблица, колонка, SQL для добавления).
MIGRATIONS: tuple[tuple[str, str, str], ...] = (
    (
        "bookings",
        "followup_sent",
        "ALTER TABLE bookings ADD COLUMN followup_sent INTEGER NOT NULL DEFAULT 0",
    ),
)

STATUS_ACTIVE = "active"
STATUS_CANCELLED = "cancelled"
STATUS_DONE = "done"

CANCELLED_BY_CLIENT = "client"
CANCELLED_BY_MASTER = "master"


@dataclass(slots=True)
class Booking:
    """Одна запись клиента."""

    id: int
    user_id: int
    username: str | None
    client_name: str
    phone: str
    category_code: str
    service_code: str
    service_name: str
    price: int
    duration: int
    start_at: datetime
    end_at: datetime
    status: str
    cancelled_by: str | None
    reminded_24: bool
    reminded_2: bool
    followup_sent: bool
    created_at: str

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "Booking":
        return cls(
            id=row["id"],
            user_id=row["user_id"],
            username=row["username"],
            client_name=row["client_name"],
            phone=row["phone"],
            category_code=row["category_code"],
            service_code=row["service_code"],
            service_name=row["service_name"],
            price=row["price"],
            duration=row["duration"],
            start_at=dt.from_db(row["start_at"]),
            end_at=dt.from_db(row["end_at"]),
            status=row["status"],
            cancelled_by=row["cancelled_by"],
            reminded_24=bool(row["reminded_24"]),
            reminded_2=bool(row["reminded_2"]),
            followup_sent=bool(row["followup_sent"]),
            created_at=row["created_at"],
        )


@dataclass(slots=True)
class Block:
    """Интервал, помеченный мастером как недоступный."""

    id: int
    start_at: datetime
    end_at: datetime
    reason: str | None
    created_at: str

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "Block":
        return cls(
            id=row["id"],
            start_at=dt.from_db(row["start_at"]),
            end_at=dt.from_db(row["end_at"]),
            reason=row["reason"],
            created_at=row["created_at"],
        )
