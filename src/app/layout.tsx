import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELLA — Весільний салон у Тернополі",
  description:
    "VELLA — весільний салон у Тернополі: вечірні та весільні сукні, індивідуальний підбір образу, примірка. вул. Академіка Брюкнера, 6, Тернопіль.",
  keywords:
    "весільний салон Тернопіль, вечірні сукні Тернопіль, весільні сукні, оренда суконь, салон суконь Тернопіль",
  openGraph: {
    title: "VELLA — Весільний салон у Тернополі",
    description:
      "Вечірні та весільні сукні, індивідуальний підбір образу та примірка.",
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
    <html lang="uk" className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        {children}
      </body>
    </html>
  );
}
