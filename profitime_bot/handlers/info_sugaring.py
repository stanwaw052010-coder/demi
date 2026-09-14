"""
Раздел «Шугаринг».

Услуга разовая: ни курса, ни пакетов, ни интервалов — поэтому и экранов
здесь втрое меньше, чем у лазера. Карточек зон тоже нет: кроме цены
показывать нечего, а выдумывать длительность не станем.

Цены приходят из config.SERVICES_SUGARING — это единственный полностью
подтверждённый клиенткой прайс в проекте.
"""

from __future__ import annotations

import logging

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from keyboards import client_kb as kb
from utils import texts, tg

logger = logging.getLogger(__name__)

router = Router(name="info_sugaring")

STATIC_SCREENS: dict[str, str] = {
    "what": texts.SUGAR_WHAT_IS,
    "laser": texts.SUGAR_BEFORE_LASER,
}


def _price_screen() -> str:
    return texts.format_sugaring_price_section() + texts.PRICE_FOOTER_SUGAR


@router.message(F.text == texts.BTN_SUGARING)
async def menu_sugaring(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.SUGAR_MENU, reply_markup=kb.sugaring_menu())


@router.callback_query(F.data.startswith(f"{kb.CB_SUGAR}:"))
async def show_sugaring_screen(callback: CallbackQuery) -> None:
    await callback.answer()
    code = (callback.data or "").split(":", 1)[1]

    if code == "menu":
        await tg.safe_edit(callback, texts.SUGAR_MENU, kb.sugaring_menu())
        return

    if code == "price":
        await tg.safe_edit(
            callback, _price_screen(), kb.info_screen_keyboard(f"{kb.CB_SUGAR}:menu")
        )
        return

    text = STATIC_SCREENS.get(code)
    if text is None:
        await tg.safe_edit(callback, texts.SUGAR_MENU, kb.sugaring_menu())
        return

    await tg.safe_edit(callback, text, kb.info_screen_keyboard(f"{kb.CB_SUGAR}:menu"))
