import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/motion";
import { directions } from "@/data/content";

export function Directions() {
  return (
    <Section id="napryamky" tone="espresso">
      <div className="flex flex-col gap-5">
        <SectionLabel>Н А П Р Я М К И</SectionLabel>
        <MaskText
          parts={[{ text: "Чотири напрямки" }, { text: "студії", className: "italic text-gold-light" }]}
          className="text-balance text-[2.1rem] leading-[1.08] text-sand sm:text-5xl md:text-[3.4rem]"
        />
        <Reveal>
          <p className="max-w-[62ch] text-pretty text-[0.98rem] text-beige sm:text-base">
            Оберіть напрямок — і перейдіть одразу до цін та описів процедур у прайсі.
          </p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {directions.map((direction, index) => (
          <Reveal as="li" key={direction.id} index={index} className="group">
            <Link
              href={`#prays-${direction.target}`}
              className="relative flex h-full flex-col border border-gold/20 bg-cocoa transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_24px_60px_-32px_rgba(201,165,77,0.55)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={direction.image}
                  alt={direction.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover opacity-85 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-30"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-2xl text-sand transition-colors duration-500 group-hover:text-gold-light">
                  {direction.title}
                </h3>
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

              {/* золота лінія, що проступає знизу картки */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100"
              />
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
