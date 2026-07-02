"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { INSTAGRAM_URL, SHOP_NAME } from "@/lib/amulets";

const NAV_LINKS = [
  { href: "#story", label: "Про нас" },
  { href: "#collection", label: "Колекція" },
  { href: "#craft", label: "Матеріали" },
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
        scrolled ? "bg-void/95 shadow-lg shadow-black/20 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-copper/50 font-display text-lg text-copper-light">
            A
          </span>
          <span className="font-display text-xl tracking-[0.15em] text-parchment">
            {SHOP_NAME}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-parchment-soft transition-colors hover:text-copper-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-copper px-5 py-2.5 text-sm font-semibold text-copper-light transition-colors hover:bg-copper hover:text-void"
          >
            Замовити
          </a>
        </div>

        <button
          aria-label="Меню"
          className="flex h-10 w-10 items-center justify-center rounded-full text-parchment md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-copper/20 bg-void px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-parchment-soft"
              >
                {link.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 rounded-full border border-copper px-5 py-3 text-center text-sm font-semibold text-copper-light"
            >
              Замовити
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
