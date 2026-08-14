import Image from "next/image";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MotionItem } from "@/components/ui/MotionItem";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoftGlow } from "@/components/ui/Aurora";
import { masters, site } from "@/lib/site";

export function Team() {
  return (
    <section id="team" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <SoftGlow />

      <div className="container-x relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Команда"
            title="Наші майстри —"
            accent="ті, хто робить результат"
            text="Чотири майстрині, кожна у своєму напрямку. До кожної можна записатися окремо — оберіть спеціаліста під час онлайн-запису."
            className="lg:max-w-2xl"
          />
          <Reveal direction="left" delay={0.2}>
            <Button href={site.booking.url} variant="light" size="lg">
              <CalendarCheck className="size-5" strokeWidth={2.3} />
              Обрати майстра
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 md:mt-16">
          {masters.map((master) => (
            <MotionItem key={`${master.name}-${master.role}`} as="article" className="h-full">
              <figure className="group flex h-full flex-col overflow-hidden rounded-5xl border border-graphite-200/70 bg-white shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={master.photo}
                    alt={`${master.name} — ${master.role.toLowerCase()} студії ProfiTime`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/45 via-transparent to-transparent"
                  />
                </div>

                <figcaption className="flex flex-1 flex-col p-4 sm:p-6">
                  <p className="text-[1.05rem] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[1.2rem]">
                    {master.name}
                  </p>
                  <p className="mt-1.5 text-[0.82rem] leading-snug font-semibold text-brand-700 text-pretty sm:text-[0.88rem]">
                    {master.role}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-graphite-200/80 pt-4 sm:mt-5 sm:gap-2 sm:pt-5">
                    {master.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.68rem] font-bold text-brand-700 ring-1 ring-brand-100 sm:px-3 sm:py-1.5 sm:text-[0.72rem]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            </MotionItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
