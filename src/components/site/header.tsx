"use client";

import * as React from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useScrollHandler } from "@/lib/use-scroll-value";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useScrollHandler((y) => setScrolled(y > 24));

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "glass border-b border-ink/[0.06]"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="container-x">
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                scrolled ? "h-[76px]" : "h-24 md:h-28",
              )}
            >
              <Logo size="md" />

              <nav className="hidden items-center gap-1 lg:flex">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group relative rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] text-graphite/75 transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-ink/60 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href={site.phoneHref}
                  className="hidden items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium tabular-nums text-ink transition-colors duration-300 hover:bg-ink/5 md:inline-flex"
                >
                  <Phone className="size-3.5" strokeWidth={1.75} />
                  {site.phone}
                </a>
                <ButtonLink
                  href="#contacts"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  Записатися
                </ButtonLink>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Відкрити меню"
                  aria-expanded={open}
                  className="flex size-10 items-center justify-center rounded-full hairline text-ink transition-colors duration-300 hover:bg-mist lg:hidden"
                >
                  <Menu className="size-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — stays in the DOM and animates on CSS alone */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[60] bg-white transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="container-x flex h-24 items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрити меню"
            tabIndex={open ? 0 : -1}
            className="flex size-10 items-center justify-center rounded-full hairline text-ink"
          >
            <X className="size-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="container-x mt-6 flex flex-col">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${0.05 + i * 0.045}s` : "0s" }}
              className={cn(
                "flex items-baseline justify-between border-b border-ink/[0.07] py-5 font-display text-[30px] font-light tracking-[-0.03em] text-ink",
                "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              {item.label}
              <span aria-hidden className="font-mono text-[11px] text-ink/25">
                0{i + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="container-x mt-10 flex flex-col gap-3">
          <ButtonLink
            href="#contacts"
            size="lg"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Записатися на прийом
          </ButtonLink>
          <ButtonLink
            href={site.phoneHref}
            variant="secondary"
            size="lg"
            tabIndex={open ? 0 : -1}
          >
            {site.phone}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
