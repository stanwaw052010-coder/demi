"""
Общие хендлеры: /start, /help, /cancel, кнопки главного меню, контакты,
сообщение мастеру и «страховочный» роутер для всего неопознанного.

Роутер `router` регистрируется ПЕРВЫМ — он перехватывает команды и кнопки
меню в любом состоянии FSM, поэтому «залипнуть» в сценарии невозможно.
Роутер `fallback_router` регистрируется ПОСЛЕДНИМ — он отвечает на устаревшие
инлайн-кнопки и произвольный текст.
"""

from __future__ import annotations

import logging

from aiogram import F, Router
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

import config
from handlers import client as client_handlers
from keyboards import client as kb
from states.booking import ContactSG
from utils import texts, tg

logger = logging.getLogger(__name__)

router = Router(name="common")
fallback_router = Router(name="fallback")


# --------------------------------------------------------------------------- #
# Команды
# --------------------------------------------------------------------------- #


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(
        texts.WELCOME.format(
            salon=config.SALON_NAME,
            subtitle=config.SALON_SUBTITLE,
            name=tg.display_name(message.from_user),
        ),
        reply_markup=kb.main_menu(),
    )
    if message.from_user and message.from_user.id == config.ADMIN_ID:
        await message.answer(texts.ADMIN_HELP)


@router.message(Command("help"))
async def cmd_help(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.HELP, reply_markup=kb.main_menu())


@router.message(Command("cancel"))
@router.message(F.text == texts.BTN_CANCEL)
async def cmd_cancel(message: Message, state: FSMContext) -> None:
    """Аварийный выход из любого сценария."""
    await state.clear()
    await message.answer(texts.CANCELLED_FLOW, reply_markup=kb.main_menu())


# --------------------------------------------------------------------------- #
# Кнопки главного меню
# --------------------------------------------------------------------------- #


@router.message(F.text == texts.BTN_BOOK)
async def menu_book(message: Message, state: FSMContext) -> None:
    await client_handlers.start_booking(message, state)


@router.message(F.text == texts.BTN_MY_BOOKINGS)
async def menu_my_bookings(message: Message, state: FSMContext) -> None:
    await client_handlers.show_my_bookings(message, state)


@router.message(F.text == texts.BTN_PRICES)
async def menu_prices(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.format_price_list(), reply_markup=kb.main_menu())


@router.message(F.text == texts.BTN_CONTACTS)
async def menu_contacts(message: Message, state: FSMContext) -> None:
    await state.clear()
    address = f"🏠 Адреса: {config.ADDRESS}\n" if config.ADDRESS else ""
    await message.answer(
        texts.CONTACTS.format(
            salon=config.SALON_NAME,
            subtitle=config.SALON_SUBTITLE,
            master=config.MASTER_NAME,
            phone=config.PHONE,
            instagram=config.INSTAGRAM_LABEL,
            address=address,
            schedule=texts.format_schedule(),
        ),
        reply_markup=kb.contacts_keyboard(),
    )


# --------------------------------------------------------------------------- #
# Сообщение мастеру
# --------------------------------------------------------------------------- #


@router.callback_query(F.data == kb.CB_WRITE_MASTER)
async def write_master_start(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.set_state(ContactSG.message)
    message = callback.message
    if isinstance(message, Message):
        await message.answer(texts.WRITE_MASTER_PROMPT, reply_markup=kb.cancel_only_keyboard())


@router.message(ContactSG.message, F.text)
async def write_master_send(message: Message, state: FSMContext) -> None:
    await state.clear()
    user = message.from_user
    if user is None:
        return

    delivered = False
    if config.ADMIN_ID > 0:
        delivered = await tg.notify(
            message.bot,
            config.ADMIN_ID,
            texts.ADMIN_MESSAGE_FROM_CLIENT.format(
                name=tg.display_name(user),
                contact=tg.user_link(user.id, user.full_name, user.username),
                text=(message.html_text or "")[:2000],
            ),
        )
    if not delivered:
        logger.warning("Повідомлення від %s не доставлено майстру", user.id)

    await message.answer(texts.WRITE_MASTER_SENT, reply_markup=kb.main_menu())


@router.message(ContactSG.message)
async def write_master_wrong_type(message: Message) -> None:
    await message.answer(texts.WRITE_MASTER_EMPTY, reply_markup=kb.cancel_only_keyboard())


# --------------------------------------------------------------------------- #
# Страховка: всё, что не поймали остальные роутеры
# --------------------------------------------------------------------------- #


@fallback_router.callback_query()
async def stale_callback(callback: CallbackQuery, state: FSMContext) -> None:
    """Нажатие на кнопку из старого сообщения после перезапуска бота."""
    await callback.answer(texts.STALE_BUTTON, show_alert=True)
    await tg.drop_markup(callback)
    await state.clear()
    message = callback.message
    if isinstance(message, Message):
        await message.answer(texts.MENU_PROMPT, reply_markup=kb.main_menu())


@fallback_router.message()
async def unknown_message(message: Message, state: FSMContext) -> None:
    """Произвольный текст, стикеры, фото и прочее вне сценария."""
    await state.clear()
    await message.answer(texts.UNKNOWN_INPUT, reply_markup=kb.main_menu())
