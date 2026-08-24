import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { buttonClass } from "../ui/Button";
import { site } from "@/lib/site";

/**
 * Масажний напрям: та сама палітра, але темна подача —
 * блок відчувається як окрема частина того ж бренду.
 */
export function Massage() {
  return (
    <section className="bg-graphite py-24 text-white md:py-32">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal y={40}>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg bg-white/5">
            <Image
              src="/images/massage.svg"
              alt="Візуальний образ напряму масажу"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Масаж"
            tone="light"
            lines={["Турбота не лише", "про усмішку"]}
            description="Доповнюємо турботу про здоровʼя процедурами для тіла."
          />

          <Reveal delay={0.12}>
            <a
              href={site.instagram.massage}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClass("light", "w-full sm:w-auto")}
            >
              Перейти до {site.instagram.massageHandle}
              <ArrowUpRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
