"use client";

import { useEffect } from "react";
import { useCalculatorId } from "@/components/calculator/calculator-id-context";
import { useTheme } from "@/components/theme-provider";
import {
  formatCalculatorShareHeadline,
  getCalculatorShareData,
  resolveCalculatorShareImageUrl,
} from "@/lib/calculator-share";
import { setMetaContent } from "@/lib/meta-tags";
import { getOgImageUrl, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og-image";

const CALCULATOR_SHARE_FLAG = "data-calculator-share";

/** Keeps og/twitter tags aligned with calculatorShareData on client navigations. */
export function CalculatorShareMetaSync() {
  const calculatorId = useCalculatorId();
  const { theme } = useTheme();

  useEffect(() => {
    if (!calculatorId) return;

    const share = getCalculatorShareData(calculatorId);
    if (!share) {
      document.documentElement.removeAttribute(CALCULATOR_SHARE_FLAG);
      return;
    }

    document.documentElement.setAttribute(CALCULATOR_SHARE_FLAG, "true");

    const headline = formatCalculatorShareHeadline(share.title);
    const imageUrl = resolveCalculatorShareImageUrl(share.imageUrl);

    setMetaContent("property", "og:title", headline);
    setMetaContent("property", "og:description", share.description);
    setMetaContent("property", "og:image", imageUrl);
    setMetaContent("property", "og:image:width", String(OG_IMAGE_WIDTH));
    setMetaContent("property", "og:image:height", String(OG_IMAGE_HEIGHT));
    setMetaContent("name", "twitter:title", headline);
    setMetaContent("name", "twitter:description", share.description);
    setMetaContent("name", "twitter:image", imageUrl);

    return () => {
      document.documentElement.removeAttribute(CALCULATOR_SHARE_FLAG);
      const themeImage = getOgImageUrl(theme);
      setMetaContent("property", "og:image", themeImage);
      setMetaContent("property", "og:image:width", String(OG_IMAGE_WIDTH));
      setMetaContent("property", "og:image:height", String(OG_IMAGE_HEIGHT));
      setMetaContent("name", "twitter:image", themeImage);
    };
  }, [calculatorId, theme]);

  return null;
}
