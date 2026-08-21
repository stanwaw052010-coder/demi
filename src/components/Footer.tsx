import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { LogoMark } from "@/components/ui/Logo";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-espresso px-5 pb-28 pt-16 sm:px-8 lg:pb-16">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <LogoMark className="h-8 w-8 text-gold" />
            <p className="mt-5 font-display text-3xl leading-tight text-sand">
              SISTER&rsquo;S
              <span className="block text-xl text-beige">Beauty Studio</span>
            </p>
            <p className="label-spaced mt-5 text-beige">{site.tagline}</p>
          </div>

          <nav aria-label="Навігація у футері" className="flex flex-col gap-3">
            <p className="label-spaced text-gold">Розділи</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-beige transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/pryslist" className="text-sm text-beige transition-colors hover:text-gold">
              Повний прайс
            </Link>
            <Link href="/kontakty" className="text-sm text-beige transition-colors hover:text-gold">
              Контакти й карта
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="label-spaced text-gold">Контакти</p>
            <a
              href={site.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-sm text-beige transition-colors hover:text-gold"
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
              {site.address.full}
            </a>
            {site.masters.map((master) => (
              <a
                key={master.phone}
                href={`tel:${master.phone}`}
                className="flex items-center gap-2.5 text-sm text-beige transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
                {master.phoneLabel} — {master.name}
              </a>
            ))}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-beige transition-colors hover:text-gold"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-gold" />
              {site.instagram.handle}
            </a>
            <p className="mt-2 text-sm text-beige">{site.hours.label}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gold/12 pt-7 text-xs text-beige sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SISTER&rsquo;S Beauty Studio · {site.address.locality}</p>
          <p>Студія, створена з любов&rsquo;ю</p>
        </div>
      </div>
    </footer>
  );
}
