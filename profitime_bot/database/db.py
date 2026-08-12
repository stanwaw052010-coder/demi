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

from database.models import INDEXES, MIGRATIONS, TABLES

logger = logging.getLogger(__name__)

DB_PATH: Path = Path(__file__).resolve().parent.parent / "bot.db"

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
    """Создать файл БД и схему, если их ещё нет, и догнать миграции."""

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

    await run_write(_init)
    logger.info("База даних готова: %s", DB_PATH)
