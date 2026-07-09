import { MapPin, Phone, Navigation } from "lucide-react";
import { LINKS, PHONE_DISPLAY, ADDRESS } from "@/lib/site";

export default function FindUs() {
  return (
    <section id="contacts" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <p className="eyebrow mb-7" data-reveal="up">
          Як нас знайти
        </p>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <p
            className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] italic text-ink"
            data-reveal="blur"
          >
            {ADDRESS}
          </p>
          <a
            href={LINKS.maps}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="up"
            data-reveal-delay="0.15"
            className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 hover:border-brand hover:text-brand-deep"
          >
            <Navigation className="h-4.5 w-4.5 text-brand-deep" />
            Прокласти маршрут
          </a>
        </div>

        <div className="relative" data-reveal="scale">
          <div className="h-[440px] overflow-hidden rounded-[36px] border border-line shadow-[0_30px_70px_rgba(34,39,25,0.1)] md:h-[520px]">
            <iframe
              src={LINKS.mapsEmbed}
              title="Rayskaya Beauty Space на карті Google"
              className="h-full w-full grayscale-[35%] transition-all duration-700 hover:grayscale-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Інфокартка поверх карти */}
          <div className="pointer-events-none absolute inset-x-4 -bottom-8 md:inset-x-auto md:bottom-10 md:left-10 md:w-[380px]">
            <div className="pointer-events-auto rounded-[28px] border border-white/60 bg-white/90 p-7 shadow-[0_30px_70px_rgba(34,39,25,0.18)] backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display text-xl text-ink">
                    Rayskaya Beauty Space
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-olive">
                    {ADDRESS}
                  </p>
                  <a
                    href={LINKS.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-brand-deep underline-offset-4 hover:underline"
                  >
                    відкрити в Google Maps
                  </a>
                  <a
                    href={LINKS.phone}
                    className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition-colors hover:text-brand-deep"
                  >
                    <Phone className="h-4 w-4 text-brand-deep" />
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
