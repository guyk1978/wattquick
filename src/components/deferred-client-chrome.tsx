"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const NavigationLoadingOverlay = dynamic(
  () =>
    import("@/components/navigation-loading-overlay").then((mod) => ({
      default: mod.NavigationLoadingOverlay,
    })),
  { ssr: false }
);

const AnalyticsRouteTracker = dynamic(
  () =>
    import("@/components/analytics-route-tracker").then((mod) => ({
      default: mod.AnalyticsRouteTracker,
    })),
  { ssr: false }
);

const CookieConsentBanner = dynamic(
  () =>
    import("@/components/cookie-consent-banner").then((mod) => ({
      default: mod.CookieConsentBanner,
    })),
  { ssr: false }
);

const ServiceWorkerRegistration = dynamic(
  () =>
    import("@/components/service-worker-registration").then((mod) => ({
      default: mod.ServiceWorkerRegistration,
    })),
  { ssr: false }
);

/**
 * Client-only chrome deferred with `ssr: false`. Must live in a Client
 * Component — next/dynamic cannot use `ssr: false` from Server Components.
 */
export function DeferredClientChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationLoadingOverlay />
      <AnalyticsRouteTracker />
      {children}
      <CookieConsentBanner />
      <ServiceWorkerRegistration />
    </>
  );
}
