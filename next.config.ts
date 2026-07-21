import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async rewrites() {
    return {
      // Serve the CROSS Tennis Club landing page at the site root.
      // `beforeFiles` runs before route resolution, so it overrides the
      // default app-router homepage and serves the static HTML from /public.
      beforeFiles: [
        { source: "/", destination: "/cross-tennis-club.html" },
      ],
    };
  },
};

export default nextConfig;
