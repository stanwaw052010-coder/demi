import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Головна сторінка — статичний лендінг салону краси з public/drahan-alina/.
  // beforeFiles потрібен, щоб перезапис спрацював раніше за роутинг app/.
  // Стилі та скрипт підключені відносними шляхами (щоб index.html відкривався
  // і напряму з файлової системи), тому їх теж перенаправляємо з кореня.
  // Інтернет-магазин запчастин лишається доступним за адресою /sprinter.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/drahan-alina/index.html" },
        { source: "/styles.css", destination: "/drahan-alina/styles.css" },
        { source: "/script.js", destination: "/drahan-alina/script.js" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
