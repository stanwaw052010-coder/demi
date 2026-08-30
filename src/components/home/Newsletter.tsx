"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const home = useTranslations("home");
  const actions = useTranslations("actions");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  return (
    <section aria-labelledby="wy-brief" className="wy-shell wy-section wy-rule">
      <div className="wy-grid gap-y-8">
        <div className="wy-margin">
          <h2 id="wy-brief">{home("newsletterTitle")}</h2>
        </div>
        <div className="wy-main">
          <p className="wy-lead text-stone">{home("newsletterLede")}</p>

          {status === "done" ? (
            <p className="wy-prose mt-8" role="status">
              {t("success")}
            </p>
          ) : (
            <form
              className="mt-8 max-w-[30rem]"
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const email = new FormData(form).get("email");
                setStatus("sending");
                try {
                  const response = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  setStatus(response.ok ? "done" : "error");
                } catch {
                  setStatus("error");
                }
              }}
            >
              <label htmlFor="wy-brief-email" className="wy-label block">
                {t("emailLabel")}
              </label>
              <div className="flex items-end gap-4">
                <input
                  id="wy-brief-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t("placeholder")}
                  className="flex-1"
                />
                <button type="submit" className="wy-btn" disabled={status === "sending"}>
                  {status === "sending" ? actions("close") : actions("subscribe")}
                </button>
              </div>
              <label className="flex items-start gap-3 mt-4 text-[var(--text-micro)] text-stone">
                <input type="checkbox" required className="mt-1" />
                <span>{t("consent")}</span>
              </label>
              {status === "error" ? (
                <p role="alert" className="text-[var(--text-micro)] text-amber-ink mt-3">
                  {t("error")}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
