"""
Единственный файл с настройками салона.

ВАЖНО: все цены, услуги, длительности и рабочие часы правятся ТОЛЬКО здесь.
В хендлерах и клавиатурах хардкода быть не должно.

Секреты (токен бота, ID мастера) сюда не попадают — они живут в .env.
"""

from __future__ import annotations

import os
from datetime import date, time
from pathlib import Path
from typing import Final, Iterator, TypedDict

from dotenv import load_dotenv

BASE_DIR: Final[Path] = Path(__file__).resolve().parent

# --------------------------------------------------------------------------- #
# Секреты из .env (в коде их нет и быть не должно)
# --------------------------------------------------------------------------- #

load_dotenv(BASE_DIR / ".env")

BOT_TOKEN: Final[str] = os.getenv("BOT_TOKEN", "").strip()

_admin_raw: str = os.getenv("ADMIN_ID", "").strip()
ADMIN_ID: Final[int] = int(_admin_raw) if _admin_raw.lstrip("-").isdigit() else 0


def check_environment() -> list[str]:
    """Список проблем с .env. Пустой список — всё в порядке."""
    problems: list[str] = []
    if not BOT_TOKEN:
        problems.append(
            "BOT_TOKEN не заполнен. Получите токен у @BotFather и впишите его в файл .env"
        )
    elif ":" not in BOT_TOKEN:
        problems.append("BOT_TOKEN выглядит некорректно — скопируйте его из @BotFather целиком")
    if ADMIN_ID <= 0:
        problems.append(
            "ADMIN_ID не заполнен. Напишите @userinfobot, скопируйте свой ID и впишите его в .env"
        )
    return problems


# --------------------------------------------------------------------------- #
# Данные салона
# --------------------------------------------------------------------------- #

SALON_NAME: Final[str] = "PROFITIME"
SALON_SUBTITLE: Final[str] = "МАНІКЮР | ПЕДИКЮР | ПОДОЛОГ"
MASTER_NAME: Final[str] = "Анна"

# Телефон в человекочитаемом виде и в виде для ссылки tel:
PHONE: Final[str] = "+380 (98) 104 74 54"
PHONE_RAW: Final[str] = "+380981047454"

INSTAGRAM_URL: Final[str] = "https://www.instagram.com/profitime_ka"
INSTAGRAM_LABEL: Final[str] = "@profitime_ka"

# Адрес показывается в разделе «Контакти». Пустая строка — блок не выводится.
ADDRESS: Final[str] = ""

CURRENCY: Final[str] = "грн"
TIMEZONE: Final[str] = "Europe/Kyiv"

# --------------------------------------------------------------------------- #
# Правила записи
# --------------------------------------------------------------------------- #

# Шаг сетки времени в минутах. Слоты строятся кратно этому значению.
SLOT_STEP_MIN: Final[int] = 30

# На сколько дней вперёд открыта запись (включая сегодня).
BOOKING_HORIZON_DAYS: Final[int] = 14

# Сколько активных (будущих) записей разрешено одному пользователю.
MAX_ACTIVE_BOOKINGS: Final[int] = 2

# Минимальный запас времени до визита: нельзя записаться «через 5 минут».
MIN_LEAD_TIME_MIN: Final[int] = 60

# За сколько часов до визита отправлять напоминания.
REMINDER_OFFSETS_H: Final[tuple[int, ...]] = (24, 2)

# Как часто планировщик проверяет, кому пора отправить напоминание (в минутах).
REMINDER_CHECK_INTERVAL_MIN: Final[int] = 5

# --------------------------------------------------------------------------- #
# Рабочий график
# --------------------------------------------------------------------------- #
# Ключ — день недели по правилам date.weekday(): 0 = понедельник … 6 = воскресенье.
# Значение — кортеж (начало смены, конец смены) либо None для выходного дня.

WORK_SCHEDULE: Final[dict[int, tuple[time, time] | None]] = {
    0: (time(9, 0), time(19, 0)),   # понеділок
    1: (time(9, 0), time(19, 0)),   # вівторок
    2: (time(9, 0), time(19, 0)),   # середа
    3: (time(9, 0), time(19, 0)),   # четвер
    4: (time(9, 0), time(19, 0)),   # п'ятниця
    5: (time(9, 0), time(19, 0)),   # субота
    6: None,                        # неділя — вихідний
}

# --------------------------------------------------------------------------- #
# Прайс
# --------------------------------------------------------------------------- #


class Service(TypedDict):
    """Одна позиция прайса."""

    code: str       # короткий уникальный код, уезжает в callback_data
    name: str       # название на украинском — показывается клиентке
    price: int      # цена в гривнах
    duration: int   # длительность в минутах, кратно SLOT_STEP_MIN


class Category(TypedDict):
    """Категория услуг (направление)."""

    code: str
    title: str
    emoji: str
    services: list[Service]


SERVICES: Final[dict[str, Category]] = {
    "man": {
        "code": "man",
        "title": "Манікюр",
        "emoji": "💅",
        "services": [
            {"code": "m1", "name": "Комбінований манікюр (без покриття)", "price": 350, "duration": 60},
            {"code": "m2", "name": "Манікюр + покриття гель-лаком", "price": 650, "duration": 90},
            {"code": "m3", "name": "Покриття гель-лаком (без манікюру)", "price": 350, "duration": 60},
            {"code": "m4", "name": "Зміцнення нігтів базою", "price": 750, "duration": 90},
            {"code": "m5", "name": "Французький манікюр (френч)", "price": 750, "duration": 90},
            {"code": "m6", "name": "Зняття покриття", "price": 150, "duration": 30},
            {"code": "m7", "name": "Корекція форми + ремонт нігтя", "price": 200, "duration": 30},
        ],
    },
    "ped": {
        "code": "ped",
        "title": "Педикюр",
        "emoji": "🦶",
        "services": [
            {"code": "p1", "name": "Апаратний педикюр (без покриття)", "price": 600, "duration": 90},
            {"code": "p2", "name": "Апаратний педикюр + гель-лак", "price": 850, "duration": 120},
            {"code": "p3", "name": "Комбінований педикюр", "price": 650, "duration": 90},
            {"code": "p4", "name": "Педикюр «пальчики» (без стопи)", "price": 450, "duration": 60},
            {"code": "p5", "name": "Зняття покриття зі стоп", "price": 150, "duration": 30},
        ],
    },
    "pod": {
        "code": "pod",
        "title": "Подологія",
        "emoji": "🩺",
        "services": [
            {"code": "d1", "name": "Консультація подолога", "price": 300, "duration": 30},
            {"code": "d2", "name": "Обробка врослого нігтя", "price": 500, "duration": 60},
            {"code": "d3", "name": "Корекція врослого нігтя (тампонада)", "price": 700, "duration": 60},
            {"code": "d4", "name": "Встановлення титанової нитки / скоби", "price": 900, "duration": 90},
            {"code": "d5", "name": "Лікування тріщин на п'ятах", "price": 600, "duration": 60},
            {"code": "d6", "name": "Обробка натоптишів та мозолів", "price": 450, "duration": 60},
            {"code": "d7", "name": "Обробка стрижневої мозолі", "price": 550, "duration": 60},
            {"code": "d8", "name": "Протезування нігтя", "price": 800, "duration": 90},
        ],
    },
}


# --------------------------------------------------------------------------- #
# Хелперы доступа к конфигу
# --------------------------------------------------------------------------- #


def get_category(code: str) -> Category | None:
    """Категория по коду или None, если код неизвестен."""
    return SERVICES.get(code)


def iter_services() -> Iterator[tuple[Category, Service]]:
    """Проход по всему прайсу парами (категория, услуга)."""
    for category in SERVICES.values():
        for service in category["services"]:
            yield category, service


def get_service(code: str) -> tuple[Category, Service] | None:
    """Услуга по коду вместе с её категорией. None — если код неизвестен."""
    for category, service in iter_services():
        if service["code"] == code:
            return category, service
    return None


def get_work_hours(day: date) -> tuple[time, time] | None:
    """Рабочие часы конкретной даты. None — выходной."""
    return WORK_SCHEDULE.get(day.weekday())


def is_working_day(day: date) -> bool:
    """True, если в этот день салон работает."""
    return get_work_hours(day) is not None
