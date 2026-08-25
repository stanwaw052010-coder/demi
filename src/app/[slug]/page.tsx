import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingArticle } from "@/components/landing/LandingArticle";
import { getLandingPage, landingPages, landingUrl } from "@/lib/landing";
import { site } from "@/lib/site";

/** Сторінки статичні й відомі наперед — усе інше має віддавати 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  const url = landingUrl(page.slug);

  return {
    // absolute — щоб до заголовка не дописувався шаблон із layout:
    // назва студії вже стоїть у кінці кожного title.
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "article",
      locale: site.locale,
      url,
      siteName: site.name,
      title: page.title,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function LandingRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const url = landingUrl(page.slug);

  /** Хлібні крихти — Google показує їх у видачі замість голого URL. */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: site.url },
      { "@type": "ListItem", position: 2, name: page.short, item: url },
    ],
  };

  /**
   * Послуга з прив'язкою до картки студії (`@id` з layout).
   * Так Google розуміє, що сторінка описує саме нашу послугу
   * в Вишгороді, а не абстрактну процедуру.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: page.serviceName,
    description: page.description,
    url,
    serviceType: page.serviceName,
    provider: { "@id": `${site.url}/#studio` },
    areaServed: [
      { "@type": "City", name: site.address.city },
      { "@type": "AdministrativeArea", name: "Вишгородський район" },
    ],
    offers: page.priceGroups.flatMap((group) =>
      group.rows.map((row) => ({
        "@type": "Offer",
        name: row.note ? `${row.name} (${row.note})` : row.name,
        priceCurrency: "UAH",
        // ціни в прайсі бувають діапазонами («1500–2000 ₴») —
        // тому передаємо рядок як специфікацію, а не як число
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "UAH",
          price: Array.isArray(row.price) ? row.price.join(" / ") : row.price,
        },
        availability: "https://schema.org/InStock",
      })),
    ),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <LandingArticle page={page} />

      {[breadcrumbJsonLd, serviceJsonLd, faqJsonLd].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
