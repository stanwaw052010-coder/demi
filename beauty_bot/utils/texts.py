"""
Все украиноязычные строки интерфейса в одном месте.

Здесь же — форматтеры карточек записи, уведомлений и напоминаний.
Разметка: HTML (бот запускается с parse_mode=HTML).
"""

from __future__ import annotations

from typing import Final

import config

# --------------------------------------------------------------------------- #
# Календарь: украинские названия месяцев и дней недели
# --------------------------------------------------------------------------- #

MONTHS_GENITIVE: Final[tuple[str, ...]] = (
    "січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
)

MONTHS_SHORT: Final[tuple[str, ...]] = (
    "січ", "лют", "бер", "кві", "тра", "чер",
    "лип", "сер", "вер", "жов", "лис", "гру",
)

WEEKDAYS_FULL: Final[tuple[str, ...]] = (
    "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота", "неділя",
)

WEEKDAYS_SHORT: Final[tuple[str, ...]] = ("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд")

# --------------------------------------------------------------------------- #
# Кнопки
# --------------------------------------------------------------------------- #

BTN_BOOK: Final[str] = "📅 Записатися"
BTN_MY_BOOKINGS: Final[str] = "📋 Мої записи"
BTN_PRICES: Final[str] = "💅 Послуги та ціни"
BTN_CONTACTS: Final[str] = "📍 Контакти"

BTN_BACK: Final[str] = "⬅️ Назад"
BTN_CANCEL: Final[str] = "❌ Скасувати"
BTN_CONFIRM: Final[str] = "✅ Підтвердити"
BTN_SHARE_PHONE: Final[str] = "📱 Надіслати мій номер"
BTN_TO_MENU: Final[str] = "🏠 Головне меню"

BTN_INSTAGRAM: Final[str] = "📸 Instagram"
BTN_WRITE_MASTER: Final[str] = "✍️ Написати майстру"
BTN_YES_CANCEL: Final[str] = "✅ Так, скасувати"
BTN_NO_KEEP: Final[str] = "↩️ Ні, залишити"

BTN_WHOLE_DAY: Final[str] = "🚫 Весь день"
BTN_SKIP: Final[str] = "⏭ Пропустити"

# --------------------------------------------------------------------------- #
# Общие экраны
# --------------------------------------------------------------------------- #

WELCOME: Final[str] = (
    "✨ <b>{salon}</b>\n"
    "<i>{subtitle}</i>\n\n"
    "Вітаємо, {name}! 🤍\n"
    "Тут ви можете записатися до майстра у зручний для вас час — "
    "без дзвінків і очікування відповіді.\n\n"
    "Оберіть, що вас цікавить 👇"
)

MENU_PROMPT: Final[str] = "Оберіть дію 👇"

HELP: Final[str] = (
    "ℹ️ <b>Як користуватися</b>\n\n"
    f"{BTN_BOOK} — обрати послугу, дату та час.\n"
    f"{BTN_MY_BOOKINGS} — переглянути або скасувати свій запис.\n"
    f"{BTN_PRICES} — актуальний прайс.\n"
    f"{BTN_CONTACTS} — телефон, Instagram, зв'язок з майстром.\n\n"
    "За добу та за 2 години до візиту ми надішлемо нагадування.\n\n"
    "Команда /cancel — повернутися до головного меню з будь-якого кроку."
)

CANCELLED_FLOW: Final[str] = "Гаразд, скасовано. Повертаємось до головного меню 🤍"

STALE_BUTTON: Final[str] = "Ця кнопка вже неактуальна — почніть, будь ласка, спочатку 🙏"
UNKNOWN_INPUT: Final[str] = "Не зовсім зрозуміла команда. Скористайтеся, будь ласка, кнопками нижче 👇"
SOMETHING_WRONG: Final[str] = "Щось пішло не так. Спробуйте ще раз або зателефонуйте нам: {phone}"

# --------------------------------------------------------------------------- #
# Прайс і контакти
# --------------------------------------------------------------------------- #

PRICES_HEADER: Final[str] = "💅 <b>Послуги та ціни</b>\n"
PRICES_FOOTER: Final[str] = (
    "\n<i>Точну вартість майстер підтвердить після огляду — "
    "вона залежить від стану нігтів і складності роботи.</i>"
)

CONTACTS: Final[str] = (
    "📍 <b>{salon}</b>\n"
    "<i>{subtitle}</i>\n\n"
    "👩‍🎨 Майстер: {master}\n"
    "📱 Телефон: {phone}\n"
    "📸 Instagram: {instagram}\n"
    "{address}"
    "🕒 Графік роботи:\n{schedule}"
)

BTN_RULES: Final[str] = "📜 Правила салону"

RULES_HEADER: Final[str] = "📜 <b>Правила салону</b>\n"
RULES_FOOTER: Final[str] = (
    "\n<i>Дякуємо за розуміння — ці правила допомагають нам працювати "
    "вчасно та якісно для кожної клієнтки 🤍</i>"
)

WRITE_MASTER_PROMPT: Final[str] = (
    "✍️ Напишіть ваше запитання одним повідомленням — "
    "майстер отримає його та відповість вам особисто.\n\n"
    "Щоб передумати, натисніть «{cancel}»."
).format(cancel=BTN_CANCEL)

WRITE_MASTER_SENT: Final[str] = "Дякуємо! Повідомлення передано майстру — вам скоро дадуть відповідь 🤍"
WRITE_MASTER_EMPTY: Final[str] = "Напишіть, будь ласка, текстом — так майстер точно нічого не пропустить."

# --------------------------------------------------------------------------- #
# Сценарий записи
# --------------------------------------------------------------------------- #

STEP_CATEGORY: Final[str] = "<b>Крок 1 з 5.</b> Оберіть напрямок:"
STEP_SERVICE: Final[str] = "<b>Крок 2 з 5.</b> {emoji} <b>{category}</b> — оберіть послугу:"
STEP_DATE: Final[str] = (
    "<b>Крок 3 з 5.</b> Оберіть зручну дату:\n\n"
    "💅 {service}\n"
    "🕒 {duration} · 💰 {price} {currency}"
)
STEP_TIME: Final[str] = (
    "<b>Крок 4 з 5.</b> Оберіть час на <b>{date}</b>:\n\n"
    "💅 {service}\n"
    "🕒 {duration}"
)
STEP_NAME: Final[str] = "<b>Крок 5 з 5.</b> Як вас звати? Напишіть ім'я 👇"
STEP_PHONE: Final[str] = (
    "І останнє — ваш номер телефону.\n\n"
    "Надішліть його кнопкою нижче або напишіть вручну, "
    "наприклад: <code>+380981234567</code>"
)

ALMOST_DONE: Final[str] = "Майже готово 🤍"

CONFIRM_CARD: Final[str] = (
    "📝 <b>Перевірте, будь ласка, запис</b>\n\n"
    "💅 Послуга: <b>{service}</b>\n"
    "🕒 Тривалість: {duration}\n"
    "💰 Вартість: {price} {currency}\n\n"
    "📅 Дата: <b>{date}</b>\n"
    "⏰ Час: <b>{time}</b>\n\n"
    "👤 Ім'я: {name}\n"
    "📱 Телефон: {phone}\n\n"
    "Все правильно?"
)

BOOKING_DONE: Final[str] = (
    "✅ <b>Вас записано!</b>\n\n"
    "📅 {date}\n"
    "⏰ {time}\n"
    "💅 {service}\n"
    "💰 {price} {currency}\n\n"
    "Чекаємо на вас за адресою студії 🤍\n"
    "Ми нагадаємо про візит за добу та за 2 години.\n\n"
    "Якщо плани зміняться — скасуйте запис у розділі «{my}»."
).format(
    date="{date}", time="{time}", service="{service}",
    price="{price}", currency="{currency}", my=BTN_MY_BOOKINGS,
)

# --------------------------------------------------------------------------- #
# Ошибки и ограничения
# --------------------------------------------------------------------------- #

ERR_NAME: Final[str] = (
    "Будь ласка, напишіть ім'я літерами — від 2 до 40 символів.\n"
    "Наприклад: <code>Олена</code>"
)
ERR_PHONE: Final[str] = (
    "Це не схоже на український номер 🤔\n"
    "Приклад: <code>+380981234567</code> або <code>0981234567</code>"
)
ERR_SLOT_TAKEN: Final[str] = (
    "На жаль, цей час щойно зайняли 🙏\n"
    "Оберіть, будь ласка, інший — вільні слоти нижче."
)
ERR_LIMIT: Final[str] = (
    "У вас уже {count} активних записи.\n\n"
    "Щоб записатися ще раз, спочатку скасуйте один із них "
    "у розділі «{my}»."
).format(count="{count}", my=BTN_MY_BOOKINGS)

ERR_NO_DATES: Final[str] = (
    "На найближчі {days} днів вільних місць на цю послугу немає 😔\n"
    "Зателефонуйте нам — підберемо час: {phone}"
)
ERR_NO_SLOTS: Final[str] = "На цю дату вільних місць уже немає. Оберіть, будь ласка, іншу 🙏"
ERR_DATE_PASSED: Final[str] = "Цю дату вже не можна обрати. Оберіть, будь ласка, іншу 🙏"

# --------------------------------------------------------------------------- #
# Мои записи
# --------------------------------------------------------------------------- #

MY_EMPTY: Final[str] = (
    "У вас поки немає активних записів.\n\n"
    "Натисніть «{book}», щоб обрати зручний час 🤍"
).format(book=BTN_BOOK)

MY_HEADER: Final[str] = "📋 <b>Ваші записи</b>\n"

MY_ITEM: Final[str] = (
    "📅 <b>{date}</b>, о <b>{time}</b>\n"
    "💅 {service}\n"
    "🕒 {duration} · 💰 {price} {currency}"
)

MY_CANCEL_ASK: Final[str] = (
    "Скасувати запис?\n\n"
    "📅 {date}, о {time}\n"
    "💅 {service}"
)
MY_CANCEL_DONE: Final[str] = "Запис скасовано. Будемо раді бачити вас іншим разом 🤍"
MY_CANCEL_KEPT: Final[str] = "Добре, запис залишається без змін 🤍"
MY_CANCEL_GONE: Final[str] = "Цей запис уже скасовано або він неактуальний."

BTN_CANCEL_BOOKING: Final[str] = "❌ Скасувати {time}, {date}"

# --------------------------------------------------------------------------- #
# Напоминания клиенту
# --------------------------------------------------------------------------- #

REMINDER_24: Final[str] = (
    "🔔 <b>Нагадування про запис</b>\n\n"
    "Чекаємо на вас <b>завтра, {date}</b>, о <b>{time}</b>.\n"
    "💅 {service}\n\n"
    "Якщо плани змінилися — скасуйте запис у «{my}», "
    "щоб час дістався іншій клієнтці 🤍"
).format(date="{date}", time="{time}", service="{service}", my=BTN_MY_BOOKINGS)

REMINDER_2: Final[str] = (
    "⏰ <b>Ваш запис уже сьогодні о {time}</b>\n"
    "💅 {service}\n\n"
    "Чекаємо на вас 🤍"
)

FOLLOWUP: Final[str] = (
    "💅 <b>Час оновити красу!</b>\n\n"
    "Від вашої процедури «{service}» минуло вже {days} {days_word}.\n"
    "Саме час на оновлення — оберіть зручний час просто зараз 🤍"
)

BTN_BOOK_AGAIN: Final[str] = "📅 Записатися знову"

CANCELLED_BY_MASTER: Final[str] = (
    "❗️ <b>Запис скасовано</b>\n\n"
    "📅 {date}, о {time}\n"
    "💅 {service}\n\n"
    "Вибачте за незручності. Зателефонуйте нам, щоб підібрати новий час: {phone}\n"
    "Або оберіть інший вільний час у боті."
)

# --------------------------------------------------------------------------- #
# Экран мастера (админ)
# --------------------------------------------------------------------------- #

ADMIN_HELP: Final[str] = (
    "👑 <b>Панель майстра</b>\n\n"
    "/today — записи на сьогодні\n"
    "/week — записи на тиждень\n"
    "/block — позначити час як недоступний\n"
    "/blocks — список недоступних інтервалів\n\n"
    "Про кожен новий запис і скасування бот повідомить автоматично."
)

ADMIN_NEW_BOOKING: Final[str] = (
    "🔔 <b>НОВИЙ ЗАПИС</b>\n\n"
    "📅 {date}\n"
    "⏰ {time} — {end_time}\n"
    "💅 {service}\n"
    "💰 {price} {currency}\n\n"
    "👤 {name}\n"
    "📱 {phone}\n"
    "{contact}\n"
    "<i>Запис №{id}</i>"
)

ADMIN_CLIENT_CANCELLED: Final[str] = (
    "❌ <b>КЛІЄНТ СКАСУВАВ ЗАПИС</b>\n\n"
    "📅 {date}, о {time}\n"
    "💅 {service}\n"
    "👤 {name} · {phone}\n\n"
    "<i>Час знову вільний для запису.</i>"
)

ADMIN_MESSAGE_FROM_CLIENT: Final[str] = (
    "✉️ <b>ПОВІДОМЛЕННЯ ВІД КЛІЄНТА</b>\n\n"
    "👤 {name}\n"
    "{contact}\n\n"
    "{text}"
)

ADMIN_DAY_HEADER: Final[str] = "📅 <b>{title}</b>"
ADMIN_DAY_EMPTY: Final[str] = "📅 <b>{title}</b>\n\nЗаписів немає."

ADMIN_BOOKING_LINE: Final[str] = (
    "⏰ <b>{time} — {end_time}</b>\n"
    "💅 {service}\n"
    "👤 {name} · {phone}\n"
    "💰 {price} {currency} · <i>№{id}</i>"
)

ADMIN_DAY_TOTAL: Final[str] = "\n➖➖➖➖➖\nВсього: {count} · {sum} {currency}"

ADMIN_WEEK_EMPTY: Final[str] = "На найближчі 7 днів записів немає."
ADMIN_ONLY: Final[str] = "Ця команда доступна лише майстру."

ADMIN_CANCEL_ASK: Final[str] = (
    "Скасувати запис №{id}?\n\n"
    "📅 {date}, о {time}\n"
    "👤 {name} · {phone}\n"
    "💅 {service}\n\n"
    "Клієнт отримає повідомлення."
)
ADMIN_CANCEL_DONE: Final[str] = "✅ Запис №{id} скасовано, клієнта повідомлено."
ADMIN_CANCEL_DONE_NO_NOTIFY: Final[str] = (
    "✅ Запис №{id} скасовано.\n"
    "⚠️ Не вдалося надіслати повідомлення клієнту — зателефонуйте: {phone}"
)
ADMIN_CANCEL_GONE: Final[str] = "Цей запис уже скасовано."
ADMIN_PICK_BOOKING: Final[str] = "Оберіть запис, який потрібно скасувати:"

# Блокировка времени
ADMIN_BLOCK_DAY: Final[str] = "🚫 <b>Недоступний час.</b> Крок 1 — оберіть день:"
ADMIN_BLOCK_START: Final[str] = (
    "🚫 <b>{date}</b>\n\n"
    "Крок 2 — з якого часу ви недоступні?"
)
ADMIN_BLOCK_END: Final[str] = (
    "🚫 <b>{date}</b>, з <b>{start}</b>\n\n"
    "Крок 3 — до якого часу?"
)
ADMIN_BLOCK_REASON: Final[str] = (
    "🚫 <b>{date}</b>, {start} — {end}\n\n"
    "Крок 4 — напишіть причину (для себе) або пропустіть."
)
ADMIN_BLOCK_DONE: Final[str] = (
    "✅ Час заблоковано:\n"
    "📅 {date}, {start} — {end}\n"
    "{reason}"
    "\nЦі години більше не пропонуються клієнтам."
)
ADMIN_BLOCK_CONFLICT: Final[str] = (
    "⚠️ На цей час уже є записи ({count}). "
    "Спочатку скасуйте їх через /today або /week, потім блокуйте час."
)
ADMIN_BLOCKS_EMPTY: Final[str] = "Недоступних інтервалів немає — усі робочі години відкриті."
ADMIN_BLOCKS_HEADER: Final[str] = "🚫 <b>Недоступний час</b>\n\nНатисніть, щоб зняти блокування:"
ADMIN_BLOCK_REMOVED: Final[str] = "✅ Блокування знято, час знову доступний для запису."
ADMIN_BLOCK_GONE: Final[str] = "Це блокування вже знято."
ADMIN_NO_WORK_DAYS: Final[str] = "У найближчі дні немає робочих днів для блокування."


# --------------------------------------------------------------------------- #
# Форматтеры
# --------------------------------------------------------------------------- #


def format_price_list() -> str:
    """Полный прайс из config.SERVICES."""
    chunks: list[str] = [PRICES_HEADER]
    for category in config.SERVICES.values():
        chunks.append(f"\n{category['emoji']} <b>{category['title']}</b>")
        for service in category["services"]:
            chunks.append(
                f"• {service['name']}\n"
                f"  <b>{service['price']} {config.CURRENCY}</b> · {format_duration(service['duration'])}"
            )
    chunks.append(PRICES_FOOTER)
    return "\n".join(chunks)


def format_rules() -> str:
    """Правила салона нумерованным списком из config.SALON_RULES."""
    lines = [RULES_HEADER]
    for number, rule in enumerate(config.SALON_RULES, start=1):
        lines.append(f"<b>{number}.</b> {rule}")
    lines.append(RULES_FOOTER)
    return "\n".join(lines)


def plural_days(days: int) -> str:
    """Украинское склонение: 1 день, 3 дні, 21 день, 25 днів."""
    if days % 100 in range(11, 15):
        return "днів"
    last = days % 10
    if last == 1:
        return "день"
    if last in (2, 3, 4):
        return "дні"
    return "днів"


def format_duration(minutes: int) -> str:
    """90 -> «1 год 30 хв», 60 -> «1 год», 30 -> «30 хв»."""
    hours, mins = divmod(minutes, 60)
    if hours and mins:
        return f"{hours} год {mins} хв"
    if hours:
        return f"{hours} год"
    return f"{mins} хв"


def format_schedule() -> str:
    """Рабочий график словами, одинаковые дни группируются."""
    lines: list[str] = []
    current: tuple[str, str] | None = None
    start_idx = 0

    def flush(end_idx: int) -> None:
        if current is None:
            return
        if start_idx == end_idx:
            days = WEEKDAYS_SHORT[start_idx]
        else:
            days = f"{WEEKDAYS_SHORT[start_idx]}–{WEEKDAYS_SHORT[end_idx]}"
        lines.append(f"   {days}: {current[0]}")

    for idx in range(7):
        hours = config.WORK_SCHEDULE.get(idx)
        label = (
            f"{hours[0].strftime('%H:%M')} – {hours[1].strftime('%H:%M')}"
            if hours
            else "вихідний"
        )
        key = (label, label)
        if current is None:
            current, start_idx = key, idx
        elif key != current:
            flush(idx - 1)
            current, start_idx = key, idx
    flush(6)
    return "\n".join(lines)
