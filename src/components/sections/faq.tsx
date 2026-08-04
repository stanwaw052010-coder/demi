import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";
import { faq } from "@/lib/content";
import { site } from "@/lib/site";

import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

/* Below the fold — its animation library loads after the page is interactive */
const Accordion = dynamic(() =>
  import("@/components/ui/accordion").then((m) => m.Accordion),
);

export function Faq() {
  return (
    <section id="faq" className="bg-mist py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="font-mono text-[11px] tabular-nums text-ink/50">
                  10
                </span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="eyebrow">Питання</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="display-tight mt-6 font-display text-[32px] font-light text-ink sm:text-[44px] lg:text-[52px]">
                Часті{" "}
                <span className="accent text-clay">запитання</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 rounded-[24px] border border-ink/[0.07] bg-white p-7">
                <MessageCircle
                  className="size-6 text-ink/50"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <p className="mt-5 text-[16px] leading-relaxed text-graphite">
                  Не знайшли відповідь? Зателефонуйте — ми відповімо на будь-яке
                  запитання ще до візиту.
                </p>
                <ButtonLink
                  href={site.phoneHref}
                  variant="secondary"
                  size="md"
                  className="mt-7 w-full tabular-nums sm:w-auto"
                >
                  {site.phone}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} y={32}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
