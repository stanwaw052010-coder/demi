import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

/* Accent voice — a handful of words per screen, italic only */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dental-nataly.com"),
  title: {
    default: "Dental Clinic Nataly — сучасна стоматологія у Тернополі",
    template: "%s — Dental Clinic Nataly",
  },
  description:
    "Стоматологія Наталії Жилан у Тернополі: лікування під мікроскопом, художня реставрація, імплантація, професійне відбілювання та гігієна. Понад 20 років досвіду.",
  keywords: [
    "стоматологія Тернопіль",
    "лікування під мікроскопом",
    "художня реставрація",
    "відбілювання зубів",
    "імплантація",
    "дитяча стоматологія",
    "Наталія Жилан",
  ],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    title: "Dental Clinic Nataly — сучасна стоматологія у Тернополі",
    description:
      "Створюємо здорові та красиві усмішки вже понад 20 років. Лікування під мікроскопом, реставрація, імплантація, відбілювання.",
    siteName: site.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dental Clinic Nataly Zhylan — вул. Коновальця 3, Тернопіль, +380 97 900 12 15",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Clinic Nataly — сучасна стоматологія у Тернополі",
    description:
      "Створюємо здорові та красиві усмішки вже понад 20 років. Лікування під мікроскопом, реставрація, імплантація, відбілювання.",
    images: ["/og.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: site.name,
  description:
    "Сучасна стоматологія у Тернополі: лікування під мікроскопом, художня реставрація, імплантація, відбілювання.",
  image: "/images/clinic.jpg",
  telephone: [site.phone, site.phone2],
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Коновальця, 3",
    addressLocality: "Тернопіль",
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  sameAs: [site.instagram],
  founder: { "@type": "Person", name: site.doctor, jobTitle: "Лікар-стоматолог" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="bg-white text-ink antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
