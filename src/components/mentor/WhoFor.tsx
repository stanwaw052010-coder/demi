import { WHO_FOR } from "@/lib/mentor";
import Reveal from "./Reveal";

export default function WhoFor() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
          Кому підійде
        </p>
        <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
          Для кого це навчання
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {WHO_FOR.map((point, i) => (
          <Reveal key={point.title} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-white/10 bg-concrete-2 p-7 text-center">
              <h3 className="font-display text-sm uppercase tracking-wide text-cream">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-soft">
                {point.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
