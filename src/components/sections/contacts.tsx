import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { MapPanel } from "@/components/sections/map-panel";

const items = [
  {
    icon: MapPin,
    label: "Адреса",
    value: site.address,
    href: site.mapsLink,
    external: true,
  },
  {
    icon: Phone,
    label: "Телефон",
    value: site.phone,
    href: site.phoneHref,
    external: false,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="bg-white py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Контакти"
          title={
            <>
              Завітайте до нас
              <span className="text-ink/50"> у центрі Тернополя</span>
            </>
          }
          description="Зателефонуйте або напишіть в Instagram — підберемо зручний час, зазвичай уже на найближчі дні."
        />

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* Map */}
          <Reveal y={32} className="h-full">
            <MapPanel />
          </Reveal>

          {/* Details */}
          <Reveal delay={0.08} y={32} className="h-full">
            <div className="flex h-full flex-col rounded-[24px] border border-ink/[0.07] bg-mist p-7 md:p-9">
              <div className="divide-y divide-ink/[0.08]">
                {items.map(({ icon: Icon, ...item }) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 py-5 first:pt-0"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                      <Icon className="size-4" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-ink/60">
                        {item.label}
                      </span>
                      <span className="mt-1 block truncate text-[16px] font-medium tracking-[-0.01em] text-ink">
                        {item.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="ml-auto size-4 shrink-0 text-ink/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-[20px] border border-ink/[0.07] bg-white p-6">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-ink/50" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Графік роботи
                  </span>
                </div>
                <dl className="mt-5 space-y-3">
                  {site.hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <dt className="text-[14px] text-graphite/70">{h.days}</dt>
                      <dd className="text-[14px] font-medium tabular-nums text-ink">
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ButtonLink
                href={site.phoneHref}
                size="lg"
                className="mt-8 w-full"
              >
                Записатися на прийом
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
              <p className="mt-4 text-center text-[12px] text-graphite/70">
                Відповідаємо у робочі години протягом кількох хвилин
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
