"use client";

import {
  Award,
  HeartHandshake,
  MonitorCog,
  ShieldCheck,
  Sofa,
} from "lucide-react";
import { ADVANTAGES } from "@/lib/site";
import { Eyebrow, Reveal, SectionTitle } from "./Reveal";

const ICONS = [Award, MonitorCog, ShieldCheck, HeartHandshake, Sofa];

export default function Advantages() {
  return (
    <section id="advantages" className="bg-dark px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1040px]">
        <Reveal>
          <Eyebrow light>Чому обирають нас</Eyebrow>
          <SectionTitle light>Наші переваги</SectionTitle>
        </Reveal>

        <div className="mt-16 grid gap-x-9 gap-y-10 border-t-[0.5px] border-brand/25 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={0.07 * i}>
                <div className="pt-10">
                  <div className="mb-6 flex size-11 items-center justify-center border-[0.5px] border-brand/35">
                    <Icon
                      className="size-5 text-brand-soft"
                      strokeWidth={1.25}
                    />
                  </div>
                  <div className="mb-3 font-display text-[22px] font-light text-[#f3f5ec]">
                    {item.title}
                  </div>
                  <p className="text-[13px] leading-[1.75] text-[#f3f5ec]/45">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
