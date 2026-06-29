"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_PUBLISHER_ID } from "@/lib/adsense";

interface AdSenseInArticleUnitProps {
  slotId: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/** In-article fluid AdSense unit — script is loaded once in root layout. */
export function AdSenseInArticleUnit({ slotId }: AdSenseInArticleUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may reject duplicate initialization during hydration.
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
    />
  );
}
