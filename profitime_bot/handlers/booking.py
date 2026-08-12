"""
Заявка на визит с ручным подтверждением владелицей.

Бот НЕ знает реальной занятости — её знает только Bookon. Поэтому клиент
выбирает не слот, а пожелание: дату и промежуток времени. Ни на одном экране
не написано, что время «свободно».

Навигация одинакова на каждом шаге: «⬅️ Назад» и «❌ Скасувати»,
плюс /cancel в любой момент (обрабатывается в handlers/common.py).
"""

from __future__ import annotations

import logging

from aiogram import Bot, F, Router
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

import config
from database import queries
from database.models import (
    DIRECTION_CONSULT,
    DIRECTION_EPILATION,
    DIRECTION_REJUVENATION,
    Request,
)
from keyboards import admin_kb
from keyboards import calendar_kb
from keyboards import client_kb as kb
from states.booking import RequestSG
from utils import dt, texts, tg, validators

logger = logging.getLogger(__name__)

router = Router(name="booking")

Target = Message | CallbackQuery

# Куда возвращает «Назад» с каждого шага.
BACK_TARGETS: dict[str, str] = {
    "direction": "direction",
    "items": "items",
    "date": "date",
    "window": "window",
    "name": "name",
    "phone": "phone",
    "comment": "comment",
}


# --------------------------------------------------------------------------- #
# Вспомогательные функции
# --------------------------------------------------------------------------- #


async def _show(target: Target, text: str, markup=None) -> None:
    if isinstance(target, CallbackQuery):
        await tg.safe_edit(target, text, markup)
    else:
        await target.answer(text, reply_markup=markup)


def _as_message(target: Target) -> Message | None:
    if isinstance(target, CallbackQuery):
        return target.message if isinstance(target.message, Message) else None
    return target


def _selection_summary(selected: list[str]) -> str:
    """Строка «Обрано: … Разом: N грн» над клавиатурой мультивыбора."""
    if not selected:
        return texts.CALC_SELECTED_EMPTY
    return texts.CALC_SELECTED.format(
        items=texts.format_items(selected),
        total=texts.items_total(selected),
        currency=config.CURRENCY,
    )


# --------------------------------------------------------------------------- #
# Точка входа
# --------------------------------------------------------------------------- #


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_START}:"))
async def start_request(callback: CallbackQuery, state: FSMContext) -> None:
    """
    Начало заявки.

    Payload — код услуги, «consult» или «-». Если услуга пришла из карточки
    или калькулятора, она сразу попадает в заявку и шаги 1–2 пропускаются.
    """
    await callback.answer()
    payload = callback.data.split(":", 2)[2]

    user_id = callback.from_user.id
    pending = await queries.count_pending_for_user(user_id)
    if pending >= config.MAX_PENDING_REQUESTS:
        await tg.safe_edit(
            callback,
            texts.REQ_LIMIT.format(count=pending, word=dt.plural_requests(pending)),
            kb.bookon_keyboard(with_request=False),
        )
        return

    await state.clear()

    if payload == "consult":
        await state.update_data(direction=DIRECTION_CONSULT, items=[])
        await show_date(callback, state)
        return

    service = config.get_any_service(payload) if payload != "-" else None
    if service is not None:
        direction = (
            DIRECTION_REJUVENATION
            if payload in config.SERVICES_REJUVENATION
            else DIRECTION_EPILATION
        )
        await state.update_data(direction=direction, items=[payload])
        await show_date(callback, state)
        return

    await show_direction(callback, state)


@router.callback_query(F.data == kb.CB_CALC_TO_REQUEST)
async def start_request_from_calculator(callback: CallbackQuery, state: FSMContext) -> None:
    """Заявка из калькулятора — с уже подставленными зонами."""
    await callback.answer()
    data = await state.get_data()
    selected: list[str] = list(data.get("calc_items", []))

    await state.clear()
    if selected:
        await state.update_data(direction=DIRECTION_EPILATION, items=selected)
        await show_date(callback, state)
    else:
        await show_direction(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 1. Направление
# --------------------------------------------------------------------------- #


async def show_direction(target: Target, state: FSMContext) -> None:
    await state.set_state(RequestSG.direction)
    await _show(target, texts.REQ_STEP_DIRECTION, kb.request_direction_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_DIR}:"))
async def on_direction(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    direction = callback.data.split(":", 2)[2]

    if direction not in (DIRECTION_EPILATION, DIRECTION_REJUVENATION, DIRECTION_CONSULT):
        await show_direction(callback, state)
        return

    await state.update_data(direction=direction, items=[])

    if direction == DIRECTION_CONSULT:
        await show_date(callback, state)
        return

    await show_items(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 2. Услуги
# --------------------------------------------------------------------------- #


async def show_items(target: Target, state: FSMContext) -> None:
    data = await state.get_data()
    direction = data.get("direction")
    selected: list[str] = list(data.get("items", []))

    await state.set_state(RequestSG.items)

    if direction == DIRECTION_REJUVENATION:
        await _show(target, texts.REQ_STEP_ITEMS_REJUV, kb.request_rejuvenation_keyboard())
        return

    await _show(
        target,
        texts.REQ_STEP_ITEMS_EPIL.format(selection=_selection_summary(selected)),
        kb.request_zones_keyboard(selected),
    )


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_ITEM}:"))
async def on_item(callback: CallbackQuery, state: FSMContext) -> None:
    """Тап по услуге: для эпиляции переключает выбор, для омоложения — выбирает одну."""
    code = callback.data.split(":", 2)[2]
    if config.get_any_service(code) is None:
        await callback.answer()
        await show_items(callback, state)
        return

    data = await state.get_data()
    direction = data.get("direction")

    if direction == DIRECTION_REJUVENATION:
        await callback.answer()
        await state.update_data(items=[code])
        await show_date(callback, state)
        return

    selected: list[str] = list(data.get("items", []))
    if code in selected:
        selected.remove(code)
        await callback.answer("Прибрали")
    else:
        selected.append(code)
        await callback.answer("Додали")

    await state.update_data(items=selected)
    await tg.safe_edit(
        callback,
        texts.REQ_STEP_ITEMS_EPIL.format(selection=_selection_summary(selected)),
        kb.request_zones_keyboard(selected),
    )


@router.callback_query(F.data == kb.CB_REQ_ITEMS_OK)
async def on_items_done(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    data = await state.get_data()
    if not data.get("items"):
        await callback.answer(texts.REQ_NO_ITEMS, show_alert=True)
        return
    await show_date(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 3. Желаемая дата
# --------------------------------------------------------------------------- #


async def show_date(target: Target, state: FSMContext) -> None:
    data = await state.get_data()
    selected: list[str] = list(data.get("items", []))

    summary = texts.format_items(selected) if selected else f"{texts.E_LASER} Консультація"
    if selected:
        summary += f"\n\n💰 За сеанс: <b>{texts.items_total(selected)} {config.CURRENCY}</b>"

    await state.set_state(RequestSG.date)
    await _show(
        target,
        texts.REQ_STEP_DATE.format(summary=summary) + f"\n\n{calendar_kb.month_hint()}",
        calendar_kb.calendar_keyboard(
            back_callback=f"{kb.CB_REQ_BACK}:items",
            cancel_callback=kb.CB_REQ_CANCEL,
        ),
    )


@router.callback_query(F.data.startswith(f"{calendar_kb.CB_DAY}:"))
async def on_date(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    day = dt.parse_iso_date(callback.data.split(":", 2)[2])

    if not calendar_kb.is_selectable(day):
        await callback.answer(texts.REQ_DATE_PASSED, show_alert=True)
        await show_date(callback, state)
        return

    await state.update_data(date=day.isoformat())
    await show_window(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 4. Промежуток времени
# --------------------------------------------------------------------------- #


async def show_window(target: Target, state: FSMContext) -> None:
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("date", ""))
    if day is None:
        await show_date(target, state)
        return

    await state.set_state(RequestSG.window)
    await _show(
        target,
        texts.REQ_STEP_WINDOW.format(date=dt.fmt_date_full(day)),
        kb.request_window_keyboard(),
    )


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_WINDOW}:"))
async def on_window(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    code = callback.data.split(":", 2)[2]

    if config.get_time_window(code) is None:
        await show_window(callback, state)
        return

    await state.update_data(window=code)
    await ask_name(callback, state)


# --------------------------------------------------------------------------- #
# Шаг 5. Имя и телефон
# --------------------------------------------------------------------------- #


async def ask_name(target: Target, state: FSMContext) -> None:
    """
    Запрос имени.

    Для повторных клиентов имя и телефон уже известны — предлагаем
    подтвердить сохранённые данные одной кнопкой.
    """
    user_id = target.from_user.id if target.from_user else 0
    profile = await queries.get_user(user_id)

    await state.set_state(RequestSG.name)

    if profile and profile.client_name and profile.phone:
        await state.update_data(saved_name=profile.client_name, saved_phone=profile.phone)
        text = (
            f"{texts.E_FORM} <b>Крок 5 з 6.</b> Ваші контакти\n"
            f"{texts.DIVIDER}\n\n"
            f"👤 {tg.escape(profile.client_name)}\n"
            f"📱 {validators.format_phone(profile.phone)}\n\n"
            "Все вірно?"
        )
        await _show(target, text, kb.request_saved_contacts_keyboard())
        return

    await _show(target, texts.REQ_STEP_NAME, kb.request_name_keyboard())


@router.callback_query(F.data == kb.CB_REQ_CONTACTS_OK)
async def on_contacts_ok(callback: CallbackQuery, state: FSMContext) -> None:
    """Повторный клиент подтвердил сохранённые контакты."""
    await callback.answer()
    data = await state.get_data()
    await state.update_data(
        name=data.get("saved_name", ""), phone=data.get("saved_phone", "")
    )
    await ask_comment(callback, state)


@router.callback_query(F.data == kb.CB_REQ_CONTACTS_EDIT)
async def on_contacts_edit(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.set_state(RequestSG.name)
    await tg.safe_edit(callback, texts.REQ_STEP_NAME, kb.request_name_keyboard())


@router.message(RequestSG.name, F.text)
async def on_name(message: Message, state: FSMContext) -> None:
    name = validators.validate_name(message.text or "")
    if name is None:
        await message.answer(texts.ERR_NAME, reply_markup=kb.request_name_keyboard())
        return

    await state.update_data(name=name)
    await ask_phone(message, state)


async def ask_phone(target: Target, state: FSMContext) -> None:
    await state.set_state(RequestSG.phone)
    message = _as_message(target)
    if message is None:
        return
    if isinstance(target, CallbackQuery):
        await tg.drop_markup(target)
    await message.answer(texts.REQ_STEP_PHONE, reply_markup=kb.request_phone_keyboard())


@router.message(RequestSG.phone, F.contact)
async def on_contact(message: Message, state: FSMContext) -> None:
    contact = message.contact
    if contact is None:
        return

    phone = validators.normalize_phone(contact.phone_number)
    if phone is None:
        await message.answer(texts.ERR_PHONE, reply_markup=kb.request_phone_keyboard())
        return

    await state.update_data(phone=phone)
    await ask_comment(message, state)


@router.message(RequestSG.phone, F.text)
async def on_phone(message: Message, state: FSMContext) -> None:
    phone = validators.normalize_phone(message.text or "")
    if phone is None:
        await message.answer(texts.ERR_PHONE, reply_markup=kb.request_phone_keyboard())
        return

    await state.update_data(phone=phone)
    await ask_comment(message, state)


# --------------------------------------------------------------------------- #
# Шаг 6. Комментарий и подтверждение
# --------------------------------------------------------------------------- #


async def ask_comment(target: Target, state: FSMContext) -> None:
    await state.set_state(RequestSG.comment)
    message = _as_message(target)
    if message is None:
        return
    if isinstance(target, CallbackQuery):
        await tg.drop_markup(target)

    # Возвращаем главное меню: шаги с reply-клавиатурой закончились.
    await message.answer("✅ Контакти записали", reply_markup=kb.main_menu())
    await message.answer(texts.REQ_STEP_COMMENT, reply_markup=kb.request_comment_keyboard())


@router.message(RequestSG.comment, F.text)
async def on_comment(message: Message, state: FSMContext) -> None:
    await state.update_data(comment=validators.clean_comment(message.text or ""))
    await show_confirm(message, state)


@router.callback_query(F.data == kb.CB_REQ_SKIP)
async def on_comment_skip(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.update_data(comment=None)
    await show_confirm(callback, state)


async def show_confirm(target: Target, state: FSMContext) -> None:
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("date", ""))
    window = config.get_time_window(data.get("window", ""))

    if day is None or window is None or not data.get("phone"):
        await show_direction(target, state)
        return

    selected: list[str] = list(data.get("items", []))
    total = texts.items_total(selected)
    comment = data.get("comment")

    await state.set_state(RequestSG.confirm)
    await _show(
        target,
        texts.REQ_CONFIRM.format(
            items=texts.format_items(selected),
            total=f"💰 Разом за сеанс: <b>{total} {config.CURRENCY}</b>\n\n" if total else "\n",
            date=dt.fmt_date_full(day),
            window=f"{window['title']} {window['hours']}",
            name=tg.escape(data.get("name", "")),
            phone=validators.format_phone(data.get("phone", "")),
            comment=f"💬 {tg.escape(comment)}\n" if comment else "",
        ),
        kb.request_confirm_keyboard(),
    )


@router.callback_query(F.data == kb.CB_REQ_SEND)
async def on_send(callback: CallbackQuery, state: FSMContext, bot: Bot) -> None:
    await callback.answer()
    data = await state.get_data()
    day = dt.parse_iso_date(data.get("date", ""))
    window = config.get_time_window(data.get("window", ""))
    user = callback.from_user

    if day is None or window is None or not data.get("phone"):
        await show_direction(callback, state)
        return

    selected: list[str] = list(data.get("items", []))
    direction = data.get("direction", DIRECTION_CONSULT)
    name = data.get("name", "") or (user.first_name or "Клієнт")
    phone = data["phone"]

    profile = await queries.get_user(user.id)
    referral_note = None
    if profile and profile.referred_by:
        inviter = await queries.get_user(profile.referred_by)
        inviter_name = (inviter.client_name or inviter.full_name or "клієнтка") if inviter else "клієнтка"
        referral_note = texts.REFERRAL_NEW_CLIENT.format(name=tg.escape(inviter_name))

    request = await queries.create_request(
        user_id=user.id,
        direction=direction,
        items=selected,
        items_title=", ".join(texts.service_title(code) for code in selected) or "Консультація",
        total_price=texts.items_total(selected),
        preferred_date=day.isoformat(),
        preferred_window=window["code"],
        client_name=name,
        phone=phone,
        comment=data.get("comment"),
        referral_note=referral_note,
    )

    await queries.update_contacts(user.id, name, phone)
    await state.clear()

    await tg.safe_edit(
        callback,
        texts.REQ_SENT.format(
            date=dt.fmt_date_full(day),
            window=f"{window['title'].lower()} {window['hours']}",
        ),
        kb.request_sent_keyboard(),
    )

    await notify_admins(bot, request, user.id, user.full_name, user.username)
    logger.info("Нова заявка №%s від %s", request.id, user.id)


async def notify_admins(
    bot: Bot,
    request: Request,
    user_id: int,
    full_name: str | None,
    username: str | None,
) -> None:
    """Уведомление владелицы о новой заявке. Отправляется всем ADMIN_IDS."""
    window = config.get_time_window(request.preferred_window)
    day = dt.parse_iso_date(request.preferred_date)

    text = texts.ADMIN_NEW_REQUEST.format(
        id=request.id,
        items=texts.format_items(request.items),
        total=f"💰 Разом: <b>{request.total_price} {config.CURRENCY}</b>\n\n"
        if request.total_price
        else "\n",
        date=dt.fmt_date_full(day) if day else request.preferred_date,
        window=f"{window['title']} {window['hours']}" if window else request.preferred_window,
        name=tg.escape(request.client_name),
        phone=f"<code>{validators.format_phone(request.phone)}</code>",
        contact=tg.user_link(user_id, full_name or "", username),
        comment=f"💬 {tg.escape(request.comment)}\n" if request.comment else "",
        referral=f"{request.referral_note}\n" if request.referral_note else "",
    )

    for admin_id in config.ADMIN_IDS:
        await tg.notify(bot, admin_id, text, admin_kb.request_actions_keyboard(request))


# --------------------------------------------------------------------------- #
# Навигация «Назад» и отмена
# --------------------------------------------------------------------------- #


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_BACK}:"))
async def on_back(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    step = callback.data.split(":", 2)[2]

    if step == "direction":
        await show_direction(callback, state)
    elif step == "items":
        data = await state.get_data()
        if data.get("direction") == DIRECTION_CONSULT:
            await show_direction(callback, state)
        else:
            await show_items(callback, state)
    elif step == "date":
        await show_date(callback, state)
    elif step == "window":
        await show_window(callback, state)
    elif step == "name":
        await ask_name(callback, state)
    elif step == "phone":
        await ask_phone(callback, state)
    elif step == "comment":
        await ask_comment(callback, state)
    else:
        await show_direction(callback, state)


@router.message(StateFilter(RequestSG), F.text == texts.BTN_BACK)
async def on_back_button(message: Message, state: FSMContext) -> None:
    """Reply-кнопка «Назад» на шаге ввода телефона."""
    current = await state.get_state()
    if current == RequestSG.phone.state:
        await state.set_state(RequestSG.name)
        await message.answer("✅ Повертаємось", reply_markup=kb.main_menu())
        await message.answer(texts.REQ_STEP_NAME, reply_markup=kb.request_name_keyboard())
        return
    await show_direction(message, state)


@router.callback_query(F.data == kb.CB_REQ_CANCEL)
async def on_cancel(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await tg.safe_edit(callback, texts.CANCELLED_FLOW, None)
    message = _as_message(callback)
    if message is not None:
        await message.answer(texts.MENU_PROMPT, reply_markup=kb.main_menu())


# --------------------------------------------------------------------------- #
# Ответ клиента на предложенное время
# --------------------------------------------------------------------------- #


@router.callback_query(F.data.startswith(f"{kb.CB_CLIENT_ACCEPT}:"))
async def on_client_accept(callback: CallbackQuery, bot: Bot) -> None:
    """Клиент согласился на предложенное владелицей время."""
    await callback.answer()
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None

    if request is None or request.proposed_datetime is None:
        await tg.safe_edit(callback, texts.STALE_BUTTON, None)
        return

    await tg.safe_edit(callback, texts.CLIENT_RESCHEDULE_OK, None)

    text = texts.ADMIN_CLIENT_REPLY_OK.format(
        id=request.id,
        name=tg.escape(request.client_name),
        phone=validators.format_phone(request.phone),
        datetime=dt.fmt_datetime(request.proposed_datetime),
    )
    for admin_id in config.ADMIN_IDS:
        await tg.notify(bot, admin_id, text, admin_kb.request_actions_keyboard(request))


@router.callback_query(F.data.startswith(f"{kb.CB_CLIENT_REJECT}:"))
async def on_client_reject(callback: CallbackQuery, bot: Bot) -> None:
    """Клиенту не подошло предложенное время — просит перезвонить."""
    await callback.answer()
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None

    if request is None:
        await tg.safe_edit(callback, texts.STALE_BUTTON, None)
        return

    await tg.safe_edit(callback, texts.CLIENT_RESCHEDULE_NO, kb.bookon_keyboard(with_request=False))

    text = texts.ADMIN_CLIENT_REPLY_NO.format(
        id=request.id,
        name=tg.escape(request.client_name),
        phone=f"<code>{validators.format_phone(request.phone)}</code>",
    )
    for admin_id in config.ADMIN_IDS:
        await tg.notify(bot, admin_id, text)


def _parse_id(data: str | None) -> int | None:
    if not data or data.count(":") < 2:
        return None
    raw = data.split(":", 2)[2]
    return int(raw) if raw.isdigit() else None
