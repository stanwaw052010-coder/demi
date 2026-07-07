"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const navLinks = [
  { label: "Послуги", href: "#services" },
  { label: "Ціни", href: "#pricing" },
  { label: "Портфоліо", href: "#gallery" },
  { label: "Про майстра", href: "#about" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur-xl shadow-sm border-b border-rose/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4 gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-gold flex items-center justify-center text-white font-serif text-base font-bold">
              AK
            </div>
            <div className="leading-none">
              <div className="font-serif text-lg font-bold text-ink tracking-wide">{site.name}</div>
              <div className="text-[10px] text-rose-dark font-medium tracking-widest uppercase">{site.tagline}</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-ink/70 hover:text-rose-dark font-medium rounded-lg hover:bg-rose/10 transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex p-2.5 text-ink/60 hover:text-rose-dark hover:bg-rose/10 rounded-xl transition-all"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={site.phoneHref}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-ink/70 hover:text-rose-dark font-medium rounded-lg hover:bg-rose/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-rose hover:bg-rose-dark text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Записатись
            </a>
            <button
              className="lg:hidden p-2.5 text-ink/70 hover:text-rose-dark hover:bg-rose/10 rounded-xl transition-all"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Меню"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-rose/10 bg-cream/95 backdrop-blur-xl pb-4">
          <div className="max-w-7xl mx-auto px-4 pt-3 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-ink/80 hover:text-rose-dark hover:bg-rose/10 transition-all text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3 mt-2 border-t border-rose/10">
              <a href={site.phoneHref} className="flex items-center gap-2 text-rose-dark text-sm font-semibold px-3">
                <Phone className="w-4 h-4" />
                {site.phone}
              </a>
              <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-rose-dark text-sm font-semibold px-3">
                <InstagramIcon className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
