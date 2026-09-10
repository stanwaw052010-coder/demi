"""
Единственный файл с данными бизнеса.

ВСЁ, что может измениться — цены, зоны, процедуры, акции, FAQ, правила
подготовки и ухода — правится ТОЛЬКО здесь. В хендлерах хардкода нет.

Секреты (токен бота, ID владелицы) сюда не попадают — они в .env.
"""

from __future__ import annotations

import os
from datetime import date, time
from pathlib import Path
from typing import Final, Iterator, TypedDict

from dotenv import load_dotenv

BASE_DIR: Final[Path] = Path(__file__).resolve().parent
ASSETS_DIR: Final[Path] = BASE_DIR / "assets"

# --------------------------------------------------------------------------- #
# Секреты из .env
# --------------------------------------------------------------------------- #

load_dotenv(BASE_DIR / ".env")

BOT_TOKEN: Final[str] = os.getenv("BOT_TOKEN", "").strip()


def _parse_admin_ids(raw: str) -> tuple[int, ...]:
    """«123,456» -> (123, 456). Мусор молча отбрасывается."""
    result: list[int] = []
    for chunk in raw.replace(";", ",").split(","):
        chunk = chunk.strip()
        if chunk.lstrip("-").isdigit():
            result.append(int(chunk))
    return tuple(result)


ADMIN_IDS: Final[tuple[int, ...]] = _parse_admin_ids(os.getenv("ADMIN_IDS", ""))


def check_environment() -> list[str]:
    """Список проблем с .env. Пустой список — всё в порядке."""
    problems: list[str] = []
    if not BOT_TOKEN:
        problems.append("BOT_TOKEN не заполнен. Получите токен у @BotFather и впишите его в .env")
    elif ":" not in BOT_TOKEN:
        problems.append("BOT_TOKEN выглядит некорректно — скопируйте его из @BotFather целиком")
    if not ADMIN_IDS:
        problems.append(
            "ADMIN_IDS не заполнен. Напишите @userinfobot, скопируйте свой Id и впишите его в .env"
        )
    return problems


# --------------------------------------------------------------------------- #
# Пути: где лежат данные, логи и резервные копии
# --------------------------------------------------------------------------- #
# Значения по умолчанию рассчитаны на запуск с ноутбука — всё рядом с кодом,
# ничего настраивать не нужно. На сервере systemd передаёт другие пути через
# окружение, и тогда база живёт отдельно от кода: `git pull` и deploy.sh
# не могут её задеть, а бэкап знает единственное место, где её искать.


def _path_from_env(name: str, default: Path) -> Path:
    raw = os.getenv(name, "").strip()
    return Path(raw).expanduser() if raw else default


DB_PATH: Final[Path] = _path_from_env("DB_PATH", BASE_DIR / "bot.db")
LOG_DIR: Final[Path] = _path_from_env("LOG_DIR", BASE_DIR / "logs")
BACKUP_DIR: Final[Path] = _path_from_env("BACKUP_DIR", BASE_DIR / "backups")

# Пишем ли логи в файл. Локально хватает вывода в консоль; на сервере
# systemd выставляет LOG_TO_FILE=1, и появляется ротация.
LOG_TO_FILE: Final[bool] = os.getenv("LOG_TO_FILE", "").strip().lower() in {"1", "true", "yes"}

LOG_MAX_BYTES: Final[int] = 10 * 1024 * 1024
LOG_BACKUP_COUNT: Final[int] = 5

# --------------------------------------------------------------------------- #
# Эксплуатация: healthcheck, отчёты, бэкапы
# --------------------------------------------------------------------------- #

# Как часто бот отмечается «живой». Внешний скрипт сравнивает эту отметку
# с текущим временем и перезапускает сервис, если бот завис.
HEARTBEAT_INTERVAL_MIN: Final[int] = 60

# Во сколько присылать владелице сводку за сутки.
DAILY_REPORT_HOUR: Final[int] = 21

# День недели и час, когда файл базы уходит админу в Telegram.
# 0 = понедельник. Это бесплатное удалённое хранилище на случай потери сервера.
BACKUP_SEND_WEEKDAY: Final[int] = 0
BACKUP_SEND_HOUR: Final[int] = 5

# Порог свободного места, ниже которого админу уходит предупреждение.
DISK_ALERT_GB: Final[float] = 2.0


# --------------------------------------------------------------------------- #
# Данные студии
# --------------------------------------------------------------------------- #

SALON_NAME: Final[str] = "Profi Time"
SLOGAN: Final[str] = "лазерна епіляція та омолодження"

ADDRESS: Final[str] = "м. Вишгород, пл. Шевченка, 3"
MAP_LINK: Final[str] = "https://www.google.com/maps/search/?api=1&query=Вишгород+площа+Шевченка+3"

PHONE: Final[str] = "+380 93 377 20 58"
PHONE_RAW: Final[str] = "+380933772058"

INSTAGRAM_URL: Final[str] = "https://www.instagram.com/profitime_ka"
INSTAGRAM_LABEL: Final[str] = "@profitime_ka"

# Онлайн-запись. Единственный источник правды по реальному свободному времени.
BOOKON_URL: Final[str] = "https://bookon.ua/s/profitime_ka"

# ⚠️ УТОЧНИТЬ У КЛИЕНТКИ (см. CONTENT_TODO.md, пункт 1).
LASER_MODEL: Final[str] = "діодний лазер з системою охолодження"

CURRENCY: Final[str] = "грн"
TIMEZONE: Final[str] = "Europe/Kyiv"

# Фирменные цвета студии. В Telegram цвет текста задать нельзя, поэтому
# они хранятся для будущих картинок и баннеров, а фирменный стиль в боте
# держится на едином наборе эмодзи и разделителях (см. utils/texts.py).
BRAND_COLORS: Final[dict[str, str]] = {
    "plum": "#5B2C4D",
    "turquoise": "#2E9E8F",
}

# --------------------------------------------------------------------------- #
# График работы
# --------------------------------------------------------------------------- #
# Ключ — день недели по date.weekday(): 0 = понедельник … 6 = воскресенье.
# ⚠️ Полный недельный график уточняется (CONTENT_TODO.md, пункт 3).

WORK_HOURS: Final[dict[int, tuple[time, time] | None]] = {
    0: (time(9, 30), time(19, 0)),
    1: (time(9, 30), time(19, 0)),
    2: (time(9, 30), time(19, 0)),
    3: (time(9, 30), time(19, 0)),
    4: (time(9, 30), time(19, 0)),
    5: (time(9, 30), time(19, 0)),
    6: None,
}


class TimeWindow(TypedDict):
    code: str
    title: str
    hours: str


# Клиент выбирает не точное время, а желаемый промежуток:
# бот не знает реальной занятости, её знает только Bookon.
TIME_WINDOWS: Final[tuple[TimeWindow, ...]] = (
    {"code": "morning", "title": "🌅 Ранок", "hours": "09:30 – 12:00"},
    {"code": "day", "title": "☀️ День", "hours": "12:00 – 16:00"},
    {"code": "evening", "title": "🌇 Вечір", "hours": "16:00 – 19:00"},
)

# --------------------------------------------------------------------------- #
# Правила заявок и напоминаний
# --------------------------------------------------------------------------- #

# На сколько дней вперёд открыт выбор желаемой даты.
BOOKING_HORIZON_DAYS: Final[int] = 21

# Через сколько часов напомнить владелице о необработанной заявке.
PENDING_REMINDER_HOURS: Final[int] = 3

# За сколько часов до подтверждённого визита напомнить клиентке.
VISIT_REMINDER_OFFSETS_H: Final[tuple[int, ...]] = (24, 2)

# Как часто планировщик проверяет, кому пора отправить сообщение (в минутах).
SCHEDULER_INTERVAL_MIN: Final[int] = 10

# Максимум напоминаний о следующем сеансе курса. Дальше — тишина.
COURSE_REMINDER_MAX: Final[int] = 2

# В котором часу отправлять напоминания о следующем сеансе курса.
COURSE_REMINDER_HOUR: Final[int] = 12

# Сколько заявок в статусе pending разрешено одному пользователю.
MAX_PENDING_REQUESTS: Final[int] = 3

# --------------------------------------------------------------------------- #
# Реферальная программа
# --------------------------------------------------------------------------- #

REFERRAL_BONUS: Final[str] = "знижка 15% на перший сеанс"
REFERRAL_BONUS_INVITER: Final[str] = "знижка 10% на наступний сеанс"

# --------------------------------------------------------------------------- #
# ПРАЙС
# --------------------------------------------------------------------------- #
# ⚠️⚠️⚠️ ЦЕНЫ ВРЕМЕННЫЕ, составлены по среднему рынку Киевской области.
# Клиентка пришлёт реальный прайс — заменить здесь (CONTENT_TODO.md, пункт 2).
#
# price          — за один сеанс
# package_price  — за пакет из 5 сеансов (выгоднее, чем 5 отдельных)
# duration       — минут
# sessions       — рекомендованное количество сеансов курса
# interval_days  — интервал между сеансами именно для этой зоны


class Zone(TypedDict):
    code: str
    name: str
    group: str          # "women" | "men"
    price: int
    package_price: int
    duration: int
    sessions: int
    interval_days: int


SERVICES_EPILATION: Final[dict[str, Zone]] = {
    # --- жінки: обличчя та шия ---
    "w_face": {"code": "w_face", "name": "Обличчя повністю", "group": "women",
               "price": 700, "package_price": 2800, "duration": 30, "sessions": 8, "interval_days": 28},
    "w_lip": {"code": "w_lip", "name": "Верхня губа", "group": "women",
              "price": 250, "package_price": 1000, "duration": 10, "sessions": 8, "interval_days": 28},
    "w_chin": {"code": "w_chin", "name": "Підборіддя", "group": "women",
               "price": 300, "package_price": 1200, "duration": 15, "sessions": 8, "interval_days": 28},
    "w_neck": {"code": "w_neck", "name": "Шия", "group": "women",
               "price": 400, "package_price": 1600, "duration": 20, "sessions": 8, "interval_days": 28},
    # --- жінки: руки та тіло ---
    "w_armpits": {"code": "w_armpits", "name": "Пахви", "group": "women",
                  "price": 450, "package_price": 1800, "duration": 15, "sessions": 6, "interval_days": 30},
    "w_arms_full": {"code": "w_arms_full", "name": "Руки повністю", "group": "women",
                    "price": 900, "package_price": 3600, "duration": 40, "sessions": 6, "interval_days": 35},
    "w_arms_half": {"code": "w_arms_half", "name": "Руки до ліктя", "group": "women",
                    "price": 600, "package_price": 2400, "duration": 25, "sessions": 6, "interval_days": 35},
    "w_belly_line": {"code": "w_belly_line", "name": "Лінія живота", "group": "women",
                     "price": 250, "package_price": 1000, "duration": 10, "sessions": 6, "interval_days": 35},
    "w_belly": {"code": "w_belly", "name": "Живіт повністю", "group": "women",
                "price": 600, "package_price": 2400, "duration": 25, "sessions": 6, "interval_days": 35},
    "w_chest": {"code": "w_chest", "name": "Груди (ареоли)", "group": "women",
                "price": 300, "package_price": 1200, "duration": 15, "sessions": 6, "interval_days": 35},
    "w_back": {"code": "w_back", "name": "Спина повністю", "group": "women",
               "price": 900, "package_price": 3600, "duration": 40, "sessions": 6, "interval_days": 42},
    "w_lower_back": {"code": "w_lower_back", "name": "Поперек", "group": "women",
                     "price": 450, "package_price": 1800, "duration": 20, "sessions": 6, "interval_days": 42},
    "w_buttocks": {"code": "w_buttocks", "name": "Сідниці", "group": "women",
                   "price": 600, "package_price": 2400, "duration": 25, "sessions": 6, "interval_days": 42},
    # --- жінки: бікіні та ноги ---
    "w_bikini_classic": {"code": "w_bikini_classic", "name": "Класичне бікіні", "group": "women",
                         "price": 600, "package_price": 2400, "duration": 25, "sessions": 6, "interval_days": 30},
    "w_bikini_deep": {"code": "w_bikini_deep", "name": "Глибоке бікіні", "group": "women",
                      "price": 900, "package_price": 3600, "duration": 35, "sessions": 8, "interval_days": 30},
    "w_legs_full": {"code": "w_legs_full", "name": "Ноги повністю", "group": "women",
                    "price": 1400, "package_price": 5600, "duration": 60, "sessions": 6, "interval_days": 42},
    "w_shins": {"code": "w_shins", "name": "Гомілки", "group": "women",
                "price": 800, "package_price": 3200, "duration": 35, "sessions": 6, "interval_days": 42},
    "w_thighs": {"code": "w_thighs", "name": "Стегна", "group": "women",
                 "price": 900, "package_price": 3600, "duration": 40, "sessions": 6, "interval_days": 42},
}

# ЧОЛОВІЧІ ЗОНИ — тимчасово вимкнено на прохання клієнтки. Розкоментувати за потреби.
#
# Щоб повернути послугу, достатньо перенести ці рядки назад у SERVICES_EPILATION
# (структура повністю сумісна, group="men" вже підтримується zones_by_group).
# Крім конфіга доведеться повернути й точки входу в інтерфейс:
#   • keyboards/client_kb.py — кнопку групи в zone_groups_keyboard(),
#     чоловічі зони в request_zones_keyboard() і calculator_keyboard(),
#     розділ ("men", …) у PRICE_SECTIONS;
#   • handlers/price.py — гілку секції "men";
#   • handlers/info_epilation.py — групу "men" у show_zones();
#   • utils/texts.py — заголовки ZONES_GROUP_MEN і PRICE_HEADER_EPIL_MEN.
#
# "m_back": {"code": "m_back", "name": "Спина повністю", "group": "men",
#            "price": 1200, "package_price": 4800, "duration": 45, "sessions": 6, "interval_days": 42},
# "m_chest": {"code": "m_chest", "name": "Груди", "group": "men",
#             "price": 900, "package_price": 3600, "duration": 35, "sessions": 6, "interval_days": 42},
# "m_belly": {"code": "m_belly", "name": "Живіт", "group": "men",
#             "price": 800, "package_price": 3200, "duration": 30, "sessions": 6, "interval_days": 42},
# "m_armpits": {"code": "m_armpits", "name": "Пахви", "group": "men",
#               "price": 550, "package_price": 2200, "duration": 20, "sessions": 6, "interval_days": 30},
# "m_arms": {"code": "m_arms", "name": "Руки повністю", "group": "men",
#            "price": 1000, "package_price": 4000, "duration": 40, "sessions": 6, "interval_days": 35},
# "m_neck": {"code": "m_neck", "name": "Шия", "group": "men",
#            "price": 500, "package_price": 2000, "duration": 20, "sessions": 8, "interval_days": 28},
# "m_beard_line": {"code": "m_beard_line", "name": "Контур бороди", "group": "men",
#                  "price": 600, "package_price": 2400, "duration": 25, "sessions": 8, "interval_days": 28},
# "m_legs": {"code": "m_legs", "name": "Ноги повністю", "group": "men",
#            "price": 1600, "package_price": 6400, "duration": 60, "sessions": 6, "interval_days": 42},


class Complex(TypedDict):
    code: str
    name: str
    zones: tuple[str, ...]
    price: int
    package_price: int
    duration: int
    sessions: int
    interval_days: int


# Комплексы дешевле, чем те же зоны по отдельности — экономию считает калькулятор.
COMPLEXES: Final[dict[str, Complex]] = {
    "cx_start": {
        "code": "cx_start", "name": "Старт: пахви + класичне бікіні",
        "zones": ("w_armpits", "w_bikini_classic"),
        "price": 850, "package_price": 3400, "duration": 40,
        "sessions": 6, "interval_days": 30,
    },
    "cx_classic": {
        "code": "cx_classic", "name": "Класика: пахви + глибоке бікіні + гомілки",
        "zones": ("w_armpits", "w_bikini_deep", "w_shins"),
        "price": 1800, "package_price": 7200, "duration": 70,
        "sessions": 6, "interval_days": 30,
    },
    "cx_legs": {
        "code": "cx_legs", "name": "Гладкі ніжки: ноги повністю + глибоке бікіні + пахви",
        "zones": ("w_legs_full", "w_bikini_deep", "w_armpits"),
        "price": 2400, "package_price": 9600, "duration": 90,
        "sessions": 6, "interval_days": 30,
    },
    "cx_total": {
        "code": "cx_total", "name": "Максимум: усе тіло",
        "zones": ("w_legs_full", "w_bikini_deep", "w_armpits", "w_arms_full", "w_belly", "w_face"),
        "price": 3600, "package_price": 14400, "duration": 150,
        "sessions": 6, "interval_days": 30,
    },
}


class Rejuvenation(TypedDict):
    code: str
    name: str
    short: str
    price: int
    package_price: int
    duration: int
    sessions: int
    interval_days: int


SERVICES_LASER_REJUV: Final[dict[str, Rejuvenation]] = {
    "r_face": {
        "code": "r_face", "name": "Лазерне омолодження обличчя",
        "short": "Запускає вироблення власного колагену. Шкіра стає щільнішою, "
                 "дрібні зморшки згладжуються, тон вирівнюється.",
        "price": 1800, "package_price": 7200, "duration": 60,
        "sessions": 4, "interval_days": 30,
    },
    "r_face_neck": {
        "code": "r_face_neck", "name": "Омолодження обличчя + шия та декольте",
        "short": "Комплекс для тих, хто хоче однорідний результат без межі "
                 "між доглянутим обличчям і шиєю.",
        "price": 2600, "package_price": 10400, "duration": 90,
        "sessions": 4, "interval_days": 30,
    },
    "r_eyes": {
        "code": "r_eyes", "name": "Зона навколо очей",
        "short": "Делікатна робота з тонкою шкірою: дрібні зморшки, "
                 "втрата тонусу, темні кола.",
        "price": 1200, "package_price": 4800, "duration": 40,
        "sessions": 4, "interval_days": 28,
    },
    "r_acne": {
        "code": "r_acne", "name": "Лікування постакне та рубців",
        "short": "Вирівнює рельєф після висипань, працює з нерівностями "
                 "та застійними плямами.",
        "price": 2000, "package_price": 8000, "duration": 60,
        "sessions": 6, "interval_days": 35,
    },
    "r_pigment": {
        "code": "r_pigment", "name": "Робота з пігментацією",
        "short": "Освітлює пігментні плями та вирівнює загальний тон шкіри.",
        "price": 1600, "package_price": 6400, "duration": 45,
        "sessions": 4, "interval_days": 35,
    },
    "r_pores": {
        "code": "r_pores", "name": "Звуження пор та шліфування",
        "short": "Зменшує розширені пори, згладжує мікрорельєф, "
                 "прибирає жирний блиск.",
        "price": 1500, "package_price": 6000, "duration": 45,
        "sessions": 4, "interval_days": 30,
    },
}

# --------------------------------------------------------------------------- #
# ФОТООМОЛОДЖЕННЯ (IPL)
# --------------------------------------------------------------------------- #
# Це ОКРЕМА технологія, не лазер. IPL — широкосмугове імпульсне світло, воно
# працює по пігменту й судинах у поверхневих шарах. Лазерне омолодження вище
# працює інакше — прогріває глибші шари й запускає синтез колагену.
# Тому дві послуги живуть у різних довідниках і ніде в текстах не змішуються.
#
# Ціна єдина для будь-якої зони. Клієнтка може взяти кілька зон за один візит —
# сума рахується як PHOTO_REJUV_PRICE × кількість обраних зон.
#
# ⚠️ Тривалість, кількість сеансів та інтервал — попередні, за типовим
#    протоколом IPL. Підтвердити в Анни (CONTENT_TODO.md, пункт 12).

# ФОТООМОЛОДЖЕННЯ ВИМКНЕНО: студія цю послугу не надає (Анна, 10.09.2026).
#
# Щоб повернути — поставити True. Більше нічого робити не треба: опис,
# ціна, зони й усі екрани лишилися на місці й піднімуться самі.
# Вимкнено саме перемикачем, а не видаленням, бо послуга вже була
# описана, перевірена й може повернутися.
PHOTO_REJUV_ENABLED: Final[bool] = False

PHOTO_REJUV_PRICE: Final[int] = 700
PHOTO_REJUV_SESSIONS: Final[int] = 5
PHOTO_REJUV_INTERVAL_DAYS: Final[int] = 21

# (код, назва зони, тривалість у хвилинах)
_PHOTO_REJUV_ZONES: Final[tuple[tuple[str, str, int], ...]] = (
    ("r_photo_face", "Обличчя", 30),
    ("r_photo_neck", "Шия", 20),
    ("r_photo_hands", "Руки", 20),
)

_PHOTO_REJUV_SHORT: Final[str] = (
    "IPL-спалах поглинається пігментом і розширеними судинами. "
    "Тон вирівнюється, пігментні плями світлішають, зникає почервоніння "
    "та судинна сіточка."
)

_PHOTO_REJUV_ALL: Final[dict[str, Rejuvenation]] = {
    code: {
        "code": code,
        "name": f"Фотоомолодження — {name.lower()}",
        "short": _PHOTO_REJUV_SHORT,
        "price": PHOTO_REJUV_PRICE,
        "package_price": PHOTO_REJUV_PRICE * 4,
        "duration": duration,
        "sessions": PHOTO_REJUV_SESSIONS,
        "interval_days": PHOTO_REJUV_INTERVAL_DAYS,
    }
    for code, name, duration in _PHOTO_REJUV_ZONES
}

# Порожній довідник, коли послуга вимкнена: усі цикли по ньому нічого
# не малюють, і жоден екран про фотоомолодження не з'являється.
SERVICES_PHOTO_REJUV: Final[dict[str, Rejuvenation]] = (
    _PHOTO_REJUV_ALL if PHOTO_REJUV_ENABLED else {}
)

# Назви зон у тому вигляді, в якому вони йдуть у прайс: «обличчя, шия, руки».
PHOTO_REJUV_ZONE_NAMES: Final[str] = ", ".join(
    name.lower() for _, name, _ in _PHOTO_REJUV_ZONES
)

# Спільний довідник омолодження — лазер плюс IPL. Потрібен там, де послугу
# треба просто знайти за кодом: калькулятор, заявки, трекер курсу, повний прайс.
SERVICES_REJUVENATION: Final[dict[str, Rejuvenation]] = {
    **SERVICES_LASER_REJUV,
    **SERVICES_PHOTO_REJUV,
}

# --------------------------------------------------------------------------- #
# Акции
# --------------------------------------------------------------------------- #
# Стартовые акции. Владелица может добавить свои прямо из бота — они лягут
# в базу. Просроченные скрываются автоматически по valid_until.
# ⚠️ Заменить на реальные (CONTENT_TODO.md, пункт 5).


class Promotion(TypedDict):
    code: str
    title: str
    description: str
    old_price: int | None
    new_price: int | None
    valid_until: str        # YYYY-MM-DD


PROMOTIONS: Final[tuple[Promotion, ...]] = (
    {
        "code": "p_first",
        "title": "Перший сеанс — вигідніше",
        "description": "Знайомство з лазером: перший сеанс будь-якої зони зі знижкою 30%. "
                       "Спробуйте, як це відчувається, перш ніж брати курс.",
        "old_price": None,
        "new_price": None,
        "valid_until": "2026-12-31",
    },
    {
        "code": "p_classic",
        "title": "Комплекс «Класика» за ціною двох зон",
        "description": "Пахви + глибоке бікіні + гомілки. Три зони за один візит — "
                       "і економія проти окремих сеансів.",
        "old_price": 2150,
        "new_price": 1800,
        "valid_until": "2026-12-31",
    },
    {
        "code": "p_package",
        "title": "Пакет 5 сеансів",
        "description": "Оплачуєте курс одразу — отримуєте ціну нижчу, ніж за 5 окремих "
                       "сеансів, і фіксуєте вартість на весь курс.",
        "old_price": None,
        "new_price": None,
        "valid_until": "2026-12-31",
    },
)

# --------------------------------------------------------------------------- #
# Противопоказания, подготовка, уход
# --------------------------------------------------------------------------- #

CONTRAINDICATIONS: Final[dict[str, tuple[str, ...]]] = {
    "epilation": (
        "вагітність та період лактації",
        "онкологічні захворювання",
        "цукровий діабет у стадії декомпенсації",
        "епілепсія",
        "гострі інфекційні захворювання, підвищена температура",
        "загострення хронічних шкірних захворювань у зоні обробки "
        "(псоріаз, екзема, дерматит)",
        "герпес у стадії загострення",
        "свіжа засмага — менше ніж 2 тижні тому",
        "прийом фотосенсибілізуючих препаратів "
        "(деякі антибіотики, ретиноїди, звіробій)",
        "варикозне розширення вен у зоні обробки, тромбофлебіт",
        "родимки та новоутворення безпосередньо в зоні обробки",
        "порушення цілісності шкіри: рани, опіки, свіжі шви",
        "імплантати та золоті нитки в зоні обробки",
    ),
    "rejuvenation": (
        "вагітність та період лактації",
        "онкологічні захворювання",
        "цукровий діабет у стадії декомпенсації",
        "епілепсія",
        "гострі запальні процеси на шкірі обличчя",
        "герпес у стадії загострення",
        "свіжа засмага — менше ніж 2 тижні тому",
        "прийом ретиноїдів (роакутан) — потрібна перерва щонайменше 6 місяців",
        "схильність до утворення келоїдних рубців",
        "нещодавні ін'єкційні процедури — потрібна пауза 2 тижні",
        "аутоімунні захворювання у стадії загострення",
    ),
}

PREP_RULES: Final[dict[str, tuple[str, ...]]] = {
    "weeks_2": (
        "Не засмагайте — ні на сонці, ні в солярії. Шкіра має бути свого природного тону.",
        "Не використовуйте автозасмагу та засоби з ефектом бронзатора.",
        "Відмовтеся від воску, шугарингу та пінцета. Лазеру потрібна ціла "
        "волосяна цибулина — інакше сеанс просто не спрацює.",
        "Якщо приймаєте антибіотики — попередьте майстра, деякі підвищують "
        "чутливість до світла.",
    ),
    "days_3": (
        "Не робіть пілінги та скраби в зоні обробки.",
        "Не наносьте кислоти та ретиноїди на цю ділянку.",
        "Не відвідуйте сауну та лазню.",
    ),
    "day_of": (
        "Поголіть зону станком за 8–12 годин до сеансу — так лазер працює "
        "по цибулині, а не по видимій частині волоска.",
        "Прийдіть з чистою сухою шкірою: без кремів, олій, дезодорантів і макіяжу "
        "в зоні обробки.",
        "Одягніть вільний одяг з натуральної тканини — після сеансу шкіра "
        "буде чутливою.",
    ),
}

AFTERCARE_RULES: Final[dict[str, tuple[str, ...]]] = {
    "first_24h": (
        "Легке почервоніння та відчуття тепла — нормальна реакція, минає за кілька годин.",
        "Не приймайте гарячий душ, не відвідуйте сауну, лазню та басейн.",
        "Не займайтеся спортом — піт подразнює розігріту шкіру.",
        "Не наносьте дезодорант, парфуми та спиртові засоби на зону обробки.",
        "За потреби нанесіть пантенол або засіб, який порекомендував майстер.",
    ),
    "first_week": (
        "Уникайте прямого сонця, користуйтеся SPF 30+ на відкритих ділянках.",
        "Не засмагайте та не відвідуйте солярій.",
        "Не робіть пілінги та скраби в зоні обробки.",
        "Волоски починають випадати на 7–14 день — це не новий ріст, "
        "а вихід оброблених. Не висмикуйте їх, дайте вийти самим.",
        "Голити зону між сеансами можна і потрібно — станком, не воском.",
    ),
}

# --------------------------------------------------------------------------- #
# FAQ
# --------------------------------------------------------------------------- #


class FaqItem(TypedDict):
    code: str
    question: str
    answer: str


FAQ: Final[tuple[FaqItem, ...]] = (
    {"code": "f_duration", "question": "Скільки триває сеанс?",
     "answer": "Залежить від зони. Верхня губа — близько 10 хвилин, пахви — 15, "
               "глибоке бікіні — 35, ноги повністю — до години. Точну тривалість "
               "кожної зони видно в її картці."},
    {"code": "f_summer", "question": "Чи можна робити влітку?",
     "answer": "Можна, якщо ви не засмагали останні 2 тижні й готові користуватися SPF. "
               "Влітку зручно робити закриті зони — бікіні, пахви. Для відкритих "
               "ділянок комфортніше осінь і зима: менше сонця, менше обмежень."},
    {"code": "f_pregnant", "question": "Чи можна вагітним?",
     "answer": "Ні. Вагітність і період лактації — протипоказання. Не тому, що лазер "
               "шкідливий для дитини, а тому що гормональний фон у цей період "
               "нестабільний: результат буде непередбачуваним, а гроші й час — "
               "витраченими даремно. Краще повернутися після завершення лактації."},
    {"code": "f_tan", "question": "А якщо я засмагла?",
     "answer": "Потрібно почекати щонайменше 2 тижні після засмаги. На засмаглій шкірі "
               "лазер працює агресивніше й може дати опік: меланін у шкірі забирає "
               "енергію на себе. Це не примха, а безпека."},
    {"code": "f_regrow", "question": "Чи виросте волосся назад?",
     "answer": "Оброблена цибулина не відновлюється — ці волоски не повернуться. "
               "Але з часом організм може активувати «сплячі» фолікули, особливо "
               "при гормональних змінах. Тому раз на рік-півтора роблять один "
               "підтримуючий сеанс — цього достатньо."},
    {"code": "f_tweezers", "question": "Чому не можна висмикувати волоски перед сеансом?",
     "answer": "Лазер бачить не волосок, а пігмент у його цибулині. Якщо ви вирвали "
               "волосок з коренем, цибулина порожня — променю нема за що зачепитися, "
               "і сеанс для цієї зони пройде даремно. Тому за 2 тижні до візиту — "
               "тільки станок."},
    {"code": "f_shave", "question": "Як правильно поголитися перед процедурою?",
     "answer": "Звичайним станком за 8–12 годин до сеансу, по напрямку росту волосся, "
               "на розпарену шкіру. Не напередодні тижня, не за годину — саме "
               "напередодні ввечері або зранку в день візиту."},
    {"code": "f_result_when", "question": "Коли буде видно результат?",
     "answer": "Перше випадіння почнеться на 7–14 день після першого сеансу. "
               "Помітне порідіння — після 2–3 сеансу. Стійкий результат — "
               "після повного курсу."},
    {"code": "f_pain", "question": "Чи боляче?",
     "answer": "Відчуття схоже на короткий гарячий доторк або клацання гумкою. "
               "Апарат має систему охолодження, тому терпимо навіть у чутливих зонах. "
               "Більшість клієнток порівнює з шугарингом не на користь останнього."},
    {"code": "f_grey", "question": "Чи бере лазер світле та сиве волосся?",
     "answer": "Ні. Лазер працює по меланіну — темному пігменту. Сиве волосся "
               "пігменту не має взагалі, світле пушкове має його надто мало. "
               "Чесно: на таких волосках результату не буде, і ми про це "
               "попереджаємо до оплати, а не після."},
    {"code": "f_interval", "question": "Чому не можна прийти раніше за інтервал?",
     "answer": "Лазер діє тільки на волоски в активній фазі росту — це приблизно "
               "20% від усіх одночасно. Решта в цей момент «спить». Інтервал "
               "потрібен, щоб наступна порція встигла прокинутися. Прийти раніше — "
               "означає обробити порожню шкіру."},
    {"code": "f_hormones", "question": "Гормональний збій впливає на результат?",
     "answer": "Так. При СПКЯ, проблемах зі щитоподібною залозою чи прийомі "
               "гормональних препаратів волосся може відростати активніше. "
               "Курс усе одно працює, але сеансів може знадобитися більше. "
               "Скажіть про це майстру на консультації."},
    {"code": "f_makeup", "question": "Чи можна фарбувати обличчя після омолодження?",
     "answer": "Перші 24 години — ні. Далі можна, але краще мінеральна косметика "
               "й обов'язково SPF. Повна реабілітація займає 3–5 днів."},
    {"code": "f_how_many", "question": "Скільки коштує весь курс?",
     "answer": "Залежить від зон. Найшвидше порахувати в боті: розділ "
               "«🧮 Розрахувати вартість курсу» — оберіть зони й побачите суму "
               "за сеанс, за курс і скільки економите на пакеті."},
)

# --------------------------------------------------------------------------- #
# Причины отказа (для владелицы)
# --------------------------------------------------------------------------- #

DECLINE_REASONS: Final[tuple[tuple[str, str], ...]] = (
    ("busy", "На цю дату вже все зайнято"),
    ("dayoff", "У цей день студія не працює"),
    ("contra", "Є протипоказання — потрібна консультація"),
    ("noanswer", "Не вдалося зв'язатися з клієнтом"),
    ("other", "Інша причина (введу свою)"),
)


# --------------------------------------------------------------------------- #
# Хелперы доступа к конфигу
# --------------------------------------------------------------------------- #


def get_zone(code: str) -> Zone | None:
    return SERVICES_EPILATION.get(code)


def get_complex(code: str) -> Complex | None:
    return COMPLEXES.get(code)


def get_rejuvenation(code: str) -> Rejuvenation | None:
    return SERVICES_REJUVENATION.get(code)


def zones_by_group(group: str) -> list[Zone]:
    return [zone for zone in SERVICES_EPILATION.values() if zone["group"] == group]


def epilation_zones() -> list[Zone]:
    """Усі активні зони епіляції. Зараз це лише жіночі — чоловічі вимкнено."""
    return list(SERVICES_EPILATION.values())


def is_photo_rejuvenation(code: str) -> bool:
    """Чи це зона фотоомолодження (IPL), а не лазерна процедура."""
    return code in SERVICES_PHOTO_REJUV


def get_any_service(code: str) -> Zone | Complex | Rejuvenation | None:
    """Услуга по коду в любом из трёх справочников."""
    return SERVICES_EPILATION.get(code) or COMPLEXES.get(code) or SERVICES_REJUVENATION.get(code)


def iter_all_services() -> Iterator[Zone | Complex | Rejuvenation]:
    yield from SERVICES_EPILATION.values()
    yield from COMPLEXES.values()
    yield from SERVICES_REJUVENATION.values()


def get_time_window(code: str) -> TimeWindow | None:
    for window in TIME_WINDOWS:
        if window["code"] == code:
            return window
    return None


def get_faq_item(code: str) -> FaqItem | None:
    for item in FAQ:
        if item["code"] == code:
            return item
    return None


def get_work_hours(day: date) -> tuple[time, time] | None:
    return WORK_HOURS.get(day.weekday())


def is_working_day(day: date) -> bool:
    return get_work_hours(day) is not None


def decline_reason_title(code: str) -> str:
    for reason_code, title in DECLINE_REASONS:
        if reason_code == code:
            return title
    return code


def logo_path() -> Path | None:
    """Путь к логотипу, если файл на месте. Иначе None — бот работает без него."""
    path = ASSETS_DIR / "logo.png"
    return path if path.is_file() else None


def price_image_path() -> Path | None:
    """Путь к картинке прайса, если она есть."""
    for name in ("price.jpg", "price.png"):
        path = ASSETS_DIR / name
        if path.is_file():
            return path
    return None
