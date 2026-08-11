"""
Генерация свободных слотов.

Слот считается свободным, если одновременно выполняется всё:
  • день рабочий по config.WORK_SCHEDULE;
  • услуга целиком помещается до конца смены;
  • начало не раньше, чем через config.MIN_LEAD_TIME_MIN от текущего момента;
  • интервал [начало, начало + длительность) не пересекается ни с активной
    записью, ни с блокировкой мастера.
"""

from __future__ import annotations

from datetime import date, datetime, timedelta

import config
from database import db
from utils import dt


def _overlaps(
    start: datetime,
    end: datetime,
    busy: list[tuple[datetime, datetime]],
) -> bool:
    return any(busy_start < end and busy_end > start for busy_start, busy_end in busy)


async def get_free_slots(day: date, duration_min: int) -> list[datetime]:
    """Свободные моменты начала для услуги указанной длительности."""
    hours = config.get_work_hours(day)
    if hours is None:
        return []

    day_start = dt.combine(day, hours[0])
    day_end = dt.combine(day, hours[1])

    # Занятые интервалы берём с запасом в сутки — на случай услуг «через полночь»
    # в будущих настройках графика.
    busy = await db.get_busy_intervals(day_start - timedelta(days=1), day_end + timedelta(days=1))

    earliest = dt.now() + timedelta(minutes=config.MIN_LEAD_TIME_MIN)
    step = timedelta(minutes=config.SLOT_STEP_MIN)
    length = timedelta(minutes=duration_min)

    slots: list[datetime] = []
    cursor = day_start
    while cursor + length <= day_end:
        if cursor >= earliest and not _overlaps(cursor, cursor + length, busy):
            slots.append(cursor)
        cursor += step
    return slots


async def get_available_dates(duration_min: int) -> list[date]:
    """Дни горизонта записи, где есть хотя бы один свободный слот."""
    available: list[date] = []
    for day in dt.horizon_days():
        if not config.is_working_day(day):
            continue
        if await get_free_slots(day, duration_min):
            available.append(day)
    return available


async def is_slot_free(start: datetime, duration_min: int) -> bool:
    """Быстрая перепроверка перед подтверждением записи."""
    if not config.is_working_day(start.date()):
        return False

    hours = config.get_work_hours(start.date())
    assert hours is not None  # is_working_day уже это гарантировал
    day_start = dt.combine(start.date(), hours[0])
    day_end = dt.combine(start.date(), hours[1])

    end = start + timedelta(minutes=duration_min)
    if start < day_start or end > day_end:
        return False
    if start < dt.now() + timedelta(minutes=config.MIN_LEAD_TIME_MIN):
        return False

    busy = await db.get_busy_intervals(start, end)
    return not _overlaps(start, end, busy)


def work_slots(day: date) -> list[datetime]:
    """
    Вся сетка рабочего дня без учёта занятости.

    Нужна мастеру при выборе границ недоступного интервала.
    """
    hours = config.get_work_hours(day)
    if hours is None:
        return []

    day_start = dt.combine(day, hours[0])
    day_end = dt.combine(day, hours[1])
    step = timedelta(minutes=config.SLOT_STEP_MIN)

    result: list[datetime] = []
    cursor = day_start
    while cursor <= day_end:
        result.append(cursor)
        cursor += step
    return result
