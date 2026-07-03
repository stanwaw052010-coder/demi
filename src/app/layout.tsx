import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Катерина Матюшко — Навчання нарощуванню волосся",
  description:
    "Навчаю нарощуванню волосся з нуля. Допомагаю вийти на стабільний дохід у beauty-бізнесі. 20+ років досвіду, власний салон краси BEAUTY FORMULA.",
  keywords:
    "навчання нарощуванню волосся, курс нарощування волосся, beauty бізнес навчання, Катерина Матюшко, BEAUTY FORMULA",
  openGraph: {
    title: "Катерина Матюшко — Навчання нарощуванню волосся",
    description:
      "Трансформую жінок, вчу професії, що змінює життя. 20+ років досвіду в beauty-індустрії.",
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
    <html lang="uk" className={`${manrope.variable} ${unbounded.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-concrete text-cream">
        {children}
      </body>
    </html>
  );
}
