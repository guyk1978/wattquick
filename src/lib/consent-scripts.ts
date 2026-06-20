/**
 * Consent-gated third-party scripts.
 * Add new loaders to CONSENT_SCRIPT_LOADERS — each runs only after the user accepts.
 *
 * Configure via Cloudflare Pages environment variables:
 * - NEXT_PUBLIC_GA_ID       — Google Analytics measurement ID (e.g. G-XXXXXXXX)
 * - NEXT_PUBLIC_ADSENSE_ID  — Google AdSense publisher ID (future)
 */

import { activateGoogleAnalytics } from "@/lib/analytics";
import { ADSENSE_PUBLISHER_ID, ADSENSE_SCRIPT_SRC } from "@/lib/adsense";

type ConsentScriptLoader = {
  id: string;
  load: () => void | Promise<void>;
};

function injectScript(
  id: string,
  src: string,
  options?: { async?: boolean; crossOrigin?: string }
): HTMLScriptElement | null {
  if (typeof document === "undefined") return null;
  if (document.getElementById(id)) return null;

  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  if (options?.async) script.async = true;
  if (options?.crossOrigin) script.crossOrigin = options.crossOrigin;
  document.head.appendChild(script);
  return script;
}

/** Loads AdSense if not already injected in root layout `<head>`. */
function loadAdSense(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

  const publisherId =
    process.env.NEXT_PUBLIC_ADSENSE_ID?.trim() || ADSENSE_PUBLISHER_ID;

  injectScript(
    "wq-consent-adsense",
    publisherId === ADSENSE_PUBLISHER_ID
      ? ADSENSE_SCRIPT_SRC
      : `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`,
    { async: true, crossOrigin: "anonymous" }
  );
}

const CONSENT_SCRIPT_LOADERS: ConsentScriptLoader[] = [
  { id: "google-analytics", load: activateGoogleAnalytics },
  { id: "google-adsense", load: loadAdSense },
];

let activationStarted = false;

/** Load all registered consent-gated scripts once. Safe to call multiple times. */
export function activateConsentScripts(): void {
  if (typeof window === "undefined" || activationStarted) return;
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
