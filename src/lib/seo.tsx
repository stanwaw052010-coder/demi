import type { Product } from "@content/types";
import type { AppLocale } from "@/i18n/routing";
import { COMPANY, SITE_URL } from "./site";
import { cheapestVariant, getRegion } from "./catalog";

type Json = Record<string, unknown>;

export function organisationJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.tradingName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    vatID: COMPANY.vat.replace(/[\s.]/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.shop.street,
      postalCode: COMPANY.shop.postcode,
      addressLocality: COMPANY.shop.city,
      addressCountry: "BE",
    },
    areaServed: ["BE", "NL", "EU"],
  };
}

export function productJsonLd(
  product: Product,
  locale: AppLocale,
  url: string,
): Json {
  const cheapest = cheapestVariant(product);
  const region = product.passport ? getRegion(product.passport.regionId) : undefined;

  const reviews = product.reviews ?? [];
  const aggregate =
    reviews.length > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: (
            reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
          ).toFixed(1),
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.copy.description[locale],
    sku: cheapest.sku,
    url,
    category: product.category,
    brand: { "@type": "Brand", name: COMPANY.tradingName },
    ...(region
      ? { countryOfOrigin: region.province[locale].includes("Japan") ? "JP" : "CN" }
      : {}),
    ...(aggregate ? { aggregateRating: aggregate } : {}),
    ...(reviews.length
      ? {
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            reviewBody: r.body[locale],
          })),
        }
      : {}),
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      price: (variant.price / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: variant.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
    })),
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; url: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    mainEntityOfPage: input.url,
    author: { "@type": "Organization", name: COMPANY.tradingName },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function eventJsonLd(input: {
  name: string;
  description: string;
  start: string;
  durationMinutes: number;
  venue: string;
  address: string;
  price: number;
  url: string;
  seatsLeft: number;
}): Json {
  const end = new Date(new Date(input.start).getTime() + input.durationMinutes * 60000);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: input.start,
    endDate: end.toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: input.venue,
      address: { "@type": "PostalAddress", streetAddress: input.address, addressCountry: "BE" },
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: (input.price / 100).toFixed(2),
      priceCurrency: "EUR",
      url: input.url,
      availability:
        input.seatsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
  };
}

/** Renders a JSON-LD script tag. The payload is always authored, never input. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
