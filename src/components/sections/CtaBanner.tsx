import { CalendarCheck, Phone } from "lucide-react";
import { Instagram } from "@/components/ui/icons";
import { Aurora } from "@/components/ui/Aurora";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section id="cta" className="relative isolate grain overflow-hidden bg-brand-950 py-24 md:py-32">
      <Aurora />

      <BrandGlyph
        className="pointer-events-none absolute -right-16 -bottom-20 h-[26rem] w-[26rem] animate-float-slow text-white/[0.04] md:-right-4"
      />

      <div className="container-x relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal direction="up">
            <Eyebrow tone="light">Готові почати?</Eyebrow>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <h2 className="mt-7 text-[clamp(2.1rem,1.35rem+3.4vw,4.2rem)] leading-[1.03] font-extrabold tracking-[-0.045em] text-white text-balance">
              Стопи, про які не треба{" "}
              <span className="font-serif font-medium text-aqua-300 italic">думати щодня</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.16}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/65 text-pretty md:text-[1.15rem]">
              Один візит — і ви точно знатимете, що відбувається та що з цим робити. Записуйтесь у зручний
              для вас час.
            </p>
          </Reveal>

          <Reveal direction="scale" delay={0.24}>
            <a
              href={site.phone.href}
              className="mt-10 block text-[clamp(1.7rem,1.1rem+2.6vw,3.1rem)] leading-none font-extrabold tracking-[-0.04em] text-white transition-colors duration-300 hover:text-aqua-300"
            >
              {site.phone.display}
            </a>
          </Reveal>

          <Reveal direction="up" delay={0.32}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={site.phone.href} variant="light" size="lg">
                <Phone className="size-5" strokeWidth={2.4} />
                Подзвонити
              </Button>
              <Button href={site.instagram.url} variant="ghost" size="lg">
                <Instagram className="size-5" strokeWidth={2.2} />
                Написати
              </Button>
            </div>
          </Reveal>

          <Reveal direction="fade" delay={0.42}>
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 text-[0.88rem] font-bold text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <CalendarCheck className="size-4" strokeWidth={2.3} />
              {site.booking.label}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
