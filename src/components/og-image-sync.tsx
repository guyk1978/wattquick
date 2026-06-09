"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  getOgImageUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "@/lib/og-image";

function setMetaContent(
  attribute: "property" | "name",
  key: string,
  content: string
) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function OgImageSync() {
  const { theme } = useTheme();

  useEffect(() => {
    const imageUrl = getOgImageUrl(theme);
    setMetaContent("property", "og:image", imageUrl);
    setMetaContent("property", "og:image:width", String(OG_IMAGE_WIDTH));
    setMetaContent("property", "og:image:height", String(OG_IMAGE_HEIGHT));
    setMetaContent("name", "twitter:image", imageUrl);
  }, [theme]);

  return null;
}
