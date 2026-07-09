"use client";

import { ADDRESS } from "@/lib/site";
import { DividerGold, Eyebrow, Reveal, SectionTitle } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-warm px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1040px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div
              aria-hidden
              className="relative flex h-[260px] items-center justify-center overflow-hidden rounded-[2px] lg:h-[440px]"
              style={{
                background:
                  "linear-gradient(135deg, #eff3e4 0%, #dfe9c8 50%, #cfdfae 100%)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="95" stroke="#6e9634" strokeWidth="0.6" />
                  <circle cx="100" cy="100" r="70" stroke="#6e9634" strokeWidth="0.4" />
                  <circle cx="100" cy="100" r="45" stroke="#6e9634" strokeWidth="0.4" />
                  <ellipse cx="100" cy="100" rx="18" ry="95" stroke="#6e9634" strokeWidth="0.5" />
                  <ellipse cx="100" cy="100" rx="95" ry="18" stroke="#6e9634" strokeWidth="0.3" />
                  <circle cx="100" cy="100" r="5" fill="#6e9634" opacity="0.5" />
                </svg>
              </div>
              <div className="hairline absolute right-6 bottom-6 left-6 border-[0.5px] bg-warm/90 px-5 py-4 backdrop-blur-sm">
                <div className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-deep">
                  Косметологія і естетика обличчя та тіла
                </div>
                <div className="text-sm leading-normal font-light text-ink">
                  Пн–Пт: 08:00–20:00 · {ADDRESS}
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Про нас</Eyebrow>
              <SectionTitle>
                Краса, якій
                <br />
                можна довіритись
              </SectionTitle>
              <DividerGold />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-6 max-w-md text-[15px] leading-[1.85] text-muted">
                Rayskaya Beauty Space — місце, де ви можете отримати повний
                спектр косметологічних послуг для відновлення та збереження
                молодості, краси та здоров&rsquo;я, зберігаючи вашу
                індивідуальність та природну привабливість.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="max-w-md text-[15px] leading-[1.85] text-muted">
                Ми поєднуємо медичний підхід та естетику luxury. Кожна
                процедура підбирається індивідуально — з урахуванням типу
                шкіри, її стану та ваших побажань.{" "}
                <span className="font-normal text-ink">
                  Жодних шаблонних рішень.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
