"""
Общие хендлеры: /start (в том числе по реферальной ссылке), главное меню,
«Як усе працює», FAQ, контакты, настройки и «страховочный» роутер.

Роутер `router` регистрируется ПЕРВЫМ: он перехватывает команды и кнопки
меню в любом состоянии FSM, поэтому «залипнуть» в сценарии невозможно.
Роутер `fallback_router` регистрируется ПОСЛЕДНИМ: отвечает на устаревшие
инлайн-кнопки и произвольный текст.
"""

from __future__ import annotations

import logging

from aiogram import Bot, F, Router
from aiogram.filters import Command, CommandObject, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

import config
from database import queries
from keyboards import client_kb as kb
from utils import texts, tg

logger = logging.getLogger(__name__)

router = Router(name="common")
fallback_router = Router(name="fallback")


# --------------------------------------------------------------------------- #
# Старт
# --------------------------------------------------------------------------- #


@router.message(CommandStart())
async def cmd_start(
    message: Message,
    command: CommandObject,
    state: FSMContext,
    bot: Bot,
) -> None:
    """
    Приветствие. Если пришли по реферальной ссылке — засчитываем приглашение.

    Payload deep link'а — это реферальный код пригласившей (t.me/bot?start=PTXXXXX).
    """
    await state.clear()
    user = message.from_user
    if user is None:
        return

    profile = await queries.ensure_user(user.id, user.username, user.full_name)

    await tg.answer_with_image(
        message,
        config.logo_path(),
        texts.WELCOME.format(
            salon=config.SALON_NAME,
            slogan=config.SLOGAN,
            name=tg.display_name(user),
        ),
    )
    await message.answer(texts.MENU_PROMPT, reply_markup=kb.main_menu())

    payload = (command.args or "").strip()
    if payload and profile.referred_by is None:
        await _apply_referral(message, bot, payload)

    if user.id in config.ADMIN_IDS:
        await message.answer("👑 Ви увійшли як власниця. Панель: /admin")


async def _apply_referral(message: Message, bot: Bot, code: str) -> None:
    """Привязать нового клиента к пригласившей и уведомить обеих."""
    user = message.from_user
    if user is None:
        return

    inviter = await queries.get_user_by_code(code)
    if inviter is None:
        return

    attached = await queries.attach_referral(
        user.id, inviter.user_id, config.REFERRAL_BONUS
    )
    if not attached:
        return

    await message.answer(texts.WELCOME_REFERRAL.format(bonus=config.REFERRAL_BONUS))
    await tg.notify(
        bot,
        inviter.user_id,
        texts.REFERRAL_INVITER_NOTIFY.format(bonus=config.REFERRAL_BONUS_INVITER),
    )
    logger.info("Реферал: %s прийшов за кодом %s", user.id, code)


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


@router.callback_query(F.data == kb.CB_MENU)
async def back_to_menu(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await tg.drop_markup(callback)
    message = callback.message
    if isinstance(message, Message):
        await message.answer(texts.BACK_TO_MENU, reply_markup=kb.main_menu())


# --------------------------------------------------------------------------- #
# Онлайн-запись
# --------------------------------------------------------------------------- #


@router.message(F.text == texts.BTN_BOOKON)
async def menu_bookon(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.BOOKON_INTRO, reply_markup=kb.bookon_keyboard())


# --------------------------------------------------------------------------- #
# Як усе працює + FAQ
# --------------------------------------------------------------------------- #


@router.message(F.text == texts.BTN_HOW)
async def menu_how(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.HOW_IT_WORKS, reply_markup=kb.how_it_works_keyboard())


@router.callback_query(F.data == kb.CB_HOW)
async def show_how(callback: CallbackQuery) -> None:
    await callback.answer()
    await tg.safe_edit(callback, texts.HOW_IT_WORKS, kb.how_it_works_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_FAQ}:"))
async def show_faq(callback: CallbackQuery) -> None:
    await callback.answer()
    code = callback.data.split(":", 1)[1]

    if code == "menu":
        await tg.safe_edit(callback, texts.FAQ_MENU, kb.faq_menu_keyboard())
        return

    item = config.get_faq_item(code)
    if item is None:
        await tg.safe_edit(callback, texts.FAQ_MENU, kb.faq_menu_keyboard())
        return

    await tg.safe_edit(
        callback,
        texts.FAQ_ANSWER.format(question=item["question"], answer=item["answer"]),
        kb.faq_answer_keyboard(),
    )


# --------------------------------------------------------------------------- #
# Контакты и настройки
# --------------------------------------------------------------------------- #


def _contacts_text() -> str:
    return texts.CONTACTS.format(
        salon=config.SALON_NAME,
        slogan=config.SLOGAN,
        address=config.ADDRESS,
        phone=config.PHONE,
        instagram=config.INSTAGRAM_LABEL,
        schedule=texts.format_schedule(),
    )


@router.message(F.text == texts.BTN_CONTACTS)
async def menu_contacts(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(_contacts_text(), reply_markup=kb.contacts_keyboard())


@router.callback_query(F.data == f"{kb.CB_MENU}:contacts")
async def show_contacts(callback: CallbackQuery) -> None:
    await callback.answer()
    await tg.safe_edit(callback, _contacts_text(), kb.contacts_keyboard())


@router.callback_query(F.data == kb.CB_SETTINGS)
async def show_settings(callback: CallbackQuery) -> None:
    await callback.answer()
    profile = await queries.get_user(callback.from_user.id)
    optout = bool(profile and profile.promo_optout)
    await tg.safe_edit(
        callback,
        texts.SETTINGS_SCREEN.format(
            state=texts.SETTINGS_OFF if optout else texts.SETTINGS_ON
        ),
        kb.settings_keyboard(optout),
    )


@router.callback_query(F.data == kb.CB_PROMO_TOGGLE)
async def toggle_promo(callback: CallbackQuery) -> None:
    profile = await queries.get_user(callback.from_user.id)
    new_optout = not (profile and profile.promo_optout)

    await queries.set_promo_optout(callback.from_user.id, new_optout)
    await callback.answer(
        texts.SETTINGS_SAVED_OFF if new_optout else texts.SETTINGS_SAVED_ON,
        show_alert=True,
    )
    await tg.safe_edit(
        callback,
        texts.SETTINGS_SCREEN.format(
            state=texts.SETTINGS_OFF if new_optout else texts.SETTINGS_ON
        ),
        kb.settings_keyboard(new_optout),
    )


# --------------------------------------------------------------------------- #
# Страховка: всё, что не поймали остальные роутеры
# --------------------------------------------------------------------------- #


@fallback_router.callback_query(F.data == "cal:noop")
async def calendar_noop(callback: CallbackQuery) -> None:
    """Неактивная ячейка календаря — выходной или заполнение сетки."""
    await callback.answer()


@fallback_router.callback_query()
async def stale_callback(callback: CallbackQuery, state: FSMContext) -> None:
    """Кнопка из старого сообщения — например, после перезапуска бота."""
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
