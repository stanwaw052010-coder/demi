import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { benefits } from "@/data/content";

export function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="shell flex flex-col gap-14">
        <SectionHeading eyebrow="Переваги" lines={["Чому нас обирають"]} />

        <ul className="flex flex-col">
          {benefits.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.index}
              delay={index * 0.06}
              className="hairline group grid gap-4 py-8 md:grid-cols-[5rem_1fr_1.1fr] md:items-baseline md:gap-10 md:py-10"
            >
              <span className="text-xs tracking-[0.2em] text-muted">{benefit.index}</span>
              <h3 className="text-[1.75rem] leading-tight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[2.25rem] md:group-hover:translate-x-2">
                {benefit.title}
              </h3>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">{benefit.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
