"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { Link, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { cartDiscount, cartSubtotal, lineTotal, useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { methodsFor, shippingCost, type ShipCountry, type ShippingMethodId } from "@/lib/shipping";
import { vatBreakdown, type VatRate } from "@/lib/vat";
import { paymentMethodIds } from "@/lib/order";

/** Mirrors the server schema; the server revalidates and reprices everything. */
const formSchema = z
  .object({
    email: z.email(),
    phone: z.string().trim().max(32).optional().or(z.literal("")),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    vatNumber: z.string().trim().max(24).optional().or(z.literal("")),
    street: z.string().trim().min(1),
    houseNumber: z.string().trim().min(1),
    bus: z.string().trim().max(16).optional().or(z.literal("")),
    postcode: z.string().trim().min(1),
    city: z.string().trim().min(1),
    country: z.enum(["BE", "NL", "EU"]),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
    shippingMethod: z.enum(["bpost-home", "bpost-locker", "mondial-relay", "pickup-ghent"]),
    paymentMethod: z.enum(paymentMethodIds),
    newsletter: z.boolean(),
    terms: z.literal(true),
  })
  .superRefine((value, ctx) => {
    if (value.shippingMethod === "pickup-ghent") return;
    if (value.country === "BE" && !/^[1-9]\d{3}$/.test(value.postcode)) {
      ctx.addIssue({ code: "custom", path: ["postcode"], message: "invalidPostcodeBE" });
    }
    if (value.country === "NL" && !/^[1-9]\d{3}\s?[A-Za-z]{2}$/.test(value.postcode)) {
      ctx.addIssue({ code: "custom", path: ["postcode"], message: "invalidPostcodeNL" });
    }
  });

type FormValues = z.infer<typeof formSchema>;

export function CheckoutForm({ mockPayments }: { mockPayments: boolean }) {
  const t = useTranslations("checkout");
  const shippingT = useTranslations("shippingMethods");
  const paymentT = useTranslations("payment");
  const cartT = useTranslations("cart");
  const actions = useTranslations("actions");
  const locale = useLocale() as AppLocale;
  const router = useRouter();

  const lines = useCart((s) => s.lines);
  const promo = useCart((s) => s.promo);
  const hydrated = useCart((s) => s.hydrated);
  const clear = useCart((s) => s.clear);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "BE",
      shippingMethod: "bpost-home",
      paymentMethod: "bancontact",
      newsletter: false,
      terms: false as unknown as true,
    },
  });

  const country = useWatch({ control, name: "country" }) as ShipCountry;
  const shippingMethod = useWatch({ control, name: "shippingMethod" }) as ShippingMethodId;

  const totals = useMemo(() => {
    const subtotal = cartSubtotal(lines);
    const discount = cartDiscount(lines, promo);
    const shipping = shippingCost(shippingMethod, country, subtotal - discount);
    const items = lines.map((line) => ({
      gross: Math.round(
        lineTotal(line) - (discount * lineTotal(line)) / (subtotal || 1),
      ),
      rate: line.vat as VatRate,
    }));
    const breakdown = vatBreakdown(items, shipping);
    return { subtotal, discount, shipping, ...breakdown };
  }, [lines, promo, shippingMethod, country]);

  const available = methodsFor(country);

  if (hydrated && lines.length === 0) {
    return (
      <div className="wy-grid">
        <div className="wy-main">
          <p className="wy-prose">{t("emptyCart")}</p>
          <Link href="/thee" className="wy-btn mt-6">
            {actions("continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  const err = (field: keyof FormValues) => {
    const issue = errors[field];
    if (!issue) return null;
    const key = issue.message && issue.message.startsWith("invalid") ? issue.message : "required";
    return (
      <p role="alert" className="text-meta text-amber-ink mt-1">
        {t(key as "required")}
      </p>
    );
  };

  return (
    <form
      className="wy-grid gap-y-14"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        setFailed(false);
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...values,
              locale,
              promoCode: promo?.code ?? "",
              lines: lines.map((line) => ({
                sku: line.sku,
                slug: line.slug,
                name: line.name,
                grams: line.grams,
                price: line.price,
                vat: line.vat,
                quantity: line.quantity,
                vaultYears: line.vaultYears,
                vaultFee: line.vaultFee,
              })),
            }),
          });
          if (!response.ok) {
            setFailed(true);
            return;
          }
          const result = (await response.json()) as { number: string; redirect: string };
          clear();
          // A live provider hands back its own hosted checkout; leave the site.
          if (
            result.redirect.startsWith("http") &&
            !result.redirect.includes(window.location.host)
          ) {
            window.location.assign(result.redirect);
            return;
          }
          router.push({
            pathname: "/bedankt/[orderId]",
            params: { orderId: result.number },
          });
        } catch {
          setFailed(true);
        }
      })}
    >
      <div className="wy-main space-y-14">
        {/* ── Contact ──────────────────────────────────────────────────── */}
        <fieldset className="border-0 p-0">
          <legend className="text-[1.5rem] pb-3 wy-rule-b w-full"
                  style={{ fontFamily: "var(--font-display)" }}>
            {t("stepContact")}
          </legend>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mt-6">
            <div className="sm:col-span-2">
              <label htmlFor="email" className="wy-label block">{t("email")}</label>
              <input id="email" type="email" autoComplete="email" {...register("email")} />
              <p className="wy-label mt-1">{t("emailHint")}</p>
              {err("email")}
            </div>
            <div>
              <label htmlFor="firstName" className="wy-label block">{t("firstName")}</label>
              <input id="firstName" autoComplete="given-name" {...register("firstName")} />
              {err("firstName")}
            </div>
            <div>
              <label htmlFor="lastName" className="wy-label block">{t("lastName")}</label>
              <input id="lastName" autoComplete="family-name" {...register("lastName")} />
              {err("lastName")}
            </div>
            <div>
              <label htmlFor="phone" className="wy-label block">{t("phone")}</label>
              <input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
            </div>
            <div>
              <label htmlFor="company" className="wy-label block">{t("company")}</label>
              <input id="company" autoComplete="organization" {...register("company")} />
            </div>
          </div>
        </fieldset>

        {/* ── Delivery ─────────────────────────────────────────────────── */}
        <fieldset className="border-0 p-0">
          <legend className="text-[1.5rem] pb-3 wy-rule-b w-full"
                  style={{ fontFamily: "var(--font-display)" }}>
            {t("stepDelivery")}
          </legend>

          <div className="grid sm:grid-cols-6 gap-x-6 gap-y-5 mt-6">
            <div className="sm:col-span-4">
              <label htmlFor="street" className="wy-label block">{t("street")}</label>
              <input id="street" autoComplete="address-line1" {...register("street")} />
              {err("street")}
            </div>
            <div>
              <label htmlFor="houseNumber" className="wy-label block">{t("houseNumber")}</label>
              <input id="houseNumber" {...register("houseNumber")} />
              {err("houseNumber")}
            </div>
            <div>
              <label htmlFor="bus" className="wy-label block">{t("bus")}</label>
              <input id="bus" {...register("bus")} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="postcode" className="wy-label block">{t("postcode")}</label>
              <input
                id="postcode"
                autoComplete="postal-code"
                inputMode={country === "BE" ? "numeric" : "text"}
                {...register("postcode")}
              />
              {err("postcode")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="city" className="wy-label block">{t("city")}</label>
              <input id="city" autoComplete="address-level2" {...register("city")} />
              {err("city")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="country" className="wy-label block">{t("country")}</label>
              <select id="country" autoComplete="country" {...register("country")}>
                <option value="BE">{t("countryBE")}</option>
                <option value="NL">{t("countryNL")}</option>
                <option value="EU">{t("countryOther")}</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <p className="wy-label mb-2">{t("deliveryMethod")}</p>
            <div className="space-y-px">
              {available.map((method) => {
                const cost = shippingCost(method.id, country, totals.subtotal - totals.discount);
                return (
                  <label
                    key={method.id}
                    className="flex items-baseline gap-3 py-3 wy-rule-b cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={method.id}
                      {...register("shippingMethod")}
                      className="translate-y-0.5"
                    />
                    <span>
                      <span className="block text-ui">
                        {shippingT(shippingKey(method.id))}
                      </span>
                      <span className="wy-label">{shippingT(`${shippingKey(method.id)}Detail`)}</span>
                    </span>
                    <span className="price ml-auto text-micro">
                      {cost === 0 ? shippingT("free") : formatPrice(cost, locale)}
                    </span>
                  </label>
                );
              })}
            </div>
            {shippingMethod === "pickup-ghent" ? (
              <p className="wy-label mt-3">{t("pickupNote")}</p>
            ) : null}
          </div>

          <div className="mt-8">
            <label htmlFor="notes" className="wy-label block">{t("notes")}</label>
            <textarea id="notes" rows={3} {...register("notes")} />
          </div>
        </fieldset>

        {/* ── Payment ──────────────────────────────────────────────────── */}
        <fieldset className="border-0 p-0">
          <legend className="text-[1.5rem] pb-3 wy-rule-b w-full"
                  style={{ fontFamily: "var(--font-display)" }}>
            {t("stepPayment")}
          </legend>

          {mockPayments ? (
            <p className="wy-label mt-4 pl-4" style={{ borderLeft: "2px solid var(--color-amber)" }}>
              {t("mockNotice")}
            </p>
          ) : null}

          <div className="space-y-px mt-6">
            {paymentMethodIds.map((method) => (
              <label
                key={method}
                className="flex items-baseline gap-3 py-3 wy-rule-b cursor-pointer"
              >
                <input
                  type="radio"
                  value={method}
                  {...register("paymentMethod")}
                  className="translate-y-0.5"
                />
                <span>
                  <span className="block text-ui">{paymentT(method)}</span>
                  {method === "transfer" ? (
                    <span className="wy-label">{paymentT("transferDetail")}</span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>

          <label className="flex items-start gap-3 mt-8 text-micro">
            <input type="checkbox" {...register("terms")} className="mt-1" />
            <span>{t("terms")}</span>
          </label>
          {errors.terms ? (
            <p role="alert" className="text-meta text-amber-ink mt-1">
              {t("termsRequired")}
            </p>
          ) : null}

          <label className="flex items-start gap-3 mt-3 text-micro text-stone">
            <input type="checkbox" {...register("newsletter")} className="mt-1" />
            <span>{t("newsletterOptIn")}</span>
          </label>

          {failed ? (
            <div role="alert" className="mt-6 pl-4" style={{ borderLeft: "2px solid var(--color-amber)" }}>
              <p className="text-ui">{t("errorTitle")}</p>
              <p className="wy-label mt-1">{t("errorBody")}</p>
            </div>
          ) : null}

          <button type="submit" className="wy-btn wy-btn-solid mt-8" disabled={isSubmitting}>
            {isSubmitting ? t("placing") : actions("placeOrder")}
          </button>
        </fieldset>
      </div>

      {/* ── Summary ────────────────────────────────────────────────────── */}
      <aside className="wy-margin lg:sticky lg:top-24 lg:self-start" aria-label={t("summary")}>
        <h2 className="wy-label pb-2 wy-rule-b">{t("summary")}</h2>
        <ul className="mt-3">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-3 py-2.5 wy-rule-b text-micro">
              <span
                className="wy-drop mt-1.5"
                data-full="true"
                style={{ ["--drop" as string]: `var(--color-liquor-${line.liquor})` }}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block">{line.name}</span>
                <span className="wy-label">
                  {line.grams} g
                  {line.vaultYears ? ` — ${cartT("vaultYears", { years: line.vaultYears })}` : ""}
                  {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                </span>
              </span>
              <span className="price whitespace-nowrap">
                {formatPrice(lineTotal(line), locale)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-1.5 text-micro">
          <div className="flex justify-between">
            <dt className="text-stone">{cartT("subtotal")}</dt>
            <dd className="price">{formatPrice(totals.subtotal, locale)}</dd>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between">
              <dt className="text-stone">{cartT("discount")}</dt>
              <dd className="price text-amber-ink">&minus;{formatPrice(totals.discount, locale)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="text-stone">{cartT("shipping")}</dt>
            <dd className="price">
              {totals.shipping === 0 ? shippingT("free") : formatPrice(totals.shipping, locale)}
            </dd>
          </div>
          <div className="flex justify-between pt-2 wy-rule">
            <dt className="text-stone">{t("net")}</dt>
            <dd className="price">{formatPrice(totals.net, locale)}</dd>
          </div>
          {totals.lines.map((line) => (
            <div key={line.rate} className="flex justify-between">
              <dt className="text-stone">{t("vatRate", { rate: line.rate })}</dt>
              <dd className="price">{formatPrice(line.vat, locale)}</dd>
            </div>
          ))}
          <div className="flex justify-between pt-2 wy-rule text-ui">
            <dt>{t("total")}</dt>
            <dd className="price">{formatPrice(totals.gross, locale)}</dd>
          </div>
        </dl>
      </aside>
    </form>
  );
}

function shippingKey(id: ShippingMethodId) {
  switch (id) {
    case "bpost-home":
      return "bpostHome" as const;
    case "bpost-locker":
      return "bpostLocker" as const;
    case "mondial-relay":
      return "mondialRelay" as const;
    default:
      return "pickup" as const;
  }
}
