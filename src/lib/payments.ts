import type { PaymentMethodId } from "./order";

/**
 * Payment providers behind one interface. Mollie is preferred for Benelux
 * because Bancontact and Payconiq are first-class there; Stripe is available
 * as a fallback. When no keys are present the mock provider takes over so the
 * whole checkout can be walked end to end on a laptop.
 */
export interface PaymentIntent {
  provider: "mollie" | "stripe" | "mock";
  reference: string;
  status: "paid" | "pending" | "mock";
  checkoutUrl?: string;
}

export interface PaymentRequest {
  amount: number;
  currency: "EUR";
  description: string;
  orderNumber: string;
  method: PaymentMethodId;
  locale: "nl" | "en";
  redirectUrl: string;
  webhookUrl?: string;
}

const mollieMethod: Partial<Record<PaymentMethodId, string>> = {
  bancontact: "bancontact",
  ideal: "ideal",
  card: "creditcard",
  paypal: "paypal",
  transfer: "banktransfer",
  // Payconiq is enabled per-account at Mollie; letting Mollie choose avoids a
  // hard failure when it is not switched on.
  payconiq: "",
};

export function paymentMode(): "mollie" | "stripe" | "mock" {
  if (process.env.MOLLIE_API_KEY) return "mollie";
  if (process.env.STRIPE_SECRET_KEY) return "stripe";
  return "mock";
}

async function createMolliePayment(req: PaymentRequest): Promise<PaymentIntent> {
  const body: Record<string, unknown> = {
    amount: { currency: req.currency, value: (req.amount / 100).toFixed(2) },
    description: req.description,
    redirectUrl: req.redirectUrl,
    locale: req.locale === "nl" ? "nl_BE" : "en_GB",
    metadata: { orderNumber: req.orderNumber },
  };
  if (req.webhookUrl) body.webhookUrl = req.webhookUrl;
  const method = mollieMethod[req.method];
  if (method) body.method = method;

  const response = await fetch("https://api.mollie.com/v2/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Mollie refused the payment: ${response.status}`);
  }

  const json = (await response.json()) as {
    id: string;
    status: string;
    _links?: { checkout?: { href?: string } };
  };

  return {
    provider: "mollie",
    reference: json.id,
    status: json.status === "paid" ? "paid" : "pending",
    checkoutUrl: json._links?.checkout?.href,
  };
}

async function createStripePayment(req: PaymentRequest): Promise<PaymentIntent> {
  const params = new URLSearchParams({
    mode: "payment",
    success_url: req.redirectUrl,
    cancel_url: req.redirectUrl,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][unit_amount]": String(req.amount),
    "line_items[0][price_data][product_data][name]": req.description,
    "metadata[orderNumber]": req.orderNumber,
    locale: req.locale,
  });
  if (req.method === "bancontact" || req.method === "ideal" || req.method === "card") {
    params.append("payment_method_types[0]", req.method === "card" ? "card" : req.method);
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Stripe refused the session: ${response.status}`);
  }

  const json = (await response.json()) as { id: string; url?: string };
  return { provider: "stripe", reference: json.id, status: "pending", checkoutUrl: json.url };
}

function createMockPayment(req: PaymentRequest): PaymentIntent {
  return {
    provider: "mock",
    reference: `mock_${req.orderNumber.toLowerCase().replace(/-/g, "_")}`,
    status: "mock",
  };
}

/**
 * Never throws: a payment provider that is down must not lose the order. If the
 * live call fails we fall back to a pending mock so the customer still lands on
 * the confirmation page and we still have the order on file.
 */
export async function createPayment(req: PaymentRequest): Promise<PaymentIntent> {
  const mode = paymentMode();
  try {
    if (mode === "mollie") return await createMolliePayment(req);
    if (mode === "stripe") return await createStripePayment(req);
  } catch (error) {
    console.error("[payments] provider failed, falling back to mock", error);
  }
  return createMockPayment(req);
}
