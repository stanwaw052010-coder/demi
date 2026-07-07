import { SITE } from "@/data/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SITE.legalName,
    image: `${SITE.url}/images/spa/1.jpg`,
    url: SITE.url,
    telephone: SITE.phoneHref,
    email: SITE.email,
    priceRange: "₴₴₴",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Запоріжжя",
      addressCountry: "UA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.telegram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url,
    provider: {
      "@type": "BeautySalon",
      name: SITE.legalName,
      url: SITE.url,
      telephone: SITE.phoneHref,
    },
    areaServed: {
      "@type": "City",
      name: "Запоріжжя",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
