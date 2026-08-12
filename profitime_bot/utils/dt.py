"""
Работа со временем.

Всё время внутри бота — в зоне config.TIMEZONE (Europe/Kyiv).
В SQLite время хранится строкой локального времени «YYYY-MM-DDTHH:MM:SS»:
такой формат сортируется лексикографически в том же порядке, что и
хронологически, поэтому сравнения можно делать прямо в SQL.
"""

from __future__ import annotations

from datetime import date, datetime, time, timedelta
from zoneinfo import ZoneInfo

import config

TZ = ZoneInfo(config.TIMEZONE)
DB_FORMAT = "%Y-%m-%dT%H:%M:%S"

MONTHS_GENITIVE: tuple[str, ...] = (
    "січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
)

MONTHS_NOMINATIVE: tuple[str, ...] = (
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
)

WEEKDAYS_FULL: tuple[str, ...] = (
    "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота", "неділя",
)

WEEKDAYS_SHORT: tuple[str, ...] = ("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд")


def now() -> datetime:
    """Текущее время студии (aware)."""
    return datetime.now(TZ)


def today() -> date:
    return now().date()


def combine(day: date, moment: time) -> datetime:
    return datetime.combine(day, moment, tzinfo=TZ)


def start_of_day(day: date) -> datetime:
    return combine(day, time(0, 0))


def to_db(value: datetime) -> str:
    return value.astimezone(TZ).strftime(DB_FORMAT)


def from_db(raw: str) -> datetime:
    return datetime.strptime(raw, DB_FORMAT).replace(tzinfo=TZ)


def parse_iso_date(raw: str) -> date | None:
    """«2026-08-20» -> date. None, если строка битая (кнопка из старого сообщения)."""
    try:
        return date.fromisoformat(raw)
    except (ValueError, TypeError):
        return None


def parse_user_datetime(raw: str) -> datetime | None:
    """
    Разбор даты и времени, введённых владелицей вручную.

    Принимает: «20.08 14:30», «20.08.2026 14:30», «2026-08-20 14:30»,
    с точкой, дефисом или слэшем как разделителем, время через двоеточие.
    Если год не указан — подставляется ближайший (в прошлое не уходим).
    """
    cleaned = " ".join(raw.strip().replace(",", " ").split())
    if not cleaned:
        return None

    parts = cleaned.split(" ")
    if len(parts) < 2:
        return None

    date_part, time_part = parts[0], parts[1]

    try:
        hour_raw, minute_raw = time_part.replace(".", ":").split(":")[:2]
        moment = time(int(hour_raw), int(minute_raw))
    except (ValueError, TypeError):
        return None

    chunks = date_part.replace("/", ".").replace("-", ".").split(".")
    try:
        numbers = [int(chunk) for chunk in chunks]
    except ValueError:
        return None

    current = today()
    if len(numbers) == 2:
        day_num, month_num = numbers
        year_num = current.year
    elif len(numbers) == 3:
        if numbers[0] > 31:                      # 2026.08.20
            year_num, month_num, day_num = numbers
        else:                                    # 20.08.2026
            day_num, month_num, year_num = numbers
            if year_num < 100:
                year_num += 2000
    else:
        return None

    try:
        result = combine(date(year_num, month_num, day_num), moment)
    except ValueError:
        return None

    # Год не указали, а дата уже прошла — значит имелся в виду следующий год.
    if len(numbers) == 2 and result < now() - timedelta(days=1):
        try:
            result = combine(date(year_num + 1, month_num, day_num), moment)
        except ValueError:
            return None

    return result


# --------------------------------------------------------------------------- #
# Форматирование
# --------------------------------------------------------------------------- #


def fmt_time(value: datetime | time) -> str:
    return value.strftime("%H:%M")


def fmt_date_full(day: date) -> str:
    """«20 серпня, четвер»."""
    return f"{day.day} {MONTHS_GENITIVE[day.month - 1]}, {WEEKDAYS_FULL[day.weekday()]}"


def fmt_date_short(day: date) -> str:
    """«20.08»."""
    return day.strftime("%d.%m")


def fmt_datetime(value: datetime) -> str:
    """«20 серпня, четвер, 14:30»."""
    return f"{fmt_date_full(value.date())}, {fmt_time(value)}"


def fmt_day_title(day: date) -> str:
    """Заголовок дня для владелицы: «Сьогодні, 20 серпня, четвер»."""
    delta = (day - today()).days
    if delta == 0:
        return f"Сьогодні, {fmt_date_full(day)}"
    if delta == 1:
        return f"Завтра, {fmt_date_full(day)}"
    return fmt_date_full(day).capitalize()


def fmt_relative_day(day: date) -> str:
    """«сьогодні» / «завтра» / «20 серпня»."""
    delta = (day - today()).days
    if delta == 0:
        return "сьогодні"
    if delta == 1:
        return "завтра"
    return f"{day.day} {MONTHS_GENITIVE[day.month - 1]}"


def plural_days(count: int) -> str:
    """1 день, 3 дні, 5 днів, 21 день."""
    if count % 100 in range(11, 15):
        return "днів"
    last = count % 10
    if last == 1:
        return "день"
    if last in (2, 3, 4):
        return "дні"
    return "днів"


def plural_weeks(count: int) -> str:
    """1 тиждень, 3 тижні, 5 тижнів."""
    if count % 100 in range(11, 15):
        return "тижнів"
    last = count % 10
    if last == 1:
        return "тиждень"
    if last in (2, 3, 4):
        return "тижні"
    return "тижнів"


def plural_sessions(count: int) -> str:
    """1 сеанс, 3 сеанси, 5 сеансів."""
    if count % 100 in range(11, 15):
        return "сеансів"
    last = count % 10
    if last == 1:
        return "сеанс"
    if last in (2, 3, 4):
        return "сеанси"
    return "сеансів"


def plural_requests(count: int) -> str:
    """1 заявка, 3 заявки, 5 заявок."""
    if count % 100 in range(11, 15):
        return "заявок"
    last = count % 10
    if last == 1:
        return "заявка"
    if last in (2, 3, 4):
        return "заявки"
    return "заявок"


def fmt_duration(minutes: int) -> str:
    """90 -> «1 год 30 хв»."""
    hours, mins = divmod(minutes, 60)
    if hours and mins:
        return f"{hours} год {mins} хв"
    if hours:
        return f"{hours} год"
    return f"{mins} хв"


def horizon_days() -> list[date]:
    """Даты, на которые открыт выбор желаемого дня."""
    first = today()
    return [first + timedelta(days=offset) for offset in range(config.BOOKING_HORIZON_DAYS)]
