"""
Обмеження частоти дій одного користувача.

Навіщо: бот сидить на VPS з 1 ГБ пам'яті й однією базою SQLite. Людина,
яка затисне кнопку меню, або скрипт, що довбить бота командами, здатні
з'їсти весь процесор і чергу апдейтів — і тоді решта клієнток чекає.

Як влаштовано: ковзне вікно на одну хвилину. Для кожного користувача
тримаємо позначки часу його дій за останню хвилину; щойно їх стає більше
за ліміт — апдейт відкидається. Перше перевищення супроводжується
ввічливим попередженням, далі бот мовчить, щоб не влаштовувати
пінг-понг попереджень.

Пам'ять не тече: записи старші за хвилину викидаються при кожному
зверненні, а користувачі, які нічого не робили годину, — при періодичному
прибиранні.
"""

from __future__ import annotations

import logging
import time
from collections import defaultdict, deque
from typing import Any, Awaitable, Callable

from aiogram import BaseMiddleware
from aiogram.types import CallbackQuery, Message, TelegramObject, User

logger = logging.getLogger(__name__)

# Скільки дій дозволено за вікно і яке саме вікно.
DEFAULT_LIMIT = 20
WINDOW_SECONDS = 60.0

# Через скільки секунд тиші забути про користувача.
FORGET_AFTER_S = 3600.0

WARNING_TEXT = (
    "Ви надто швидко натискаєте 🙂\n"
    "Зачекайте хвилинку — і я знову відповідатиму."
)


class ThrottlingMiddleware(BaseMiddleware):
    """Не більше `limit` дій від одного користувача за хвилину."""

    def __init__(self, limit: int = DEFAULT_LIMIT, window: float = WINDOW_SECONDS) -> None:
        self.limit = limit
        self.window = window
        self._hits: dict[int, deque[float]] = defaultdict(deque)
        self._warned: dict[int, float] = {}
        self._last_cleanup = time.monotonic()

    def _cleanup(self, now: float) -> None:
        """Раз на 10 хвилин викидаємо тих, хто давно нічого не робив."""
        if now - self._last_cleanup < 600:
            return
        self._last_cleanup = now

        stale = [
            user_id
            for user_id, hits in self._hits.items()
            if not hits or now - hits[-1] > FORGET_AFTER_S
        ]
        for user_id in stale:
            self._hits.pop(user_id, None)
            self._warned.pop(user_id, None)

    async def __call__(
        self,
        handler: Callable[[TelegramObject, dict[str, Any]], Awaitable[Any]],
        event: TelegramObject,
        data: dict[str, Any],
    ) -> Any:
        user: User | None = data.get("event_from_user")
        if user is None:
            return await handler(event, data)

        now = time.monotonic()
        self._cleanup(now)

        hits = self._hits[user.id]
        while hits and now - hits[0] > self.window:
            hits.popleft()

        if len(hits) >= self.limit:
            await self._reject(event, user.id, now)
            return None

        hits.append(now)
        return await handler(event, data)

    async def _reject(self, event: TelegramObject, user_id: int, now: float) -> None:
        """Відкинути апдейт. Попереджаємо не частіше разу на вікно."""
        should_warn = now - self._warned.get(user_id, 0.0) > self.window
        if should_warn:
            self._warned[user_id] = now
            logger.warning("Ліміт частоти: користувач %s перевищив %s дій/хв", user_id, self.limit)

        try:
            if isinstance(event, CallbackQuery):
                # Кнопка мусить перестати «крутитися» навіть при відмові.
                await event.answer(WARNING_TEXT if should_warn else "", show_alert=should_warn)
            elif isinstance(event, Message) and should_warn:
                await event.answer(WARNING_TEXT)
        except Exception:  # noqa: BLE001 — відмова в обслуговуванні не має падати сама
            logger.debug("Не вдалося попередити користувача %s про ліміт", user_id)
