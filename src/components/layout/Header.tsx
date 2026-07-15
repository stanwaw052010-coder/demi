"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/data/site";
import { BookButton } from "@/components/booking/BookButton";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-spa flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Спабель — головна">
          <span
            className={cn(
              "font-serif text-2xl tracking-[0.15em] transition-colors",
              scrolled || mobileOpen ? "text-navy-900" : "text-white"
            )}
          >
            СПАБЕЛЬ
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors",
                  scrolled ? "text-navy-900/80 hover:text-navy-900" : "text-white/85 hover:text-white",
                  active && (scrolled ? "text-navy-900" : "text-white")
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              scrolled ? "text-navy-900/80 hover:text-navy-900" : "text-white/85 hover:text-white"
            )}
          >
            <Phone className="h-4 w-4 text-gold-500" />
            {siteConfig.phone}
          </a>
          <BookButton variant="gold" size="sm" serviceName={undefined}>
            Записатися
          </BookButton>
        </div>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            scrolled || mobileOpen ? "text-navy-900" : "text-white"
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy-900/10 bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 font-serif text-lg text-navy-900 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 px-3 text-sm text-navy-900/70">
              <Phone className="h-4 w-4 text-gold-500" />
              {siteConfig.phone}
            </a>
            <BookButton variant="gold" size="lg" className="w-full">
              Записатися
            </BookButton>
          </div>
        </div>
      )}
    </header>
  );
}
