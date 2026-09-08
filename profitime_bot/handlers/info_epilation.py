"""
Раздел «Лазерна епіляція»: информационные экраны и карточки зон.

Каждый текст — отдельный экран под инлайн-кнопкой, без «простыней».
Экраны с интервалами, противопоказаниями, подготовкой и уходом собираются
из config, поэтому расхождений между карточкой зоны и описанием быть не может.
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

router = Router(name="info_epilation")

# Экран -> готовый текст. Динамические собираются в _build_screen().
STATIC_SCREENS: dict[str, str] = {
    "what": texts.EPIL_WHAT_IS,
    "sessions": texts.EPIL_SESSIONS,
    "pain": texts.EPIL_PAIN,
    "suitable": texts.EPIL_SUITABLE,
    "result": texts.EPIL_RESULT,
    "myths": texts.EPIL_MYTHS,
}


def _build_screen(code: str) -> str | None:
    """Текст экрана. None — код неизвестен (кнопка из старого сообщения)."""
    if code in STATIC_SCREENS:
        return STATIC_SCREENS[code]

    if code == "device":
        return texts.EPIL_DEVICE.format(laser=config.LASER_MODEL)

    if code == "intervals":
        return (
            texts.EPIL_INTERVALS_HEADER
            + texts.format_intervals()
            + texts.EPIL_INTERVALS_FOOTER
        )

    if code == "contra":
        return (
            texts.EPIL_CONTRA_HEADER
            + texts.format_numbered(config.CONTRAINDICATIONS["epilation"])
            + texts.EPIL_CONTRA_FOOTER
        )

    if code == "prep":
        rules = config.PREP_RULES
        body = (
            f"\n<b>За 2 тижні до візиту</b>\n{texts.format_rules(rules['weeks_2'])}\n"
            f"\n<b>За 3 дні</b>\n{texts.format_rules(rules['days_3'])}\n"
            f"\n<b>У день процедури</b>\n{texts.format_rules(rules['day_of'])}\n"
        )
        return texts.EPIL_PREP_HEADER + body + texts.EPIL_PREP_FOOTER

    if code == "after":
        rules = config.AFTERCARE_RULES
        body = (
            f"\n<b>Перші 24 години</b>\n{texts.format_rules(rules['first_24h'])}\n"
            f"\n<b>Перший тиждень</b>\n{texts.format_rules(rules['first_week'])}\n"
        )
        return texts.EPIL_AFTER_HEADER + body + texts.EPIL_AFTER_FOOTER

    return None


# --------------------------------------------------------------------------- #
# Меню раздела
# --------------------------------------------------------------------------- #


@router.message(F.text == texts.BTN_EPILATION)
async def menu_epilation(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.EPIL_MENU, reply_markup=kb.epilation_menu())


@router.callback_query(F.data == kb.CB_EPIL_ZONES)
async def show_zone_groups(callback: CallbackQuery) -> None:
    await callback.answer()
    await tg.safe_edit(callback, texts.ZONES_MENU, kb.zone_groups_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_ZONE_GROUP}:"))
async def show_zones(callback: CallbackQuery) -> None:
    """
    Комплексы зон.

    Раньше сюда вёл ещё и выбор группы «жінки / чоловіки». Мужские зоны
    отключены, поэтому зоны показываются сразу в zone_groups_keyboard(),
    а здесь остались только комплексы. Старые callback'и (zg:women,
    zg:men) из уже открытых у клиенток сообщений вернут список зон,
    а не ошибку.
    """
    await callback.answer()
    group = callback.data.split(":", 1)[1]

    if group == "complex":
        await tg.safe_edit(callback, texts.COMPLEXES_MENU, kb.zones_keyboard(group))
        return

    await tg.safe_edit(callback, texts.ZONES_MENU, kb.zone_groups_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_EPIL}:"))
async def show_epilation_screen(callback: CallbackQuery) -> None:
    await callback.answer()
    code = callback.data.split(":", 1)[1]

    if code == "menu":
        await tg.safe_edit(callback, texts.EPIL_MENU, kb.epilation_menu())
        return

    text = _build_screen(code)
    if text is None:
        await tg.safe_edit(callback, texts.EPIL_MENU, kb.epilation_menu())
        return

    await tg.safe_edit(callback, text, kb.info_screen_keyboard(f"{kb.CB_EPIL}:menu"))


# --------------------------------------------------------------------------- #
# Карточка услуги (общая для эпиляции, комплексов и омоложения)
# --------------------------------------------------------------------------- #


@router.callback_query(F.data.startswith(f"{kb.CB_SERVICE}:"))
async def show_service_card(callback: CallbackQuery) -> None:
    await callback.answer()
    code = callback.data.split(":", 1)[1]

    card = texts.format_service_card(code)
    if card is None:
        await tg.safe_edit(callback, texts.ZONES_MENU, kb.zone_groups_keyboard())
        return

    # Возврат ведёт туда, откуда услуга родом.
    if config.is_photo_rejuvenation(code):
        back = f"{kb.CB_REJUV}:photo"
    elif code in config.SERVICES_REJUVENATION:
        back = f"{kb.CB_REJUV}:types"
    elif code in config.COMPLEXES:
        back = f"{kb.CB_ZONE_GROUP}:complex"
    else:
        back = kb.CB_EPIL_ZONES

    await tg.safe_edit(callback, card, kb.service_card_keyboard(code, back))
