import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Dog Style — Грумінг-салон для собак у Кам'янці-Подільському",
  description:
    "Dog Style — грумінг-салон для собак у Кам'янці-Подільському. Гігієнічний та комплексний грумінг, модельні стрижки, купання. Дбайливе ставлення до кожного улюбленця.",
  keywords:
    "грумінг Кам'янець-Подільський, стрижка собак, груммер, догляд за собаками, dog style, грумінг салон",
  openGraph: {
    title: "Dog Style — Грумінг-салон для собак",
    description:
      "Дбайливий грумінг для вашого улюбленця у Кам'янці-Подільському.",
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
    <html lang="uk" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
