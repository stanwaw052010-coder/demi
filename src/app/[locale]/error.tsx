"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(5rem, 16vh, 10rem)" }}>
      <div className="mx-auto text-center" style={{ maxWidth: "40ch" }}>
        <h1 className="text-[2rem]">{t("title")}</h1>
        <p className="wy-prose mt-4 mx-auto">{t("body")}</p>
        <button type="button" className="wy-btn mt-8" onClick={reset}>
          {t("retry")}
        </button>
      </div>
    </div>
  );
}
