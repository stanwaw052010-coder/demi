"""
Схема БД и модели строк.

Бот не ведёт календарь свободного времени — источник правды по занятости
только Bookon. Поэтому таблица visits хранит не «слоты», а факты:
подтверждённые владелицей визиты с реальными датой и временем, которые
она внесла в Bookon. Именно из них считаются напоминания и прогресс курса.

Порядок применения при старте (database/db.py::init_db):
  1. TABLES      — CREATE TABLE IF NOT EXISTS
  2. MIGRATIONS  — колонки, добавленные после первого релиза
  3. INDEXES     — индексы (после миграций: опираются на новые колонки)
"""

from __future__ import annotations

import json
import sqlite3
from dataclasses import dataclass, field
from datetime import datetime

from utils import dt

# --------------------------------------------------------------------------- #
# Статусы заявки
# --------------------------------------------------------------------------- #

STATUS_PENDING = "pending"          # ждёт реакции владелицы
STATUS_CONFIRMED = "confirmed"      # подтверждена, время внесено в Bookon
STATUS_RESCHEDULED = "rescheduled"  # владелица предложила другое время
STATUS_DECLINED = "declined"        # отклонена
STATUS_DONE = "done"                # визит состоялся
STATUS_CANCELLED = "cancelled"      # клиент отменил сам

STATUS_TITLES: dict[str, str] = {
    STATUS_PENDING: "очікує відповіді",
    STATUS_CONFIRMED: "підтверджено",
    STATUS_RESCHEDULED: "запропоновано інший час",
    STATUS_DECLINED: "відхилено",
    STATUS_DONE: "візит відбувся",
    STATUS_CANCELLED: "скасовано клієнтом",
}

STATUS_EMOJI: dict[str, str] = {
    STATUS_PENDING: "🔔",
    STATUS_CONFIRMED: "✅",
    STATUS_RESCHEDULED: "🕐",
    STATUS_DECLINED: "❌",
    STATUS_DONE: "🏁",
    STATUS_CANCELLED: "🚫",
}

DIRECTION_EPILATION = "epil"
DIRECTION_REJUVENATION = "rejuv"
DIRECTION_CONSULT = "consult"

DIRECTION_TITLES: dict[str, str] = {
    DIRECTION_EPILATION: "Лазерна епіляція",
    DIRECTION_REJUVENATION: "Омолодження обличчя",
    DIRECTION_CONSULT: "Консультація",
}

# --------------------------------------------------------------------------- #
# Схема
# --------------------------------------------------------------------------- #

TABLES: tuple[str, ...] = (
    """
    CREATE TABLE IF NOT EXISTS users (
        user_id       INTEGER PRIMARY KEY,
        username      TEXT,
        full_name     TEXT,
        client_name   TEXT,
        phone         TEXT,
        referral_code TEXT UNIQUE,
        referred_by   INTEGER,
        bonus_note    TEXT,
        promo_optout  INTEGER NOT NULL DEFAULT 0,
        created_at    TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS requests (
        id                INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id           INTEGER NOT NULL,
        direction         TEXT NOT NULL,
        items             TEXT NOT NULL DEFAULT '[]',
        items_title       TEXT NOT NULL DEFAULT '',
        total_price       INTEGER NOT NULL DEFAULT 0,
        preferred_date    TEXT NOT NULL,
        preferred_window  TEXT NOT NULL,
        client_name       TEXT NOT NULL,
        phone             TEXT NOT NULL,
        comment           TEXT,
        referral_note     TEXT,
        status            TEXT NOT NULL DEFAULT 'pending',
        decline_reason    TEXT,
        proposed_datetime TEXT,
        confirmed_at      TEXT,
        admin_id          INTEGER,
        pending_reminded  INTEGER NOT NULL DEFAULT 0,
        created_at        TEXT NOT NULL,
        updated_at        TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS visits (
        id                    INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id               INTEGER,
        request_id            INTEGER,
        client_name           TEXT NOT NULL DEFAULT '',
        phone                 TEXT NOT NULL DEFAULT '',
        service_code          TEXT NOT NULL,
        service_title         TEXT NOT NULL,
        session_no            INTEGER NOT NULL DEFAULT 1,
        total_sessions        INTEGER NOT NULL DEFAULT 1,
        interval_days         INTEGER NOT NULL DEFAULT 30,
        visit_at              TEXT NOT NULL,
        reminded_24           INTEGER NOT NULL DEFAULT 0,
        reminded_2            INTEGER NOT NULL DEFAULT 0,
        course_reminders_sent INTEGER NOT NULL DEFAULT 0,
        created_at            TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS promotions (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        old_price   INTEGER,
        new_price   INTEGER,
        valid_until TEXT NOT NULL,
        active      INTEGER NOT NULL DEFAULT 1,
        created_at  TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS broadcasts (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id     INTEGER NOT NULL,
        text         TEXT NOT NULL,
        sent_count   INTEGER NOT NULL DEFAULT 0,
        failed_count INTEGER NOT NULL DEFAULT 0,
        created_at   TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS quiz_results (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id    INTEGER NOT NULL,
        answers    TEXT NOT NULL DEFAULT '{}',
        verdict    TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
    """,
)

# Формат: (таблица, колонка, SQL для добавления).
MIGRATIONS: tuple[tuple[str, str, str], ...] = ()

INDEXES: tuple[str, ...] = (
    "CREATE INDEX IF NOT EXISTS ix_requests_status ON requests(status, created_at)",
    "CREATE INDEX IF NOT EXISTS ix_requests_user ON requests(user_id, status)",
    "CREATE INDEX IF NOT EXISTS ix_visits_user ON visits(user_id, service_code)",
    "CREATE INDEX IF NOT EXISTS ix_visits_at ON visits(visit_at)",
    "CREATE INDEX IF NOT EXISTS ix_users_ref ON users(referral_code)",
    "CREATE INDEX IF NOT EXISTS ix_promotions_active ON promotions(active, valid_until)",
)


# --------------------------------------------------------------------------- #
# Модели
# --------------------------------------------------------------------------- #


@dataclass(slots=True)
class User:
    user_id: int
    username: str | None
    full_name: str | None
    client_name: str | None
    phone: str | None
    referral_code: str
    referred_by: int | None
    bonus_note: str | None
    promo_optout: bool
    created_at: str

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "User":
        return cls(
            user_id=row["user_id"],
            username=row["username"],
            full_name=row["full_name"],
            client_name=row["client_name"],
            phone=row["phone"],
            referral_code=row["referral_code"] or "",
            referred_by=row["referred_by"],
            bonus_note=row["bonus_note"],
            promo_optout=bool(row["promo_optout"]),
            created_at=row["created_at"],
        )


@dataclass(slots=True)
class Request:
    id: int
    user_id: int
    direction: str
    items: list[str] = field(default_factory=list)
    items_title: str = ""
    total_price: int = 0
    preferred_date: str = ""
    preferred_window: str = ""
    client_name: str = ""
    phone: str = ""
    comment: str | None = None
    referral_note: str | None = None
    status: str = STATUS_PENDING
    decline_reason: str | None = None
    proposed_datetime: datetime | None = None
    confirmed_at: datetime | None = None
    admin_id: int | None = None
    pending_reminded: bool = False
    created_at: str = ""
    updated_at: str = ""

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "Request":
        try:
            items = json.loads(row["items"] or "[]")
        except (json.JSONDecodeError, TypeError):
            items = []

        return cls(
            id=row["id"],
            user_id=row["user_id"],
            direction=row["direction"],
            items=items if isinstance(items, list) else [],
            items_title=row["items_title"] or "",
            total_price=row["total_price"] or 0,
            preferred_date=row["preferred_date"] or "",
            preferred_window=row["preferred_window"] or "",
            client_name=row["client_name"] or "",
            phone=row["phone"] or "",
            comment=row["comment"],
            referral_note=row["referral_note"],
            status=row["status"],
            decline_reason=row["decline_reason"],
            proposed_datetime=dt.from_db(row["proposed_datetime"]) if row["proposed_datetime"] else None,
            confirmed_at=dt.from_db(row["confirmed_at"]) if row["confirmed_at"] else None,
            admin_id=row["admin_id"],
            pending_reminded=bool(row["pending_reminded"]),
            created_at=row["created_at"],
            updated_at=row["updated_at"],
        )


@dataclass(slots=True)
class Visit:
    id: int
    user_id: int | None
    request_id: int | None
    client_name: str
    phone: str
    service_code: str
    service_title: str
    session_no: int
    total_sessions: int
    interval_days: int
    visit_at: datetime
    reminded_24: bool
    reminded_2: bool
    course_reminders_sent: int
    created_at: str

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "Visit":
        return cls(
            id=row["id"],
            user_id=row["user_id"],
            request_id=row["request_id"],
            client_name=row["client_name"] or "",
            phone=row["phone"] or "",
            service_code=row["service_code"],
            service_title=row["service_title"],
            session_no=row["session_no"],
            total_sessions=row["total_sessions"],
            interval_days=row["interval_days"],
            visit_at=dt.from_db(row["visit_at"]),
            reminded_24=bool(row["reminded_24"]),
            reminded_2=bool(row["reminded_2"]),
            course_reminders_sent=row["course_reminders_sent"],
            created_at=row["created_at"],
        )


@dataclass(slots=True)
class Promotion:
    id: int
    title: str
    description: str
    old_price: int | None
    new_price: int | None
    valid_until: str
    active: bool
    created_at: str

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "Promotion":
        return cls(
            id=row["id"],
            title=row["title"],
            description=row["description"] or "",
            old_price=row["old_price"],
            new_price=row["new_price"],
            valid_until=row["valid_until"],
            active=bool(row["active"]),
            created_at=row["created_at"],
        )
