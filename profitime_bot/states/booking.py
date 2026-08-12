"""Состояния FSM: заявка на визит и калькулятор курса."""

from __future__ import annotations

from aiogram.fsm.state import State, StatesGroup


class RequestSG(StatesGroup):
    """Заявка с ручным подтверждением владелицей."""

    direction = State()
    items = State()
    date = State()
    window = State()
    name = State()
    phone = State()
    comment = State()
    confirm = State()


class CalculatorSG(StatesGroup):
    """Мультивыбор зон для расчёта стоимости курса."""

    selecting = State()
