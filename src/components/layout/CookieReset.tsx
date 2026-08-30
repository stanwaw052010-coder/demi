"use client";

import { CONSENT_KEY, CONSENT_EVENT } from "./consent";

export function CookieReset({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="wy-link text-left"
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {
          // Storage can be blocked entirely; the banner then simply reappears.
        }
        window.dispatchEvent(new Event(CONSENT_EVENT));
      }}
    >
      {label}
    </button>
  );
}
