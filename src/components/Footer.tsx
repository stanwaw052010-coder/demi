"use client";

import { Phone, MapPin, ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { LotusMark } from "./Decor";
import { InstagramIcon, WhatsAppIcon, TelegramIcon, ViberIcon } from "./icons/BrandIcons";

const nav = [
  { label: "Про мене", href: "#about" },
  { label: "Послуги", href: "#services" },
  { label: "Результати", href: "#results" },
  { label: "Курси", href: "#courses" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contact" },
];

const socials = [
  { href: site.instagramUrl, Icon: InstagramIcon, label: "Instagram" },
  { href: site.links.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp" },
  { href: site.links.telegram, Icon: TelegramIcon, label: "Telegram" },
  { href: site.links.viber, Icon: ViberIcon, label: "Viber" },
];

export function Footer() {
  return (
    <footer className="relative bg-cream-2 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-gold/15 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <LotusMark className="h-8 w-8 text-rose-deep" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-[0.12em] text-ink">
                  {site.brand}
                </span>
                <span className="eyebrow mt-1 text-[0.55rem] text-rose-deep/80">
                  massage & body studio
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              Студія корекції фігури та антицелюлітного масажу Анжели
              Кропивницької. Ендосфера, LPG, вакуумний масаж та курси навчання.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream transition-colors duration-300 hover:bg-rose-deep"
                >
                  <s.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="eyebrow text-rose-deep">Розділи</h4>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="eyebrow text-rose-deep">Контакти</h4>
            <ul className="mt-5 space-y-4 text-sm text-ink-soft">
              <li>
                <a href={site.links.tel} className="flex items-center gap-3 hover:text-ink">
                  <Phone className="h-4 w-4 text-gold" />
                  {site.phonePretty}
                </a>
              </li>
              <li>
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-ink"
                >
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" />
                  {site.addressShort}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} {site.name}. Усі права захищені.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft transition-colors hover:text-rose-deep"
          >
            Нагору
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
