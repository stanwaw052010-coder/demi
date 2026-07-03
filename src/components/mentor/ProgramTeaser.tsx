import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAM_MODULES } from "@/lib/mentor";
import Reveal from "./Reveal";

export default function ProgramTeaser() {
  const preview = PROGRAM_MODULES.slice(0, 3);

  return (
    <section className="bg-concrete-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            Програма навчання
          </p>
          <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
            Що входить у навчання
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {preview.map((mod, i) => (
            <Reveal key={mod.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-concrete p-7">
                <span className="font-display text-3xl text-green/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg uppercase text-cream">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-soft">
                  {mod.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/navchannya"
            className="inline-flex items-center gap-2 rounded-full bg-green px-8 py-3.5 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-green-dark"
          >
            Детальніше про програму
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
