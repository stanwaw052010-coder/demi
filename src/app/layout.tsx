import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Спринтер — Автозапчастини в Харкові | Пошук за кодом",
  description:
    "Інтернет-магазин автозапчастин у Харкові. Понад 100 000 позицій у наявності. Пошук за артикулом, швидка доставка по Україні. Телефон: +38 (067) 254-62-66",
  keywords:
    "автозапчастини Харків, запчастини для іномарок, купити автозапчастини, пошук за кодом, кузовні запчастини, моторна олива, акумулятори",
  openGraph: {
    title: "Спринтер — Автозапчастини в Харкові",
    description:
      "Понад 100 000 позицій автозапчастин. Швидка доставка по Україні.",
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
        {children}
      </body>
    </html>
  );
}
