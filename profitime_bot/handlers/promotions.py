"""
Раздел «Акції».

Показываются акции из config плюс добавленные владелицей из админки.
Просроченные скрываются автоматически по дате окончания — отдельной
уборки не нужно.
"""

from __future__ import annotations

import logging

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

import config
from database import queries
from database.models import Promotion
from keyboards import client_kb as kb
from utils import dt, texts

logger = logging.getLogger(__name__)

router = Router(name="promotions")


def _fmt_until(value: str) -> str:
    day = dt.parse_iso_date(value)
    return dt.fmt_date_short(day) if day else value


def _promo_block(
    title: str,
    description: str,
    old_price: int | None,
    new_price: int | None,
    valid_until: str,
) -> str:
    price_line = ""
    if old_price and new_price:
        price_line = texts.PROMO_PRICE_LINE.format(
            old=old_price, new=new_price, currency=config.CURRENCY
        )
    return texts.PROMO_ITEM.format(
        title=title,
        description=description,
        price_line=price_line,
        until=_fmt_until(valid_until),
    )


def format_promotions(db_promotions: list[Promotion]) -> str | None:
    """
    Текст раздела. None — активных акций нет.

    Сначала идут акции из config (базовые предложения студии),
    затем добавленные владелицей — они обычно свежее и срочнее.
    """
    today_iso = dt.today().isoformat()
    blocks: list[str] = []

    for promo in config.PROMOTIONS:
        if promo["valid_until"] < today_iso:
            continue
        blocks.append(
            _promo_block(
                promo["title"], promo["description"],
                promo["old_price"], promo["new_price"], promo["valid_until"],
            )
        )

    for promo in db_promotions:
        blocks.append(
            _promo_block(
                promo.title, promo.description,
                promo.old_price, promo.new_price, promo.valid_until,
            )
        )

    if not blocks:
        return None
    return texts.PROMO_HEADER + "\n".join(blocks)


@router.message(F.text == texts.BTN_PROMOTIONS)
async def show_promotions(message: Message, state: FSMContext) -> None:
    await state.clear()
    db_promotions = await queries.list_db_promotions()
    text = format_promotions(db_promotions)

    if text is None:
        await message.answer(texts.PROMO_EMPTY, reply_markup=kb.menu_keyboard())
        return

    await message.answer(text, reply_markup=kb.promotions_keyboard())
