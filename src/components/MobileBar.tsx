"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Липка панель дій на мобайлі — з'являється після першого екрана. */
export function MobileBar() {
  const [visible, setVisible] = useState(false);
  const [phonesOpen, setPhonesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const shown = window.scrollY > window.innerHeight * 0.85;
      setVisible(shown);
      if (!shown) setPhonesOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 lg:hidden",
        "transition-transform duration-500",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      {phonesOpen ? (
        <div className="mb-2 rounded-[var(--r-lg)] border border-gold/20 bg-cocoa/95 p-3 shadow-[var(--shadow-lift)] backdrop-blur-xl">
          <div className="flex flex-col gap-2">
            {site.masters.map((master) => (
              <a
                key={master.phone}
                href={`tel:${master.phone}`}
                className="flex items-center justify-between rounded-[var(--r-sm)] border border-gold/25 px-4 py-3 text-sm text-sand"
              >
                <span>{master.name}</span>
                <span className="text-gold">{master.phoneLabel}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-[1fr_auto_auto] items-stretch overflow-hidden rounded-[var(--r-pill)] border border-gold/25 bg-espresso/90 shadow-[var(--shadow-lift)] backdrop-blur-xl">
        <Link
          href="/#zapys"
          onClick={() => setPhonesOpen(false)}
          tabIndex={visible ? undefined : -1}
          className="label-spaced flex items-center justify-center bg-gold px-5 py-4 text-espresso"
        >
          Записатися
        </Link>
        <button
          type="button"
          onClick={() => setPhonesOpen((value) => !value)}
          aria-expanded={phonesOpen}
          tabIndex={visible ? undefined : -1}
          className="flex items-center justify-center border-l border-gold/20 px-5 text-gold"
        >
          <Phone className="h-5 w-5" strokeWidth={1.25} aria-hidden />
          <span className="sr-only">Показати телефони</span>
        </button>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="flex items-center justify-center border-l border-gold/20 px-5 text-gold"
        >
          <InstagramIcon className="h-5 w-5" />
          <span className="sr-only">Instagram студії</span>
        </a>
      </div>
    </div>
  );
}
