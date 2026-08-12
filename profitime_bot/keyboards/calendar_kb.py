"""
Самописный календарь выбора желаемой даты.

Сторонних библиотек нет: сетка 7 колонок на 3 недели (горизонт из
config.BOOKING_HORIZON_DAYS), строкой сверху — названия дней недели.

Важно: календарь показывает не «свободное время», а желаемый день.
Реальную занятость знает только Bookon, поэтому доступны все рабочие дни
горизонта — занятость проверит владелица вручную.
"""

from __future__ import annotations

from datetime import date, timedelta

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

import config
from utils import dt, texts

CB_DAY = "cal:day"
CB_NOOP = "cal:noop"

WEEK_LENGTH = 7


def _noop_button(label: str = "·") -> InlineKeyboardButton:
    """Неактивная ячейка: выходной, прошедший день или заполнение сетки."""
    return InlineKeyboardButton(text=label, callback_data=CB_NOOP)


def calendar_keyboard(
    *,
    back_callback: str,
    cancel_callback: str,
) -> InlineKeyboardMarkup:
    """
    Календарь на горизонт записи.

    Сетка выравнивается по понедельнику: первая неделя дополняется пустыми
    ячейками слева, чтобы дни стояли под своими названиями.
    """
    builder = InlineKeyboardBuilder()

    # Шапка с днями недели.
    for label in dt.WEEKDAYS_SHORT:
        builder.add(_noop_button(label))

    days = dt.horizon_days()
    first_day = days[0]

    # Пустые ячейки перед первым днём — чтобы столбцы совпали с шапкой.
    for _ in range(first_day.weekday()):
        builder.add(_noop_button(" "))

    for day in days:
        if config.is_working_day(day):
            builder.add(
                InlineKeyboardButton(
                    text=str(day.day),
                    callback_data=f"{CB_DAY}:{day.isoformat()}",
                )
            )
        else:
            builder.add(_noop_button("·"))

    # Добиваем последнюю неделю, чтобы сетка не поехала.
    tail = (WEEK_LENGTH - (first_day.weekday() + len(days)) % WEEK_LENGTH) % WEEK_LENGTH
    for _ in range(tail):
        builder.add(_noop_button(" "))

    builder.adjust(WEEK_LENGTH)

    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=back_callback),
        InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=cancel_callback),
    )
    return builder.as_markup()


def month_hint() -> str:
    """
    Подпись под календарём: какие месяцы попали в горизонт.

    Без неё в сетке из одних чисел непонятно, где кончается один месяц
    и начинается следующий.
    """
    days = dt.horizon_days()
    first, last = days[0], days[-1]
    if first.month == last.month:
        return f"<i>{dt.MONTHS_NOMINATIVE[first.month - 1]} {first.year}</i>"
    return (
        f"<i>{dt.MONTHS_NOMINATIVE[first.month - 1]} – "
        f"{dt.MONTHS_NOMINATIVE[last.month - 1]} {last.year}</i>"
    )


def is_selectable(day: date | None) -> bool:
    """Можно ли записаться на этот день: он в горизонте и студия работает."""
    if day is None:
        return False
    today = dt.today()
    horizon_end = today + timedelta(days=config.BOOKING_HORIZON_DAYS - 1)
    return today <= day <= horizon_end and config.is_working_day(day)
