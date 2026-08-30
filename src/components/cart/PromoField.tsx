"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart-store";

export function PromoField() {
  const t = useTranslations("cart");
  const promo = useCart((s) => s.promo);
  const applyPromo = useCart((s) => s.applyPromo);
  const clearPromo = useCart((s) => s.clearPromo);
  const [code, setCode] = useState("");
  const [failed, setFailed] = useState(false);

  if (promo) {
    return (
      <p className="text-[var(--text-micro)] flex items-center gap-3">
        <span>{t("promoApplied", { code: promo.code })}</span>
        <button type="button" className="wy-link text-stone" onClick={clearPromo}>
          &times;
        </button>
      </p>
    );
  }

  return (
    <form
      className="flex items-end gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const ok = applyPromo(code);
        setFailed(!ok);
        if (ok) setCode("");
      }}
    >
      <div className="flex-1">
        <label htmlFor="wy-promo" className="wy-label block">
          {t("promoLabel")}
        </label>
        <input
          id="wy-promo"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setFailed(false);
          }}
          placeholder={t("promoPlaceholder")}
          autoComplete="off"
          aria-invalid={failed}
          aria-describedby={failed ? "wy-promo-error" : undefined}
        />
      </div>
      <button type="submit" className="wy-btn wy-btn-quiet">
        {t("promoApply")}
      </button>
      {failed ? (
        <p id="wy-promo-error" role="alert" className="sr-only">
          {t("promoInvalid")}
        </p>
      ) : null}
    </form>
  );
}
