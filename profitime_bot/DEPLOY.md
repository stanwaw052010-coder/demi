# Розгортання бота Profi Time на сервері

Покрокова інструкція від щойно купленого VPS до бота, який працює 24/7.
Кожна команда з поясненням, що вона робить.

Розраховано на **Ubuntu 22.04 або 24.04 LTS**. Загальний час — близько
40 хвилин, з них половина чекання, поки встановляться пакети.

---

## Що знадобиться перед початком

| Що | Де взяти |
|---|---|
| VPS з Ubuntu | Hetzner, Contabo, DigitalOcean. Локація — Німеччина / Польща / Нідерланди |
| IP-адреса сервера і пароль root | Лист від хостера після оплати |
| `BOT_TOKEN` | Telegram → **@BotFather** → `/newbot` → назва → нікнейм на `bot` |
| `ADMIN_IDS` | Telegram → **@userinfobot** → `/start` → рядок `Id` |

**Мінімальна конфігурація:** 1 vCPU, 1 ГБ RAM, 10 ГБ SSD.
**Рекомендована:** 2 vCPU, 2 ГБ RAM — бот займає ~170 МБ, і з 1 ГБ
запас невеликий (див. розділ «Скільки ресурсів треба» в MAINTENANCE.md).

Домен і SSL **не потрібні**: бот працює через long polling, тобто сам
ходить до Telegram. Вхідні порти йому не потрібні взагалі.

---

## Крок 1. Перше підключення

З вашого комп'ютера (Windows — PowerShell, Mac/Linux — термінал):

```bash
ssh root@IP_СЕРВЕРА
```

Замініть `IP_СЕРВЕРА` на адресу з листа хостера. На питання
`Are you sure you want to continue connecting?` відповідайте `yes`.
Далі введіть пароль root (при введенні пароля нічого не відображається —
це нормально).

Ви на сервері, якщо запрошення виглядає так: `root@ubuntu-2gb:~#`

---

## Крок 2. SSH-ключ замість пароля

Пароль можна підібрати, ключ — практично ні. Робимо це **до** всього
іншого, поки сервер порожній і не шкода почати спочатку.

### 2.1. Створити ключ на своєму комп'ютері

Відкрийте **новий** термінал у себе (не на сервері) і виконайте:

```bash
ssh-keygen -t ed25519 -C "profitime-bot"
```

Тричі натисніть Enter (шлях за замовчуванням, без пароля на ключ).
Ключ створено: `~/.ssh/id_ed25519` (таємний) і `~/.ssh/id_ed25519.pub`
(відкритий).

> Якщо ключ уже є — не створюйте новий, використайте наявний.

### 2.2. Скопіювати ключ на сервер

```bash
ssh-copy-id root@IP_СЕРВЕРА
```

Якщо `ssh-copy-id` немає (буває на Windows):

```bash
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@IP_СЕРВЕРА "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 2.3. Перевірити, що ключ працює

```bash
ssh root@IP_СЕРВЕРА
```

Якщо зайшли **без запиту пароля** — усе добре. Якщо пароль питає,
далі не йдіть: вимкнувши вхід по паролю зараз, ви замкнете себе зовні.

---

## Крок 3. Заборонити вхід по паролю

Тільки після того, як крок 2.3 спрацював.

На сервері:

```bash
nano /etc/ssh/sshd_config
```

Знайдіть і виправте три рядки (Ctrl+W — пошук у nano). Якщо рядок
починається з `#`, приберіть решітку:

```
PermitRootLogin prohibit-password
PasswordAuthentication no
PubkeyAuthentication yes
```

Збережіть: `Ctrl+O` → Enter → `Ctrl+X`.

Перевірте конфіг **до** перезапуску — помилка тут відрізає доступ:

```bash
sshd -t && echo "конфіг правильний"
```

Якщо написало «конфіг правильний»:

```bash
systemctl restart ssh
```

**Не закривайте це вікно.** Відкрийте друге й спробуйте зайти
знову — якщо вдалося, перше можна закривати.

---

## Крок 4. Автоматичне налаштування

Далі все робить один скрипт. Він встановлює swap, часовий пояс, пакети,
файрвол, fail2ban, створює користувача `botuser`, клонує код, ставить
Python-оточення, systemd і cron.

```bash
curl -fsSL https://raw.githubusercontent.com/stanwaw052010-coder/demi/claude/telegram-beauty-booking-bot-jkh92h/profitime_bot/deploy/install.sh -o install.sh
less install.sh
```

> `less` відкриває скрипт для перегляду — прогорніть, подивіться, що він
> робить. Вихід — клавіша `q`. Запускати з інтернету скрипт, який ви не
> читали, — погана звичка.

Запуск:

```bash
bash install.sh
```

Займає 5–15 хвилин. Що відбувається — видно на екрані по кроках.

<details>
<summary>Якщо не хочете скриптом — те саме руками</summary>

```bash
# swap (обов'язково: на 1 ГБ RAM pip падає з "Killed")
fallocate -l 2G /swapfile && chmod 600 /swapfile
mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# часовий пояс — від нього залежать нагадування клієнткам
timedatectl set-timezone Europe/Kyiv

# пакети
apt update && apt upgrade -y
apt install -y python3 python3-venv python3-pip git sqlite3 ufw fail2ban unattended-upgrades

# файрвол: боту вхідні порти не потрібні, лишаємо тільки SSH
ufw default deny incoming && ufw default allow outgoing
ufw allow OpenSSH && ufw --force enable

# fail2ban
systemctl enable --now fail2ban

# користувач без sudo
adduser --system --group --disabled-password --shell /bin/bash --home /home/botuser botuser

# каталоги: код, дані, логи й копії окремо
mkdir -p /opt/profitime-bot /var/lib/profitime-bot /var/log/profitime-bot /var/backups/profitime-bot
chown -R botuser:botuser /opt/profitime-bot /var/lib/profitime-bot /var/log/profitime-bot /var/backups/profitime-bot

# код
sudo -u botuser git clone --branch claude/telegram-beauty-booking-bot-jkh92h \
    https://github.com/stanwaw052010-coder/demi.git /opt/profitime-bot
sudo -u botuser python3 -m venv /opt/profitime-bot/venv
sudo -u botuser /opt/profitime-bot/venv/bin/pip install -r /opt/profitime-bot/profitime_bot/requirements.txt

# systemd і cron
install -m 644 /opt/profitime-bot/profitime_bot/deploy/profitime-bot.service /etc/systemd/system/
systemctl daemon-reload && systemctl enable profitime-bot
crontab /opt/profitime-bot/profitime_bot/deploy/crontab
```
</details>

---

## Крок 5. Секрети

Скрипт навмисно не питає токен — його треба вписати руками.

```bash
sudo -u botuser cp /opt/profitime-bot/profitime_bot/.env.example \
                   /opt/profitime-bot/profitime_bot/.env
sudo -u botuser nano /opt/profitime-bot/profitime_bot/.env
```

Заповніть два рядки:

```
BOT_TOKEN=7123456789:AAG...ваш токен від BotFather
ADMIN_IDS=123456789,987654321
```

`ADMIN_IDS` — ваш Id і Аннин, через кому. Ці люди отримуватимуть заявки
й матимуть доступ до адмінки.

Збережіть (`Ctrl+O`, Enter, `Ctrl+X`) і закрийте файл від чужих очей:

```bash
chmod 600 /opt/profitime-bot/profitime_bot/.env
chown botuser:botuser /opt/profitime-bot/profitime_bot/.env
```

> `600` означає «читати й писати може тільки власник». Токен — це
> повний доступ до бота: хто його має, той може писати від імені студії.

---

## Крок 6. Запуск

```bash
systemctl start profitime-bot
systemctl status profitime-bot
```

Має бути зелене `active (running)`. Вихід зі `status` — клавіша `q`.

Подивіться перші секунди роботи:

```bash
journalctl -u profitime-bot -n 30 --no-pager
```

Шукайте рядок:

```
Бот @ваш_бот запущено. Студія: Profi Time
```

Тепер відкрийте Telegram, знайдіть бота за нікнеймом і надішліть `/start`.
Він має відповісти головним меню.

---

## Крок 7. Перевірка, що все справді працює

Пройдіть по пунктах — це і є приймання роботи.

```bash
# 1. Бот запущений
systemctl is-active profitime-bot
# очікуємо: active

# 2. Автозапуск при перезавантаженні увімкнено
systemctl is-enabled profitime-bot
# очікуємо: enabled

# 3. Часовий пояс правильний
timedatectl | grep "Time zone"
# очікуємо: Europe/Kyiv

# 4. Swap на місці
free -h | grep -i swap
# очікуємо: 2.0Gi

# 5. Файрвол працює, відкритий тільки SSH
ufw status
# очікуємо: Status: active, у списку лише OpenSSH

# 6. База створена
ls -la /var/lib/profitime-bot/
# очікуємо: bot.db

# 7. Завдання cron встановлені
crontab -l | grep -c profitime
# очікуємо: 3

# 8. Бекап працює — запустіть руками, не чекаючи 04:00
sudo -u botuser /opt/profitime-bot/profitime_bot/deploy/backup.sh
ls -la /var/backups/profitime-bot/
# очікуємо: файл bot-РРРР-ММ-ДД_ГГХХСС.db.gz

# 9. Сторож бачить бота живим
/opt/profitime-bot/profitime_bot/deploy/healthcheck.sh --verbose
# очікуємо: "усе гаразд"
```

**Головна перевірка — перезавантаження.** Бот має піднятися сам:

```bash
reboot
```

Зачекайте хвилину, зайдіть знову і перевірте:

```bash
ssh root@IP_СЕРВЕРА
systemctl is-active profitime-bot
```

Якщо `active` — розгортання завершено.

---

## Керування ботом

```bash
# запустити
sudo systemctl start profitime-bot

# зупинити
sudo systemctl stop profitime-bot

# перезапустити (після зміни коду або .env)
sudo systemctl restart profitime-bot

# статус: працює чи ні, скільки пам'яті, коли стартував
sudo systemctl status profitime-bot

# логи наживо — Ctrl+C для виходу
sudo journalctl -u profitime-bot -f

# останні 100 рядків
sudo journalctl -u profitime-bot -n 100 --no-pager

# логи за сьогодні
sudo journalctl -u profitime-bot --since today --no-pager

# лише помилки
sudo journalctl -u profitime-bot -p err --no-pager

# вимкнути автозапуск (бот більше не підніметься після перезавантаження)
sudo systemctl disable profitime-bot

# увімкнути назад
sudo systemctl enable profitime-bot
```

---

## Якщо щось пішло не так

### Бот не запускається

```bash
sudo journalctl -u profitime-bot -n 50 --no-pager
```

| Що в лозі | Причина | Що робити |
|---|---|---|
| `BOT_TOKEN не заповнений` | порожній `.env` | Крок 5 |
| `Telegram відхилив токен` | токен зіпсований | скопіюйте з @BotFather ще раз, цілком |
| `ADMIN_IDS не заповнений` | немає Id | @userinfobot → `/start` |
| `Permission denied` | права на каталоги | `sudo chown -R botuser:botuser /opt/profitime-bot /var/lib/profitime-bot` |
| `ModuleNotFoundError` | не встали залежності | `sudo -u botuser /opt/profitime-bot/venv/bin/pip install -r /opt/profitime-bot/profitime_bot/requirements.txt` |
| `Немає зв'язку з Telegram` | мережа сервера | `ping -c3 api.telegram.org` |

### Бот працює, але не відповідає

```bash
# чи не завис
/opt/profitime-bot/profitime_bot/deploy/healthcheck.sh --verbose

# чи не з'їв пам'ять
systemctl status profitime-bot | grep Memory

# просто перезапустити
sudo systemctl restart profitime-bot
```

### Втратили доступ по SSH

Заходьте через веб-консоль хостера (у Hetzner — Console, у DigitalOcean —
Recovery Console). Це прямий доступ до сервера повз SSH. Далі поверніть
`PasswordAuthentication yes` у `/etc/ssh/sshd_config` і `systemctl restart ssh`.

---

## Що далі

- **ADMIN.md** — інструкція для Анни: як користуватись адмінкою.
- **MAINTENANCE.md** — як оновити код, змінити ціни, відновити базу
  з копії, куди дивитись при проблемах.

Після розгортання лишається одне: заповнити реальні дані студії замість
заглушок. Перелік — у **CONTENT_TODO.md**.
