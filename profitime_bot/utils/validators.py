"""Валидация пользовательского ввода: имя и украинский номер телефона."""

from __future__ import annotations

import re

# Мобильные коды украинских операторов.
MOBILE_CODES: frozenset[str] = frozenset(
    {"39", "50", "63", "66", "67", "68", "73", "91", "92", "93", "94", "95", "96", "97", "98", "99"}
)

# Диапазон кодов стационарных номеров Украины (Київ — 44, Львів — 32 и т.д.).
LANDLINE_RANGE = range(31, 58)

# Имя: буквы кириллицы/латиницы, пробел, дефис, апостроф.
NAME_PATTERN = re.compile(r"^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ' \-’]{2,40}$")

NAME_MIN_LEN = 2
NAME_MAX_LEN = 40

COMMENT_MAX_LEN = 300


def normalize_phone(raw: str) -> str | None:
    """
    Приводит номер к каноническому виду +380XXXXXXXXX.

    Принимает: «+380 93 377 20 58», «380933772058», «0933772058», «933772058».
    Возвращает None, если номер не похож на украинский.
    """
    if not raw:
        return None

    digits = re.sub(r"\D", "", raw)

    if digits.startswith("380") and len(digits) == 12:
        national = digits[3:]
    elif digits.startswith("0") and len(digits) == 10:
        national = digits[1:]
    elif len(digits) == 9:
        national = digits
    else:
        return None

    if not national.isdigit() or len(national) != 9:
        return None

    code = national[:2]
    if code not in MOBILE_CODES and int(code) not in LANDLINE_RANGE:
        return None

    return f"+380{national}"


def format_phone(normalized: str) -> str:
    """+380933772058 -> «+380 93 377 20 58» для показа в интерфейсе."""
    if not normalized.startswith("+380") or len(normalized) != 13:
        return normalized
    body = normalized[4:]
    return f"+380 {body[:2]} {body[2:5]} {body[5:7]} {body[7:]}"


def validate_name(raw: str) -> str | None:
    """Проверяет имя и возвращает очищенную версию. Отсекает эмодзи, ссылки, цифры."""
    if not raw:
        return None

    cleaned = " ".join(raw.strip().split())
    if not (NAME_MIN_LEN <= len(cleaned) <= NAME_MAX_LEN):
        return None
    if not NAME_PATTERN.match(cleaned):
        return None

    return _titleize(cleaned)


def _titleize(value: str) -> str:
    """«анна-марія коваль» -> «Анна-Марія Коваль» (учитывает составные имена)."""
    words: list[str] = []
    for word in value.split(" "):
        parts = [part[:1].upper() + part[1:].lower() for part in word.split("-")]
        words.append("-".join(parts))
    return " ".join(words)


def clean_comment(raw: str) -> str:
    """Комментарий к заявке: подрезаем длину, схлопываем переносы."""
    return " ".join(raw.strip().split())[:COMMENT_MAX_LEN]


def clean_free_text(raw: str, limit: int = 500) -> str:
    """Произвольный текст владелицы (причина отказа, текст рассылки)."""
    return raw.strip()[:limit]
