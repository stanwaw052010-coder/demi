import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd, faqJsonLd } from "@/lib/seo";

interface Item {
  q: string;
  a: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqContent" });
  return { title: t("title"), description: t("lede") };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faqContent");
  const items = t.raw("items") as Item[];

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <JsonLd data={faqJsonLd(items)} />

      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <div className="mt-16">
        {items.map((item, index) => (
          <details key={index} className="wy-rule group" name="faq">
            <summary className="wy-grid py-6 cursor-pointer list-none items-baseline gap-y-2">
              <span className="wy-margin tnum wy-label">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="wy-main text-[1.25rem] leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.q}
              </span>
            </summary>
            <div className="wy-grid pb-8">
              <p className="wy-main wy-prose">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
