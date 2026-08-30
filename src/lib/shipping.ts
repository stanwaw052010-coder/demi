export type ShipCountry = "BE" | "NL" | "EU";

export type ShippingMethodId =
  | "bpost-home"
  | "bpost-locker"
  | "mondial-relay"
  | "pickup-ghent";

export interface ShippingMethod {
  id: ShippingMethodId;
  /** Price in euro cents per country, VAT included. Null means unavailable. */
  price: Record<ShipCountry, number | null>;
  /** Free above this order subtotal, per country. */
  freeFrom: Record<ShipCountry, number | null>;
}

export const FREE_SHIPPING_BENELUX = 5000;
export const FREE_SHIPPING_EU = 7500;

export const shippingMethods: ShippingMethod[] = [
  {
    id: "bpost-home",
    price: { BE: 495, NL: 695, EU: 995 },
    freeFrom: { BE: FREE_SHIPPING_BENELUX, NL: FREE_SHIPPING_BENELUX, EU: FREE_SHIPPING_EU },
  },
  {
    id: "bpost-locker",
    price: { BE: 395, NL: 495, EU: null },
    freeFrom: { BE: FREE_SHIPPING_BENELUX, NL: FREE_SHIPPING_BENELUX, EU: null },
  },
  {
    id: "mondial-relay",
    price: { BE: 350, NL: 450, EU: 850 },
    freeFrom: { BE: FREE_SHIPPING_BENELUX, NL: FREE_SHIPPING_BENELUX, EU: FREE_SHIPPING_EU },
  },
  {
    id: "pickup-ghent",
    price: { BE: 0, NL: 0, EU: 0 },
    freeFrom: { BE: 0, NL: 0, EU: 0 },
  },
];

export function methodsFor(country: ShipCountry): ShippingMethod[] {
  return shippingMethods.filter((m) => m.price[country] !== null);
}

export function shippingCost(
  id: ShippingMethodId,
  country: ShipCountry,
  subtotalCents: number,
): number {
  const method = shippingMethods.find((m) => m.id === id);
  if (!method) return 0;
  const base = method.price[country];
  if (base === null) return 0;
  const threshold = method.freeFrom[country];
  if (threshold !== null && subtotalCents >= threshold) return 0;
  return base;
}

/** How much more is needed for free Benelux shipping, or 0 when already there. */
export function amountToFreeShipping(subtotalCents: number): number {
  return Math.max(0, FREE_SHIPPING_BENELUX - subtotalCents);
}
