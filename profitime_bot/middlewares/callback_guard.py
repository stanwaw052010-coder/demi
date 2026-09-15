"""
Захист від подвійного натискання інлайн-кнопок.

Дві різні біди, які лікуються тут.

**Подвійний тап.** Telegram доставляє обидва натискання, і хендлер
виконується двічі: клієнтка отримує дві однакові заявки, власниця —
два сповіщення. Ловимо це так: пара «користувач + callback_data»
блокується на пів секунди.

**Незавершений сценарій з учорашнього дня.** Заявка, калькулятор і тест —
покрокові: кожен крок спирається на те, що клієнтка обрала на попередньому.
Це проміжне сховище живе в пам'яті процесу й зникає при перезапуску бота.
Тиснути «Далі» в напівзаповненій формі тижневої давності нема сенсу —
такі кнопки відсікаємо за віком повідомлення.

Решти кнопок вік НЕ стосується. Довідкові екрани, прайс, FAQ, картки
послуг, навігація меню не залежать ні від чого, крім config: вони так само
коректні через тиждень, як і через хвилину. Раніше перевірка була суцільною,
і клієнтка, яка поверталася в чат і тиснула кнопку в останньому повідомленні
бота — найприродніша дія з усіх, — отримувала «повідомлення застаріло»
замість екрана.

Дії, що змінюють дані (підтвердження перенесення, адмінка), теж проходять
вільно: там кожен хендлер сам перевіряє заявку в базі й показує
«ця заявка вже опрацьована», якщо її немає.

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

# Скільки живе напівзаповнена форма. Доба з запасом покриває сценарій
# «почала ввечері, дозаповнила зранку», але відсікає археологію.
MAX_MESSAGE_AGE_S = 24 * 3600

# Кроки покрокових сценаріїв — єдине, що псується від часу.
STATEFUL_PREFIXES: tuple[str, ...] = ("req:", "calc:", "quiz:")

# «Залишити заявку» починає сценарій з нуля, а не продовжує старий.
# Ця кнопка стоїть у картках послуг і в довідкових екранах, тож вона має
# працювати завжди — інакше повертаємось до тієї самої біди.
FRESH_START_PREFIXES: tuple[str, ...] = ("req:start", "quiz:start", "quiz:restart")

STALE_TEXT = "Ця форма вже застаріла — почніть, будь ласка, заново: /start"


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
    """Чи це крок старого сценарію, який уже не можна продовжити."""
    payload = event.data or ""

    if payload.startswith(FRESH_START_PREFIXES):
        return False
    if not payload.startswith(STATEFUL_PREFIXES):
        return False

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
