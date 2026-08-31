import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";
import { Quiz, type QuizCandidate } from "@/components/quiz/Quiz";
import { cheapestVariant, getAllProducts, getRegion, inStock } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("quizTitle"), description: t("quizDescription"),
    alternates: alternatesFor("/theeproever", locale as AppLocale),
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const t = await getTranslations("quiz");
  const categoryT = await getTranslations("category");

  // Only what a recommendation may actually point at, trimmed to the fields the
  // client needs so the whole catalogue does not travel to the browser.
  const candidates: QuizCandidate[] = getAllProducts()
    .filter((product) => product.category !== "teaware" && inStock(product))
    .map((product) => {
      const variant = cheapestVariant(product);
      const region = product.passport ? getRegion(product.passport.regionId) : undefined;
      return {
        slug: product.slug,
        name: product.name,
        hanzi: product.hanzi,
        liquor: product.liquor,
        category: product.category,
        categoryLabel: categoryT(product.category),
        tagline: product.copy.tagline[locale],
        region: region?.name ?? null,
        year: product.passport?.harvestYear ?? null,
        price: variant.price,
        sku: variant.sku,
        grams: variant.grams,
        vat: product.vat,
        caffeine: product.caffeine,
      };
    });

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <div className="mt-16">
        <Quiz candidates={candidates} />
      </div>
    </div>
  );
}
