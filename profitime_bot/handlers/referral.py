"""
Реферальная программа «Приведи подругу».

У каждой клиентки свой код, который выдаётся при первом /start.
Кнопка «Поділитися» открывает окно выбора чата с готовым текстом
и ссылкой t.me/<bot>?start=<код> — по ней бот сразу узнаёт пригласившую
(см. handlers/common.py::cmd_start).
"""

from __future__ import annotations

import logging

from aiogram import Bot, F, Router
from aiogram.types import CallbackQuery, Message

import config
from database import queries
from keyboards import client_kb as kb
from utils import texts, tg

logger = logging.getLogger(__name__)

router = Router(name="referral")


async def _referral_text(user_id: int, username: str | None, full_name: str | None) -> tuple[str, str, str]:
    """Текст экрана, код клиентки и готовый текст для пересылки подруге."""
    profile = await queries.ensure_user(user_id, username, full_name)
    invited = await queries.count_referrals(user_id)

    screen = texts.REFERRAL_SCREEN.format(
        bonus_new=config.REFERRAL_BONUS,
        bonus_you=config.REFERRAL_BONUS_INVITER,
        code=profile.referral_code,
        count=invited,
    )
    return screen, profile.referral_code, ""


@router.callback_query(F.data == kb.CB_REFERRAL)
async def show_referral(callback: CallbackQuery, bot: Bot) -> None:
    await callback.answer()
    user = callback.from_user

    screen, code, _ = await _referral_text(user.id, user.username, user.full_name)
    me = await bot.me()

    share_text = texts.REFERRAL_SHARE_TEXT.format(
        salon=config.SALON_NAME,
        bonus=config.REFERRAL_BONUS,
        link=f"https://t.me/{me.username}?start={code}",
    )
    await tg.safe_edit(callback, screen, kb.referral_keyboard(me.username or "", code, share_text))


@router.message(F.text == texts.BTN_REFERRAL)
async def show_referral_message(message: Message, bot: Bot) -> None:
    user = message.from_user
    if user is None:
        return

    screen, code, _ = await _referral_text(user.id, user.username, user.full_name)
    me = await bot.me()

    share_text = texts.REFERRAL_SHARE_TEXT.format(
        salon=config.SALON_NAME,
        bonus=config.REFERRAL_BONUS,
        link=f"https://t.me/{me.username}?start={code}",
    )
    await message.answer(screen, reply_markup=kb.referral_keyboard(me.username or "", code, share_text))
