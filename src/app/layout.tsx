import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMÉA — Beauty Atelier",
  description:
    "An atelier of quiet luxury in Kyiv. Hair couture, skin rituals and colour alchemy — composed like couture, finished like light.",
  keywords: ["beauty atelier", "luxury salon", "hair couture", "Kyiv", "LUMÉA"],
  openGraph: {
    title: "LUMÉA — Beauty Atelier",
    description: "Where light learns to linger. A concept atelier of quiet luxury.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${interTight.variable} ${plexMono.variable}`}
    >
      <body data-theme="dark" className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
