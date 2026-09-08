#!/usr/bin/env bash
#
# Відновлення бази з резервної копії.
#
# Запуск:  sudo /opt/profitime-bot/profitime_bot/deploy/restore.sh
#          sudo ./restore.sh /var/backups/profitime-bot/bot-2026-08-25_0400.db.gz
#
# Без аргументу показує список копій і дає обрати.
#
# Операція незворотна для поточної бази, тому:
#   1) вимагає підтвердження словом;
#   2) перед заміною відкладає поточну базу вбік — якщо відновилися не з тієї
#      копії, повернутись назад можна.

set -euo pipefail

DB_PATH="${DB_PATH:-/var/lib/profitime-bot/bot.db}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/profitime-bot}"
SERVICE="profitime-bot"

log() { echo "$(date '+%H:%M:%S') | restore | $*"; }
die() { echo "ПОМИЛКА: $*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "запускати через sudo"
command -v sqlite3 >/dev/null 2>&1 || die "не встановлено sqlite3"

# --- Обрати копію ---
ARCHIVE="${1:-}"

if [ -z "$ARCHIVE" ]; then
    mapfile -t LIST < <(ls -1t "${BACKUP_DIR}"/bot-*.db.gz 2>/dev/null || true)
    [ "${#LIST[@]}" -gt 0 ] || die "у ${BACKUP_DIR} немає жодної копії"

    echo
    echo "Доступні копії (найсвіжіша перша):"
    echo
    for i in "${!LIST[@]}"; do
        printf "  %2d) %s  (%s)\n" \
            "$((i + 1))" \
            "$(basename "${LIST[$i]}")" \
            "$(du -h "${LIST[$i]}" | cut -f1)"
    done
    echo
    read -rp "Номер копії [1]: " CHOICE
    CHOICE="${CHOICE:-1}"
    INDEX=$((CHOICE - 1))
    [ "$INDEX" -ge 0 ] && [ "$INDEX" -lt "${#LIST[@]}" ] || die "немає такого номера"
    ARCHIVE="${LIST[$INDEX]}"
fi

[ -f "$ARCHIVE" ] || die "файл не знайдено: $ARCHIVE"

# --- Розпакувати в тимчасовий файл і перевірити ---
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

log "розпаковую $(basename "$ARCHIVE")"
gunzip -c "$ARCHIVE" > "${TMP}/restored.db" || die "не вдалося розпакувати"

CHECK="$(sqlite3 "${TMP}/restored.db" 'PRAGMA integrity_check;' 2>&1 || true)"
[ "$CHECK" = "ok" ] || die "копія пошкоджена (${CHECK}) — візьміть іншу"

REQUESTS="$(sqlite3 "${TMP}/restored.db" 'SELECT COUNT(*) FROM requests;' 2>/dev/null || echo '?')"
USERS="$(sqlite3 "${TMP}/restored.db" 'SELECT COUNT(*) FROM users;' 2>/dev/null || echo '?')"
VERSION="$(sqlite3 "${TMP}/restored.db" 'SELECT MAX(version) FROM schema_version;' 2>/dev/null || echo '?')"

# --- Що зараз у робочій базі ---
CUR_REQUESTS="—"
if [ -f "$DB_PATH" ]; then
    CUR_REQUESTS="$(sqlite3 "$DB_PATH" 'SELECT COUNT(*) FROM requests;' 2>/dev/null || echo '?')"
fi

cat <<INFO

────────────────────────────────────────────
  ВІДНОВЛЕННЯ БАЗИ

  Із копії:   $(basename "$ARCHIVE")
              заявок: ${REQUESTS}, клієнток: ${USERS}, версія схеми: ${VERSION}

  Замінює:    ${DB_PATH}
              заявок зараз: ${CUR_REQUESTS}

  Усе, що з'явилося після цієї копії, буде втрачено.
────────────────────────────────────────────

INFO

read -rp 'Щоб продовжити, введіть слово ВІДНОВИТИ: ' CONFIRM
[ "$CONFIRM" = "ВІДНОВИТИ" ] || { echo "Скасовано."; exit 0; }

# --- Зупинити бота ---
if systemctl is-active --quiet "$SERVICE"; then
    log "зупиняю $SERVICE"
    systemctl stop "$SERVICE"
    STARTED=1
else
    STARTED=0
fi

# --- Відкласти поточну базу вбік ---
if [ -f "$DB_PATH" ]; then
    ASIDE="${DB_PATH}.before-restore-$(date +%Y%m%d_%H%M%S)"
    mv "$DB_PATH" "$ASIDE"
    # WAL і shm без основного файлу лише заважатимуть.
    rm -f "${DB_PATH}-wal" "${DB_PATH}-shm"
    log "поточну базу відкладено: ${ASIDE}"
fi

# --- Поставити відновлену ---
install -o botuser -g botuser -m 640 "${TMP}/restored.db" "$DB_PATH"
log "базу відновлено з $(basename "$ARCHIVE")"

# --- Підняти бота ---
if [ "$STARTED" -eq 1 ]; then
    systemctl start "$SERVICE"
    sleep 3
    if systemctl is-active --quiet "$SERVICE"; then
        log "бот запущено"
    else
        echo
        echo "Бот не піднявся. Подивіться причину:"
        echo "  sudo journalctl -u ${SERVICE} -n 50 --no-pager"
        exit 1
    fi
fi

cat <<DONE

Готово. Перевірте бота в Telegram: надішліть /start.

Якщо відновилися не з тієї копії — стара база нікуди не зникла:
  ${ASIDE:-(попередньої бази не було)}

DONE
