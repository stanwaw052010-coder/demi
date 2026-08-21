"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Collapse, MaskText } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faq } from "@/data/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="espresso" curveTop glow="right">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>F A Q</SectionLabel>
          <MaskText
            parts={[{ text: "Часті" }, { text: "питання", className: "italic text-gold-light" }]}
            className="text-balance text-[2.1rem] leading-[1.08] text-sand sm:text-5xl md:text-[3.4rem]"
          />
          <Reveal>
            <p className="max-w-[62ch] text-pretty text-[0.98rem] text-beige sm:text-base">
              Якщо вашого питання тут немає — зателефонуйте, ми відповімо чесно й без нав’язування.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {faq.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.question}
                className={cn(
                  "card overflow-hidden px-6 transition-colors duration-500 sm:px-8",
                  open ? "border-gold/45" : "",
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={`faq-${index}`}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl text-sand transition-colors duration-500 group-hover:text-gold-light sm:text-[1.55rem]">
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        "mt-0.5 h-9 w-9 shrink-0 rounded-full border border-gold/30 p-2 text-gold transition-transform duration-500",
                        open && "rotate-45",
                      )}
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </button>
                </h3>
                <Collapse open={open} id={`faq-${index}`}>
                  <p className="max-w-[68ch] text-pretty pb-7 text-[0.95rem] text-beige">
                    {item.answer}
                  </p>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
