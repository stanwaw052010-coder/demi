"""
Часть мастера.

Доступ ограничен router-фильтром IsAdmin: сообщения и колбэки от всех
остальных пользователей просто проходят мимо этого роутера дальше.
"""

from __future__ import annotations

import logging
from datetime import date, timedelta

from aiogram import Bot, F, Router
from aiogram.filters import BaseFilter, Command
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message, TelegramObject

import config
from database import db
from database.models import CANCELLED_BY_MASTER, STATUS_ACTIVE, Booking
from keyboards import admin as kb
from states.booking import BlockSG
from utils import dt, slots, texts, tg, validators

logger = logging.getLogger(__name__)


class IsAdmin(BaseFilter):
    """Пропускает только мастера (ADMIN_ID из .env)."""

    async def __call__(self, event: TelegramObject) -> bool:
        user = getattr(event, "from_user", None)
        return bool(user and config.ADMIN_ID > 0 and user.id == config.ADMIN_ID)


router = Router(name="admin")
router.message.filter(IsAdmin())
router.callback_query.filter(IsAdmin())


# --------------------------------------------------------------------------- #
# Просмотр записей
# --------------------------------------------------------------------------- #


def _render_day(day: date, bookings: list[Booking]) -> str:
    title = dt.fmt_day_title(day)
    if not bookings:
        return texts.ADMIN_DAY_EMPTY.format(title=title)

    lines = [texts.ADMIN_DAY_HEADER.format(title=title), ""]
    for booking in bookings:
        lines.append(
            texts.ADMIN_BOOKING_LINE.format(
                time=dt.fmt_time(booking.start_at),
                end_time=dt.fmt_time(booking.end_at),
                service=booking.service_name,
                name=booking.client_name,
                phone=validators.format_phone(booking.phone),
                price=booking.price,
                currency=config.CURRENCY,
                id=booking.id,
            )
        )
        lines.append("")

    lines.append(
        texts.ADMIN_DAY_TOTAL.format(
            count=len(bookings),
            sum=sum(booking.price for booking in bookings),
            currency=config.CURRENCY,
        ).strip()
    )
    return "\n".join(lines)


@router.message(Command("today"))
async def cmd_today(message: Message, state: FSMContext) -> None:
    await state.clear()
    day = dt.today()
    bookings = await db.get_bookings_between(dt.start_of_day(day), dt.start_of_day(day + timedelta(days=1)))
    await message.answer(_render_day(day, bookings), reply_markup=kb.day_bookings_keyboard(bookings))


@router.message(Command("week"))
async def cmd_week(message: Message, state: FSMContext) -> None:
    await state.clear()
    first = dt.today()
    total = 0

    for offset in range(7):
        day = first + timedelta(days=offset)
        bookings = await db.get_bookings_between(
            dt.start_of_day(day), dt.start_of_day(day + timedelta(days=1))
        )
        if not bookings:
            continue
        total += len(bookings)
        await message.answer(_render_day(day, bookings), reply_markup=kb.day_bookings_keyboard(bookings))

    if total == 0:
        await message.answer(texts.ADMIN_WEEK_EMPTY)


@router.message(Command("admin"))
async def cmd_admin(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.ADMIN_HELP)


# --------------------------------------------------------------------------- #
# Отмена записи мастером
# --------------------------------------------------------------------------- #


def _parse_id(data: str | None) -> int | None:
    if not data or data.count(":") < 2:
        return None
    raw = data.split(":", 2)[2]
    return int(raw) if raw.isdigit() else None


@router.callback_query(F.data.startswith(f"{kb.CB_ADM_CANCEL}:"))
async def admin_cancel_ask(callback: CallbackQuery) -> None:
    booking_id = _parse_id(callback.data)
    booking = await db.get_booking(booking_id) if booking_id else None

    if booking is None or booking.status != STATUS_ACTIVE:
        await callback.answer(texts.ADMIN_CANCEL_GONE, show_alert=True)
        return

    await callback.answer()
    message = callback.message
    if not isinstance(message, Message):
        return
    await message.answer(
        texts.ADMIN_CANCEL_ASK.format(
            id=booking.id,
            date=dt.fmt_date_full(booking.start_at.date()),
            time=dt.fmt_time(booking.start_at),
            name=booking.client_name,
            phone=validators.format_phone(booking.phone),
            service=booking.service_name,
        ),
        reply_markup=kb.admin_cancel_confirm_keyboard(booking.id),
    )


@router.callback_query(F.data == kb.CB_ADM_CANCEL_NO)
async def admin_cancel_no(callback: CallbackQuery) -> None:
    await callback.answer()
    await tg.safe_edit(callback, texts.MY_CANCEL_KEPT, None)


@router.callback_query(F.data.startswith(f"{kb.CB_ADM_CANCEL_YES}:"))
async def admin_cancel_yes(callback: CallbackQuery, bot: Bot) -> None:
    await callback.answer()
    booking_id = _parse_id(callback.data)
    if booking_id is None:
        await tg.safe_edit(callback, texts.ADMIN_CANCEL_GONE, None)
        return

    booking = await db.cancel_booking(booking_id, by=CANCELLED_BY_MASTER)
    if booking is None:
        await tg.safe_edit(callback, texts.ADMIN_CANCEL_GONE, None)
        return

    logger.info("Майстер скасував запис №%s", booking.id)

    delivered = await tg.notify(
        bot,
        booking.user_id,
        texts.CANCELLED_BY_MASTER.format(
            date=dt.fmt_date_full(booking.start_at.date()),
            time=dt.fmt_time(booking.start_at),
            service=booking.service_name,
            phone=config.PHONE,
        ),
    )

    if delivered:
        await tg.safe_edit(callback, texts.ADMIN_CANCEL_DONE.format(id=booking.id), None)
    else:
        await tg.safe_edit(
            callback,
            texts.ADMIN_CANCEL_DONE_NO_NOTIFY.format(
                id=booking.id,
                phone=validators.format_phone(booking.phone),
            ),
            None,
        )


# --------------------------------------------------------------------------- #
# Недоступное время
# --------------------------------------------------------------------------- #


def _block_days() -> list[date]:
    return [day for day in dt.horizon_days() if config.is_working_day(day)]


@router.message(Command("block"))
async def cmd_block(message: Message, state: FSMContext) -> None:
    await state.clear()
    days = _block_days()
    if not days:
        await message.answer(texts.ADMIN_NO_WORK_DAYS)
        return

    await state.set_state(BlockSG.day)
    await message.answer(texts.ADMIN_BLOCK_DAY, reply_markup=kb.block_days_keyboard(days))


@router.callback_query(F.data.startswith(f"{kb.CB_BLK_DAY}:"))
async def block_day_chosen(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    day = dt.parse_iso_date(callback.data.split(":", 2)[2])
    if day is None or not config.is_working_day(day):
        await _block_show_days(callback, state)
        return

    await state.update_data(block_day=day.isoformat())
    await _block_show_start(callback, state)


@router.callback_query(F.data.startswith(f"{kb.CB_BLK_START}:"))
async def block_start_chosen(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    moment = dt.parse_hhmm(callback.data.split(":", 2)[2])
    if moment is None:
        await _block_show_days(callback, state)
        return

    await state.update_data(block_start=dt.fmt_time(moment))
    await _block_show_end(callback, state)


@router.callback_query(F.data == kb.CB_BLK_WHOLE)
async def block_whole_day(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    day = await _block_day_from_state(state)
    if day is None:
        await _block_show_days(callback, state)
        return

    hours = config.get_work_hours(day)
    if hours is None:
        await _block_show_days(callback, state)
        return

    await state.update_data(
        block_start=hours[0].strftime("%H:%M"),
        block_end=hours[1].strftime("%H:%M"),
    )
    await _block_show_reason(callback, state)


@router.callback_query(F.data.startswith(f"{kb.CB_BLK_END}:"))
async def block_end_chosen(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    moment = dt.parse_hhmm(callback.data.split(":", 2)[2])
    if moment is None:
        await _block_show_days(callback, state)
        return

    await state.update_data(block_end=dt.fmt_time(moment))
    await _block_show_reason(callback, state)


@router.callback_query(F.data == kb.CB_BLK_SKIP)
async def block_skip_reason(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await _block_finish(callback, state, reason=None)


@router.message(BlockSG.reason, F.text)
async def block_reason_text(message: Message, state: FSMContext) -> None:
    reason = (message.text or "").strip()[:80]
    await _block_finish(message, state, reason=reason or None)


@router.callback_query(F.data == kb.CB_BLK_CANCEL)
async def block_cancel(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await tg.safe_edit(callback, texts.CANCELLED_FLOW, None)


@router.callback_query(F.data.startswith(f"{kb.CB_BLK_BACK}:"))
async def block_back(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    target = callback.data.split(":", 2)[2]
    if target == "day":
        await _block_show_days(callback, state)
    elif target == "start":
        await _block_show_start(callback, state)
    elif target == "end":
        await _block_show_end(callback, state)
    else:
        await _block_show_days(callback, state)


# --- шаги мастера, вынесенные отдельно, чтобы «Назад» переиспользовал их ---


async def _block_day_from_state(state: FSMContext) -> date | None:
    data = await state.get_data()
    return dt.parse_iso_date(data.get("block_day", ""))


async def _block_show_days(target: Message | CallbackQuery, state: FSMContext) -> None:
    await state.set_state(BlockSG.day)
    markup = kb.block_days_keyboard(_block_days())
    if isinstance(target, CallbackQuery):
        await tg.safe_edit(target, texts.ADMIN_BLOCK_DAY, markup)
    else:
        await target.answer(texts.ADMIN_BLOCK_DAY, reply_markup=markup)


async def _block_show_start(callback: CallbackQuery, state: FSMContext) -> None:
    day = await _block_day_from_state(state)
    if day is None:
        await _block_show_days(callback, state)
        return

    await state.set_state(BlockSG.start)
    await tg.safe_edit(
        callback,
        texts.ADMIN_BLOCK_START.format(date=dt.fmt_date_full(day)),
        kb.block_start_keyboard(slots.work_slots(day)),
    )


async def _block_show_end(callback: CallbackQuery, state: FSMContext) -> None:
    day = await _block_day_from_state(state)
    data = await state.get_data()
    start = dt.parse_hhmm(data.get("block_start", ""))
    if day is None or start is None:
        await _block_show_days(callback, state)
        return

    later = [slot for slot in slots.work_slots(day) if slot.time() > start]
    if not later:
        await _block_show_start(callback, state)
        return

    await state.set_state(BlockSG.end)
    await tg.safe_edit(
        callback,
        texts.ADMIN_BLOCK_END.format(date=dt.fmt_date_full(day), start=start.strftime("%H:%M")),
        kb.block_end_keyboard(later),
    )


async def _block_show_reason(callback: CallbackQuery, state: FSMContext) -> None:
    day = await _block_day_from_state(state)
    data = await state.get_data()
    start = dt.parse_hhmm(data.get("block_start", ""))
    end = dt.parse_hhmm(data.get("block_end", ""))
    if day is None or start is None or end is None:
        await _block_show_days(callback, state)
        return

    await state.set_state(BlockSG.reason)
    await tg.safe_edit(
        callback,
        texts.ADMIN_BLOCK_REASON.format(
            date=dt.fmt_date_full(day),
            start=start.strftime("%H:%M"),
            end=end.strftime("%H:%M"),
        ),
        kb.block_reason_keyboard(),
    )


async def _block_finish(
    target: Message | CallbackQuery,
    state: FSMContext,
    *,
    reason: str | None,
) -> None:
    day = await _block_day_from_state(state)
    data = await state.get_data()
    start_time = dt.parse_hhmm(data.get("block_start", ""))
    end_time = dt.parse_hhmm(data.get("block_end", ""))
    await state.clear()

    message = target.message if isinstance(target, CallbackQuery) else target
    if not isinstance(message, Message):
        return

    if day is None or start_time is None or end_time is None:
        await message.answer(texts.STALE_BUTTON)
        return

    start_at = dt.combine(day, start_time)
    end_at = dt.combine(day, end_time)

    busy = await db.count_active_in_range(start_at, end_at)
    if busy:
        await message.answer(texts.ADMIN_BLOCK_CONFLICT.format(count=busy))
        return

    await db.add_block(start_at, end_at, reason)
    logger.info("Майстер заблокував %s %s–%s", day, start_time, end_time)

    if isinstance(target, CallbackQuery):
        await tg.drop_markup(target)

    await message.answer(
        texts.ADMIN_BLOCK_DONE.format(
            date=dt.fmt_date_full(day),
            start=start_time.strftime("%H:%M"),
            end=end_time.strftime("%H:%M"),
            reason=f"📝 {reason}\n" if reason else "",
        )
    )


@router.message(Command("blocks"))
async def cmd_blocks(message: Message, state: FSMContext) -> None:
    await state.clear()
    blocks = await db.get_blocks()
    if not blocks:
        await message.answer(texts.ADMIN_BLOCKS_EMPTY)
        return
    await message.answer(texts.ADMIN_BLOCKS_HEADER, reply_markup=kb.blocks_keyboard(blocks))


@router.callback_query(F.data.startswith(f"{kb.CB_BLK_DELETE}:"))
async def block_delete(callback: CallbackQuery) -> None:
    await callback.answer()
    block_id = _parse_id(callback.data)
    if block_id is None or not await db.delete_block(block_id):
        await tg.safe_edit(callback, texts.ADMIN_BLOCK_GONE, None)
        return

    blocks = await db.get_blocks()
    if blocks:
        await tg.safe_edit(callback, texts.ADMIN_BLOCKS_HEADER, kb.blocks_keyboard(blocks))
    else:
        await tg.safe_edit(callback, texts.ADMIN_BLOCK_REMOVED, None)
