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
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getCategoryColor } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

export type ToolHeaderTab =
  | "calc"
  | "viz"
  | "doc"
  | "related"
  | "categories"
  | "reviews";

const TAB_LABELS: Record<ToolHeaderTab, string> = {
  calc: "[CALC]",
  viz: "[VIZ]",
  doc: "[DOC]",
  related: "[RELATED]",
  categories: "[CATEGORIES]",
  reviews: "[REVIEWS]",
};

interface ToolHeaderProps {
  /** Tool display name, e.g. "Solar ROI Analysis". */
  title: string;
  /** Currently active view tab. CALC is the calculator itself. */
  activeTab?: ToolHeaderTab;
  onTabChange?: (tab: ToolHeaderTab) => void;
  /**
   * When false, horizontal tabs are omitted (standalone pages use
   * `ToolWorkspaceNav` instead). Defaults to true for legacy modal chrome.
   */
  showTabs?: boolean;
  /** Tabs to render; CALC is always present. REVIEWS is always available when enabled. */
  hasVizTab?: boolean;
  hasDocTab?: boolean;
  hasRelatedTab?: boolean;
  hasCategoriesTab?: boolean;
  hasReviewsTab?: boolean;
  /** Enables the favorite toggle and interactive rating for this tool. */
  calculatorId?: CalculatorId;
  /** Renders the save-to-project control when provided. */
  onSaveProject?: () => void;
  /** Element toggled by the Full Screen control (defaults to <html>). */
  fullscreenTargetRef?: RefObject<HTMLElement | null>;
  /** Share metadata; defaults to `title` and the current URL. */
  shareText?: string;
  onClose?: () => void;
  /** id for the title heading so dialogs/pages can point aria-labelledby at it. */
  titleId?: string;
  /** Heading level for the tool title. Standalone pages should use h1. */
  titleAs?: "h1" | "h2";
  className?: string;
}

/**
 * Unified tool window header: title + rating on the left,
 * optional horizontal tabs in the middle, controls on the right.
 * Standalone tool pages hide tabs and use the vertical sidebar instead.
 */
export function ToolHeader({
  title,
  activeTab = "calc",
  onTabChange,
  showTabs = true,
  hasVizTab = false,
  hasDocTab = false,
  hasRelatedTab = false,
  hasCategoriesTab = false,
  hasReviewsTab = false,
  calculatorId,
  onSaveProject,
  fullscreenTargetRef,
  shareText,
  onClose,
  titleId,
  titleAs: TitleTag = "h2",
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
    ...(hasVizTab ? (["viz"] as const) : []),
    ...(hasDocTab ? (["doc"] as const) : []),
    ...(hasRelatedTab ? (["related"] as const) : []),
    ...(hasCategoriesTab ? (["categories"] as const) : []),
    ...(hasReviewsTab ? (["reviews"] as const) : []),
  ];

  return (
    <header className={cn("wq-tool-header", className)}>
      <div className="wq-tool-header__lead">
        <TitleTag id={titleId} className="wq-tool-header__title">
          {title}
        </TitleTag>
        {calculatorId ? (
          <CalculatorRatingSummary
            calculatorId={calculatorId}
            color={getCategoryColor(getCalculatorMeta(calculatorId).category)}
            className="wq-tool-header__rating"
          />
        ) : null}
      </div>

      {showTabs && tabs.length > 1 ? (
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
