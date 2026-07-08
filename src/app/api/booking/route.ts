import { NextResponse } from "next/server";
import { Resend } from "resend";

import { SITE } from "@/data/site";
import { getServiceBySlug } from "@/data/services";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Сервіс надсилання листів тимчасово недоступний. Зателефонуйте нам." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некоректний запит." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const serviceSlug = typeof body.service === "string" ? body.service.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";

  if (!name || !phone) {
    return NextResponse.json({ error: "Вкажіть ім'я та телефон." }, { status: 400 });
  }
  if (name.length > 200 || phone.length > 50 || comment.length > 2000) {
    return NextResponse.json({ error: "Занадто довге значення поля." }, { status: 400 });
  }

  const serviceTitle = serviceSlug ? getServiceBySlug(serviceSlug)?.title ?? serviceSlug : "не вказано";

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${SITE.name} — сайт <onboarding@resend.dev>`,
      to: SITE.email,
      replyTo: SITE.email,
      subject: `Нова заявка на запис — ${name}`,
      html: `
        <h2>Нова заявка з сайту ${SITE.name}</h2>
        <p><b>Ім'я:</b> ${escapeHtml(name)}</p>
        <p><b>Телефон:</b> ${escapeHtml(phone)}</p>
        <p><b>Послуга:</b> ${escapeHtml(serviceTitle)}</p>
        <p><b>Бажана дата:</b> ${escapeHtml(date || "не вказано")}</p>
        <p><b>Коментар:</b> ${escapeHtml(comment || "—")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Booking email failed:", err);
    return NextResponse.json(
      { error: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
