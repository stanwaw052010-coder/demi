import { getTranslations } from "next-intl/server";
import type { Review } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";

/** Sober, as rows in the register. No stars-as-decoration, no avatars. */
export async function Reviews({
  reviews,
  locale,
}: {
  reviews: Review[];
  locale: AppLocale;
}) {
  const t = await getTranslations("product");

  if (reviews.length === 0) {
    return (
      <section aria-labelledby="wy-reviews">
        <h2 id="wy-reviews" className="wy-label pb-2 wy-rule-b">
          {t("reviews")}
        </h2>
        <p className="wy-label mt-4">{t("noReviews")}</p>
      </section>
    );
  }

  const average = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <section aria-labelledby="wy-reviews">
      <div className="flex items-baseline gap-5 pb-2 wy-rule-b">
        <h2 id="wy-reviews" className="wy-label">
          {t("reviews")}
        </h2>
        <p className="wy-meta">
          <span className="tnum">{t("ratingOf", { rating: average.toFixed(1) })}</span>
          <span className="tnum">{t("reviewCount", { count: reviews.length })}</span>
        </p>
      </div>

      <ul>
        {reviews.map((review) => (
          <li key={`${review.author}-${review.date}`} className="py-5 wy-rule-b">
            <p className="wy-prose text-[1rem]">{review.body[locale]}</p>
            <p className="wy-meta mt-3">
              <span>{review.author}</span>
              <span>{review.city}</span>
              <span>
                <time dateTime={review.date}>{formatDate(review.date, locale)}</time>
              </span>
              <span className="tnum">{t("ratingOf", { rating: review.rating })}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
