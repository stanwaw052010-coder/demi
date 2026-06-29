import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "In.Style Salon Krasy — Салон краси у Коростені",
  description:
    "Преміальний салон краси In.Style у Коростені. Волосся, манікюр, брови, макіяж, весільні образи. Запишіться онлайн — вул. Михайла Грушевського, 33. Тел: (98) 950 63 32.",
  keywords:
    "салон краси Коростень, манікюр Коростень, зачіска Коростень, брови Коростень, макіяж Коростень, весільний образ, In Style Salon",
  openGraph: {
    title: "In.Style Salon Krasy — Преміальний салон краси",
    description:
      "Ваш простір для трансформації у Коростені. Записуйтесь онлайн!",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FBF8F5] text-[#1A1A1A]">
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
