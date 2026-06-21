"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { CategoryToolsFocusGrid } from "@/components/category/category-tools-focus-grid";
import type { CategoryToolsFocusItem } from "@/components/category/category-tools-focus-grid";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

interface CategoryToolsFocusProps {
  calculators: CategoryToolsFocusItem[];
  categoryLabel: string;
  title?: string;
  className?: string;
}

export function CategoryToolsFocus({
  calculators,
  categoryLabel,
  title,
  className,
}: CategoryToolsFocusProps) {
  const overlayTitle = title ?? `${categoryLabel} calculators`;
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const openOverlay = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  const handleBackdrop = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) close();
    },
    [close]
  );

  if (calculators.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={openOverlay}
        className={cn("calculator-focus-mode-btn", className)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Open focus view — ${overlayTitle}`}
      >
        <Maximize2 className="size-3.5 shrink-0 opacity-80" strokeWidth={2} aria-hidden />
        <span>Focus View</span>
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="category-tools-focus-title"
              className="category-tools-focus-overlay fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
              onClick={handleBackdrop}
            >
              <div
                className="category-tools-focus-overlay__backdrop absolute inset-0 bg-background/85 backdrop-blur-md dark:bg-[#0a0a0a]/90"
                aria-hidden
              />

              <div
                className="category-tools-focus-overlay__panel relative z-10 flex w-full max-w-6xl flex-col overflow-hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={close}
                  className={cn(
                    calculatorCommandShareBtn,
                    "category-tools-focus-overlay__close absolute end-3 top-3 z-20 flex size-10 items-center justify-center",
                    "border border-border/70 bg-card/90 text-muted-foreground hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  )}
                  aria-label="Close focus view"
                >
                  <X className="size-5" />
                </button>

                <div className="category-tools-focus-overlay__body min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  <header className="category-tools-focus-overlay__header">
                    <p className="category-tools-focus-overlay__eyebrow">
                      {categoryLabel}
                    </p>
                    <h2
                      id="category-tools-focus-title"
                      className="category-tools-focus-overlay__title"
                    >
                      {overlayTitle}
                    </h2>
                    <p className="category-tools-focus-overlay__count">
                      {calculators.length}{" "}
                      {calculators.length === 1 ? "tool" : "tools"}
                    </p>
                  </header>

                  <CategoryToolsFocusGrid
                    calculators={calculators}
                    onNavigate={close}
                  />
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
