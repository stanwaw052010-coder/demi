import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Воскова депіляція в Києві — м. Політехнічний інститут",
  description:
    "Приватна студія воскової депіляції в Києві біля метро «Політехнічний інститут». Пахви, руки, ноги, глибоке бікіні. Сертифікований майстер, стерильні матеріали, запис в Instagram.",
  openGraph: {
    title: "Воскова депіляція в Києві",
    description:
      "Пахви, руки, ноги, глибоке бікіні. Сертифікований майстер, приватний кабінет біля м. Політехнічний інститут.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function WaxingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
