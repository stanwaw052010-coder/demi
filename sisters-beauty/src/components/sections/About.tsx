import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { aboutText, studioFacts } from "@/data/content";

export function About() {
  return (
    <Section id="pro-studiyu" tone="cream">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel tone="ink">{aboutText.label}</SectionLabel>
          <h2 className="text-balance text-[2.2rem] leading-[1.06] text-ink sm:text-5xl md:text-[3.5rem]">
            Студія, створена <span className="italic text-ink/80">з любов&rsquo;ю</span>
          </h2>
          <div className="flex flex-col gap-5 text-[0.98rem] text-ink-soft sm:text-base">
            {aboutText.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-3">
            {studioFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <dt className="font-display text-[2rem] leading-none text-ink">{fact.value}</dt>
                <dd className="label-spaced text-ink-soft">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal index={1} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/studio-1.jpg"
              alt="Кабінет масажу студії SISTER'S у теплому світлі"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full border border-ink/20 sm:block"
          />
        </Reveal>
      </div>
    </Section>
  );
}
