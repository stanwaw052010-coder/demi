import { ExternalLink, MapPin } from "lucide-react";
import {
  EXTRA_LOCATIONS,
  SALON_ADDRESS,
  SALON_INSTAGRAM_HANDLE,
  SALON_INSTAGRAM_URL,
  SALON_MAP_EMBED_SRC,
  SALON_MAP_URL,
  SALON_NAME,
  SALON_SERVICES,
  SALON_TAGLINE,
} from "@/lib/mentor";
import { Instagram } from "./icons";

export default function Salon() {
  return (
    <section id="salon" className="bg-concrete-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            Мій салон
          </p>
          <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
            {SALON_NAME}
          </h2>
          <p className="mt-3 text-cream-soft">{SALON_TAGLINE}</p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <iframe
              src={SALON_MAP_EMBED_SRC}
              title={`${SALON_NAME} на карті`}
              className="h-[360px] w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-concrete p-6">
              <p className="font-display text-sm uppercase tracking-wide text-cream">
                Послуги салону
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SALON_SERVICES.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-2 text-sm text-cream-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-light" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-concrete p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/15 text-green-light">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cream">Адреса</p>
                <p className="mt-1 text-sm text-cream-soft">{SALON_ADDRESS}</p>
                <a
                  href={SALON_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-green-light hover:text-green"
                >
                  Відкрити в Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-green p-6 text-center">
              <p className="font-display text-sm uppercase tracking-wide text-cream">
                Записатись у салон
              </p>
              <a
                href={SALON_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-concrete px-6 py-3 text-sm font-semibold text-cream hover:bg-concrete-2"
              >
                <Instagram className="h-4 w-4" />
                {SALON_INSTAGRAM_HANDLE}
              </a>
            </div>

            {EXTRA_LOCATIONS.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {EXTRA_LOCATIONS.map((url, i) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-cream-soft hover:border-green-light hover:text-green-light"
                  >
                    Ще локація {i + 1}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
