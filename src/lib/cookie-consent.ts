export const COOKIE_CONSENT_KEY = "wq_cookie_consent";

export type CookieConsentStatus = "granted" | "denied";

export function readCookieConsent(): CookieConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw === "granted" || raw === "denied") return raw;
    return null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(status: CookieConsentStatus): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, status);
  } catch {
    // ignore quota / private mode
  }
}

export function hasConsentGranted(): boolean {
  return readCookieConsent() === "granted";
}
