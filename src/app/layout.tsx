import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rayskaya Beauty Space — косметологія і естетика обличчя та тіла",
  description:
    "Rayskaya Beauty Space — простір косметології та естетики у Харкові. Ін’єкційна та апаратна косметологія, лазерна епіляція, догляд за обличчям і тілом. Індивідуальний підхід — сучасні методики.",
  openGraph: {
    title: "Rayskaya Beauty Space",
    description:
      "Косметологія і естетика обличчя та тіла. Індивідуальний підхід — сучасні методики.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
