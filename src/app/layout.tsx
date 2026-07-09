import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Rayskaya Beauty Space — Косметологія в Харкові",
  description:
    "Rayskaya Beauty Space — косметологія і естетика обличчя та тіла в Харкові: доглядові процедури, ін'єкційна та апаратна косметологія, лазерна епіляція, масаж Ендосфера. Записатися: +380 63 262 7012",
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
