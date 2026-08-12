"""
Планировщик фоновых задач.

Три джобы:
  • напоминания клиенту за 24 часа и за 2 часа до подтверждённого визита;
  • напоминание владелице о заявке, которая висит без ответа;
  • приглашение на следующий сеанс курса, когда прошёл интервал зоны.

Факт отправки каждого сообщения пишется в БД (reminded_24 / reminded_2 /
pending_reminded / course_reminders_sent), поэтому перезапуск бота не приводит
ни к дублям, ни к потерянным напоминаниям.
"""

from __future__ import annotations

import logging
from datetime import timedelta

from aiogram import Bot
from apscheduler.schedulers.asyncio import AsyncIOScheduler

import config
from database import queries
from keyboards import admin_kb
from keyboards import client_kb
from utils import dt, texts, tg

logger = logging.getLogger(__name__)

REMIND_24H, REMIND_2H = config.VISIT_REMINDER_OFFSETS_H

# Код служебного визита-консультации: курса у него нет.
CONSULT_CODE = "consult"


async def send_visit_reminders(bot: Bot) -> None:
    """
    Напоминания о ближайших визитах.

    Визиты одного клиента на одно время объединяются в одно сообщение:
    записанная на три зоны получает одно напоминание, а не три.
    """
    now = dt.now()

    try:
        visits = await queries.get_visits_between(now, now + timedelta(hours=REMIND_24H + 1))
    except Exception:  # noqa: BLE001 — джоба не должна падать молча и навсегда
        logger.exception("Не вдалося отримати візити для нагадувань")
        return

    from handlers.admin import group_visits

    for when, group in group_visits(visits):
        client_id = group[0].user_id
        if client_id is None:
            continue                      # запись добавлена вручную, клиента в боте нет

        hours_left = (when - now).total_seconds() / 3600
        items = "\n".join(f"{texts.E_LASER} {visit.service_title}" for visit in group)

        # Ближний порог первым: если запись подтвердили за час до визита,
        # клиентка получит только актуальное «сьогодні», а не оба сообщения.
        if hours_left <= REMIND_2H and not all(visit.reminded_2 for visit in group):
            await tg.notify(
                bot,
                client_id,
                texts.CLIENT_VISIT_REMINDER_2.format(
                    time=dt.fmt_time(when), items=items, address=config.ADDRESS
                ),
            )
            for visit in group:
                await queries.mark_visit_reminded(visit.id, kind_24=True, kind_2=True)
            logger.info("Нагадування за %s год: візит %s", REMIND_2H, dt.to_db(when))
            continue

        if hours_left <= REMIND_24H and not all(visit.reminded_24 for visit in group):
            await tg.notify(
                bot,
                client_id,
                texts.CLIENT_VISIT_REMINDER_24.format(
                    date=dt.fmt_date_full(when.date()),
                    time=dt.fmt_time(when),
                    items=items,
                    address=config.ADDRESS,
                    prep=texts.format_prep_short(),
                    phone=config.PHONE,
                ),
            )
            for visit in group:
                await queries.mark_visit_reminded(visit.id, kind_24=True)
            logger.info("Нагадування за %s год: візит %s", REMIND_24H, dt.to_db(when))


async def remind_admins_about_pending(bot: Bot) -> None:
    """Заявка висит без ответа дольше PENDING_REMINDER_HOURS — напомнить владелице."""
    try:
        stale = await queries.get_stale_pending(config.PENDING_REMINDER_HOURS)
    except Exception:  # noqa: BLE001
        logger.exception("Не вдалося отримати «завислі» заявки")
        return

    for request in stale:
        created = dt.from_db(request.created_at)
        hours = int((dt.now() - created).total_seconds() // 3600)

        text = texts.ADMIN_PENDING_REMINDER.format(
            id=request.id,
            hours=hours,
            name=tg.escape(request.client_name),
            phone=request.phone,
        )
        for admin_id in config.ADMIN_IDS:
            await tg.notify(bot, admin_id, text, admin_kb.request_actions_keyboard(request))

        await queries.mark_pending_reminded(request.id)
        logger.info("Нагадування власниці про заявку №%s", request.id)


async def send_course_reminders(bot: Bot) -> None:
    """
    Пригласить на следующий сеанс тех, у кого прошёл интервал.

    Не более config.COURSE_REMINDER_MAX сообщений на курс — дальше тишина.
    Если клиентка уже записана вперёд, её будущий визит окажется последним
    в курсе, и напоминание не уйдёт.
    """
    now = dt.now()

    try:
        last_visits = await queries.last_visits_per_course()
    except Exception:  # noqa: BLE001
        logger.exception("Не вдалося отримати візити для нагадувань про курс")
        return

    sent = 0
    for visit in last_visits:
        if visit.user_id is None or visit.service_code == CONSULT_CODE:
            continue
        if visit.session_no >= visit.total_sessions:
            continue                       # курс пройден
        if visit.course_reminders_sent >= config.COURSE_REMINDER_MAX:
            continue                       # больше не напоминаем
        if visit.visit_at > now:
            continue                       # клиентка уже записана вперёд

        due_from = visit.visit_at + timedelta(days=visit.interval_days)
        if now < due_from:
            continue

        # Второе напоминание — не раньше чем через неделю после первого.
        if visit.course_reminders_sent >= 1 and now < due_from + timedelta(days=7):
            continue

        days = (now.date() - visit.visit_at.date()).days
        await tg.notify(
            bot,
            visit.user_id,
            texts.COURSE_REMINDER.format(
                service=visit.service_title,
                days=days,
                days_word=dt.plural_days(days),
                next_no=visit.session_no + 1,
                total=visit.total_sessions,
            ),
            client_kb.course_reminder_keyboard(),
        )
        await queries.increment_course_reminder(visit.id)
        sent += 1

    if sent:
        logger.info("Запрошень на наступний сеанс курсу надіслано: %s", sent)


def setup_scheduler(bot: Bot) -> AsyncIOScheduler:
    """Собрать и запустить планировщик."""
    scheduler = AsyncIOScheduler(timezone=dt.TZ)

    scheduler.add_job(
        send_visit_reminders,
        trigger="interval",
        minutes=config.SCHEDULER_INTERVAL_MIN,
        args=(bot,),
        id="visit_reminders",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=600,
        next_run_time=dt.now() + timedelta(seconds=20),
    )

    scheduler.add_job(
        remind_admins_about_pending,
        trigger="interval",
        minutes=max(config.SCHEDULER_INTERVAL_MIN, 15),
        args=(bot,),
        id="pending_reminders",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=900,
    )

    scheduler.add_job(
        send_course_reminders,
        trigger="cron",
        hour=config.COURSE_REMINDER_HOUR,
        minute=0,
        args=(bot,),
        id="course_reminders",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        misfire_grace_time=3600,
    )

    scheduler.start()
    logger.info(
        "Планувальник запущено: нагадування за %s та %s год, "
        "контроль заявок кожні %s хв, запрошення на курс о %s:00",
        REMIND_24H,
        REMIND_2H,
        max(config.SCHEDULER_INTERVAL_MIN, 15),
        config.COURSE_REMINDER_HOUR,
    )
    return scheduler
