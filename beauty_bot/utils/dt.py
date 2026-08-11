"""
Работа со временем.

Всё время внутри бота — в зоне config.TIMEZONE (Europe/Kyiv).
В SQLite время хранится строкой локального времени формата
«YYYY-MM-DDTHH:MM:SS» — такой формат сортируется лексикографически
в том же порядке, что и хронологически, поэтому сравнения интервалов
можно делать прямо в SQL без парсинга.
"""

from __future__ import annotations

from datetime import date, datetime, time, timedelta
from zoneinfo import ZoneInfo

import config
from utils import texts

TZ = ZoneInfo(config.TIMEZONE)
DB_FORMAT = "%Y-%m-%dT%H:%M:%S"


def now() -> datetime:
    """Текущее время салона (aware)."""
    return datetime.now(TZ)


def today() -> date:
    """Сегодняшняя дата по времени салона."""
    return now().date()


def combine(day: date, moment: time) -> datetime:
    """Дата + время -> aware datetime в зоне салона."""
    return datetime.combine(day, moment, tzinfo=TZ)


def start_of_day(day: date) -> datetime:
    return combine(day, time(0, 0))


def to_db(value: datetime) -> str:
    """Aware datetime -> строка для SQLite."""
    return value.astimezone(TZ).strftime(DB_FORMAT)


def from_db(raw: str) -> datetime:
    """Строка из SQLite -> aware datetime."""
    return datetime.strptime(raw, DB_FORMAT).replace(tzinfo=TZ)


def parse_iso_date(raw: str) -> date | None:
    """«2026-08-12» -> date. None, если строка битая (пришла из старой кнопки)."""
    try:
        return date.fromisoformat(raw)
    except ValueError:
        return None


def parse_hhmm(raw: str) -> time | None:
    """«14:30» -> time. None, если строка битая."""
    try:
        hour, minute = raw.split(":")
        return time(int(hour), int(minute))
    except (ValueError, TypeError):
        return None


# --------------------------------------------------------------------------- #
# Форматирование для интерфейса
# --------------------------------------------------------------------------- #


def fmt_time(value: datetime | time) -> str:
    """«14:30»."""
    return value.strftime("%H:%M")


def fmt_date_full(day: date) -> str:
    """«12 серпня, середа»."""
    return f"{day.day} {texts.MONTHS_GENITIVE[day.month - 1]}, {texts.WEEKDAYS_FULL[day.weekday()]}"


def fmt_date_short(day: date) -> str:
    """«12 сер»."""
    return f"{day.day} {texts.MONTHS_SHORT[day.month - 1]}"


def fmt_day_button(day: date) -> str:
    """Подпись кнопки календаря: «Сьогодні · 12 сер», «Ср · 13 сер»."""
    delta = (day - today()).days
    if delta == 0:
        prefix = "Сьогодні"
    elif delta == 1:
        prefix = "Завтра"
    else:
        prefix = texts.WEEKDAYS_SHORT[day.weekday()]
    return f"{prefix} · {fmt_date_short(day)}"


def fmt_day_title(day: date) -> str:
    """Заголовок дня для мастера: «Сьогодні, 12 серпня, середа»."""
    delta = (day - today()).days
    if delta == 0:
        return f"Сьогодні, {fmt_date_full(day)}"
    if delta == 1:
        return f"Завтра, {fmt_date_full(day)}"
    return fmt_date_full(day).capitalize()


def fmt_datetime(value: datetime) -> str:
    """«12 серпня, середа, 14:30»."""
    return f"{fmt_date_full(value.date())}, {fmt_time(value)}"


def horizon_days() -> list[date]:
    """Список дат, на которые вообще открыта запись (без учёта занятости)."""
    first = today()
    return [first + timedelta(days=offset) for offset in range(config.BOOKING_HORIZON_DAYS)]
