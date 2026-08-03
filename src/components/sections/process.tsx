import * as React from "react";
import { process } from "@/lib/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function Process() {
  return (
    <section id="process" className="grain relative bg-cream py-24 md:py-36">
      {/* Warm light pooling behind the column of steps */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(47,52,59,0.09),transparent)]"
      />

      <div className="container-x relative">
        <SectionHeading
          index="04"
          eyebrow="Як проходить візит"
          title={
            <>
              Чотири кроки —{" "}
              <span className="accent text-clay">без сюрпризів</span>
            </>
          }
          description="Ми говоримо про все до того, як почати. Ви завжди знаєте, що відбувається зараз і що буде далі."
          action={
            <ButtonLink href="#contacts" variant="secondary" size="md">
              Записатися на консультацію
            </ButtonLink>
          }
        />

        <ol className="mt-16 md:mt-24">
          {process.map((item, i) => (
            /* The reveal lives on the <li> itself so the list stays valid */
            <li
              key={item.step}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 0.06}s` } as React.CSSProperties}
              className="reveal group grid items-baseline gap-3 border-t border-ink/[0.09] py-8 transition-colors duration-500 hover:border-ink/25 md:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:py-10"
            >
              <span className="accent text-[34px] leading-none text-clay transition-colors duration-500 group-hover:text-ink md:w-20 md:text-[46px]">
                0{i + 1}
              </span>

              <div>
                <h3 className="font-display text-[22px] font-light tracking-[-0.025em] text-ink md:text-[27px]">
                  {item.step}
                </h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-clay">
                  {item.time}
                </p>
              </div>

              <p className="max-w-[46ch] text-[15px] leading-relaxed text-graphite/75 md:text-[16px]">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="rule-dotted" aria-hidden />
      </div>
    </section>
  );
}
