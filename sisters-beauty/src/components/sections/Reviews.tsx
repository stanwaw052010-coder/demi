import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { reviews } from "@/data/content";

export function Reviews() {
  return (
    <Section id="vidhuky" tone="cocoa">
      <SectionHeading
        title={
          <>
            Що кажуть <span className="italic text-gold-light">клієнтки</span>
          </>
        }
        intro="Відгуки з Instagram-хайлайту студії."
      >
        <SectionLabel>В І Д Г У К И</SectionLabel>
      </SectionHeading>

      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {reviews.map((review, index) => (
          <Reveal
            as="li"
            key={review.name + index}
            index={index}
            className="hairline flex flex-col gap-6 p-8 sm:p-10"
          >
            <LogoMark className="h-4 w-4 text-gold" />
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
