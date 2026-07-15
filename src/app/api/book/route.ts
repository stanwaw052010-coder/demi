import { NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Вкажіть ім'я").max(100),
  phone: z.string().trim().min(7, "Вкажіть телефон").max(30),
  service: z.string().trim().max(200).optional(),
  date: z.string().trim().max(30).optional(),
  comment: z.string().trim().max(500).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Помилка валідації" },
      { status: 400 }
    );
  }

  // No persistence layer wired up yet — log server-side so the request is
  // visible during development, and acknowledge success to the client.
  console.info("[booking] new request", parsed.data);

  return NextResponse.json({ ok: true });
}
