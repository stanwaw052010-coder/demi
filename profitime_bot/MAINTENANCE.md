# Обслуговування бота — для розробника

Оновлення, зміна контенту, відновлення з копії, діагностика,
оцінка ресурсів.

---

## Де що лежить

```
/opt/profitime-bot/                 код (git-репозиторій)
├── venv/                           Python-оточення
└── profitime_bot/
    ├── .env                        секрети, права 600
    ├── config.py                   ⭐ увесь контент і ціни
    ├── utils/texts.py              ⭐ усі тексти екранів
    └── deploy/                     скрипти

/var/lib/profitime-bot/bot.db       база — заявки, клієнтки, візити
/var/log/profitime-bot/             логи, heartbeat
/var/backups/profitime-bot/         14 останніх копій
/etc/systemd/system/profitime-bot.service
```

**Дані навмисно лежать поза каталогом коду.** Через це `git pull`,
`git reset --hard` і `deploy.sh` фізично не можуть зачепити базу
з заявками.

---

## Оновити код

```bash
sudo /opt/profitime-bot/profitime_bot/deploy/deploy.sh
```

Скрипт робить усе сам: копія бази → зупинка → `git fetch` + `reset --hard`
на origin поточної гілки → залежності → міграції → запуск → перевірка,
що бот вийшов на зв'язок.

**Якщо будь-який крок провалився — автоматичний відкат** на попередній
коміт і запуск зі старим кодом. База при відкаті не чіпається: міграції
лише додають колонки й таблиці, старий код їх просто не бачить.

---

## Змінити ціни або тексти

Майже все — в одному файлі.

```bash
sudo -u botuser nano /opt/profitime-bot/profitime_bot/config.py
sudo systemctl restart profitime-bot
```

| Що змінити | Де саме |
|---|---|
| Ціни та зони епіляції | `SERVICES_EPILATION` |
| Комплекси зон | `COMPLEXES` |
| Лазерне омолодження | `SERVICES_LASER_REJUV` |
| Фотоомолодження | `PHOTO_REJUV_PRICE`, `_PHOTO_REJUV_ZONES` |
| Графік роботи | `WORK_HOURS` |
| Адреса, телефон, Instagram, Bookon | вгорі файлу |
| Протипоказання, підготовка, догляд | `CONTRAINDICATIONS`, `PREP_RULES`, `AFTERCARE_RULES` |
| Питання-відповіді | `FAQ` |
| Акції | `PROMOTIONS` — або прямо з адмінки бота |

Тексти екранів (описи процедур, привітання) — `utils/texts.py`.

**Перевірте перед перезапуском**, що не зламали синтаксис:

```bash
sudo -u botuser /opt/profitime-bot/venv/bin/python -c \
  "import sys; sys.path.insert(0,'/opt/profitime-bot/profitime_bot'); import config; print('ok')"
```

> Правити краще локально, комітити в git і розкочувати через `deploy.sh` —
> тоді зміни не загубляться при наступному оновленні. Правка прямо на
> сервері переживе рестарт, але буде затерта найближчим `deploy.sh`.

### Повернути чоловічі зони

Вони не видалені — лежать закоментованим блоком у `config.py` під
`SERVICES_EPILATION`. Там же перелік місць в інтерфейсі, які треба
повернути разом із ними.

---

## Резервні копії

### Розклад

- **щодня о 04:00** — `backup.sh` через cron, зберігаються 14 останніх;
- **перед кожним `deploy.sh`** — окрема копія;
- **щопонеділка о 05:30** — свіжа копія летить адміну в Telegram.

Копія знімається через **SQLite Backup API**, а не `cp`. База працює в
режимі WAL: частина свіжих даних лежить у `bot.db-wal`, і звичайне
копіювання посеред запису дає або биту копію, або копію без останніх
заявок. Зупиняти бота не потрібно.

Кожна копія одразу перевіряється `PRAGMA integrity_check` — бита
видаляється, а не зберігається як «начебто бекап».

### Зробити копію руками

```bash
sudo -u botuser /opt/profitime-bot/profitime_bot/deploy/backup.sh
```

### Відновити з копії

```bash
sudo /opt/profitime-bot/profitime_bot/deploy/restore.sh
```

Без аргументів показує список копій. Вимагає ввести слово `ВІДНОВИТИ` —
операція незворотна для поточної бази. Поточна база не видаляється, а
відкладається вбік як `bot.db.before-restore-РРРРММДД_ГГХХСС`, тож якщо
відновились не з тієї копії — повернутись назад можна.

Можна вказати файл явно:

```bash
sudo ./restore.sh /var/backups/profitime-bot/bot-2026-09-08_040000.db.gz
```

### Відновити з копії, надісланої в Telegram

```bash
# завантажте файл із Telegram на комп'ютер, потім:
scp bot-2026-09-08_040000.db.gz root@IP:/var/backups/profitime-bot/
ssh root@IP
sudo /opt/profitime-bot/profitime_bot/deploy/restore.sh
```

---

## Логи

```bash
# наживо
sudo journalctl -u profitime-bot -f

# останні 200 рядків
sudo journalctl -u profitime-bot -n 200 --no-pager

# лише помилки
sudo journalctl -u profitime-bot -p err --no-pager

# за період
sudo journalctl -u profitime-bot --since "2026-09-08 10:00" --until "2026-09-08 12:00"

# файлові логи з ротацією (10 МБ × 5)
sudo tail -f /var/log/profitime-bot/bot.log

# логи бекапу і сторожа
sudo tail -50 /var/log/profitime-bot/backup.log
sudo tail -50 /var/log/profitime-bot/healthcheck.log
```

**Телефонів у логах немає.** Фільтр перетворює будь-який український
номер на `093***2058` — незалежно від того, хто і де його намагався
залогувати. Це не косметика: логи потрапляють у journald, у бекапи й у
скріншоти, і номер клієнтки там був би витоком.

---

## Діагностика

### Бот не відповідає

```bash
# 1. Чи запущений
systemctl is-active profitime-bot

# 2. Чи не завис (перевірка heartbeat)
/opt/profitime-bot/profitime_bot/deploy/healthcheck.sh --verbose

# 3. Що в лозі
sudo journalctl -u profitime-bot -n 50 --no-pager

# 4. Скільки пам'яті займає
systemctl status profitime-bot | grep Memory

# 5. Чи є зв'язок із Telegram
curl -s -o /dev/null -w "%{http_code}\n" https://api.telegram.org
```

### Бот перезапускається по колу

```bash
systemctl status profitime-bot
sudo journalctl -u profitime-bot -n 100 --no-pager | grep -i error
```

Найчастіше — зламаний `config.py` після правки або збита схема БД.
Найшвидший вихід: `deploy.sh` (він відкотиться сам) або `restore.sh`.

Якщо systemd здався після 5 спроб за 5 хвилин:

```bash
sudo systemctl reset-failed profitime-bot
sudo systemctl start profitime-bot
```

### Закінчується місце

```bash
df -h /
du -sh /var/backups/profitime-bot /var/log/profitime-bot /var/lib/profitime-bot

# найбільші файли
sudo du -ah / 2>/dev/null | sort -rh | head -20

# прибрати старі копії, лишивши 5
sudo ls -1t /var/backups/profitime-bot/*.gz | tail -n +6 | sudo xargs rm -f

# почистити журнал systemd
sudo journalctl --vacuum-time=7d
```

Бот сам попереджає адміна в Telegram, коли лишається менше 2 ГБ.

### Помилки в базі

```bash
sudo -u botuser sqlite3 /var/lib/profitime-bot/bot.db "PRAGMA integrity_check;"
# очікуємо: ok

# версія схеми
sudo -u botuser sqlite3 /var/lib/profitime-bot/bot.db "SELECT MAX(version) FROM schema_version;"

# скільки чого
sudo -u botuser sqlite3 /var/lib/profitime-bot/bot.db \
  "SELECT 'заявок', COUNT(*) FROM requests UNION ALL
   SELECT 'клієнток', COUNT(*) FROM users UNION ALL
   SELECT 'візитів', COUNT(*) FROM visits;"
```

Якщо `integrity_check` не `ok` — відновлюйтесь із копії, лагодити базу
руками довше й ризикованіше.

---

## Міграції схеми

Нова зміна структури — **новий рядок у кінці** `database/migrations.py`:

```python
(
    4,
    "Опис того, що додаємо",
    (
        "ALTER TABLE users ADD COLUMN telegram_username TEXT",
        "CREATE INDEX IF NOT EXISTS ix_users_uname ON users(telegram_username)",
    ),
),
```

Правила:

1. Номер — на одиницю більший за попередній.
2. **Уже випущену міграцію не змінювати ніколи.** На робочому сервері
   вона застосована, і правка туди не доїде — бази розійдуться.
3. Перевіряти на копії:
   ```bash
   cp /var/lib/profitime-bot/bot.db /tmp/test.db
   DB_PATH=/tmp/test.db /opt/profitime-bot/venv/bin/python \
     -c "import asyncio,sys; sys.path.insert(0,'/opt/profitime-bot/profitime_bot'); \
         from database import db; asyncio.run(db.init_db())"
   ```

Міграція йде однією транзакцією: або застосувалася повністю, або не
застосувалася зовсім. Проміжного стану не буває.

---

## Скільки ресурсів треба

### Пам'ять — заміряно

| Стан | RSS |
|---|---|
| Чистий Python | 19 МБ |
| + код бота, aiogram 3.31, APScheduler | 169 МБ |
| + диспетчер з усіма роутерами | 171 МБ |
| + 200 клієнток × 10 натискань | **171 МБ** |

Під навантаженням бот **не росте**: майже вся пам'ять — це aiogram із
pydantic v2, вони важкі самі по собі й займають своє одразу при імпорті.

У systemd стоїть `MemoryHigh=400M` і `MemoryMax=500M` — запас проти
робочих 171 МБ дворазовий. Стеля потрібна не для економії, а щоб при
витоку systemd прибив процес і перезапустив його, а не дав померти
всьому серверу.

**На 1 ГБ RAM бот працює**, але вільного лишається ~600 МБ на систему.
З 2 ГБ спокійніше.

### Розмір бази через рік

При 30 заявках на день:

| Що | Рядків за рік | Розмір |
|---|---|---|
| Заявки | ~11 000 | ~4,5 МБ |
| Візити | ~11 000 | ~3,5 МБ |
| Клієнтки | ~1 500 | ~0,3 МБ |
| Журнал помилок | чиститься за 30 днів | ~0,1 МБ |
| Індекси | | ~2,5 МБ |
| **Разом** | | **~11 МБ на рік** |

Копія в gzip — близько 2 МБ. Чотирнадцять копій — 30 МБ.

На диску 10 ГБ це не проблема **ніколи**: система займає ~3 ГБ, база
з копіями за п'ять років — менше 100 МБ.

### Коли цього сервера перестане вистачати

Вузьке місце — не процесор і не диск, а дві інші речі:

1. **Один потік запису в SQLite.** Записи серіалізовані глобальним
   замком. До ~50 одночасних активних діалогів це непомітно.
2. **Ліміт Telegram: 30 повідомлень за секунду.** Упреться при розсилці
   на кілька тисяч клієнток, а не в щоденній роботі.

Практичний орієнтир для 1 vCPU / 1 ГБ:

| Клієнток у базі | Заявок на день | Як буде |
|---|---|---|
| до 2 000 | до 50 | З великим запасом |
| 2 000 – 5 000 | 50 – 150 | Нормально |
| 5 000 – 15 000 | 150 – 400 | Треба 2 ГБ RAM; розсилка помітно повільніша |
| понад 15 000 | понад 400 | Час переїжджати |

Для однієї студії у Вишгороді верхня межа недосяжна: 30 заявок на день —
це вже дуже завантажений салон.

**Якщо все ж упреться**, у такому порядку:

1. **Більше RAM** (2 → 4 ГБ) — найдешевше й найшвидше.
2. **PostgreSQL замість SQLite** — знімає обмеження на паралельний запис.
   Шар запитів ізольований у `database/queries.py`, переписувати
   хендлери не доведеться.
3. **Webhook замість long polling** — знадобиться домен і SSL. Дає
   сенс лише від кількох тисяч апдейтів на хвилину.
4. **Винести розсилку в окремий процес** з чергою — щоб вона не
   заважала живим діалогам.

Перший пункт закриває питання років на кілька.

---

## Регулярне обслуговування

| Як часто | Що |
|---|---|
| Щотижня | Глянути щоденні зведення від бота — чи немає помилок |
| Щомісяця | `df -h`, перевірити, що копії робляться: `ls -la /var/backups/profitime-bot/` |
| Раз на квартал | Перевірити відновлення з копії на тестовій базі — бекап, який ніколи не відновлювали, це не бекап |
| Раз на пів року | `sudo apt update && sudo apt upgrade`, оновити залежності Python |

Безпекові оновлення ставляться самі — `unattended-upgrades` увімкнено.
