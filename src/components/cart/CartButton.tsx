"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useCart, cartCount } from "@/lib/cart-store";

/**
 * The counter springs exactly once per add. No looping, no bounce on load.
 */
export function CartButton() {
  const t = useTranslations("nav");
  const lines = useCart((s) => s.lines);
  const pulse = useCart((s) => s.pulse);
  const hydrated = useCart((s) => s.hydrated);
  const open = useCart((s) => s.open);
  const [springing, setSpringing] = useState(false);
  const previous = useRef(pulse);

  useEffect(() => {
    if (pulse === previous.current) return;
    previous.current = pulse;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSpringing(true);
    const timer = window.setTimeout(() => setSpringing(false), 420);
    return () => window.clearTimeout(timer);
  }, [pulse]);

  const count = hydrated ? cartCount(lines) : 0;

  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex items-baseline gap-1.5 text-[var(--text-micro)] text-ink"
      aria-label={t("cartWithCount", { count })}
      data-cart-target
    >
      <span className="wy-link">{t("cart")}</span>
      <span
        className="tnum inline-block tabular-nums text-stone"
        style={{
          transform: springing ? "scale(1.28)" : "scale(1)",
          transition: "transform 400ms cubic-bezier(0.22, 1.6, 0.36, 1)",
        }}
      >
        {hydrated ? count : ""}
      </span>
    </button>
  );
}
