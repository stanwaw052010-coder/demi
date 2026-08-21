import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { gallery } from "@/data/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Masonry на CSS-колонках: різні пропорції дають ритм без дірок у сітці. */
const spanClass = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export function Gallery() {
  return (
    <Section id="galereya" tone="espresso">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title={
            <>
              Атмосфера <span className="italic text-gold-light">студії</span>
            </>
          }
        >
          <SectionLabel>Г А Л Е Р Е Я</SectionLabel>
        </SectionHeading>

        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="label-spaced group inline-flex shrink-0 items-center gap-2 border border-gold/45 px-6 py-3.5 text-sand transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light"
        >
          Більше в Instagram
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.25}
            aria-hidden
          />
        </a>
      </div>

      <ul className="mt-14 gap-4 sm:columns-2 lg:columns-3">
        {gallery.map((item, index) => (
          <Reveal
            as="li"
            key={item.src + index}
            index={index}
            className={cn(
              "group relative mb-4 block break-inside-avoid overflow-hidden",
              spanClass[item.span],
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-2 border border-gold/0 transition-colors duration-500 group-hover:border-gold/60"
            />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
