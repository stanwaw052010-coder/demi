"""
Ознаки життя та стан сервера.

Бот може «висіти живим»: процес у пам'яті є, systemd задоволений, а
polling давно обірвався й клієнтки нікому не пишуть. systemd такого не
помічає — для нього процес працює.

Тому бот раз на годину сам ставить позначку часу в БД. Зовнішній скрипт
(healthcheck.sh у cron) читає цю позначку файлом і перезапускає сервіс,
якщо вона застаріла. Перевіряючий не залежить від бота — у цьому й сенс.
"""

from __future__ import annotations

import logging
import shutil
from datetime import datetime
from pathlib import Path

import config
from database import queries
from utils import dt

logger = logging.getLogger(__name__)

HEARTBEAT_KEY = "heartbeat"

# Файл-дублікат позначки. Скрипту так простіше: не треба відкривати SQLite
# і не буває конфлікту з блокуванням бази під час запису.
HEARTBEAT_FILE = "heartbeat"


def heartbeat_path() -> Path:
    return config.LOG_DIR / HEARTBEAT_FILE


async def touch() -> None:
    """Відмітитися живим: у БД і у файл."""
    now = dt.now()
    stamp = dt.to_db(now)

    try:
        await queries.set_state(HEARTBEAT_KEY, stamp)
    except Exception:  # noqa: BLE001 — недоступна БД не має гасити бота
        logger.warning("Не вдалося записати heartbeat у БД")

    try:
        path = heartbeat_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(f"{int(now.timestamp())}\n{stamp}\n", encoding="utf-8")
    except OSError as error:
        logger.warning("Не вдалося записати файл heartbeat: %s", error)


async def last_heartbeat() -> datetime | None:
    raw = await queries.get_state(HEARTBEAT_KEY)
    return dt.from_db(raw) if raw else None


# --------------------------------------------------------------------------- #
# Ресурси сервера
# --------------------------------------------------------------------------- #
# Без сторонніх бібліотек: psutil тягне компіляцію й зайві мегабайти,
# а все потрібне лежить у стандартній бібліотеці та /proc.


def disk_free_gb(path: Path | None = None) -> float:
    target = path or config.DB_PATH.parent
    try:
        usage = shutil.disk_usage(target)
    except OSError:
        return -1.0
    return usage.free / 1024 ** 3


def memory_info() -> tuple[float, float]:
    """
    (вільно ГБ, усього ГБ). Читаємо /proc/meminfo — це Linux.

    Береться MemAvailable, а не MemFree: вільна пам'ять на Linux майже
    завжди мала, бо ядро віддає її під кеш і повертає за потреби.
    MemAvailable — це те, що реально можна зайняти.
    """
    try:
        values: dict[str, int] = {}
        with open("/proc/meminfo", encoding="utf-8") as handle:
            for line in handle:
                key, _, rest = line.partition(":")
                values[key] = int(rest.strip().split()[0])  # кілобайти
    except (OSError, ValueError, IndexError):
        return (-1.0, -1.0)

    available = values.get("MemAvailable", values.get("MemFree", 0))
    total = values.get("MemTotal", 0)
    return (available / 1024 ** 2, total / 1024 ** 2)


def db_size_mb() -> float:
    try:
        return config.DB_PATH.stat().st_size / 1024 ** 2
    except OSError:
        return 0.0
