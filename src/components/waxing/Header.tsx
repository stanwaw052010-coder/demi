"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flower2, Menu, X } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Послуги", href: "#services" },
  { label: "До / Після", href: "#before-after" },
  { label: "Про майстра", href: "#why-us" },
  { label: "Відгуки", href: "#testimonials" },
  { label: "Контакти", href: "#booking" },
];

const INSTAGRAM_URL = "https://instagram.com/s_visk_depilation";

export default function Header() {
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
        scrolled
          ? "bg-[#0d0a0d]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-18 py-3 gap-4">
          <Link href="/waxing" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <div className="text-white font-bold text-base tracking-wide">Воскова депіляція</div>
              <div className="text-[10px] text-amber-300 font-medium tracking-widest uppercase">Київ · Політехнічний інститут</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/5 transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2.5 text-gray-300 hover:text-white hover:bg-white/8 rounded-xl transition-all"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-pink-500/20"
            >
              Записатися
            </a>
            <button
              className="lg:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/8 rounded-xl transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0d0a0d] pb-4">
          <div className="max-w-7xl mx-auto px-4 pt-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <InstagramIcon className="w-4 h-4" /> Instagram
            </a>
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 mt-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-bold rounded-xl"
            >
              Записатися
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
