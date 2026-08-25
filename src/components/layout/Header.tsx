"use client";

import Link from "next/link";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BrandMark, Wordmark } from "@/components/ui/BrandMark";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  /** Один passive-слухач із rAF: смужка прогресу + стан шапки. */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left scale-x-0 bg-linear-to-r from-brand-600 via-brand-400 to-aqua-400"
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
            <Link
              href="/#hero"
              className="flex items-center gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
              aria-label={`${site.name} — на початок`}
            >
              <BrandMark className="size-11" />
              <Wordmark />
            </Link>

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

      {/* Мобільне меню: у DOM лише коли відкрите, перехід — на CSS */}
      {open && (
        <div className="fixed inset-0 z-70 animate-[fade-in_0.25s_ease-out_both] bg-brand-950 xl:hidden">
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
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="enter flex items-center justify-between border-b border-white/10 py-5 text-2xl font-extrabold tracking-[-0.03em] text-white"
                  style={{ "--enter-delay": `${0.06 + i * 0.05}s` } as React.CSSProperties}
                >
                  {item.label}
                  <span className="text-sm font-medium text-white/30">0{i + 1}</span>
                </a>
              ))}
            </nav>

            <div
              className="enter mt-auto flex flex-col gap-3 pt-10"
              style={{ "--enter-delay": "0.45s" } as React.CSSProperties}
            >
              <Button href={site.booking.url} size="lg" className="w-full">
                <CalendarCheck className="size-5" strokeWidth={2.3} />
                {site.booking.label}
              </Button>
              <Button href={site.phone.href} variant="ghost" size="lg" className="w-full">
                <Phone className="size-5" strokeWidth={2.3} />
                {site.phone.display}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
