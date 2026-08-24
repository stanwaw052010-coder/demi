import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/** Заголовки — grotesk Manrope; текст — нейтральний Inter. */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Clinic Stomatology — сучасна стоматологія у Львові та Сокільниках. Турбота про здоровʼя, естетику та комфорт вашої усмішки.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Clinic Stomatology — Стоматологія у Львові",
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "стоматологія Львів",
    "стоматологія Сокільники",
    "лікування зубів Львів",
    "професійна гігієна Львів",
    "імплантація Львів",
    "відбілювання зубів Львів",
    "дитяча стоматологія Львів",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: site.url,
    siteName: site.name,
    title: "Clinic Stomatology — Стоматологія у Львові",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinic Stomatology — Стоматологія у Львові",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
