"""
Раздел омоложения.

Сейчас лазерного омоложения в студии нет (config.LASER_REJUV_ENABLED),
и раздел — это одно фотоомоложение: кнопка меню сразу открывает его экран
с двумя ценами. Экраны про лазер остались в коде и вернутся вместе
с переключателем.
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


def _section_entry() -> tuple[str, object]:
    """Первый экран раздела: меню лазерного омоложения или сразу фотоомоложение."""
    if config.LASER_REJUV_ENABLED:
        return texts.REJUV_MENU, kb.rejuvenation_menu()
    return texts.format_photo_intro(), kb.photo_rejuvenation_keyboard()


# Старая подпись кнопки тоже ловится: у клиенток под полем ввода может
# остаться клавиатура с «Омолодження обличчя».
@router.message(F.text.in_(texts.BTN_REJUVENATION_LEGACY))
async def menu_rejuvenation(message: Message, state: FSMContext) -> None:
    await state.clear()
    text, markup = _section_entry()
    await message.answer(text, reply_markup=markup)


@router.callback_query(F.data.startswith(f"{kb.CB_REJUV}:"))
async def show_rejuvenation_screen(callback: CallbackQuery) -> None:
    await callback.answer()
    code = callback.data.split(":", 1)[1]

    # Без лазерного омоложения любая кнопка раздела — в том числе из старых
    # сообщений про коллаген и реабилитацию — ведёт на фотоомоложение.
    if not config.LASER_REJUV_ENABLED:
        text, markup = _section_entry()
        await tg.safe_edit(callback, text, markup)
        return

    if code == "menu":
        await tg.safe_edit(callback, texts.REJUV_MENU, kb.rejuvenation_menu())
        return

    if code == "types":
        await tg.safe_edit(
            callback,
            f"{texts.E_FACE} <b>Види лазерних процедур</b>\n{texts.DIVIDER}\n\n"
            "Оберіть процедуру — покажемо опис, тривалість, ціну "
            "та рекомендований курс 👇",
            kb.rejuvenation_types_keyboard(),
        )
        return

    # Фотоомоложение: свой экран, потому что известны только цены — ни курса,
    # ни интервала клиентка по нему не называла, и карточка была бы пустой.
    if code == "photo" and config.PHOTO_REJUV_ENABLED:
        await tg.safe_edit(
            callback,
            texts.format_photo_intro(),
            kb.photo_rejuvenation_keyboard(),
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
