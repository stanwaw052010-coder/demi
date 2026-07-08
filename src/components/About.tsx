"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow, Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about-visual-inner", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="relative py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Про нас</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.4rem]">
              Місце, де краса зберігає вашу{" "}
              <em className="font-normal italic text-olive">
                індивідуальність
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 text-lg leading-relaxed text-stone">
              Rayskaya Beauty Space — місце, де ви можете отримати повний
              спектр косметологічних послуг для відновлення та збереження
              молодості, краси та здоров&rsquo;я, зберігаючи вашу
              індивідуальність та природну привабливість.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 border-l-2 border-brand pl-6">
              <p className="text-lg leading-relaxed text-ink/85">
                Ми поєднуємо медичний підхід та естетику luxury. Кожна
                процедура підбирається індивідуально — з урахуванням типу
                шкіри, її стану та ваших побажань.{" "}
                <span className="font-semibold text-deep">
                  Жодних шаблонних рішень.
                </span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <a
              href="#services"
              className="group mt-10 inline-flex items-center gap-3 text-[15px] font-semibold text-olive"
            >
              Дізнатися про послуги
              <span className="h-px w-12 bg-brand transition-all duration-400 group-hover:w-20" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={50}>
          <div className="relative">
            <div className="grain relative aspect-[5/6] overflow-hidden rounded-[2.5rem] shadow-[0_36px_80px_-32px_rgba(52,66,31,0.4)] sm:aspect-[6/6.5]">
              <div
                className="about-visual-inner absolute -inset-y-[8%] inset-x-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/about-visual.jpg)" }}
              />
              <svg
                viewBox="0 0 400 440"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <g fill="none" stroke="#5e7a34" strokeWidth="1">
                  <path
                    d="M200 356 C 200 268 240 236 306 220 C 244 226 214 200 206 132 C 198 200 168 226 106 220 C 172 236 200 268 200 356 Z"
                    strokeOpacity="0.55"
                  />
                  <circle cx="206" cy="238" r="128" strokeOpacity="0.22" />
                  <circle cx="206" cy="238" r="164" strokeOpacity="0.12" />
                </g>
              </svg>
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white/75 px-5 py-4 backdrop-blur-md">
                <p className="font-display text-base italic text-deep">
                  «Медичний підхід та естетика luxury»
                </p>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -right-6 top-12 -z-10 h-64 w-40 rounded-[2rem] bg-brand-mist"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
