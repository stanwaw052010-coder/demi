"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq } from "@/data/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="espresso">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          title={
            <>
              Часті <span className="italic text-gold-light">питання</span>
            </>
          }
          intro="Якщо вашого питання тут немає — зателефонуйте, ми відповімо чесно й без нав’язування."
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <SectionLabel>F A Q</SectionLabel>
        </SectionHeading>

        <div className="flex flex-col border-t border-gold/15">
          {faq.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question} className="border-b border-gold/15">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-${index}`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl text-sand sm:text-[1.55rem]">
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        "mt-1.5 h-5 w-5 shrink-0 text-gold transition-transform duration-500",
                        open && "rotate-45",
                      )}
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div id={`faq-${index}`} hidden={!open}>
                  <p className="max-w-[68ch] text-pretty pb-7 text-[0.95rem] text-beige">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
