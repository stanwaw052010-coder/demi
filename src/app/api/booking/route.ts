import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, service, phone } = body;

    if (!name || !service || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const message =
      `📋 *Нова заявка — In.Style Salon*\n\n` +
      `👤 Ім'я: ${name}\n` +
      `💇 Послуга: ${service}\n` +
      `📞 Телефон: ${phone}`;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        }
      );
      if (!tgRes.ok) {
        console.error('Telegram error:', await tgRes.text());
      }
    } else {
      // Dev fallback — set TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID in .env.local
      console.log('[Booking received]', { name, service, phone });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
