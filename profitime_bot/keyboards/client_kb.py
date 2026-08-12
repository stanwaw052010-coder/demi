"""Клавиатуры клиентской части."""

from __future__ import annotations

from urllib.parse import quote

from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder

import config
from utils import texts

# Префиксы callback_data. Держим короткими: лимит Telegram — 64 байта.
CB_MENU = "menu"
CB_BOOKON = "bookon"

CB_EPIL = "ep"                  # ep:<screen>
CB_EPIL_ZONES = "ep:zones"
CB_REJUV = "rj"                 # rj:<screen>

CB_SERVICE = "svc"              # svc:<code>
CB_ZONE_GROUP = "zg"            # zg:women | zg:men | zg:complex

CB_REQ_START = "req:start"      # req:start:<code|->
CB_REQ_DIR = "req:dir"          # req:dir:<direction>
CB_REQ_ITEM = "req:item"        # req:item:<code>
CB_REQ_ITEMS_OK = "req:items"
CB_REQ_WINDOW = "req:win"       # req:win:<code>
CB_REQ_SEND = "req:send"
CB_REQ_BACK = "req:back"        # req:back:<step>
CB_REQ_CANCEL = "req:cancel"
CB_REQ_SKIP = "req:skip"
CB_REQ_CONTACTS_OK = "req:cok"
CB_REQ_CONTACTS_EDIT = "req:cedit"

CB_CALC_ITEM = "calc:item"      # calc:item:<code>
CB_CALC_GROUP = "calc:grp"      # calc:grp:<group>
CB_CALC_RESULT = "calc:result"
CB_CALC_RESET = "calc:reset"
CB_CALC_TO_REQUEST = "calc:req"

CB_QUIZ_START = "quiz:start"
CB_QUIZ_ANSWER = "quiz:a"       # quiz:a:<value>
CB_QUIZ_RESTART = "quiz:restart"

CB_PRICE = "price"              # price:<section>
CB_FAQ = "faq"                  # faq:<code>
CB_HOW = "how"

CB_COURSE = "course"
CB_REFERRAL = "ref"
CB_SETTINGS = "settings"
CB_PROMO_TOGGLE = "settings:promo"

CB_CLIENT_ACCEPT = "cl:ok"      # cl:ok:<request_id>
CB_CLIENT_REJECT = "cl:no"      # cl:no:<request_id>


# --------------------------------------------------------------------------- #
# Главное меню
# --------------------------------------------------------------------------- #


def main_menu() -> ReplyKeyboardMarkup:
    """Постоянное меню под полем ввода."""
    builder = ReplyKeyboardBuilder()
    builder.add(
        KeyboardButton(text=texts.BTN_BOOKON),
        KeyboardButton(text=texts.BTN_EPILATION),
        KeyboardButton(text=texts.BTN_REJUVENATION),
        KeyboardButton(text=texts.BTN_CALCULATOR),
        KeyboardButton(text=texts.BTN_QUIZ),
        KeyboardButton(text=texts.BTN_PRICE),
        KeyboardButton(text=texts.BTN_PROMOTIONS),
        KeyboardButton(text=texts.BTN_COURSE),
        KeyboardButton(text=texts.BTN_HOW),
        KeyboardButton(text=texts.BTN_CONTACTS),
    )
    builder.adjust(1, 2, 2, 2, 2, 1)
    return builder.as_markup(resize_keyboard=True, input_field_placeholder=texts.MENU_PROMPT)


def bookon_button() -> InlineKeyboardButton:
    """Кнопка онлайн-записи. Присутствует во всех ключевых точках."""
    return InlineKeyboardButton(text=texts.BTN_BOOK_ONLINE, url=config.BOOKON_URL)


def bookon_keyboard(*, with_request: bool = True, service_code: str | None = None) -> InlineKeyboardMarkup:
    """Экран перед переходом на Bookon."""
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    if with_request:
        builder.row(
            InlineKeyboardButton(
                text=texts.BTN_LEAVE_REQUEST,
                callback_data=f"{CB_REQ_START}:{service_code or '-'}",
            )
        )
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


# --------------------------------------------------------------------------- #
# Информационные разделы
# --------------------------------------------------------------------------- #

EPILATION_SCREENS: tuple[tuple[str, str], ...] = (
    ("what", "Що це і як діє"),
    ("device", "На чому працюємо"),
    ("sessions", "Скільки потрібно сеансів"),
    ("intervals", "Інтервал між сеансами"),
    ("pain", "Чи боляче"),
    ("suitable", "Кому підходить"),
    ("contra", "Протипоказання"),
    ("prep", "Підготовка"),
    ("after", "Догляд після"),
    ("result", "Який буде результат"),
    ("myths", "Міфи"),
)

REJUVENATION_SCREENS: tuple[tuple[str, str], ...] = (
    ("what", "Що це і як працює"),
    ("problems", "З чим працює"),
    ("types", "Види процедур"),
    ("sessions", "Сеанси, інтервал, сезонність"),
    ("rehab", "Реабілітація"),
    ("contra", "Протипоказання"),
    ("result", "Результат по сеансах"),
)


def epilation_menu() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for code, title in EPILATION_SCREENS:
        builder.row(InlineKeyboardButton(text=title, callback_data=f"{CB_EPIL}:{code}"))
    builder.row(InlineKeyboardButton(text=f"{texts.E_PRICE} Зони та ціни", callback_data=CB_EPIL_ZONES))
    builder.row(bookon_button())
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def rejuvenation_menu() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for code, title in REJUVENATION_SCREENS:
        builder.row(InlineKeyboardButton(text=title, callback_data=f"{CB_REJUV}:{code}"))
    builder.row(bookon_button())
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def info_screen_keyboard(back_callback: str) -> InlineKeyboardMarkup:
    """Экран информации: назад в раздел + запись."""
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=back_callback),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


# --------------------------------------------------------------------------- #
# Зоны и услуги
# --------------------------------------------------------------------------- #


def zone_groups_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.ZONES_GROUP_WOMEN, callback_data=f"{CB_ZONE_GROUP}:women"))
    builder.row(InlineKeyboardButton(text=texts.ZONES_GROUP_MEN, callback_data=f"{CB_ZONE_GROUP}:men"))
    builder.row(InlineKeyboardButton(text=texts.ZONES_COMPLEXES, callback_data=f"{CB_ZONE_GROUP}:complex"))
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_EPIL}:menu"),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def zones_keyboard(group: str) -> InlineKeyboardMarkup:
    """Список зон одной группы. Цена в кнопке — чтобы не открывать каждую."""
    builder = InlineKeyboardBuilder()

    if group == "complex":
        services: list[dict] = list(config.COMPLEXES.values())
    else:
        services = config.zones_by_group(group)

    for service in services:
        builder.row(
            InlineKeyboardButton(
                text=f"{service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_SERVICE}:{service['code']}",
            )
        )
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=CB_EPIL_ZONES),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def rejuvenation_types_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for service in config.SERVICES_REJUVENATION.values():
        builder.row(
            InlineKeyboardButton(
                text=f"{service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_SERVICE}:{service['code']}",
            )
        )
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_REJUV}:menu"),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def service_card_keyboard(code: str, back_callback: str) -> InlineKeyboardMarkup:
    """Карточка услуги: онлайн-запись, заявка, назад."""
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(
            text=texts.BTN_LEAVE_REQUEST, callback_data=f"{CB_REQ_START}:{code}"
        )
    )
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=back_callback),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


# --------------------------------------------------------------------------- #
# Заявка
# --------------------------------------------------------------------------- #


def _request_nav(builder: InlineKeyboardBuilder, back_step: str | None) -> None:
    buttons = []
    if back_step:
        buttons.append(InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_REQ_BACK}:{back_step}"))
    buttons.append(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_REQ_CANCEL))
    builder.row(*buttons)


def request_direction_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_EPILATION, callback_data=f"{CB_REQ_DIR}:epil"))
    builder.row(InlineKeyboardButton(text=texts.BTN_REJUVENATION, callback_data=f"{CB_REQ_DIR}:rejuv"))
    builder.row(InlineKeyboardButton(text="💬 Консультація", callback_data=f"{CB_REQ_DIR}:consult"))
    _request_nav(builder, None)
    return builder.as_markup()


def request_zones_keyboard(selected: list[str]) -> InlineKeyboardMarkup:
    """Мультивыбор зон: выбранные отмечены галочкой, тап переключает."""
    builder = InlineKeyboardBuilder()

    for service in config.zones_by_group("women"):
        mark = "✅ " if service["code"] in selected else ""
        builder.row(
            InlineKeyboardButton(
                text=f"{mark}{service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_REQ_ITEM}:{service['code']}",
            )
        )
    for service in config.COMPLEXES.values():
        mark = "✅ " if service["code"] in selected else ""
        builder.row(
            InlineKeyboardButton(
                text=f"{mark}🎯 {service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_REQ_ITEM}:{service['code']}",
            )
        )
    for service in config.zones_by_group("men"):
        mark = "✅ " if service["code"] in selected else ""
        builder.row(
            InlineKeyboardButton(
                text=f"{mark}👨 {service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_REQ_ITEM}:{service['code']}",
            )
        )

    if selected:
        builder.row(
            InlineKeyboardButton(text=f"{texts.BTN_DONE} ({len(selected)})", callback_data=CB_REQ_ITEMS_OK)
        )
    _request_nav(builder, "direction")
    return builder.as_markup()


def request_rejuvenation_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for service in config.SERVICES_REJUVENATION.values():
        builder.row(
            InlineKeyboardButton(
                text=f"{service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_REQ_ITEM}:{service['code']}",
            )
        )
    _request_nav(builder, "direction")
    return builder.as_markup()


def request_window_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for window in config.TIME_WINDOWS:
        builder.row(
            InlineKeyboardButton(
                text=f"{window['title']}  {window['hours']}",
                callback_data=f"{CB_REQ_WINDOW}:{window['code']}",
            )
        )
    _request_nav(builder, "date")
    return builder.as_markup()


def request_name_keyboard() -> InlineKeyboardMarkup:
    """Навигация на шаге ввода имени."""
    builder = InlineKeyboardBuilder()
    _request_nav(builder, "date")
    return builder.as_markup()


def request_saved_contacts_keyboard() -> InlineKeyboardMarkup:
    """Повторный клиент: подтвердить сохранённые имя и телефон одной кнопкой."""
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text="✅ Так, все вірно", callback_data=CB_REQ_CONTACTS_OK))
    builder.row(InlineKeyboardButton(text="✏️ Змінити", callback_data=CB_REQ_CONTACTS_EDIT))
    _request_nav(builder, "date")
    return builder.as_markup()


def request_comment_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_SKIP, callback_data=CB_REQ_SKIP))
    _request_nav(builder, "phone")
    return builder.as_markup()


def request_confirm_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_SEND_REQUEST, callback_data=CB_REQ_SEND))
    _request_nav(builder, "comment")
    return builder.as_markup()


def request_phone_keyboard() -> ReplyKeyboardMarkup:
    builder = ReplyKeyboardBuilder()
    builder.add(KeyboardButton(text=texts.BTN_SHARE_PHONE, request_contact=True))
    builder.add(KeyboardButton(text=texts.BTN_CANCEL))
    builder.adjust(1, 1)
    return builder.as_markup(resize_keyboard=True)


def request_sent_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def client_reschedule_keyboard(request_id: int) -> InlineKeyboardMarkup:
    """Ответ клиента на предложенное владелицей время."""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="✅ Підходить", callback_data=f"{CB_CLIENT_ACCEPT}:{request_id}")
    )
    builder.row(
        InlineKeyboardButton(
            text="📞 Не підходить, зв'яжіться зі мною",
            callback_data=f"{CB_CLIENT_REJECT}:{request_id}",
        )
    )
    return builder.as_markup()


# --------------------------------------------------------------------------- #
# Калькулятор
# --------------------------------------------------------------------------- #


def calculator_keyboard(selected: list[str]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for service in config.zones_by_group("women"):
        mark = "✅ " if service["code"] in selected else ""
        builder.row(
            InlineKeyboardButton(
                text=f"{mark}{service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_CALC_ITEM}:{service['code']}",
            )
        )
    for service in config.zones_by_group("men"):
        mark = "✅ " if service["code"] in selected else ""
        builder.row(
            InlineKeyboardButton(
                text=f"{mark}👨 {service['name']} · {service['price']} {config.CURRENCY}",
                callback_data=f"{CB_CALC_ITEM}:{service['code']}",
            )
        )

    if selected:
        builder.row(
            InlineKeyboardButton(text="🧮 Порахувати", callback_data=CB_CALC_RESULT),
            InlineKeyboardButton(text="🔄 Скинути", callback_data=CB_CALC_RESET),
        )
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def calculator_result_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_LEAVE_REQUEST, callback_data=CB_CALC_TO_REQUEST)
    )
    builder.row(
        InlineKeyboardButton(text="🔄 Порахувати ще раз", callback_data=CB_CALC_RESET),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


# --------------------------------------------------------------------------- #
# Тест
# --------------------------------------------------------------------------- #


def quiz_start_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text="▶️ Почати тест", callback_data=CB_QUIZ_START))
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def quiz_options_keyboard(options: tuple[tuple[str, str], ...]) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for value, title in options:
        builder.row(InlineKeyboardButton(text=title, callback_data=f"{CB_QUIZ_ANSWER}:{value}"))
    builder.row(InlineKeyboardButton(text=texts.BTN_CANCEL, callback_data=CB_MENU))
    return builder.as_markup()


def quiz_result_keyboard(verdict: str) -> InlineKeyboardMarkup:
    """Зелёный результат ведёт на запись, жёлтый — на консультацию, красный — нет."""
    builder = InlineKeyboardBuilder()

    if verdict == "green":
        builder.row(bookon_button())
        builder.row(
            InlineKeyboardButton(text=texts.BTN_LEAVE_REQUEST, callback_data=f"{CB_REQ_START}:-")
        )
    elif verdict == "yellow":
        builder.row(
            InlineKeyboardButton(
                text="💬 Записатися на консультацію", callback_data=f"{CB_REQ_START}:consult"
            )
        )
        builder.row(bookon_button())
    else:
        builder.row(InlineKeyboardButton(text=texts.BTN_CONTACTS, callback_data=f"{CB_MENU}:contacts"))

    builder.row(
        InlineKeyboardButton(text=texts.QUIZ_RESTART, callback_data=CB_QUIZ_RESTART),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


# --------------------------------------------------------------------------- #
# Прайс, FAQ, контакты, курс, рефералы
# --------------------------------------------------------------------------- #

PRICE_SECTIONS: tuple[tuple[str, str], ...] = (
    ("women", "👩 Епіляція — жінки"),
    ("men", "👨 Епіляція — чоловіки"),
    ("complex", "🎯 Комплекси зон"),
    ("rejuv", "💎 Омолодження обличчя"),
    ("all", "📄 Повний прайс"),
)


def price_menu_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for code, title in PRICE_SECTIONS:
        builder.row(InlineKeyboardButton(text=title, callback_data=f"{CB_PRICE}:{code}"))
    builder.row(bookon_button())
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def price_section_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_PRICE}:menu"),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def how_it_works_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_FAQ, callback_data=f"{CB_FAQ}:menu"))
    builder.row(bookon_button())
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def faq_menu_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    for item in config.FAQ:
        builder.row(
            InlineKeyboardButton(text=item["question"], callback_data=f"{CB_FAQ}:{item['code']}")
        )
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=CB_HOW),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def faq_answer_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_FAQ}:menu"),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def contacts_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(InlineKeyboardButton(text=texts.BTN_INSTAGRAM, url=config.INSTAGRAM_URL))
    builder.row(InlineKeyboardButton(text=texts.BTN_MAP, url=config.MAP_LINK))
    builder.row(
        InlineKeyboardButton(text=texts.BTN_REFERRAL, callback_data=CB_REFERRAL),
        InlineKeyboardButton(text=texts.BTN_SETTINGS, callback_data=CB_SETTINGS),
    )
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def settings_keyboard(promo_optout: bool) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    label = texts.BTN_PROMO_ON if promo_optout else texts.BTN_PROMO_OFF
    builder.row(InlineKeyboardButton(text=label, callback_data=CB_PROMO_TOGGLE))
    builder.row(
        InlineKeyboardButton(text=texts.BTN_BACK, callback_data=f"{CB_MENU}:contacts"),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def course_keyboard(*, has_course: bool) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    if has_course:
        builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_REFERRAL, callback_data=CB_REFERRAL),
        InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU),
    )
    return builder.as_markup()


def course_reminder_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура под напоминанием о следующем сеансе курса."""
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_LEAVE_REQUEST, callback_data=f"{CB_REQ_START}:-")
    )
    return builder.as_markup()


def referral_keyboard(bot_username: str, code: str, share_text: str) -> InlineKeyboardMarkup:
    """
    Кнопка «Поділитися» открывает окно выбора чата с готовым текстом.

    Ссылка вида t.me/<bot>?start=<code> — при переходе бот сразу знает,
    кто пригласил.
    """
    builder = InlineKeyboardBuilder()
    link = f"https://t.me/{bot_username}?start={code}"
    share_url = f"https://t.me/share/url?url={quote(link)}&text={quote(share_text)}"
    builder.row(InlineKeyboardButton(text=texts.BTN_SHARE, url=share_url))
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def promotions_keyboard() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    builder.row(bookon_button())
    builder.row(
        InlineKeyboardButton(text=texts.BTN_LEAVE_REQUEST, callback_data=f"{CB_REQ_START}:-")
    )
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()


def menu_keyboard() -> InlineKeyboardMarkup:
    """Одинокая кнопка возврата в меню — для финальных экранов."""
    builder = InlineKeyboardBuilder()
    builder.row(InlineKeyboardButton(text=texts.BTN_MENU, callback_data=CB_MENU))
    return builder.as_markup()
