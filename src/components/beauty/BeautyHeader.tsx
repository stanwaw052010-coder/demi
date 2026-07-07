"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { salon } from "@/lib/beauty";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Послуги", href: "#services" },
  { label: "Про нас", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Відгуки", href: "#testimonials" },
  { label: "Контакти", href: "#contact" },
];

export default function BeautyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-[#0a0908]/95 backdrop-blur-xl border-b border-[#c9a962]/15 shadow-xl shadow-black/30"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 gap-6">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-full border border-[#c9a962] flex items-center justify-center">
              <span className="font-[var(--font-playfair)] text-[#c9a962] text-sm tracking-widest">MBH</span>
            </div>
            <div className="leading-none">
              <div className="font-[var(--font-playfair)] text-[#ece6da] text-base tracking-wide">Makhovska</div>
              <div className="text-[10px] text-[#c9a962] font-medium tracking-[0.2em] uppercase">Beauty House</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-[#cfc7b8] hover:text-[#c9a962] font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <a
              href={salon.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#cfc7b8] hover:text-[#c9a962] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={salon.phoneHref}
              className="flex items-center gap-2 text-sm text-[#ece6da] hover:text-[#c9a962] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c9a962]" />
              {salon.phone}
            </a>
            <a
              href={salon.phoneHref}
              className="px-5 py-2.5 rounded-full bg-[#c9a962] text-[#0a0908] text-sm font-semibold hover:bg-[#d9b872] transition-colors"
            >
              Записатися
            </a>
          </div>

          <button
            className="lg:hidden ml-auto p-2.5 text-[#ece6da]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#c9a962]/15 bg-[#0a0908] pb-6">
          <div className="max-w-7xl mx-auto px-4 pt-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-3 rounded-xl text-[#cfc7b8] hover:text-[#c9a962] hover:bg-white/5 transition-all text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-[#c9a962]/15 flex items-center gap-4 px-3">
              <a href={salon.phoneHref} className="flex items-center gap-2 text-[#c9a962] text-sm font-semibold">
                <Phone className="w-4 h-4" />
                {salon.phone}
              </a>
              <a href={salon.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#cfc7b8]">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
