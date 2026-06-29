import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, service, phone } = body;

    if (!name || !service || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const now = new Date();
    const kyivTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Kiev' }));
    const dateStr = kyivTime.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = kyivTime.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

    const errors: string[] = [];

    // ── 1. Google Sheets via Apps Script webhook ──────────────────────────────
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsUrl) {
      try {
        const gsRes = await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, service, phone, date: dateStr, time: timeStr }),
        });
        if (!gsRes.ok) {
          errors.push(`Sheets: ${gsRes.status}`);
          console.error('Google Sheets error:', await gsRes.text());
        }
      } catch (e) {
        errors.push('Sheets: network error');
        console.error('Google Sheets fetch error:', e);
      }
    }

    // ── 2. Telegram (optional, runs alongside Sheets) ─────────────────────────
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const message =
        `📋 *Нова заявка — In.Style Salon*\n\n` +
        `👤 Ім'я: ${name}\n` +
        `💇 Послуга: ${service}\n` +
        `📞 Телефон: ${phone}\n` +
        `🕐 ${dateStr} о ${timeStr}`;
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
        });
      } catch (e) {
        console.error('Telegram error:', e);
      }
    }

    // ── Dev fallback ──────────────────────────────────────────────────────────
    if (!sheetsUrl && !botToken) {
      console.log('[Booking]', { name, service, phone, date: dateStr, time: timeStr });
    }

    return NextResponse.json({ success: true, errors: errors.length ? errors : undefined });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
