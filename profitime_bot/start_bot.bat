@echo off
rem ============================================================
rem  Profi Time bot launcher.
rem
rem  Rasschitan na zapusk dvoynym klikom iz Provodnika.
rem  Nichego nabirat v komandnoy stroke ne nuzhno: skript sam
rem  sozdast .env, otkroet ego v Bloknote, sozdast okruzhenie
rem  i postavit zavisimosti.
rem
rem  VNIMANIE: ves tekst v echo tolko latinicey.
rem  Windows chitaet .bat ne v UTF-8, i kirillica v echo lomaet
rem  razbor komand - stroki raspadayutsya i cmd pytaetsya
rem  vypolnit kuski slov kak komandy.
rem  Kommentarii posle rem bezopasny, a vot echo - tolko ASCII.
rem ============================================================

setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1
cd /d "%~dp0"
title Profi Time bot

rem ---------- 1. Proverka Python ----------
rem Delaem eto pervym: bez Pythona ostalnye shagi bessmyslenny.

python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ============================================
    echo   [!] Python ne nayden.
    echo ============================================
    echo.
    echo   1. Otkroyte https://python.org
    echo   2. Downloads - Download Python
    echo   3. VAZHNO: na pervom ekrane ustanovshchika
    echo      postavte galochku "Add python.exe to PATH"
    echo   4. Ustanovite i zapustite etot fayl snova
    echo.
    pause
    exit /b 1
)

rem ---------- 2. Fayl .env s tokenom ----------
rem V Provodnike sozdat fayl s imenem, nachinayushchimsya s tochki,
rem slozhno: Windows ne daet vvesti takoe imya. Poetomu delaem sami.

if not exist ".env" (
    if not exist ".env.example" (
        echo.
        echo [!] Ne nayden .env.example - arkhiv raspakovan ne polnostyu.
        echo.
        pause
        exit /b 1
    )

    copy ".env.example" ".env" >nul
    echo.
    echo ============================================
    echo   Pervyy zapusk: nuzhen token bota
    echo ============================================
    echo.
    echo   Seychas otkroetsya Bloknot s faylom .env
    echo.
    echo   Zapolnite dve stroki:
    echo     BOT_TOKEN=  - token ot @BotFather
    echo     ADMIN_IDS=  - vash Id ot @userinfobot
    echo.
    echo   Sokhranite (Ctrl+S) i zakroyte Bloknot.
    echo.
    pause
    notepad ".env"
)

rem Proveryaem, chto token deystvitelno vpisan, a ne ostalsya pustym.
findstr /r "^BOT_TOKEN=..*" ".env" >nul 2>&1
if errorlevel 1 (
    echo.
    echo [!] V fayle .env ne zapolnena stroka BOT_TOKEN.
    echo     Otkroyte .env, vpishite token posle znaka = bez probelov
    echo     i zapustite etot fayl snova.
    echo.
    pause
    exit /b 1
)

findstr /r "^ADMIN_IDS=..*" ".env" >nul 2>&1
if errorlevel 1 (
    echo.
    echo [!] V fayle .env ne zapolnena stroka ADMIN_IDS.
    echo     Napishite @userinfobot v Telegram, skopiruyte chislo Id
    echo     i vpishite ego posle znaka = bez probelov.
    echo.
    pause
    exit /b 1
)

rem ---------- 3. Okruzhenie i zavisimosti ----------

if not exist ".venv\Scripts\python.exe" (
    echo.
    echo Pervyy zapusk: gotovlyu okruzhenie, eto 2-3 minuty...
    python -m venv .venv
    if not exist ".venv\Scripts\python.exe" (
        echo.
        echo [!] Ne udalos sozdat okruzhenie.
        echo     Veroyatno, Python ustanovlen bez galochki
        echo     "Add python.exe to PATH". Pereustanovite s ney.
        echo.
        pause
        exit /b 1
    )
    echo Zagruzhayu biblioteki...
    ".venv\Scripts\python.exe" -m pip install --quiet --upgrade pip
    ".venv\Scripts\python.exe" -m pip install --quiet -r requirements.txt
    if errorlevel 1 (
        echo.
        echo [!] Ne udalos ustanovit zavisimosti.
        echo     Proverte internet i zapustite fayl snova.
        echo.
        pause
        exit /b 1
    )
    echo Gotovo.
)

rem ---------- 4. Zapusk ----------

:run
echo.
echo ============================================
echo   Bot rabotaet. NE zakryvayte eto okno.
echo   Ostanovit: Ctrl+C ili zakryt okno.
echo ============================================
echo.
".venv\Scripts\python.exe" bot.py

echo.
echo [!] Bot ostanovilsya. Perezapusk cherez 15 sekund...
echo     Chtoby vyyti sovsem - prosto zakroyte eto okno.
timeout /t 15 /nobreak >nul
goto run
