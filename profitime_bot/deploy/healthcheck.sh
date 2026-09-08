#!/usr/bin/env bash
#
# Сторож: перевіряє, що бот справді живий, і перезапускає його, якщо ні.
#
# Cron: */10 * * * *  (див. deploy/crontab)
#
# Навіщо, якщо є systemd. systemd бачить лише процес. Бот може «висіти
# живим»: процес у пам'яті є, Restart=always задоволений, а polling давно
# обірвався — і клієнтки пишуть у порожнечу. Тому бот раз на годину сам
# ставить позначку часу у файл, а цей скрипт дивиться, чи вона свіжа.
#
# Перевіряючий навмисно не залежить від бота: звичайний bash і файл.

set -uo pipefail

LOG_DIR="${LOG_DIR:-/var/log/profitime-bot}"
HEARTBEAT="${LOG_DIR}/heartbeat"
SERVICE="profitime-bot"

# Бот відмічається раз на годину. 2.5 години без позначки — це вже не
# затримка, а зависання. Запас потрібен, щоб не смикати сервіс через
# випадкову довгу паузу.
MAX_AGE_S=9000

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') | healthcheck | $*"; }

restart() {
    log "ПЕРЕЗАПУСК: $*"
    systemctl restart "$SERVICE"
    sleep 5
    if systemctl is-active --quiet "$SERVICE"; then
        log "сервіс піднявся"
    else
        log "сервіс НЕ піднявся — потрібне втручання"
    fi
}

# --- 1. Чи взагалі запущений сервіс ---
if ! systemctl is-active --quiet "$SERVICE"; then
    # systemd міг здатися після StartLimitBurst — тоді потрібен reset.
    systemctl reset-failed "$SERVICE" 2>/dev/null || true
    restart "сервіс не запущений"
    exit 0
fi

# --- 2. Чи свіжа позначка життя ---
if [ ! -f "$HEARTBEAT" ]; then
    # Бот щойно стартував і ще не встиг відмітитися — це не привід смикати.
    UPTIME_S="$(systemctl show "$SERVICE" -p ActiveEnterTimestampMonotonic --value)"
    NOW_MONO="$(awk '{printf "%d", $1 * 1000000}' /proc/uptime)"
    if [ -n "$UPTIME_S" ] && [ "$UPTIME_S" -gt 0 ] 2>/dev/null; then
        ALIVE_S=$(( (NOW_MONO - UPTIME_S) / 1000000 ))
        if [ "$ALIVE_S" -lt 300 ]; then
            log "позначки ще немає, сервіс працює ${ALIVE_S} c — чекаємо"
            exit 0
        fi
    fi
    restart "файл heartbeat відсутній"
    exit 0
fi

STAMP="$(head -n1 "$HEARTBEAT" 2>/dev/null || echo 0)"
case "$STAMP" in
    ''|*[!0-9]*) restart "не вдалося прочитати heartbeat"; exit 0 ;;
esac

AGE=$(( $(date +%s) - STAMP ))

if [ "$AGE" -gt "$MAX_AGE_S" ]; then
    restart "бот не відмічався ${AGE} c (ліміт ${MAX_AGE_S})"
    exit 0
fi

# Тиха відповідь: у cron немає сенсу писати в лог щодесять хвилин,
# що все добре. Побачити стан вручну можна з --verbose.
if [ "${1:-}" = "--verbose" ]; then
    log "усе гаразд, остання позначка ${AGE} c тому"
fi
