import { CONSENT_GRANTED_EVENT } from "@/lib/grant-consent";
import { hasConsentGranted } from "@/lib/cookie-consent";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/** Wait until cookie consent allows ads (overlay accept or returning visitor). */
export function whenConsentGranted(): Promise<void> {
  if (typeof window === "undefined" || hasConsentGranted()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const onGranted = () => {
      window.removeEventListener(CONSENT_GRANTED_EVENT, onGranted);
      resolve();
    };
    window.addEventListener(CONSENT_GRANTED_EVENT, onGranted);
  });
}

/** Wait for the AdSense library loaded in root layout `<head>`. */
export function whenAdSenseReady(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();

  const script = document.querySelector<HTMLScriptElement>(
    'script[src*="adsbygoogle.js"]'
  );
  if (!script) return Promise.resolve();

  if (script.dataset.wqLoaded === "true") return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => {
      script.dataset.wqLoaded = "true";
      resolve();
    };

    script.addEventListener("load", done, { once: true });
    // Script may have finished loading before this listener is attached.
    setTimeout(done, 100);
  });
}

/** Request fill for the most recently mounted unfilled `<ins class="adsbygoogle">`. */
export function requestAdSenseFill(): void {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    // AdSense rejects duplicate fills for the same slot.
  }
}
