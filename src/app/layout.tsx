import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nata-Sushi — Суші-бар у Перещепиному",
  description:
    "Nata-Sushi — суші-бар у Перещепиному. Роли, сети, гарячі удони та напої. Замовлення телефоном або в Instagram.",
  keywords:
    "суші Перещепине, роли Перещепине, суші-бар Nata-Sushi, замовити суші, удон Перещепине",
  openGraph: {
    title: "Nata-Sushi — Суші-бар у Перещепиному",
    description: "Роли, сети, гарячі удони та напої. Замовлення телефоном або в Instagram.",
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
    <html lang="uk" className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-charcoal text-cream">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
