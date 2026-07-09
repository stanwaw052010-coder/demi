"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`hairline fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-warm/95 px-5 backdrop-blur-md transition-shadow duration-300 sm:px-10 ${
        scrolled ? "shadow-[0_2px_24px_rgba(29,35,19,0.07)]" : ""
      }`}
    >
      <a href="#top" aria-label="Rayskaya Beauty Space — на початок сторінки">
        <Image
          src="/logo-dark.svg"
          alt="Rayskaya Beauty Space"
          width={140}
          height={78}
          priority
          className="h-10 w-auto"
        />
      </a>
      <div className="flex items-center gap-2.5">
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 border-[0.5px] border-ink/30 px-5 py-2.5 text-[12px] font-normal uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:border-brand-deep hover:text-brand-deep"
        >
          <Phone className="size-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Подзвонити</span>
        </a>
        <a
          href="#booking"
          className="inline-flex items-center bg-brand px-5.5 py-2.5 text-[12px] font-normal uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-brand-deep"
        >
          Записатися
        </a>
      </div>
    </header>
  );
}
