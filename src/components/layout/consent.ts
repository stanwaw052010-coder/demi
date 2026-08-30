export const CONSENT_KEY = "wy-consent";
export const CONSENT_EVENT = "wy-consent-change";

export type Consent = { necessary: true; analytics: boolean; at: string };

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): void {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ necessary: true, analytics, at: new Date().toISOString() }),
    );
  } catch {
    // Nothing to do: without storage we ask again next visit.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
