"""Клавиатуры владелицы."""

from __future__ import annotations

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

import config
from database.models import Promotion, Request
from utils import texts, validators

CB_ADM_MENU = "adm:menu"
CB_ADM_REQUESTS = "adm:req"
CB_ADM_SCHEDULE = "adm:sch"           # adm:sch:<today|tomorrow|week>
CB_ADM_MANUAL = "adm:manual"
CB_ADM_PROMO = "adm:promo"            # adm:promo:<action>
CB_ADM_CLIENTS = "adm:clients"
CB_ADM_STATS = "adm:stats"
CB_ADM_BROADCAST = "adm:bc"

CB_REQ_CONFIRM = "adm:ok"             # adm:ok:<id>
CB_REQ_RESCHEDULE = "adm:resch"       # adm:resch:<id>
CB_REQ_DECLINE = "adm:decl"           # adm:decl:<id>
CB_REQ_REASON = "adm:reason"          # adm:reason:<id>:<code>
CB_REQ_CARD = "adm:card"              # adm:card:<id>
CB_REQ_PHONE = "adm:phone"            # adm:phone:<id>

CB_PROMO_DEACTIVATE = "adm:pdel"      # adm:pdel:<id>
CB_MANUAL_SERVICE = "adm:msvc"        # adm:msvc:<code>

CB_ADM_CANCEL = "adm:cancel"
CB_BC_CONFIRM = "adm:bcok"
CB_PROMO_SAVE = "adm:psave"
CB_PROMO_SKIP = "adm:pskip"


def admin_menu() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_ADM_REQUESTS, callback_data=CB_ADM_REQUESTS))
    builder.row(
        InlineKeyboardButton(text=texts.BTN_ADM_SCHEDULE, callback_data=f"{CB_ADM_SCHEDULE}:today")
    )
    builder.row(InlineKeyboardButton(text=texts.BTN_ADM_ADD, callback_data=CB_ADM_MANUAL))
    builder.row(
        InlineKeyboardButton(text=texts.BTN_ADM_PROMO, callback_data=f"{CB_ADM_PROMO}:menu"),
        InlineKeyboardButton(text=texts.BTN_ADM_BROADCAST, callback_data=CB_ADM_BROADCAST),
    )
    builder.row(
        InlineKeyboardButton(text=texts.BTN_ADM_CLIENTS, callback_data=CB_ADM_CLIENTS),
        InlineKeyboardButton(text=texts.BTN_ADM_STATS, callback_data=CB_ADM_STATS),
    )
    return builder.as_markup()


def request_actions_keyboard(request: Request) -> InlineKeyboardMarkup:
    """
    Кнопки под заявкой.

    Телефон — кнопка с alert, а не ссылка tel:: Telegram принимает в inline-
    кнопках только http/https/tg, на tel: отвечает BUTTON_URL_INVALID.
    Сам номер продублирован в тексте тегом <code> — тап копирует его.
    """
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="✅ Підтвердити", callback_data=f"{CB_REQ_CONFIRM}:{request.id}")
    )
    builder.row(
        InlineKeyboardButton(
            text="🕐 Запропонувати інший час", callback_data=f"{CB_REQ_RESCHEDULE}:{request.id}"
        )
    )
    builder.row(
        InlineKeyboardButton(text="❌ Відхилити", callback_data=f"{CB_REQ_DECLINE}:{request.id}")
    )
    builder.row(
        InlineKeyboardButton(
            text=f"📞 {validators.format_phone(request.phone)}",
            callback_data=f"{CB_REQ_PHONE}:{request.id}",
        )
    )
    return builder.as_markup()


def pending_list_keyboard(requests: list[Request]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for request in requests:
        builder.row(
            InlineKeyboardButton(
                text=f"№{request.id} · {request.client_name} · {request.items_title[:24]}",
                callback_data=f"{CB_REQ_CARD}:{request.id}",
            )
        )
    builder.row(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=CB_ADM_MENU))
    return builder.as_markup()


def decline_reasons_keyboard(request_id: int) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for code, title in config.DECLINE_REASONS:
        builder.row(
            InlineKeyboardButton(text=title, callback_data=f"{CB_REQ_REASON}:{request_id}:{code}")
        )
    builder.row(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_REQ_CARD}:{request_id}"))
    return builder.as_markup()


def schedule_keyboard(active: str) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    tabs = (
        ("today", texts.BTN_ADM_TODAY),
        ("tomorrow", texts.BTN_ADM_TOMORROW),
        ("week", texts.BTN_ADM_WEEK),
    )
    builder.row(
        *[
            InlineKeyboardButton(
                text=f"• {title} •" if code == active else title,
                callback_data=f"{CB_ADM_SCHEDULE}:{code}",
            )
            for code, title in tabs
        ]
    )
    builder.row(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=CB_ADM_MENU))
    return builder.as_markup()


def promo_menu_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text=texts.BTN_PROMO_ADD, callback_data=f"{CB_ADM_PROMO}:add")
    )
    builder.row(
        InlineKeyboardButton(text=texts.BTN_PROMO_LIST, callback_data=f"{CB_ADM_PROMO}:list")
    )
    builder.row(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=CB_ADM_MENU))
    return builder.as_markup()


def promo_list_keyboard(promotions: list[Promotion]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for promo in promotions:
        builder.row(
            InlineKeyboardButton(
                text=f"🗑 {promo.title[:32]}",
                callback_data=f"{CB_PROMO_DEACTIVATE}:{promo.id}",
            )
        )
    builder.row(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_ADM_PROMO}:menu"))
    return builder.as_markup()


def promo_skip_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_SKIP, callback_data=CB_PROMO_SKIP))
    builder.row(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_ADM_CANCEL))
    return builder.as_markup()


def promo_confirm_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text="💾 Зберегти", callback_data=CB_PROMO_SAVE))
    builder.row(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_ADM_CANCEL))
    return builder.as_markup()


def broadcast_confirm_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text="📢 Надіслати", callback_data=CB_BC_CONFIRM))
    builder.row(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_ADM_CANCEL))
    return builder.as_markup()


def cancel_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_ADM_CANCEL))
    return builder.as_markup()


def manual_services_keyboard() -> InlineKeyboardMarkup:
    """Список услуг для ручной записи: зоны, комплексы, омоложение."""
    builder = InlineKeyboardBuilder()
    for service in config.SERVICES_EPILATION.values():
        builder.row(
            InlineKeyboardButton(
                text=service["name"], callback_data=f"{CB_MANUAL_SERVICE}:{service['code']}"
            )
        )
    for service in config.COMPLEXES.values():
        builder.row(
            InlineKeyboardButton(
                text=f"🎯 {service['name']}", callback_data=f"{CB_MANUAL_SERVICE}:{service['code']}"
            )
        )
    for service in config.SERVICES_REJUVENATION.values():
        builder.row(
            InlineKeyboardButton(
                text=f"💎 {service['name']}", callback_data=f"{CB_MANUAL_SERVICE}:{service['code']}"
            )
        )
    builder.row(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_ADM_CANCEL))
    return builder.as_markup()


def back_to_admin_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=CB_ADM_MENU))
    return builder.as_markup()
