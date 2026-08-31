import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";
import { ProsePage, type Section } from "@/components/pages/Prose";
import { formatDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("cookiesTitle"),
    alternates: alternatesFor("/cookiebeleid", locale as AppLocale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const sections = t.raw("cookiesSections") as Section[];

  return (
    <ProsePage
      title={t("cookiesTitle")}
      lede={t("cookiesLede")}
      sections={sections}
      namespace="cookiebeleid"
      updated={formatDate(t("effectiveDate"), locale as AppLocale)}
    />
  );
}
