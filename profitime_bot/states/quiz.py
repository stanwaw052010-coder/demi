"""Состояние теста «Чи підходить мені лазер»."""

from __future__ import annotations

from aiogram.fsm.state import State, StatesGroup


class QuizSG(StatesGroup):
    """
    Один рабочий стан на весь тест.

    Номер текущего вопроса и собранные ответы лежат в data — так проще,
    чем заводить отдельный State под каждый из семи вопросов.
    """

    running = State()
