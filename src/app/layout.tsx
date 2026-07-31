import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
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
    images: ["/images/hero.jpg"],
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
  telephone: site.phone,
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "15:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={manrope.variable}>
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
