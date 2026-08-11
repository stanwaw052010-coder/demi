"""Клавиатуры клиентской части."""

from __future__ import annotations

from datetime import date, datetime

from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder

import config
from database.models import Booking
from utils import dt, texts

# Префиксы callback_data. Держим их короткими: лимит Telegram — 64 байта.
CB_CATEGORY = "bk:cat"
CB_SERVICE = "bk:srv"
CB_DAY = "bk:day"
CB_SLOT = "bk:slot"
CB_CONFIRM = "bk:ok"
CB_BACK = "bk:back"
CB_CANCEL = "bk:cancel"

CB_MY_CANCEL = "my:cancel"
CB_MY_CANCEL_YES = "my:yes"
CB_MY_CANCEL_NO = "my:no"

CB_WRITE_MASTER = "ct:write"
CB_RULES = "ct:rules"
CB_BOOK_AGAIN = "bk:again"


def main_menu() -> ReplyKeyboardMarkup:
    """Постоянное меню под полем ввода."""
    builder = ReplyKeyboardBuilder()
    builder.add(
        KeyboardButton(text=texts.BTN_BOOK),
        KeyboardButton(text=texts.BTN_MY_BOOKINGS),
        KeyboardButton(text=texts.BTN_PRICES),
        KeyboardButton(text=texts.BTN_CONTACTS),
    )
    builder.adjust(2, 2)
    return builder.as_markup(resize_keyboard=True, input_field_placeholder=texts.MENU_PROMPT)


def flow_reply_keyboard(*, with_contact: bool = False) -> ReplyKeyboardMarkup:
    """Клавиатура для шагов, где клиент вводит текст: имя и телефон."""
    builder = ReplyKeyboardBuilder()
    if with_contact:
        builder.add(KeyboardButton(text=texts.BTN_SHARE_PHONE, request_contact=True))
    builder.add(KeyboardButton(text=texts.BTN_BACK), KeyboardButton(text=texts.BTN_CANCEL))
    if with_contact:
        builder.adjust(1, 2)
    else:
        builder.adjust(2)
    return builder.as_markup(resize_keyboard=True)


def _nav_row(builder: InlineKeyboardBuilder, *, back_to: str | None) -> None:
    """Единая нижняя строка «Назад / Скасувати» для всех шагов записи."""
    buttons = []
    if back_to:
        buttons.append(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_BACK}:{back_to}"))
    buttons.append(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_CANCEL))
    builder.row(*buttons)


def categories_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for category in config.SERVICES.values():
        builder.row(
            InlineKeyboardButton(
                text=f"{category['emoji']} {category['title']}",
                callback_data=f"{CB_CATEGORY}:{category['code']}",
            )
        )
    _nav_row(builder, back_to=None)
    return builder.as_markup()


def services_keyboard(category_code: str) -> InlineKeyboardMarkup | None:
    category = config.get_category(category_code)
    if category is None:
        return None

    builder = InlineKeyboardBuilder()
    for service in category["services"]:
        builder.row(
            InlineKeyboardButton(
                text=f"{service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_SERVICE}:{service['code']}",
            )
        )
    _nav_row(builder, back_to="category")
    return builder.as_markup()


def days_keyboard(days: list[date]) -> InlineKeyboardMarkup:
    """Самописный календарь: ближайшие свободные даты по 2 в ряд."""
    builder = InlineKeyboardBuilder()
    for day in days:
        builder.add(
            InlineKeyboardButton(
                text=dt.fmt_day_button(day),
                callback_data=f"{CB_DAY}:{day.isoformat()}",
            )
        )
    builder.adjust(2)
    _nav_row(builder, back_to="service")
    return builder.as_markup()


def slots_keyboard(slots: list[datetime]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for slot in slots:
        builder.add(
            InlineKeyboardButton(
                text=dt.fmt_time(slot),
                callback_data=f"{CB_SLOT}:{dt.fmt_time(slot)}",
            )
        )
    builder.adjust(4)
    _nav_row(builder, back_to="day")
    return builder.as_markup()


def confirm_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_CONFIRM, callback_data=CB_CONFIRM))
    _nav_row(builder, back_to="phone")
    return builder.as_markup()


def my_bookings_keyboard(bookings: list[Booking]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for booking in bookings:
        builder.row(
            InlineKeyboardButton(
                text=texts.BTN_CANCEL_BOOKING.format(
                    time=dt.fmt_time(booking.start_at),
                    date=dt.fmt_date_short(booking.start_at.date()),
                ),
                callback_data=f"{CB_MY_CANCEL}:{booking.id}",
            )
        )
    return builder.as_markup()


def my_cancel_confirm_keyboard(booking_id: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text=texts.BTN_YES_CANCEL, callback_data=f"{CB_MY_CANCEL_YES}:{booking_id}"),
        InlineKeyboardButton(text=texts.BTN_NO_KEEP, callback_data=CB_MY_CANCEL_NO),
    )
    return builder.as_markup()


def contacts_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_INSTAGRAM, url=config.INSTAGRAM_URL))
    builder.row(InlineKeyboardButton(text=texts.BTN_RULES, callback_data=CB_RULES))
    builder.row(InlineKeyboardButton(text=texts.BTN_WRITE_MASTER, callback_data=CB_WRITE_MASTER))
    return builder.as_markup()


def book_again_keyboard() -> InlineKeyboardMarkup:
    """Кнопка под напоминанием о повторной записи."""
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_BOOK_AGAIN, callback_data=CB_BOOK_AGAIN))
    return builder.as_markup()


def cancel_only_keyboard() -> ReplyKeyboardMarkup:
    """Для шага «написати майстру» — только выход."""
    builder = ReplyKeyboardBuilder()
    builder.add(KeyboardButton(text=texts.BTN_CANCEL))
    return builder.as_markup(resize_keyboard=True)
