import { Instagram } from "./icons";
import { EXPERIENCE_YEARS, INSTAGRAM_STATS, PERSONAL_INSTAGRAM_HANDLE, PERSONAL_INSTAGRAM_URL } from "@/lib/mentor";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 py-1.5 text-sm font-medium text-green-light">
              Навчання нарощуванню волосся
            </p>
            <h1 className="mt-6 font-display text-4xl uppercase leading-[1.15] text-cream sm:text-5xl">
              Навчаю нарощуванню волосся з нуля
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream-soft">
              Допомагаю вийти на стабільний дохід у beauty-бізнесі. Трансформую
              жінок і вчу професії, що змінює життя.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={PERSONAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-green/20 transition-colors hover:bg-green-dark"
              >
                <Instagram className="h-4 w-4" />
                Записатись на навчання
              </a>
              <a
                href="#program"
                className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-green-light hover:text-green-light"
              >
                Що входить у навчання
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3">
              {INSTAGRAM_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl text-cream">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-cream-soft/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-green/30 bg-concrete-2 sm:h-80 sm:w-80">
            <div className="absolute inset-4 rounded-full border border-dashed border-green/30" />
            <div className="text-center">
              <p className="font-display text-6xl text-green-light sm:text-7xl">
                {EXPERIENCE_YEARS}
              </p>
              <p className="mt-2 text-sm uppercase tracking-wide text-cream-soft">
                років у beauty
              </p>
              <p className="mt-6 text-sm text-cream-soft">{PERSONAL_INSTAGRAM_HANDLE}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
