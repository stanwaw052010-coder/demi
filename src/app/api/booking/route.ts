import { NextRequest, NextResponse } from 'next/server';

const SERVICE_LABELS: Record<string, string> = {
  hair: '✂️ Волосся',
  manicure: '💅 Манікюр',
  brows: '👁 Брови',
  makeup: '✨ Макіяж',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, date, time, name, phone, comment } = body;

    if (!service || !date || !time || !name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const serviceLabel = SERVICE_LABELS[service] || service;
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}.${month}.${year}`;

    const message = [
      '📋 *Новий запис — In.Style Salon Krasy*',
      '',
      `👤 Ім'я: ${name}`,
      `📞 Телефон: ${phone}`,
      `💇 Послуга: ${serviceLabel}`,
      `📅 Дата: ${formattedDate}`,
      `🕐 Час: ${time}`,
      comment ? `💬 Коментар: ${comment}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!tgRes.ok) {
        console.error('Telegram error:', await tgRes.text());
      }
    } else {
      // Log for development — replace with your preferred notification method
      console.log('[Booking]', { service, date: formattedDate, time, name, phone, comment });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
