"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useCart, cartCount } from "@/lib/cart-store";
import { REDUCED_MOTION } from "@/lib/use-media-query";

/**
 * The counter springs exactly once per add. The spring is driven straight
 * through the Web Animations API rather than through React state, so adding to
 * the cart does not schedule two extra renders just to move a number.
 */
export function CartButton() {
  const t = useTranslations("nav");
  const lines = useCart((s) => s.lines);
  const pulse = useCart((s) => s.pulse);
  const hydrated = useCart((s) => s.hydrated);
  const open = useCart((s) => s.open);

  const counter = useRef<HTMLSpanElement>(null);
  const previous = useRef(pulse);

  useEffect(() => {
    if (pulse === previous.current) return;
    previous.current = pulse;

    const node = counter.current;
    if (!node || typeof node.animate !== "function") return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    node.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.32)" }, { transform: "scale(1)" }],
      { duration: 420, easing: "cubic-bezier(0.22, 1.6, 0.36, 1)" },
    );
  }, [pulse]);

  const count = hydrated ? cartCount(lines) : 0;

  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex items-baseline gap-1.5 text-micro text-ink"
      data-cart-target
    >
      {/*
        No aria-label: the accessible name is built from what is on screen plus
        one hidden word, so a voice-control user can say what they can read.
        The digit renders as 0 on the server and on the first client paint, so
        neither hydration nor the counter's width jumps.
      */}
      <span className="wy-link">{t("cart")}</span>
      <span ref={counter} className="tnum inline-block text-stone">
        {hydrated ? count : 0}
      </span>
      <span className="sr-only">{t("itemsInCart")}</span>
    </button>
  );
}
