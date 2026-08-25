import Link from "next/link";
import { CalendarCheck, MapPin, Navigation, Phone } from "lucide-react";
import { Instagram } from "@/components/ui/icons";
import { BrandMark, Wordmark } from "@/components/ui/BrandMark";
import { landingPages } from "@/lib/landing";
import { mapsDirectionsUrl, nav, site } from "@/lib/site";

/**
 * Перші пункти ведуть на посадкові сторінки під пошукові запити.
 * Підвал є на кожній сторінці, тому це ще й головна внутрішня
 * перелінковка: саме по цих посиланнях робот і знаходить нові сторінки.
 */
const serviceLinks = [
  ...landingPages.map((page) => ({ label: page.short, href: `/${page.slug}` })),
  { label: "Естетика брів", href: "/#services" },
  { label: "Лазерна епіляція", href: "/#services" },
  { label: "Повний прайс", href: "/#price" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // pb на мобільних — щоб липка панель дій не перекривала останній рядок
    <footer className="relative isolate grain overflow-hidden bg-ink pb-20 text-white sm:pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-radial-[at_50%_0%] from-brand-700/30 to-transparent to-62%"
      />

      <div className="container-x relative z-10">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* бренд */}
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="size-12" tone="white" />
              <Wordmark tone="light" />
            </div>
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-white/55 text-pretty">
              Простір подології та нігтьового сервісу у Вишгороді. Здорові стопи, естетика нігтів і брів,
              лазерна епіляція та стерильність.
            </p>
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[0.85rem] font-bold text-white transition-colors duration-300 glass hover:bg-white/15"
            >
              <CalendarCheck className="size-4 text-aqua-300" strokeWidth={2.4} />
              {site.booking.label}
            </a>
          </div>

          {/* навігація */}
          <nav aria-label="Навігація у підвалі">
            <h2 className="text-[0.7rem] font-bold tracking-[0.18em] text-white/40 uppercase">Навігація</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.92rem] font-semibold text-white/70 transition-colors duration-300 hover:text-aqua-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* послуги */}
          <div>
            <h2 className="text-[0.7rem] font-bold tracking-[0.18em] text-white/40 uppercase">Послуги</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.92rem] font-semibold text-white/70 transition-colors duration-300 hover:text-aqua-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* контакти */}
          <div>
            <h2 className="text-[0.7rem] font-bold tracking-[0.18em] text-white/40 uppercase">Контакти</h2>
            <ul className="mt-6 flex flex-col gap-5">
              <li>
                <a href={site.phone.href} className="group flex items-start gap-3">
                  <Phone className="mt-0.5 size-[1.05rem] shrink-0 text-aqua-300" strokeWidth={2.3} />
                  <span className="text-[0.98rem] font-extrabold tracking-[-0.02em] text-white transition-colors group-hover:text-aqua-300">
                    {site.phone.display}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <Instagram className="mt-0.5 size-[1.05rem] shrink-0 text-aqua-300" strokeWidth={2.2} />
                  <span className="text-[0.92rem] font-semibold text-white/70 transition-colors group-hover:text-aqua-300">
                    {site.instagram.handle}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-[1.05rem] shrink-0 text-aqua-300" strokeWidth={2.3} />
                <span className="text-[0.92rem] leading-snug font-semibold text-white/70">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region}
                  <br />
                  <span className="text-white/45">{site.address.landmark}</span>
                </span>
              </li>
              <li>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-white/70 underline-offset-4 transition-colors hover:text-aqua-300 hover:underline"
                >
                  <Navigation className="size-4" strokeWidth={2.4} />
                  Прокласти маршрут
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.82rem] font-medium text-white/40">
            © {year} {site.name}. Усі права захищено.
          </p>
          <p className="text-[0.82rem] font-medium text-white/40">
            {site.address.city}, {site.address.region} · Години роботи: {site.hours}
          </p>
        </div>
      </div>
    </footer>
  );
}
