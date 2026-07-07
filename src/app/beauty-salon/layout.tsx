import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Makhovska Beauty House — Салон краси у Мукачеві",
  description:
    "Makhovska Beauty House — манікюр, педикюр, нарощування нігтів та доглядові процедури у Мукачеві. Запис за телефоном +380 (63) 806-41-02 або в Instagram.",
  openGraph: {
    title: "Makhovska Beauty House — Салон краси у Мукачеві",
    description:
      "Манікюр, педикюр та нейл-дизайн у Мукачеві. Індивідуальний підхід, стерильні інструменти, преміальні матеріали.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function BeautySalonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${playfair.variable} bg-[#0a0908] text-[#ece6da]`}>
      {children}
    </div>
  );
}
