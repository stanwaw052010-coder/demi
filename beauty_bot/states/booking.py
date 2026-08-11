"""Состояния FSM: сценарий записи, обращение к мастеру и блокировка времени."""

from __future__ import annotations

from aiogram.fsm.state import State, StatesGroup


class BookingSG(StatesGroup):
    """Пошаговая запись клиента."""

    category = State()
    service = State()
    master = State()
    day = State()
    slot = State()
    name = State()
    phone = State()
    confirm = State()


class ContactSG(StatesGroup):
    """Свободное сообщение мастеру из раздела «Контакти»."""

    message = State()


class BlockSG(StatesGroup):
    """Менеджер помечает время как недоступное."""

    master = State()
    day = State()
    start = State()
    end = State()
    reason = State()
