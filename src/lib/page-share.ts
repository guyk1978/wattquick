export const SITE_SHARE_MESSAGE =
  "Try WattQuick — free battery, solar & EV calculators";

export type SharePlatform = "whatsapp" | "twitter" | "facebook";

export function buildShareUrl(
  platform: SharePlatform,
  pageUrl: string,
  text: string
): string {
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(text);

  switch (platform) {
    case "whatsapp":
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    default:
      return pageUrl;
  }
}

export function getPageShareText(pageTitle?: string): string {
  if (!pageTitle) return SITE_SHARE_MESSAGE;
  return `${SITE_SHARE_MESSAGE} — ${pageTitle}`;
}

export async function copyPageUrl(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

export async function nativeSharePage(options: {
  title: string;
  url: string;
  text?: string;
}): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) return false;
  try {
    await navigator.share({
      title: options.title,
      text: options.text ?? SITE_SHARE_MESSAGE,
      url: options.url,
    });
    return true;
  } catch {
    return false;
  }
}
