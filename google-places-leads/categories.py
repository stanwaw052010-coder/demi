"""Сопоставление человеческих запросов с тегами OpenStreetMap.

Ключевые слова (рус/англ) -> список фильтров OSM (ключ, значение).
Если запрос не найден в этой таблице, скрипт ищет по совпадению названия
(name~query) — менее точно, но работает для любого запроса.
"""

from __future__ import annotations

# Порядок важен: сначала более специфичные категории.
CATEGORY_MAP: list[tuple[tuple[str, ...], list[tuple[str, str]]]] = [
    (("кофейн", "кофе", "coffee", "cafe", "кафе"), [("amenity", "cafe")]),
    (("ресторан", "restaurant"), [("amenity", "restaurant")]),
    (("бар", "паб", "bar", "pub"), [("amenity", "bar"), ("amenity", "pub")]),
    (("фастфуд", "fast food", "fast_food", "бургер"), [("amenity", "fast_food")]),
    (("пекарн", "булочн", "bakery"), [("shop", "bakery")]),
    (("кондитер", "confectionery", "sweets"), [("shop", "confectionery")]),
    (
        ("стоматолог", "стоматолог", "зубн", "dentist", "dental"),
        [("amenity", "dentist"), ("healthcare", "dentist")],
    ),
    (
        ("клиник", "поликлиник", "врач", "clinic", "doctor"),
        [("amenity", "clinic"), ("amenity", "doctors"), ("healthcare", "clinic")],
    ),
    (("аптек", "pharmacy", "drugstore"), [("amenity", "pharmacy")]),
    (("ветеринар", "veterinary", "vet"), [("amenity", "veterinary")]),
    (
        ("автомастер", "автосервис", "авторемонт", "car repair", "car_repair", "сто"),
        [("shop", "car_repair")],
    ),
    (("автомойк", "car wash", "car_wash", "мойка"), [("amenity", "car_wash")]),
    (("шиномонтаж", "шины", "tyres", "tires"), [("shop", "tyres")]),
    (
        ("парикмахер", "барбершоп", "barber", "hairdresser"),
        [("shop", "hairdresser")],
    ),
    (
        ("салон красоты", "красот", "beauty", "маникюр", "nails"),
        [("shop", "beauty"), ("shop", "nails")],
    ),
    (("спа", "spa", "массаж", "massage"), [("shop", "massage"), ("leisure", "spa")]),
    (
        ("фитнес", "спортзал", "тренаж", "gym", "fitness"),
        [("leisure", "fitness_centre")],
    ),
    (("йога", "yoga"), [("leisure", "fitness_centre"), ("sport", "yoga")]),
    (
        ("отель", "гостиниц", "хостел", "hotel", "hostel"),
        [("tourism", "hotel"), ("tourism", "hostel"), ("tourism", "guest_house")],
    ),
    (("цветы", "цветочн", "florist", "flowers"), [("shop", "florist")]),
    (("продукт", "магазин у дома", "grocery", "convenience"), [("shop", "convenience")]),
    (("супермаркет", "supermarket"), [("shop", "supermarket")]),
    (("одежд", "clothes", "clothing"), [("shop", "clothes")]),
    (("обув", "shoes"), [("shop", "shoes")]),
    (("ювелир", "jewelry", "jeweller"), [("shop", "jewelry")]),
    (("оптик", "очки", "optician"), [("shop", "optician")]),
    (("книг", "bookstore", "books"), [("shop", "books")]),
    (("мебель", "furniture"), [("shop", "furniture")]),
    (("зоомагазин", "pet", "pet shop"), [("shop", "pet")]),
    (("прачечн", "химчистк", "laundry", "dry cleaning"), [("shop", "laundry")]),
    (("типограф", "печать", "copyshop", "printing"), [("shop", "copyshop")]),
    (("автошкол", "driving school"), [("amenity", "driving_school")]),
    (("детск", "kindergarten", "nursery", "садик"), [("amenity", "kindergarten")]),
]


def resolve_filters(query: str) -> tuple[list[tuple[str, str]], bool]:
    """По запросу возвращает (список_фильтров, найдено_в_таблице).

    Если категория не распознана, возвращает пустой список и False —
    вызывающая сторона тогда использует поиск по названию (name~query).
    """
    q = query.strip().lower()
    for keywords, filters in CATEGORY_MAP:
        if any(kw in q for kw in keywords):
            return filters, True
    return [], False
