import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { directions } from "@/data/content";

export function Directions() {
  return (
    <Section id="napryamky" tone="espresso">
      <SectionHeading
        title={
          <>
            Чотири напрямки <span className="italic text-gold-light">студії</span>
          </>
        }
        intro="Оберіть напрямок — і перейдіть одразу до цін та описів процедур у прайсі."
      >
        <SectionLabel>Н А П Р Я М К И</SectionLabel>
      </SectionHeading>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {directions.map((direction, index) => (
          <Reveal as="li" key={direction.id} index={index} className="group">
            <Link
              href={`#prays-${direction.target}`}
              className="flex h-full flex-col border border-gold/20 bg-cocoa transition-colors duration-500 hover:border-gold/60"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={direction.image}
                  alt={direction.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-2xl text-sand">{direction.title}</h3>
                <p className="flex-1 text-pretty text-sm text-beige">{direction.description}</p>
                <span className="label-spaced mt-2 inline-flex items-center gap-2 text-gold">
                  До прайсу
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
