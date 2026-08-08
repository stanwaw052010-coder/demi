import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async redirects() {
    return [
      // The studio experience moved from /studio to the site root; the parts
      // store home it replaced now lives at /shop.
      { source: "/studio", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
