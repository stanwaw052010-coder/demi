"""
Тест «Чи підходить мені лазер».

Семь вопросов, три исхода: зелёный (можно записываться), жёлтый (нужна
консультация), красный (сейчас нельзя). Логика простая и прозрачная:
каждый ответ добавляет пометку и, если нужно, поднимает уровень тревоги.

ВАЖНО: на экране результата всегда стоит дисклеймер — это ориентировочный
подбор, а не медицинское заключение. Он показывается при любом исходе,
а не только при красном.
"""

from __future__ import annotations

import logging
from typing import Final, TypedDict

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from database import queries
from keyboards import client_kb as kb
from states.quiz import QuizSG
from utils import texts, tg

logger = logging.getLogger(__name__)

router = Router(name="quiz")

VERDICT_GREEN = "green"
VERDICT_YELLOW = "yellow"
VERDICT_RED = "red"

# Порядок важности: красный перекрывает жёлтый, жёлтый — зелёный.
VERDICT_RANK: Final[dict[str, int]] = {VERDICT_GREEN: 0, VERDICT_YELLOW: 1, VERDICT_RED: 2}


class Answer(TypedDict):
    value: str
    title: str
    verdict: str
    note: str


class Question(TypedDict):
    code: str
    text: str
    options: tuple[Answer, ...]


QUESTIONS: Final[tuple[Question, ...]] = (
    {
        "code": "hair",
        "text": "Який у вас колір волосся в зоні, яку хочете обробити?",
        "options": (
            {"value": "dark", "title": "⚫️ Чорне або темно-каштанове",
             "verdict": VERDICT_GREEN,
             "note": "Темне волосся — найкращий варіант для лазера, результат буде швидким."},
            {"value": "brown", "title": "🟤 Русяве, світло-каштанове",
             "verdict": VERDICT_GREEN,
             "note": "Лазер працює, але сеансів може знадобитися трохи більше."},
            {"value": "red", "title": "🦰 Рудувате",
             "verdict": VERDICT_YELLOW,
             "note": "На рудому волоссі результат частковий — потрібен тестовий спалах."},
            {"value": "light", "title": "👱‍♀️ Світле пушкове або сиве",
             "verdict": VERDICT_RED,
             "note": "У такому волоссі майже немає пігменту, і лазеру нема на що діяти. "
                     "Ми не беремося за роботу, яка не дасть результату."},
        ),
    },
    {
        "code": "skin",
        "text": "Як ваша шкіра реагує на сонце?",
        "options": (
            {"value": "burns", "title": "☀️ Дуже світла, майже не засмагає, обгорає",
             "verdict": VERDICT_GREEN, "note": ""},
            {"value": "medium", "title": "🌤 Засмагає поступово, іноді обгорає",
             "verdict": VERDICT_GREEN, "note": ""},
            {"value": "tans", "title": "🌞 Легко засмагає, майже не обгорає",
             "verdict": VERDICT_GREEN,
             "note": "Працюватимемо на знижених параметрах — це безпечніше для смаглявої шкіри."},
            {"value": "dark", "title": "🟤 Природно смаглява або темна шкіра",
             "verdict": VERDICT_YELLOW,
             "note": "Для темної шкіри потрібен тестовий спалах і особливі налаштування апарата."},
        ),
    },
    {
        "code": "tan",
        "text": "Чи засмагали ви останні 2 тижні — на сонці або в солярії?",
        "options": (
            {"value": "no", "title": "✅ Ні", "verdict": VERDICT_GREEN, "note": ""},
            {"value": "yes", "title": "☀️ Так", "verdict": VERDICT_RED,
             "note": "На свіжій засмазі лазер може дати опік. Потрібно почекати "
                     "щонайменше 2 тижні — це питання безпеки, а не примха."},
            {"value": "self", "title": "🧴 Користувалася автозасмагою",
             "verdict": VERDICT_YELLOW,
             "note": "Автозасмагу треба повністю змити — пігмент на шкірі заважає лазеру."},
        ),
    },
    {
        "code": "meds",
        "text": "Чи приймаєте ви зараз антибіотики, ретиноїди або інші препарати, "
                "що підвищують чутливість до світла?",
        "options": (
            {"value": "no", "title": "✅ Ні", "verdict": VERDICT_GREEN, "note": ""},
            {"value": "yes", "title": "💊 Так", "verdict": VERDICT_RED,
             "note": "Фотосенсибілізуючі препарати різко підвищують ризик опіку. "
                     "Процедуру роблять через 2 тижні після завершення курсу."},
            {"value": "unsure", "title": "🤔 Не впевнена", "verdict": VERDICT_YELLOW,
             "note": "Візьміть із собою назви препаратів — майстер перевірить на консультації."},
        ),
    },
    {
        "code": "pregnancy",
        "text": "Чи є вагітність або період грудного вигодовування?",
        "options": (
            {"value": "no", "title": "✅ Ні", "verdict": VERDICT_GREEN, "note": ""},
            {"value": "yes", "title": "🤰 Так", "verdict": VERDICT_RED,
             "note": "Це протипоказання. Річ не в шкоді для дитини, а в гормональному фоні: "
                     "результат буде непередбачуваним, а курс — витраченим даремно. "
                     "Повертайтеся після завершення лактації."},
        ),
    },
    {
        "code": "skin_issues",
        "text": "Чи є в зоні обробки родимки, запалення, свіжі рани, "
                "варикоз або шкірні захворювання?",
        "options": (
            {"value": "no", "title": "✅ Нічого з переліку", "verdict": VERDICT_GREEN, "note": ""},
            {"value": "moles", "title": "🔘 Є родимки", "verdict": VERDICT_YELLOW,
             "note": "Родимки не обробляють — майстер закриє їх на час сеансу. "
                     "Це не перешкода, просто нюанс роботи."},
            {"value": "issues", "title": "⚠️ Є запалення, рани або шкірне захворювання",
             "verdict": VERDICT_RED,
             "note": "Спершу потрібно вилікувати шкіру. Після одужання — ласкаво просимо."},
        ),
    },
    {
        "code": "experience",
        "text": "Що ви робили з волоссям у цій зоні останні 2 тижні?",
        "options": (
            {"value": "shave", "title": "🪒 Голила станком", "verdict": VERDICT_GREEN,
             "note": ""},
            {"value": "wax", "title": "🍯 Віск або шугаринг", "verdict": VERDICT_YELLOW,
             "note": "Потрібно почекати 2 тижні: лазеру потрібна ціла волосяна цибулина, "
                     "а віск вириває її з коренем."},
            {"value": "laser", "title": "✨ Уже робила лазер в іншому місці",
             "verdict": VERDICT_GREEN,
             "note": "Візьміть на консультацію інформацію, скільки сеансів уже пройдено — "
                     "продовжимо курс, а не почнемо спочатку."},
            {"value": "nothing", "title": "🤷‍♀️ Нічого не робила", "verdict": VERDICT_GREEN,
             "note": "Не забудьте поголити зону станком за 8–12 годин до сеансу."},
        ),
    },
)


def _question_keyboard(index: int):
    options = tuple((option["value"], option["title"]) for option in QUESTIONS[index]["options"])
    return kb.quiz_options_keyboard(options)


async def _show_question(callback: CallbackQuery, state: FSMContext, index: int) -> None:
    question = QUESTIONS[index]
    await state.set_state(QuizSG.running)
    await state.update_data(quiz_index=index)
    await tg.safe_edit(
        callback,
        texts.QUIZ_QUESTION.format(
            number=index + 1, total=len(QUESTIONS), question=question["text"]
        ),
        _question_keyboard(index),
    )


# --------------------------------------------------------------------------- #
# Экраны
# --------------------------------------------------------------------------- #


@router.message(F.text == texts.BTN_QUIZ)
async def open_quiz(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(texts.QUIZ_INTRO, reply_markup=kb.quiz_start_keyboard())


@router.callback_query(F.data.in_({kb.CB_QUIZ_START, kb.CB_QUIZ_RESTART}))
async def start_quiz(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    await state.clear()
    await state.update_data(quiz_answers={}, quiz_index=0)
    await _show_question(callback, state, 0)


@router.callback_query(F.data.startswith(f"{kb.CB_QUIZ_ANSWER}:"))
async def on_answer(callback: CallbackQuery, state: FSMContext) -> None:
    await callback.answer()
    value = callback.data.split(":", 2)[2]

    data = await state.get_data()
    index = int(data.get("quiz_index", 0))
    if index >= len(QUESTIONS):
        await state.clear()
        await tg.safe_edit(callback, texts.QUIZ_INTRO, kb.quiz_start_keyboard())
        return

    question = QUESTIONS[index]
    chosen = next((option for option in question["options"] if option["value"] == value), None)
    if chosen is None:
        await _show_question(callback, state, index)
        return

    answers: dict[str, str] = dict(data.get("quiz_answers", {}))
    answers[question["code"]] = value
    await state.update_data(quiz_answers=answers)

    if index + 1 < len(QUESTIONS):
        await _show_question(callback, state, index + 1)
        return

    await _show_result(callback, state, answers)


async def _show_result(callback: CallbackQuery, state: FSMContext, answers: dict[str, str]) -> None:
    """Свести ответы в вердикт и показать результат с дисклеймером."""
    verdict = VERDICT_GREEN
    notes: list[str] = []

    for question in QUESTIONS:
        value = answers.get(question["code"])
        chosen = next((option for option in question["options"] if option["value"] == value), None)
        if chosen is None:
            continue
        if VERDICT_RANK[chosen["verdict"]] > VERDICT_RANK[verdict]:
            verdict = chosen["verdict"]
        if chosen["note"]:
            notes.append(f"• {chosen['note']}")

    notes_block = ("\n".join(notes) + "\n\n") if notes else ""

    template = {
        VERDICT_GREEN: texts.QUIZ_RESULT_GREEN,
        VERDICT_YELLOW: texts.QUIZ_RESULT_YELLOW,
        VERDICT_RED: texts.QUIZ_RESULT_RED,
    }[verdict]

    await state.clear()
    await queries.save_quiz_result(callback.from_user.id, answers, verdict)

    await tg.safe_edit(
        callback,
        template.format(notes=notes_block) + texts.QUIZ_DISCLAIMER,
        kb.quiz_result_keyboard(verdict),
    )
    logger.info("Тест пройдено: %s -> %s", callback.from_user.id, verdict)
