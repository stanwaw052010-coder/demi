import { z } from "zod";

/**
 * Belgian and Dutch address rules differ enough to be worth encoding: BE has a
 * four digit postcode and a "bus" for the flat number, NL has 1234 AB.
 */
const bePostcode = /^[1-9]\d{3}$/;
const nlPostcode = /^[1-9]\d{3}\s?[A-Za-z]{2}$/;

export const countries = ["BE", "NL", "EU"] as const;
export type Country = (typeof countries)[number];

export const shippingMethodIds = [
  "bpost-home",
  "bpost-locker",
  "mondial-relay",
  "pickup-ghent",
] as const;

export const paymentMethodIds = [
  "bancontact",
  "ideal",
  "payconiq",
  "card",
  "paypal",
  "transfer",
] as const;
export type PaymentMethodId = (typeof paymentMethodIds)[number];

export const orderLineSchema = z.object({
  sku: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  grams: z.number().int().nonnegative(),
  price: z.number().int().nonnegative(),
  vat: z.union([z.literal(6), z.literal(21)]),
  quantity: z.number().int().positive().max(99),
  vaultYears: z.number().int().positive().optional(),
  vaultFee: z.number().int().nonnegative().optional(),
});

export const orderInputSchema = z
  .object({
    locale: z.enum(["nl", "en"]),
    email: z.email(),
    phone: z.string().trim().max(32).optional().or(z.literal("")),
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    vatNumber: z.string().trim().max(24).optional().or(z.literal("")),
    street: z.string().trim().min(1).max(160),
    houseNumber: z.string().trim().min(1).max(16),
    bus: z.string().trim().max(16).optional().or(z.literal("")),
    postcode: z.string().trim().min(1).max(12),
    city: z.string().trim().min(1).max(80),
    country: z.enum(countries),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
    shippingMethod: z.enum(shippingMethodIds),
    paymentMethod: z.enum(paymentMethodIds),
    newsletter: z.boolean().default(false),
    terms: z.literal(true),
    promoCode: z.string().trim().max(32).optional().or(z.literal("")),
    lines: z.array(orderLineSchema).min(1),
  })
  .superRefine((value, ctx) => {
    if (value.shippingMethod === "pickup-ghent") return;
    if (value.country === "BE" && !bePostcode.test(value.postcode)) {
      ctx.addIssue({ code: "custom", path: ["postcode"], message: "invalidPostcodeBE" });
    }
    if (value.country === "NL" && !nlPostcode.test(value.postcode)) {
      ctx.addIssue({ code: "custom", path: ["postcode"], message: "invalidPostcodeNL" });
    }
  });

export type OrderInput = z.infer<typeof orderInputSchema>;
export type OrderLine = z.infer<typeof orderLineSchema>;

export type OrderStatus = "paid" | "pending" | "mock";

export interface StoredOrder {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  input: Omit<OrderInput, "terms">;
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    net: number;
    vat: number;
    total: number;
    vatLines: { rate: 6 | 21; net: number; vat: number; gross: number }[];
  };
  payment: { provider: string; reference: string; checkoutUrl?: string };
  trackingNumber?: string;
}

/** WY-2026-0001, sequential within the year. */
export function orderNumber(year: number, sequence: number): string {
  return `WY-${year}-${String(sequence).padStart(4, "0")}`;
}

export function isValidOrderNumber(value: string): boolean {
  return /^WY-\d{4}-\d{4}$/.test(value);
}
