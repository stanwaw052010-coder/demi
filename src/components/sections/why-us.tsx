import Image from "next/image";
import {
  Activity,
  Award,
  Feather,
  Gem,
  Microscope,
  Route,
  type LucideIcon,
} from "lucide-react";
import { advantages } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: Record<string, LucideIcon> = {
  microscope: Microscope,
  award: Award,
  feather: Feather,
  gem: Gem,
  activity: Activity,
  route: Route,
};

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-ink py-24 md:py-36">
      {/* Clinic photograph, held far back so the type stays the subject */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/clinic.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.16] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          index="02"
          eyebrow="Чому обирають нас"
          tone="dark"
          title={
            <>
              Причини, через які до нас{" "}
              <span className="accent text-sand">повертаються родинами</span>
            </>
          }
          description="Ми не поспішаємо. Кожен етап пояснюємо, показуємо на екрані та узгоджуємо з вами до початку роботи."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.07} className="h-full">
                <div className="group relative h-full bg-ink p-8 transition-colors duration-700 hover:bg-graphite/60 md:p-10">
                  <div className="flex items-center justify-between">
                    <Icon
                      className="size-7 text-sand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:text-white"
                      strokeWidth={1}
                      aria-hidden
                    />
                    <span aria-hidden className="font-mono text-[11px] tabular-nums text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-16 font-display text-[21px] font-light tracking-[-0.02em] text-white md:mt-20 md:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-white/55 transition-colors duration-700 group-hover:text-white/65">
                    {item.text}
                  </p>

                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-sand via-sand/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
