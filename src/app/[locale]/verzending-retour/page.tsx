import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";
import { ProsePage, type Section } from "@/components/pages/Prose";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shippingContent" });
  return { title: t("title"),
    alternates: alternatesFor("/verzending-retour", locale as AppLocale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shippingContent");

  return (
    <ProsePage
      title={t("title")}
      lede={t("lede")}
      sections={t.raw("sections") as Section[]}
      namespace="shipping"
    />
  );
}
