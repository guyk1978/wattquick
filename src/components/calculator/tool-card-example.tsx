"use client";

import { useId, useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardExampleProps {
  /** Example text: "[value] = [benefit]" (label is rendered here). */
  example: string;
  /** Start expanded — used by card Focus mode so the example is pre-opened. */
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Subtle "Example" disclosure at the bottom of a tool card description.
 * Expands a small box inside the card instead of a hover tooltip so it works
 * the same on tap (mobile) and click. Sits above the card's overlay link so
 * toggling never navigates.
 */
export function ToolCardExample({
  example,
  defaultOpen = false,
  className,
}: ToolCardExampleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  if (!example) return null;

  return (
    <span className={cn("tool-card-example", open && "tool-card-example--open", className)}>
      <button
        type="button"
        className="tool-card-example__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(event) => {
          // Card surfaces use an absolutely-positioned overlay link; keep the
          // toggle from bubbling into it or any parent card handlers.
          event.preventDefault();
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        <Lightbulb className="tool-card-example__icon" strokeWidth={2} aria-hidden />
        Example
        <ChevronDown className="tool-card-example__chevron" strokeWidth={2} aria-hidden />
      </button>
      <span id={panelId} className="tool-card-example__panel" aria-hidden={!open}>
        <span className="tool-card-example__panel-inner">
          <span className="tool-card-example__text">
            <span className="tool-card-example__label">Real-world example: </span>
            {example}
          </span>
        </span>
      </span>
    </span>
  );
}
