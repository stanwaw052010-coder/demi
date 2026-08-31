"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * The tea house is not open yet, so the tastings page collects the only thing
 * it honestly can: who wants to know when the first date is. It posts to the
 * same route as the letter but on its own list, so nobody ends up subscribed
 * to something they did not ask for.
 */
export function WaitingList() {
  const t = useTranslations("newsletter");
  const tastings = useTranslations("tastings");
  const actions = useTranslations("actions");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  if (status === "done") {
    return (
      <p className="wy-prose mt-8 max-w-[34rem]" role="status">
        {tastings("waitlistDone")}
      </p>
    );
  }

  return (
    <form
      className="mt-8 max-w-[30rem]"
      onSubmit={async (event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        setStatus("sending");
        try {
          const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, list: "tastings" }),
          });
          setStatus(response.ok ? "done" : "error");
        } catch {
          setStatus("error");
        }
      }}
    >
      <label htmlFor="wy-waitlist-email" className="wy-label block">
        {t("emailLabel")}
      </label>
      <div className="flex items-end gap-4">
        <input
          id="wy-waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("placeholder")}
          className="flex-1"
        />
        <button type="submit" className="wy-btn" disabled={status === "sending"}>
          {actions("joinWaitlist")}
        </button>
      </div>
      <p className="wy-label mt-3">{tastings("waitlistConsent")}</p>
      {status === "error" ? (
        <p className="wy-label mt-3 text-amber-ink" role="alert">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
