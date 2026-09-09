#!/usr/bin/env bash
# ============================================================
#  Запуск бота Profi Time на Linux/macOS/Termux.
#  Первый запуск сам создаст окружение и поставит зависимости.
# ============================================================
set -u
cd "$(dirname "$0")"

if [ ! -f .env ]; then
    echo "[!] Не найден файл .env"
    echo "    Скопируйте .env.example в .env и впишите BOT_TOKEN и ADMIN_IDS."
    exit 1
fi

if [ ! -x .venv/bin/python ]; then
    echo "Первый запуск: создаю окружение..."
    python3 -m venv .venv || { echo "[!] Не найден python3"; exit 1; }
    .venv/bin/python -m pip install --quiet --upgrade pip
    # --timeout/--retries: на повільному з'єднанні стандартні 15 c
    # не вистачає на завантаження pydantic_core, і pip падає.
    .venv/bin/python -m pip install --quiet --timeout 120 --retries 10 -r requirements.txt
fi

# Бот упал (например, оборвался интернет) — поднимаем заново.
while true; do
    echo "=== Бот запускается. Остановка: Ctrl+C ==="
    .venv/bin/python bot.py
    echo "[!] Бот остановился. Перезапуск через 15 секунд..."
    sleep 15
done
