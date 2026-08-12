"""
Все запросы к базе.

Слой между хендлерами и SQLite: хендлеры не пишут SQL, а зовут функции
отсюда. Время передаётся и возвращается объектами datetime, в базе лежит
строками локального времени (см. utils/dt.py).
"""

from __future__ import annotations

import json
import logging
import random
import sqlite3
import string
from datetime import datetime, timedelta

import config
from database.db import run, run_write
from database.models import (
    STATUS_CONFIRMED,
    STATUS_DECLINED,
    STATUS_DONE,
    STATUS_PENDING,
    STATUS_RESCHEDULED,
    Promotion,
    Request,
    User,
    Visit,
)
from utils import dt

logger = logging.getLogger(__name__)

REFERRAL_PREFIX = "PT"
REFERRAL_ALPHABET = string.ascii_uppercase + string.digits


# --------------------------------------------------------------------------- #
# Пользователи
# --------------------------------------------------------------------------- #


def _new_referral_code() -> str:
    tail = "".join(random.choices(REFERRAL_ALPHABET, k=5))
    return f"{REFERRAL_PREFIX}{tail}"


async def ensure_user(user_id: int, username: str | None, full_name: str | None) -> User:
    """
    Вернуть пользователя, создав его при первом обращении.

    Реферальный код выдаётся сразу — чтобы кнопка «Приведи подругу»
    работала без отдельного шага регистрации.
    """
    now_db = dt.to_db(dt.now())

    def _ensure(conn: sqlite3.Connection) -> User:
        row = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
        if row is not None:
            # Профиль в Telegram мог измениться — держим его актуальным.
            conn.execute(
                "UPDATE users SET username = ?, full_name = ? WHERE user_id = ?",
                (username, full_name, user_id),
            )
            row = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
            return User.from_row(row)

        for _ in range(10):
            code = _new_referral_code()
            try:
                conn.execute(
                    "INSERT INTO users (user_id, username, full_name, referral_code, created_at) "
                    "VALUES (?, ?, ?, ?, ?)",
                    (user_id, username, full_name, code, now_db),
                )
                break
            except sqlite3.IntegrityError:
                continue                     # код совпал — пробуем следующий
        else:
            # Совпасть 10 раз подряд практически невозможно, но оставлять
            # пользователя без строки в таблице нельзя.
            conn.execute(
                "INSERT OR IGNORE INTO users (user_id, username, full_name, referral_code, created_at) "
                "VALUES (?, ?, ?, ?, ?)",
                (user_id, username, full_name, f"{REFERRAL_PREFIX}{user_id}", now_db),
            )

        row = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
        return User.from_row(row)

    return await run_write(_ensure)


async def get_user(user_id: int) -> User | None:
    def _get(conn: sqlite3.Connection) -> User | None:
        row = conn.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
        return User.from_row(row) if row else None

    return await run(_get)


async def get_user_by_code(code: str) -> User | None:
    def _get(conn: sqlite3.Connection) -> User | None:
        row = conn.execute(
            "SELECT * FROM users WHERE referral_code = ?", (code.strip().upper(),)
        ).fetchone()
        return User.from_row(row) if row else None

    return await run(_get)


async def update_contacts(user_id: int, name: str, phone: str) -> None:
    """Запомнить имя и телефон — при следующей заявке подставим их сами."""

    def _update(conn: sqlite3.Connection) -> None:
        conn.execute(
            "UPDATE users SET client_name = ?, phone = ? WHERE user_id = ?",
            (name, phone, user_id),
        )

    await run_write(_update)


async def attach_referral(user_id: int, inviter_id: int, bonus_note: str) -> bool:
    """
    Привязать нового клиента к пригласившему.

    Возвращает False, если привязка невозможна: сам себя, приглашающего
    не существует или клиент уже был кем-то приглашён.
    """
    if user_id == inviter_id:
        return False

    def _attach(conn: sqlite3.Connection) -> bool:
        inviter = conn.execute(
            "SELECT 1 FROM users WHERE user_id = ?", (inviter_id,)
        ).fetchone()
        if inviter is None:
            return False

        row = conn.execute(
            "SELECT referred_by FROM users WHERE user_id = ?", (user_id,)
        ).fetchone()
        if row is None or row["referred_by"] is not None:
            return False

        conn.execute(
            "UPDATE users SET referred_by = ?, bonus_note = ? WHERE user_id = ?",
            (inviter_id, bonus_note, user_id),
        )
        return True

    return await run_write(_attach)


async def count_referrals(user_id: int) -> int:
    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute(
            "SELECT COUNT(*) AS n FROM users WHERE referred_by = ?", (user_id,)
        ).fetchone()["n"]

    return await run(_count)


async def set_promo_optout(user_id: int, optout: bool) -> None:
    def _set(conn: sqlite3.Connection) -> None:
        conn.execute(
            "UPDATE users SET promo_optout = ? WHERE user_id = ?",
            (1 if optout else 0, user_id),
        )

    await run_write(_set)


async def get_broadcast_targets() -> list[int]:
    """ID тех, кто не отключал сообщения об акциях."""

    def _get(conn: sqlite3.Connection) -> list[int]:
        rows = conn.execute("SELECT user_id FROM users WHERE promo_optout = 0").fetchall()
        return [row["user_id"] for row in rows]

    return await run(_get)


async def count_broadcast_targets() -> int:
    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute(
            "SELECT COUNT(*) AS n FROM users WHERE promo_optout = 0"
        ).fetchone()["n"]

    return await run(_count)


async def count_clients() -> int:
    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute("SELECT COUNT(*) AS n FROM users").fetchone()["n"]

    return await run(_count)


async def list_clients(limit: int = 20) -> list[dict]:
    """
    Клиенты с агрегатами для базы владелицы.

    Первыми — те, кто был недавно: их чаще всего и ищут.
    """

    def _list(conn: sqlite3.Connection) -> list[dict]:
        rows = conn.execute(
            """
            SELECT u.user_id, u.client_name, u.full_name, u.phone, u.referral_code,
                   (SELECT COUNT(*) FROM visits v WHERE v.user_id = u.user_id) AS visits,
                   (SELECT MAX(v.visit_at) FROM visits v WHERE v.user_id = u.user_id) AS last_visit,
                   (SELECT COUNT(*) FROM users r WHERE r.referred_by = u.user_id) AS referrals
              FROM users u
             ORDER BY last_visit IS NULL, last_visit DESC, u.created_at DESC
             LIMIT ?
            """,
            (limit,),
        ).fetchall()
        return [dict(row) for row in rows]

    return await run(_list)


# --------------------------------------------------------------------------- #
# Заявки
# --------------------------------------------------------------------------- #


async def create_request(
    *,
    user_id: int,
    direction: str,
    items: list[str],
    items_title: str,
    total_price: int,
    preferred_date: str,
    preferred_window: str,
    client_name: str,
    phone: str,
    comment: str | None,
    referral_note: str | None,
) -> Request:
    now_db = dt.to_db(dt.now())

    def _create(conn: sqlite3.Connection) -> Request:
        cursor = conn.execute(
            """
            INSERT INTO requests (
                user_id, direction, items, items_title, total_price,
                preferred_date, preferred_window, client_name, phone,
                comment, referral_note, status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                user_id, direction, json.dumps(items, ensure_ascii=False), items_title,
                total_price, preferred_date, preferred_window, client_name, phone,
                comment, referral_note, STATUS_PENDING, now_db, now_db,
            ),
        )
        row = conn.execute(
            "SELECT * FROM requests WHERE id = ?", (cursor.lastrowid,)
        ).fetchone()
        return Request.from_row(row)

    return await run_write(_create)


async def get_request(request_id: int) -> Request | None:
    def _get(conn: sqlite3.Connection) -> Request | None:
        row = conn.execute("SELECT * FROM requests WHERE id = ?", (request_id,)).fetchone()
        return Request.from_row(row) if row else None

    return await run(_get)


async def count_pending_for_user(user_id: int) -> int:
    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute(
            "SELECT COUNT(*) AS n FROM requests WHERE user_id = ? AND status IN (?, ?)",
            (user_id, STATUS_PENDING, STATUS_RESCHEDULED),
        ).fetchone()["n"]

    return await run(_count)


async def list_pending() -> list[Request]:
    def _list(conn: sqlite3.Connection) -> list[Request]:
        rows = conn.execute(
            "SELECT * FROM requests WHERE status IN (?, ?) ORDER BY created_at",
            (STATUS_PENDING, STATUS_RESCHEDULED),
        ).fetchall()
        return [Request.from_row(row) for row in rows]

    return await run(_list)


async def count_pending() -> int:
    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute(
            "SELECT COUNT(*) AS n FROM requests WHERE status IN (?, ?)",
            (STATUS_PENDING, STATUS_RESCHEDULED),
        ).fetchone()["n"]

    return await run(_count)


async def _update_request(request_id: int, sets: str, params: tuple) -> Request | None:
    """
    Обновить заявку, если она ещё в работе.

    Общая часть для подтверждения, переноса и отказа: нельзя обработать
    заявку, которую уже закрыл другой администратор.
    """
    now_db = dt.to_db(dt.now())

    def _update(conn: sqlite3.Connection) -> Request | None:
        conn.execute("BEGIN IMMEDIATE")
        try:
            row = conn.execute(
                "SELECT * FROM requests WHERE id = ? AND status IN (?, ?)",
                (request_id, STATUS_PENDING, STATUS_RESCHEDULED),
            ).fetchone()
            if row is None:
                conn.execute("ROLLBACK")
                return None

            conn.execute(
                f"UPDATE requests SET {sets}, updated_at = ? WHERE id = ?",
                (*params, now_db, request_id),
            )
            row = conn.execute("SELECT * FROM requests WHERE id = ?", (request_id,)).fetchone()
            conn.execute("COMMIT")
        except sqlite3.Error:
            conn.execute("ROLLBACK")
            raise

        return Request.from_row(row)

    return await run_write(_update)


async def confirm_request(request_id: int, admin_id: int, when: datetime) -> Request | None:
    return await _update_request(
        request_id,
        "status = ?, confirmed_at = ?, admin_id = ?",
        (STATUS_CONFIRMED, dt.to_db(when), admin_id),
    )


async def propose_time(request_id: int, admin_id: int, when: datetime) -> Request | None:
    return await _update_request(
        request_id,
        "status = ?, proposed_datetime = ?, admin_id = ?",
        (STATUS_RESCHEDULED, dt.to_db(when), admin_id),
    )


async def decline_request(request_id: int, admin_id: int, reason: str) -> Request | None:
    return await _update_request(
        request_id,
        "status = ?, decline_reason = ?, admin_id = ?",
        (STATUS_DECLINED, reason, admin_id),
    )


async def get_stale_pending(hours: int) -> list[Request]:
    """Заявки, которые висят без ответа дольше указанного времени."""
    boundary = dt.to_db(dt.now() - timedelta(hours=hours))

    def _list(conn: sqlite3.Connection) -> list[Request]:
        rows = conn.execute(
            "SELECT * FROM requests "
            " WHERE status = ? AND pending_reminded = 0 AND created_at <= ? "
            " ORDER BY created_at",
            (STATUS_PENDING, boundary),
        ).fetchall()
        return [Request.from_row(row) for row in rows]

    return await run(_list)


async def mark_pending_reminded(request_id: int) -> None:
    def _mark(conn: sqlite3.Connection) -> None:
        conn.execute("UPDATE requests SET pending_reminded = 1 WHERE id = ?", (request_id,))

    await run_write(_mark)


# --------------------------------------------------------------------------- #
# Визиты
# --------------------------------------------------------------------------- #


async def next_session_info(
    user_id: int | None,
    service_code: str,
    before: datetime | None = None,
) -> tuple[int, int, int]:
    """
    Номер сеанса, всего сеансов в курсе и интервал.

    Номер считается по дате визита, а не по порядку добавления в базу:
    если владелица заносит задним числом визит, который был раньше уже
    записанных, нумерация всё равно останется хронологической.
    """
    service = config.get_any_service(service_code)
    total = service["sessions"] if service else 1
    interval = service["interval_days"] if service else 30

    if user_id is None:
        return 1, total, interval

    boundary = dt.to_db(before) if before else dt.to_db(dt.now())

    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute(
            "SELECT COUNT(*) AS n FROM visits "
            " WHERE user_id = ? AND service_code = ? AND visit_at < ?",
            (user_id, service_code, boundary),
        ).fetchone()["n"]

    done = await run(_count)
    return done + 1, total, interval


async def create_visit(
    *,
    user_id: int | None,
    request_id: int | None,
    client_name: str,
    phone: str,
    service_code: str,
    service_title: str,
    visit_at: datetime,
) -> Visit:
    """Записать подтверждённый визит. Номер сеанса вычисляется автоматически."""
    session_no, total, interval = await next_session_info(user_id, service_code, visit_at)
    now_db = dt.to_db(dt.now())

    def _create(conn: sqlite3.Connection) -> Visit:
        cursor = conn.execute(
            """
            INSERT INTO visits (
                user_id, request_id, client_name, phone,
                service_code, service_title,
                session_no, total_sessions, interval_days,
                visit_at, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                user_id, request_id, client_name, phone,
                service_code, service_title,
                session_no, total, interval,
                dt.to_db(visit_at), now_db,
            ),
        )
        row = conn.execute("SELECT * FROM visits WHERE id = ?", (cursor.lastrowid,)).fetchone()
        return Visit.from_row(row)

    return await run_write(_create)


async def get_visits_between(start: datetime, end: datetime) -> list[Visit]:
    start_db, end_db = dt.to_db(start), dt.to_db(end)

    def _list(conn: sqlite3.Connection) -> list[Visit]:
        rows = conn.execute(
            "SELECT * FROM visits WHERE visit_at >= ? AND visit_at < ? ORDER BY visit_at",
            (start_db, end_db),
        ).fetchall()
        return [Visit.from_row(row) for row in rows]

    return await run(_list)


async def get_user_visits(user_id: int) -> list[Visit]:
    def _list(conn: sqlite3.Connection) -> list[Visit]:
        rows = conn.execute(
            "SELECT * FROM visits WHERE user_id = ? ORDER BY visit_at", (user_id,)
        ).fetchall()
        return [Visit.from_row(row) for row in rows]

    return await run(_list)


async def count_visits() -> int:
    def _count(conn: sqlite3.Connection) -> int:
        return conn.execute("SELECT COUNT(*) AS n FROM visits").fetchone()["n"]

    return await run(_count)


async def mark_visit_reminded(visit_id: int, *, kind_24: bool = False, kind_2: bool = False) -> None:
    fields: list[str] = []
    if kind_24:
        fields.append("reminded_24 = 1")
    if kind_2:
        fields.append("reminded_2 = 1")
    if not fields:
        return

    sql = f"UPDATE visits SET {', '.join(fields)} WHERE id = ?"

    def _mark(conn: sqlite3.Connection) -> None:
        conn.execute(sql, (visit_id,))

    await run_write(_mark)


async def last_visits_per_course() -> list[Visit]:
    """
    По одному последнему визиту на каждую пару (клиент, услуга).

    Основа и для трекера курса, и для поиска «выпавших» клиентов.
    Если у клиента есть будущий визит — именно он окажется последним,
    и напоминание о записи ему не уйдёт: он уже записан.
    """

    def _list(conn: sqlite3.Connection) -> list[Visit]:
        rows = conn.execute(
            """
            SELECT v.* FROM visits v
             WHERE v.user_id IS NOT NULL
               AND v.visit_at = (
                    SELECT MAX(v2.visit_at) FROM visits v2
                     WHERE v2.user_id = v.user_id AND v2.service_code = v.service_code
               )
             GROUP BY v.user_id, v.service_code
             ORDER BY v.visit_at
            """
        ).fetchall()
        return [Visit.from_row(row) for row in rows]

    return await run(_list)


async def increment_course_reminder(visit_id: int) -> None:
    def _inc(conn: sqlite3.Connection) -> None:
        conn.execute(
            "UPDATE visits SET course_reminders_sent = course_reminders_sent + 1 WHERE id = ?",
            (visit_id,),
        )

    await run_write(_inc)


async def top_services(limit: int = 5) -> list[tuple[str, int]]:
    def _list(conn: sqlite3.Connection) -> list[tuple[str, int]]:
        rows = conn.execute(
            "SELECT service_title, COUNT(*) AS n FROM visits "
            " GROUP BY service_code ORDER BY n DESC LIMIT ?",
            (limit,),
        ).fetchall()
        return [(row["service_title"], row["n"]) for row in rows]

    return await run(_list)


async def week_stats() -> tuple[int, int]:
    """Сколько заявок пришло за 7 дней и сколько из них подтверждено."""
    boundary = dt.to_db(dt.now() - timedelta(days=7))

    def _stats(conn: sqlite3.Connection) -> tuple[int, int]:
        total = conn.execute(
            "SELECT COUNT(*) AS n FROM requests WHERE created_at >= ?", (boundary,)
        ).fetchone()["n"]
        confirmed = conn.execute(
            "SELECT COUNT(*) AS n FROM requests WHERE created_at >= ? AND status IN (?, ?)",
            (boundary, STATUS_CONFIRMED, STATUS_DONE),
        ).fetchone()["n"]
        return total, confirmed

    return await run(_stats)


# --------------------------------------------------------------------------- #
# Акции
# --------------------------------------------------------------------------- #


async def add_promotion(
    *,
    title: str,
    description: str,
    old_price: int | None,
    new_price: int | None,
    valid_until: str,
) -> Promotion:
    now_db = dt.to_db(dt.now())

    def _add(conn: sqlite3.Connection) -> Promotion:
        cursor = conn.execute(
            "INSERT INTO promotions (title, description, old_price, new_price, valid_until, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (title, description, old_price, new_price, valid_until, now_db),
        )
        row = conn.execute("SELECT * FROM promotions WHERE id = ?", (cursor.lastrowid,)).fetchone()
        return Promotion.from_row(row)

    return await run_write(_add)


async def list_db_promotions(active_only: bool = True) -> list[Promotion]:
    """Акции, добавленные владелицей. Просроченные отсеиваются по дате."""
    today_iso = dt.today().isoformat()

    def _list(conn: sqlite3.Connection) -> list[Promotion]:
        if active_only:
            rows = conn.execute(
                "SELECT * FROM promotions WHERE active = 1 AND valid_until >= ? "
                " ORDER BY created_at DESC",
                (today_iso,),
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT * FROM promotions ORDER BY created_at DESC"
            ).fetchall()
        return [Promotion.from_row(row) for row in rows]

    return await run(_list)


async def deactivate_promotion(promo_id: int) -> bool:
    def _deactivate(conn: sqlite3.Connection) -> bool:
        cursor = conn.execute(
            "UPDATE promotions SET active = 0 WHERE id = ? AND active = 1", (promo_id,)
        )
        return cursor.rowcount > 0

    return await run_write(_deactivate)


# --------------------------------------------------------------------------- #
# Рассылки и тест
# --------------------------------------------------------------------------- #


async def log_broadcast(admin_id: int, text: str, sent: int, failed: int) -> None:
    now_db = dt.to_db(dt.now())

    def _log(conn: sqlite3.Connection) -> None:
        conn.execute(
            "INSERT INTO broadcasts (admin_id, text, sent_count, failed_count, created_at) "
            "VALUES (?, ?, ?, ?, ?)",
            (admin_id, text, sent, failed, now_db),
        )

    await run_write(_log)


async def save_quiz_result(user_id: int, answers: dict, verdict: str) -> None:
    now_db = dt.to_db(dt.now())

    def _save(conn: sqlite3.Connection) -> None:
        conn.execute(
            "INSERT INTO quiz_results (user_id, answers, verdict, created_at) VALUES (?, ?, ?, ?)",
            (user_id, json.dumps(answers, ensure_ascii=False), verdict, now_db),
        )

    await run_write(_save)
