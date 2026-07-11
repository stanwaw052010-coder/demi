"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitText } from "@/lib/split";
import Marquee from "@/components/fx/Marquee";
import Magnetic from "@/lib/Magnetic";
import { useLenis } from "@/lib/SmoothScroll";

const SOCIALS = ["Instagram", "YouTube", "The Journal", "Spotify"] as const;

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "Europe/London",
        })
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useGSAP(
    () => {
      const word = root.current!.querySelector<HTMLElement>(".footer-word")!;
      const chars = splitText(word, "chars");
      gsap.fromTo(
        chars,
        { yPercent: 105 },
        {
          yPercent: 0,
          stagger: 0.05,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: word, start: "top 92%" },
        }
      );
      gsap.fromTo(
        ".footer-in",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".footer-meta", start: "top 94%" },
        }
      );
    },
    { scope: root }
  );

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis?.current) lenis.current.scrollTo(0, { duration: 2.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={root}
      className="relative overflow-hidden border-t border-[var(--line-soft)] bg-[#050705]"
    >
      <Marquee duration={26} className="border-b border-[var(--line-soft)] py-5">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className="mx-6 flex items-center gap-6">
            <span className="font-mono-label text-[var(--ivory-38)]">SEE YOU ON THE COURT</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime)]" />
            <span className="font-serif-it text-lg text-[var(--gold-bright)]">au revoir, baseline</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          </span>
        ))}
      </Marquee>

      <div className="footer-meta mx-auto grid max-w-[1720px] gap-12 px-6 py-16 md:grid-cols-3 md:px-10 md:py-20">
        <div className="footer-in">
          <div className="flex items-center gap-3">
            <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="17" fill="none" stroke="#c2a15e" strokeWidth="2.4" />
              <path d="M 19.5 22 C 28 26, 28 38, 19.5 42" fill="none" stroke="#d9f74f" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 44.5 22 C 36 26, 36 38, 44.5 42" fill="none" stroke="#d9f74f" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span className="display-md text-base tracking-[0.18em]">ELEVATE</span>
          </div>
          <p className="mt-5 max-w-[30ch] text-[0.85rem] leading-relaxed text-[var(--ivory-38)]">
            A private tennis club and academy. Twelve courts, one standard —
            above the game since 1962.
          </p>
          <div className="font-mono-label mt-6 text-[var(--gold)]">
            LONDON — <span className="tabular-nums">{time}</span> GMT
          </div>
        </div>

        <div className="footer-in">
          <span className="font-mono-label mb-6 block text-[var(--ivory-38)]">Find us</span>
          <address className="space-y-2 text-[0.95rem] not-italic leading-relaxed">
            <div>1 Baseline Walk, Wimbledon</div>
            <div>London SW19, United Kingdom</div>
            <div className="pt-3 text-[var(--gold-bright)]">court@elevate.club</div>
            <div>+44 20 7946 1962</div>
          </address>
        </div>

        <div className="footer-in">
          <span className="font-mono-label mb-6 block text-[var(--ivory-38)]">Follow the club</span>
          <ul className="space-y-3">
            {SOCIALS.map((s) => (
              <li key={s}>
                <Magnetic strength={0.2}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="nav-link inline-flex items-center gap-3 text-[0.95rem] text-[var(--ivory-60)] transition-colors hover:text-[var(--ivory)]"
                  >
                    <span className="h-px w-6 bg-[var(--gold)]/60" />
                    {s}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* the giant word */}
      <div className="relative px-2 pb-6">
        <a href="#hero" onClick={toTop} data-cursor="TOP" aria-label="Back to top">
          <div
            className="footer-word grad-footer display-xl select-none overflow-hidden whitespace-nowrap text-center text-[clamp(4rem,15.5vw,17rem)] leading-[0.9]"
            style={{ paddingBottom: "0.05em" }}
          >
            ELEVATE
          </div>
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-soft)] px-6 py-5 md:px-10">
        <span className="font-mono-label text-[var(--ivory-38)]">
          © {new Date().getFullYear()} ELEVATE TENNIS CLUB — A CONCEPT DEMONSTRATION
        </span>
        <span className="font-mono-label text-[var(--ivory-38)]">
          DESIGNED & BUILT IN CODE — NO PHOTOGRAPHY WAS USED
        </span>
      </div>
    </footer>
  );
}
