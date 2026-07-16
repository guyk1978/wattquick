"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, BookOpen, X } from "lucide-react";
import { useArticlePortal } from "@/components/article-portal/article-portal-provider";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import { calculatorCommandShareBtn } from "@/lib/glass-ui";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition, getCalculatorMeta } from "@/lib/calculators/registry";
import {
  getToolLaunchContext,
  shouldShowBackToArticle,
  type ToolLaunchContext,
} from "@/lib/content-tool-link";
import { cn } from "@/lib/utils";

interface CalculatorLaunchModalProps {
  calculatorId: CalculatorId | null;
  onClose: () => void;
  /** Explicit context; falls back to sessionStorage */
  launchContext?: ToolLaunchContext | null;
  /** Extra footer (e.g. dashboard “Next steps”) rendered above complementary guide */
  footer?: ReactNode;
}

export function CalculatorLaunchModal({
  calculatorId,
  onClose,
  launchContext: launchContextProp,
  footer,
}: CalculatorLaunchModalProps) {
  const meta = calculatorId ? getCalculatorMeta(calculatorId) : null;
  const definition = calculatorId ? getCalculatorDefinition(calculatorId) : null;
  const [ctx, setCtx] = useState<ToolLaunchContext | null>(launchContextProp ?? null);
  const { openArticle } = useArticlePortal();

  useEffect(() => {
    if (launchContextProp) {
      setCtx(launchContextProp);
      return;
    }
    if (calculatorId) setCtx(getToolLaunchContext());
  }, [calculatorId, launchContextProp]);

  const showBack = calculatorId ? shouldShowBackToArticle(calculatorId, ctx) : false;
  const relatedArticle = definition?.relatedArticleId;

  useEffect(() => {
    if (!calculatorId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [calculatorId, onClose]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!calculatorId || !meta) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-launch-modal-title"
      className="calculator-launch-modal fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      onClick={handleBackdrop}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/85"
        aria-hidden
      />

      <div
        className={cn(
          "calculator-launch-modal__panel relative z-10 flex max-h-[92vh] w-full flex-col",
          "rounded-none bg-background shadow-[0_24px_48px_rgb(15_23_42/0.12)]",
          "dark:shadow-[0_32px_64px_rgb(0_0_0/0.55)]",
          "sm:max-h-[88vh] sm:max-w-2xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-2 border-b border-border/50 px-4 py-3 sm:px-5">
          {showBack && ctx ? (
            <button
              type="button"
              onClick={() => {
                openArticle(ctx.articleSlug);
                onClose();
              }}
              className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              <span className="max-w-[16rem] truncate sm:max-w-none">Back to article</span>
            </button>
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <h2
              id="calc-launch-modal-title"
              className="min-w-0 truncate text-base font-semibold tracking-tight text-foreground sm:text-lg"
            >
              {meta.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                calculatorCommandShareBtn,
                "flex size-9 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
              aria-label="Close calculator"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="calculator-command calculator-launch-modal__body min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 sm:px-5 sm:py-5">
          <CalculatorPanel id={calculatorId} />
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-border/50 px-4 py-3 sm:px-5">{footer}</div>
        ) : null}

        {relatedArticle ? (
          <div className="calculator-launch-modal__guide shrink-0 border-t border-border/50 px-4 py-3 sm:px-5">
            <p className="mb-2 text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
              Complementary guide
            </p>
            <button
              type="button"
              onClick={() => {
                openArticle(relatedArticle);
                onClose();
              }}
              className={cn(
                "calculator-launch-modal__guide-link group flex w-full items-center gap-2.5 rounded-none px-3 py-2 text-left",
                "bg-muted/40 transition-colors hover:bg-muted/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <BookOpen
                className="size-3.5 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  Read the full article
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  /blog/{relatedArticle}/
                </span>
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
