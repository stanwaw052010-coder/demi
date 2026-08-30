"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import {
  cartCount,
  cartDiscount,
  cartSubtotal,
  lineTotal,
  useCart,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { amountToFreeShipping } from "@/lib/shipping";
import { PromoField } from "./PromoField";
import { CartUpsell } from "./CartUpsell";

export function CartDrawer() {
  const t = useTranslations("cart");
  const actions = useTranslations("actions");
  const locale = useLocale() as AppLocale;

  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const promo = useCart((s) => s.promo);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);

  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    restoreFocus.current = document.activeElement as HTMLElement;
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      // Trap focus inside the drawer while it is open.
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreFocus.current?.focus();
    };
  }, [isOpen, close]);

  const subtotal = cartSubtotal(lines);
  const discount = cartDiscount(lines, promo);
  const toFree = amountToFreeShipping(subtotal - discount);
  const count = cartCount(lines);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className="fixed inset-0 z-50 bg-ink/20 transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        aria-hidden={!isOpen}
        className="fixed right-0 top-0 z-50 h-dvh w-full max-w-[26rem] bg-paper flex flex-col"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          borderLeft: "1px solid var(--rule)",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div className="flex items-baseline gap-4 px-6 py-5 wy-rule-b">
          <h2 className="text-[1.375rem]">{t("title")}</h2>
          <span className="wy-label tnum">{count}</span>
          <button
            ref={closeButton}
            type="button"
            onClick={close}
            className="ml-auto wy-link text-[var(--text-micro)]"
          >
            {actions("close")}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="py-10">
              <p className="wy-prose text-[1.0625rem]">{t("empty")}</p>
              <p className="text-[var(--text-micro)] text-stone mt-2">{t("emptyBody")}</p>
              <Link href="/thee" className="wy-btn mt-6" onClick={close}>
                {actions("continueShopping")}
              </Link>
            </div>
          ) : (
            <ul>
              {lines.map((line) => (
                <li key={line.id} className="wy-rule-b py-4 flex gap-4">
                  <span
                    className="wy-drop mt-1.5"
                    data-full="true"
                    style={{ ["--drop" as string]: `var(--color-liquor-${line.liquor})` }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={{ pathname: "/thee/[slug]", params: { slug: line.slug } }}
                      className="wy-link text-[1.0625rem] leading-snug block"
                      style={{ fontFamily: "var(--font-display)" }}
                      onClick={close}
                    >
                      {line.name}
                    </Link>
                    <p className="wy-label mt-0.5">
                      {line.grams} g
                      {line.vaultYears ? ` — ${t("vaultYears", { years: line.vaultYears })}` : ""}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center border border-[var(--rule)]">
                        <button
                          type="button"
                          className="px-2.5 py-1 text-ink"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label={actions("decrease")}
                        >
                          &minus;
                        </button>
                        <span
                          className="px-2 tnum text-[var(--text-micro)]"
                          aria-label={t("quantityFor", { name: line.name })}
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-2.5 py-1 text-ink"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label={actions("increase")}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="wy-link text-[var(--text-meta)] text-stone"
                        onClick={() => remove(line.id)}
                      >
                        {t("removeItem", { name: line.name })}
                      </button>
                    </div>
                  </div>
                  <span className="price text-[var(--text-micro)] whitespace-nowrap">
                    {formatPrice(lineTotal(line), locale)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 ? <CartUpsell /> : null}
        </div>

        {lines.length > 0 ? (
          <div className="px-6 py-5 wy-rule">
            <PromoField />

            <dl className="mt-4 space-y-1.5 text-[var(--text-micro)]">
              <div className="flex justify-between">
                <dt className="text-stone">{t("subtotal")}</dt>
                <dd className="price">{formatPrice(subtotal, locale)}</dd>
              </div>
              {discount > 0 ? (
                <div className="flex justify-between">
                  <dt className="text-stone">{t("discount")}</dt>
                  <dd className="price text-amber-ink">&minus;{formatPrice(discount, locale)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-stone">{t("shipping")}</dt>
                <dd className="text-stone">{t("shippingAtCheckout")}</dd>
              </div>
            </dl>

            <p className="wy-label mt-3">
              {toFree > 0
                ? t("freeShippingLeft", { amount: formatPrice(toFree, locale) })
                : t("freeShippingReached")}
            </p>

            <Link href="/afrekenen" className="wy-btn wy-btn-solid w-full mt-4" onClick={close}>
              {actions("toCheckout")}
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}
