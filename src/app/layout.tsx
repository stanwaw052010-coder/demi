import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Наталія Пархуц | Манікюр та Педикюр — Бурштин",
  description:
    "Студія манікюру та педикюру Наталії Пархуц у Бурштині (Юнашків). Гігієнічний манікюр, покриття гель-лаком, нарощення, педикюр. Запис за телефоном 098 972 39 43.",
  keywords:
    "манікюр Бурштин, педикюр Бурштин, нарощення нігтів Бурштин, гель лак Бурштин, манікюр Юнашків, студія манікюру",
  openGraph: {
    title: "Наталія Пархуц — Манікюр та Педикюр у Бурштині",
    description:
      "Гігієнічний манікюр, покриття гель-лаком, нарощення та педикюр. Бурштин, Юнашків.",
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
    <html
      lang="uk"
      className={`${inter.variable} ${playfair.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-foreground">
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
