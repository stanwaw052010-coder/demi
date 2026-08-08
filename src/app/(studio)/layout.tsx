import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./studio.css";
import { STUDIO } from "@/lib/studio/content";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--studio-font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--studio-font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${STUDIO.name} — Nail Studio / Creative Beauty`,
  description:
    "A nail studio in Berlin working in structure, restraint and finish. Manicure, pedicure, nail art, gel and signature care — by appointment.",
  openGraph: {
    title: `${STUDIO.name} — Beauty in every detail`,
    description:
      "Manicure, pedicure, nail art and signature care. A studio built on restraint and finish.",
    type: "website",
    locale: "en_GB",
  },
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="en" className={`studio ${display.variable} ${body.variable}`}>
      {/* Without scripting the opening sequence must never block the page. */}
      <noscript>
        <style>{`.studio-preloader{display:none!important}`}</style>
      </noscript>
      {children}
    </div>
  );
}
