/**
 * Belgian VAT. Tea is a foodstuff at 6 %; teaware and gift vouchers at 21 %.
 * Shelf prices include VAT, so the checkout has to work backwards to show the
 * net/VAT/total split the law expects on an invoice.
 */
export type VatRate = 6 | 21;

export const VAT_RATES: VatRate[] = [6, 21];

/** Net amount, in cents, from a VAT-inclusive amount. */
export function netFromGross(grossCents: number, rate: VatRate): number {
  return Math.round(grossCents / (1 + rate / 100));
}

/** VAT amount, in cents, contained in a VAT-inclusive amount. */
export function vatFromGross(grossCents: number, rate: VatRate): number {
  return grossCents - netFromGross(grossCents, rate);
}

export interface VatLine {
  rate: VatRate;
  net: number;
  vat: number;
  gross: number;
}

/**
 * Split a set of gross amounts into one line per VAT rate. Shipping follows the
 * rate of the goods it carries; when an order mixes rates we apply 21 % to the
 * shipping share that belongs to 21 % goods, pro rata, which is what the
 * Belgian rules ask for on a mixed consignment.
 */
export function vatBreakdown(
  items: { gross: number; rate: VatRate }[],
  shippingGross = 0,
): { lines: VatLine[]; net: number; vat: number; gross: number } {
  const byRate = new Map<VatRate, number>();
  for (const item of items) {
    byRate.set(item.rate, (byRate.get(item.rate) ?? 0) + item.gross);
  }

  const goodsTotal = [...byRate.values()].reduce((a, b) => a + b, 0);
  if (shippingGross > 0 && goodsTotal > 0) {
    let assigned = 0;
    const rates = [...byRate.keys()];
    rates.forEach((rate, i) => {
      const share =
        i === rates.length - 1
          ? shippingGross - assigned
          : Math.round((shippingGross * (byRate.get(rate) ?? 0)) / goodsTotal);
      assigned += share;
      byRate.set(rate, (byRate.get(rate) ?? 0) + share);
    });
  } else if (shippingGross > 0) {
    byRate.set(21, (byRate.get(21) ?? 0) + shippingGross);
  }

  const lines: VatLine[] = [...byRate.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rate, gross]) => ({
      rate,
      gross,
      net: netFromGross(gross, rate),
      vat: vatFromGross(gross, rate),
    }));

  return {
    lines,
    net: lines.reduce((a, l) => a + l.net, 0),
    vat: lines.reduce((a, l) => a + l.vat, 0),
    gross: lines.reduce((a, l) => a + l.gross, 0),
  };
}
