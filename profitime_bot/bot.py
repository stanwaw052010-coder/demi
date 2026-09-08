"""
Точка входу.

Запуск: python bot.py
Режим — long polling, без вебхуків, доменів і SSL.

Порядок старту зафіксований і має значення:
    логування → перевірка .env → база й міграції → бот → middleware →
    обробник помилок → планувальник → зв'язок із Telegram → polling.

Логування першим не випадково: інакше помилка конфігурації нікуди
не запишеться, і на сервері її не буде видно взагалі.
"""

from __future__ import annotations

import asyncio
import contextlib
import logging
import signal
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
from middlewares.callback_guard import CallbackGuardMiddleware
from middlewares.throttling import ThrottlingMiddleware
from utils import health
from utils.errors import register_error_handler
from utils.logging_setup import setup_logging
from utils.scheduler import setup_scheduler

logger = logging.getLogger("bot")

# Скільки разів пробувати достукатися до Telegram на старті й з якою паузою.
CONNECT_ATTEMPTS = 10
CONNECT_RETRY_DELAY_S = 3
CONNECT_RETRY_MAX_S = 60

# Скільки чекати на завершення поточних апдейтів при зупинці.
SHUTDOWN_TIMEOUT_S = 20

CLIENT_COMMANDS = [
    BotCommand(command="start", description="Головне меню"),
    BotCommand(command="cancel", description="Скасувати поточну дію"),
    BotCommand(command="help", description="Довідка"),
]

ADMIN_COMMANDS = CLIENT_COMMANDS + [
    BotCommand(command="admin", description="Панель власниці"),
]


def build_dispatcher() -> Dispatcher:
    """
    Зібрати диспетчер.

    Порядок роутерів важливий:
      1) common       — команди та кнопки меню перехоплюються в будь-якому стані;
      2) admin        — усе, що доступно лише власниці;
      3) розділи      — заявка, інфо, калькулятор, тест, курс, акції, прайс;
      4) fallback     — застарілі кнопки та довільне введення.
    """
    dispatcher = Dispatcher(storage=MemoryStorage())

    # Middleware вішаємо на диспетчер, а не на окремі роутери: вони мають
    # відпрацювати до будь-якого хендлера, зокрема до адмінського.
    throttling = ThrottlingMiddleware()
    guard = CallbackGuardMiddleware()

    dispatcher.message.middleware(throttling)
    dispatcher.callback_query.middleware(throttling)
    dispatcher.callback_query.middleware(guard)

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
        except Exception:  # noqa: BLE001 — власниця могла ще не відкрити чат із ботом
            logger.warning(
                "Не вдалося встановити команди для %s. "
                "Надішліть боту /start з цього акаунта і перезапустіть його.",
                admin_id,
            )


async def wait_for_telegram(bot: Bot, attempts: int = CONNECT_ATTEMPTS) -> str | None:
    """
    Дочекатися доступності Telegram і повернути username бота.

    Затримка зростає експоненційно (3, 6, 12, 24, 48, 60, 60…): при
    автозапуску бот стартує раніше, ніж піднімається мережа, а після
    аварії провайдера довбити API щосекунди немає сенсу. None означає,
    що запускатися марно — причина вже в лозі.
    """
    delay = CONNECT_RETRY_DELAY_S

    for attempt in range(1, attempts + 1):
        try:
            me = await bot.get_me()
            return me.username
        except TelegramUnauthorizedError:
            logger.error("Telegram відхилив токен. Перевірте BOT_TOKEN у файлі .env")
            return None
        except TelegramNetworkError as error:
            if attempt == attempts:
                logger.error("Немає зв'язку з Telegram після %s спроб: %s", attempts, error)
                return None
            logger.warning(
                "Немає зв'язку з Telegram (спроба %s з %s). Повтор через %s c…",
                attempt, attempts, delay,
            )
            await asyncio.sleep(delay)
            delay = min(delay * 2, CONNECT_RETRY_MAX_S)

    return None


def install_signal_handlers(stop_event: asyncio.Event) -> None:
    """
    SIGTERM і SIGINT переводимо в подію, а не в миттєве вбивство процесу.

    systemd під час рестарту шле SIGTERM. Без цього обробника процес
    обірвався б посеред апдейта: клієнтка натиснула кнопку, бот її прочитав
    і не відповів. Тут ми лише просимо polling зупинитися, а далі коректно
    закриваємо планувальник, сесію й базу.
    """
    loop = asyncio.get_running_loop()

    for sig in (signal.SIGTERM, signal.SIGINT):
        with contextlib.suppress(NotImplementedError):
            # Windows не вміє add_signal_handler — там працює KeyboardInterrupt.
            loop.add_signal_handler(sig, stop_event.set)


async def main() -> None:
    log_file = setup_logging()

    problems = config.check_environment()
    if problems:
        for problem in problems:
            logger.error("Помилка конфігурації: %s", problem)
        logger.error("Заповніть файл .env (зразок — .env.example) і запустіть бота знову.")
        return

    logger.info("Старт. База: %s", config.DB_PATH)
    if log_file is not None:
        logger.info("Лог пишеться у %s", log_file)

    await db.init_db()

    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML, link_preview_is_disabled=True),
    )
    dispatcher = build_dispatcher()
    register_error_handler(dispatcher, bot)
    scheduler = setup_scheduler(bot)

    stop_event = asyncio.Event()
    install_signal_handlers(stop_event)

    polling: asyncio.Task[None] | None = None

    try:
        username = await wait_for_telegram(bot)
        if username is None:
            return

        await setup_commands(bot)
        await health.touch()

        logger.info("Бот @%s запущено. Студія: %s", username, config.SALON_NAME)
        if config.logo_path() is None:
            logger.info("Файл assets/logo.png не знайдено — працюємо без логотипа")

        polling = asyncio.create_task(
            dispatcher.start_polling(
                bot,
                allowed_updates=dispatcher.resolve_used_update_types(),
                # False, а не True: повідомлення, надіслані клієнтками під час
                # перезапуску, доходять, а не зникають мовчки.
                drop_pending_updates=False,
                handle_signals=False,
            )
        )

        # Чекаємо або сигналу зупинки, або аварійного завершення polling.
        stop_waiter = asyncio.create_task(stop_event.wait())
        done, _ = await asyncio.wait(
            {polling, stop_waiter}, return_when=asyncio.FIRST_COMPLETED
        )
        stop_waiter.cancel()

        if polling in done:
            # Polling завершився сам — дістаємо виняток, щоб він потрапив у лог.
            polling.result()
        else:
            logger.info("Отримано сигнал зупинки, завершуємо роботу…")

    finally:
        await shutdown(dispatcher, bot, scheduler, polling)


async def shutdown(
    dispatcher: Dispatcher,
    bot: Bot,
    scheduler,
    polling: asyncio.Task[None] | None,
) -> None:
    """
    Коректне завершення.

    Порядок зворотний до старту: спершу перестаємо приймати нові апдейти,
    потім дочікуємо поточні, потім гасимо планувальник і закриваємо сесію.
    """
    if polling is not None and not polling.done():
        with contextlib.suppress(Exception):
            await dispatcher.stop_polling()
        try:
            # Даємо поточним хендлерам домовити — але не нескінченно.
            await asyncio.wait_for(asyncio.shield(polling), timeout=SHUTDOWN_TIMEOUT_S)
        except asyncio.TimeoutError:
            logger.warning(
                "Апдейти не завершилися за %s c — зупиняємо примусово", SHUTDOWN_TIMEOUT_S
            )
            polling.cancel()
            with contextlib.suppress(asyncio.CancelledError, Exception):
                await polling
        except Exception:  # noqa: BLE001 — виняток уже залоговано вище
            pass

    with contextlib.suppress(Exception):
        scheduler.shutdown(wait=False)

    with contextlib.suppress(Exception):
        await bot.session.close()

    logger.info("Бот зупинено")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logging.getLogger("bot").info("Зупинено вручну")
    except Exception:
        # Останній рубіж: якщо впало ще до налаштування логера, слід має лишитися.
        logging.getLogger("bot").exception("Бот аварійно завершився")
        sys.exit(1)
