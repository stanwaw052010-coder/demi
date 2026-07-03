import { PERSONAL_INSTAGRAM_URL, PROGRAM_MODULES } from "@/lib/mentor";
import { Instagram } from "./icons";
import Reveal from "./Reveal";

export default function Program() {
  return (
    <section id="program" className="bg-concrete-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            Програма навчання
          </p>
          <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
            Що входить у навчання
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-green/60 via-green/20 to-transparent sm:block" />
          <div className="space-y-8">
            {PROGRAM_MODULES.map((mod, i) => (
              <Reveal key={mod.title} delay={i * 0.08}>
                <div className="relative flex gap-6 rounded-2xl border border-white/10 bg-concrete p-7 transition-colors hover:border-green/30 sm:pl-8">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green font-display text-lg text-cream">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg uppercase text-cream">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-soft">
                      {mod.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href={PERSONAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green px-8 py-3.5 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-green-dark"
          >
            <Instagram className="h-4 w-4" />
            Дізнатись деталі навчання
          </a>
        </Reveal>
      </div>
    </section>
  );
}
