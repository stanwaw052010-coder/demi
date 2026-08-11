"""
Точка входа.

Запуск: python bot.py
Режим — long polling, никаких вебхуков, доменов и SSL.
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
from handlers import admin, client, common
from utils.scheduler import setup_scheduler

logger = logging.getLogger("bot")

# Сколько раз пробовать достучаться до Telegram при старте и с какой паузой.
CONNECT_ATTEMPTS = 5
CONNECT_RETRY_DELAY_S = 3

# Команды, видимые всем клиентам.
CLIENT_COMMANDS = [
    BotCommand(command="start", description="Головне меню"),
    BotCommand(command="cancel", description="Скасувати поточну дію"),
    BotCommand(command="help", description="Довідка"),
]

# Дополнительные команды мастера — показываются только в его чате.
ADMIN_COMMANDS = CLIENT_COMMANDS + [
    BotCommand(command="today", description="Записи на сьогодні"),
    BotCommand(command="week", description="Записи на тиждень"),
    BotCommand(command="block", description="Позначити час недоступним"),
    BotCommand(command="blocks", description="Список недоступного часу"),
]


def setup_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        stream=sys.stdout,
    )
    # APScheduler на INFO слишком многословен для консоли.
    logging.getLogger("apscheduler").setLevel(logging.WARNING)


def build_dispatcher() -> Dispatcher:
    """
    Собрать диспетчер.

    Порядок роутеров важен:
      1) common      — команды и кнопки меню перехватываются в любом состоянии;
      2) admin       — команды мастера;
      3) client      — сценарий записи;
      4) fallback    — всё, что не подошло выше.
    """
    dispatcher = Dispatcher(storage=MemoryStorage())
    dispatcher.include_router(common.router)
    dispatcher.include_router(admin.router)
    dispatcher.include_router(client.router)
    dispatcher.include_router(common.fallback_router)
    return dispatcher


async def setup_commands(bot: Bot) -> None:
    await bot.set_my_commands(CLIENT_COMMANDS, scope=BotCommandScopeDefault())
    if config.ADMIN_ID > 0:
        try:
            await bot.set_my_commands(ADMIN_COMMANDS, scope=BotCommandScopeChat(chat_id=config.ADMIN_ID))
        except Exception:  # noqa: BLE001 — мастер мог ещё не открыть чат с ботом
            logger.warning(
                "Не вдалося встановити команди майстра. "
                "Надішліть боту /start з акаунта майстра і перезапустіть його."
            )


async def wait_for_telegram(bot: Bot, attempts: int = CONNECT_ATTEMPTS) -> str | None:
    """
    Дождаться доступности Telegram и вернуть username бота.

    При автозапуске (systemd, автозагрузка Windows) бот нередко стартует раньше,
    чем поднимается сеть, поэтому связь проверяется с несколькими повторами.
    None означает, что запускаться бессмысленно — причина уже в логе.
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
        logger.info("Бот @%s запущено. Салон: %s", username, config.SALON_NAME)

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
