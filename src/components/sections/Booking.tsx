"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";
import Magnetic from "@/lib/Magnetic";

/**
 * Begin — the booking request. Glass panel, floating labels,
 * animated validation, and a success sequence with a drawn check
 * and a bouncing ball.
 */

type Fields = {
  name: string;
  email: string;
  date: string;
  surface: string;
};

/** Post-submit sequence: ring and check draw themselves, the copy
 *  rises in, and a ball drops with a real bounce. */
function Success({ name, email }: { name: string; email: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ring = root.current!.querySelector<SVGCircleElement>(".ok-ring")!;
      const check = root.current!.querySelector<SVGPathElement>(".ok-check")!;
      const rl = ring.getTotalLength();
      const cl = check.getTotalLength();
      const tl = gsap.timeline();
      tl.fromTo(
        ring,
        { strokeDasharray: rl, strokeDashoffset: rl },
        { strokeDashoffset: 0, duration: 1, ease: "power3.inOut" }
      )
        .fromTo(
          check,
          { strokeDasharray: cl, strokeDashoffset: cl },
          { strokeDashoffset: 0, duration: 0.7, ease: "power3.out" },
          0.7
        )
        .fromTo(
          ".ok-in",
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.12, duration: 1, ease: "expo.out" },
          0.9
        )
        .fromTo(
          ".ok-ball",
          { y: -120, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, ease: "bounce.out" },
          1.1
        );
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="flex min-h-[380px] flex-col items-center justify-center text-center"
      role="status"
    >
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
        <circle className="ok-ring" cx="55" cy="55" r="50" stroke="rgba(194,161,94,0.9)" strokeWidth="1.5" />
        <path className="ok-check" d="M34 57 L49 71 L78 40" stroke="#d9f74f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="ok-in display-md mt-8 text-3xl opacity-0">The court is yours</h3>
      <p className="ok-in mt-4 max-w-[36ch] text-[0.92rem] leading-relaxed text-[var(--ivory-60)] opacity-0">
        {name.split(" ")[0]}, the concierge will write to{" "}
        <span className="text-[var(--gold-bright)]">{email}</span> within the
        hour. Bring your whites.
      </p>
      <div
        className="ok-ball mt-8 h-6 w-6 rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle at 32% 30%, #eaff70, #cfe93f 50%, #93ad20)",
          boxShadow: "0 0 26px rgba(217,247,79,0.5)",
        }}
      />
    </div>
  );
}

export default function Booking() {
  const root = useRef<HTMLElement>(null);
  const [fields, setFields] = useState<Fields>({ name: "", email: "", date: "", surface: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [phase, setPhase] = useState<"idle" | "sending" | "done">("idle");

  useGSAP(
    () => {
      gsap.fromTo(
        ".book-panel",
        { y: 80, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: ".book-panel", start: "top 80%" },
        }
      );
    },
    { scope: root }
  );

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "idle") return;
    const er: typeof errors = {
      name: fields.name.trim().length < 2,
      email: !/^\S+@\S+\.\S+$/.test(fields.email),
      date: !fields.date,
      surface: !fields.surface,
    };
    setErrors(er);
    if (Object.values(er).some(Boolean)) {
      // re-trigger the shake animation
      gsap.fromTo(".book-panel", { x: -6 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
      return;
    }
    setPhase("sending");
    setTimeout(() => setPhase("done"), 1400);
  };

  return (
    <section
      ref={root}
      id="begin"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 62%, rgba(14,58,38,0.4), transparent 72%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <FadeUp>
            <span className="font-mono-label mb-5 block text-[var(--gold)]">
              10 — Begin
            </span>
          </FadeUp>
          <TextReveal as="h2" className="display-lg text-[clamp(3rem,6.6vw,6.6rem)]">
            Your first
          </TextReveal>
          <TextReveal as="h2" className="display-lg text-[clamp(3rem,6.6vw,6.6rem)]" delay={0.1}>
            serve is
          </TextReveal>
          <TextReveal as="h2" className="display-lg text-[clamp(3rem,6.6vw,6.6rem)]" delay={0.2}>
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">waiting</span>
          </TextReveal>
          <FadeUp delay={0.3} className="mt-8 max-w-[42ch]">
            <p className="text-[0.95rem] leading-[1.85] text-[var(--ivory-60)]">
              Request a visit. We&apos;ll pair you with a member of the faculty,
              a court that suits your game, and a pot of very good tea.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} className="mt-10 space-y-3">
            <div className="font-mono-label text-[var(--ivory-38)]">CONCIERGE — 07:00–22:00</div>
            <div className="text-lg">+44 20 7946 1962</div>
            <div className="text-lg text-[var(--gold-bright)]">court@elevate.club</div>
          </FadeUp>
        </div>

        <div className="book-panel glass-deep relative overflow-hidden rounded-3xl p-8 md:p-12" style={{ willChange: "transform" }}>
          {/* glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "rgba(194,161,94,0.14)" }}
          />
          {phase !== "done" ? (
            <form onSubmit={submit} noValidate>
              <div className="grid gap-9 sm:grid-cols-2">
                <div className="field" data-filled={!!fields.name} data-error={!!errors.name}>
                  <input id="bk-name" type="text" value={fields.name} onChange={set("name")} autoComplete="name" />
                  <label htmlFor="bk-name">{errors.name ? "Your name — required" : "Your name"}</label>
                  <span className="field-line" />
                </div>
                <div className="field" data-filled={!!fields.email} data-error={!!errors.email}>
                  <input id="bk-email" type="email" value={fields.email} onChange={set("email")} autoComplete="email" />
                  <label htmlFor="bk-email">{errors.email ? "A valid e-mail, please" : "E-mail"}</label>
                  <span className="field-line" />
                </div>
                <div className="field" data-filled={!!fields.date} data-error={!!errors.date}>
                  <input id="bk-date" type="date" value={fields.date} onChange={set("date")} className="[color-scheme:dark]" />
                  <label htmlFor="bk-date">{errors.date ? "Pick a day" : "Preferred day"}</label>
                  <span className="field-line" />
                </div>
                <div className="field" data-filled={!!fields.surface} data-error={!!errors.surface}>
                  <select id="bk-surface" value={fields.surface} onChange={set("surface")}>
                    <option value="" disabled hidden />
                    <option value="grass">Grass — court one, if free</option>
                    <option value="clay">Clay — terre battue</option>
                    <option value="hard">Hard — tour pace</option>
                    <option value="unsure">Let the concierge choose</option>
                  </select>
                  <label htmlFor="bk-surface">{errors.surface ? "Choose a surface" : "Surface"}</label>
                  <span className="field-line" />
                </div>
              </div>

              <Magnetic strength={0.2} className="mt-12 block">
                <button
                  type="submit"
                  disabled={phase === "sending"}
                  className="btn-pill w-full justify-center border border-[var(--gold)] px-8 py-5 font-mono-label text-[var(--gold-bright)] hover:text-[#0a0e0b] disabled:opacity-80"
                  data-cursor="SEND"
                >
                  <span className="btn-fill bg-[var(--gold)]" />
                  {phase === "sending" ? (
                    <span className="flex items-center gap-1.5">
                      Reserving
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1 w-1 rounded-full bg-current"
                          style={{ animation: `pulse-dot 0.9s ${i * 0.15}s ease-in-out infinite` }}
                        />
                      ))}
                    </span>
                  ) : (
                    "Request the court"
                  )}
                </button>
              </Magnetic>
              <p className="font-mono-label mt-6 text-center text-[var(--ivory-38)]">
                No payment now — this is an invitation, not a checkout
              </p>
            </form>
          ) : (
            <Success name={fields.name} email={fields.email} />
          )}
        </div>
      </div>
    </section>
  );
}
