"""Клиент для поиска бизнесов через OpenStreetMap (без Google и без API-ключа).

Используются два открытых сервиса OSM:
  - Nominatim (геокодинг): название города/адреса -> координаты
    https://nominatim.org/release-docs/latest/api/Search/
  - Overpass API (выборка POI по тегам в радиусе)
    https://wiki.openstreetmap.org/wiki/Overpass_API

Ключ/биллинг не нужны. У объектов OSM «сайт» хранится в тегах
``website`` / ``contact:website`` / ``url`` — их отсутствие и есть наш признак
«бизнес без сайта».

Важно: у публичных серверов есть лимиты (Nominatim — не чаще ~1 запроса в
секунду и обязательный User-Agent). Клиент это соблюдает и делает ретраи.
"""

from __future__ import annotations

import random
import time
from dataclasses import dataclass, field
from typing import Any

import requests

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Контактный User-Agent обязателен по политике Nominatim.
USER_AGENT = "osm-no-website-leadfinder/1.0 (https://github.com/; contact via repo)"


class OSMError(RuntimeError):
    """Понятная человеку ошибка при обращении к сервисам OSM."""


@dataclass
class OSMClient:
    # Эндпоинты можно переопределить (например, выбрать другой публичный mirror
    # Overpass, если основной перегружен или недоступен из вашей сети).
    overpass_url: str = OVERPASS_URL
    nominatim_url: str = NOMINATIM_URL
    max_retries: int = 5
    backoff_base: float = 1.5
    timeout: float = 90.0
    # Минимальная пауза между запросами к Nominatim (политика — 1 req/sec).
    nominatim_min_interval: float = 1.1
    _session: requests.Session = field(default_factory=requests.Session, init=False)
    _last_nominatim_ts: float = field(default=0.0, init=False)

    def __post_init__(self) -> None:
        self._session.headers.update({"User-Agent": USER_AGENT})

    # ------------------------------------------------------------------ #
    # Геокодинг: название/адрес -> (lat, lon, отображаемое_имя)
    # ------------------------------------------------------------------ #
    def geocode(self, query: str) -> tuple[float, float, str]:
        # Уважаем лимит Nominatim (не чаще ~1 запроса в секунду).
        elapsed = time.monotonic() - self._last_nominatim_ts
        if elapsed < self.nominatim_min_interval:
            time.sleep(self.nominatim_min_interval - elapsed)

        params = {"q": query, "format": "jsonv2", "limit": 1}
        data = self._request_json(
            "GET", self.nominatim_url, params=params, service="Nominatim"
        )
        self._last_nominatim_ts = time.monotonic()

        if not data:
            raise OSMError(
                f"Не удалось определить координаты для «{query}». "
                "Уточните название города/адреса или задайте координаты 'lat,lng'."
            )
        item = data[0]
        return float(item["lat"]), float(item["lon"]), item.get("display_name", query)

    # ------------------------------------------------------------------ #
    # Overpass: поиск POI по тегам в радиусе
    # ------------------------------------------------------------------ #
    def find_pois(
        self,
        filters: list[tuple[str, str]],
        *,
        lat: float,
        lon: float,
        radius: float,
        name_regex: str | None = None,
    ) -> list[dict[str, Any]]:
        """Возвращает нормализованные элементы OSM.

        ``filters`` — список пар (ключ, значение), например [('amenity','cafe')].
        Если ``name_regex`` задан — ищем ещё и по совпадению названия.
        """
        clauses: list[str] = []
        area = f"(around:{int(radius)},{lat},{lon})"
        for key, value in filters:
            clauses.append(f'  nwr["{key}"="{value}"]{area};')
        if name_regex:
            safe = name_regex.replace('"', '\\"')
            clauses.append(f'  nwr["name"~"{safe}",i]{area};')

        query = (
            "[out:json][timeout:90];\n"
            "(\n" + "\n".join(clauses) + "\n);\n"
            "out center tags;"
        )

        data = self._request_json(
            "POST", self.overpass_url, data={"data": query}, service="Overpass"
        )
        elements = data.get("elements", []) if isinstance(data, dict) else []
        return [self._normalize(el) for el in elements]

    @staticmethod
    def _normalize(el: dict[str, Any]) -> dict[str, Any]:
        tags = el.get("tags", {}) or {}
        lat = el.get("lat")
        lon = el.get("lon")
        if lat is None and "center" in el:  # way/relation
            lat = el["center"].get("lat")
            lon = el["center"].get("lon")
        return {
            "osm_type": el.get("type", ""),
            "osm_id": el.get("id"),
            "lat": lat,
            "lon": lon,
            "tags": tags,
        }

    # ------------------------------------------------------------------ #
    # Низкоуровневый запрос с ретраями и понятными ошибками
    # ------------------------------------------------------------------ #
    def _request_json(
        self,
        method: str,
        url: str,
        *,
        service: str,
        params: dict[str, Any] | None = None,
        data: dict[str, Any] | None = None,
    ) -> Any:
        last_error: Exception | None = None
        for attempt in range(self.max_retries + 1):
            try:
                response = self._session.request(
                    method, url, params=params, data=data, timeout=self.timeout
                )
            except requests.RequestException as exc:
                last_error = OSMError(f"{service}: сетевая ошибка: {exc}")
                if attempt < self.max_retries:
                    self._sleep_backoff(attempt)
                    continue
                raise last_error from exc

            if response.status_code == 200:
                try:
                    return response.json()
                except ValueError as exc:
                    # Overpass при перегрузке иногда отдаёт текст, а не JSON.
                    last_error = OSMError(
                        f"{service}: неожиданный ответ (не JSON). "
                        f"Возможно, сервер перегружен. Тело: {response.text[:200]}"
                    )
                    if attempt < self.max_retries:
                        self._sleep_backoff(attempt)
                        continue
                    raise last_error from exc

            # 429 (лимит), 504/502 (перегрузка Overpass) — временные, ретраим.
            if response.status_code in (429, 502, 503, 504):
                last_error = OSMError(
                    f"{service}: сервер занят или превышен лимит "
                    f"(HTTP {response.status_code}). Повтор..."
                )
                if attempt < self.max_retries:
                    self._sleep_backoff(attempt, response)
                    continue
                raise OSMError(
                    f"{service}: сервер недоступен после {self.max_retries} попыток "
                    f"(HTTP {response.status_code}). Попробуйте позже."
                )

            raise OSMError(
                f"{service}: ошибка HTTP {response.status_code}: "
                f"{response.text[:200]}"
            )

        if last_error:
            raise last_error
        raise OSMError(f"{service}: неизвестная ошибка запроса.")

    def _sleep_backoff(
        self, attempt: int, response: requests.Response | None = None
    ) -> None:
        if response is not None:
            retry_after = response.headers.get("Retry-After")
            if retry_after and retry_after.isdigit():
                time.sleep(int(retry_after))
                return
        time.sleep(self.backoff_base * (2 ** attempt) + random.uniform(0, 0.5))
