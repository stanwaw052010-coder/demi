"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo, InstagramIcon } from "./Icons";

const NAV = [
  { href: "#about", label: "Про клініку" },
  { href: "#services", label: "Послуги" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contact", label: "Контакти" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Logo />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-[#0d3b3e]">
              KOLIBRI
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Щелепно-лицева хірургія та стоматологія
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-[#0d3b3e]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://www.instagram.com/kolibri.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-[#ff6f91] hover:text-[#ff6f91]"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href="tel:+380930900600"
            className="flex items-center gap-2 text-sm font-semibold text-[#0d3b3e]"
          >
            <Phone className="h-4 w-4" />
            093 090 0600
          </a>
          <a
            href="#contact"
            className="rounded-full bg-[#0d3b3e] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0a2e30]"
          >
            Записатись
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 lg:hidden"
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-black/5 pt-3">
            <a
              href="tel:+380930900600"
              className="flex items-center gap-2 text-sm font-semibold text-[#0d3b3e]"
            >
              <Phone className="h-4 w-4" />
              093 090 0600
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="ml-auto rounded-full bg-[#0d3b3e] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Записатись
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
