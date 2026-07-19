"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  /** Clickable header label. */
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /**
   * Heading element wrapped around the trigger so document outline
   * stays correct wherever the section is embedded.
   */
  headingLevel?: "h2" | "h3" | "h4" | "h5";
  className?: string;
}

/**
 * SEO-friendly disclosure: content is always present in the HTML and is
 * collapsed with `max-height: 0` + `opacity: 0` (never `display: none`),
 * animated with a 0.5s ease-in-out transition.
 */
export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  headingLevel: Heading = "h3",
  className,
}: CollapsibleSectionProps) {
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(defaultOpen);
  // null = unclamped (fully open, no fixed height); number = animating px value.
  const [maxHeight, setMaxHeight] = useState<number | null>(
    defaultOpen ? null : 0
  );

  const toggle = useCallback(() => {
    const contentHeight = bodyRef.current?.scrollHeight ?? 0;

    if (open) {
      // Pin the current height and force a reflow so the transition
      // has a concrete start value ("none" -> 0 would not animate).
      const panel = panelRef.current;
      if (panel) {
        panel.style.maxHeight = `${contentHeight}px`;
        void panel.offsetHeight;
      }
      setMaxHeight(0);
      setOpen(false);
    } else {
      setMaxHeight(contentHeight);
      setOpen(true);
    }
  }, [open]);

  const handleTransitionEnd = useCallback(() => {
    // Remove the clamp once opened so the content can reflow freely.
    if (open) setMaxHeight(null);
  }, [open]);

  return (
    <section className={cn("collapsible-section", className)}>
      <Heading className="collapsible-section__heading">
        <button
          type="button"
          className="collapsible-section__trigger"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="collapsible-section__title">{title}</span>
          <ChevronDown
            className={cn(
              "collapsible-section__chevron",
              open && "collapsible-section__chevron--open"
            )}
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </Heading>

      {/* Content stays in the DOM in both states for search indexing. */}
      <div
        id={panelId}
        ref={panelRef}
        className={cn(
          "collapsible-section__panel",
          open && "collapsible-section__panel--open"
        )}
        style={{ maxHeight: maxHeight === null ? undefined : `${maxHeight}px` }}
        onTransitionEnd={handleTransitionEnd}
        aria-hidden={!open}
      >
        <div ref={bodyRef} className="collapsible-section__body">
          {children}
        </div>
      </div>
    </section>
  );
}
