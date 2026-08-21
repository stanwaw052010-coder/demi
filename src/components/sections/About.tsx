import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp, MaskText, RevealImage } from "@/components/ui/motion";
import { aboutText, studioFacts } from "@/data/content";

/** «110+» → число, що набігає, і хвостик окремо. */
const splitFact = (value: string) => {
  const match = value.match(/^(\d+)(\D*)$/);
  return match ? { number: Number(match[1]), suffix: match[2] } : null;
};

export function About() {
  return (
    <Section id="pro-studiyu" tone="cream" curveTop>
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionLabel tone="ink">{aboutText.label}</SectionLabel>

          <MaskText
            parts={[
              { text: "Студія, створена" },
              { text: "з любов’ю", className: "italic text-ink/80" },
            ]}
            className="text-balance text-[2.2rem] leading-[1.06] text-ink sm:text-5xl md:text-[3.5rem]"
          />

          <div className="flex flex-col gap-5 text-[0.98rem] text-ink-soft sm:text-base">
            {aboutText.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} index={index}>
                <p className="text-pretty">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-3">
            {studioFacts.map((fact, index) => {
              const numeric = splitFact(fact.value);
              return (
                <Reveal
                  as="div"
                  key={fact.label}
                  index={index}
                  className="card card-light flex flex-col gap-1.5 rounded-[var(--r-md)] px-5 py-5"
                >
                  <dt className="font-display text-[2rem] leading-none text-ink">
                    {numeric ? (
                      <CountUp value={numeric.number} suffix={numeric.suffix} />
                    ) : (
                      fact.value
                    )}
                  </dt>
                  <dd className="label-spaced text-ink-soft">{fact.label}</dd>
                </Reveal>
              );
            })}
          </dl>
        </div>

        <div className="relative">
          <RevealImage className="arch relative aspect-[4/5] w-full shadow-[var(--shadow-light)]">
            <Image
              src="/images/studio-1.jpg"
              alt="Кабінет масажу студії SISTER'S у теплому світлі"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </RevealImage>
          <div
            aria-hidden
            className="arch pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full border border-ink/20 sm:block"
          />
        </div>
      </div>
    </Section>
  );
}
