import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

const description =
  "SISTER'S Beauty Studio — масаж, обгортання AROSHA, апаратні процедури, нарощення вій і воскова епіляція у Чернівцях, вул. Головна, 283 Б. Запис за телефоном або в Instagram Direct.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Масаж у Чернівцях — SISTER'S Beauty Studio | вул. Головна, 283 Б",
    template: "%s | SISTER'S Beauty Studio",
  },
  description,
  keywords: [
    "масаж Чернівці",
    "антицелюлітне обгортання Чернівці",
    "масаж гарячими каменями",
    "масаж для вагітних Чернівці",
    "нарощення вій Чернівці",
    "воскова епіляція Чернівці",
    "вакуумно-роликовий масаж Чернівці",
    "AROSHA обгортання",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: site.url,
    siteName: site.name,
    title: "Масаж у Чернівцях — SISTER'S Beauty Studio",
    description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "SISTER'S Beauty Studio — студія масажу в Чернівцях",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Масаж у Чернівцях — SISTER'S Beauty Studio",
    description,
    images: ["/images/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16100C",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.name,
  description,
  url: site.url,
  image: `${site.url}/images/og-cover.jpg`,
  telephone: site.masters.map((master) => master.phone),
  priceRange: "₴₴",
  currenciesAccepted: "UAH",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: 48.2621, longitude: 25.9358 },
  sameAs: [site.instagram.url],
  areaServed: { "@type": "City", name: "Чернівці" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  makesOffer: [
    "Ручний масаж",
    "Масаж гарячими камінцями",
    "Обгортання AROSHA",
    "Вакуумно-роликовий масаж",
    "Гіпсування тіла BODY CODE",
    "Масаж обличчя",
    "Вогняний масаж FIREMIX",
    "Масаж для вагітних",
    "Нарощення вій",
    "Воскова епіляція",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="label-spaced sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3 focus:text-espresso"
        >
          До основного вмісту
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
