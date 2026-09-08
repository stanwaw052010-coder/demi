#!/usr/bin/env bash
#
# Первинне налаштування чистого сервера Ubuntu 22.04 / 24.04.
#
# Запуск від root на щойно створеному VPS:
#     bash install.sh
#
# Що робить: swap, часовий пояс, оновлення, файрвол, fail2ban, окремий
# користувач botuser, каталоги, Python-оточення, systemd, cron.
# SSH-ключі та заборону входу за паролем скрипт НЕ чіпає — це робиться
# руками в DEPLOY.md, бо помилка тут відрізає доступ до сервера.
#
# Скрипт можна запускати повторно: усі кроки ідемпотентні.

set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/stanwaw052010-coder/demi.git}"
REPO_BRANCH="${REPO_BRANCH:-claude/telegram-beauty-booking-bot-jkh92h}"

APP_DIR=/opt/profitime-bot
BOT_DIR="${APP_DIR}/profitime_bot"
DATA_DIR=/var/lib/profitime-bot
LOG_DIR=/var/log/profitime-bot
BACKUP_DIR=/var/backups/profitime-bot
BOT_USER=botuser

step() { echo -e "\n\033[1m==> $*\033[0m"; }
info() { echo "    $*"; }
die()  { echo -e "\033[31mПОМИЛКА: $*\033[0m" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "запускати від root"

# --------------------------------------------------------------------- #
step "1/10  Swap-файл на 2 ГБ"
# --------------------------------------------------------------------- #
# На сервері 1 ГБ RAM. Без swap `pip install` на етапі складання коліс
# падає з «Killed» — ядро вбиває процес за нестачею пам'яті. Swap потрібен
# саме для встановлення; у роботі бот у нього майже не заглядає.
if swapon --show | grep -q '/swapfile'; then
    info "swap уже є, пропускаю"
else
    fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile >/dev/null
    swapon /swapfile
    grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    # 10 означає «користуйся swap лише коли RAM справді закінчується».
    sysctl -q vm.swappiness=10
    grep -q 'vm.swappiness' /etc/sysctl.conf || echo 'vm.swappiness=10' >> /etc/sysctl.conf
    info "swap 2 ГБ увімкнено"
fi

# --------------------------------------------------------------------- #
step "2/10  Часовий пояс Europe/Kyiv"
# --------------------------------------------------------------------- #
# Від цього залежать нагадування клієнткам і час у cron.
timedatectl set-timezone Europe/Kyiv
info "$(date '+%Y-%m-%d %H:%M:%S %Z')"

# --------------------------------------------------------------------- #
step "3/10  Оновлення системи та пакети"
# --------------------------------------------------------------------- #
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq
apt-get install -y -qq \
    python3 python3-venv python3-pip \
    git sqlite3 ufw fail2ban unattended-upgrades curl
info "пакети встановлено"

PY_VERSION="$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')"
info "Python ${PY_VERSION}"
python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)' \
    || die "потрібен Python 3.11+, знайдено ${PY_VERSION}. Візьміть Ubuntu 22.04 або новішу."

# --------------------------------------------------------------------- #
step "4/10  Автоматичні оновлення безпеки"
# --------------------------------------------------------------------- #
cat > /etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF
systemctl enable --now unattended-upgrades >/dev/null 2>&1 || true
info "увімкнено"

# --------------------------------------------------------------------- #
step "5/10  Файрвол"
# --------------------------------------------------------------------- #
# Боту не потрібен жоден відкритий порт: long polling — це вихідні
# з'єднання. Лишаємо тільки SSH, інакше самі себе замкнемо.
ufw --force reset >/dev/null
ufw default deny incoming >/dev/null
ufw default allow outgoing >/dev/null
ufw allow OpenSSH >/dev/null
ufw --force enable >/dev/null
info "$(ufw status | head -3 | tr '\n' ' ')"

# --------------------------------------------------------------------- #
step "6/10  fail2ban для SSH"
# --------------------------------------------------------------------- #
cat > /etc/fail2ban/jail.local <<'EOF'
[sshd]
enabled  = true
port     = ssh
backend  = systemd
maxretry = 5
findtime = 600
bantime  = 3600
EOF
systemctl enable --now fail2ban >/dev/null 2>&1
info "увімкнено: 5 невдалих спроб — бан на годину"

# --------------------------------------------------------------------- #
step "7/10  Користувач botuser"
# --------------------------------------------------------------------- #
# Без sudo і без пароля: якщо бот колись буде скомпрометований,
# зловмисник опиниться в облікці, яка нічого не може.
if id "$BOT_USER" >/dev/null 2>&1; then
    info "користувач уже існує"
else
    adduser --system --group --disabled-password --shell /bin/bash \
            --home "/home/${BOT_USER}" "$BOT_USER" >/dev/null
    info "створено"
fi

# --------------------------------------------------------------------- #
step "8/10  Каталоги"
# --------------------------------------------------------------------- #
# Код, дані, логи й копії живуть окремо — оновлення коду не чіпає базу.
mkdir -p "$APP_DIR" "$DATA_DIR" "$LOG_DIR" "$BACKUP_DIR"
chown -R "${BOT_USER}:${BOT_USER}" "$APP_DIR" "$DATA_DIR" "$LOG_DIR" "$BACKUP_DIR"
chmod 750 "$DATA_DIR" "$BACKUP_DIR"
info "${APP_DIR} (код), ${DATA_DIR} (база), ${LOG_DIR} (логи), ${BACKUP_DIR} (копії)"

# --------------------------------------------------------------------- #
step "9/10  Код і Python-оточення"
# --------------------------------------------------------------------- #
if [ -d "${APP_DIR}/.git" ]; then
    info "репозиторій уже є, оновлюю"
    sudo -u "$BOT_USER" git -C "$APP_DIR" fetch --all --quiet
    sudo -u "$BOT_USER" git -C "$APP_DIR" checkout --quiet "$REPO_BRANCH"
    sudo -u "$BOT_USER" git -C "$APP_DIR" reset --hard "origin/${REPO_BRANCH}" --quiet
else
    info "клоную ${REPO_BRANCH}"
    sudo -u "$BOT_USER" git clone --quiet --branch "$REPO_BRANCH" "$REPO_URL" "$APP_DIR"
fi

[ -f "${BOT_DIR}/bot.py" ] || die "у репозиторії немає ${BOT_DIR}/bot.py — перевірте гілку"

if [ ! -x "${APP_DIR}/venv/bin/python" ]; then
    sudo -u "$BOT_USER" python3 -m venv "${APP_DIR}/venv"
fi
sudo -u "$BOT_USER" "${APP_DIR}/venv/bin/pip" install -q --upgrade pip
sudo -u "$BOT_USER" "${APP_DIR}/venv/bin/pip" install -q -r "${BOT_DIR}/requirements.txt"
info "залежності встановлено"

chmod +x "${BOT_DIR}"/deploy/*.sh

# --------------------------------------------------------------------- #
step "10/10  systemd і cron"
# --------------------------------------------------------------------- #
install -m 644 "${BOT_DIR}/deploy/profitime-bot.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable profitime-bot >/dev/null 2>&1
info "сервіс profitime-bot увімкнено (автозапуск при завантаженні)"

crontab "${BOT_DIR}/deploy/crontab"
info "завдання cron встановлено: бекап о 04:00, сторож кожні 10 хв"

# --------------------------------------------------------------------- #
cat <<FINAL

────────────────────────────────────────────────────────────
  Сервер налаштовано. Лишився один крок — секрети.

  1) Створіть файл .env:

       sudo -u ${BOT_USER} cp ${BOT_DIR}/.env.example ${BOT_DIR}/.env
       sudo -u ${BOT_USER} nano ${BOT_DIR}/.env

     Вписати BOT_TOKEN (від @BotFather) і ADMIN_IDS (від @userinfobot).

  2) Закрийте файл від чужих очей:

       sudo chmod 600 ${BOT_DIR}/.env
       sudo chown ${BOT_USER}:${BOT_USER} ${BOT_DIR}/.env

  3) Запустіть бота:

       sudo systemctl start profitime-bot
       sudo systemctl status profitime-bot

  4) Подивіться логи перших секунд:

       sudo journalctl -u profitime-bot -f

  ⚠️  Окремо, руками: SSH-ключі та заборона входу за паролем.
      Це в DEPLOY.md, крок 3. Скрипт цього не робить навмисно —
      помилка там відрізає доступ до сервера.
────────────────────────────────────────────────────────────

FINAL
