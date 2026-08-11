"""
Клиентская часть: пошаговая запись, «Мої записи», отмена записи.

Навигация устроена одинаково на каждом шаге:
  • инлайн-кнопки «⬅️ Назад» / «❌ Скасувати» на шагах выбора;
  • те же кнопки в reply-клавиатуре на шагах ввода текста;
  • /cancel работает в любой момент (обрабатывается в handlers/common.py).

Любое действие пересчитывает актуальные данные заново, поэтому нажатие
кнопки из старого сообщения не приводит к некорректной записи.
"""

from __future__ import annotations

import logging
from datetime import timedelta

from aiogram import F, Router
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

import config
from database import db
from database.models import CANCELLED_BY_CLIENT, STATUS_ACTIVE, Booking
from keyboards import client as kb
from states.booking import BookingSG
from utils import dt, slots, texts, tg, validators

logger = logging.getLogger(__name__)

router = Router(name="client")

# Куда возвращает «⬅️ Назад» с каждого шага ввода текста.
BACK_FROM_STATE: dict[str, str] = {
    BookingSG.service.state: "category",
    BookingSG.day.state: "service",
    BookingSG.slot.state: "day",
    BookingSG.name.state: "slot",
    BookingSG.phone.state: "name",
    BookingSG.confirm.state: "phone",
}

Target = Message | CallbackQuery


# --------------------------------------------------------------------------- #
# Вспомогательные функции
# --------------------------------------------------------------------------- #


async def _show(target: Target, text: str, markup=None) -> None:
    """Показать шаг: отредактировать сообщение с кнопкой или отправить новое."""
    if isinstance(target, CallbackQuery):
        await tg.safe_edit(target, text, markup)
    else:
        await target.answer(text, reply_markup=markup)


def _as_message(target: Target) -> Message | None:
    if isinstance(target, CallbackQuery):
        return target.message if isinstance(target.message, Message) else None
    return target


async def _service_from_state(state: FSMContext) -> tuple[dict, dict] | None:
    """Категория и услуга, выбранные ранее. None — данных нет (устаревшая кнопка)."""
    data = await state.get_data()
    code = data.get("service_code")
    if not code:
        return None
    return config.get_service(code)


# --------------------------------------------------------------------------- #
# Шаг 1. Категория
# --------------------------------------------------------------------------- #


async def start_booking(message: Message, state: FSMContext) -> None:
    """Точка входа в сценарий записи (кнопка «📅 Записатися»)."""
    await state.clear()
    await show_categories(message, state)


async def show_categories(target: Target, state: FSMContext) -> None:
    await state.set_state(BookingSG.category)
    await _show(target, texts.STEP_CATEGORY, kb.categories_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_CATEGORY}:"))
async def on_category(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    code = callback.data.split(":", 2)[2]
    category = config.get_category(code)
    if category is None:
        await tg.safe_edit(callback, texts.STALE_BUTTON, kb.categories_keyboard())
        await state.set_state(BookingSG.category)
        return

    await state.update_data(category_code=code)
    await show_services(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 2. Услуга
# --------------------------------------------------------------------------- #


async def show_services(target: Target, state: FSMContext) -> None:
    data = await state.get_data()
    category = config.get_category(data.get("category_code", ""))
    if category is None:
        await show_categories(target, state)
        return

    await state.set_state(BookingSG.service)
    markup = kb.services_keyboard(category["code"])
    await _show(
        target,
        texts.STEP_SERVICE.format(emoji=category["emoji"], category=category["title"]),
        markup,
    )


@router.callback_query(F.data.startswith(f"{kb.CB_SERVICE}:"))
async def on_service(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    code = callback.data.split(":", 2)[2]
    found = config.get_service(code)
    if found is None:
        await show_categories(callback, state)
        return

    category, service = found
    await state.update_data(category_code=category["code"], service_code=service["code"])
    await show_days(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 3. Дата
# --------------------------------------------------------------------------- #


async def show_days(target: Target, state: FSMContext) -> None:
    found = await _service_from_state(state)
    if found is None:
        await show_categories(target, state)
        return

    _, service = found
    available = await slots.get_available_dates(service["duration"])
    if not available:
        data = await state.get_data()
        markup = kb.services_keyboard(data.get("category_code", "")) or kb.categories_keyboard()
        await state.set_state(BookingSG.service)
        await _show(
            target,
            texts.ERR_NO_DATES.format(days=config.BOOKING_HORIZON_DAYS, phone=config.PHONE),
            markup,
        )
        return

    await state.set_state(BookingSG.day)
    await _show(
        target,
        texts.STEP_DATE.format(
            service=service["name"],
            duration=texts.format_duration(service["duration"]),
            price=service["price"],
            currency=config.CURRENCY,
        ),
        kb.days_keyboard(available),
    )


@router.callback_query(F.data.startswith(f"{kb.CB_DAY}:"))
async def on_day(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    day = dt.parse_iso_date(callback.data.split(":", 2)[2])
    if day is None or day < dt.today() or not config.is_working_day(day):
        await callback.answer(texts.ERR_DATE_PASSED, show_alert=True)
        await show_days(callback, state)
        return

    await state.update_data(day=day.isoformat())
    await show_slots(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 4. Время
# --------------------------------------------------------------------------- #


async def show_slots(target: Target, state: FSMContext) -> None:
    found = await _service_from_state(state)
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("day", ""))
    if found is None or day is None:
        await show_categories(target, state)
        return

    _, service = found
    free = await slots.get_free_slots(day, service["duration"])
    if not free:
        # Слоты разобрали, пока клиентка думала — молча возвращаем к выбору даты.
        if isinstance(target, CallbackQuery):
            await target.answer(texts.ERR_NO_SLOTS, show_alert=True)
        else:
            await target.answer(texts.ERR_NO_SLOTS)
        await show_days(target, state)
        return

    await state.set_state(BookingSG.slot)
    await _show(
        target,
        texts.STEP_TIME.format(
            date=dt.fmt_date_full(day),
            service=service["name"],
            duration=texts.format_duration(service["duration"]),
        ),
        kb.slots_keyboard(free),
    )


@router.callback_query(F.data.startswith(f"{kb.CB_SLOT}:"))
async def on_slot(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    moment = dt.parse_hhmm(callback.data.split(":", 2)[2])
    found = await _service_from_state(state)
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("day", ""))

    if moment is None or found is None or day is None:
        await show_categories(callback, state)
        return

    _, service = found
    start_at = dt.combine(day, moment)
    if not await slots.is_slot_free(start_at, service["duration"]):
        await callback.answer(texts.ERR_SLOT_TAKEN, show_alert=True)
        await show_slots(callback, state)
        return

    await state.update_data(slot=dt.fmt_time(start_at))
    await ask_name(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 5. Имя
# --------------------------------------------------------------------------- #


async def ask_name(target: Target, state: FSMContext) -> None:
    await state.set_state(BookingSG.name)

    if isinstance(target, CallbackQuery):
        found = await _service_from_state(state)
        data = await state.get_data()
        day = dt.parse_iso_date(data.get("day", ""))
        if found and day:
            _, service = found
            await tg.safe_edit(
                target,
                f"✅ {service['name']}\n📅 {dt.fmt_date_full(day)}, о {data.get('slot', '')}",
                None,
            )
        else:
            await tg.drop_markup(target)

    message = _as_message(target)
    if message is None:
        return
    await message.answer(texts.STEP_NAME, reply_markup=kb.flow_reply_keyboard())


@router.message(StateFilter(BookingSG), F.text == texts.BTN_BACK)
async def on_back_button(message: Message, state: FSMContext) -> None:
    """Reply-кнопка «⬅️ Назад» — работает на любом шаге сценария."""
    current = await state.get_state()
    await render_step(BACK_FROM_STATE.get(current or "", "category"), message, state)


@router.message(BookingSG.name, F.text)
async def on_name(message: Message, state: FSMContext) -> None:
    name = validators.validate_name(message.text or "")
    if name is None:
        await message.answer(texts.ERR_NAME, reply_markup=kb.flow_reply_keyboard())
        return

    await state.update_data(client_name=name)
    await ask_phone(message, state)


# --------------------------------------------------------------------------- #
# Шаг 6. Телефон
# --------------------------------------------------------------------------- #


async def ask_phone(target: Target, state: FSMContext) -> None:
    await state.set_state(BookingSG.phone)

    if isinstance(target, CallbackQuery):
        await tg.drop_markup(target)

    message = _as_message(target)
    if message is None:
        return
    await message.answer(
        texts.STEP_PHONE,
        reply_markup=kb.flow_reply_keyboard(with_contact=True),
    )


@router.message(BookingSG.phone, F.contact)
async def on_contact(message: Message, state: FSMContext) -> None:
    contact = message.contact
    if contact is None:
        return
    # Кнопка «поделиться контактом» может прислать чужой контакт — это допустимо,
    # клиентка вправе записать подругу. Важно только, чтобы номер был украинским.
    phone = validators.normalize_phone(contact.phone_number)
    if phone is None:
        await message.answer(texts.ERR_PHONE, reply_markup=kb.flow_reply_keyboard(with_contact=True))
        return

    await state.update_data(phone=phone)
    await show_confirm(message, state)


@router.message(BookingSG.phone, F.text)
async def on_phone(message: Message, state: FSMContext) -> None:
    phone = validators.normalize_phone(message.text or "")
    if phone is None:
        await message.answer(texts.ERR_PHONE, reply_markup=kb.flow_reply_keyboard(with_contact=True))
        return

    await state.update_data(phone=phone)
    await show_confirm(message, state)


# --------------------------------------------------------------------------- #
# Шаг 7. Подтверждение
# --------------------------------------------------------------------------- #


async def show_confirm(target: Target, state: FSMContext) -> None:
    found = await _service_from_state(state)
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("day", ""))
    moment = dt.parse_hhmm(data.get("slot", ""))

    if found is None or day is None or moment is None or not data.get("phone"):
        await show_categories(target, state)
        return

    _, service = found
    await state.set_state(BookingSG.confirm)

    card = texts.CONFIRM_CARD.format(
        service=service["name"],
        duration=texts.format_duration(service["duration"]),
        price=service["price"],
        currency=config.CURRENCY,
        date=dt.fmt_date_full(day),
        time=dt.fmt_time(moment),
        name=data.get("client_name", ""),
        phone=validators.format_phone(data["phone"]),
    )

    message = _as_message(target)
    if message is None:
        return
    # Возвращаем главное меню: шаги с текстовым вводом закончились.
    # Инлайн-карточка и reply-клавиатура не помещаются в одно сообщение,
    # поэтому короткая подводка отправляется отдельно.
    await message.answer(texts.ALMOST_DONE, reply_markup=kb.main_menu())
    await message.answer(card, reply_markup=kb.confirm_keyboard())


@router.callback_query(F.data == kb.CB_CONFIRM)
async def on_confirm(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    found = await _service_from_state(state)
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("day", ""))
    moment = dt.parse_hhmm(data.get("slot", ""))
    user = callback.from_user

    if found is None or day is None or moment is None or not data.get("phone"):
        await show_categories(callback, state)
        return

    category, service = found
    start_at = dt.combine(day, moment)
    end_at = start_at + timedelta(minutes=service["duration"])

    if not await slots.is_slot_free(start_at, service["duration"]):
        await tg.safe_edit(callback, texts.ERR_SLOT_TAKEN, None)
        await show_slots(callback, state)
        return

    result = await db.create_booking(
        user_id=user.id,
        username=user.username,
        client_name=data.get("client_name", user.first_name or "Клієнт"),
        phone=data["phone"],
        category_code=category["code"],
        service_code=service["code"],
        service_name=service["name"],
        price=service["price"],
        duration=service["duration"],
        start_at=start_at,
        end_at=end_at,
    )

    if result.status == "limit":
        await tg.safe_edit(
            callback,
            texts.ERR_LIMIT.format(count=config.MAX_ACTIVE_BOOKINGS),
            None,
        )
        await state.clear()
        return

    if result.status == "busy" or result.booking is None:
        await tg.safe_edit(callback, texts.ERR_SLOT_TAKEN, None)
        await show_slots(callback, state)
        return

    booking = result.booking
    await state.clear()

    await tg.safe_edit(
        callback,
        texts.BOOKING_DONE.format(
            date=dt.fmt_date_full(booking.start_at.date()),
            time=dt.fmt_time(booking.start_at),
            service=booking.service_name,
            price=booking.price,
            currency=config.CURRENCY,
        ),
        None,
    )
    await notify_master_new(callback, booking)


async def notify_master_new(callback: CallbackQuery, booking: Booking) -> None:
    """Мгновенное уведомление мастеру о новой записи."""
    if config.ADMIN_ID <= 0:
        logger.warning("ADMIN_ID не налаштований — сповіщення майстру не надіслано")
        return

    user = callback.from_user
    await tg.notify(
        callback.bot,
        config.ADMIN_ID,
        texts.ADMIN_NEW_BOOKING.format(
            date=dt.fmt_date_full(booking.start_at.date()),
            time=dt.fmt_time(booking.start_at),
            end_time=dt.fmt_time(booking.end_at),
            service=booking.service_name,
            price=booking.price,
            currency=config.CURRENCY,
            name=booking.client_name,
            phone=validators.format_phone(booking.phone),
            contact=tg.user_link(user.id, user.full_name, user.username),
            id=booking.id,
        ),
    )


# --------------------------------------------------------------------------- #
# Кнопки «⬅️ Назад» из инлайн-клавиатур
# --------------------------------------------------------------------------- #


async def render_step(step: str, target: Target, state: FSMContext) -> None:
    """Отрисовать произвольный шаг сценария по его имени."""
    if step == "category":
        await show_categories(target, state)
    elif step == "service":
        await show_services(target, state)
    elif step == "day":
        await show_days(target, state)
    elif step == "slot":
        await show_slots(target, state)
    elif step == "name":
        await ask_name(target, state)
    elif step == "phone":
        await ask_phone(target, state)
    else:
        await show_categories(target, state)


@router.callback_query(F.data.startswith(f"{kb.CB_BACK}:"))
async def on_back_inline(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await render_step(callback.data.split(":", 2)[2], callback, state)


# --------------------------------------------------------------------------- #
# Мои записи
# --------------------------------------------------------------------------- #


async def show_my_bookings(message: Message, state: FSMContext) -> None:
    await state.clear()
    if message.from_user is None:
        return
    bookings = await db.get_user_active_bookings(message.from_user.id)

    if not bookings:
        await message.answer(texts.MY_EMPTY, reply_markup=kb.main_menu())
        return

    lines = [texts.MY_HEADER]
    for booking in bookings:
        lines.append(
            texts.MY_ITEM.format(
                date=dt.fmt_date_full(booking.start_at.date()),
                time=dt.fmt_time(booking.start_at),
                service=booking.service_name,
                duration=texts.format_duration(booking.duration),
                price=booking.price,
                currency=config.CURRENCY,
            )
        )
    await message.answer("\n\n".join(lines), reply_markup=kb.my_bookings_keyboard(bookings))


@router.callback_query(F.data.startswith(f"{kb.CB_MY_CANCEL}:"))
async def on_my_cancel_ask(callback: CallbackQuery) -> None:
    await callback.answer()
    booking = await _own_booking(callback)
    if booking is None:
        return

    await tg.safe_edit(
        callback,
        texts.MY_CANCEL_ASK.format(
            date=dt.fmt_date_full(booking.start_at.date()),
            time=dt.fmt_time(booking.start_at),
            service=booking.service_name,
        ),
        kb.my_cancel_confirm_keyboard(booking.id),
    )


@router.callback_query(F.data == kb.CB_MY_CANCEL_NO)
async def on_my_cancel_no(callback: CallbackQuery) -> None:
    await callback.answer()
    await tg.safe_edit(callback, texts.MY_CANCEL_KEPT, None)


@router.callback_query(F.data.startswith(f"{kb.CB_MY_CANCEL_YES}:"))
async def on_my_cancel_yes(callback: CallbackQuery) -> None:
    await callback.answer()
    booking_id = _parse_id(callback.data)
    if booking_id is None:
        await tg.safe_edit(callback, texts.MY_CANCEL_GONE, None)
        return

    booking = await db.cancel_booking(
        booking_id,
        by=CANCELLED_BY_CLIENT,
        only_user_id=callback.from_user.id,
    )
    if booking is None:
        await tg.safe_edit(callback, texts.MY_CANCEL_GONE, None)
        return

    await tg.safe_edit(callback, texts.MY_CANCEL_DONE, None)
    logger.info("Клієнт %s скасував запис №%s", callback.from_user.id, booking.id)

    if config.ADMIN_ID > 0:
        await tg.notify(
            callback.bot,
            config.ADMIN_ID,
            texts.ADMIN_CLIENT_CANCELLED.format(
                date=dt.fmt_date_full(booking.start_at.date()),
                time=dt.fmt_time(booking.start_at),
                service=booking.service_name,
                name=booking.client_name,
                phone=validators.format_phone(booking.phone),
            ),
        )


def _parse_id(data: str | None) -> int | None:
    if not data:
        return None
    raw = data.split(":", 2)[2] if data.count(":") >= 2 else ""
    return int(raw) if raw.isdigit() else None


async def _own_booking(callback: CallbackQuery) -> Booking | None:
    """Запись клиента, если она существует, активна и принадлежит ему."""
    booking_id = _parse_id(callback.data)
    if booking_id is None:
        await tg.safe_edit(callback, texts.MY_CANCEL_GONE, None)
        return None

    booking = await db.get_booking(booking_id)
    if (
        booking is None
        or booking.user_id != callback.from_user.id
        or booking.status != STATUS_ACTIVE
        or booking.start_at <= dt.now()
    ):
        await tg.safe_edit(callback, texts.MY_CANCEL_GONE, None)
        return None
    return booking
