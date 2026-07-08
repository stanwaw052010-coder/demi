import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/400-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Rayskaya Beauty Space — Косметологія і естетика обличчя та тіла",
  description:
    "Rayskaya Beauty Space — повний спектр косметологічних послуг: доглядові процедури, ін'єкційна та апаратна косметологія, лазерна епіляція, масаж Ендосфера. Індивідуальний підхід — сучасні методики.",
  icons: {
    icon: "/favicon.svg",
  },
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
    <html lang="uk">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
