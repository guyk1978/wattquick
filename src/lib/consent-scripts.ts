/**
 * Consent-gated third-party scripts.
 * Add new loaders to CONSENT_SCRIPT_LOADERS — each runs only after the user accepts.
 *
 * Configure via Cloudflare Pages environment variables:
 * - NEXT_PUBLIC_GA_ID       — Google Analytics measurement ID (e.g. G-XXXXXXXX)
 * - NEXT_PUBLIC_ADSENSE_ID  — Google AdSense publisher ID (future)
 *
 * AdSense is loaded separately via `<DeferredAdSense />` (`lazyOnload`) so it
 * does not compete with first paint. GA remains here (consent-gated).
 */

import { activateGoogleAnalytics } from "@/lib/analytics";

/** Dispatched when tracking consent is granted (same-tab listeners). */
export const CONSENT_GRANTED_EVENT = "wq-consent-granted";

type ConsentScriptLoader = {
  id: string;
  load: () => void | Promise<void>;
};

const CONSENT_SCRIPT_LOADERS: ConsentScriptLoader[] = [
  {
    id: "google-analytics",
    load: async () => {
      await activateGoogleAnalytics();
    },
  },
];

let activationStarted = false;

/** Load all registered consent-gated scripts once. Safe to call multiple times. */
export function activateConsentScripts(): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(CONSENT_GRANTED_EVENT));

  if (activationStarted) return;
  activationStarted = true;

  for (const loader of CONSENT_SCRIPT_LOADERS) {
    Promise.resolve(loader.load()).catch(() => {
      // never block the app on analytics
    });
  }
}

/** For tests or future re-consent flows. */
export function resetConsentScriptActivation(): void {
  activationStarted = false;
}
