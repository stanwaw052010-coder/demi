"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export interface SessionOption {
  id: string;
  label: string;
  seatsLeft: number;
}

/**
 * A real booking form, which is the point: the workshops that exist in Belgium
 * are all booked by email somewhere else.
 */
export function BookingForm({ sessions }: { sessions: SessionOption[] }) {
  const t = useTranslations("tastings");
  const checkout = useTranslations("checkout");
  const actions = useTranslations("actions");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "full">("idle");
  const [sessionId, setSessionId] = useState(sessions.find((s) => s.seatsLeft > 0)?.id ?? "");

  const selected = sessions.find((s) => s.id === sessionId);

  if (status === "done") {
    return (
      <p className="wy-prose" role="status">
        {t("submitted")}
      </p>
    );
  }

  return (
    <form
      className="max-w-[34rem]"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setStatus("sending");
        try {
          const response = await fetch("/api/tastings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: data.get("sessionId"),
              name: data.get("name"),
              email: data.get("email"),
              seats: Number(data.get("seats")),
              notes: data.get("notes"),
            }),
          });
          if (response.status === 409) {
            setStatus("full");
            return;
          }
          setStatus(response.ok ? "done" : "error");
        } catch {
          setStatus("error");
        }
      }}
    >
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        <div className="sm:col-span-2">
          <label htmlFor="wy-session" className="wy-label block">
            {t("chooseSession")}
          </label>
          <select
            id="wy-session"
            name="sessionId"
            required
            value={sessionId}
            onChange={(event) => setSessionId(event.target.value)}
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.id} disabled={session.seatsLeft === 0}>
                {session.label}
              </option>
            ))}
          </select>
          {selected && selected.seatsLeft === 0 ? (
            <p className="wy-label mt-1 text-amber-ink">{t("full")}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="wy-name" className="wy-label block">
            {checkout("firstName")}
          </label>
          <input id="wy-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="wy-email" className="wy-label block">
            {checkout("email")}
          </label>
          <input id="wy-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="wy-seats" className="wy-label block">
            {t("seatsWanted")}
          </label>
          <input
            id="wy-seats"
            name="seats"
            type="number"
            min={1}
            max={Math.max(1, Math.min(6, selected?.seatsLeft ?? 1))}
            defaultValue={1}
            required
            className="tnum"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="wy-notes" className="wy-label block">
            {t("dietary")}
          </label>
          <textarea id="wy-notes" name="notes" rows={3} />
        </div>
      </div>

      {status === "error" || status === "full" ? (
        <p role="alert" className="text-micro text-amber-ink mt-4">
          {status === "full" ? t("full") : checkout("errorBody")}
        </p>
      ) : null}

      <button
        type="submit"
        className="wy-btn wy-btn-solid mt-8"
        disabled={status === "sending" || selected?.seatsLeft === 0}
      >
        {actions("reserveSeat")}
      </button>
    </form>
  );
}
