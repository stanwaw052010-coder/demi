"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ScrollProgress } from "@/components/ui/motion";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled && !open ? "px-3 pt-3 sm:px-5 sm:pt-4" : "px-0 pt-0",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex h-[64px] w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[72px]",
          scrolled && !open
            ? "max-w-[1120px] rounded-[var(--r-pill)] border border-gold/20 bg-espresso/85 px-5 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:px-7"
            : "max-w-[1160px] border border-transparent px-5 sm:px-8",
          open && "max-w-[1160px] bg-espresso px-5 sm:px-8",
        )}
      >
        <Link href="/" aria-label={`${site.name} — на головну`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Основна навігація" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link label-spaced text-beige transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/#zapys"
            className="btn btn-outline label-spaced px-5 py-3"
          >
            Записатися
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="label-spaced flex items-center gap-2 text-sand lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
          ) : (
            <Menu className="h-5 w-5 text-gold" strokeWidth={1.25} aria-hidden />
          )}
          <span className="sr-only">{open ? "Закрити меню" : "Відкрити меню"}</span>
        </button>

      </div>

      {/* смужка прогресу читання — по верхньому краю екрана */}
      <ScrollProgress />

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-3 mt-2 rounded-[var(--r-xl)] border border-gold/15 bg-espresso/95 px-6 pb-8 pt-6 shadow-[var(--shadow-lift)] backdrop-blur-xl sm:mx-5 lg:hidden"
      >
        <nav aria-label="Мобільна навігація" className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-gold/12 py-4 font-display text-2xl text-sand transition-colors duration-300 last:border-b-0 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#zapys"
            onClick={() => setOpen(false)}
            className="btn btn-solid label-spaced mt-7 px-6 py-4 text-center"
          >
            Записатися
          </Link>
        </nav>
        <div className="mt-7 flex flex-col gap-2">
          {site.masters.map((master) => (
            <a
              key={master.phone}
              href={`tel:${master.phone}`}
              className="text-sm text-beige transition-colors hover:text-gold"
            >
              {master.phoneLabel} — {master.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
