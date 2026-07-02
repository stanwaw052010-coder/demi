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
  title: "FORMA3D — Дизайнерський декор на 3D-друку",
  description:
    "FORMA3D — студія 3D-друку дизайнерського декору: вази, скульптури та предмети інтер'єру. Індивідуальні кольори та розміри, доставка по Україні.",
  keywords:
    "3д друк, 3d друк ваз, дизайнерські вази, декор 3d друк, замовити 3d друк, вироби з пластику 3d принтер",
  openGraph: {
    title: "FORMA3D — Дизайнерський декор на 3D-друку",
    description:
      "Вази та скульптурний декор, надруковані на 3D-принтері. Індивідуальні кольори та розміри.",
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
      <body className="min-h-full flex flex-col bg-sand text-ink">
        {children}
      </body>
    </html>
  );
}
