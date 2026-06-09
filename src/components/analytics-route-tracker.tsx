"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";
import { hasConsentGranted } from "@/lib/cookie-consent";

function AnalyticsRouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!hasConsentGranted()) return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView(pagePath);
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsRouteTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsRouteTrackerInner />
    </Suspense>
  );
}
