"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Instagram } from "@/components/ui/Icons";
import { site } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-bg-2/40">
      <div className="container-lux py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Reveal>
              <p className="overline mb-5">GIN Barbershop · Хмельницький</p>
              <p className="max-w-md text-xl font-light leading-relaxed text-muted-2">
                Не просто стрижка. Стиль, що говорить за вас. Преміальний
                догляд для сучасного чоловіка.
              </p>
            </Reveal>
            <div className="mt-8 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor="hover"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-muted-2 transition-all hover:border-gold/50 hover:text-gold"
              >
                <Instagram size={18} strokeWidth={1.6} />
              </a>
              <a
                href={site.phoneHref}
                aria-label="Подзвонити"
                data-cursor="hover"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-muted-2 transition-all hover:border-gold/50 hover:text-gold"
              >
                <Phone size={18} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="overline mb-6">Навігація</h4>
            <ul className="space-y-3 text-muted-2">
              {[
                ["Головна", "/#top"],
                ["Послуги", "/#services"],
                ["Галерея", "/#gallery"],
                ["Барбери", "/#barbers"],
                ["Контакти", "/#contacts"],
                ["Політика конфіденційності", "/privacy"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    data-cursor="hover"
                    className="link-underline text-sm transition-colors hover:text-fg"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="overline mb-6">Контакти</h4>
            <ul className="space-y-4 text-sm text-muted-2">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-gold" strokeWidth={1.6} />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 text-gold" strokeWidth={1.6} />
                <span>{site.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-gold" strokeWidth={1.6} />
                <a href={site.phoneHref} className="transition-colors hover:text-fg">
                  {site.phonePretty}
                </a>
              </li>
            </ul>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="mt-6 inline-flex items-center gap-1 text-sm text-gold link-underline"
            >
              Онлайн-запис <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Giant logo */}
      <div className="pointer-events-none select-none px-4 pb-8">
        <div className="text-center font-display font-extrabold leading-none tracking-tightest text-transparent"
          style={{
            fontSize: "clamp(4rem, 24vw, 22rem)",
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.01))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          GIN
        </div>
      </div>

      <div className="container-lux flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-xs text-muted sm:flex-row">
        <span>
          © {year} GIN Barbershop. Усі права захищено.
        </span>
        <span className="flex items-center gap-1.5">
          Зроблено з увагою до кожного пікселя · Хмельницький
        </span>
      </div>
    </footer>
  );
}
