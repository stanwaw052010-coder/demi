"use client";

import Image from "next/image";
import {
  ADDRESS,
  CITY,
  LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

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
    <footer className="bg-dark px-6 py-14 sm:px-10" role="contentinfo">
      <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-6">
        <div>
          <Image
            src="/logo-light.svg"
            alt="Rayskaya Beauty Space"
            width={170}
            height={95}
            className="h-12 w-auto"
          />
          <div className="mt-3 flex items-center gap-2.5">
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center border-[0.5px] border-brand/30 text-[#f3f5ec]/70 transition-colors duration-200 hover:border-brand hover:text-brand-soft"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex size-9 items-center justify-center border-[0.5px] border-brand/30 text-[#f3f5ec]/70 transition-colors duration-200 hover:border-brand hover:text-brand-soft"
            >
              <TikTokIcon className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="text-[11px] uppercase tracking-[0.18em] text-[#f3f5ec]/35">
          Косметологія · {CITY}
        </div>

        <div className="sm:text-right">
          <a
            href={`tel:${PHONE_TEL}`}
            className="text-[15px] font-light tracking-[0.04em] text-brand-soft transition-opacity hover:opacity-80"
          >
            {PHONE_DISPLAY}
          </a>
          <div className="mt-1 text-xs text-[#f3f5ec]/40">{ADDRESS}</div>
          <div className="mt-3 flex gap-2 sm:justify-end">
            <a
              href={LINKS.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[0.5px] border-brand/30 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#f3f5ec]/70 transition-colors duration-200 hover:border-brand hover:text-brand-soft"
            >
              App Store
            </a>
            <a
              href={LINKS.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[0.5px] border-brand/30 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#f3f5ec]/70 transition-colors duration-200 hover:border-brand hover:text-brand-soft"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1040px] flex-wrap justify-between gap-2 border-t-[0.5px] border-brand/15 pt-6">
        <span className="text-[11px] tracking-[0.06em] text-[#f3f5ec]/25">
          © {new Date().getFullYear()} Rayskaya Beauty Space. Усі права
          захищені.
        </span>
        <span className="text-[11px] tracking-[0.06em] text-[#f3f5ec]/25">
          {CITY}, Україна
        </span>
      </div>
    </footer>
  );
}
