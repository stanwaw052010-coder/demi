"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/lib/SmoothScroll";
import Magnetic from "@/lib/Magnetic";

const LINKS = [
  ["Story", "#story"],
  ["Grounds", "#grounds"],
  ["Coaches", "#coaches"],
  ["Academy", "#academy"],
  ["Membership", "#membership"],
] as const;

export default function Nav({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.fromTo(
        ".nav-item",
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 1.1, ease: "expo.out", delay: 0.9 }
      );

      // hide on scroll down, return on scroll up
      const st = ScrollTrigger.create({
        start: "top top",
        onUpdate(self) {
          setScrolled(self.scroll() > 40);
          gsap.to(ref.current, {
            yPercent: self.direction === 1 && self.scroll() > 500 ? -110 : 0,
            duration: 0.7,
            ease: "expo.out",
            overwrite: "auto",
          });
        },
      });
      return () => st.kill();
    },
    { scope: ref, dependencies: [ready] }
  );

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis?.current) lenis.current.scrollTo(target as HTMLElement, { duration: 1.8 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-[200] transition-colors duration-700 ${
        scrolled ? "glass-deep border-b border-[var(--line-soft)]" : ""
      }`}
      style={{ borderBottomWidth: scrolled ? 1 : 0 }}
    >
      <nav className="mx-auto flex max-w-[1720px] items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <a
          href="#top"
          onClick={(e) => go(e, "#hero")}
          className="nav-item flex items-center gap-3 opacity-0"
          aria-label="ELEVATE home"
        >
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden>
            <circle cx="32" cy="32" r="17" fill="none" stroke="#c2a15e" strokeWidth="2.4" />
            <path d="M 19.5 22 C 28 26, 28 38, 19.5 42" fill="none" stroke="#d9f74f" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 44.5 22 C 36 26, 36 38, 44.5 42" fill="none" stroke="#d9f74f" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <span className="display-md text-sm tracking-[0.18em]">ELEVATE</span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => go(e, href)}
              className="nav-item nav-link font-mono-label text-[var(--ivory-60)] transition-colors duration-300 hover:text-[var(--ivory)]"
            >
              {label}
            </a>
          ))}
        </div>

        <Magnetic strength={0.3} className="nav-item opacity-0">
          <a
            href="#begin"
            onClick={(e) => go(e, "#begin")}
            className="btn-pill border border-[rgba(194,161,94,0.55)] px-6 py-2.5 text-[0.7rem] font-mono-label text-[var(--gold-bright)] hover:text-[#0a0e0b]"
          >
            <span className="btn-fill bg-[var(--gold)]" />
            Request Invitation
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
