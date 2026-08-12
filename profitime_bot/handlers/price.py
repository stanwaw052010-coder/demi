"""
Раздел «Прайс».

Текстовые секции собираются из config — второго места, где живут цены,
в проекте нет. Если в assets/ лежит price.jpg, полный прайс уходит
картинкой; файла нет — текстом, без ошибок.
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

router = Router(name="price")


def _section_text(section: str) -> str:
    if section == "women":
        return (
            texts.format_price_section(
                texts.PRICE_HEADER_EPIL_WOMEN, config.zones_by_group("women")
            )
            + texts.PRICE_FOOTER
        )
    if section == "men":
        return (
            texts.format_price_section(texts.PRICE_HEADER_EPIL_MEN, config.zones_by_group("men"))
            + texts.PRICE_FOOTER
        )
    if section == "complex":
        return (
            texts.format_price_section(
                texts.PRICE_HEADER_COMPLEX, list(config.COMPLEXES.values())
            )
            + texts.PRICE_FOOTER
        )
    if section == "rejuv":
        return (
            texts.format_price_section(
                texts.PRICE_HEADER_REJUV, list(config.SERVICES_REJUVENATION.values())
            )
            + texts.PRICE_FOOTER
        )

    # Полный прайс — все секции подряд.
    return (
        "\n\n".join(
            (
                texts.format_price_section(
                    texts.PRICE_HEADER_EPIL_WOMEN, config.zones_by_group("women")
                ),
                texts.format_price_section(
                    texts.PRICE_HEADER_COMPLEX, list(config.COMPLEXES.values())
                ),
                texts.format_price_section(
                    texts.PRICE_HEADER_EPIL_MEN, config.zones_by_group("men")
                ),
                texts.format_price_section(
                    texts.PRICE_HEADER_REJUV, list(config.SERVICES_REJUVENATION.values())
                ),
            )
        )
        + texts.PRICE_FOOTER
    )


@router.message(F.text == texts.BTN_PRICE)
async def show_price_menu(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.PRICE_MENU, reply_markup=kb.price_menu_keyboard())


@router.callback_query(F.data.startswith(f"{kb.CB_PRICE}:"))
async def show_price_section(callback: CallbackQuery) -> None:
    await callback.answer()
    section = (callback.data or "").split(":", 1)[1]

    if section == "menu":
        await tg.safe_edit(callback, texts.PRICE_MENU, kb.price_menu_keyboard())
        return

    text = _section_text(section)

    # Полный прайс картинкой, если она есть: так его удобнее пересылать подруге.
    image = config.price_image_path() if section == "all" else None
    if image is not None:
        message = callback.message
        if isinstance(message, Message):
            await tg.answer_with_image(
                message, image, texts.PRICE_MENU, kb.price_section_keyboard()
            )
            await message.answer(text, reply_markup=kb.price_section_keyboard())
            return

    await tg.safe_edit(callback, text, kb.price_section_keyboard())
