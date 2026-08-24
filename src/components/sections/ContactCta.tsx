import { ArrowRight } from "lucide-react";
import { AnimatedText } from "../ui/AnimatedText";
import { Reveal } from "../ui/Reveal";
import { buttonClass } from "../ui/Button";
import { site } from "@/lib/site";

export function ContactCta() {
  return (
    <section className="bg-white pt-24 md:pt-32">
      <div className="shell">
        <div className="flex flex-col items-center gap-8 rounded-lg bg-graphite px-6 py-20 text-center md:px-16 md:py-28">
          <Reveal y={12}>
            <span className="eyebrow text-white/50">Запис</span>
          </Reveal>

          <AnimatedText
            lines={["Готові подбати", "про свою усмішку?"]}
            className="text-[2.15rem] leading-[1.05] text-white sm:text-[3.25rem] lg:text-[4rem]"
          />

          <Reveal delay={0.1}>
            <p className="max-w-lg text-[0.975rem] leading-relaxed text-white/60">
              Запишіться на консультацію — ми підберемо оптимальний план турботи саме для вас.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a href="#booking" className={buttonClass("light", "w-full sm:w-auto")}>
                Записатися на консультацію
                <ArrowRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </a>
              <a href={site.phone.href} className="link-underline text-sm text-white/70">
                {site.phone.label}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
