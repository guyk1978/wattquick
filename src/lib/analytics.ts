/**
 * Consent-gated Google Analytics (GA4).
 */
import { WATTQUICK_GA_MEASUREMENT_ID } from "@/config/analytics";
import { grantAllTrackingConsent } from "@/lib/grant-consent";

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

  const fromConfig = await fetchRuntimeConfig();
  if (fromConfig) {
    measurementIdCache = fromConfig;
    return fromConfig;
  }

  if (WATTQUICK_GA_MEASUREMENT_ID) {
    measurementIdCache = WATTQUICK_GA_MEASUREMENT_ID;
    return WATTQUICK_GA_MEASUREMENT_ID;
  }

  measurementIdCache = null;
  return null;
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

    grantAllTrackingConsent();

    // Official gtag pattern: queue commands before the library finishes loading.
    ensureGtagShim();
    window.gtag?.("js", new Date());
    window.gtag?.("config", measurementId, {
      send_page_view: true,
    });

    const inject = () => {
      const script = document.createElement("script");
      script.id = "wq-consent-ga";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google Analytics"));
      document.head.appendChild(script);
    };

    // Defer past load so GA never contends with mobile FCP/LCP.
    if (document.readyState === "complete") {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => inject(), { timeout: 2000 });
      } else {
        window.setTimeout(inject, 1);
      }
    } else {
      window.addEventListener(
        "load",
        () => {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(() => inject(), { timeout: 2000 });
          } else {
            window.setTimeout(inject, 1);
          }
        },
        { once: true }
      );
    }
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
