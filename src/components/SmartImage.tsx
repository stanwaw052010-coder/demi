"use client";

import { useState } from "react";

type Props = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

/**
 * Фотографія з ланцюжком фолбеків:
 * 1) основне фото (напр. локальне з /public/images) →
 * 2) запасне стокове (fallbackSrc) →
 * 3) фірмовий зелений градієнт зі знаком бренду.
 * Тож достатньо покласти файл у /public/images — і він
 * автоматично замінить сток; верстка ніколи не «ламається».
 */
export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
}: Props) {
  // 0 — основне фото, 1 — запасне, 2 — градієнт
  const [stage, setStage] = useState(0);
  const current = stage === 0 ? src : stage === 1 ? fallbackSrc : undefined;

  const position = className.split(/\s+/).includes("absolute")
    ? ""
    : "relative";

  return (
    <div
      className={`${position} overflow-hidden bg-[linear-gradient(140deg,#eef3e0_0%,#dce8c2_45%,#c5d89a_100%)] ${className}`}
    >
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={alt}
          loading={loading}
          onError={() =>
            setStage((s) => (s === 0 && fallbackSrc ? 1 : 2))
          }
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl italic text-brand-deep/50">
            Rayskaya
          </span>
        </div>
      )}
    </div>
  );
}
