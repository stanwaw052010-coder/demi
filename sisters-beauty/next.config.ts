import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** У репозиторії лежить ще один lockfile рівнем вище — фіксуємо корінь трасування. */
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
