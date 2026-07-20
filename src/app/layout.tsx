import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kropyvnytska-massage.com"),
  title: `${site.name} — Ендосфера, LPG та антицелюлітний масаж у Бучі`,
  description:
    "Студія Анжели Кропивницької у Бучі: ендосфера-масаж, LPG, антицелюлітний та вакуумний масаж. Корекція фігури, позбавлення від целюліту й набряків. Навчальні курси масажу.",
  keywords:
    "ендосфера масаж, LPG масаж, антицелюлітний масаж, вакуумний масаж, корекція фігури, масаж Буча, курси масажу, целюліт, лімфодренаж",
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — масаж та корекція фігури у Бучі`,
    description:
      "Ендосфера, LPG, антицелюлітний та вакуумний масаж. Позбавляю від целюліту та набряків, зменшую в об'ємі. Курси масажу.",
    type: "website",
    locale: "uk_UA",
    siteName: site.name,
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">{children}</body>
    </html>
  );
}
