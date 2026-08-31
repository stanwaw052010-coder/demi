"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/lib/cart-store";
import { sampleOffers } from "@/lib/samples";
import { formatPrice } from "@/lib/format";
import type { AppLocale } from "@/i18n/routing";

/**
 * One suggestion, not a carousel: a 10 g sample of something the cart does not
 * already contain, so the customer leaves with a reason to come back.
 */
export function CartUpsell() {
  const t = useTranslations("cart");
  const actions = useTranslations("actions");
  const locale = useLocale() as AppLocale;
  const lines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);

  const owned = new Set(lines.map((l) => l.slug));
  const offer = sampleOffers.find((s) => !owned.has(s.slug));
  if (!offer) return null;

  return (
    <div className="py-5 wy-rule-b">
      <h3 className="text-[1.0625rem] mb-1">{t("upsellTitle")}</h3>
      <p className="text-micro text-stone">
        {t("upsellBody", { price: formatPrice(offer.price, locale) })}
      </p>
      <button
        type="button"
        className="wy-btn wy-btn-quiet mt-3"
        onClick={() =>
          add({
            slug: offer.slug,
            sku: offer.sku,
            name: offer.name,
            grams: 10,
            price: offer.price,
            vat: 6,
            liquor: offer.liquor,
          })
        }
      >
        {actions("addSample")} — {offer.name}
      </button>
    </div>
  );
}
