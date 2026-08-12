"""
Точка входа.

Запуск: python bot.py
Режим — long polling, без вебхуков, доменов и SSL.
"""

from __future__ import annotations

import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.exceptions import TelegramNetworkError, TelegramUnauthorizedError
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import BotCommand, BotCommandScopeChat, BotCommandScopeDefault

import config
from database import db
from handlers import (
    admin,
    booking,
    calculator,
    common,
    course_tracker,
    info_epilation,
    info_rejuvenation,
    price,
    promotions,
    quiz,
    referral,
)
from utils.scheduler import setup_scheduler

logger = logging.getLogger("bot")

# Сколько раз пробовать достучаться до Telegram при старте и с какой паузой.
CONNECT_ATTEMPTS = 5
CONNECT_RETRY_DELAY_S = 3

CLIENT_COMMANDS = [
    BotCommand(command="start", description="Головне меню"),
    BotCommand(command="cancel", description="Скасувати поточну дію"),
    BotCommand(command="help", description="Довідка"),
]

ADMIN_COMMANDS = CLIENT_COMMANDS + [
    BotCommand(command="admin", description="Панель власниці"),
]


def setup_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        stream=sys.stdout,
    )
    logging.getLogger("apscheduler").setLevel(logging.WARNING)


def build_dispatcher() -> Dispatcher:
    """
    Собрать диспетчер.

    Порядок роутеров важен:
      1) common       — команды и кнопки меню перехватываются в любом состоянии;
      2) admin        — всё, что доступно только владелице;
      3) разделы      — заявка, инфо, калькулятор, тест, курс, акции, прайс;
      4) fallback     — устаревшие кнопки и произвольный ввод.
    """
    dispatcher = Dispatcher(storage=MemoryStorage())

    dispatcher.include_router(common.router)
    dispatcher.include_router(admin.router)
    dispatcher.include_router(booking.router)
    dispatcher.include_router(info_epilation.router)
    dispatcher.include_router(info_rejuvenation.router)
    dispatcher.include_router(calculator.router)
    dispatcher.include_router(quiz.router)
    dispatcher.include_router(course_tracker.router)
    dispatcher.include_router(referral.router)
    dispatcher.include_router(promotions.router)
    dispatcher.include_router(price.router)
    dispatcher.include_router(common.fallback_router)

    return dispatcher


async def setup_commands(bot: Bot) -> None:
    await bot.set_my_commands(CLIENT_COMMANDS, scope=BotCommandScopeDefault())
    for admin_id in config.ADMIN_IDS:
        try:
            await bot.set_my_commands(ADMIN_COMMANDS, scope=BotCommandScopeChat(chat_id=admin_id))
        except Exception:  # noqa: BLE001 — владелица могла ещё не открыть чат с ботом
            logger.warning(
                "Не вдалося встановити команди для %s. "
                "Надішліть боту /start з цього акаунта і перезапустіть його.",
                admin_id,
            )


async def wait_for_telegram(bot: Bot, attempts: int = CONNECT_ATTEMPTS) -> str | None:
    """
    Дождаться доступности Telegram и вернуть username бота.

    При автозапуске бот нередко стартует раньше, чем поднимается сеть,
    поэтому связь проверяется с несколькими повторами. None означает,
    что запускаться бессмысленно — причина уже в логе.
    """
    for attempt in range(1, attempts + 1):
        try:
            me = await bot.get_me()
            return me.username
        except TelegramUnauthorizedError:
            logger.error("Telegram отклонил токен. Проверьте BOT_TOKEN в файле .env")
            return None
        except TelegramNetworkError as error:
            if attempt == attempts:
                logger.error("Нет связи с Telegram после %s попыток: %s", attempts, error)
                logger.error("Проверьте интернет на этом компьютере и запустите бот снова.")
                return None
            delay = CONNECT_RETRY_DELAY_S * attempt
            logger.warning(
                "Нет связи с Telegram (попытка %s из %s). Повтор через %s c…",
                attempt, attempts, delay,
            )
            await asyncio.sleep(delay)
    return None


async def main() -> None:
    setup_logging()

    problems = config.check_environment()
    if problems:
        for problem in problems:
            logger.error("Ошибка конфигурации: %s", problem)
        logger.error("Заполните файл .env (образец — .env.example) и запустите бот снова.")
        return

    await db.init_db()

    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML, link_preview_is_disabled=True),
    )
    dispatcher = build_dispatcher()
    scheduler = setup_scheduler(bot)

    try:
        username = await wait_for_telegram(bot)
        if username is None:
            return

        await setup_commands(bot)
        logger.info("Бот @%s запущено. Студія: %s", username, config.SALON_NAME)
        if config.logo_path() is None:
            logger.info("Файл assets/logo.png не знайдено — працюємо без логотипа")

        await dispatcher.start_polling(
            bot,
            allowed_updates=dispatcher.resolve_used_update_types(),
            drop_pending_updates=True,
        )
    finally:
        scheduler.shutdown(wait=False)
        await bot.session.close()
        logger.info("Бот зупинено")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logging.getLogger("bot").info("Зупинено вручну")
