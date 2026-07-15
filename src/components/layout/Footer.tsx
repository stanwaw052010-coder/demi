import Link from "next/link";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { serviceCategories } from "@/data/services";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-spa grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <span className="font-serif text-2xl tracking-[0.15em] text-white">СПАБЕЛЬ</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            SPA-салон краси повного циклу в Запоріжжі. Краса починається там, де про вас дійсно піклуються.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-500"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-500"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white">Навігація</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white">Послуги</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {serviceCategories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/services?category=${cat.slug}`} className="transition-colors hover:text-gold-400">
                  {cat.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-white">Контакти</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold-500" />
              <a href={siteConfig.phoneHref} className="transition-colors hover:text-gold-400">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold-500" />
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-gold-400">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
              <span>
                {siteConfig.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-spa flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Спабель. Усі права захищено.</p>
          <p>Дизайн та розробка — SPA студія краси</p>
        </div>
      </div>
    </footer>
  );
}
