import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { Toaster } from "@/components/ui/sonner";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://sprinter.org.ua";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Спринтер — Запчастини для Mercedes Sprinter, Vito, VW Crafter | Харків",
    template: "%s | Спринтер",
  },
  description:
    "Інтернет-магазин запчастин для Mercedes Sprinter, Vito, Volkswagen Crafter та LT. Понад 8 000 позицій в наявності. Доставка по Україні 1–2 дні. Харків: Просп. Героїв Харкова, 210.",
  keywords:
    "запчастини Mercedes Sprinter, запчастини Vito, запчастини VW Crafter, запчастини для мерседес спрінтер, автозапчастини Харків, запчастини для комерційного транспорту",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Спринтер — Запчастини для комерційного транспорту",
    description: "Понад 8 000 позицій запчастин для Mercedes та VW. Швидка доставка по Україні.",
    url: siteUrl,
    siteName: "Спринтер",
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Спринтер — Запчастини для комерційного транспорту",
    description: "Понад 8 000 позицій запчастин для Mercedes та VW. Швидка доставка по Україні.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        <OrganizationJsonLd siteUrl={siteUrl} />
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
