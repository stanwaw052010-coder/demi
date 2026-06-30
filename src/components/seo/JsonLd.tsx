export function OrganizationJsonLd({ siteUrl }: { siteUrl: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "Спринтер",
    url: siteUrl,
    telephone: "+380672546266",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Просп. Героїв Харкова, 210",
      addressLocality: "Харків",
      addressCountry: "UA",
    },
    sameAs: [],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  sku,
  price,
  url,
  inStock,
}: {
  name: string;
  description: string;
  image: string;
  sku: string;
  price: number;
  url: string;
  inStock: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "UAH",
      price,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
