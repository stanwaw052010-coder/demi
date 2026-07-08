"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { LINKS, NAV, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.32 5.56a4.8 4.8 0 0 1-2.85-2.43 4.73 4.73 0 0 1-.42-1.63h-3.1v13.03a2.86 2.86 0 0 1-2.85 2.75 2.86 2.86 0 0 1-2.85-2.86 2.86 2.86 0 0 1 3.72-2.72V8.53a6.03 6.03 0 0 0-.87-.07 5.99 5.99 0 0 0-5.98 5.99 5.99 5.99 0 0 0 5.98 5.98 5.99 5.99 0 0 0 5.98-5.98V8.72a7.83 7.83 0 0 0 4.4 1.35V6.98a4.8 4.8 0 0 1-1.16-1.42z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-8 overflow-hidden bg-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[480px] rounded-full bg-brand/20 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Image
              src="/logo-light.svg"
              alt="Rayskaya Beauty Space"
              width={200}
              height={112}
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">
              Косметологія і естетика обличчя та тіла. Індивідуальний підхід —
              сучасні методики.
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <TikTokIcon className="size-4.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Меню у футері">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-soft">
              Навігація
            </p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/75 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="text-white/75 transition-colors duration-300 hover:text-white"
                >
                  Онлайн-запис
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-soft">
              Контакти
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-5 flex items-center gap-3 font-display text-2xl text-white transition-colors hover:text-brand-soft"
            >
              <Phone className="size-5 text-brand" strokeWidth={1.5} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={LINKS.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-white/70 transition-colors hover:text-white"
            >
              Rayskaya Beauty Space — відкрити в Google Maps →
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={LINKS.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:border-brand hover:bg-brand"
              >
                App Store
              </a>
              <a
                href={LINKS.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:border-brand hover:bg-brand"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Rayskaya Beauty Space. Усі права
            захищено.
          </p>
          <p className="italic">Beauty space, де турбота — це естетика</p>
        </div>
      </div>
    </footer>
  );
}
