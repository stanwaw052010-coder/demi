"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { NAV, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-cream/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[88px]">
        <a href="#top" aria-label="Rayskaya Beauty Space — на початок сторінки">
          <Image
            src="/logo-dark.svg"
            alt="Rayskaya Beauty Space"
            width={170}
            height={95}
            priority
            className="h-11 w-auto lg:h-[52px]"
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Головне меню">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-[15px] font-medium text-ink/80 transition-colors duration-300 hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-all duration-400 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-[15px] font-semibold text-ink/80 transition-colors hover:text-olive"
          >
            <Phone className="size-4 text-brand" strokeWidth={1.75} />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#booking"
            className="rounded-full bg-brand px-7 py-3 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(141,183,72,0.9)] transition-all duration-300 hover:bg-olive hover:shadow-[0_14px_34px_-12px_rgba(94,122,52,0.8)]"
          >
            Записатися
          </a>
        </div>

        <button
          className="rounded-full p-2.5 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-black/5 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Мобільне меню">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 font-display text-2xl text-ink transition-colors hover:bg-brand-mist"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-2 px-3 font-semibold text-ink/80"
                >
                  <Phone className="size-4 text-brand" strokeWidth={1.75} />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-brand px-7 py-3.5 text-center font-semibold text-white"
                >
                  Записатися
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
