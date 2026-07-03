"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, SHOP_NAME } from "@/lib/menu";
import { useCart } from "@/lib/cart";

const NAV_LINKS = [
  { href: "#rolls", label: "Роли" },
  { href: "#hot", label: "Гарячі страви" },
  { href: "#sets", label: "Сети" },
  { href: "#drinks", label: "Напої" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-charcoal/95 shadow-lg shadow-black/30 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red font-display text-lg text-cream">
            N
          </span>
          <span className="font-display text-xl uppercase tracking-wide text-cream">
            {SHOP_NAME}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream-soft transition-colors hover:text-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-sm font-medium text-cream-soft transition-colors hover:text-red md:flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <button
            onClick={openCart}
            aria-label="Кошик"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-2 text-cream transition-colors hover:text-red"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red text-xs font-semibold text-cream">
                {totalCount}
              </span>
            )}
          </button>
          <button
            aria-label="Меню"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-charcoal px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-cream-soft"
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-base font-medium text-cream-soft"
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
