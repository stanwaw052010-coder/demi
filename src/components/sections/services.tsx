import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { extraServices, services, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const hasImage = Boolean(service.image);

  return (
    <a
      href={service.id === "kids" ? "#kids" : "#booking"}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-[24px] p-7 transition-[transform,box-shadow,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-8",
        "hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/70 focus-visible:ring-offset-2",
        "h-full",
        hasImage
          ? "min-h-[420px] bg-ink text-white shadow-[0_30px_80px_-50px_rgba(17,17,17,0.6)] md:min-h-[460px]"
          : "min-h-[300px] bg-mist text-ink hairline hover:border-sand/60 hover:bg-cream hover:shadow-[0_30px_70px_-45px_rgba(17,17,17,0.45)]",
      )}
    >
      {hasImage && (
        <>
          <Image
            src={service.image!}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
            className="object-cover opacity-70 grayscale-[35%] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:opacity-80 group-hover:grayscale-0"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-700 group-hover:opacity-90"
          />
        </>
      )}

      <span
        aria-hidden
        className={cn(
          "absolute left-7 top-7 font-mono text-[11px] tabular-nums md:left-8 md:top-8",
          hasImage ? "text-white/85" : "text-clay",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative mt-auto">
        <span
          className={cn(
            "absolute -top-14 right-0 flex size-11 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45",
            hasImage
              ? "border-white/25 text-white group-hover:border-white group-hover:bg-white group-hover:text-ink"
              : "border-ink/10 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-white",
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </span>

        <h3
          className={cn(
            "font-display text-[24px] font-light tracking-[-0.025em] md:text-[28px]",
            hasImage ? "text-white" : "text-ink",
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-[14px] font-medium uppercase tracking-[0.12em]",
            hasImage ? "text-sand" : "text-clay",
          )}
        >
          {service.summary}
        </p>

        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p
              className={cn(
                "max-w-[38ch] pt-4 text-[14px] leading-relaxed transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100",
                hasImage ? "text-white/85" : "text-graphite",
              )}
            >
              {service.detail}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Послуги"
          title={
            <>
              Все, що потрібно вашій усмішці —{" "}
              <span className="accent text-clay">в одному кабінеті</span>
            </>
          }
          description="Від профілактики до складної естетичної роботи. Кожен план лікування починається з діагностики та відкритої розмови."
          action={
            <ButtonLink href="#contacts" variant="secondary" size="md">
              Отримати консультацію
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:gap-5">
          {services.map((service, i) => (
            <Reveal
              key={service.id}
              delay={(i % 3) * 0.08}
              className={cn("h-full", service.span && "md:col-span-2")}
            >
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}

          <Reveal delay={0.12} className="h-full sm:col-span-2">
            <div className="grain flex h-full flex-col justify-between gap-8 rounded-[24px] border border-sand/50 bg-cream p-7 md:p-9">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
                {extraServices.map((item) => (
                  <div key={item.title}>
                    <span className="eyebrow">Також</span>
                    <h3 className="mt-3 font-display text-[20px] font-light tracking-[-0.02em] text-ink md:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-graphite">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
              <ButtonLink href="#contacts" size="md" className="w-fit">
                Записатися
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
