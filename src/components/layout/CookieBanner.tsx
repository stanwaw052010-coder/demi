"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONSENT_EVENT, readConsent, writeConsent } from "./consent";

/**
 * Real consent: nothing analytical is loaded before an explicit yes. There is
 * no measurement script on the page at all until `analytics` is granted, so
 * declining is not a preference we then ignore.
 */
export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setVisible(readConsent() === null);
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") decide(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function decide(withAnalytics: boolean) {
    writeConsent(withAnalytics);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="false"
      aria-labelledby="wy-cookie-title"
      className="fixed inset-x-0 bottom-0 z-50 bg-paper wy-rule wy-noprint"
    >
      <div className="wy-shell py-5 flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
        <div className="max-w-[52ch]">
          <h2 id="wy-cookie-title" className="text-[1.125rem] mb-1">
            {t("title")}
          </h2>
          <p className="text-[var(--text-micro)] text-stone">
            {t("body")}{" "}
            <Link href="/cookiebeleid" className="wy-link-static text-ink">
              {t("policy")}
            </Link>
          </p>

          {expanded ? (
            <fieldset className="mt-4 space-y-3 border-0 p-0">
              <legend className="sr-only">{t("settings")}</legend>
              <label className="flex items-start gap-3 text-[var(--text-micro)]">
                <input type="checkbox" checked disabled className="mt-1" />
                <span>
                  <span className="block text-ink">{t("categoryNecessary")}</span>
                  <span className="text-stone">{t("categoryNecessaryBody")}</span>
                </span>
              </label>
              <label className="flex items-start gap-3 text-[var(--text-micro)]">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-ink">{t("categoryAnalytics")}</span>
                  <span className="text-stone">{t("categoryAnalyticsBody")}</span>
                </span>
              </label>
            </fieldset>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 md:ml-auto md:shrink-0">
          {expanded ? (
            <button type="button" className="wy-btn" onClick={() => decide(analytics)}>
              {t("save")}
            </button>
          ) : (
            <button
              type="button"
              className="wy-btn wy-btn-quiet"
              onClick={() => setExpanded(true)}
            >
              {t("settings")}
            </button>
          )}
          <button type="button" className="wy-btn" onClick={() => decide(false)}>
            {t("necessary")}
          </button>
          <button type="button" className="wy-btn wy-btn-solid" onClick={() => decide(true)}>
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
