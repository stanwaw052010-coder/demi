"use client";

import { useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { LiquorKey, Variant } from "@content/types";
import type { VatRate } from "@/lib/vat";
import type { AppLocale } from "@/i18n/routing";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { flyLeaf } from "./flyLeaf";

interface Props {
  slug: string;
  name: string;
  liquor: LiquorKey;
  vat: VatRate;
  variants: Variant[];
  vaultEligible?: boolean;
  vaultLabel?: string;
}

/**
 * Amount as a radio group rather than a select: three options are faster to
 * compare when the difference between them is grams and euros.
 */
export function AddToCart({
  slug,
  name,
  liquor,
  vat,
  variants,
  vaultEligible,
  vaultLabel,
}: Props) {
  const t = useTranslations("product");
  const actions = useTranslations("actions");
  const state = useTranslations("state");
  const cart = useTranslations("cart");
  const locale = useLocale() as AppLocale;
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const groupId = useId();

  const firstAvailable = variants.findIndex((v) => v.stock > 0);
  const [selected, setSelected] = useState(firstAvailable === -1 ? 0 : firstAvailable);
  const [vaultYears, setVaultYears] = useState(0);
  const button = useRef<HTMLButtonElement>(null);

  const variant = variants[selected];
  const soldOut = !variant || variant.stock === 0;
  /** Vault storage, charged per cake for the whole term, from the tier table. */
  const vaultFee = vaultYears ? vaultYears * (vaultYears >= 10 ? 700 : vaultYears >= 5 ? 800 : 900) : 0;

  return (
    <div className="mt-8">
      <fieldset className="border-0 p-0">
        <legend className="wy-label mb-3">{t("chooseAmount")}</legend>
        <div className="space-y-px">
          {variants.map((v, index) => (
            <label
              key={v.sku}
              className="flex items-baseline gap-3 py-3 wy-rule-b cursor-pointer"
              style={{ opacity: v.stock === 0 ? 0.5 : 1 }}
            >
              <input
                type="radio"
                name={groupId}
                checked={selected === index}
                disabled={v.stock === 0}
                onChange={() => setSelected(index)}
                className="translate-y-0.5"
              />
              <span className="text-ui">
                {v.label ? v.label[locale] : `${v.grams} g`}
              </span>
              <span className="price ml-auto text-ui">
                {formatPrice(v.price, locale)}
              </span>
              {v.stock === 0 ? (
                <span className="wy-label text-amber-ink">{state("soldOut")}</span>
              ) : v.stock <= 8 ? (
                <span className="wy-label">{state("lowStock", { count: v.stock })}</span>
              ) : null}
            </label>
          ))}
        </div>
      </fieldset>

      {vaultEligible && vaultLabel ? (
        <div className="mt-5">
          <label htmlFor={`${groupId}-vault`} className="wy-label block mb-1">
            {vaultLabel}
          </label>
          <select
            id={`${groupId}-vault`}
            value={vaultYears}
            onChange={(event) => setVaultYears(Number(event.target.value))}
            className="text-micro"
          >
            <option value={0}>—</option>
            {[3, 5, 10].map((years) => (
              <option key={years} value={years}>
                {cart("vaultYears", { years })}
                {", "}
                {formatPrice(years * (years >= 10 ? 700 : years >= 5 ? 800 : 900), locale)}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <button
        ref={button}
        type="button"
        className="wy-btn wy-btn-solid w-full mt-6"
        disabled={soldOut}
        onClick={() => {
          if (!variant) return;
          add({
            slug,
            sku: variant.sku,
            name,
            grams: variant.grams,
            price: variant.price,
            vat,
            liquor,
            vaultYears: vaultYears || undefined,
            vaultFee: vaultFee || undefined,
          });
          flyLeaf(button.current, liquor, () => open());
        }}
      >
        {soldOut ? state("soldOut") : actions("addToCart")}
      </button>
    </div>
  );
}
