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
  return { title: t("withdrawalTitle"),
    alternates: alternatesFor("/herroepingsrecht", locale as AppLocale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const sections = t.raw("withdrawalSections") as Section[];

  return (
    <ProsePage
      title={t("withdrawalTitle")}
      lede={t("withdrawalLede")}
      sections={sections}
      namespace="herroepingsrecht"
      updated={formatDate(t("effectiveDate"), locale as AppLocale)}
    />
  );
}
