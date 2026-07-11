"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";
import Magnetic from "@/lib/Magnetic";
import { useLenis } from "@/lib/SmoothScroll";

const TIERS = [
  {
    name: "The Club",
    price: "4,800",
    period: "per season",
    note: "For those who play for the love of the sound the ball makes.",
    features: [
      "Unlimited court hours, all surfaces",
      "Clubhouse & garden access",
      "Guest passes — four per season",
      "Locker, laundered whites",
    ],
    featured: false,
  },
  {
    name: "The Academy",
    price: "9,600",
    period: "per season",
    note: "Coaching woven into your calendar. For the improving obsessive.",
    features: [
      "Everything in The Club",
      "Weekly private coaching block",
      "Quarterly video & data review",
      "Racket workshop fittings",
      "Priority prime-time booking",
    ],
    featured: true,
  },
  {
    name: "The Legacy",
    price: "By invitation",
    period: "lifetime",
    note: "A chair in the pavilion with your name on the brass plate.",
    features: [
      "Everything in The Academy",
      "Lifetime tenure, transferable",
      "Champions' dinner, centre table",
      "A court named in your honour",
    ],
    featured: false,
  },
] as const;

export default function Membership() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      gsap.fromTo(
        ".tier-card",
        { y: 90, opacity: 0, rotateX: -6, transformPerspective: 1000 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".tier-grid", start: "top 85%" },
        }
      );
    },
    { scope: root }
  );

  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    const t = document.querySelector("#begin");
    if (t && lenis?.current) lenis.current.scrollTo(t as HTMLElement, { duration: 1.6 });
    else t?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="membership"
      className="relative border-t border-[var(--line-soft)] bg-[#070b08] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-14 text-center md:mb-24">
          <FadeUp>
            <span className="font-mono-label mb-5 block text-[var(--gold)]">
              09 — Membership
            </span>
          </FadeUp>
          <TextReveal as="h2" className="display-lg justify-center text-[clamp(3rem,7vw,7rem)]">
            Three ways
          </TextReveal>
          <TextReveal as="h2" className="display-lg justify-center text-[clamp(3rem,7vw,7rem)]" delay={0.12}>
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">in</span>
          </TextReveal>
        </div>

        <div className="tier-grid grid gap-6 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`tier-card group relative flex flex-col rounded-3xl p-8 transition-all duration-700 md:p-10 ${
                t.featured
                  ? "glass-deep border border-[rgba(194,161,94,0.45)] lg:-translate-y-4"
                  : "glass border border-[var(--line-soft)] hover:border-[rgba(237,232,219,0.22)]"
              }`}
              style={
                t.featured
                  ? { boxShadow: "0 40px 120px -40px rgba(194,161,94,0.25)" }
                  : undefined
              }
            >
              {t.featured && (
                <span className="font-mono-label absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--gold)] px-4 py-1.5 text-[#0a0e0b]">
                  Most chosen
                </span>
              )}
              <h3 className="display-md text-2xl">{t.name}</h3>
              <div className="mt-6 flex items-baseline gap-2">
                {t.price !== "By invitation" && (
                  <span className="font-mono-label text-[var(--ivory-38)]">£</span>
                )}
                <span
                  className={`display-lg ${
                    t.price === "By invitation"
                      ? "font-serif-it text-4xl normal-case tracking-normal text-[var(--gold-bright)]"
                      : "text-6xl"
                  }`}
                >
                  {t.price}
                </span>
              </div>
              <span className="font-mono-label mt-2 text-[var(--ivory-38)]">{t.period}</span>
              <p className="font-serif-it mt-5 text-[1.05rem] leading-snug text-[var(--ivory-60)]">
                {t.note}
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-[var(--line-soft)] pt-7">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.88rem] text-[var(--ivory-60)]">
                    <span className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${t.featured ? "bg-[var(--lime)]" : "bg-[var(--gold)]"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Magnetic strength={0.25} className="mt-9 block">
                <a
                  href="#begin"
                  onClick={go}
                  className={`btn-pill w-full justify-center px-8 py-4 font-mono-label ${
                    t.featured
                      ? "border border-[var(--gold)] text-[var(--gold-bright)] hover:text-[#0a0e0b]"
                      : "border border-[var(--line)] text-[var(--ivory)] hover:text-[#0a0e0b]"
                  }`}
                  data-cursor="APPLY"
                >
                  <span className={`btn-fill ${t.featured ? "bg-[var(--gold)]" : "bg-[var(--ivory)]"}`} />
                  {t.price === "By invitation" ? "Enquire" : "Apply"}
                </a>
              </Magnetic>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
