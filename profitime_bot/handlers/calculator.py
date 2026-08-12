"""
Калькулятор стоимости курса.

Мультивыбор зон, подсчёт на лету. Показывает три числа, которые клиентку
действительно интересуют: за сеанс, за весь курс и сколько экономит пакет.
Отдельно — подсказка, если те же зоны дешевле взять комплексом.
"""

from __future__ import annotations

import logging

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

import config
from keyboards import client_kb as kb
from states.booking import CalculatorSG
from utils import dt, texts, tg

logger = logging.getLogger(__name__)

router = Router(name="calculator")


def _selection_text(selected: list[str]) -> str:
    if not selected:
        return texts.CALC_SELECTED_EMPTY
    return texts.CALC_SELECTED.format(
        items=texts.format_items(selected),
        total=texts.items_total(selected),
        currency=config.CURRENCY,
    )


def _find_better_complex(selected: list[str]) -> tuple[dict, int] | None:
    """
    Комплекс, который полностью покрывает выбор и стоит дешевле.

    Возвращает сам комплекс и стоимость тех же зон по отдельности.
    """
    chosen = set(selected)
    best: tuple[dict, int] | None = None

    for complex_service in config.COMPLEXES.values():
        zones = set(complex_service["zones"])
        if not chosen or not chosen.issubset(zones):
            continue
        separate = sum(
            config.SERVICES_EPILATION[code]["price"]
            for code in zones
            if code in config.SERVICES_EPILATION
        )
        if complex_service["price"] >= separate:
            continue
        if best is None or complex_service["price"] < best[0]["price"]:
            best = (complex_service, separate)

    return best


def _course_sessions(selected: list[str]) -> int:
    """
    Сколько сеансов считать для курса.

    Берём максимум по выбранным зонам: если в наборе есть лицо (8 сеансов),
    курс не закончится на шестом.
    """
    sessions = [
        service["sessions"]
        for code in selected
        if (service := config.get_any_service(code)) is not None
    ]
    return max(sessions) if sessions else 6


# --------------------------------------------------------------------------- #
# Экраны
# --------------------------------------------------------------------------- #


@router.message(F.text == texts.BTN_CALCULATOR)
async def open_calculator(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(CalculatorSG.selecting)
    await state.update_data(calc_items=[])
    await message.answer(
        texts.CALC_INTRO.format(selection=_selection_text([])),
        reply_markup=kb.calculator_keyboard([]),
    )


@router.callback_query(F.data.startswith(f"{kb.CB_CALC_ITEM}:"))
async def toggle_item(callback: CallbackQuery, state: FSMContext) -> None:
    code = callback.data.split(":", 2)[2]
    if config.get_any_service(code) is None:
        await callback.answer()
        return

    data = await state.get_data()
    selected: list[str] = list(data.get("calc_items", []))

    if code in selected:
        selected.remove(code)
        await callback.answer("Прибрали")
    else:
        selected.append(code)
        await callback.answer("Додали")

    await state.set_state(CalculatorSG.selecting)
    await state.update_data(calc_items=selected)
    await tg.safe_edit(
        callback,
        texts.CALC_INTRO.format(selection=_selection_text(selected)),
        kb.calculator_keyboard(selected),
    )


@router.callback_query(F.data == kb.CB_CALC_RESET)
async def reset_calculator(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.set_state(CalculatorSG.selecting)
    await state.update_data(calc_items=[])
    await tg.safe_edit(
        callback,
        texts.CALC_INTRO.format(selection=_selection_text([])),
        kb.calculator_keyboard([]),
    )


@router.callback_query(F.data == kb.CB_CALC_RESULT)
async def show_result(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    data = await state.get_data()
    selected: list[str] = list(data.get("calc_items", []))

    if not selected:
        await callback.answer(texts.REQ_NO_ITEMS, show_alert=True)
        return

    per_session = texts.items_total(selected)
    sessions = _course_sessions(selected)
    course = per_session * sessions

    # Пакет из 5 сеансов + недостающие сеансы по обычной цене.
    package_base = sum(
        service["package_price"]
        for code in selected
        if (service := config.get_any_service(code)) is not None
    )
    extra_sessions = max(sessions - 5, 0)
    package = package_base + per_session * extra_sessions
    package_saving = course - package

    complex_hint = ""
    better = _find_better_complex(selected)
    if better is not None:
        complex_service, separate = better
        complex_hint = texts.CALC_COMPLEX_HINT.format(
            name=complex_service["name"],
            price=complex_service["price"],
            separate=separate,
            currency=config.CURRENCY,
            saving=separate - complex_service["price"],
        )

    await tg.safe_edit(
        callback,
        texts.CALC_RESULT.format(
            items=texts.format_items(selected),
            per_session=per_session,
            sessions=sessions,
            sessions_word=dt.plural_sessions(sessions),
            course=course,
            package=package,
            package_saving=max(package_saving, 0),
            complex_hint=complex_hint,
            currency=config.CURRENCY,
        ),
        kb.calculator_result_keyboard(),
    )
