"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { setMetaContent } from "@/lib/meta-tags";
import {
  getOgImageUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "@/lib/og-image";

const CALCULATOR_SHARE_FLAG = "data-calculator-share";

export function OgImageSync() {
  const { theme } = useTheme();

  useEffect(() => {
    if (document.documentElement.hasAttribute(CALCULATOR_SHARE_FLAG)) return;

    const imageUrl = getOgImageUrl(theme);
    setMetaContent("property", "og:image", imageUrl);
    setMetaContent("property", "og:image:width", String(OG_IMAGE_WIDTH));
    setMetaContent("property", "og:image:height", String(OG_IMAGE_HEIGHT));
    setMetaContent("name", "twitter:image", imageUrl);
  }, [theme]);

  return null;
}
