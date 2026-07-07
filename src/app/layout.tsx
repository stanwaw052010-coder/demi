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
  title: "AK Nails — Студія манікюру та педикюру в Харкові",
  description:
    "AK Nails — студія манікюру та педикюру у Харкові. Апаратний манікюр, покриття гель-лак, нарощування нігтів, дизайн. Стерильні інструменти, преміум матеріали. Запис в Instagram.",
  keywords:
    "манікюр Харків, педикюр Харків, нарощування нігтів Харків, гель лак Харків, студія манікюру Харків, AK Nails",
  openGraph: {
    title: "AK Nails — Студія манікюру та педикюру в Харкові",
    description:
      "Апаратний манікюр, педикюр, нарощування та дизайн нігтів. Запис онлайн через Instagram.",
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
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
