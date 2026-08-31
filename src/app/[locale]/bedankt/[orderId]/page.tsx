import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { LogoMark } from "@/components/brand/Logo";
import { getOrder, isEphemeralStorage } from "@/lib/orders/store";
import { isValidOrderNumber } from "@/lib/order";
import { formatDate, formatPrice } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; orderId: string }>;
}): Promise<Metadata> {
  const { locale, orderId } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("orderTitle", { number: orderId }),
    robots: { index: false, follow: false },
  };
}

/**
 * The confirmation is the second and last centred page on the site. Everything
 * about the order is on it, because the email may not have arrived yet.
 */
export default async function ThanksPage({
  params,
}: {
  params: Promise<{ locale: string; orderId: string }>;
}) {
  const { locale: raw, orderId } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const t = await getTranslations("order");
  const cartT = await getTranslations("cart");
  const checkoutT = await getTranslations("checkout");
  const shippingT = await getTranslations("shippingMethods");
  const actions = await getTranslations("actions");

  const order = isValidOrderNumber(orderId) ? await getOrder(orderId) : undefined;

  if (!order) {
    /*
      A well-formed number that storage cannot produce is not the same thing as
      a wrong number. On a serverless host the JSON store only lives inside one
      warm instance, so a customer who just paid can easily land here. Telling
      them "we do not know this order" would be both alarming and untrue.
    */
    const plausible = isValidOrderNumber(orderId) && isEphemeralStorage();

    return (
      <div className="wy-shell" style={{ paddingBlock: "clamp(4rem, 12vh, 8rem)" }}>
        <div className="mx-auto text-center" style={{ maxWidth: "42ch" }}>
          <span className="flex justify-center">
            <LogoMark size={48} />
          </span>
          <h1 className="mt-6 text-[2rem]">
            {plausible ? t("receivedTitle") : t("notFoundTitle")}
          </h1>
          {plausible ? (
            <p className="tnum mt-4 text-ui">{orderId}</p>
          ) : null}
          <p className="wy-prose mt-4 mx-auto">
            {plausible ? t("receivedBody") : t("notFoundBody")}
          </p>
          <Link href="/thee" className="wy-btn mt-8">
            {actions("continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  const statusLabel =
    order.status === "paid"
      ? t("statusPaid")
      : order.status === "mock"
        ? t("statusMock")
        : t("statusPending");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 9vh, 6rem)" }}>
      <div className="mx-auto text-center" style={{ maxWidth: "34rem" }}>
        <span className="flex justify-center">
          <LogoMark size={54} />
        </span>
        <h1 className="mt-7" style={{ fontSize: "clamp(2.25rem, 1.6rem + 2.4vw, 3.25rem)" }}>
          {t("thanksTitle")}
        </h1>
        <p className="wy-lead mt-4 mx-auto text-stone">
          {t("thanksLede", { email: order.input.email })}
        </p>
      </div>

      <div className="mx-auto mt-14" style={{ maxWidth: "40rem" }}>
        <dl className="wy-meta justify-center pb-6 wy-rule-b">
          <span>
            <dt className="sr-only">{t("number")}</dt>
            <dd className="tnum text-ink">{order.number}</dd>
          </span>
          <span>
            <dt className="sr-only">{t("date")}</dt>
            <dd>{formatDate(order.createdAt, locale)}</dd>
          </span>
          <span>
            <dt className="sr-only">{t("status")}</dt>
            <dd>{statusLabel}</dd>
          </span>
        </dl>

        <h2 className="wy-label mt-10 pb-2 wy-rule-b">{t("items")}</h2>
        <ul>
          {order.input.lines.map((line) => (
            <li key={line.sku} className="flex gap-4 py-3 wy-rule-b text-micro">
              <span className="min-w-0 flex-1">
                <Link
                  href={{ pathname: "/thee/[slug]", params: { slug: line.slug } }}
                  className="wy-link text-[1rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {line.name}
                </Link>
                <span className="wy-label block">
                  {line.grams} g
                  {line.vaultYears ? ` — ${cartT("vaultYears", { years: line.vaultYears })}` : ""}
                  {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                </span>
              </span>
              <span className="price whitespace-nowrap">
                {formatPrice((line.price + (line.vaultFee ?? 0)) * line.quantity, locale)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-1.5 text-micro">
          <div className="flex justify-between">
            <dt className="text-stone">{cartT("subtotal")}</dt>
            <dd className="price">{formatPrice(order.totals.subtotal, locale)}</dd>
          </div>
          {order.totals.discount > 0 ? (
            <div className="flex justify-between">
              <dt className="text-stone">{cartT("discount")}</dt>
              <dd className="price text-amber-ink">
                &minus;{formatPrice(order.totals.discount, locale)}
              </dd>
            </div>
          ) : null}
          <div className="flex justify-between">
            <dt className="text-stone">{cartT("shipping")}</dt>
            <dd className="price">
              {order.totals.shipping === 0
                ? shippingT("free")
                : formatPrice(order.totals.shipping, locale)}
            </dd>
          </div>
          <div className="flex justify-between pt-2 wy-rule">
            <dt className="text-stone">{checkoutT("net")}</dt>
            <dd className="price">{formatPrice(order.totals.net, locale)}</dd>
          </div>
          {order.totals.vatLines.map((line) => (
            <div key={line.rate} className="flex justify-between">
              <dt className="text-stone">{checkoutT("vatRate", { rate: line.rate })}</dt>
              <dd className="price">{formatPrice(line.vat, locale)}</dd>
            </div>
          ))}
          <div className="flex justify-between pt-2 wy-rule text-ui">
            <dt>{checkoutT("total")}</dt>
            <dd className="price">{formatPrice(order.totals.total, locale)}</dd>
          </div>
        </dl>

        <div className="grid sm:grid-cols-2 gap-8 mt-12">
          <section>
            <h2 className="wy-label pb-2 wy-rule-b">{t("deliveryTo")}</h2>
            <address className="not-italic text-micro mt-3 leading-relaxed">
              {order.input.firstName} {order.input.lastName}
              <br />
              {order.input.street} {order.input.houseNumber}
              {order.input.bus ? ` bus ${order.input.bus}` : ""}
              <br />
              {order.input.postcode} {order.input.city}
            </address>
          </section>
          <section>
            <h2 className="wy-label pb-2 wy-rule-b">{t("tracking")}</h2>
            {order.trackingNumber ? (
              <p className="tnum text-micro mt-3">{order.trackingNumber}</p>
            ) : (
              <p className="wy-label mt-3">{t("trackingPending")}</p>
            )}
          </section>
        </div>

        <p className="wy-label mt-12 text-center">{t("questions")}</p>

        <div className="flex justify-center mt-6">
          <Link href="/thee" className="wy-btn">
            {actions("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
