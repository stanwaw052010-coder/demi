"""
Планировщик напоминаний.

APScheduler раз в несколько минут проверяет ближайшие записи и отправляет
напоминания за 24 часа и за 2 часа до визита. Факт отправки пишется в БД
(колонки reminded_24 / reminded_2), поэтому перезапуск бота не приводит
ни к дублям, ни к потерянным напоминаниям.
"""

from __future__ import annotations

import logging
from datetime import timedelta

from aiogram import Bot
from apscheduler.schedulers.asyncio import AsyncIOScheduler

import config
from database import db
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
