import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.email() });

/**
 * Without a mailing list provider configured this records the intent and
 * returns success, so the form is honest about working end to end locally.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid-email" }, { status: 422 });
  }

  if (!process.env.RESEND_AUDIENCE_ID || !process.env.RESEND_API_KEY) {
    console.info(`[newsletter] mock mode, would subscribe ${parsed.data.email}`);
    return NextResponse.json({ ok: true, mode: "mock" });
  }

  const response = await fetch(
    `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: parsed.data.email, unsubscribed: false }),
    },
  );

  return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 502 });
}
