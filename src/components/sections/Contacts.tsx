"use client";

import { Phone, Navigation, Calendar, MapPin, Clock } from "lucide-react";
import { Instagram } from "@/components/ui/Icons";
import { site } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export default function Contacts() {
  const items = [
    {
      icon: <MapPin size={18} />,
      label: "Адреса",
      value: "Хмельницький, Україна",
      href: site.mapsUrl,
    },
    {
      icon: <Clock size={18} />,
      label: "Графік роботи",
      value: "Щодня · 10:00 – 20:00",
    },
    {
      icon: <Phone size={18} />,
      label: "Телефон",
      value: site.phonePretty,
      href: site.phoneHref,
    },
    {
      icon: <Instagram size={18} />,
      label: "Instagram",
      value: site.instagramHandle,
      href: site.instagram,
    },
  ];

  return (
    <section id="contacts" className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="mb-16">
          <Reveal>
            <p className="overline mb-6">Контакти · Локація</p>
          </Reveal>
          <h2 className="h-section max-w-3xl font-display text-fg">
            <TextReveal text="Завітайте до нас" />
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Info */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/8 bg-bg-2/40 p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              {items.map((it) => {
                const inner = (
                  <div className="group">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gold transition-colors group-hover:border-gold/40">
                      {it.icon}
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-widest text-muted">
                      {it.label}
                    </p>
                    <p className="mt-1 text-lg text-fg transition-colors group-hover:text-gold">
                      {it.value}
                    </p>
                  </div>
                );
                return it.href ? (
                  <a
                    key={it.label}
                    href={it.href}
                    target={it.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-cursor="hover"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={it.label}>{inner}</div>
                );
              })}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-gold"
              >
                <Phone size={16} /> Подзвонити
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Navigation size={16} /> Маршрут
              </a>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-3.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                <Calendar size={16} /> Записатися
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-white/8">
            <iframe
              src={site.mapsEmbed}
              title="GIN Barbershop на карті"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale invert-[0.92] contrast-[0.9]"
              style={{ filter: "grayscale(1) invert(0.9) contrast(0.85)" }}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
