"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, SALON_NAME } from "@/lib/salon";

const NAV_LINKS = [
  { href: "#about", label: "Про нас" },
  { href: "#collection", label: "Колекція" },
  { href: "#services", label: "Послуги" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ivory/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wine font-display text-lg text-ivory">
            V
          </span>
          <span className="font-display text-2xl tracking-[0.1em] text-ink">
            {SALON_NAME}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-wine"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-wine"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_HREF}
            className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-ivory shadow-sm transition-colors hover:bg-wine-light"
          >
            Записатись
          </a>
        </div>

        <button
          aria-label="Меню"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-blush bg-ivory px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink-soft"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-base font-medium text-ink-soft"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={PHONE_HREF}
              className="mt-1 rounded-full bg-wine px-5 py-3 text-center text-sm font-semibold text-ivory"
            >
              Записатись
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
