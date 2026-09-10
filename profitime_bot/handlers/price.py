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


def _epilation_section() -> str:
    return texts.format_price_section(texts.PRICE_HEADER_EPIL, config.epilation_zones())


def _complex_section() -> str:
    return texts.format_price_section(texts.PRICE_HEADER_COMPLEX, list(config.COMPLEXES.values()))


def _laser_rejuv_section() -> str:
    return texts.format_price_section(
        texts.PRICE_HEADER_REJUV, list(config.SERVICES_LASER_REJUV.values())
    )


def _section_text(section: str) -> str:
    if section == "epil":
        return _epilation_section() + texts.PRICE_FOOTER
    if section == "complex":
        return _complex_section() + texts.PRICE_FOOTER
    if section == "rejuv":
        return _laser_rejuv_section() + texts.PRICE_FOOTER
    if section == "photo" and config.PHOTO_REJUV_ENABLED:
        # Фотоомоложение — одна строка «700 грн / зона»: цена от зоны не зависит.
        return texts.format_photo_price_section() + texts.PRICE_FOOTER

    # Полный прайс — все секции подряд.
    sections = [_epilation_section(), _complex_section(), _laser_rejuv_section()]
    if config.PHOTO_REJUV_ENABLED:
        sections.append(texts.format_photo_price_section())

    return (
        "\n\n".join(sections)
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
