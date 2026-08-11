"""
Генерация свободных слотов.

Слот у конкретного мастера считается свободным, если одновременно выполняется всё:
  • мастер делает услуги этого направления;
  • день рабочий по его личному графику (или по графику студии, если личного нет);
  • услуга целиком помещается до конца смены;
  • начало не раньше, чем через config.MIN_LEAD_TIME_MIN от текущего момента;
  • интервал [начало, начало + длительность) не пересекается ни с его активной
    записью, ни с его личной блокировкой, ни с блокировкой всей студии.

Режим config.ANY_MASTER («будь-який вільний») — объединение слотов всех мастеров,
которые делают эту услугу. Конкретный мастер подставляется при подтверждении:
берётся наименее загруженный в этот день из тех, кто свободен на выбранное время.
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


def eligible_masters(category_code: str, master_code: str) -> list[str]:
    """
    Коды мастеров, среди которых нужно искать время.

    Для конкретного мастера — он один (если действительно делает это направление).
    Для ANY_MASTER — все, кто делает это направление.
    """
    allowed = [master["code"] for master in config.masters_for_category(category_code)]
    if master_code == config.ANY_MASTER:
        return allowed
    return [master_code] if master_code in allowed else []


async def get_free_slots_for_master(
    day: date,
    duration_min: int,
    master_code: str,
) -> list[datetime]:
    """Свободные моменты начала у одного мастера."""
    hours = config.get_work_hours(day, master_code)
    if hours is None:
        return []

    day_start = dt.combine(day, hours[0])
    day_end = dt.combine(day, hours[1])

    # Занятые интервалы берём с запасом в сутки — на случай услуг «через полночь»
    # в будущих настройках графика.
    busy = await db.get_busy_intervals(
        master_code,
        day_start - timedelta(days=1),
        day_end + timedelta(days=1),
    )

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


async def get_free_slots(
    day: date,
    duration_min: int,
    category_code: str,
    master_code: str,
) -> list[datetime]:
    """
    Свободные моменты начала для услуги.

    Для ANY_MASTER — объединение слотов всех подходящих мастеров без дублей.
    """
    masters = eligible_masters(category_code, master_code)
    if not masters:
        return []

    if len(masters) == 1:
        return await get_free_slots_for_master(day, duration_min, masters[0])

    union: set[datetime] = set()
    for code in masters:
        union.update(await get_free_slots_for_master(day, duration_min, code))
    return sorted(union)


async def get_available_dates(
    duration_min: int,
    category_code: str,
    master_code: str,
) -> list[date]:
    """Дни горизонта записи, где есть хотя бы один свободный слот."""
    masters = eligible_masters(category_code, master_code)
    if not masters:
        return []

    available: list[date] = []
    for day in dt.horizon_days():
        for code in masters:
            if not config.is_working_day(day, code):
                continue
            if await get_free_slots_for_master(day, duration_min, code):
                available.append(day)
                break
    return available


async def is_slot_free(start: datetime, duration_min: int, master_code: str) -> bool:
    """Перепроверка перед подтверждением записи для конкретного мастера."""
    hours = config.get_work_hours(start.date(), master_code)
    if hours is None:
        return False

    day_start = dt.combine(start.date(), hours[0])
    day_end = dt.combine(start.date(), hours[1])

    end = start + timedelta(minutes=duration_min)
    if start < day_start or end > day_end:
        return False
    if start < dt.now() + timedelta(minutes=config.MIN_LEAD_TIME_MIN):
        return False

    busy = await db.get_busy_intervals(master_code, start, end)
    return not _overlaps(start, end, busy)


async def resolve_master(
    start: datetime,
    duration_min: int,
    category_code: str,
    master_code: str,
) -> str | None:
    """
    Определить, кто именно будет делать услугу.

    Для конкретного мастера — он сам, если ещё свободен.
    Для ANY_MASTER — наименее загруженный в этот день из свободных на это время:
    так запись равномерно распределяется по мастерам, а не валится на первого.
    None означает, что свободных не осталось.
    """
    candidates = eligible_masters(category_code, master_code)
    if not candidates:
        return None

    free: list[str] = [
        code for code in candidates if await is_slot_free(start, duration_min, code)
    ]
    if not free:
        return None
    if len(free) == 1:
        return free[0]

    day_start = dt.start_of_day(start.date())
    day_end = day_start + timedelta(days=1)
    loads = {code: await db.count_bookings_on_day(code, day_start, day_end) for code in free}
    # При равной загрузке порядок из config.MASTERS решает — результат стабилен.
    return min(free, key=lambda code: (loads[code], candidates.index(code)))


def work_slots(day: date, master_code: str | None = None) -> list[datetime]:
    """
    Вся сетка рабочего дня без учёта занятости.

    Нужна мастеру при выборе границ недоступного интервала. Без master_code
    берётся график студии.
    """
    hours = config.get_work_hours(day, master_code)
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
