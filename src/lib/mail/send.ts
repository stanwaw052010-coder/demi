import type { StoredOrder } from "../order";
import { orderConfirmationHtml, orderConfirmationSubject } from "./templates";

/**
 * Mail goes out through Resend's REST API, so there is no extra dependency and
 * nothing to install. Without RESEND_API_KEY we log the mail instead of sending
 * it, which keeps a local checkout complete without any external account.
 */
export async function sendOrderConfirmation(
  order: StoredOrder,
  baseUrl: string,
): Promise<{ sent: boolean; reason?: string }> {
  const html = orderConfirmationHtml(order, baseUrl);
  const subject = orderConfirmationSubject(order);
  const from = process.env.MAIL_FROM ?? "Well's of Yunnan <hallo@wellsofyunnan.be>";

  if (!process.env.RESEND_API_KEY) {
    console.info(
      `[mail] mock mode, not sending. to=${order.input.email} subject=${subject} bytes=${html.length}`,
    );
    return { sent: false, reason: "mock" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [order.input.email], subject, html }),
    });
    if (!response.ok) {
      return { sent: false, reason: `resend ${response.status}` };
    }
    return { sent: true };
  } catch (error) {
    console.error("[mail] send failed", error);
    return { sent: false, reason: "error" };
  }
}
