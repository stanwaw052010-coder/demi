"""
Звіти адміну: щоденна зведення та щотижнева копія бази.

Обидва завдання роблять те, чого не зробить жоден зовнішній моніторинг:
доносять стан сервера до людини, яка в сервери не заходить. Власниця
бачить, що бот живий і скільки заявок за добу; розробник — що з диском
і пам'яттю. Файл бази раз на тиждень летить у Telegram і стає безкоштовною
віддаленою копією на випадок, коли VPS зникне разом із локальними бекапами.
"""

from __future__ import annotations

import logging
from pathlib import Path

from aiogram import Bot
from aiogram.types import BufferedInputFile

import config
from database import queries
from utils import dt, health, tg

logger = logging.getLogger(__name__)

# Telegram не прийме документ більший за 50 МБ. База такого розміру
# означала б, що щось пішло дуже не так, але перевірка дешева.
MAX_UPLOAD_MB = 45


async def send_daily_report(bot: Bot) -> None:
    """Коротка зведення за добу. Йде всім адмінам увечері."""
    try:
        counters = await queries.daily_counters()
    except Exception:  # noqa: BLE001 — звіт не має гасити планувальник
        logger.exception("Не вдалося зібрати щоденний звіт")
        return

    free_gb, total_gb = health.memory_info()
    disk_gb = health.disk_free_gb()

    lines = [
        f"📊 <b>Зведення за добу</b> · {dt.now():%d.%m.%Y}",
        "",
        f"📝 Нових заявок: <b>{counters['new_requests']}</b>",
        f"✅ Підтверджено: <b>{counters['confirmed']}</b>",
    ]

    if counters["declined"]:
        lines.append(f"❌ Відхилено: <b>{counters['declined']}</b>")

    if counters["pending_now"]:
        lines.append(f"⏳ Чекають на відповідь: <b>{counters['pending_now']}</b>")

    lines.append("")

    if counters["errors"]:
        lines.append(f"🔴 Помилок за добу: <b>{counters['errors']}</b>")
    else:
        lines.append("🟢 Помилок немає")

    # Технічний блок. Власниці він не заважає, а розробнику дає зрозуміти
    # стан сервера без заходу по SSH.
    tech: list[str] = []
    if disk_gb >= 0:
        tech.append(f"диск {disk_gb:.1f} ГБ вільно")
    if free_gb >= 0:
        tech.append(f"RAM {free_gb:.1f} з {total_gb:.1f} ГБ вільно")
    tech.append(f"база {health.db_size_mb():.1f} МБ")
    lines.append(f"<i>{' · '.join(tech)}</i>")

    text = "\n".join(lines)

    for admin_id in config.ADMIN_IDS:
        await tg.safe_send(bot, admin_id, text)

    # Заразом прибираємо старі записи журналу помилок.
    try:
        removed = await queries.purge_old_errors()
        if removed:
            logger.info("Журнал помилок: видалено %s старих записів", removed)
    except Exception:  # noqa: BLE001
        logger.debug("Не вдалося почистити журнал помилок")

    await check_disk_space(bot)


async def check_disk_space(bot: Bot) -> None:
    """Попередити адміна, якщо на диску лишається менше порогу."""
    free_gb = health.disk_free_gb()
    if free_gb < 0 or free_gb >= config.DISK_ALERT_GB:
        return

    text = (
        "⚠️ <b>Мало місця на диску</b>\n\n"
        f"Вільно лише <b>{free_gb:.1f} ГБ</b>.\n\n"
        "Що зробити: перевірити старі резервні копії у "
        f"<code>{config.BACKUP_DIR}</code> та логи в "
        f"<code>{config.LOG_DIR}</code>.\n"
        "Докладніше — у MAINTENANCE.md, розділ «Закінчується місце»."
    )
    for admin_id in config.ADMIN_IDS:
        await tg.safe_send(bot, admin_id, text)


async def send_backup_to_admin(bot: Bot) -> None:
    """
    Надіслати адміну свіжу копію бази.

    Береться найновіший архів із каталогу бекапів — той, що зробив
    backup.sh через SQLite backup API. Якщо каталог порожній (бекап ще
    не відпрацював), нічого не робимо: слати сиру базу небезпечно, її
    можуть скопіювати посеред запису.
    """
    latest = _latest_backup()
    if latest is None:
        logger.warning("Немає жодної резервної копії для відправки — перевірте backup.sh")
        return

    size_mb = latest.stat().st_size / 1024 ** 2
    if size_mb > MAX_UPLOAD_MB:
        logger.warning("Копія %s завелика для Telegram (%.1f МБ)", latest.name, size_mb)
        for admin_id in config.ADMIN_IDS:
            await tg.safe_send(
                bot,
                admin_id,
                f"⚠️ Резервна копія виросла до {size_mb:.0f} МБ і не влазить у Telegram. "
                "Заберіть її з сервера вручну — див. MAINTENANCE.md.",
            )
        return

    try:
        payload = latest.read_bytes()
    except OSError as error:
        logger.error("Не вдалося прочитати копію %s: %s", latest, error)
        return

    document = BufferedInputFile(payload, filename=latest.name)
    caption = (
        "💾 <b>Резервна копія бази</b>\n"
        f"{dt.now():%d.%m.%Y}  ·  {size_mb:.1f} МБ\n\n"
        "<i>Збережіть це повідомлення. Якщо із сервером щось трапиться, "
        "бота можна підняти з цього файлу.</i>"
    )

    for admin_id in config.ADMIN_IDS:
        try:
            await bot.send_document(admin_id, document, caption=caption)
            logger.info("Копію %s надіслано адміну %s", latest.name, admin_id)
        except Exception:  # noqa: BLE001 — недоступний адмін не має гасити джобу
            logger.warning("Не вдалося надіслати копію адміну %s", admin_id)


def _latest_backup() -> Path | None:
    try:
        archives = sorted(
            config.BACKUP_DIR.glob("bot-*.db.gz"),
            key=lambda item: item.stat().st_mtime,
            reverse=True,
        )
    except OSError:
        return None
    return archives[0] if archives else None
