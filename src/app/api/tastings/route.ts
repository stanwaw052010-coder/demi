import { NextResponse } from "next/server";
import { z } from "zod";
import { tastings } from "@content/tastings";

const schema = z.object({
  sessionId: z.string().min(1),
  name: z.string().trim().min(1).max(120),
  email: z.email(),
  seats: z.number().int().min(1).max(6),
  notes: z.string().trim().max(600).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const session = tastings.find((s) => s.id === parsed.data.sessionId);
  if (!session) return NextResponse.json({ error: "unknown-session" }, { status: 404 });
  if (session.seatsLeft < parsed.data.seats) {
    return NextResponse.json({ error: "full" }, { status: 409 });
  }

  // Seats are held by hand in this installation; the confirmation email is what
  // actually books the place, which is why the copy says one working day.
  console.info(
    `[tastings] ${parsed.data.seats} seat(s) requested for ${session.id} by ${parsed.data.email}`,
  );

  return NextResponse.json({ ok: true });
}
