import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { NAV_LINKS, SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { InstagramIcon } from "@/components/shared/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-lux section-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-serif text-2xl tracking-[0.12em]">
            СПАБЕЛЬ
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Салон краси повного циклу в Запоріжжі. SPA, косметологія, перукарня та
            нігтьовий сервіс в атмосфері спокою та преміального сервісу.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center border border-white/15 transition-colors hover:border-gold-500 hover:text-gold-400"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="mb-1 text-xs uppercase tracking-[0.25em] text-gold-500">Меню</h3>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="mb-1 text-xs uppercase tracking-[0.25em] text-gold-500">Послуги</h3>
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {service.shortTitle}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="mb-1 text-xs uppercase tracking-[0.25em] text-gold-500">Контакти</h3>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            {SITE.addressFull}
          </a>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 shrink-0 text-gold-500" />
            {SITE.phone}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 shrink-0 text-gold-500" />
            {SITE.email}
          </a>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            <div className="flex flex-col gap-0.5">
              {SITE.workingHours.map((row) => (
                <span key={row.days}>
                  {row.days}: {row.hours}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lux section-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name}. Всі права захищено.</span>
          <span>Салон краси та SPA у Запоріжжі</span>
        </div>
      </div>
    </footer>
  );
}
