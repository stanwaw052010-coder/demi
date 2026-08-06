import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { MapPanel } from "@/components/sections/map-panel";

export function Contacts() {
  return (
    <section id="contacts" className="bg-white py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="12"
          eyebrow="Контакти"
          title={
            <>
              Завітайте до нас{" "}
              <span className="accent text-clay">у центрі Тернополя</span>
            </>
          }
          description="Зателефонуйте або напишіть в Instagram — підберемо зручний час, зазвичай уже на найближчі дні."
        />

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* Map */}
          <Reveal y={32} className="h-full">
            <MapPanel />
          </Reveal>

          {/* Details */}
          <Reveal delay={0.08} y={32} className="h-full">
            <div className="flex h-full flex-col gap-4">
              {/* Phone — the primary action, impossible to miss */}
              <a
                href={site.phoneHref}
                className="group flex items-center justify-between gap-5 rounded-[24px] bg-ink p-7 text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-8"
              >
                <span>
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    Телефон
                  </span>
                  <span className="mt-2 block font-display text-[26px] font-bold tabular-nums tracking-[-0.02em] md:text-[32px]">
                    {site.phone}
                  </span>
                </span>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  <Phone className="size-5" strokeWidth={2.25} />
                </span>
              </a>

              {/* Address */}
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[24px] border border-ink/15 bg-white p-7 transition-colors duration-500 hover:border-ink/40 md:p-8"
              >
                <span className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-graphite">
                  <MapPin className="size-4" strokeWidth={2.25} />
                  Адреса
                </span>
                <span className="mt-3 block font-display text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink md:text-[26px]">
                  {site.address}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline-offset-4 group-hover:underline">
                  Прокласти маршрут
                  <ArrowUpRight className="size-4" strokeWidth={2.25} />
                </span>
              </a>

              {/* Hours + Instagram */}
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-ink/15 bg-white p-7">
                  <span className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-graphite">
                    <Clock className="size-4" strokeWidth={2.25} />
                    Графік
                  </span>
                  {/* Day by day: a patient checking one weekday should not
                      have to decode a range. */}
                  <dl className="mt-4 divide-y divide-ink/[0.07]">
                    {site.hours.map((h) => {
                      const closed = h.time === "Вихідний";
                      return (
                        <div
                          key={h.days}
                          className="flex items-baseline justify-between gap-3 py-2"
                        >
                          <dt
                            className={cn(
                              "text-[14px]",
                              closed ? "text-graphite/70" : "text-graphite",
                            )}
                          >
                            {h.days}
                          </dt>
                          <dd
                            className={cn(
                              "whitespace-nowrap text-right text-[14px] font-semibold tabular-nums",
                              closed ? "text-graphite/70" : "text-ink",
                            )}
                          >
                            {h.time}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-[24px] border border-ink/15 bg-white p-7 transition-colors duration-500 hover:border-ink/40"
                >
                  <span className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-graphite">
                    <InstagramIcon className="size-4" strokeWidth={2.25} />
                    Instagram
                  </span>
                  <span>
                    <span className="mt-6 block font-display text-[18px] font-semibold tracking-[-0.01em] text-ink md:text-[20px]">
                      {site.instagramHandle}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-[14px] font-medium text-graphite group-hover:text-ink">
                      Фото робіт щодня
                      <ArrowUpRight className="size-4" strokeWidth={2.25} />
                    </span>
                  </span>
                </a>
              </div>

              <ButtonLink href={site.phoneHref} size="lg" className="w-full font-semibold">
                Записатися на прийом
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
