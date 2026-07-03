import { PERSONAL_INSTAGRAM_URL, PROGRAM_MODULES } from "@/lib/mentor";
import { Instagram } from "./icons";

export default function Program() {
  return (
    <section id="program" className="bg-concrete-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            Програма навчання
          </p>
          <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
            Що входить у навчання
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM_MODULES.map((mod, i) => (
            <div
              key={mod.title}
              className="rounded-2xl border border-white/10 bg-concrete p-7"
            >
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
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={PERSONAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green px-8 py-3.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-green-dark"
          >
            <Instagram className="h-4 w-4" />
            Дізнатись деталі навчання
          </a>
        </div>
      </div>
    </section>
  );
}
