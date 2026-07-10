"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSectionTheme } from "@/lib/hooks";
import { PillButton } from "@/components/ui/PillButton";
import { SplitReveal } from "@/components/ui/Split";
import { SERVICES } from "@/data/content";

type Phase = "idle" | "sending" | "done";

function Field({
  label,
  children,
  filled,
}: {
  label: string;
  children: React.ReactNode;
  filled: boolean;
}) {
  return (
    <div className="field" data-filled={filled}>
      {children}
      <label>{label}</label>
      <span className="field-glow" aria-hidden />
    </div>
  );
}

/**
 * The reservation desk: a pane of glass with a slow champagne
 * current running around its edge, floating labels, and a sealed-
 * with-light success state.
 */
export function Booking() {
  const rootRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [form, setForm] = useState({ name: "", phone: "", ritual: "", date: "" });
  useSectionTheme(rootRef, "dark");

  // ambient blobs drifting behind the glass
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-blob]", root).forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-90, 90),
          y: () => gsap.utils.random(-70, 70),
          scale: () => gsap.utils.random(0.85, 1.25),
          duration: () => gsap.utils.random(7, 11),
          delay: i * 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "idle") return;
    setPhase("sending");
    setTimeout(() => setPhase("done"), 1600);
  };

  const firstName = form.name.trim().split(" ")[0] || "madame";

  return (
    <section ref={rootRef} id="reserve" className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44">
      {/* ambient light behind the glass */}
      <div
        data-blob
        className="pointer-events-none absolute top-[16%] right-[8%] h-[46vmin] w-[46vmin] rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(216,191,154,0.16), transparent 65%)", filter: "blur(60px)" }}
      />
      <div
        data-blob
        className="pointer-events-none absolute bottom-[6%] left-[16%] h-[38vmin] w-[38vmin] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, rgba(179,146,78,0.13), transparent 65%)", filter: "blur(50px)" }}
      />

      <div className="hairline-t mb-20 flex items-baseline justify-between pt-6">
        <span className="label-mono">06 — Réservation</span>
        <span className="label-mono hidden md:block">answered within the hour</span>
      </div>

      <div className="grid gap-20 lg:grid-cols-2 lg:gap-28">
        <div>
          <SplitReveal
            as="h2"
            className="h-display mb-10 block text-[clamp(2.8rem,6vw,6rem)]"
          >
            Begin your ritual
          </SplitReveal>
          <p className="mb-14 max-w-md text-sm leading-relaxed opacity-60">
            Leave four small facts. A human — never a bot — will call you
            back, match you with the right artisan, and hold the room for
            you. Nothing to pay until you arrive.
          </p>

          <dl className="max-w-md space-y-6">
            {[
              ["Telephone", "+380 44 000 11 22"],
              ["Address", "12 Yaroslaviv Val St, Kyiv"],
              ["Hours", "Tue – Sun · 10:00 – 21:00"],
            ].map(([k, v]) => (
              <div key={k} className="hairline-t flex items-baseline justify-between pt-4">
                <dt className="label-mono">{k}</dt>
                <dd className="font-serif-display text-lg italic">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* the glass desk */}
        <div className="glow-border glass relative min-h-[460px] rounded-2xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {phase === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                className="flex h-full min-h-[380px] flex-col items-center justify-center text-center"
              >
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden>
                  <motion.circle
                    cx="42" cy="42" r="40"
                    stroke="var(--accent)" strokeWidth="1"
                    initial={{ pathLength: 0, rotate: -90 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M27 43.5 L38 54 L58 32"
                    stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                  />
                </svg>
                <p className="font-serif-display mt-8 text-4xl italic md:text-5xl">
                  Merci, {firstName}.
                </p>
                <p className="label-mono mt-6">
                  our curator will call before sunset
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", phone: "", ritual: "", date: "" });
                    setPhase("idle");
                  }}
                  data-cursor
                  data-cursor-text="Again"
                  className="link-sweep mt-10 font-mono text-[11px] tracking-[0.24em] uppercase opacity-60"
                >
                  Book for someone else
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.45 }}
                className="flex h-full flex-col gap-8"
              >
                <Field label="Your name" filled={!!form.name}>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={set("name")}
                  />
                </Field>
                <Field label="Telephone" filled={!!form.phone}>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </Field>
                <div className="grid gap-8 md:grid-cols-2">
                  <Field label="Ritual" filled={!!form.ritual}>
                    <select required value={form.ritual} onChange={set("ritual")}>
                      <option value="" hidden />
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} className="bg-ink text-ivory">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred day" filled={!!form.date}>
                    <input type="date" required value={form.date} onChange={set("date")} />
                  </Field>
                </div>

                <div className="mt-auto pt-4">
                  <PillButton type="submit" className="w-full [&>button]:w-full">
                    {phase === "sending" ? "Sealing the hour…" : "Request the hour"}
                  </PillButton>
                  <p className="label-mono mt-5 text-center opacity-50">
                    concept demonstration — no data leaves this page
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
