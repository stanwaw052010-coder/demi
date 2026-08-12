@echo off
rem ============================================================
rem  Profi Time bot launcher.
rem
rem  ВНИМАНИЕ: весь текст в этом файле только латиницей.
rem  Windows читает .bat не в UTF-8, и кириллица здесь ломает
rem  разбор команд — строки распадаются и cmd пытается выполнить
rem  куски слов как команды.
rem  Комментарии после rem безопасны, а вот echo — только ASCII.
rem ============================================================

setlocal
chcp 65001 >nul 2>&1
cd /d "%~dp0"
title Profi Time bot

if not exist ".env" (
    echo.
    echo [!] File .env not found.
    echo     Copy .env.example to .env and fill BOT_TOKEN and ADMIN_IDS.
    echo.
    pause
    exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
    echo.
    echo First run: creating virtual environment...
    python -m venv .venv
    if not exist ".venv\Scripts\python.exe" (
        echo.
        echo [!] Python not found or venv failed.
        echo     Install Python from python.org
        echo     and CHECK the box "Add python.exe to PATH".
        echo.
        pause
        exit /b 1
    )
    echo Installing dependencies, please wait...
    ".venv\Scripts\python.exe" -m pip install --quiet --upgrade pip
    ".venv\Scripts\python.exe" -m pip install --quiet -r requirements.txt
    echo Done.
)

:run
echo.
echo ============================================
echo   Bot is starting. Do NOT close this window.
echo   Stop: Ctrl+C
echo ============================================
echo.
".venv\Scripts\python.exe" bot.py

echo.
echo [!] Bot stopped. Restarting in 15 seconds...
echo     To exit completely, just close this window.
timeout /t 15 /nobreak >nul
goto run
