"""
Планировщик фоновых задач.

Три джобы:
  • напоминания за 24 часа и за 2 часа до визита — проверка каждые
    несколько минут;
  • приглашение записаться снова — раз в сутки, для тех, кто давно не был;
  • ночная уборка: закрыть прошедшие записи, убрать устаревшие блокировки.

Факт отправки каждого сообщения пишется в БД (reminded_24 / reminded_2 /
followup_sent), поэтому перезапуск бота не приводит ни к дублям,
ни к потерянным напоминаниям.
"""

from __future__ import annotations

import logging
from datetime import timedelta

from aiogram import Bot
from apscheduler.schedulers.asyncio import AsyncIOScheduler

import config
from database import db
from keyboards import client as client_kb
from utils import dt, texts, tg

logger = logging.getLogger(__name__)

REMIND_24H, REMIND_2H = config.REMINDER_OFFSETS_H


async def send_due_reminders(bot: Bot) -> None:
    """Разослать напоминания, срок которых наступил."""
    now = dt.now()
    horizon = now + timedelta(hours=max(config.REMINDER_OFFSETS_H))

    try:
        bookings = await db.get_bookings_between(now, horizon)
    except Exception:  # noqa: BLE001 — джоба не должна падать молча и навсегда
        logger.exception("Не вдалося отримати записи для нагадувань")
        return

    for booking in bookings:
        hours_left = (booking.start_at - now).total_seconds() / 3600

        # Ближний порог проверяем первым: если запись создали за час до визита,
        # клиентка получит только актуальное «за 2 години», а не оба сообщения.
        if hours_left <= REMIND_2H and not booking.reminded_2:
            text = texts.REMINDER_2.format(
                time=dt.fmt_time(booking.start_at),
                service=booking.service_name,
            )
            await tg.notify(bot, booking.user_id, text)
            await db.mark_reminded(booking.id, kind_24=True, kind_2=True)
            logger.info("Нагадування за %s год надіслано (запис №%s)", REMIND_2H, booking.id)
            continue

        if hours_left <= REMIND_24H and not booking.reminded_24:
            text = texts.REMINDER_24.format(
                date=dt.fmt_date_full(booking.start_at.date()),
                time=dt.fmt_time(booking.start_at),
                service=booking.service_name,
            )
            await tg.notify(bot, booking.user_id, text)
            await db.mark_reminded(booking.id, kind_24=True)
            logger.info("Нагадування за %s год надіслано (запис №%s)", REMIND_24H, booking.id)


async def send_followups(bot: Bot) -> None:
    """
    Предложить записаться снова тем, кто давно не был.

    Интервал берётся из config.FOLLOWUP_DAYS отдельно для маникюра, педикюра
    и подологии. Сообщение уходит только по последнему визиту клиентки и только
    если она ещё не записана вперёд — иначе это выглядело бы навязчиво.
    """
    if not config.FOLLOWUP_ENABLED or not config.FOLLOWUP_DAYS:
        return

    now = dt.now()
    newest = now - timedelta(days=min(config.FOLLOWUP_DAYS.values()))
    oldest = now - timedelta(days=config.FOLLOWUP_MAX_AGE_DAYS)

    try:
        candidates = await db.get_followup_candidates(oldest, newest)
    except Exception:  # noqa: BLE001 — джоба не должна падать молча и навсегда
        logger.exception("Не вдалося отримати візити для повторного запису")
        return

    handled: list[int] = []
    sent = 0

    for booking in candidates:
        last_visit = await db.get_last_visit_end(booking.user_id)
        if last_visit is not None and last_visit > booking.end_at:
            # Клиентка была позже (или уже записана вперёд) — этот визит неактуален.
            handled.append(booking.id)
            continue

        # Считаем календарными днями: визит 30 дней назад должен читаться
        # как «минуло 30 днів», а не 29 из-за нескольких часов разницы.
        days_passed = (now.date() - booking.end_at.date()).days
        required = config.FOLLOWUP_DAYS.get(booking.category_code)
        if required is None or days_passed < required:
            # Для этой категории срок ещё не подошёл — вернёмся к записи завтра.
            continue

        delivered = await tg.notify(
            bot,
            booking.user_id,
            texts.FOLLOWUP.format(
                service=booking.service_name,
                days=days_passed,
                days_word=texts.plural_days(days_passed),
            ),
            client_kb.book_again_keyboard(),
        )
        # Отмечаем в любом случае: если клиентка заблокировала бота,
        # повторять попытку каждый день бессмысленно.
        handled.append(booking.id)
        sent += int(delivered)

    await db.mark_followup_sent(handled)
    if sent:
        logger.info("Запрошень на повторний запис надіслано: %s", sent)


async def nightly_cleanup() -> None:
    """Закрыть прошедшие записи и убрать устаревшие блокировки."""
    try:
        closed = await db.close_past_bookings()
        removed = await db.delete_past_blocks()
        logger.info("Нічне прибирання: закрито записів %s, знято блокувань %s", closed, removed)
    except Exception:  # noqa: BLE001
        logger.exception("Помилка нічного прибирання")


def setup_scheduler(bot: Bot) -> AsyncIOScheduler:
    """Собрать и запустить планировщик."""
    scheduler = AsyncIOScheduler(timezone=dt.TZ)

    scheduler.add_job(
        send_due_reminders,
        trigger="interval",
        minutes=config.REMINDER_CHECK_INTERVAL_MIN,
        args=(bot,),
        id="reminders",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=300,
        next_run_time=dt.now() + timedelta(seconds=20),
    )

    scheduler.add_job(
        send_followups,
        trigger="cron",
        hour=config.FOLLOWUP_HOUR,
        minute=0,
        args=(bot,),
        id="followups",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=3600,
    )

    scheduler.add_job(
        nightly_cleanup,
        trigger="cron",
        hour=3,
        minute=30,
        id="cleanup",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=3600,
    )

    scheduler.start()
    logger.info(
        "Планувальник запущено: нагадування кожні %s хв (за %s та %s год до візиту)",
        config.REMINDER_CHECK_INTERVAL_MIN,
        REMIND_24H,
        REMIND_2H,
    )
    return scheduler
