import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The experience was briefly served from /studio before it took the root.
      { source: "/studio", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
