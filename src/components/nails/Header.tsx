"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#services", label: "Послуги" },
  { href: "#prices", label: "Ціни" },
  { href: "#gallery", label: "Роботи" },
  { href: "#about", label: "Про майстра" },
  { href: "#contact", label: "Контакти" },
];

const PHONE_DISPLAY = "098 972 39 43";
const PHONE_HREF = "tel:+380989723943";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="font-script text-2xl text-brand-dark">
          Наталія Пархуц
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-brand-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-semibold text-foreground/80"
          >
            <Phone className="h-4 w-4 text-brand-dark" strokeWidth={1.75} />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-brand-dark"
          >
            Записатись
          </a>
        </div>

        <button
          className="flex items-center justify-center rounded-full border border-pink-200 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-pink-100 bg-cream px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-pink-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={PHONE_HREF}
            className="mt-3 flex items-center gap-2 px-3 text-sm font-semibold text-foreground/80"
          >
            <Phone className="h-4 w-4 text-brand-dark" strokeWidth={1.75} />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Записатись
          </a>
        </div>
      )}
    </header>
  );
}
