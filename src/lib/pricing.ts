import { getAllProducts, variantsFor } from "./catalog";
import { vatBreakdown, type VatRate } from "./vat";
import { shippingCost, type ShipCountry, type ShippingMethodId } from "./shipping";
import { sampleOffers } from "./samples";
import type { OrderLine } from "./order";

const PROMOS: Record<string, number> = { GAIWAN10: 10, EERSTEKOP: 5 };

/** Storage fee per cake per year, in cents, mirroring content/vault.ts. */
export function vaultFeeFor(years: number): number {
  if (years >= 10) return years * 700;
  if (years >= 5) return years * 800;
  if (years >= 3) return years * 900;
  return 0;
}

export interface PricedLine extends OrderLine {
  lineTotal: number;
}

export interface Totals {
  lines: PricedLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  net: number;
  vat: number;
  total: number;
  vatLines: { rate: VatRate; net: number; vat: number; gross: number }[];
}

/**
 * Prices are recomputed on the server from the catalogue by SKU. Nothing the
 * browser sends about money is trusted: a posted price is ignored entirely and
 * an unknown SKU is dropped.
 */
export function priceOrder(
  lines: OrderLine[],
  options: {
    country: ShipCountry;
    shippingMethod: ShippingMethodId;
    promoCode?: string;
  },
): Totals | { error: "empty" | "unknown-sku" } {
  const catalogue = getAllProducts();
  const priced: PricedLine[] = [];

  for (const line of lines) {
    const quantity = Math.max(1, Math.min(99, Math.round(line.quantity)));

    const sample = sampleOffers.find((s) => s.sku === line.sku);
    if (sample) {
      priced.push({
        ...line,
        name: sample.name,
        slug: sample.slug,
        grams: 10,
        price: sample.price,
        vat: 6,
        quantity,
        vaultYears: undefined,
        vaultFee: undefined,
        lineTotal: sample.price * quantity,
      });
      continue;
    }

    const product = catalogue.find((p) => variantsFor(p).some((v) => v.sku === line.sku));
    const variant = product ? variantsFor(product).find((v) => v.sku === line.sku) : undefined;
    if (!product || !variant) return { error: "unknown-sku" };

    const vaultYears = product.vaultEligible && line.vaultYears ? line.vaultYears : undefined;
    const vaultFee = vaultYears ? vaultFeeFor(vaultYears) : undefined;

    priced.push({
      sku: variant.sku,
      slug: product.slug,
      name: product.name,
      grams: variant.grams,
      price: variant.price,
      vat: product.vat,
      quantity,
      vaultYears,
      vaultFee,
      lineTotal: (variant.price + (vaultFee ?? 0)) * quantity,
    });
  }

  if (priced.length === 0) return { error: "empty" };

  const subtotal = priced.reduce((a, l) => a + l.lineTotal, 0);
  const percent = options.promoCode
    ? (PROMOS[options.promoCode.trim().toUpperCase()] ?? 0)
    : 0;
  const discount = Math.round((subtotal * percent) / 100);
  const shipping = shippingCost(options.shippingMethod, options.country, subtotal - discount);

  // The discount is spread across the VAT bands in proportion to their share,
  // so a mixed order keeps 6 % and 21 % correct after a percentage discount.
  const items = priced.map((line) => ({
    gross: Math.round(line.lineTotal - (discount * line.lineTotal) / (subtotal || 1)),
    rate: line.vat as VatRate,
  }));

  const breakdown = vatBreakdown(items, shipping);

  return {
    lines: priced,
    subtotal,
    discount,
    shipping,
    net: breakdown.net,
    vat: breakdown.vat,
    total: breakdown.gross,
    vatLines: breakdown.lines,
  };
}
