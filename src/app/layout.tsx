import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELEVATE — Private Tennis Club & Academy",
  description:
    "Above the game. A private tennis club where precision meets poetry — twelve courts, world-class coaching, and a century of quiet excellence.",
  keywords: [
    "tennis club",
    "private tennis academy",
    "luxury sport",
    "ELEVATE",
  ],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "ELEVATE — Private Tennis Club & Academy",
    description:
      "Above the game. Twelve courts. One standard: perfection in motion.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
