import { Bell, Calendar, Download, Sparkle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/site";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const SPECIALISTS = [
  { initials: "ОК", active: true },
  { initials: "МЛ", active: false },
  { initials: "ІВ", active: false },
];

export default function MobileApp() {
  return (
    <section className="relative overflow-hidden bg-green-dark py-28 text-warm md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grain)" />
        </svg>
      </div>

      <div className="container-x relative grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Reveal variant="fade">
            <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-green/80">
              <span className="h-px w-8 bg-green" />
              Мобільний застосунок
            </span>
          </Reveal>

          <SplitReveal
            as="h2"
            text="Власний мобільний застосунок"
            className="font-display max-w-lg text-4xl leading-[1.15] text-warm md:text-[2.75rem]"
          />

          <Reveal variant="up" delay={0.1}>
            <p className="mt-8 max-w-md text-[16px] leading-[1.9] text-warm/70">
              Записуйтеся онлайн, обирайте спеціаліста, отримуйте нагадування та
              керуйте своїми візитами в одному застосунку.
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-warm/25 px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-warm transition-colors hover:border-warm/60"
              >
                <Download size={16} />
                App Store
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-warm/25 px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-warm transition-colors hover:border-warm/60"
              >
                <Download size={16} />
                Google Play
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-6">
          {/* decorative green lines */}
          <svg
            className="pointer-events-none absolute -top-10 left-1/2 h-[420px] w-[420px] -translate-x-1/2 text-green/25 lg:h-[520px] lg:w-[520px]"
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
            <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="animate-float relative">
            {/* iPhone frame */}
            <div className="relative h-[560px] w-[280px] rounded-[3rem] border-[6px] border-warm/15 bg-[#101610] p-2.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]">
              <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-warm">
                {/* notch */}
                <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#101610]" />

                {/* screen content */}
                <div className="flex h-full flex-col px-5 pb-6 pt-9 text-ink">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg">Rayskaya</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-soft text-green-dark">
                      <Bell size={14} />
                    </div>
                  </div>

                  <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-body/70">
                    Ваш візит
                  </p>
                  <div className="mt-2 flex items-center gap-2 rounded-2xl bg-green-soft p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green text-warm">
                      <Calendar size={16} />
                    </div>
                    <div className="text-[12px]">
                      <div className="font-semibold text-ink">Чистка обличчя</div>
                      <div className="text-body">Чт, 12 листопада · 15:00</div>
                    </div>
                  </div>

                  <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-body/70">
                    Оберіть день
                  </p>
                  <div className="mt-2 flex gap-2">
                    {DAYS.map((day, i) => (
                      <div
                        key={day}
                        className={`flex h-11 w-9 flex-1 flex-col items-center justify-center rounded-xl text-[11px] font-semibold ${
                          i === 2
                            ? "bg-green-dark text-warm"
                            : "bg-warm-deep text-body"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-body/70">
                    Спеціаліст
                  </p>
                  <div className="mt-2 flex gap-3">
                    {SPECIALISTS.map((s) => (
                      <div
                        key={s.initials}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-semibold ${
                          s.active
                            ? "bg-green text-warm ring-2 ring-green-dark ring-offset-2 ring-offset-warm"
                            : "bg-warm-deep text-body"
                        }`}
                      >
                        {s.initials}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-center gap-2 rounded-full bg-green-dark py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-warm">
                    <Sparkle size={14} />
                    Записатися
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
