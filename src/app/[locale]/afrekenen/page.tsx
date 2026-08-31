import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { paymentMode } from "@/lib/payments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("checkoutTitle"), robots: { index: false, follow: false } };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-4 text-stone">{t("lede")}</p>
        </div>
      </header>

      <div className="mt-14">
        <CheckoutForm mockPayments={paymentMode() === "mock"} />
      </div>
    </div>
  );
}
