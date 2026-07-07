"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border/70 bg-white/95 backdrop-blur-sm"
          : "border-transparent bg-white"
      )}
    >
      <div className="container-lux section-x flex h-18 items-center justify-between gap-6 py-3">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl sm:text-[1.75rem] tracking-[0.12em] text-navy-950">
            СПАБЕЛЬ
          </span>
          <span className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gold-600">
            Beauty &amp; SPA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative pb-1 text-sm uppercase tracking-wider text-navy-800 transition-colors hover:text-navy-950",
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform",
                  "hover:after:scale-x-100",
                  active && "text-navy-950 after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="flex items-center gap-2 text-sm text-navy-800 hover:text-navy-950"
          >
            <Phone className="h-4 w-4 text-gold-600" />
            {SITE.phone}
          </a>
          <Button variant="gold" size="default" asChild>
            <Link href="/#booking">Записатися</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Меню">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Link href="/" className="font-serif text-xl tracking-[0.12em] text-navy-950">
              СПАБЕЛЬ
            </Link>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="border-b border-border py-3 text-base uppercase tracking-wider text-navy-900"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <a
              href={`tel:${SITE.phoneHref}`}
              className="flex items-center gap-2 text-sm text-navy-800"
            >
              <Phone className="h-4 w-4 text-gold-600" />
              {SITE.phone}
            </a>
            <SheetClose asChild>
              <Button variant="gold" size="lg" asChild>
                <Link href="/#booking">Записатися</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
