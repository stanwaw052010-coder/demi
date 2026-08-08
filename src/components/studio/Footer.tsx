"use client";

import { useRef } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { scrollToSection } from "@/lib/studio/scroll";
import { STUDIO } from "@/lib/studio/content";
import { SplitChars } from "./primitives/SplitText";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const year = 2025;

  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap.from(".footer__sign .char", {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.02,
        ease: "expo.out",
        scrollTrigger: { trigger: ".footer__sign", start: "top 92%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer ref={root} className="footer" aria-label="Studio details">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__col footer__col--mark">
            <p className="footer__mark display">{STUDIO.mark}</p>
            <p className="meta meta--muted">{STUDIO.tagline}</p>
          </div>

          <nav className="footer__col" aria-label="Elsewhere">
            <p className="meta meta--muted">Elsewhere</p>
            <a
              className="u-line"
              href={STUDIO.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a className="u-line" href={`mailto:${STUDIO.email}`}>
              Email
            </a>
          </nav>

          <div className="footer__col">
            <p className="meta meta--muted">Location</p>
            {STUDIO.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="footer__col">
            <p className="meta meta--muted">Booking</p>
            <button
              type="button"
              className="u-line"
              onClick={() => scrollToSection("contact")}
            >
              Request a slot
            </button>
            <a className="u-line" href={`tel:${STUDIO.phone.replace(/\s/g, "")}`}>
              {STUDIO.phone}
            </a>
          </div>
        </div>

        <p className="footer__sign display" aria-label="See you soon.">
          <SplitChars text="See you soon." />
        </p>

        <div className="footer__base">
          <p className="meta meta--muted">
            © {year} {STUDIO.name}. All rights reserved.
          </p>
          <button
            type="button"
            className="meta footer__top u-line"
            onClick={() => scrollToSection("home")}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
