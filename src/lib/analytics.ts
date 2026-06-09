/**
 * Consent-gated Google Analytics (GA4).
 *
 * Set NEXT_PUBLIC_GA_ID in Cloudflare Pages → Settings → Environment variables
 * (Production, Build) and redeploy. Example: G-XXXXXXXXXX
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let measurementIdCache: string | null | undefined;
let loadPromise: Promise<string | null> | null = null;
let scriptsActivated = false;

async function fetchRuntimeConfig(): Promise<string | null> {
  try {
    const response = await fetch("/site-config.json", { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as { gaMeasurementId?: string };
    const id = data.gaMeasurementId?.trim();
    return id || null;
  } catch {
    return null;
  }
}

export async function resolveGaMeasurementId(): Promise<string | null> {
  if (measurementIdCache !== undefined) {
    return measurementIdCache;
  }

  const fromEnv = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (fromEnv) {
    measurementIdCache = fromEnv;
    return fromEnv;
  }

  // Static export on Cloudflare may ship an empty NEXT_PUBLIC_* in the browser bundle
  // even when the variable is set for the build — site-config.json is the fallback.
  const fromConfig = await fetchRuntimeConfig();
  measurementIdCache = fromConfig;
  return fromConfig;
}

function ensureGtagShim(): void {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

function injectGoogleAnalytics(measurementId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("wq-consent-ga")) {
      resolve();
      return;
    }

    ensureGtagShim();

    const script = document.createElement("script");
    script.id = "wq-consent-ga";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onload = () => {
      window.gtag?.("js", new Date());
      window.gtag?.("config", measurementId, {
        send_page_view: true,
        anonymize_ip: true,
      });
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Google Analytics"));
    document.head.appendChild(script);
  });
}

export function trackPageView(pagePath: string): void {
  if (!window.gtag || !measurementIdCache) return;
  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

/** Load GA after cookie consent. Safe to call multiple times. */
export async function activateGoogleAnalytics(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (scriptsActivated) return !!measurementIdCache;

  if (!loadPromise) {
    loadPromise = (async () => {
      const measurementId = await resolveGaMeasurementId();
      if (!measurementId) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[WattQuick] Google Analytics disabled: set NEXT_PUBLIC_GA_ID in the build environment."
          );
        }
        return null;
      }

      try {
        await injectGoogleAnalytics(measurementId);
        scriptsActivated = true;
        return measurementId;
      } catch {
        loadPromise = null;
        return null;
      }
    })();
  }

  const id = await loadPromise;
  return !!id;
}

/** For tests. */
export function resetAnalyticsState(): void {
  measurementIdCache = undefined;
  loadPromise = null;
  scriptsActivated = false;
}
