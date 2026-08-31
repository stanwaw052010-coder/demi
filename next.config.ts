import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: { formats: ["image/avif", "image/webp"] },
  // <ProductImage> reads this directory to decide between a real photograph and
  // the drawn composition. Without this, a serverless function has no /public
  // and the dynamically rendered catalogue would disagree with the statically
  // rendered product pages.
  outputFileTracingIncludes: {
    "/**": ["./public/products/**"],
  },
};

// Turbopack needs loader options to be serialisable, so remark plugins are
// named rather than imported.
const withMDX = createMDX({
  options: { remarkPlugins: [["remark-gfm", {}]] },
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));
