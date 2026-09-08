#!/usr/bin/env bash
#
# Щоденна резервна копія бази.
#
# Запуск: /opt/profitime-bot/profitime_bot/deploy/backup.sh
# Cron:   0 4 * * *  (див. deploy/crontab)
#
# Чому не `cp`. База працює в режимі WAL: частина свіжих даних лежить не
# у bot.db, а в bot.db-wal. Звичайне копіювання посеред запису дає або
# биту копію, або копію без останніх заявок. Команда `sqlite3 .backup`
# використовує SQLite Backup API — вона знімає узгоджений знімок навіть
# тоді, коли бот у цю секунду пише в базу. Зупиняти бота не потрібно.

set -euo pipefail

DB_PATH="${DB_PATH:-/var/lib/profitime-bot/bot.db}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/profitime-bot}"
KEEP="${BACKUP_KEEP:-14}"

# Секунди в імені обов'язкові: deploy.sh робить копію перед оновленням,
# і якщо воно збіглося з нічним cron, дві копії не мають затирати одна одну —
# саме та, що знята перед невдалим оновленням, найпотрібніша.
STAMP="$(date +%Y-%m-%d_%H%M%S)"
TARGET="${BACKUP_DIR}/bot-${STAMP}.db"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') | backup | $*"; }
die() { log "ПОМИЛКА: $*"; exit 1; }

command -v sqlite3 >/dev/null 2>&1 || die "не встановлено sqlite3 (sudo apt install sqlite3)"
[ -f "$DB_PATH" ] || die "база не знайдена: $DB_PATH"

mkdir -p "$BACKUP_DIR"

# --- Знімок ---
log "знімаю копію $DB_PATH"
sqlite3 "$DB_PATH" ".backup '${TARGET}'" || die "sqlite3 .backup не відпрацював"

# --- Перевірка, що копія ціла ---
# Робити бекап і не перевіряти його — те саме, що не робити бекап.
CHECK="$(sqlite3 "$TARGET" 'PRAGMA integrity_check;' 2>&1 || true)"
if [ "$CHECK" != "ok" ]; then
    rm -f "$TARGET"
    die "копія пошкоджена (integrity_check: ${CHECK})"
fi

ROWS="$(sqlite3 "$TARGET" 'SELECT COUNT(*) FROM requests;' 2>/dev/null || echo '?')"
log "копія ціла, заявок у ній: ${ROWS}"

# --- Стиснення ---
gzip -9 -f "$TARGET"
ARCHIVE="${TARGET}.gz"
SIZE="$(du -h "$ARCHIVE" | cut -f1)"
log "готово: ${ARCHIVE} (${SIZE})"

# --- Прибирання старих ---
# Лишаємо KEEP найсвіжіших, решту видаляємо.
mapfile -t OLD < <(ls -1t "${BACKUP_DIR}"/bot-*.db.gz 2>/dev/null | tail -n "+$((KEEP + 1))")
if [ "${#OLD[@]}" -gt 0 ]; then
    for file in "${OLD[@]}"; do
        rm -f "$file"
        log "видалено стару копію: $(basename "$file")"
    done
fi

TOTAL="$(ls -1 "${BACKUP_DIR}"/bot-*.db.gz 2>/dev/null | wc -l)"
log "копій у сховищі: ${TOTAL} (зберігаємо ${KEEP})"
