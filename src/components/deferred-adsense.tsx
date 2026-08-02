"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { ADSENSE_SCRIPT_SRC } from "@/lib/adsense";
import { readCookieConsent } from "@/lib/cookie-consent";
import { CONSENT_GRANTED_EVENT } from "@/lib/consent-scripts";

/**
 * Loads AdSense after consent with Next.js `lazyOnload` so it never
 * contends with mobile FCP/LCP on the critical path.
 */
export function DeferredAdSense() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (readCookieConsent() === "granted") {
      setEnabled(true);
    }

    const onGranted = () => setEnabled(true);
    window.addEventListener(CONSENT_GRANTED_EVENT, onGranted);
    return () => window.removeEventListener(CONSENT_GRANTED_EVENT, onGranted);
  }, []);

  if (!enabled) return null;

  return (
    <Script
      id="wq-adsense"
      src={ADSENSE_SCRIPT_SRC}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
