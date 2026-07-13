#!/usr/bin/env python3
"""Поиск локальных бизнесов БЕЗ сайта через Google Places API (New).

Идея: находим места по текстовому запросу и локации, для каждого запрашиваем
детали и оставляем только те, у которых нет поля ``websiteUri``. Такие бизнесы —
готовые лиды для продажи услуг по созданию сайтов.

Пример:
    python main.py --query "кофейня" --location "Москва" --max-results 60
    python main.py --query "стоматология" --location "55.75,37.61" --radius 3000
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
from typing import Any
from urllib.parse import urlsplit

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    print(
        "Не установлен пакет python-dotenv. Установите зависимости:\n"
        "  pip install -r requirements.txt",
        file=sys.stderr,
    )
    sys.exit(1)

try:
    from tqdm import tqdm
except ImportError:  # pragma: no cover
    print(
        "Не установлен пакет tqdm. Установите зависимости:\n"
        "  pip install -r requirements.txt",
        file=sys.stderr,
    )
    sys.exit(1)

from places_client import PlacesAPIError, PlacesClient

# Домены, которые считаем «только соцсети» (не полноценный сайт).
SOCIAL_DOMAINS = (
    "facebook.com",
    "fb.com",
    "instagram.com",
    "vk.com",
    "vk.ru",
    "t.me",
    "telegram.me",
    "wa.me",
    "api.whatsapp.com",
    "linktr.ee",
    "taplink.cc",
    "twitter.com",
    "x.com",
    "ok.ru",
    "youtube.com",
    "tiktok.com",
    "yandex.ru",  # карточка на Яндексе, а не собственный сайт
    "zen.yandex.ru",
    "2gis.ru",
    "avito.ru",
)

CSV_COLUMNS = [
    "name",
    "address",
    "phone",
    "rating",
    "reviews_count",
    "category",
    "google_maps_url",
    "place_id",
]


def parse_location(raw: str) -> tuple[tuple[float, float] | None, str | None]:
    """Разбирает --location.

    Возвращает ``(координаты, текст)``:
      - если строка вида ``lat,lng`` → ``((lat, lng), None)``;
      - иначе → ``(None, raw)`` (текст добавим в поисковый запрос).
    """
    parts = [p.strip() for p in raw.split(",")]
    if len(parts) == 2:
        try:
            lat, lng = float(parts[0]), float(parts[1])
            if -90 <= lat <= 90 and -180 <= lng <= 180:
                return (lat, lng), None
        except ValueError:
            pass
    return None, raw


def is_social_only(website: str) -> bool:
    """True, если ссылка ведёт только на соцсеть/агрегатор, а не на свой сайт."""
    host = urlsplit(website).netloc.lower()
    if host.startswith("www."):
        host = host[4:]
    return any(host == d or host.endswith("." + d) for d in SOCIAL_DOMAINS)


def extract_text(value: Any) -> str:
    """Достаёт ``.text`` из объектов вида {'text': ...} либо возвращает строку."""
    if isinstance(value, dict):
        return value.get("text", "") or ""
    return value or ""


def details_to_row(details: dict[str, Any]) -> dict[str, Any]:
    category = extract_text(details.get("primaryTypeDisplayName"))
    if not category:
        types = details.get("types") or []
        category = types[0] if types else ""
    return {
        "name": extract_text(details.get("displayName")),
        "address": details.get("formattedAddress", ""),
        "phone": details.get("nationalPhoneNumber")
        or details.get("internationalPhoneNumber", ""),
        "rating": details.get("rating", ""),
        "reviews_count": details.get("userRatingCount", ""),
        "category": category,
        "google_maps_url": details.get("googleMapsUri", ""),
        "place_id": details.get("id", ""),
    }


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Поиск локальных бизнесов без сайта через Google Places API (New).",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--query",
        required=True,
        help="Текстовый запрос, например: 'кофейня', 'стоматология', 'автомастерская'.",
    )
    parser.add_argument(
        "--location",
        required=True,
        help="Город/адрес ('Москва', 'Казань, Вахитовский район') или координаты 'lat,lng'.",
    )
    parser.add_argument(
        "--radius",
        type=float,
        default=5000,
        help="Радиус поиска в метрах (учитывается только при координатах в --location).",
    )
    parser.add_argument(
        "--max-results",
        type=int,
        default=60,
        help="Сколько мест максимум обработать (сколько карточек запросить из поиска).",
    )
    parser.add_argument(
        "--output",
        default="leads.csv",
        help="Путь к CSV-файлу с результатами.",
    )
    parser.add_argument(
        "--language",
        default="ru",
        help="Код языка ответа API (например: ru, en).",
    )
    parser.add_argument(
        "--region",
        default=None,
        help="Код региона для приоритезации результатов (например: RU).",
    )
    parser.add_argument(
        "--include-social",
        action="store_true",
        help="Также считать лидами бизнесы, у которых вместо сайта только соцсеть/агрегатор.",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    load_dotenv()
    args = build_arg_parser().parse_args(argv)

    api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    if not api_key:
        print(
            "Ошибка: не задан GOOGLE_MAPS_API_KEY.\n"
            "Создайте файл .env (см. .env.example) и укажите ключ, либо экспортируйте "
            "переменную окружения:\n"
            "  export GOOGLE_MAPS_API_KEY=ВАШ_КЛЮЧ",
            file=sys.stderr,
        )
        return 1

    coords, location_text = parse_location(args.location)
    text_query = args.query if coords else f"{args.query} {location_text}".strip()

    if coords is None and args.radius != 5000:
        print(
            "Предупреждение: --radius применяется только когда --location задан "
            "координатами 'lat,lng'. Для текстовой локации радиус игнорируется.",
            file=sys.stderr,
        )

    client = PlacesClient(
        api_key=api_key,
        language=args.language,
        region=args.region,
    )

    # ------------------------------------------------------------------ #
    # Шаг 1. Собираем список мест-кандидатов через Text Search (с пагинацией).
    # ------------------------------------------------------------------ #
    print(f"Поиск: «{text_query}» (до {args.max_results} мест)...")
    try:
        candidates = list(
            tqdm(
                client.iter_text_search(
                    text_query,
                    location=coords,
                    radius=args.radius if coords else None,
                    max_results=args.max_results,
                ),
                total=args.max_results,
                desc="Поиск мест",
                unit="место",
            )
        )
    except PlacesAPIError as exc:
        print(f"\nОшибка Places API при поиске:\n{exc}", file=sys.stderr)
        return 2

    if not candidates:
        print("Ничего не найдено по заданным параметрам.")
        return 0

    print(f"Найдено кандидатов: {len(candidates)}. Запрашиваю детали...")

    # ------------------------------------------------------------------ #
    # Шаг 2. Для каждого места берём Place Details и фильтруем по сайту.
    # ------------------------------------------------------------------ #
    leads: list[dict[str, Any]] = []
    social_only_count = 0
    errors = 0

    for place in tqdm(candidates, desc="Детали мест", unit="место"):
        place_id = place.get("id")
        if not place_id:
            continue
        try:
            details = client.place_details(place_id)
        except PlacesAPIError as exc:
            errors += 1
            tqdm.write(f"  ! Пропущено {place_id}: {exc.message}")
            continue

        website = (details.get("websiteUri") or "").strip()

        if not website:
            leads.append(details_to_row(details))
        elif args.include_social and is_social_only(website):
            social_only_count += 1
            leads.append(details_to_row(details))

    # ------------------------------------------------------------------ #
    # Шаг 3. Сохраняем результат в CSV.
    # ------------------------------------------------------------------ #
    with open(args.output, "w", newline="", encoding="utf-8-sig") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_COLUMNS)
        writer.writeheader()
        writer.writerows(leads)

    print("\nГотово!")
    print(f"  Обработано мест:      {len(candidates)}")
    print(f"  Лидов без сайта:      {len(leads)}")
    if args.include_social:
        print(f"    из них только соцсети: {social_only_count}")
    if errors:
        print(f"  Ошибок при деталях:   {errors}")
    print(f"  Файл с результатами:  {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
