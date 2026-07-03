import Link from "next/link";
import { Instagram } from "./icons";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { EXPERIENCE_YEARS, INSTAGRAM_STATS, PERSONAL_INSTAGRAM_URL, PHOTOS } from "@/lib/mentor";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-green/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-green/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-light/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 py-1.5 text-sm font-medium text-green-light">
              Навчання нарощуванню волосся
            </p>
            <h1 className="mt-6 font-display text-4xl uppercase leading-[1.12] text-cream sm:text-6xl">
              Навчаю нарощуванню волосся{" "}
              <span className="text-gradient">з нуля</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream-soft">
              Допомагаю вийти на стабільний дохід у beauty-бізнесі.
              Трансформую жінок і вчу професії, що змінює життя.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={PERSONAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-green/20 transition-transform hover:-translate-y-0.5 hover:bg-green-dark"
              >
                <Instagram className="h-4 w-4" />
                Записатись на навчання
              </a>
              <Link
                href="/navchannya"
                className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-green-light hover:text-green-light"
              >
                Що входить у навчання
              </Link>
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
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <Photo
              src={PHOTOS.hero.src}
              alt={PHOTOS.hero.alt}
              priority
              className="aspect-[4/5] w-full max-w-sm mx-auto"
            />
            <div className="absolute -left-4 top-8 rounded-2xl border border-white/10 bg-concrete-2/95 px-5 py-4 shadow-xl backdrop-blur sm:-left-8">
              <p className="font-display text-3xl text-green-light">
                {EXPERIENCE_YEARS}
              </p>
              <p className="text-xs uppercase tracking-wide text-cream-soft">
                років у beauty
              </p>
            </div>
            <div className="absolute -right-4 bottom-8 rounded-2xl border border-white/10 bg-concrete-2/95 px-5 py-4 shadow-xl backdrop-blur sm:-right-8">
              <p className="font-display text-sm uppercase tracking-wide text-cream">
                Власний салон
              </p>
              <p className="text-xs text-cream-soft">BEAUTY FORMULA</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
