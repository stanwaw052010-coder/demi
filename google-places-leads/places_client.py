"""Тонкая обёртка над Google Places API (New).

Документация:
  - Text Search:    https://developers.google.com/maps/documentation/places/web-service/text-search
  - Place Details:  https://developers.google.com/maps/documentation/places/web-service/place-details

Клиент работает только с официальным REST API (никакого скрапинга HTML).
Все запросы аутентифицируются заголовком ``X-Goog-Api-Key`` и ограничивают
набор возвращаемых полей через ``X-Goog-FieldMask`` — это напрямую влияет на
стоимость (чем меньше полей, тем дешевле тариф запроса).
"""

from __future__ import annotations

import random
import time
from dataclasses import dataclass
from typing import Any

import requests

BASE_URL = "https://places.googleapis.com/v1"

# Тарифицируемые поля для Text Search держим минимальными: нам нужен только
# идентификатор места и его название, а детали (сайт, телефон и т.д.) мы
# запрашиваем отдельно через Place Details.
TEXT_SEARCH_FIELD_MASK = (
    "places.id,"
    "places.displayName,"
    "places.primaryTypeDisplayName,"
    "nextPageToken"
)

# Поля, которые нужны для итогового CSV и для фильтрации по наличию сайта.
PLACE_DETAILS_FIELD_MASK = ",".join(
    [
        "id",
        "displayName",
        "formattedAddress",
        "nationalPhoneNumber",
        "internationalPhoneNumber",
        "websiteUri",
        "rating",
        "userRatingCount",
        "businessStatus",
        "primaryTypeDisplayName",
        "types",
        "googleMapsUri",
    ]
)


class PlacesAPIError(RuntimeError):
    """Ошибка, которую вернул Google Places API (понятная человеку)."""

    def __init__(self, status_code: int, status: str, message: str) -> None:
        self.status_code = status_code
        self.status = status
        self.message = message
        super().__init__(self._human_message())

    def _human_message(self) -> str:
        hints = {
            "API_KEY_INVALID": (
                "Неверный API-ключ. Проверьте переменную GOOGLE_MAPS_API_KEY "
                "и что ключ не имеет лишних ограничений."
            ),
            "PERMISSION_DENIED": (
                "Доступ запрещён. Убедитесь, что в Google Cloud Console включён "
                "«Places API (New)», а у ключа разрешено обращение к нему."
            ),
            "RESOURCE_EXHAUSTED": (
                "Превышена квота или лимит запросов. Проверьте квоты проекта и "
                "включён ли биллинг в Google Cloud Console."
            ),
            "INVALID_ARGUMENT": (
                "Неверные параметры запроса. Проверьте --location (город или "
                "«lat,lng») и другие аргументы."
            ),
            "NOT_FOUND": "Запрошенное место не найдено (возможно, устаревший place_id).",
        }
        # Google часто кладёт «невалидный ключ» в INVALID_ARGUMENT — уточняем
        # подсказку по тексту сообщения, чтобы она не сбивала с толку.
        message_lower = self.message.lower()
        if "api key" in message_lower or "api_key" in message_lower:
            hint = hints["API_KEY_INVALID"]
        elif "quota" in message_lower or "billing" in message_lower:
            hint = hints["RESOURCE_EXHAUSTED"]
        else:
            hint = hints.get(self.status, "")
        base = f"[{self.status_code} {self.status}] {self.message}"
        return f"{base}\n  → {hint}" if hint else base


@dataclass
class PlacesClient:
    """Клиент Places API (New) с ретраями и вменяемыми ошибками."""

    api_key: str
    language: str | None = None
    region: str | None = None
    max_retries: int = 5
    backoff_base: float = 1.0
    timeout: float = 30.0

    def __post_init__(self) -> None:
        if not self.api_key:
            raise ValueError("Не задан API-ключ (GOOGLE_MAPS_API_KEY).")
        self._session = requests.Session()

    # ------------------------------------------------------------------ #
    # Низкоуровневый запрос с обработкой ошибок и ретраями
    # ------------------------------------------------------------------ #
    def _request(
        self,
        method: str,
        path: str,
        *,
        field_mask: str,
        json_body: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        url = f"{BASE_URL}/{path}"
        headers = {
            "X-Goog-Api-Key": self.api_key,
            "X-Goog-FieldMask": field_mask,
            "Content-Type": "application/json",
        }

        last_error: Exception | None = None
        for attempt in range(self.max_retries + 1):
            try:
                response = self._session.request(
                    method,
                    url,
                    headers=headers,
                    json=json_body,
                    timeout=self.timeout,
                )
            except requests.RequestException as exc:
                # Сетевая ошибка — ретраим с экспоненциальной задержкой.
                last_error = exc
                if attempt < self.max_retries:
                    self._sleep_backoff(attempt)
                    continue
                raise PlacesAPIError(
                    0, "NETWORK_ERROR", f"Сетевая ошибка: {exc}"
                ) from exc

            if response.status_code == 200:
                return response.json()

            # 429 (rate limit) и 5xx — временные, ретраим.
            if response.status_code == 429 or 500 <= response.status_code < 600:
                last_error = self._error_from_response(response)
                if attempt < self.max_retries:
                    self._sleep_backoff(attempt, response)
                    continue
                raise last_error

            # Любой другой не-200 — ошибка, которую нет смысла ретраить.
            raise self._error_from_response(response)

        # Теоретически недостижимо, но на всякий случай.
        if last_error:
            raise last_error
        raise PlacesAPIError(0, "UNKNOWN", "Неизвестная ошибка запроса.")

    def _sleep_backoff(
        self, attempt: int, response: requests.Response | None = None
    ) -> None:
        # Уважаем заголовок Retry-After, если он есть.
        if response is not None:
            retry_after = response.headers.get("Retry-After")
            if retry_after and retry_after.isdigit():
                time.sleep(int(retry_after))
                return
        delay = self.backoff_base * (2 ** attempt) + random.uniform(0, 0.5)
        time.sleep(delay)

    @staticmethod
    def _error_from_response(response: requests.Response) -> PlacesAPIError:
        status = "UNKNOWN"
        message = response.text.strip() or "Пустой ответ от API."
        try:
            payload = response.json()
            err = payload.get("error", {})
            status = err.get("status", status)
            message = err.get("message", message)
        except ValueError:
            pass
        return PlacesAPIError(response.status_code, status, message)

    # ------------------------------------------------------------------ #
    # Text Search (New) с поддержкой пагинации через pageToken
    # ------------------------------------------------------------------ #
    def text_search(
        self,
        text_query: str,
        *,
        location: tuple[float, float] | None = None,
        radius: float | None = None,
        page_token: str | None = None,
        page_size: int = 20,
    ) -> tuple[list[dict[str, Any]], str | None]:
        """Один «страничный» запрос Text Search.

        Возвращает кортеж ``(список_мест, next_page_token)``. Чтобы собрать
        больше 20 результатов, вызывайте метод повторно, передавая полученный
        ``next_page_token``.
        """
        body: dict[str, Any] = {
            "textQuery": text_query,
            "pageSize": max(1, min(page_size, 20)),
        }
        if self.language:
            body["languageCode"] = self.language
        if self.region:
            body["regionCode"] = self.region

        # Circle для Text Search поддерживается только через locationBias.
        if location is not None and radius is not None:
            body["locationBias"] = {
                "circle": {
                    "center": {"latitude": location[0], "longitude": location[1]},
                    "radius": float(radius),
                }
            }

        # pageToken должен идти отдельно; при его наличии часть параметров
        # (textQuery и т.п.) всё равно требуется передавать — оставляем как есть.
        if page_token:
            body["pageToken"] = page_token

        data = self._request(
            "POST",
            "places:searchText",
            field_mask=TEXT_SEARCH_FIELD_MASK,
            json_body=body,
        )
        return data.get("places", []), data.get("nextPageToken")

    def iter_text_search(
        self,
        text_query: str,
        *,
        location: tuple[float, float] | None = None,
        radius: float | None = None,
        max_results: int = 60,
    ):
        """Генератор мест по всем страницам, пока не наберём ``max_results``."""
        collected = 0
        page_token: str | None = None
        seen: set[str] = set()

        while collected < max_results:
            places, page_token = self.text_search(
                text_query,
                location=location,
                radius=radius,
                page_token=page_token,
            )
            for place in places:
                place_id = place.get("id")
                if not place_id or place_id in seen:
                    continue
                seen.add(place_id)
                yield place
                collected += 1
                if collected >= max_results:
                    break

            if not page_token:
                break

    # ------------------------------------------------------------------ #
    # Place Details (New)
    # ------------------------------------------------------------------ #
    def place_details(self, place_id: str) -> dict[str, Any]:
        """Детали одного места (сайт, телефон, адрес, рейтинг и т.д.)."""
        return self._request(
            "GET",
            f"places/{place_id}",
            field_mask=PLACE_DETAILS_FIELD_MASK,
        )
