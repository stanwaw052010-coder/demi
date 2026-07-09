"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, LINKS, PHONE_DISPLAY } from "@/lib/site";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none ${className}`}>
      Rayskaya <em className="italic text-brand-deep">Beauty Space</em>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line/70 bg-cream/75 shadow-[0_8px_32px_rgba(34,39,25,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1360px] items-center justify-between px-5 md:px-10">
          <a href="#top" aria-label="Rayskaya Beauty Space — на початок">
            <Wordmark className="text-xl md:text-2xl" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[15px] font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={LINKS.phone}
              className="hidden items-center gap-2 text-[15px] font-semibold text-ink/80 transition-colors hover:text-brand-deep xl:flex"
            >
              <Phone className="h-4 w-4 text-brand-deep" />
              {PHONE_DISPLAY}
            </a>
            <a
              href="#booking"
              className="hidden rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(141,183,72,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_14px_36px_rgba(141,183,72,0.45)] sm:inline-flex"
            >
              Записатися
            </a>
            <a
              href={LINKS.phone}
              aria-label="Подзвонити"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink transition-colors hover:border-brand hover:text-brand-deep lg:hidden"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Відкрити меню"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Мобільне меню */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-cream transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between px-5">
          <Wordmark className="text-xl" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрити меню"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`h-display border-b border-line/70 py-4 text-4xl transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${100 + i * 60}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="px-8 pb-10">
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-semibold text-white"
          >
            Записатися
          </a>
          <a
            href={LINKS.phone}
            className="mt-4 flex items-center justify-center gap-2 text-base font-semibold text-olive"
          >
            <Phone className="h-4 w-4 text-brand-deep" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </>
  );
}
