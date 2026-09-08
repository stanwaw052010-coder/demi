"""
Глобальний обробник помилок.

Головне правило production-бота: **жодна помилка не має його вбивати**.
Будь-який виняток у хендлері доходить сюди, і далі відбувається три речі:

  1. повний трейсбек іде в лог і в журнал помилок у БД — щоб потрапити
     в щоденний звіт власниці;
  2. клієнтка бачить ввічливе повідомлення українською, а не мовчання;
  3. адмін отримує трейсбек у Telegram — щоб дізнатися про поломку
     раніше, ніж про неї повідомить клієнтка.

Окремо розібрані помилки, які не є поломкою й не потребують уваги:
Flood Control (Telegram просить зачекати), заблокований бот, обрив мережі.
Їх достатньо залогувати.
"""

from __future__ import annotations

import asyncio
import html
import logging
import traceback

from aiogram import Bot, Dispatcher
from aiogram.exceptions import (
    TelegramBadRequest,
    TelegramForbiddenError,
    TelegramNetworkError,
    TelegramRetryAfter,
)
from aiogram.types import CallbackQuery, ErrorEvent, Message

import config
from database import queries

logger = logging.getLogger(__name__)

USER_MESSAGE = (
    "Ой, щось пішло не так 😔\n\n"
    "Ми вже знаємо про це й розбираємось. Спробуйте ще раз або "
    "відкрийте меню: /start\n\n"
    f"Якщо потрібно терміново — телефонуйте: {config.PHONE}"
)

# Скільки символів трейсбека слати адміну. Telegram обмежує повідомлення
# 4096 символами, лишаємо запас на заголовок.
TRACEBACK_LIMIT = 2500


def register_error_handler(dispatcher: Dispatcher, bot: Bot) -> None:
    """Повісити обробник на диспетчер. Викликається один раз на старті."""

    @dispatcher.errors()
    async def handle_error(event: ErrorEvent) -> bool:
        exception = event.exception

        # --- Очікувані ситуації: не поломка, реагувати не треба ---

        if isinstance(exception, TelegramRetryAfter):
            logger.warning(
                "Flood control: Telegram просить зачекати %s c", exception.retry_after
            )
            await asyncio.sleep(exception.retry_after)
            return True

        if isinstance(exception, TelegramForbiddenError):
            user_id = _user_id(event)
            logger.info("Користувач %s заблокував бота", user_id)
            if user_id is not None:
                await _mark_blocked(user_id)
            return True

        if isinstance(exception, TelegramNetworkError):
            logger.warning("Мережева помилка Telegram: %s", exception)
            return True

        if isinstance(exception, TelegramBadRequest) and _is_harmless(exception):
            logger.debug("Нешкідливий BadRequest: %s", exception)
            return True

        if isinstance(exception, asyncio.CancelledError):
            # Зупинка бота — не помилка.
            raise exception

        # --- Справжня поломка ---

        logger.exception("Необроблена помилка в хендлері", exc_info=exception)
        await _log_to_db(exception)
        await _tell_user(event)
        await _tell_admins(bot, event, exception)

        # True означає «помилку опрацьовано» — polling продовжується.
        return True


def _is_harmless(error: TelegramBadRequest) -> bool:
    """
    BadRequest'и, які виникають від нормальної поведінки користувача.

    «message is not modified» — клієнтка натиснула кнопку екрана, на якому
    вже перебуває. «query is too old» — кнопка з давнього повідомлення.
    Обидва не потребують ні уваги адміна, ні вибачень перед клієнткою.
    """
    text = str(error).lower()
    return any(
        phrase in text
        for phrase in (
            "message is not modified",
            "query is too old",
            "message to edit not found",
            "message can't be deleted",
        )
    )


def _user_id(event: ErrorEvent) -> int | None:
    update = event.update
    if update.message is not None and update.message.from_user is not None:
        return update.message.from_user.id
    if update.callback_query is not None:
        return update.callback_query.from_user.id
    return None


async def _mark_blocked(user_id: int) -> None:
    try:
        await queries.mark_user_blocked(user_id)
    except Exception:  # noqa: BLE001 — не даємо помилці всередині обробника помилок
        logger.debug("Не вдалося позначити %s як заблокованого", user_id)


async def _log_to_db(exception: BaseException) -> None:
    try:
        await queries.log_error(type(exception).__name__, str(exception)[:500])
    except Exception:  # noqa: BLE001
        logger.debug("Не вдалося записати помилку в БД")


async def _tell_user(event: ErrorEvent) -> None:
    """Показати клієнтці, що бот живий і про проблему вже знають."""
    update = event.update
    try:
        if update.callback_query is not None:
            await update.callback_query.answer()
            message = update.callback_query.message
            if isinstance(message, Message):
                await message.answer(USER_MESSAGE)
        elif isinstance(update.message, Message):
            await update.message.answer(USER_MESSAGE)
    except Exception:  # noqa: BLE001 — чат міг стати недоступним
        logger.debug("Не вдалося показати користувачу повідомлення про помилку")


async def _tell_admins(bot: Bot, event: ErrorEvent, exception: BaseException) -> None:
    """Надіслати адміну трейсбек. Персональних даних тут немає — тільки код."""
    trace = "".join(
        traceback.format_exception(type(exception), exception, exception.__traceback__)
    )
    if len(trace) > TRACEBACK_LIMIT:
        trace = "…\n" + trace[-TRACEBACK_LIMIT:]

    where = _describe(event)
    text = (
        "🔴 <b>Помилка в боті</b>\n\n"
        f"<b>Де:</b> {html.escape(where)}\n"
        f"<b>Тип:</b> {html.escape(type(exception).__name__)}\n\n"
        f"<pre>{html.escape(trace)}</pre>"
    )

    for admin_id in config.ADMIN_IDS:
        try:
            await bot.send_message(admin_id, text)
        except Exception:  # noqa: BLE001 — адмін міг не відкрити чат із ботом
            logger.debug("Не вдалося повідомити адміна %s про помилку", admin_id)


def _describe(event: ErrorEvent) -> str:
    """Коротко: що саме натиснув користувач. Без імен і телефонів."""
    update = event.update
    if update.callback_query is not None:
        return f"кнопка «{update.callback_query.data}»"
    if update.message is not None:
        text = update.message.text or "<без тексту>"
        # Команди показуємо як є, довільний текст — ні: це може бути
        # ім'я або телефон клієнтки.
        return text if text.startswith("/") else "текстове повідомлення"
    return "невідомий апдейт"
