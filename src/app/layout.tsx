import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Спринтер — Запчастини для Mercedes Sprinter, Vito, VW Crafter | Харків",
  description:
    "Інтернет-магазин запчастин для Mercedes Sprinter, Vito, Volkswagen Crafter та LT. Понад 8 000 позицій в наявності. Доставка по Україні 1–2 дні. Харків: Просп. Героїв Харкова, 210.",
  keywords:
    "запчастини Mercedes Sprinter, запчастини Vito, запчастини VW Crafter, запчастини для мерседес спрінтер, автозапчастини Харків, запчастини для комерційного транспорту",
  openGraph: {
    title: "Спринтер — Запчастини для комерційного транспорту",
    description:
      "Понад 8 000 позицій запчастин для Mercedes та VW. Швидка доставка по Україні.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
