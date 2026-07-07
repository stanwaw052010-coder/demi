import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";

import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PriceRows } from "@/components/shared/PriceRows";
import { ServiceJsonLd } from "@/components/shared/JsonLd";
import { Button } from "@/components/ui/button";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { PRICE_CATEGORIES } from "@/data/pricing";
import { ICON_MAP } from "@/lib/icons";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} — ${SITE.name}`,
      description: service.shortDescription,
      images: [{ url: `/images/${service.photoCategory}/${service.photoIndexes[0]}.jpg` }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = ICON_MAP[service.icon];
  const relatedPrices = PRICE_CATEGORIES.filter((c) => c.serviceSlug === service.slug);
  const gallery = service.photoIndexes;

  return (
    <>
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url={`${SITE.url}/services/${service.slug}`}
      />

      <section className="relative flex min-h-[48vh] items-end overflow-hidden bg-navy-950">
        <PhotoSlot
          category={service.photoCategory}
          index={service.photoIndexes[0]}
          alt={service.title}
          label={`${service.shortTitle} — фото`}
          className="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
        <div className="container-lux section-x relative z-10 flex flex-col gap-4 pb-16 pt-32">
          <nav className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/60">
            <Link href="/" className="hover:text-white">
              Головна
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services" className="hover:text-white">
              Всі послуги
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold-400">{service.shortTitle}</span>
          </nav>
          <Icon className="h-7 w-7 text-gold-400" strokeWidth={1.25} />
          <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="section-y section-x bg-white">
        <div className="container-lux grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal className="flex flex-col gap-6">
            {service.description.map((paragraph) => (
              <p key={paragraph} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-navy-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button variant="gold" size="lg" asChild className="mt-4 w-fit">
              <Link href="/#booking">Записатися на процедуру</Link>
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            {gallery.map((idx, i) => (
              <PhotoSlot
                key={idx}
                category={service.photoCategory}
                index={idx}
                alt={`${service.title} — фото ${i + 1}`}
                label={`${service.shortTitle} — фото ${i + 1}`}
                className={i === 0 && gallery.length > 1 ? "col-span-2 aspect-[16/9]" : "aspect-square"}
              />
            ))}
          </Reveal>
        </div>
      </section>

      {relatedPrices.length > 0 ? (
        <section className="section-y section-x bg-secondary/50">
          <div className="container-lux flex flex-col gap-10">
            <SectionHeading
              kicker="Прайс"
              title="Ціни на послуги напряму"
              align="left"
            />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {relatedPrices.map((category) => (
                <div key={category.id} className="border border-border bg-white p-6 sm:p-8">
                  <h3 className="mb-2 font-serif text-lg text-navy-950">{category.title}</h3>
                  <div className="flex flex-col gap-6">
                    {category.groups.map((group) => (
                      <div key={group.title ?? category.id}>
                        {group.title ? (
                          <h4 className="mb-1 text-xs uppercase tracking-wider text-gold-600">
                            {group.title}
                          </h4>
                        ) : null}
                        <PriceRows items={group.items} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Повний прайс з пошуком —{" "}
              <Link href="/#price" className="text-navy-900 underline underline-offset-4">
                на головній сторінці
              </Link>
              .
            </p>
          </div>
        </section>
      ) : null}

      <section className="section-x py-16 sm:py-20">
        <div className="container-lux flex flex-col items-center gap-4 border border-border bg-navy-950 p-10 text-center sm:p-14">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">
            Готові записатися на «{service.title}»?
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Залиште заявку — адміністратор підбере зручний час візиту.
          </p>
          <Button variant="gold" size="lg" asChild className="mt-2">
            <Link href="/#booking">Записатися</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
