"""
Трекер курса «Мій курс».

Прогресс считается по подтверждённым визитам: их создаёт владелица,
когда подтверждает заявку и вносит реальное время из Bookon.
Бот не выдумывает визиты и не считает пройденным то, чего не было.
"""

from __future__ import annotations

import logging
from datetime import timedelta

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from database import queries
from database.models import Visit
from keyboards import client_kb as kb
from utils import dt, texts

logger = logging.getLogger(__name__)

router = Router(name="course_tracker")

PROGRESS_FILLED = "🟣"
PROGRESS_EMPTY = "⚪️"


def progress_bar(done: int, total: int) -> str:
    """«🟣🟣🟣⚪️⚪️⚪️» — наглядно, сколько курса пройдено."""
    total = max(total, 1)
    done = max(0, min(done, total))
    return PROGRESS_FILLED * done + PROGRESS_EMPTY * (total - done)


def group_by_course(visits: list[Visit]) -> dict[str, list[Visit]]:
    """Визиты по услугам: у клиентки может идти несколько курсов сразу."""
    grouped: dict[str, list[Visit]] = {}
    for visit in visits:
        grouped.setdefault(visit.service_code, []).append(visit)
    return grouped


def _next_line(last: Visit, done: int) -> str:
    """Строка про следующий сеанс: пора, ждём или курс закончен."""
    if done >= last.total_sessions:
        return texts.COURSE_DONE

    next_date = last.visit_at + timedelta(days=last.interval_days)
    if next_date <= dt.now():
        return texts.COURSE_NEXT_READY
    return texts.COURSE_NEXT_WAIT.format(date=dt.fmt_date_full(next_date.date()))


@router.message(F.text == texts.BTN_COURSE)
async def show_course(message: Message, state: FSMContext) -> None:
    await state.clear()
    user = message.from_user
    if user is None:
        return

    visits = await queries.get_user_visits(user.id)
    # Будущие визиты в прогресс не идут — они ещё не состоялись.
    past = [visit for visit in visits if visit.visit_at <= dt.now()]
    upcoming = [visit for visit in visits if visit.visit_at > dt.now()]

    if not past and not upcoming:
        await message.answer(texts.COURSE_EMPTY, reply_markup=kb.course_keyboard(has_course=False))
        return

    # Записалась, но ещё не приходила: прогресса нет, а сказать о визите надо.
    if not past:
        nearest = min(upcoming, key=lambda item: item.visit_at)
        await message.answer(
            texts.COURSE_ONLY_UPCOMING.format(
                datetime=dt.fmt_datetime(nearest.visit_at),
                items="\n".join(
                    f"{texts.E_LASER} {visit.service_title}"
                    for visit in upcoming
                    if visit.visit_at == nearest.visit_at
                ),
            ),
            reply_markup=kb.course_keyboard(has_course=True),
        )
        return

    blocks = [texts.COURSE_HEADER]
    for service_code, course_visits in group_by_course(past).items():
        course_visits.sort(key=lambda item: item.visit_at)
        last = course_visits[-1]
        done = len(course_visits)

        blocks.append(
            texts.COURSE_ITEM.format(
                service=last.service_title,
                progress=progress_bar(done, last.total_sessions),
                done=done,
                total=last.total_sessions,
                last=dt.fmt_date_full(last.visit_at.date()),
                next_line=_next_line(last, done),
            )
        )

    if upcoming:
        nearest = min(upcoming, key=lambda item: item.visit_at)
        blocks.append(
            f"\n{texts.DIVIDER}\n"
            f"{texts.E_DATE} <b>Найближчий візит</b>\n"
            f"{dt.fmt_datetime(nearest.visit_at)}\n"
            f"{nearest.service_title}"
        )

    await message.answer("\n".join(blocks), reply_markup=kb.course_keyboard(has_course=True))
