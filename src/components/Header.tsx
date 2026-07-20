"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Про мене", href: "#about" },
  { label: "Послуги", href: "#services" },
  { label: "Результати", href: "#results" },
  { label: "Курси", href: "#courses" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/15 bg-cream/85 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.12em] text-ink sm:text-2xl">
            {site.brand}
          </span>
          <span className="eyebrow mt-1 text-[0.55rem] text-rose-deep/80">
            massage & body studio
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline text-sm font-medium text-ink/80 transition-colors hover:text-rose-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.links.tel}
            className="hidden items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-rose hover:bg-rose hover:text-white sm:flex"
          >
            <Phone className="h-4 w-4" />
            {site.phonePretty}
          </a>

          <button
            onClick={() => setOpen(true)}
            aria-label="Меню"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-ink lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream px-7 py-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl tracking-[0.12em]">
                  {site.brand}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Закрити"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    className="border-b border-gold/10 py-4 font-display text-2xl text-ink transition-colors hover:text-rose-deep"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <a
                href={site.links.tel}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-rose px-5 py-4 font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                {site.phonePretty}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
