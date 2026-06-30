import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fialka Beauty Bar — студія краси у Житомирі | вул. Покровська, 57б",
  description:
    "Студія краси Fialka Beauty Bar у Житомирі. Манікюр, педикюр, брови, вії. Стерильність, досвідчені майстри, затишна атмосфера. Вулиця Покровська, 57б. Тел: +380 97 675 72 27",
  keywords:
    "студія краси Житомир, манікюр Житомир, педикюр Житомир, нарощування вій Житомир, брови Житомир, Fialka Beauty Bar, nail bar Житомир",
  openGraph: {
    title: "Fialka Beauty Bar — студія краси з фіолетовим настроєм",
    description:
      "Манікюр, педикюр, брови, вії у Житомирі. Запишись зараз: +380 97 675 72 27",
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
    <html
      lang="uk"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
