#!/usr/bin/env bash
#
# Оновлення бота на сервері.
#
# Запуск: sudo /opt/profitime-bot/profitime_bot/deploy/deploy.sh
#
# Порядок: копія бази -> зупинка -> оновлення коду -> залежності ->
# міграції -> запуск -> перевірка. Якщо на будь-якому кроці щось пішло
# не так — автоматично повертаємось на попередній коміт і піднімаємо
# бота з ним. База при відкаті НЕ чіпається: міграції лише додають
# колонки й таблиці, старий код їх просто не бачить.

set -uo pipefail

APP_DIR="${APP_DIR:-/opt/profitime-bot}"
BOT_DIR="${APP_DIR}/profitime_bot"
VENV="${APP_DIR}/venv"
SERVICE="profitime-bot"
DB_PATH="${DB_PATH:-/var/lib/profitime-bot/bot.db}"

log()  { echo -e "\n\033[1m==> $*\033[0m"; }
info() { echo "    $*"; }
die()  { echo -e "\n\033[31mПОМИЛКА: $*\033[0m" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "запускати через sudo"
[ -d "$BOT_DIR" ] || die "не знайдено ${BOT_DIR}"

cd "$APP_DIR" || die "не вдалося зайти в ${APP_DIR}"

# --- 0. Запам'ятати, куди відкочуватись ---
PREVIOUS="$(sudo -u botuser git rev-parse HEAD)"
info "поточна версія: ${PREVIOUS:0:8}"

rollback() {
    echo -e "\n\033[33m=== ВІДКАТ на ${PREVIOUS:0:8} ===\033[0m"
    sudo -u botuser git reset --hard "$PREVIOUS" >/dev/null 2>&1
    sudo -u botuser "$VENV/bin/pip" install -q -r "$BOT_DIR/requirements.txt" 2>/dev/null
    systemctl start "$SERVICE"
    sleep 5
    if systemctl is-active --quiet "$SERVICE"; then
        echo "Бот працює на попередній версії. Проблему видно тут:"
        echo "  sudo journalctl -u ${SERVICE} -n 60 --no-pager"
    else
        echo "Бот не піднявся навіть на старій версії — потрібне втручання:"
        echo "  sudo journalctl -u ${SERVICE} -n 60 --no-pager"
    fi
    exit 1
}

# --- 1. Резервна копія ---
log "Резервна копія бази"
if [ -f "$DB_PATH" ]; then
    sudo -u botuser "$BOT_DIR/deploy/backup.sh" || die "бекап не вдався — оновлення скасовано"
else
    info "бази ще немає, пропускаю"
fi

# --- 2. Зупинка ---
log "Зупиняю бота"
systemctl stop "$SERVICE"
info "зупинено"

# --- 3. Код ---
log "Оновлюю код"
sudo -u botuser git fetch --all --quiet || { systemctl start "$SERVICE"; die "git fetch не вдався"; }

BRANCH="$(sudo -u botuser git rev-parse --abbrev-ref HEAD)"
sudo -u botuser git reset --hard "origin/${BRANCH}" --quiet || rollback

NEW="$(sudo -u botuser git rev-parse HEAD)"
if [ "$NEW" = "$PREVIOUS" ]; then
    info "нових комітів немає, версія та сама"
else
    info "оновлено: ${PREVIOUS:0:8} -> ${NEW:0:8}"
    sudo -u botuser git --no-pager log --oneline "${PREVIOUS}..${NEW}" | sed 's/^/    /'
fi

# --- 4. Залежності ---
log "Перевіряю залежності"
sudo -u botuser "$VENV/bin/pip" install -q --upgrade -r "$BOT_DIR/requirements.txt" || rollback
info "готово"

# --- 5. Міграції ---
# Бот застосовує їх сам на старті, але краще впасти тут і відкотитись,
# ніж піднятися зі зламаною схемою.
log "Застосовую міграції"
sudo -u botuser \
    DB_PATH="$DB_PATH" \
    "$VENV/bin/python" -c "
import asyncio, sys
sys.path.insert(0, '${BOT_DIR}')
from database import db
asyncio.run(db.init_db())
print('    схема актуальна')
" || rollback

# --- 6. Запуск ---
log "Запускаю бота"
systemctl start "$SERVICE"
sleep 6

systemctl is-active --quiet "$SERVICE" || rollback

# --- 7. Перевірка, що він справді працює ---
# Активний сервіс ще нічого не означає: процес міг піднятися й одразу
# впасти в цикл рестартів. Дивимось у лог рядок про успішний старт.
log "Перевіряю, що бот вийшов на зв'язок"
for _ in $(seq 1 10); do
    if journalctl -u "$SERVICE" --since "-2 min" --no-pager 2>/dev/null | grep -q "запущено"; then
        info "бот на зв'язку"
        BOT_OK=1
        break
    fi
    sleep 3
done

if [ "${BOT_OK:-0}" -ne 1 ]; then
    echo "    бот не повідомив про успішний старт за 30 c"
    rollback
fi

cat <<DONE

────────────────────────────────────────────
  Оновлення завершено.

  Версія:  ${NEW:0:8}
  Статус:  sudo systemctl status ${SERVICE}
  Логи:    sudo journalctl -u ${SERVICE} -f
────────────────────────────────────────────

Перевірте бота в Telegram: /start
DONE
