import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  experimental: {
    // Inlines the stylesheet into the HTML — removes a render-blocking
    // round-trip on mobile, where it dominates first paint.
    inlineCss: true,
  },
};

export default nextConfig;
