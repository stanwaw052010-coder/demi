#!/usr/bin/env python3
"""Поиск локальных бизнесов БЕЗ сайта через OpenStreetMap (без Google, без ключа).

Использует открытые сервисы OSM (Nominatim + Overpass API). Ключ и биллинг не
нужны. «Бизнес без сайта» = у объекта OSM нет тегов website/contact:website/url.

Пример:
    python osm_main.py --query "кофейня" --location "Казань" --radius 4000
    python osm_main.py --query "стоматология" --location "55.75,37.61" --radius 3000
    python osm_main.py --query "автомастерская" --location "Тула" --osm-tag shop=car_repair
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
from typing import Any
from urllib.parse import urlsplit

try:
    from tqdm import tqdm
except ImportError:  # pragma: no cover
    def tqdm(iterable=None, **_kwargs):  # type: ignore
        return iterable if iterable is not None else []

from categories import resolve_filters
from osm_client import OSMClient, OSMError

# Теги, которые считаем «настоящим сайтом».
WEBSITE_TAGS = ("website", "contact:website", "url", "contact:url", "website:en")

# Теги телефона по приоритету.
PHONE_TAGS = ("phone", "contact:phone", "contact:mobile", "mobile")

# Домены-агрегаторы/соцсети — если «сайт» ведёт только сюда, это не свой сайт.
SOCIAL_DOMAINS = (
    "facebook.com", "fb.com", "instagram.com", "vk.com", "vk.ru", "t.me",
    "telegram.me", "wa.me", "api.whatsapp.com", "linktr.ee", "taplink.cc",
    "twitter.com", "x.com", "ok.ru", "youtube.com", "tiktok.com",
    "yandex.ru", "zen.yandex.ru", "2gis.ru", "avito.ru", "flamp.ru",
)

# Отдельные теги соцсетей в OSM (значение — ник или ссылка).
SOCIAL_CONTACT_KEYS = {
    "contact:instagram": "instagram",
    "contact:facebook": "facebook",
    "contact:vk": "vk",
    "contact:telegram": "telegram",
    "contact:whatsapp": "whatsapp",
    "contact:youtube": "youtube",
    "contact:tiktok": "tiktok",
    "contact:twitter": "twitter",
    "contact:ok": "ok",
}

# Столбцы CSV. Порядок «для звонка»: сначала телефон и название, затем видно,
# что сайта нет (has_website="нет") и какие есть соцсети (зацепка для разговора).
CSV_COLUMNS = [
    "name",
    "phone",
    "address",
    "has_website",
    "social",
    "category",
    "map_url",
    "osm_id",
]


def parse_location(raw: str) -> tuple[float, float] | None:
    parts = [p.strip() for p in raw.split(",")]
    if len(parts) == 2:
        try:
            lat, lon = float(parts[0]), float(parts[1])
            if -90 <= lat <= 90 and -180 <= lon <= 180:
                return lat, lon
        except ValueError:
            pass
    return None


def is_social_only(url: str) -> bool:
    host = urlsplit(url if "//" in url else "//" + url).netloc.lower()
    if host.startswith("www."):
        host = host[4:]
    return any(host == d or host.endswith("." + d) for d in SOCIAL_DOMAINS)


def get_real_website(tags: dict[str, str]) -> str:
    """Адрес НАСТОЯЩЕГО сайта (не соцсеть/агрегатор). Иначе ''.

    Если у бизнеса в теге website указан только Instagram/ВК/2ГИС и т.п. — это
    НЕ считается сайтом, и бизнес остаётся в списке лидов.
    """
    for key in WEBSITE_TAGS:
        val = tags.get(key)
        if val and val.strip() and not is_social_only(val.strip()):
            return val.strip()
    return ""


def get_socials(tags: dict[str, str]) -> list[str]:
    """Соцсети/агрегаторы бизнеса — зацепка для звонка («у вас только Instagram»)."""
    socials: list[str] = []
    for key in WEBSITE_TAGS:  # website=..., если это на самом деле соцсеть
        val = tags.get(key)
        if val and val.strip() and is_social_only(val.strip()):
            socials.append(val.strip())
    for key, label in SOCIAL_CONTACT_KEYS.items():
        val = tags.get(key)
        if val and val.strip():
            socials.append(f"{label}: {val.strip()}")
    return socials


def get_phone(tags: dict[str, str]) -> str:
    for key in PHONE_TAGS:
        val = tags.get(key)
        if val and val.strip():
            return val.strip()
    return ""


def build_address(tags: dict[str, str]) -> str:
    street = tags.get("addr:street", "")
    house = tags.get("addr:housenumber", "")
    city = tags.get("addr:city", "")
    line = " ".join(p for p in (street, house) if p).strip()
    parts = [p for p in (line, city) if p]
    return ", ".join(parts)


def get_category(tags: dict[str, str]) -> str:
    for key in ("amenity", "shop", "healthcare", "leisure", "tourism", "office", "craft"):
        if tags.get(key):
            return f"{key}={tags[key]}"
    return ""


def element_to_row(el: dict[str, Any]) -> dict[str, Any]:
    tags = el["tags"]
    osm_type = el.get("osm_type", "")
    osm_id = el.get("osm_id", "")
    return {
        "name": tags.get("name", ""),
        "phone": get_phone(tags),
        "address": build_address(tags),
        "has_website": "нет",  # в этот список попадают только бизнесы без сайта
        "social": ", ".join(get_socials(tags)),
        "category": get_category(tags),
        "map_url": f"https://www.openstreetmap.org/{osm_type}/{osm_id}"
        if osm_type and osm_id
        else "",
        "osm_id": f"{osm_type}/{osm_id}" if osm_type and osm_id else "",
    }


def parse_osm_tags(raw_list: list[str]) -> list[tuple[str, str]]:
    filters: list[tuple[str, str]] = []
    for raw in raw_list:
        if "=" not in raw:
            raise SystemExit(f"Неверный --osm-tag '{raw}': ожидается формат key=value.")
        key, value = raw.split("=", 1)
        filters.append((key.strip(), value.strip()))
    return filters


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Поиск бизнесов без сайта через OpenStreetMap (без Google, без ключа).",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--query", required=True,
                        help="Категория: 'кофейня', 'стоматология', 'автомастерская' и т.п.")
    parser.add_argument("--location", required=True,
                        help="Город/адрес ('Казань') или координаты 'lat,lng'.")
    parser.add_argument("--radius", type=float, default=5000,
                        help="Радиус поиска в метрах.")
    parser.add_argument("--max-results", type=int, default=0,
                        help="Ограничить число лидов в CSV (0 = без ограничения).")
    parser.add_argument("--output", default="leads_osm.csv",
                        help="Путь к выходному CSV.")
    parser.add_argument("--osm-tag", action="append", default=[], metavar="KEY=VALUE",
                        help="Явно задать тег(и) OSM вместо автоопределения по --query. "
                             "Можно повторять: --osm-tag shop=car_repair --osm-tag shop=tyres.")
    parser.add_argument("--exclude-social", action="store_true",
                        help="Исключить бизнесы, у которых есть ссылка на соцсеть/агрегатор "
                             "(они уже как-то представлены онлайн).")
    parser.add_argument("--require-name", action="store_true",
                        help="Оставлять только объекты с заполненным названием.")
    parser.add_argument("--require-phone", action="store_true",
                        help="Оставлять только те, у кого указан телефон (контактные лиды).")
    parser.add_argument("--overpass-url", default=os.getenv("OVERPASS_URL"),
                        help="Свой endpoint Overpass (или переменная окружения OVERPASS_URL). "
                             "Полезно, если основной сервер перегружен/недоступен.")
    parser.add_argument("--nominatim-url", default=os.getenv("NOMINATIM_URL"),
                        help="Свой endpoint Nominatim (или переменная окружения NOMINATIM_URL).")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_arg_parser().parse_args(argv)
    client_kwargs: dict[str, Any] = {}
    if args.overpass_url:
        client_kwargs["overpass_url"] = args.overpass_url
    if args.nominatim_url:
        client_kwargs["nominatim_url"] = args.nominatim_url
    client = OSMClient(**client_kwargs)

    # 1. Определяем координаты центра поиска.
    coords = parse_location(args.location)
    if coords is None:
        print(f"Геокодирую «{args.location}» через Nominatim (OSM)...")
        try:
            lat, lon, display = client.geocode(args.location)
        except OSMError as exc:
            print(f"Ошибка геокодинга:\n  {exc}", file=sys.stderr)
            return 2
        print(f"  → {display}")
        print(f"  → координаты: {lat:.5f}, {lon:.5f}")
    else:
        lat, lon = coords
        print(f"Центр поиска (координаты): {lat:.5f}, {lon:.5f}")

    # 2. Определяем фильтры (теги OSM) по запросу или из --osm-tag.
    if args.osm_tag:
        filters = parse_osm_tags(args.osm_tag)
        name_regex = None
        print(f"Фильтры OSM: {', '.join(f'{k}={v}' for k, v in filters)}")
    else:
        filters, matched = resolve_filters(args.query)
        if matched:
            name_regex = None
            print(f"Категория «{args.query}» → фильтры: "
                  f"{', '.join(f'{k}={v}' for k, v in filters)}")
        else:
            name_regex = args.query
            print(f"Категория «{args.query}» не распознана — ищу по названию "
                  f"(name~«{args.query}»). Для точности используйте --osm-tag.")

    # 3. Запрашиваем POI из Overpass.
    print(f"Запрос к Overpass API (радиус {int(args.radius)} м)...")
    try:
        elements = client.find_pois(
            filters, lat=lat, lon=lon, radius=args.radius, name_regex=name_regex
        )
    except OSMError as exc:
        print(f"Ошибка Overpass API:\n  {exc}", file=sys.stderr)
        return 2

    print(f"Найдено объектов всего: {len(elements)}")

    # 4. Фильтруем: оставляем без сайта (+ опции).
    leads: list[dict[str, Any]] = []
    with_site = 0
    social_skipped = 0
    no_phone_skipped = 0
    for el in tqdm(elements, desc="Фильтрация", unit="объект"):
        tags = el["tags"]
        if args.require_name and not tags.get("name"):
            continue

        # Настоящий сайт (не соцсеть) → это НЕ лид, пропускаем.
        if get_real_website(tags):
            with_site += 1
            continue

        row = element_to_row(el)

        # --exclude-social: пропустить тех, у кого хотя бы есть соцсеть.
        if args.exclude_social and row["social"]:
            social_skipped += 1
            continue

        if args.require_phone and not row["phone"]:
            no_phone_skipped += 1
            continue

        leads.append(row)

    # Сортируем: сначала те, у кого есть телефон и название (самые «продажные» лиды).
    leads.sort(key=lambda r: (bool(r["phone"]), bool(r["name"])), reverse=True)

    if args.max_results and args.max_results > 0:
        leads = leads[: args.max_results]

    # 5. Сохраняем CSV.
    with open(args.output, "w", newline="", encoding="utf-8-sig") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_COLUMNS)
        writer.writeheader()
        writer.writerows(leads)

    with_phone = sum(1 for r in leads if r["phone"])

    print("\nГотово!")
    print(f"  Всего объектов:        {len(elements)}")
    print(f"  С сайтом (пропущены):  {with_site}")
    if args.exclude_social:
        print(f"  Только соцсети (проп.): {social_skipped}")
    if args.require_phone:
        print(f"  Без телефона (проп.):  {no_phone_skipped}")
    print(f"  Лидов без сайта:       {len(leads)}")
    print(f"  из них с телефоном:    {with_phone}")
    print(f"  Файл с результатами:   {args.output}")

    print_preview(leads)

    if not args.require_phone and with_phone < len(leads):
        print("\nСовет: чтобы оставить только тех, у кого есть телефон, "
              "добавьте флаг --require-phone.")
    return 0


def print_preview(leads: list[dict[str, Any]], limit: int = 20) -> None:
    """Показывает лиды прямо в консоли: телефон + «нет сайта» + соцсети."""
    if not leads:
        return
    shown = leads[:limit]
    print(f"\n=== ЛИДЫ БЕЗ САЙТА (первые {len(shown)} из {len(leads)}) ===")
    print("Всем этим заведениям можно звонить и предлагать сделать сайт.\n")
    print(f"{'ТЕЛЕФОН':<18} {'САЙТ':<5} {'НАЗВАНИЕ':<30} СОЦСЕТИ / АДРЕС")
    print("-" * 90)
    for r in shown:
        phone = r["phone"] or "— нет —"
        name = (r["name"] or "(без названия)")[:29]
        if r["social"]:
            extra = f"есть только: {r['social']}"[:45]
        else:
            extra = (r["address"] or "")[:45]
        print(f"{phone:<18} {'НЕТ':<5} {name:<30} {extra}")
    if len(leads) > limit:
        print(f"... ещё {len(leads) - limit} — в файле CSV.")


if __name__ == "__main__":
    sys.exit(main())
