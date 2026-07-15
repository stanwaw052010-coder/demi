import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Tag } from "lucide-react";
import { allServices, getServiceBySlug, getRelatedServices } from "@/data/services";
import { Photo } from "@/components/ui/Photo";
import { BookButton } from "@/components/booking/BookButton";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.name} — ${service.categoryTitle}`;
  const description = `${service.name} у SPA-салоні Спабель: ${service.price}${
    service.duration ? `, тривалість ${service.duration}` : ""
  }. ${service.categoryDescription}`;

  return {
    title,
    description,
    openGraph: { title: `${title} | ${siteConfig.name}`, description },
    alternates: { canonical: `${siteConfig.url}/services/${service.slug}` },
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

  const related = getRelatedServices(service);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.categoryDescription,
    provider: {
      "@type": "BeautySalon",
      name: siteConfig.fullName,
    },
    areaServed: "Запоріжжя",
    offers: {
      "@type": "Offer",
      price: service.priceValue || undefined,
      priceCurrency: "UAH",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-navy-950 pb-16 pt-36 sm:pb-20 sm:pt-40">
        <div className="container-spa">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70">Головна</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services" className="hover:text-white/70">Всі послуги</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/services?category=${service.categorySlug}`} className="hover:text-white/70">
              {service.categoryTitle}
            </Link>
          </nav>
          <span className="mt-6 block text-xs font-medium uppercase tracking-[0.35em] text-gold-400">
            {service.subcategoryTitle}
          </span>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl text-white sm:text-5xl">
            {service.name}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-spa grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
              <Photo
                src={`/images/services/${service.categorySlug}.jpg`}
                alt={service.name}
                label={service.categoryTitle}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                priority
              />
            </div>

            <p className="mt-8 text-base leading-relaxed text-navy-900/70">
              {service.categoryDescription}
            </p>

            {related.length > 0 && (
              <div className="mt-14">
                <h2 className="font-serif text-2xl text-navy-900">
                  Інші послуги категорії «{service.categoryTitle}»
                </h2>
                <div className="mt-6 divide-y divide-navy-900/8 border-y border-navy-900/8">
                  {related.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="text-[15px] text-navy-900 transition-colors group-hover:text-gold-600">
                        {s.name}
                      </span>
                      <span className="whitespace-nowrap font-serif text-base text-navy-900/70">
                        {s.price}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-navy-900/10 p-7">
              <div className="flex items-center gap-3 border-b border-navy-900/8 pb-5">
                <Tag className="h-4 w-4 text-gold-500" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-navy-900/40">Вартість</p>
                  <p className="font-serif text-2xl text-navy-900">{service.price}</p>
                </div>
              </div>
              {service.duration && (
                <div className="flex items-center gap-3 border-b border-navy-900/8 py-5">
                  <Clock className="h-4 w-4 text-gold-500" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-navy-900/40">Тривалість</p>
                    <p className="text-navy-900">{service.duration}</p>
                  </div>
                </div>
              )}
              {service.note && (
                <p className="pt-5 text-sm text-navy-900/50">{service.note}</p>
              )}
              <BookButton
                variant="gold"
                size="lg"
                serviceName={service.name}
                className="mt-6 w-full"
              >
                Записатися
              </BookButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
