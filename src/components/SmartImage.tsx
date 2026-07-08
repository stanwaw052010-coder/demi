"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

/**
 * Фотографія з елегантним фірмовим фолбеком: якщо зображення
 * не завантажиться, замість нього з’явиться м’який зелений градієнт
 * зі знаком бренду — верстка ніколи не «ламається».
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(140deg,#eef3e0_0%,#dce8c2_45%,#c5d89a_100%)] ${className}`}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl italic text-brand-deep/50">
            Rayskaya
          </span>
        </div>
      )}
    </div>
  );
}
