import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { orderInputSchema, type StoredOrder } from "@/lib/order";
import { priceOrder } from "@/lib/pricing";
import { nextOrderNumber, saveOrder } from "@/lib/orders/store";
import { createPayment } from "@/lib/payments";
import { sendOrderConfirmation } from "@/lib/mail/send";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = orderInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "invalid",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  const input = parsed.data;

  const totals = priceOrder(input.lines, {
    country: input.country,
    shippingMethod: input.shippingMethod,
    promoCode: input.promoCode || undefined,
  });

  if ("error" in totals) {
    return NextResponse.json({ error: totals.error }, { status: 422 });
  }

  const number = await nextOrderNumber();
  // Prefer the browser's own origin so a local run links back to localhost.
  const origin =
    request.headers.get("origin") ??
    (() => {
      try {
        return new URL(request.url).origin;
      } catch {
        return SITE_URL;
      }
    })();
  const thanksPath = input.locale === "nl" ? "bedankt" : "thank-you";
  const redirectUrl = `${origin}/${input.locale}/${thanksPath}/${number}`;

  const payment = await createPayment({
    amount: totals.total,
    currency: "EUR",
    description: `Well's of Yunnan ${number}`,
    orderNumber: number,
    method: input.paymentMethod,
    locale: input.locale,
    redirectUrl,
  });

  // `terms` is a consent flag for the transaction, not part of the record.
  const rest = { ...input } as Omit<typeof input, "terms"> & { terms?: true };
  delete rest.terms;

  const order: StoredOrder = {
    id: randomUUID(),
    number,
    createdAt: new Date().toISOString(),
    status:
      payment.status === "paid" ? "paid" : payment.provider === "mock" ? "mock" : "pending",
    input: { ...rest, lines: totals.lines },
    totals: {
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      net: totals.net,
      vat: totals.vat,
      total: totals.total,
      vatLines: totals.vatLines,
    },
    payment: {
      provider: payment.provider,
      reference: payment.reference,
      checkoutUrl: payment.checkoutUrl,
    },
  };

  await saveOrder(order);

  // The order is on file before the mail goes out, so a mail failure never
  // loses a sale.
  const mail = await sendOrderConfirmation(order, origin);

  return NextResponse.json({
    number: order.number,
    status: order.status,
    total: order.totals.total,
    redirect: payment.checkoutUrl ?? redirectUrl,
    mail: mail.sent ? "sent" : mail.reason,
  });
}
