import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
  /** Which list. "tastings" is the waiting list for the tea house opening. */
  list: z.enum(["brief", "tastings"]).default("brief"),
});

/**
 * Without a mailing list provider configured this records the intent and
 * returns success, so the form is honest about working end to end locally.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid-email" }, { status: 422 });
  }

  // The waiting list for the tea house is a different question than the letter,
  // so it goes to its own audience when there is one and never silently joins
  // the letter instead.
  const audience =
    parsed.data.list === "tastings"
      ? (process.env.RESEND_TASTINGS_AUDIENCE_ID ?? process.env.RESEND_AUDIENCE_ID)
      : process.env.RESEND_AUDIENCE_ID;

  if (!audience || !process.env.RESEND_API_KEY) {
    console.info(`[newsletter] mock mode, would add ${parsed.data.email} to ${parsed.data.list}`);
    return NextResponse.json({ ok: true, mode: "mock" });
  }

  const response = await fetch(
    `https://api.resend.com/audiences/${audience}/contacts`,
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
