/**
 * Consent-gated third-party scripts.
 * Add new loaders to CONSENT_SCRIPT_LOADERS — each runs only after the user accepts.
 *
 * Configure via Cloudflare Pages environment variables:
 * - NEXT_PUBLIC_GA_ID       — Google Analytics measurement ID (e.g. G-XXXXXXXX)
 * - NEXT_PUBLIC_ADSENSE_ID  — Google AdSense publisher ID (future)
 */

type ConsentScriptLoader = {
  id: string;
  load: () => void;
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

function injectInlineScript(id: string, code: string): HTMLScriptElement | null {
  if (typeof document === "undefined") return null;
  if (document.getElementById(id)) return null;

  const script = document.createElement("script");
  script.id = id;
  script.textContent = code;
  document.head.appendChild(script);
  return script;
}

function loadGoogleAnalytics(): void {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (!measurementId) return;

  injectScript("wq-consent-ga", `https://www.googletagmanager.com/gtag/js?id=${measurementId}`, {
    async: true,
  });

  injectInlineScript(
    "wq-consent-ga-init",
    `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `
  );
}

/** Placeholder — enable by setting NEXT_PUBLIC_ADSENSE_ID in Cloudflare. */
function loadAdSense(): void {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim();
  if (!publisherId) return;

  injectScript(
    "wq-consent-adsense",
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`,
    { async: true, crossOrigin: "anonymous" }
  );
}

const CONSENT_SCRIPT_LOADERS: ConsentScriptLoader[] = [
  { id: "google-analytics", load: loadGoogleAnalytics },
  { id: "google-adsense", load: loadAdSense },
];

let activated = false;

/** Load all registered consent-gated scripts once. Safe to call multiple times. */
export function activateConsentScripts(): void {
  if (typeof window === "undefined" || activated) return;
  activated = true;

  for (const loader of CONSENT_SCRIPT_LOADERS) {
    try {
      loader.load();
    } catch {
      // never block the app on analytics
    }
  }
}

/** For tests or future re-consent flows. */
export function resetConsentScriptActivation(): void {
  activated = false;
}
