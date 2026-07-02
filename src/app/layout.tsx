import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMELI — Handcrafted amulets & talismans",
  description:
    "AMELI — унікальні рунічні обереги та кулони ручної роботи з дерева, епоксидної смоли та мідної поталі. Створено в Україні. Shipping across Europe.",
  keywords:
    "рунічні обереги, амулети ручної роботи, талісмани, кулони з рунами, epoxy resin jewelry, handcrafted amulets, AMELI",
  openGraph: {
    title: "AMELI — Handcrafted amulets & talismans",
    description:
      "Унікальні прикраси з особливою атмосферою. Створено в Україні. Shipping across Europe.",
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
    <html lang="uk" className={`${inter.variable} ${cinzel.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-void text-parchment">
        {children}
      </body>
    </html>
  );
}
