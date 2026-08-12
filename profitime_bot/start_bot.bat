@echo off
rem ============================================================
rem  Запуск бота Profi Time одним двойным кликом.
rem  Файл должен лежать рядом с bot.py.
rem
rem  Первый запуск сам создаст виртуальное окружение и поставит
rem  зависимости — это займёт минуту. Дальше запуск мгновенный.
rem ============================================================

chcp 65001 >nul
cd /d "%~dp0"
title Profi Time bot

if not exist ".env" (
    echo.
    echo [!] Не найден файл .env
    echo     Скопируйте .env.example в .env и впишите BOT_TOKEN и ADMIN_IDS.
    echo.
    pause
    exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
    echo Первый запуск: создаю окружение...
    python -m venv .venv
    if errorlevel 1 (
        echo.
        echo [!] Python не найден. Установите его с python.org
        echo     и обязательно поставьте галочку "Add python.exe to PATH".
        echo.
        pause
        exit /b 1
    )
    echo Устанавливаю зависимости...
    ".venv\Scripts\python.exe" -m pip install --quiet --upgrade pip
    ".venv\Scripts\python.exe" -m pip install --quiet -r requirements.txt
)

:run
echo.
echo === Бот запускается. Это окно закрывать нельзя. ===
echo === Остановка: Ctrl+C ===
echo.
".venv\Scripts\python.exe" bot.py

rem Бот упал (например, оборвался интернет) — ждём и поднимаем заново.
echo.
echo [!] Бот остановился. Перезапуск через 15 секунд...
echo     Чтобы выйти совсем — закройте это окно.
timeout /t 15 /nobreak >nul
goto run
