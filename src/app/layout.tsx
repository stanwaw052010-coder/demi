import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBook from "@/components/layout/FloatingBook";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GIN Barbershop — Преміальний барбершоп у Хмельницькому",
    template: "%s · GIN Barbershop",
  },
  description:
    "GIN Barbershop — найпреміальніший барбершоп Хмельницького. Чоловічі стрижки, fade, королівське гоління та догляд за бородою від топ-майстрів. Віскі, кава, PlayStation. Онлайн-запис за хвилину.",
  keywords: [
    "барбершоп Хмельницький",
    "чоловіча стрижка Хмельницький",
    "fade Хмельницький",
    "гоління Хмельницький",
    "борода Хмельницький",
    "GIN Barbershop",
    "барбер Хмельницький",
    "преміум барбершоп",
  ],
  authors: [{ name: "GIN Barbershop" }],
  creator: "GIN Barbershop",
  alternates: { canonical: site.url },
  openGraph: {
    title: "GIN Barbershop — Преміальний барбершоп у Хмельницькому",
    description:
      "Не просто стрижка. Стиль, що говорить за вас. Топ-майстри, преміум-атмосфера, онлайн-запис за хвилину.",
    url: site.url,
    siteName: "GIN Barbershop",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "GIN Barbershop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIN Barbershop — Преміальний барбершоп у Хмельницькому",
    description:
      "Не просто стрижка. Стиль, що говорить за вас. Онлайн-запис за хвилину.",
    images: [
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${site.url}/#business`,
  name: "GIN Barbershop",
  image:
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop",
  url: site.url,
  telephone: site.phone,
  priceRange: "₴₴₴",
  currenciesAccepted: "UAH",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Хмельницький",
    addressCountry: "UA",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
  sameAs: [site.instagram],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "480",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="aurora" aria-hidden />
        <div className="grain" aria-hidden />
        <div className="vignette" aria-hidden />

        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <FloatingBook />
      </body>
    </html>
  );
}
