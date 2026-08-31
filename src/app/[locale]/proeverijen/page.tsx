import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/alternates";
import type { AppLocale } from "@/i18n/routing";
import { tastings } from "@content/tastings";
import { BookingForm } from "@/components/tastings/BookingForm";
import { WaitingList } from "@/components/tastings/WaitingList";
import { JsonLd, eventJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/alternates";
import { formatDate, formatPrice } from "@/lib/format";
import { VENUE_OPEN } from "@/lib/venue";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: VENUE_OPEN ? t("tastingsTitle") : t("tastingsSoonTitle"),
    description: VENUE_OPEN ? t("tastingsDescription") : t("tastingsSoonDescription"),
    alternates: alternatesFor("/proeverijen", locale as AppLocale),
  };
}

export default async function TastingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;
  const t = await getTranslations("tastings");

  const url = absoluteUrl("/proeverijen", locale);

  /*
    Until there is a room, this page announces rather than sells. No dates, no
    seats, no Event markup: publishing an event for a venue that does not exist
    is the kind of thing search engines and customers both remember.
  */
  if (!VENUE_OPEN) {
    return (
      <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
        <header className="wy-grid">
          <div className="wy-main">
            <p className="wy-label">{t("soonLabel")}</p>
            <h1 className="mt-3">{t("soonTitle")}</h1>
            <p className="wy-lead mt-5 text-stone">{t("soonLede")}</p>
          </div>
        </header>

        <section aria-labelledby="wy-plan" className="wy-grid mt-[var(--section)] gap-y-6">
          <h2 id="wy-plan" className="wy-margin text-[1.25rem]">
            {t("soonPlanTitle")}
          </h2>
          <div className="wy-main">
            <p className="wy-prose">{t("soonPlanBody")}</p>
            <ul className="mt-8">
              {(["soonPlanOne", "soonPlanTwo", "soonPlanThree"] as const).map((key) => (
                <li key={key} className="wy-rule py-5 wy-prose text-[1rem]">
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="wy-waitlist" className="wy-grid mt-[var(--section)] gap-y-6">
          <h2 id="wy-waitlist" className="wy-margin text-[1.25rem]">
            {t("waitlistTitle")}
          </h2>
          <div className="wy-main">
            <p className="wy-prose">{t("waitlistBody")}</p>
            <WaitingList />
          </div>
        </section>

        <section aria-labelledby="wy-private" className="wy-grid mt-[var(--section)] gap-y-3">
          <h2 id="wy-private" className="wy-margin text-[1.25rem]">
            {t("privateTitle")}
          </h2>
          <p className="wy-main wy-prose">{t("privateSoonBody")}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(3rem, 7vw, 5.5rem)" }}>
      <JsonLd
        data={tastings.map((session) =>
          eventJsonLd({
            name: session.title[locale],
            description: session.description[locale],
            start: `${session.date}T${session.startTime}:00+02:00`,
            durationMinutes: session.durationMinutes,
            venue: session.venue,
            address: session.address,
            price: session.price,
            url,
            seatsLeft: session.seatsLeft,
          }),
        )}
      />

      <header className="wy-grid">
        <div className="wy-main">
          <h1>{t("title")}</h1>
          <p className="wy-lead mt-5 text-stone">{t("lede")}</p>
        </div>
      </header>

      <section aria-labelledby="wy-sessions" className="mt-16">
        <div className="wy-grid">
          <h2 id="wy-sessions" className="wy-main wy-label pb-2 wy-rule-b">
            {t("upcoming")}
          </h2>
        </div>

        <ul className="mt-2">
          {tastings.map((session) => (
            <li key={session.id} className="wy-grid wy-rule py-8 gap-y-3">
              <div className="wy-margin">
                <time dateTime={session.date} className="block text-ui">
                  {formatDate(session.date, locale)}
                </time>
                <p className="wy-label tnum mt-1">{session.startTime}</p>
              </div>
              <div className="wy-main">
                <h3 className="text-[1.5rem] leading-snug">{session.title[locale]}</h3>
                <p className="wy-prose mt-3 text-[1rem]">{session.description[locale]}</p>
                <p className="wy-meta mt-4">
                  <span>{session.venue}</span>
                  <span className="tnum">
                    {t("duration", { minutes: session.durationMinutes })}
                  </span>
                  <span className="tnum">
                    {t("perSeat", { price: formatPrice(session.price, locale) })}
                  </span>
                  <span className={session.seatsLeft === 0 ? "text-amber-ink" : undefined}>
                    {t("seatsLeft", { count: session.seatsLeft })}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="wy-book" className="mt-[var(--section)]">
        <div className="wy-grid gap-y-6">
          <div className="wy-main">
            <h2 id="wy-book" className="text-[2rem]">
              {t("bookTitle")}
            </h2>
            <p className="wy-lead mt-4 text-stone">{t("bookLede")}</p>
          </div>
        </div>

        <div className="wy-grid mt-10">
          <div className="wy-main">
            <BookingForm
              sessions={tastings.map((session) => ({
                id: session.id,
                seatsLeft: session.seatsLeft,
                label: `${formatDate(session.date, locale)} — ${session.venue.split(",")[0]} — ${session.title[locale]}`,
              }))}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="wy-private" className="wy-grid mt-[var(--section)] gap-y-3">
        <h2 id="wy-private" className="wy-margin text-[1.25rem]">
          {t("privateTitle")}
        </h2>
        <p className="wy-main wy-prose">{t("privateBody")}</p>
      </section>
    </div>
  );
}
