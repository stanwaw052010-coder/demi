"""Состояния FSM владелицы."""

from __future__ import annotations

from aiogram.fsm.state import State, StatesGroup


class ConfirmSG(StatesGroup):
    """Подтверждение заявки: владелица вводит реальное время из Bookon."""

    datetime_input = State()


class RescheduleSG(StatesGroup):
    """Предложение другого времени."""

    proposal = State()


class DeclineSG(StatesGroup):
    """Отказ со своей формулировкой причины."""

    custom_reason = State()


class ManualVisitSG(StatesGroup):
    """Запись клиента, который позвонил по телефону."""

    name = State()
    phone = State()
    service = State()
    datetime_input = State()


class PromoSG(StatesGroup):
    """Добавление акции."""

    title = State()
    description = State()
    old_price = State()
    new_price = State()
    valid_until = State()
    confirm = State()


class BroadcastSG(StatesGroup):
    """Рассылка с предпросмотром."""

    text = State()
    confirm = State()
