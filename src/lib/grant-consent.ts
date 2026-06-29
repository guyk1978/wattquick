/** Fired after the user grants cookie consent (same tab). */
export const CONSENT_GRANTED_EVENT = "wq-consent-granted";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtagShim(): void {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

/** Grant analytics + advertising consent (Google Consent Mode v2). */
export function grantAllTrackingConsent(): void {
  if (typeof window === "undefined") return;

  ensureGtagShim();
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  window.dispatchEvent(new CustomEvent(CONSENT_GRANTED_EVENT));
}
