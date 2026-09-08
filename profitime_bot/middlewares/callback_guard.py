"""
Захист від подвійного натискання інлайн-кнопок.

Дві різні біди, які лікуються тут.

**Подвійний тап.** Telegram доставляє обидва натискання, і хендлер
виконується двічі: клієнтка отримує дві однакові заявки, власниця —
два сповіщення. Ловимо це так: пара «користувач + callback_data»
блокується на пів секунди.

**Кнопка з учорашнього повідомлення.** Клієнтка гортає історію й тисне
кнопку в екрані, який давно неактуальний. Апдейт валідний, але дія вже
не має сенсу — а іноді й шкідлива. Такі callback'и відсікаємо за віком
повідомлення й ввічливо просимо відкрити меню заново.

Обидві перевірки стосуються лише CallbackQuery: у звичайних повідомлень
такої проблеми немає.
"""

from __future__ import annotations

import logging
import time
from typing import Any, Awaitable, Callable

from aiogram import BaseMiddleware
from aiogram.types import CallbackQuery, Message, TelegramObject

logger = logging.getLogger(__name__)

# Скільки часу та сама кнопка того самого користувача вважається дублем.
DOUBLE_TAP_WINDOW_S = 0.5

# Скільки живуть кнопки. Доба з запасом покриває сценарій «відкрив меню
# ввечері, натиснув зранку», але відсікає археологію з минулого тижня.
MAX_MESSAGE_AGE_S = 24 * 3600

STALE_TEXT = "Це повідомлення застаріло. Відкрийте меню: /start"


class CallbackGuardMiddleware(BaseMiddleware):
    """Відсікає дублі натискань і кнопки зі старих повідомлень."""

    def __init__(self) -> None:
        self._recent: dict[tuple[int, str], float] = {}
        self._last_cleanup = time.monotonic()

    def _cleanup(self, now: float) -> None:
        if now - self._last_cleanup < 60:
            return
        self._last_cleanup = now
        self._recent = {
            key: moment
            for key, moment in self._recent.items()
            if now - moment < DOUBLE_TAP_WINDOW_S * 10
        }

    async def __call__(
        self,
        handler: Callable[[TelegramObject, dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: dict[str, Any],
    ) -> Any:
        if not isinstance(event, CallbackQuery):
            return await handler(event, data)

        now = time.monotonic()
        self._cleanup(now)

        user_id = event.from_user.id
        key = (user_id, event.data or "")

        previous = self._recent.get(key)
        if previous is not None and now - previous < DOUBLE_TAP_WINDOW_S:
            logger.debug("Подвійний тап %s від %s — проігноровано", event.data, user_id)
            await _quiet_answer(event)
            return None

        self._recent[key] = now

        if _is_stale(event):
            logger.debug("Застарілий callback %s від %s", event.data, user_id)
            await _quiet_answer(event, STALE_TEXT, alert=True)
            return None

        return await handler(event, data)


def _is_stale(event: CallbackQuery) -> bool:
    """Чи належить кнопка надто старому повідомленню."""
    message = event.message
    if not isinstance(message, Message) or message.date is None:
        return False

    # message.date — aware datetime у UTC, тож різницю рахуємо коректно.
    age = time.time() - message.date.timestamp()
    return age > MAX_MESSAGE_AGE_S


async def _quiet_answer(event: CallbackQuery, text: str = "", alert: bool = False) -> None:
    """
    Погасити «годинник» на кнопці.

    Без цього Telegram крутить індикатор ще секунд тридцять, і клієнтка
    вирішує, що бот завис.
    """
    try:
        await event.answer(text, show_alert=alert)
    except Exception:  # noqa: BLE001 — застарілий callback Telegram уже міг закрити сам
        pass
