import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

const title = "ProfiTime — подологія, манікюр і педикюр у Вишгороді";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "подолог Вишгород",
    "подологія Вишгород",
    "манікюр Вишгород",
    "педикюр Вишгород",
    "апаратний педикюр",
    "врослий ніготь",
    "тріщини на п'ятах",
    "ProfiTime",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  category: "beauty",
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1b44" },
  ],
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${site.url}/#studio`,
  name: site.name,
  alternateName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phone.raw,
  priceRange: "₴₴",
  currenciesAccepted: "UAH",
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "UA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`,
  sameAs: [site.instagram.url],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: site.booking.url,
      inLanguage: "uk-UA",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Запис на процедуру" },
  },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Подологія" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Апаратний педикюр" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Манікюр і покриття" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Корекція врослого нігтя" } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-90 focus:rounded-full focus:bg-brand-900 focus:px-6 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Перейти до вмісту
        </a>

        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
