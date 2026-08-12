"""
Часть владелицы.

Доступ ограничен router-фильтром IsAdmin: сообщения и колбэки остальных
пользователей просто проходят мимо этого роутера дальше.

Ключевой момент — подтверждение заявки. Бот не знает, какое время реально
свободно: это знает Bookon. Поэтому владелица сначала вносит запись туда,
а потом сообщает боту фактические дату и время. Только после этого
появляется визит, от которого считаются напоминания и прогресс курса.
"""

from __future__ import annotations

import asyncio
import logging
from collections import defaultdict
from datetime import date, datetime, timedelta

from aiogram import Bot, F, Router
from aiogram.filters import BaseFilter, Command
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message, TelegramObject

import config
from database import queries
from database.models import Request, Visit
from keyboards import admin_kb as kb
from states.admin import BroadcastSG, ConfirmSG, DeclineSG, ManualVisitSG, PromoSG, RescheduleSG
from utils import dt, texts, tg, validators

logger = logging.getLogger(__name__)

# Код «услуги» для консультации: визит есть, курса нет.
CONSULT_CODE = "consult"


class IsAdmin(BaseFilter):
    """Пропускает только владелицу (ADMIN_IDS из .env)."""

    async def __call__(self, event: TelegramObject) -> bool:
        user = getattr(event, "from_user", None)
        return bool(user and user.id in config.ADMIN_IDS)


router = Router(name="admin")
router.message.filter(IsAdmin())
router.callback_query.filter(IsAdmin())


# --------------------------------------------------------------------------- #
# Вспомогательные функции
# --------------------------------------------------------------------------- #


def _parse_id(data: str | None, position: int = 2) -> int | None:
    if not data:
        return None
    parts = data.split(":")
    if len(parts) <= position:
        return None
    raw = parts[position]
    return int(raw) if raw.isdigit() else None


def _request_items_line(request: Request) -> str:
    return texts.format_items(request.items) if request.items else f"{texts.E_LASER} Консультація"


def _request_total_line(request: Request) -> str:
    if not request.total_price:
        return "\n"
    return f"💰 Разом: <b>{request.total_price} {config.CURRENCY}</b>\n\n"


def _window_line(request: Request) -> str:
    window = config.get_time_window(request.preferred_window)
    return f"{window['title']} {window['hours']}" if window else request.preferred_window


def _date_line(request: Request) -> str:
    day = dt.parse_iso_date(request.preferred_date)
    return dt.fmt_date_full(day) if day else request.preferred_date


def _request_card(request: Request, extra: str = "") -> str:
    from database.models import STATUS_EMOJI, STATUS_TITLES

    created = dt.from_db(request.created_at) if request.created_at else dt.now()
    return texts.ADMIN_REQUEST_CARD.format(
        status_emoji=STATUS_EMOJI.get(request.status, "•"),
        status_title=STATUS_TITLES.get(request.status, request.status),
        id=request.id,
        items=_request_items_line(request),
        total=_request_total_line(request),
        date=_date_line(request),
        window=_window_line(request),
        name=tg.escape(request.client_name),
        phone=f"<code>{validators.format_phone(request.phone)}</code>",
        contact=tg.user_link(request.user_id, request.client_name, None),
        comment=f"💬 {tg.escape(request.comment)}\n" if request.comment else "",
        referral=f"{request.referral_note}\n" if request.referral_note else "",
        extra=extra,
        created=dt.fmt_datetime(created),
    )


async def _create_visits(request: Request, when: datetime) -> None:
    """
    Завести визиты по подтверждённой заявке.

    По одному на каждую выбранную услугу: у каждой зоны свой курс и свой
    интервал, поэтому прогресс считается отдельно. Для консультации
    создаётся один служебный визит — он нужен ради напоминания.
    """
    codes = request.items or [CONSULT_CODE]
    for code in codes:
        await queries.create_visit(
            user_id=request.user_id,
            request_id=request.id,
            client_name=request.client_name,
            phone=request.phone,
            service_code=code,
            service_title=texts.service_title(code) if code != CONSULT_CODE else "Консультація",
            visit_at=when,
        )


def group_visits(visits: list[Visit]) -> list[tuple[datetime, list[Visit]]]:
    """
    Визиты одного клиента на одно время — это один приход, а не несколько.

    Нужно и для расписания владелицы, и для напоминаний: иначе клиентка,
    записанная на три зоны, получит три одинаковых сообщения.
    """
    grouped: dict[tuple[int | None, str], list[Visit]] = defaultdict(list)
    for visit in visits:
        grouped[(visit.user_id, dt.to_db(visit.visit_at))].append(visit)

    result = [(items[0].visit_at, items) for items in grouped.values()]
    result.sort(key=lambda pair: pair[0])
    return result


# --------------------------------------------------------------------------- #
# Меню
# --------------------------------------------------------------------------- #


async def _menu_text() -> str:
    pending = await queries.count_pending()
    today = dt.today()
    visits = await queries.get_visits_between(
        dt.start_of_day(today), dt.start_of_day(today + timedelta(days=1))
    )
    return texts.ADMIN_MENU.format(pending=pending, today=len(group_visits(visits)))


@router.message(Command("admin"))
async def cmd_admin(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(await _menu_text(), reply_markup=kb.admin_menu())


@router.callback_query(F.data == kb.CB_ADM_MENU)
async def show_menu(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await tg.safe_edit(callback, await _menu_text(), kb.admin_menu())


@router.callback_query(F.data == kb.CB_ADM_CANCEL)
async def cancel_admin_flow(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await tg.safe_edit(callback, await _menu_text(), kb.admin_menu())


# --------------------------------------------------------------------------- #
# Заявки
# --------------------------------------------------------------------------- #


@router.callback_query(F.data == kb.CB_ADM_REQUESTS)
async def show_pending(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    requests = await queries.list_pending()

    if not requests:
        await tg.safe_edit(callback, texts.ADMIN_NO_PENDING, kb.back_to_admin_keyboard())
        return

    header = f"🔔 <b>Заявки в роботі: {len(requests)}</b>\n{texts.DIVIDER}\n\nОберіть заявку 👇"
    await tg.safe_edit(callback, header, kb.pending_list_keyboard(requests))


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_CARD}:"))
async def show_request_card(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None

    if request is None:
        await tg.safe_edit(callback, texts.ADMIN_REQUEST_GONE, kb.back_to_admin_keyboard())
        return

    extra = ""
    if request.proposed_datetime:
        extra = f"🕐 Запропоновано: <b>{dt.fmt_datetime(request.proposed_datetime)}</b>\n\n"

    await tg.safe_edit(callback, _request_card(request, extra), kb.request_actions_keyboard(request))


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_PHONE}:"))
async def show_phone(callback: CallbackQuery) -> None:
    """Телефон крупно, всплывающим окном — удобно диктовать вслух."""
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None
    if request is None:
        await callback.answer(texts.ADMIN_REQUEST_GONE, show_alert=True)
        return
    await callback.answer(
        f"{request.client_name}\n{validators.format_phone(request.phone)}", show_alert=True
    )


# --- подтверждение ---


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_CONFIRM}:"))
async def ask_confirm_datetime(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None

    if request is None:
        await tg.safe_edit(callback, texts.ADMIN_REQUEST_GONE, kb.back_to_admin_keyboard())
        return

    await state.set_state(ConfirmSG.datetime_input)
    await state.update_data(request_id=request.id)

    hint = ""
    if request.proposed_datetime:
        hint = f"\n<i>Ви пропонували: {dt.fmt_datetime(request.proposed_datetime)}</i>"

    await tg.safe_edit(
        callback, texts.ADMIN_ASK_DATETIME.format(id=request.id) + hint, kb.cancel_keyboard()
    )


@router.message(ConfirmSG.datetime_input, F.text)
async def on_confirm_datetime(message: Message, state: FSMContext, bot: Bot) -> None:
    when = dt.parse_user_datetime(message.text or "")
    if when is None:
        await message.answer(texts.ADMIN_BAD_DATETIME, reply_markup=kb.cancel_keyboard())
        return
    if when < dt.now() - timedelta(hours=1):
        await message.answer(texts.ADMIN_DATETIME_PAST, reply_markup=kb.cancel_keyboard())
        return

    data = await state.get_data()
    request_id = data.get("request_id")
    admin_id = message.from_user.id if message.from_user else 0

    request = await queries.confirm_request(int(request_id), admin_id, when) if request_id else None
    await state.clear()

    if request is None:
        await message.answer(texts.ADMIN_REQUEST_GONE, reply_markup=kb.back_to_admin_keyboard())
        return

    await _create_visits(request, when)

    await message.answer(
        texts.ADMIN_CONFIRMED.format(
            id=request.id,
            datetime=dt.fmt_datetime(when),
            name=tg.escape(request.client_name),
        ),
        reply_markup=kb.back_to_admin_keyboard(),
    )

    await tg.notify(
        bot,
        request.user_id,
        texts.CLIENT_CONFIRMED.format(
            date=dt.fmt_date_full(when.date()),
            time=dt.fmt_time(when),
            items=_request_items_line(request),
            address=config.ADDRESS,
            prep=texts.format_prep_short(),
            phone=config.PHONE,
        ),
    )
    logger.info("Заявку №%s підтверджено на %s", request.id, dt.to_db(when))


# --- предложение другого времени ---


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_RESCHEDULE}:"))
async def ask_proposal(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None

    if request is None:
        await tg.safe_edit(callback, texts.ADMIN_REQUEST_GONE, kb.back_to_admin_keyboard())
        return

    await state.set_state(RescheduleSG.proposal)
    await state.update_data(request_id=request.id)
    await tg.safe_edit(callback, texts.ADMIN_ASK_PROPOSAL.format(id=request.id), kb.cancel_keyboard())


@router.message(RescheduleSG.proposal, F.text)
async def on_proposal(message: Message, state: FSMContext, bot: Bot) -> None:
    when = dt.parse_user_datetime(message.text or "")
    if when is None:
        await message.answer(texts.ADMIN_BAD_DATETIME, reply_markup=kb.cancel_keyboard())
        return
    if when < dt.now() - timedelta(hours=1):
        await message.answer(texts.ADMIN_DATETIME_PAST, reply_markup=kb.cancel_keyboard())
        return

    data = await state.get_data()
    request_id = data.get("request_id")
    admin_id = message.from_user.id if message.from_user else 0

    request = await queries.propose_time(int(request_id), admin_id, when) if request_id else None
    await state.clear()

    if request is None:
        await message.answer(texts.ADMIN_REQUEST_GONE, reply_markup=kb.back_to_admin_keyboard())
        return

    await message.answer(texts.ADMIN_PROPOSAL_SENT, reply_markup=kb.back_to_admin_keyboard())

    from keyboards import client_kb

    await tg.notify(
        bot,
        request.user_id,
        texts.CLIENT_RESCHEDULED.format(proposal=dt.fmt_datetime(when)),
        client_kb.client_reschedule_keyboard(request.id),
    )


# --- отказ ---


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_DECLINE}:"))
async def ask_decline_reason(callback: CallbackQuery) -> None:
    await callback.answer()
    request_id = _parse_id(callback.data)
    request = await queries.get_request(request_id) if request_id else None

    if request is None:
        await tg.safe_edit(callback, texts.ADMIN_REQUEST_GONE, kb.back_to_admin_keyboard())
        return

    await tg.safe_edit(
        callback,
        texts.ADMIN_ASK_DECLINE_REASON.format(id=request.id),
        kb.decline_reasons_keyboard(request.id),
    )


@router.callback_query(F.data.startswith(f"{kb.CB_REQ_REASON}:"))
async def on_decline_reason(callback: CallbackQuery, state: FSMContext, bot: Bot) -> None:
    await callback.answer()
    parts = (callback.data or "").split(":")
    if len(parts) < 4:
        await tg.safe_edit(callback, texts.ADMIN_REQUEST_GONE, kb.back_to_admin_keyboard())
        return

    request_id = int(parts[2]) if parts[2].isdigit() else None
    reason_code = parts[3]

    if request_id is None:
        await tg.safe_edit(callback, texts.ADMIN_REQUEST_GONE, kb.back_to_admin_keyboard())
        return

    if reason_code == "other":
        await state.set_state(DeclineSG.custom_reason)
        await state.update_data(request_id=request_id)
        await tg.safe_edit(callback, texts.ADMIN_ASK_DECLINE_CUSTOM, kb.cancel_keyboard())
        return

    await _finish_decline(
        callback.message, bot, request_id,
        callback.from_user.id, config.decline_reason_title(reason_code),
    )


@router.message(DeclineSG.custom_reason, F.text)
async def on_decline_custom(message: Message, state: FSMContext, bot: Bot) -> None:
    data = await state.get_data()
    request_id = data.get("request_id")
    await state.clear()

    if request_id is None:
        await message.answer(texts.ADMIN_REQUEST_GONE, reply_markup=kb.back_to_admin_keyboard())
        return

    admin_id = message.from_user.id if message.from_user else 0
    await _finish_decline(
        message, bot, int(request_id), admin_id, validators.clean_free_text(message.text or "")
    )


async def _finish_decline(
    message: Message | None,
    bot: Bot,
    request_id: int,
    admin_id: int,
    reason: str,
) -> None:
    request = await queries.decline_request(request_id, admin_id, reason)

    if message is None:
        return
    if request is None:
        await message.answer(texts.ADMIN_REQUEST_GONE, reply_markup=kb.back_to_admin_keyboard())
        return

    await message.answer(
        texts.ADMIN_DECLINED.format(id=request.id), reply_markup=kb.back_to_admin_keyboard()
    )
    await tg.notify(
        bot,
        request.user_id,
        texts.CLIENT_DECLINED.format(reason=tg.escape(reason), phone=config.PHONE),
    )
    logger.info("Заявку №%s відхилено: %s", request.id, reason)


# --------------------------------------------------------------------------- #
# Расписание
# --------------------------------------------------------------------------- #


def _render_schedule(title: str, visits: list[Visit]) -> str:
    if not visits:
        return f"{texts.ADMIN_SCHEDULE_HEADER.format(title=title)}\n{texts.ADMIN_SCHEDULE_EMPTY}"

    blocks = [texts.ADMIN_SCHEDULE_HEADER.format(title=title)]
    current_day: date | None = None

    for when, group in group_visits(visits):
        if when.date() != current_day:
            current_day = when.date()
            blocks.append(f"\n<b>{dt.fmt_day_title(current_day)}</b>")
        blocks.append(
            texts.ADMIN_SCHEDULE_ITEM.format(
                time=dt.fmt_time(when),
                name=tg.escape(group[0].client_name),
                items="\n".join(f"{texts.E_LASER} {visit.service_title}" for visit in group),
                phone=f"<code>{validators.format_phone(group[0].phone)}</code>",
            )
        )
    return "\n".join(blocks)


@router.callback_query(F.data.startswith(f"{kb.CB_ADM_SCHEDULE}:"))
async def show_schedule(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    period = (callback.data or "").split(":")[-1]

    today = dt.today()
    if period == "tomorrow":
        start_day, days, title = today + timedelta(days=1), 1, "Завтра"
    elif period == "week":
        start_day, days, title = today, 7, "Найближчі 7 днів"
    else:
        period = "today"
        start_day, days, title = today, 1, "Сьогодні"

    visits = await queries.get_visits_between(
        dt.start_of_day(start_day), dt.start_of_day(start_day + timedelta(days=days))
    )
    await tg.safe_edit(callback, _render_schedule(title, visits), kb.schedule_keyboard(period))


# --------------------------------------------------------------------------- #
# Ручное добавление записи
# --------------------------------------------------------------------------- #


@router.callback_query(F.data == kb.CB_ADM_MANUAL)
async def manual_start(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await state.set_state(ManualVisitSG.name)
    await tg.safe_edit(callback, texts.ADMIN_MANUAL_NAME, kb.cancel_keyboard())


@router.message(ManualVisitSG.name, F.text)
async def manual_name(message: Message, state: FSMContext) -> None:
    name = validators.validate_name(message.text or "")
    if name is None:
        await message.answer(texts.ERR_NAME, reply_markup=kb.cancel_keyboard())
        return
    await state.update_data(name=name)
    await state.set_state(ManualVisitSG.phone)
    await message.answer(texts.ADMIN_MANUAL_PHONE, reply_markup=kb.cancel_keyboard())


@router.message(ManualVisitSG.phone, F.text)
async def manual_phone(message: Message, state: FSMContext) -> None:
    phone = validators.normalize_phone(message.text or "")
    if phone is None:
        await message.answer(texts.ERR_PHONE, reply_markup=kb.cancel_keyboard())
        return
    await state.update_data(phone=phone)
    await state.set_state(ManualVisitSG.service)
    await message.answer(texts.ADMIN_MANUAL_SERVICE, reply_markup=kb.manual_services_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_MANUAL_SERVICE}:"))
async def manual_service(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    code = (callback.data or "").split(":", 2)[2]
    if config.get_any_service(code) is None:
        await tg.safe_edit(callback, texts.ADMIN_MANUAL_SERVICE, kb.manual_services_keyboard())
        return

    await state.update_data(service=code)
    await state.set_state(ManualVisitSG.datetime_input)
    await tg.safe_edit(callback, texts.ADMIN_MANUAL_DATETIME, kb.cancel_keyboard())


@router.message(ManualVisitSG.datetime_input, F.text)
async def manual_datetime(message: Message, state: FSMContext) -> None:
    when = dt.parse_user_datetime(message.text or "")
    if when is None:
        await message.answer(texts.ADMIN_BAD_DATETIME, reply_markup=kb.cancel_keyboard())
        return

    data = await state.get_data()
    code = data.get("service", "")
    await state.clear()

    await queries.create_visit(
        user_id=None,
        request_id=None,
        client_name=data.get("name", ""),
        phone=data.get("phone", ""),
        service_code=code,
        service_title=texts.service_title(code),
        visit_at=when,
    )

    await message.answer(
        texts.ADMIN_MANUAL_DONE.format(
            name=tg.escape(data.get("name", "")),
            phone=validators.format_phone(data.get("phone", "")),
            items=f"{texts.E_LASER} {texts.service_title(code)}",
            datetime=dt.fmt_datetime(when),
        ),
        reply_markup=kb.back_to_admin_keyboard(),
    )


# --------------------------------------------------------------------------- #
# Акции
# --------------------------------------------------------------------------- #


@router.callback_query(F.data.startswith(f"{kb.CB_ADM_PROMO}:"))
async def promo_menu(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    action = (callback.data or "").split(":")[-1]

    if action == "add":
        await state.clear()
        await state.set_state(PromoSG.title)
        await tg.safe_edit(callback, texts.ADMIN_PROMO_TITLE, kb.cancel_keyboard())
        return

    if action == "list":
        await state.clear()
        promotions = await queries.list_db_promotions(active_only=False)
        active = [promo for promo in promotions if promo.active]
        if not active:
            await tg.safe_edit(callback, texts.ADMIN_PROMO_LIST_EMPTY, kb.promo_menu_keyboard())
            return
        await tg.safe_edit(
            callback,
            "📋 <b>Ваші акції</b>\n\nНатисніть, щоб зняти з публікації:",
            kb.promo_list_keyboard(active),
        )
        return

    await state.clear()
    count = len(await queries.list_db_promotions())
    await tg.safe_edit(
        callback, texts.ADMIN_PROMO_MENU.format(count=count), kb.promo_menu_keyboard()
    )


@router.callback_query(F.data.startswith(f"{kb.CB_PROMO_DEACTIVATE}:"))
async def promo_deactivate(callback: CallbackQuery) -> None:
    promo_id = _parse_id(callback.data)
    if promo_id is None or not await queries.deactivate_promotion(promo_id):
        await callback.answer("Акцію вже знято", show_alert=True)
    else:
        await callback.answer(texts.ADMIN_PROMO_DEACTIVATED, show_alert=True)

    promotions = [promo for promo in await queries.list_db_promotions(active_only=False) if promo.active]
    if promotions:
        await tg.safe_edit(
            callback,
            "📋 <b>Ваші акції</b>\n\nНатисніть, щоб зняти з публікації:",
            kb.promo_list_keyboard(promotions),
        )
    else:
        await tg.safe_edit(callback, texts.ADMIN_PROMO_LIST_EMPTY, kb.promo_menu_keyboard())


@router.message(PromoSG.title, F.text)
async def promo_title(message: Message, state: FSMContext) -> None:
    await state.update_data(title=validators.clean_free_text(message.text or "", 80))
    await state.set_state(PromoSG.description)
    await message.answer(texts.ADMIN_PROMO_DESC, reply_markup=kb.cancel_keyboard())


@router.message(PromoSG.description, F.text)
async def promo_description(message: Message, state: FSMContext) -> None:
    await state.update_data(description=validators.clean_free_text(message.text or "", 400))
    await state.set_state(PromoSG.old_price)
    await message.answer(texts.ADMIN_PROMO_OLD, reply_markup=kb.promo_skip_keyboard())


@router.message(PromoSG.old_price, F.text)
async def promo_old_price(message: Message, state: FSMContext) -> None:
    raw = (message.text or "").strip()
    if not raw.isdigit():
        await message.answer("Введіть число або пропустіть 👇", reply_markup=kb.promo_skip_keyboard())
        return
    await state.update_data(old_price=int(raw))
    await state.set_state(PromoSG.new_price)
    await message.answer(texts.ADMIN_PROMO_NEW, reply_markup=kb.cancel_keyboard())


@router.message(PromoSG.new_price, F.text)
async def promo_new_price(message: Message, state: FSMContext) -> None:
    raw = (message.text or "").strip()
    if not raw.isdigit():
        await message.answer("Введіть число 👇", reply_markup=kb.cancel_keyboard())
        return
    await state.update_data(new_price=int(raw))
    await state.set_state(PromoSG.valid_until)
    await message.answer(texts.ADMIN_PROMO_UNTIL, reply_markup=kb.cancel_keyboard())


@router.callback_query(F.data == kb.CB_PROMO_SKIP)
async def promo_skip_prices(callback: CallbackQuery, state: FSMContext) -> None:
    """Акция без чисел — например, «знижка 30% на перший сеанс»."""
    await callback.answer()
    await state.update_data(old_price=None, new_price=None)
    await state.set_state(PromoSG.valid_until)
    await tg.safe_edit(callback, texts.ADMIN_PROMO_UNTIL, kb.cancel_keyboard())


@router.message(PromoSG.valid_until, F.text)
async def promo_until(message: Message, state: FSMContext) -> None:
    when = dt.parse_user_datetime(f"{(message.text or '').strip()} 23:59")
    if when is None:
        await message.answer(
            "Не вдалося розібрати дату. Напишіть так: <code>31.12</code>",
            reply_markup=kb.cancel_keyboard(),
        )
        return

    await state.update_data(valid_until=when.date().isoformat())
    data = await state.get_data()

    from handlers.promotions import _promo_block

    preview = _promo_block(
        data.get("title", ""),
        data.get("description", ""),
        data.get("old_price"),
        data.get("new_price"),
        data["valid_until"],
    )
    await state.set_state(PromoSG.confirm)
    await message.answer(
        texts.ADMIN_PROMO_PREVIEW.format(preview=preview), reply_markup=kb.promo_confirm_keyboard()
    )


@router.callback_query(F.data == kb.CB_PROMO_SAVE)
async def promo_save(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    data = await state.get_data()
    await state.clear()

    if not data.get("title") or not data.get("valid_until"):
        await tg.safe_edit(callback, texts.STALE_BUTTON, kb.back_to_admin_keyboard())
        return

    await queries.add_promotion(
        title=data["title"],
        description=data.get("description", ""),
        old_price=data.get("old_price"),
        new_price=data.get("new_price"),
        valid_until=data["valid_until"],
    )
    await tg.safe_edit(callback, texts.ADMIN_PROMO_SAVED, kb.promo_menu_keyboard())


# --------------------------------------------------------------------------- #
# Рассылка
# --------------------------------------------------------------------------- #


@router.callback_query(F.data == kb.CB_ADM_BROADCAST)
async def broadcast_start(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    count = await queries.count_broadcast_targets()

    if count == 0:
        await tg.safe_edit(callback, texts.ADMIN_BROADCAST_NOBODY, kb.back_to_admin_keyboard())
        return

    await state.set_state(BroadcastSG.text)
    await tg.safe_edit(callback, texts.ADMIN_BROADCAST_ASK.format(count=count), kb.cancel_keyboard())


@router.message(BroadcastSG.text, F.text)
async def broadcast_preview(message: Message, state: FSMContext) -> None:
    text = validators.clean_free_text(message.text or "", 3000)
    count = await queries.count_broadcast_targets()

    await state.update_data(text=text)
    await state.set_state(BroadcastSG.confirm)
    await message.answer(
        texts.ADMIN_BROADCAST_PREVIEW.format(text=text, count=count),
        reply_markup=kb.broadcast_confirm_keyboard(),
    )


@router.callback_query(F.data == kb.CB_BC_CONFIRM)
async def broadcast_send(callback: CallbackQuery, state: FSMContext, bot: Bot) -> None:
    await callback.answer()
    data = await state.get_data()
    text = data.get("text", "")
    await state.clear()

    if not text:
        await tg.safe_edit(callback, texts.STALE_BUTTON, kb.back_to_admin_keyboard())
        return

    await tg.safe_edit(callback, texts.ADMIN_BROADCAST_RUNNING, None)

    targets = await queries.get_broadcast_targets()
    sent = failed = 0

    for index, user_id in enumerate(targets):
        if await tg.notify(bot, user_id, text):
            sent += 1
        else:
            failed += 1
        # Telegram разрешает примерно 30 сообщений в секунду — держимся ниже.
        if index % 20 == 19:
            await asyncio.sleep(1)

    admin_id = callback.from_user.id
    await queries.log_broadcast(admin_id, text, sent, failed)

    message = callback.message
    if isinstance(message, Message):
        await message.answer(
            texts.ADMIN_BROADCAST_DONE.format(sent=sent, failed=failed),
            reply_markup=kb.back_to_admin_keyboard(),
        )
    logger.info("Розсилка: доставлено %s, не доставлено %s", sent, failed)


# --------------------------------------------------------------------------- #
# Клиенты и статистика
# --------------------------------------------------------------------------- #


@router.callback_query(F.data == kb.CB_ADM_CLIENTS)
async def show_clients(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()

    total = await queries.count_clients()
    clients = await queries.list_clients(limit=20)

    if not clients:
        await tg.safe_edit(callback, texts.ADMIN_CLIENTS_EMPTY, kb.back_to_admin_keyboard())
        return

    blocks = [texts.ADMIN_CLIENTS_HEADER.format(count=total)]
    for client in clients:
        last_visit = client["last_visit"]
        last = dt.fmt_date_short(dt.from_db(last_visit).date()) if last_visit else "—"

        course_line = ""
        if client["user_id"]:
            visits = await queries.get_user_visits(client["user_id"])
            past = [visit for visit in visits if visit.visit_at <= dt.now()]
            if past:
                last_course = max(past, key=lambda item: item.visit_at)
                done = sum(1 for visit in past if visit.service_code == last_course.service_code)
                course_line = texts.ADMIN_CLIENT_COURSE.format(
                    service=last_course.service_title,
                    done=done,
                    total=last_course.total_sessions,
                )

        blocks.append(
            texts.ADMIN_CLIENT_ITEM.format(
                name=tg.escape(client["client_name"] or client["full_name"] or "Без імені"),
                phone=validators.format_phone(client["phone"]) if client["phone"] else "—",
                visits=client["visits"],
                last=last,
                course=course_line,
                code=client["referral_code"],
                referrals=client["referrals"],
            )
        )

    await tg.safe_edit(callback, "\n".join(blocks), kb.back_to_admin_keyboard())


@router.callback_query(F.data == kb.CB_ADM_STATS)
async def show_stats(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()

    week_requests, week_confirmed = await queries.week_stats()
    conversion = round(week_confirmed / week_requests * 100) if week_requests else 0

    top = await queries.top_services(limit=5)
    top_block = (
        "\n".join(f"• {title} — {count}" for title, count in top)
        if top
        else texts.ADMIN_STATS_EMPTY_TOP
    )

    dropped = await _dropped_clients()
    dropped_block = "\n".join(dropped) if dropped else texts.ADMIN_STATS_NO_DROPPED

    await tg.safe_edit(
        callback,
        texts.ADMIN_STATS.format(
            week_requests=week_requests,
            week_confirmed=week_confirmed,
            conversion=conversion,
            clients=await queries.count_clients(),
            visits=await queries.count_visits(),
            pending=await queries.count_pending(),
            top=top_block,
            dropped_count=len(dropped),
            dropped=dropped_block,
        ),
        kb.back_to_admin_keyboard(),
    )


async def _dropped_clients() -> list[str]:
    """
    Клиенты, выпавшие из курса.

    Критерий: последний визит был дольше полутора интервалов назад,
    а курс ещё не закончен. Полтора — чтобы не дёргать тех, кто просто
    задержался на неделю.
    """
    now = dt.now()
    result: list[str] = []

    for visit in await queries.last_visits_per_course():
        if visit.service_code == CONSULT_CODE:
            continue
        if visit.session_no >= visit.total_sessions:
            continue
        if visit.visit_at > now:
            continue

        overdue_from = visit.visit_at + timedelta(days=int(visit.interval_days * 1.5))
        if now < overdue_from:
            continue

        days = (now.date() - visit.visit_at.date()).days
        result.append(
            texts.ADMIN_DROPPED_ITEM.format(
                name=tg.escape(visit.client_name or "Клієнт"),
                phone=validators.format_phone(visit.phone) if visit.phone else "—",
                service=visit.service_title,
                days=days,
                days_word=dt.plural_days(days),
            )
        )

    return result[:15]
