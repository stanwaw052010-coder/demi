"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./ui/Logo";
import { buttonClass } from "./ui/Button";
import { navItems } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-line/80 bg-white/85 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Основна навігація" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-[0.8125rem] tracking-[0.04em] text-ink transition-colors duration-300 hover:text-graphite"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              aria-label={`Зателефонувати ${site.phone.label}`}
              className="hidden rounded-sm border border-line p-3 text-graphite transition-colors duration-500 hover:border-graphite md:inline-flex"
            >
              <Phone className="size-4" strokeWidth={1.5} aria-hidden />
            </a>

            {/* На вужчих екранах роль CTA бере липка панель унизу — дублювати не треба */}
            <div className="hidden lg:block">
              <a href="#booking" className={buttonClass("solid", "px-5 py-3")}>
                Записатися
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Відкрити меню"
              aria-expanded={open}
              className="rounded-sm border border-line p-3 text-graphite transition-colors duration-500 hover:border-graphite lg:hidden"
            >
              <Menu className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
          >
            <div className="shell flex items-center justify-between py-6">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрити меню"
                autoFocus
                className="rounded-sm border border-line p-3 text-graphite"
              >
                <X className="size-4" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <nav aria-label="Мобільна навігація" className="shell flex flex-1 flex-col justify-center">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-line/70"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 font-display text-[2rem] leading-none tracking-[-0.03em] text-graphite"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="shell flex flex-col gap-3 pb-10">
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className={buttonClass("solid", "w-full")}
              >
                Записатися на консультацію
              </a>
              <a href={site.phone.href} className={buttonClass("outline", "w-full")}>
                {site.phone.label}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
