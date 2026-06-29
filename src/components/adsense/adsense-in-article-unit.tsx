"use client";

import { useEffect, useRef } from "react";
import {
  requestAdSenseFill,
  whenAdSenseReady,
  whenConsentGranted,
} from "@/lib/adsense-fill";
import { CONSENT_GRANTED_EVENT } from "@/lib/grant-consent";
import { ADSENSE_PUBLISHER_ID } from "@/lib/adsense";

interface AdSenseInArticleUnitProps {
  slotId: string;
}

/** In-article fluid AdSense unit — script is loaded once in root layout. */
export function AdSenseInArticleUnit({ slotId }: AdSenseInArticleUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const filledRef = useRef(false);

  useEffect(() => {
    const adEl = adRef.current;
    if (!adEl) return;

    let cancelled = false;

    const fill = async () => {
      if (cancelled || filledRef.current || !adRef.current) return;
      if (adRef.current.getAttribute("data-adsbygoogle-status")) {
        filledRef.current = true;
        return;
      }

      await whenConsentGranted();
      if (cancelled || filledRef.current || !adRef.current) return;

      await whenAdSenseReady();
      if (cancelled || filledRef.current || !adRef.current) return;
      if (adRef.current.getAttribute("data-adsbygoogle-status")) {
        filledRef.current = true;
        return;
      }

      requestAdSenseFill();
      filledRef.current = true;
    };

    void fill();
    window.addEventListener(CONSENT_GRANTED_EVENT, fill);

    return () => {
      cancelled = true;
      window.removeEventListener(CONSENT_GRANTED_EVENT, fill);
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", minHeight: "90px" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
    />
  );
}
