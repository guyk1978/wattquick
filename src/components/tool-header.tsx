"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { FolderPlus, Maximize2, Minimize2, Share2, X } from "lucide-react";
import { FavoriteCalculatorButton } from "@/components/favorite-calculator-button";
import { StarRating } from "@/components/calculator/star-rating";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

export type ToolHeaderTab = "calc" | "doc" | "related";

const TAB_LABELS: Record<ToolHeaderTab, string> = {
  calc: "[CALC]",
  doc: "[DOC]",
  related: "[RELATED]",
};

interface ToolHeaderProps {
  /** Tool display name, e.g. "Solar ROI Analysis". */
  title: string;
  /** Aggregate rating average (0–5); null hides the numeric value. */
  rating?: number | null;
  /** Total number of ratings, shown as "47,637 ratings". */
  ratingCount?: number;
  /** Currently active view tab. CALC is the calculator itself. */
  activeTab?: ToolHeaderTab;
  onTabChange?: (tab: ToolHeaderTab) => void;
  /** Tabs to render; CALC is always present. */
  hasDocTab?: boolean;
  hasRelatedTab?: boolean;
  /** Enables the favorite toggle for this tool. */
  calculatorId?: CalculatorId;
  /** Renders the save-to-project control when provided. */
  onSaveProject?: () => void;
  /** Element toggled by the Full Screen control (defaults to <html>). */
  fullscreenTargetRef?: RefObject<HTMLElement | null>;
  /** Share metadata; defaults to `title` and the current URL. */
  shareText?: string;
  onClose?: () => void;
  /** id for the <h2> so dialogs can point aria-labelledby at it. */
  titleId?: string;
  className?: string;
}

function formatRatingCountLabel(count: number): string {
  return `${count.toLocaleString("en-US")} ${count === 1 ? "rating" : "ratings"}`;
}

/**
 * Unified tool window header: title + rating on the left,
 * [CALC]/[DOC]/[RELATED] tabs in the middle, controls on the right.
 * Shared across every WattQuick calculator tool.
 */
export function ToolHeader({
  title,
  rating = null,
  ratingCount = 0,
  activeTab = "calc",
  onTabChange,
  hasDocTab = false,
  hasRelatedTab = false,
  calculatorId,
  onSaveProject,
  fullscreenTargetRef,
  shareText,
  onClose,
  titleId,
  className,
}: ToolHeaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement != null);
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      if (noticeTimerRef.current != null) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  const showShareNotice = useCallback((message: string) => {
    setShareNotice(message);
    if (noticeTimerRef.current != null) {
      window.clearTimeout(noticeTimerRef.current);
    }
    noticeTimerRef.current = window.setTimeout(() => setShareNotice(null), 2000);
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: shareText ?? title, url });
        return;
      } catch (error) {
        // User cancelled the native sheet — nothing else to do.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showShareNotice("Link copied to clipboard");
    } catch {
      // Clipboard API blocked (e.g. insecure context) — legacy fallback.
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      showShareNotice(copied ? "Link copied to clipboard" : "Couldn't copy link");
    }
  }, [shareText, showShareNotice, title]);

  const handleFullscreen = useCallback(async () => {
    const target = fullscreenTargetRef?.current ?? document.documentElement;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await target.requestFullscreen();
      }
    } catch {
      // Fullscreen API unavailable or blocked — leave the layout as is.
    }
  }, [fullscreenTargetRef]);

  const tabs: ToolHeaderTab[] = [
    "calc",
    ...(hasDocTab ? (["doc"] as const) : []),
    ...(hasRelatedTab ? (["related"] as const) : []),
  ];

  return (
    <header className={cn("wq-tool-header", className)}>
      <div className="wq-tool-header__lead">
        <h2 id={titleId} className="wq-tool-header__title">
          {title}
        </h2>
        {ratingCount > 0 ? (
          <span className="wq-tool-header__rating" aria-label="Tool rating">
            <StarRating
              value={rating ?? 0}
              readOnly
              size="sm"
              label={
                rating != null
                  ? `${rating.toFixed(1)} out of 5 stars`
                  : "No ratings yet"
              }
              className="wq-tool-header__stars"
            />
            {rating != null ? (
              <span className="wq-tool-header__rating-average">
                {rating.toFixed(1)}
              </span>
            ) : null}
            <span className="wq-tool-header__rating-count">
              {formatRatingCountLabel(ratingCount)}
            </span>
          </span>
        ) : null}
      </div>

      {tabs.length > 1 ? (
        <nav className="wq-tool-header__tabs" aria-label="Tool views">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "wq-tool-header__tab",
                activeTab === tab && "wq-tool-header__tab--active"
              )}
              aria-pressed={activeTab === tab}
              onClick={() => onTabChange?.(tab)}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>
      ) : null}

      <div className="wq-tool-header__controls">
        <button
          type="button"
          className="wq-tool-header__control"
          onClick={handleShare}
          aria-label="Share this tool"
          title="Share"
        >
          <Share2 className="size-4" strokeWidth={2} aria-hidden />
        </button>
        {calculatorId ? (
          <FavoriteCalculatorButton
            calculatorId={calculatorId}
            variant="toolbar"
            className="wq-tool-header__control wq-tool-header__control--favorite"
          />
        ) : null}
        {onSaveProject ? (
          <button
            type="button"
            className="wq-tool-header__control"
            onClick={onSaveProject}
            aria-label="Save project"
            title="Save project"
          >
            <FolderPlus className="size-4" strokeWidth={2} aria-hidden />
          </button>
        ) : null}
        <button
          type="button"
          className="wq-tool-header__control"
          onClick={handleFullscreen}
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
          aria-pressed={isFullscreen}
          title={isFullscreen ? "Exit full screen" : "Full screen"}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4" strokeWidth={2} aria-hidden />
          ) : (
            <Maximize2 className="size-4" strokeWidth={2} aria-hidden />
          )}
        </button>
        {onClose ? (
          <button
            type="button"
            className="wq-tool-header__control wq-tool-header__control--close"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </div>

      {shareNotice ? (
        <div className="wq-tool-header__notice" role="status">
          {shareNotice}
        </div>
      ) : null}
    </header>
  );
}
