"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass shadow-[0_1px_0_0_rgba(28,30,21,0.06)]" : "bg-transparent"
      )}
    >
      <div className="container-x flex h-20 items-center justify-between md:h-24">
        <a href="#top" className="flex items-center gap-2" aria-label="Rayskaya Beauty Space">
          <img
            src="/logo/rayskaya-primary.svg"
            alt="Rayskaya Beauty Space"
            className="h-8 w-auto md:h-9"
          />
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] font-semibold uppercase tracking-[0.08em] text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-green transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton
            href="#booking"
            className="hidden bg-green-dark text-warm hover:bg-ink md:inline-flex"
          >
            Записатися
          </MagneticButton>

          <button
            aria-label="Меню"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-warm transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <img src="/logo/rayskaya-primary.svg" alt="Rayskaya Beauty Space" className="h-8 w-auto" />
          <button
            aria-label="Закрити меню"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="container-x mt-10 flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={cn(
                "font-display border-b border-line py-5 text-4xl text-ink transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="container-x mt-10">
          <MagneticButton
            href="#booking"
            onClick={() => setOpen(false)}
            className="w-full bg-green-dark text-warm"
          >
            Записатися
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
