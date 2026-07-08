import Image from "next/image";
import { Leaf, HeartHandshake, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div
        className="pointer-events-none absolute -right-52 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.12)_0%,transparent_65%)]"
        aria-hidden
      />
      <div className="mx-auto grid max-w-[1360px] items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-7" data-reveal="up">
            Про нас
          </p>
          <h2
            className="h-display text-[clamp(2rem,4.4vw,3.6rem)]"
            data-reveal="blur"
          >
            Простір, де краса зустрічається{" "}
            <span className="italic text-brand-deep">зі здоров’ям</span>
          </h2>

          <p
            className="mt-9 text-lg leading-relaxed text-olive md:text-xl"
            data-reveal="up"
            data-reveal-delay="0.1"
          >
            Rayskaya Beauty Space — місце, де ви можете отримати повний спектр
            косметологічних послуг для відновлення та збереження молодості,
            краси та здоров’я, зберігаючи вашу індивідуальність та природну
            привабливість.
          </p>
          <p
            className="mt-6 text-lg leading-relaxed text-olive md:text-xl"
            data-reveal="up"
            data-reveal-delay="0.18"
          >
            Ми поєднуємо <span className="font-semibold text-ink">медичний підхід</span> та{" "}
            <span className="font-semibold text-ink">естетику luxury</span>. Кожна процедура
            підбирається індивідуально — з урахуванням типу шкіри, її стану та
            ваших побажань. Жодних шаблонних рішень.
          </p>

          <div
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-line bg-line max-sm:grid-cols-1"
            data-reveal="up"
            data-reveal-delay="0.25"
          >
            {[
              ["13+", "років досвіду фахівців"],
              ["100%", "сертифіковані препарати"],
            ].map(([num, label]) => (
              <div key={num} className="bg-white/80 px-8 py-7">
                <p className="font-display text-4xl text-brand-deep">{num}</p>
                <p className="mt-1.5 text-sm text-olive">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Фірмова декоративна панель */}
        <div className="relative" data-reveal="scale">
          <div
            className="absolute -left-6 -top-6 h-full w-full rounded-[40px] border border-brand/30"
            aria-hidden
          />
          <div className="relative flex h-[460px] flex-col items-center justify-center overflow-hidden rounded-[40px] bg-[linear-gradient(150deg,#2a331c_0%,#3a4826_55%,#4c5f2e_100%)] px-10 text-center shadow-[0_36px_80px_rgba(34,39,25,0.25)] md:h-[600px]">
            {/* Декор */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.35)_0%,transparent_65%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.22)_0%,transparent_65%)]"
              aria-hidden
            />
            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-brand/30 animate-spin-slow"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden
            >
              <circle
                cx="100"
                cy="100"
                r="96"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeDasharray="2 7"
              />
            </svg>

            <Image
              src="/logo/rayskaya-light.svg"
              alt="Rayskaya Beauty Space"
              width={300}
              height={88}
              className="relative w-[240px] md:w-[300px]"
            />
            <p className="relative mt-8 max-w-[260px] font-display text-lg italic leading-relaxed text-white/75">
              краса, здоров’я та індивідуальність — у кожній процедурі
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-2.5">
              {[
                { icon: Leaf, label: "природний результат" },
                { icon: HeartHandshake, label: "уважний сервіс" },
                { icon: Sparkles, label: "сучасні методики" },
              ].map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/85 backdrop-blur"
                >
                  <c.icon className="h-3.5 w-3.5 text-brand" strokeWidth={1.8} />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 animate-floaty-soft rounded-3xl border border-white/60 bg-white/85 px-7 py-5 shadow-[0_24px_60px_rgba(34,39,25,0.16)] backdrop-blur-xl max-md:-left-2">
            <p className="font-display text-lg italic text-brand-deep">
              beauty space
            </p>
            <p className="mt-1 text-[13px] font-medium text-olive">
              затишна атмосфера та уважний сервіс
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
