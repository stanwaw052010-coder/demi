import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp, MaskText } from "@/components/ui/motion";
import { AROSHA_PRICE, priceCategories } from "@/data/services";

const arosha = priceCategories.find((category) => category.id === "arosha")!;

export function Arosha() {
  return (
    <Section id="arosha" tone="espresso" className="border-t border-gold/12">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
        <Reveal className="flex flex-col gap-5">
          <SectionLabel>{arosha.label}</SectionLabel>
          <MaskText
            parts={[{ text: "Вісім програм" }, { text: "AROSHA", className: "italic text-gold-light" }]}
            className="text-balance text-[2.2rem] leading-[1.06] text-sand sm:text-5xl md:text-[3.5rem]"
          />
          <p className="max-w-[62ch] text-pretty text-[0.98rem] text-beige">{arosha.intro}</p>
        </Reveal>

        <Reveal index={1} className="flex items-end gap-4 border-l border-gold/25 pl-6 lg:pl-8">
          <div>
            <p className="label-spaced text-beige">Кожна програма</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-[3.4rem] leading-none text-gold-light">
                <CountUp value={AROSHA_PRICE} />
              </span>
              <span className="label-spaced text-beige">грн</span>
            </p>
          </div>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-px overflow-hidden border border-gold/20 bg-gold/20 sm:grid-cols-2">
        {arosha.services.map((service, index) => (
          <Reveal
            as="li"
            key={service.id}
            index={index}
            className="group relative flex flex-col gap-4 overflow-hidden bg-espresso p-8 transition-colors duration-700 hover:bg-cocoa sm:p-10"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-top group-hover:scale-y-100"
            />
            <p className="label-spaced text-gold transition-colors duration-500 group-hover:text-gold-light">
              {service.name}
            </p>
            <p className="text-pretty text-sm text-beige">{service.description}</p>
            <p className="mt-auto pt-2 font-display text-2xl text-sand">
              {AROSHA_PRICE.toLocaleString("uk-UA")}
              <span className="label-spaced ml-2 text-beige">грн</span>
            </p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 grid gap-8 border-t border-gold/12 pt-10 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex items-center gap-6">
          <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden sm:block">
            <Image
              src="/images/wrap-arosha.jpg"
              alt="Бандажі AROSHA перед процедурою обгортання"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <p className="max-w-[52ch] text-pretty text-sm text-beige">
            Не знаєте, яка програма ваша? Опишіть задачу — набряки, об’єми, рельєф шкіри чи втома —
            і ми підберемо обгортання на консультації.
          </p>
        </div>
        <Link
          href="#zapys"
          className="btn btn-outline label-spaced justify-self-start px-8 py-4 sm:justify-self-end"
        >
          Підібрати програму
        </Link>
      </div>
    </Section>
  );
}
