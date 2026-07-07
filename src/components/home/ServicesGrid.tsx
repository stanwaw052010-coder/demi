import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";
import { ICON_MAP } from "@/lib/icons";

export function ServicesGrid() {
  return (
    <section className="section-y section-x bg-secondary/50" id="services">
      <div className="container-lux flex flex-col gap-14">
        <SectionHeading
          kicker="Напрями"
          title="Послуги салону"
          description="Від лазерної епіляції до SPA-ритуалів — оберіть напрям, який відповідає вашому запиту."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-white"
                >
                  <PhotoSlot
                    category={service.photoCategory}
                    index={service.photoIndexes[0]}
                    alt={service.title}
                    label={`${service.shortTitle} — фото`}
                    className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <Icon className="h-5 w-5 text-gold-600" strokeWidth={1.25} />
                    <h3 className="font-serif text-xl text-navy-950">{service.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-navy-900">
                      Детальніше
                      <ArrowUpRight className="h-3.5 w-3.5 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">Переглянути всі послуги</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
