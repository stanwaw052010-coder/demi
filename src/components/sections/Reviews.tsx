import { Section } from "@/components/ui/Section";
import { MaskText } from "@/components/ui/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { reviews } from "@/data/content";

export function Reviews() {
  return (
    <Section id="vidhuky" tone="cocoa" curveTop glow="left">
      <div className="flex flex-col gap-5">
        <SectionLabel>В І Д Г У К И</SectionLabel>
        <MaskText
          parts={[{ text: "Що кажуть" }, { text: "клієнтки", className: "italic text-gold-light" }]}
          className="text-balance text-[2.1rem] leading-[1.08] text-sand sm:text-5xl md:text-[3.4rem]"
        />
        <Reveal>
          <p className="max-w-[62ch] text-pretty text-[0.98rem] text-beige sm:text-base">
            Відгуки з Instagram-хайлайту студії.
          </p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {reviews.map((review, index) => (
          <Reveal
            as="li"
            key={review.name + index}
            index={index}
            className="card card-hover group flex flex-col gap-6 bg-espresso/45 p-8 sm:p-10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/5">
              <LogoMark className="h-4 w-4 text-gold transition-transform duration-700 group-hover:rotate-90" />
            </span>
            <blockquote className="font-display text-[1.35rem] leading-snug text-sand sm:text-[1.5rem]">
              «{review.text}»
            </blockquote>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <span className="label-spaced text-sand">{review.name}</span>
              <span aria-hidden className="h-px w-6 bg-gold/50" />
              <span className="text-xs text-beige">{review.service}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
