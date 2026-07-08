import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayskaya-beauty.space"),
  title: "Rayskaya Beauty Space — Косметологія і естетика обличчя та тіла",
  description:
    "Rayskaya Beauty Space — місце, де ви можете отримати повний спектр косметологічних послуг для відновлення та збереження молодості, краси та здоров'я. Індивідуальний підхід, сучасні методики.",
  keywords:
    "косметологія Харків, естетична медицина, догляд за обличчям, апаратна косметологія, ін'єкційна косметологія, Rayskaya Beauty Space",
  openGraph: {
    title: "Rayskaya Beauty Space — Косметологія і естетика обличчя та тіла",
    description:
      "Індивідуальний підхід — сучасні методики. Записуйтесь на консультацію в Rayskaya Beauty Space.",
    type: "website",
    locale: "uk_UA",
    siteName: "Rayskaya Beauty Space",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-warm text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
