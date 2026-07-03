"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAME, PERSONAL_INSTAGRAM_URL } from "@/lib/mentor";

const NAV_LINKS = [
  { href: "/pro-mene", label: "Про мене" },
  { href: "/navchannya", label: "Навчання" },
  { href: "/salon", label: "Салон" },
  { href: "/contacts", label: "Контакти" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-concrete/95 shadow-lg shadow-black/20 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green font-display text-sm text-cream">
            КМ
          </span>
          <span className="font-display text-sm uppercase tracking-wide text-cream sm:text-base">
            {NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-green-light ${
                pathname === link.href ? "text-green-light" : "text-cream-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <a
            href={PERSONAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-green-dark"
          >
            Записатись на навчання
          </a>
        </div>

        <button
          aria-label="Меню"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-concrete px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-base font-medium ${
                  pathname === link.href ? "text-green-light" : "text-cream-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={PERSONAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 rounded-full bg-green px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              Записатись на навчання
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
