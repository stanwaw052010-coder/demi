import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  TelegramIcon,
  AppleIcon,
  GooglePlayIcon,
} from "./icons";
import { NAV, LINKS, PHONE_DISPLAY, HOURS, SERVICES } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1a2012] text-white">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(141,183,72,0.14)_0%,transparent_65%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-[1360px] px-5 pb-10 pt-20 md:px-10 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          {/* Бренд */}
          <div>
            <Image
              src="/logo/rayskaya-light.svg"
              alt="Rayskaya Beauty Space"
              width={200}
              height={59}
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/60">
              Косметологія і естетика обличчя та тіла. Індивідуальний підхід —
              сучасні методики.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                {
                  href: LINKS.instagram,
                  icon: <InstagramIcon className="h-5 w-5" />,
                  label: "Instagram",
                },
                {
                  href: LINKS.tiktok,
                  icon: <TikTokIcon className="h-4.5 w-4.5" />,
                  label: "TikTok",
                },
                {
                  href: LINKS.whatsapp,
                  icon: <WhatsAppIcon className="h-5 w-5" />,
                  label: "WhatsApp",
                },
                {
                  href: LINKS.telegram,
                  icon: <TelegramIcon className="h-5 w-5" />,
                  label: "Telegram",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Навігація */}
          <nav aria-label="Футер — навігація">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
              Навігація
            </p>
            <ul className="space-y-3.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-brand"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="text-[15px] text-white/70 transition-colors hover:text-brand"
                >
                  Онлайн-запис
                </a>
              </li>
            </ul>
          </nav>

          {/* Послуги */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
              Послуги
            </p>
            <ul className="space-y-3.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-[15px] text-white/70 transition-colors hover:text-brand"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
              Контакти
            </p>
            <a
              href={LINKS.phone}
              className="flex items-center gap-3 text-[17px] font-semibold text-white transition-colors hover:text-brand"
            >
              <Phone className="h-4.5 w-4.5 text-brand" strokeWidth={1.8} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-start gap-3 text-[15px] text-white/70 transition-colors hover:text-brand"
            >
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" strokeWidth={1.8} />
              м. Харків — відкрити в Google Maps
            </a>
            <div className="mt-5 border-t border-white/10 pt-5">
              {HOURS.map((h) => (
                <p
                  key={h.days}
                  className="flex items-center justify-between py-1 text-[14px]"
                >
                  <span className="text-white/55">{h.days}</span>
                  <span
                    className={
                      h.closed ? "text-[#d98b7d]" : "font-semibold text-white/85"
                    }
                  >
                    {h.time}
                  </span>
                </p>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={LINKS.appStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="App Store"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-white/80 transition-all duration-300 hover:border-brand hover:text-white"
              >
                <AppleIcon className="h-4.5 w-4.5" /> App Store
              </a>
              <a
                href={LINKS.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Play"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-white/80 transition-all duration-300 hover:border-brand hover:text-white"
              >
                <GooglePlayIcon className="h-4 w-4" /> Google Play
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-white/40">
          <p>
            © {new Date().getFullYear()} Rayskaya Beauty Space. Усі права
            захищено.
          </p>
          <p className="font-display italic text-white/50">beauty space</p>
        </div>
      </div>
    </footer>
  );
}
