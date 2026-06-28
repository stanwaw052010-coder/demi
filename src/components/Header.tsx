"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown, Search } from "lucide-react";

const navLinks = [
  { label: "Головна", href: "#hero" },
  { label: "Каталог", href: "#catalog" },
  { label: "Чому ми", href: "#why-us" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакти", href: "#contact" },
];

const phones = [
  "+38 (067) 254-62-66",
  "+38 (099) 112-95-26",
  "+38 (096) 277-05-40",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phonesOpen, setPhonesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              className="flex items-center gap-2 group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500 group-hover:bg-orange-400 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none tracking-wide">
                  СПРИНТЕР
                </span>
                <span className="block text-[10px] text-orange-400 font-medium tracking-widest uppercase leading-none">
                  Автозапчастини
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPhonesOpen(!phonesOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 bg-white/5 hover:bg-white/10"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>+38 (067) 254-62-66</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${phonesOpen ? "rotate-180" : ""}`} />
                </button>

                {phonesOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10">
                    {phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setPhonesOpen(false)}
                      >
                        <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                        {phone}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
              >
                Замовити дзвінок
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Меню"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 max-w-full bg-[#0f0f0f] border-l border-white/10 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-white font-bold text-lg">СПРИНТЕР</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/10">
              <a
                href="#hero"
                onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Пошук за артикулом...</span>
              </a>
            </div>

            {/* Nav */}
            <nav className="flex flex-col p-4 gap-1 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Phones */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium px-4 mb-3">
                Телефони
              </p>
              {phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-200 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="text-sm font-medium">{phone}</span>
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="flex items-center justify-center gap-2 w-full mt-4 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
              >
                Замовити дзвінок
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
