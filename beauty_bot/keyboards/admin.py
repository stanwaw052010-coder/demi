"""Клавиатуры мастера."""

from __future__ import annotations

from datetime import date, datetime

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

from database.models import Block, Booking
from utils import dt, texts

CB_ADM_CANCEL = "ad:cancel"
CB_ADM_CANCEL_YES = "ad:yes"
CB_ADM_CANCEL_NO = "ad:no"

CB_BLK_DAY = "ad:bday"
CB_BLK_START = "ad:bstart"
CB_BLK_END = "ad:bend"
CB_BLK_WHOLE = "ad:bwhole"
CB_BLK_SKIP = "ad:bskip"
CB_BLK_CANCEL = "ad:bcancel"
CB_BLK_BACK = "ad:bback"
CB_BLK_DELETE = "ad:bdel"


def _cancel_row(builder: InlineKeyboardBuilder, *, back_to: str | None = None) -> None:
    buttons = []
    if back_to:
        buttons.append(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_BLK_BACK}:{back_to}"))
    buttons.append(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_BLK_CANCEL))
    builder.row(*buttons)


def day_bookings_keyboard(bookings: list[Booking]) -> InlineKeyboardMarkup | None:
    """Кнопки отмены под списком записей дня."""
    if not bookings:
        return None

    builder = InlineKeyboardBuilder()
    for booking in bookings:
        builder.row(
            InlineKeyboardButton(
                text=f"❌ {dt.fmt_time(booking.start_at)} · {booking.client_name}",
                callback_data=f"{CB_ADM_CANCEL}:{booking.id}",
            )
        )
    return builder.as_markup()


def admin_cancel_confirm_keyboard(booking_id: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text=texts.BTN_YES_CANCEL, callback_data=f"{CB_ADM_CANCEL_YES}:{booking_id}"),
        InlineKeyboardButton(text=texts.BTN_NO_KEEP, callback_data=CB_ADM_CANCEL_NO),
    )
    return builder.as_markup()


def block_days_keyboard(days: list[date]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for day in days:
        builder.add(
            InlineKeyboardButton(
                text=dt.fmt_day_button(day),
                callback_data=f"{CB_BLK_DAY}:{day.isoformat()}",
            )
        )
    builder.adjust(2)
    _cancel_row(builder)
    return builder.as_markup()


def block_start_keyboard(slots: list[datetime]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_WHOLE_DAY, callback_data=CB_BLK_WHOLE))
    for slot in slots[:-1]:  # последняя точка сетки — только как конец интервала
        builder.add(
            InlineKeyboardButton(
                text=dt.fmt_time(slot),
                callback_data=f"{CB_BLK_START}:{dt.fmt_time(slot)}",
            )
        )
    builder.adjust(1, 4)
    _cancel_row(builder, back_to="day")
    return builder.as_markup()


def block_end_keyboard(slots: list[datetime]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for slot in slots:
        builder.add(
            InlineKeyboardButton(
                text=dt.fmt_time(slot),
                callback_data=f"{CB_BLK_END}:{dt.fmt_time(slot)}",
            )
        )
    builder.adjust(4)
    _cancel_row(builder, back_to="start")
    return builder.as_markup()


def block_reason_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_SKIP, callback_data=CB_BLK_SKIP))
    _cancel_row(builder, back_to="end")
    return builder.as_markup()


def blocks_keyboard(blocks: list[Block]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for block in blocks:
        label = (
            f"🗑 {dt.fmt_date_short(block.start_at.date())} "
            f"{dt.fmt_time(block.start_at)}–{dt.fmt_time(block.end_at)}"
        )
        if block.reason:
            label = f"{label} · {block.reason[:20]}"
        builder.row(InlineKeyboardButton(text=label, callback_data=f"{CB_BLK_DELETE}:{block.id}"))
    return builder.as_markup()
