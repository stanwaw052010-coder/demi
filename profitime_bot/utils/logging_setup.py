"""
Налаштування логування.

Два призначення в одному місці:
  • консоль — її читає systemd/journald на сервері й розробник локально;
  • файл із ротацією — щоб історія лишалася після перезапуску сервісу.

Окремо тут живе маскування телефонів. Логи читає не тільки власниця:
вони потрапляють у journald, у бекапи, у скріншоти для розробника. Номер
клієнтки в такому місці — це витік персональних даних, тому будь-який
номер у тексті лога перетворюється на +38050***4567 незалежно від того,
хто і де його спробував залогувати.
"""

from __future__ import annotations

import logging
import re
from logging.handlers import RotatingFileHandler
from pathlib import Path

import config

LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

# Український номер у будь-якому вигляді: +380501234567, 0501234567,
# 380 50 123 45 67, з дужками й дефісами.
_PHONE_RE = re.compile(r"(?:\+?38)?[\s(-]*0\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}")


def mask_phone(value: str) -> str:
    """
    Сховати номер, лишивши код оператора й останні чотири цифри.

    +380933772058 -> 093***2058
    0501234567    -> 050***4567

    Код оператора лишаємо навмисно: за ним можна впізнати «той самий
    номер» у двох рядках лога, не знаючи самого номера.
    """
    digits = re.sub(r"\D", "", value)
    if len(digits) < 9:
        return "***"

    # Зводимо до національного формату 0XXXXXXXXX незалежно від того,
    # був номер із +380, 380 чи просто з нуля.
    national = digits[-10:]
    return f"{national[:3]}***{national[-4:]}"


class PhoneMaskFilter(logging.Filter):
    """Прибирає номери телефонів із будь-якого запису лога."""

    def filter(self, record: logging.LogRecord) -> bool:
        try:
            message = record.getMessage()
        except Exception:  # noqa: BLE001 — зламаний формат не має гасити лог
            return True

        masked = _PHONE_RE.sub(lambda m: mask_phone(m.group(0)), message)
        if masked != message:
            # Підміняємо готовий текст: аргументи вже вклеєні, тому їх прибираємо,
            # інакше logging спробує підставити їх удруге.
            record.msg = masked
            record.args = ()
        return True


def setup_logging() -> Path | None:
    """
    Налаштувати логування. Повертає шлях до файлу лога або None.

    Викликається один раз на старті, до будь-яких інших дій — щоб навіть
    помилка конфігурації потрапила в лог, а не лише на екран.
    """
    root = logging.getLogger()
    root.setLevel(logging.INFO)

    # Прибираємо хендлери від попередніх викликів: інакше при перезапуску
    # в тестах повідомлення дублюються.
    for handler in list(root.handlers):
        root.removeHandler(handler)

    formatter = logging.Formatter(LOG_FORMAT, datefmt=DATE_FORMAT)
    phone_filter = PhoneMaskFilter()

    console = logging.StreamHandler()
    console.setFormatter(formatter)
    console.addFilter(phone_filter)
    root.addHandler(console)

    log_file: Path | None = None
    if config.LOG_TO_FILE:
        try:
            config.LOG_DIR.mkdir(parents=True, exist_ok=True)
            log_file = config.LOG_DIR / "bot.log"
            file_handler = RotatingFileHandler(
                log_file,
                maxBytes=config.LOG_MAX_BYTES,
                backupCount=config.LOG_BACKUP_COUNT,
                encoding="utf-8",
            )
            file_handler.setFormatter(formatter)
            file_handler.addFilter(phone_filter)
            root.addHandler(file_handler)
        except OSError as error:
            # Немає прав на каталог — це не привід не запускати бота.
            # Працюємо з консоллю, а причину видно в journald.
            root.warning("Не вдалося відкрити файл лога (%s): %s", config.LOG_DIR, error)
            log_file = None

    # Ці бібліотеки надто балакучі на рівні INFO.
    logging.getLogger("apscheduler").setLevel(logging.WARNING)
    logging.getLogger("aiogram.event").setLevel(logging.WARNING)
    logging.getLogger("aiohttp").setLevel(logging.WARNING)

    return log_file
