"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BrandMark, Wordmark } from "@/components/ui/BrandMark";
import { EASE } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-linear-to-r from-brand-600 via-brand-400 to-aqua-400"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 transition-all duration-500 ease-out",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between gap-6 rounded-full pr-2 pl-4 transition-all duration-500 ease-out md:pl-5",
              scrolled
                ? "h-16 bg-white/85 shadow-lift ring-1 ring-graphite-200/60 backdrop-blur-xl"
                : "h-[4.5rem] bg-white/0 ring-1 ring-transparent",
            )}
          >
            <a
              href="#hero"
              className="flex items-center gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
              aria-label={`${site.name} — на початок`}
            >
              <BrandMark className="size-11" />
              <Wordmark />
            </a>

            <nav aria-label="Головна навігація" className="hidden items-center gap-1 xl:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative rounded-full px-3.5 py-2.5 text-[0.88rem] font-semibold whitespace-nowrap text-graphite-600 transition-colors duration-300 hover:text-brand-800"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 scale-90 rounded-full bg-brand-50 opacity-0 transition-all duration-300 hover:scale-100 hover:opacity-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.phone.href}
                className="hidden items-center gap-2.5 rounded-full px-4 py-2.5 text-[0.9rem] font-bold whitespace-nowrap text-ink transition-colors hover:text-brand-700 lg:inline-flex xl:hidden 2xl:inline-flex"
              >
                <Phone className="size-4 text-brand-600" strokeWidth={2.4} />
                {site.phone.display}
              </a>

              <Button href={site.booking.url} size="sm" className="hidden sm:inline-flex">
                <CalendarCheck className="size-4" strokeWidth={2.3} />
                Онлайн запис
              </Button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Відкрити меню"
                className="grid size-11 cursor-pointer place-items-center rounded-full bg-brand-50 text-brand-800 transition-colors hover:bg-brand-100 xl:hidden"
              >
                <Menu className="size-5" strokeWidth={2.3} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-70 bg-brand-950/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex h-dvh flex-col overflow-y-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BrandMark className="size-11" tone="white" />
                  <Wordmark tone="light" />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Закрити меню"
                  className="grid size-11 cursor-pointer place-items-center rounded-full text-white glass"
                >
                  <X className="size-5" strokeWidth={2.3} />
                </button>
              </div>

              <nav aria-label="Мобільна навігація" className="mt-10 flex flex-col">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="flex items-center justify-between border-b border-white/10 py-5 text-2xl font-extrabold tracking-[-0.03em] text-white"
                  >
                    {item.label}
                    <span className="text-sm font-medium text-white/30">0{i + 1}</span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
                className="mt-auto flex flex-col gap-3 pt-10"
              >
                <Button href={site.booking.url} size="lg" className="w-full">
                  <CalendarCheck className="size-5" strokeWidth={2.3} />
                  {site.booking.label}
                </Button>
                <Button href={site.phone.href} variant="ghost" size="lg" className="w-full">
                  <Phone className="size-5" strokeWidth={2.3} />
                  {site.phone.display}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
