"""
Раздел «Лазерне омолодження обличчя».

Структура та же, что у эпиляции: каждый текст — отдельный экран.
Список процедур и противопоказания берутся из config.
"""

from __future__ import annotations

import logging

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

import config
from keyboards import client_kb as kb
from utils import texts, tg

logger = logging.getLogger(__name__)

router = Router(name="info_rejuvenation")

STATIC_SCREENS: dict[str, str] = {
    "what": texts.REJUV_WHAT_IS,
    "problems": texts.REJUV_PROBLEMS,
    "sessions": texts.REJUV_SESSIONS,
    "rehab": texts.REJUV_REHAB,
    "result": texts.REJUV_RESULT,
}


@router.message(F.text == texts.BTN_REJUVENATION)
async def menu_rejuvenation(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.REJUV_MENU, reply_markup=kb.rejuvenation_menu())


@router.callback_query(F.data.startswith(f"{kb.CB_REJUV}:"))
async def show_rejuvenation_screen(callback: CallbackQuery) -> None:
    await callback.answer()
    code = callback.data.split(":", 1)[1]

    if code == "menu":
        await tg.safe_edit(callback, texts.REJUV_MENU, kb.rejuvenation_menu())
        return

    if code == "types":
        await tg.safe_edit(
            callback,
            f"{texts.E_FACE} <b>Види процедур</b>\n{texts.DIVIDER}\n\n"
            "Оберіть процедуру — покажемо опис, тривалість, ціну "
            "та рекомендований курс 👇",
            kb.rejuvenation_types_keyboard(),
        )
        return

    if code == "contra":
        text = (
            f"{texts.E_WARN} <b>Протипоказання до омолодження</b>\n"
            f"{texts.DIVIDER}\n\n"
            + texts.format_numbered(config.CONTRAINDICATIONS["rejuvenation"])
            + f"\n{texts.DIVIDER}\n"
            "Більшість станів тимчасові. Якщо щось із переліку про вас — "
            "напишіть нам, підкажемо, коли можна починати."
        )
        await tg.safe_edit(callback, text, kb.info_screen_keyboard(f"{kb.CB_REJUV}:menu"))
        return

    text = STATIC_SCREENS.get(code)
    if text is None:
        await tg.safe_edit(callback, texts.REJUV_MENU, kb.rejuvenation_menu())
        return

    await tg.safe_edit(callback, text, kb.info_screen_keyboard(f"{kb.CB_REJUV}:menu"))
