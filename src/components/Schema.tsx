import { site } from "@/lib/site";
import { services } from "@/data/services";

/**
 * JSON-LD для Google: тип Dentist (підтип LocalBusiness).
 * Вказуємо тільки перевірені дані — без годин роботи, цін і рейтингів,
 * яких клініка не надавала.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.name,
    description: `${site.tagline}. Усі види стоматологічних послуг у Львові та Сокільниках.`,
    url: site.url,
    telephone: site.phone.label.replace(/\s/g, ""),
    image: `${site.url}/images/logo.png`,
    logo: `${site.url}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    sameAs: [site.instagram.clinic, site.instagram.massage],
    hasMap: site.address.maps,
    areaServed: "Львів",
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
