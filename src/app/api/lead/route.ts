import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  name?: string;
  phone?: string;
  service?: string;
  comment?: string;
  /** honeypot — заповнюють лише боти */
  website?: string;
};

const MAX = { name: 80, phone: 24, service: 80, comment: 800 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Приймає заявку з форми.
 *
 * Доставка вмикається змінними середовища (див. .env.example):
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID — надсилає повідомлення в Telegram студії;
 *   LEAD_WEBHOOK_URL                      — POST JSON у будь-яку CRM / Zapier / Make.
 *
 * Якщо жодна не задана, заявка лише логується, а відповідь містить
 * `delivered: false` — інтерфейс чесно пропонує подзвонити або написати в Instagram.
 */
export async function POST(request: Request) {
  let body: Lead;
  try {
    body = (await request.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "Некоректний формат запиту." }, { status: 400 });
  }

  if (clean(body.website, 100)) {
    // мовчазний успіх для ботів
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const service = clean(body.service, MAX.service) || "Консультація";
  const comment = clean(body.comment, MAX.comment);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Вкажіть, будь ласка, ваше ім'я." }, { status: 422 });
  }
  if (!/^[+0-9()\s-]{9,20}$/.test(phone)) {
    return NextResponse.json({ ok: false, error: "Перевірте номер телефону." }, { status: 422 });
  }

  const lead = { name, phone, service, comment, receivedAt: new Date().toISOString() };

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChat = process.env.TELEGRAM_CHAT_ID;
  const webhook = process.env.LEAD_WEBHOOK_URL;

  let delivered = false;

  try {
    if (telegramToken && telegramChat) {
      const text = [
        `<b>Нова заявка · ${site.name}</b>`,
        `Ім'я: ${name}`,
        `Телефон: ${phone}`,
        `Послуга: ${service}`,
        comment ? `Коментар: ${comment}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: telegramChat, text, parse_mode: "HTML" }),
      });
      delivered = res.ok;
    } else if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      delivered = res.ok;
    } else {
      console.info("[lead] Канал доставки не налаштовано:", lead);
    }
  } catch (error) {
    console.error("[lead] Помилка доставки:", error);
    delivered = false;
  }

  return NextResponse.json({ ok: true, delivered });
}
