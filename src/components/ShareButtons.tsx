"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

const SHARE_MESSAGE = "Try this free calculator on WattQuick";

interface ShareButtonsProps {
  title: string;
  className?: string;
}

function buildShareUrl(
  platform: "whatsapp" | "twitter" | "facebook",
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

export function ShareButtons({ title, className }: ShareButtonsProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const shareText = `${SHARE_MESSAGE} — ${title}`;

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title,
        text: SHARE_MESSAGE,
        url: pageUrl || window.location.href,
      });
    } catch {
      /* user cancelled */
    }
  }, [pageUrl, title]);

  const handleCopy = useCallback(async () => {
    const url = pageUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [pageUrl]);

  const openShare = (platform: "whatsapp" | "twitter" | "facebook") => {
    const url = pageUrl || (typeof window !== "undefined" ? window.location.href : "");
    if (!url) return;
    window.open(
      buildShareUrl(platform, url, shareText),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const iconButtonClass = cn(
    calculatorCommandShareBtn,
    "calculator-share-btn inline-flex size-10 items-center justify-center rounded-md",
    "border border-status-success bg-status-success text-white shadow-none",
    "hover:bg-status-success/90 hover:text-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-success/40 focus-visible:ring-offset-2"
  );

  return (
    <section
      className={cn("space-y-3", className)}
      aria-labelledby="share-heading"
    >
      <h3
        id="share-heading"
        className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80"
      >
        Share this calculator
      </h3>

      <div className="flex sm:hidden">
        {canNativeShare ? (
          <button
            type="button"
            onClick={handleNativeShare}
            className={cn(
              calculatorCommandShareBtn,
              "inline-flex h-11 w-full items-center justify-center gap-2 text-sm font-semibold text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            )}
          >
            <Share2 className="size-4" aria-hidden />
            Share
          </button>
        ) : (
          <MobileFallbackRow
            onWhatsApp={() => openShare("whatsapp")}
            onTwitter={() => openShare("twitter")}
            onFacebook={() => openShare("facebook")}
            onCopy={handleCopy}
            copied={copied}
            iconButtonClass={iconButtonClass}
          />
        )}
      </div>

      <div className="hidden flex-wrap items-center gap-2 sm:flex">
        <ShareLinkButton
          label="Share on WhatsApp"
          onClick={() => openShare("whatsapp")}
          className={iconButtonClass}
        >
          <WhatsAppIcon />
        </ShareLinkButton>
        <ShareLinkButton
          label="Share on X"
          onClick={() => openShare("twitter")}
          className={iconButtonClass}
        >
          <XIcon />
        </ShareLinkButton>
        <ShareLinkButton
          label="Share on Facebook"
          onClick={() => openShare("facebook")}
          className={iconButtonClass}
        >
          <FacebookIcon />
        </ShareLinkButton>
        <ShareLinkButton
          label={copied ? "Link copied" : "Copy link"}
          onClick={handleCopy}
          className={iconButtonClass}
        >
          {copied ? (
            <Check className="size-4" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
        </ShareLinkButton>
      </div>
    </section>
  );
}

function ShareLinkButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {children}
    </button>
  );
}

function MobileFallbackRow({
  onWhatsApp,
  onTwitter,
  onFacebook,
  onCopy,
  copied,
  iconButtonClass,
}: {
  onWhatsApp: () => void;
  onTwitter: () => void;
  onFacebook: () => void;
  onCopy: () => void;
  copied: boolean;
  iconButtonClass: string;
}) {
  return (
    <div className="flex w-full gap-2">
      <ShareLinkButton label="Share on WhatsApp" onClick={onWhatsApp} className={cn(iconButtonClass, "flex-1")}>
        <WhatsAppIcon />
      </ShareLinkButton>
      <ShareLinkButton label="Share on X" onClick={onTwitter} className={cn(iconButtonClass, "flex-1")}>
        <XIcon />
      </ShareLinkButton>
      <ShareLinkButton label="Share on Facebook" onClick={onFacebook} className={cn(iconButtonClass, "flex-1")}>
        <FacebookIcon />
      </ShareLinkButton>
      <ShareLinkButton label={copied ? "Link copied" : "Copy link"} onClick={onCopy} className={cn(iconButtonClass, "flex-1")}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </ShareLinkButton>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
