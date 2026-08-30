"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/routing";

interface Props {
  links: { href: StaticPathname; label: string }[];
  aboutLabel: string;
  contactLabel: string;
  openLabel: string;
  closeLabel: string;
  navLabel: string;
}

export function MobileNav({
  links,
  aboutLabel,
  contactLabel,
  openLabel,
  closeLabel,
  navLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const all = [
    ...links,
    { href: "/over-ons" as StaticPathname, label: aboutLabel },
    { href: "/contact" as StaticPathname, label: contactLabel },
  ];

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="lg:hidden inline-flex items-center text-[var(--text-micro)]"
        aria-expanded={open}
        aria-controls="wy-mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="wy-link">{open ? closeLabel : openLabel}</span>
      </button>

      <div
        id="wy-mobile-nav"
        ref={panel}
        hidden={!open}
        className="lg:hidden fixed inset-x-0 top-[3.25rem] bottom-0 z-50 bg-paper wy-rule overflow-y-auto"
      >
        <nav aria-label={navLabel} className="wy-shell py-6">
          <ul>
            {all.map((link) => (
              <li key={link.href} className="wy-rule-b">
                <Link
                  href={link.href}
                  className="block py-4 text-[1.375rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
