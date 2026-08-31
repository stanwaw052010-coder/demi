import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProsePage, type Section } from "@/components/pages/Prose";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("termsTitle") };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const sections = t.raw("termsSections") as Section[];

  return (
    <ProsePage
      title={t("termsTitle")}
      lede={t("termsLede")}
      sections={sections}
      namespace="algemene-voorwaarden"
      updated={locale === "nl" ? "1 januari 2026" : "1 January 2026"}
    />
  );
}
