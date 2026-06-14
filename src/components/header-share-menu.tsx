"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { HeaderNavItem } from "@/components/header-nav-item";
import {
  buildShareUrl,
  copyPageUrl,
  getPageShareText,
  nativeSharePage,
} from "@/lib/page-share";
import { cn } from "@/lib/utils";

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

export function HeaderShareMenu() {
  const [open, setOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("WattQuick");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageUrl(window.location.href);
    setPageTitle(document.title || "WattQuick");
    setCanNativeShare(!!navigator.share);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const shareText = getPageShareText(pageTitle);

  const openShare = useCallback(
    (platform: "whatsapp" | "twitter" | "facebook") => {
      const url = pageUrl || window.location.href;
      window.open(
        buildShareUrl(platform, url, shareText),
        "_blank",
        "noopener,noreferrer"
      );
      setOpen(false);
    },
    [pageUrl, shareText]
  );

  const handleNativeShare = useCallback(async () => {
    const url = pageUrl || window.location.href;
    const shared = await nativeSharePage({
      title: pageTitle,
      url,
    });
    if (shared) setOpen(false);
  }, [pageTitle, pageUrl]);

  const handleCopy = useCallback(async () => {
    const url = pageUrl || window.location.href;
    const ok = await copyPageUrl(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [pageUrl]);

  return (
    <div ref={rootRef} className="relative">
      <HeaderNavItem
        label="Share"
        onClick={() => setOpen((value) => !value)}
        active={open}
        className="glass-header__action-item hidden sm:inline-flex"
        aria-label="Share this page"
        aria-expanded={open}
        aria-haspopup="menu"
      />

      <div
        className={cn(
          "header-share-menu absolute right-0 top-full z-[70] min-w-[12.5rem] pt-1.5",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
          "transition-[opacity,visibility] duration-150"
        )}
        role="menu"
        aria-label="Share options"
      >
        <div className="header-share-menu__panel border border-border bg-card p-1.5 shadow-[0_12px_32px_rgb(0_0_0/0.12)] dark:border-white/10 dark:bg-[var(--matte-section)]">
          {canNativeShare ? (
            <button
              type="button"
              role="menuitem"
              onClick={handleNativeShare}
              className="header-share-menu__item"
            >
              <Share2 className="size-4" aria-hidden />
              Share…
            </button>
          ) : null}
          <button
            type="button"
            role="menuitem"
            onClick={() => openShare("whatsapp")}
            className="header-share-menu__item"
          >
            <WhatsAppIcon />
            WhatsApp
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => openShare("twitter")}
            className="header-share-menu__item"
          >
            <XIcon />
            X / Twitter
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => openShare("facebook")}
            className="header-share-menu__item"
          >
            <FacebookIcon />
            Facebook
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="header-share-menu__item"
          >
            {copied ? (
              <Check className="size-4 text-primary" aria-hidden />
            ) : (
              <Copy className="size-4" aria-hidden />
            )}
            {copied ? "Link copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
