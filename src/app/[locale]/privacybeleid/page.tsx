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
  return { title: t("privacyTitle"),
    alternates: alternatesFor("/privacybeleid", locale as AppLocale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const sections = t.raw("privacySections") as Section[];

  return (
    <ProsePage
      title={t("privacyTitle")}
      lede={t("privacyLede")}
      sections={sections}
      namespace="privacybeleid"
      updated={formatDate(t("effectiveDate"), locale as AppLocale)}
    />
  );
}
