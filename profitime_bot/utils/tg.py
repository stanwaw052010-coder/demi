"""Мелкие обёртки над Telegram API, чтобы хендлеры не тонули в try/except."""

from __future__ import annotations

import html
import logging
from pathlib import Path

from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest, TelegramForbiddenError, TelegramRetryAfter
from aiogram.types import CallbackQuery, FSInputFile, InlineKeyboardMarkup, Message, User

logger = logging.getLogger(__name__)


async def safe_edit(
    callback: CallbackQuery,
    text: str,
    markup: InlineKeyboardMarkup | None = None,
) -> None:
    """
    Отредактировать сообщение под инлайн-кнопкой.

    Telegram отвечает ошибкой, если текст и клавиатура не изменились — для
    пользователя это не ошибка, поэтому молча игнорируем. Сообщение с фото
    редактировать как текст нельзя, поэтому в таком случае шлём новое.
    """
    message = callback.message
    if not isinstance(message, Message):
        await callback.answer(text[:190], show_alert=True)
        return

    if message.photo or message.document:
        await message.answer(text, reply_markup=markup)
        return

    try:
        await message.edit_text(text, reply_markup=markup)
    except TelegramBadRequest as error:
        if "message is not modified" in str(error):
            return
        logger.debug("Не вдалося відредагувати повідомлення: %s", error)
        await message.answer(text, reply_markup=markup)


async def drop_markup(callback: CallbackQuery) -> None:
    """Убрать кнопки у сообщения, чтобы по ним нельзя было кликнуть повторно."""
    message = callback.message
    if not isinstance(message, Message):
        return
    try:
        await message.edit_reply_markup(reply_markup=None)
    except TelegramBadRequest:
        pass


async def notify(
    bot: Bot,
    chat_id: int,
    text: str,
    markup: InlineKeyboardMarkup | None = None,
) -> bool:
    """
    Отправить сообщение, не роняя вызывающий код.

    Возвращает False, если пользователь заблокировал бота или чат недоступен.
    """
    try:
        await bot.send_message(chat_id, text, reply_markup=markup)
        return True
    except TelegramForbiddenError:
        logger.warning("Користувач %s заблокував бота — повідомлення не доставлено", chat_id)
        return False
    except TelegramRetryAfter as error:
        logger.warning("Ліміт Telegram, повтор через %s c", error.retry_after)
        return False
    except TelegramBadRequest as error:
        logger.warning("Не вдалося надіслати повідомлення в чат %s: %s", chat_id, error)
        return False


async def answer_with_image(
    message: Message,
    image: Path | None,
    text: str,
    markup: InlineKeyboardMarkup | None = None,
) -> None:
    """
    Отправить сообщение с картинкой, если файл на месте.

    Файла нет или Telegram его не принял — уходит обычный текст, без ошибок.
    """
    if image is not None:
        try:
            await message.answer_photo(
                FSInputFile(image), caption=text[:1024], reply_markup=markup
            )
            return
        except (TelegramBadRequest, OSError) as error:
            logger.warning("Не вдалося надіслати зображення %s: %s", image, error)

    await message.answer(text, reply_markup=markup)


def user_link(user_id: int, full_name: str, username: str | None) -> str:
    """Кликабельная ссылка на клиента для уведомлений владелице."""
    if username:
        return f"@{username}"
    return f'<a href="tg://user?id={user_id}">{html.escape(full_name or "клієнт")}</a>'


def display_name(user: User | None) -> str:
    """Имя из профиля Telegram — для приветствия."""
    if user is None or not user.first_name:
        return "гостя"
    return html.escape(user.first_name)


def escape(value: str | None) -> str:
    """Экранирование пользовательского текста перед вставкой в HTML-разметку."""
    return html.escape(value or "")
