import type { Theme } from "@/lib/theme";

const SITE_URL = "https://wattquick.com";

export const OG_IMAGE_DARK_PATH = "/heder-dark.png";
export const OG_IMAGE_LIGHT_PATH = "/heder-light.png";
export const OG_IMAGE_WIDTH = 1984;
export const OG_IMAGE_HEIGHT = 544;

export function getOgImagePath(theme: Theme): string {
  return theme === "dark" ? OG_IMAGE_DARK_PATH : OG_IMAGE_LIGHT_PATH;
}

export function getOgImageUrl(theme: Theme): string {
  return `${SITE_URL}${getOgImagePath(theme)}`;
}
