"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, X } from "lucide-react";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorDefinition, getCalculatorMeta } from "@/lib/calculators/registry";
import {
  getArticleUrl,
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

  return (
    <AnimatePresence>
      {calculatorId && meta ? (
        <motion.div
          key={calculatorId}
          role="dialog"
          aria-modal="true"
          aria-labelledby="calc-launch-modal-title"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdrop}
        >
          <div
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            aria-hidden
          />
          <motion.div
            className={cn(
              "command-center-modal relative z-10 flex max-h-[92vh] w-full flex-col",
              "rounded-t-3xl border border-cyan-500/20 bg-slate-950/90 shadow-[0_0_60px_rgba(34,211,238,0.12)]",
              "sm:max-h-[88vh] sm:max-w-2xl sm:rounded-3xl"
            )}
            initial={{ y: 48, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 32, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 flex-col gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
              {showBack && ctx ? (
                <Link
                  href={getArticleUrl(ctx.articleSlug)}
                  onClick={onClose}
                  className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-cyan-400/90 transition-colors hover:text-cyan-300"
                >
                  <ArrowLeft className="size-3.5" aria-hidden />
                  <span className="tool-preview-nowrap max-w-[16rem] truncate sm:max-w-none">
                    Back to article
                  </span>
                </Link>
              ) : null}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/90">
                    Calculator
                  </p>
                  <h2
                    id="calc-launch-modal-title"
                    className="tool-preview-nowrap truncate text-lg font-semibold text-white sm:text-xl"
                  >
                    {meta.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:border-cyan-500/40 hover:bg-white/5 hover:text-white"
                  aria-label="Close calculator"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              <CalculatorPanel id={calculatorId} />
            </div>

            {footer ? (
              <div className="shrink-0 border-t border-white/10">{footer}</div>
            ) : null}

            {relatedArticle ? (
              <div className="shrink-0 border-t border-white/10 bg-slate-900/50 px-4 py-4 sm:px-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
                  Complementary guide
                </p>
                <Link
                  href={getArticleUrl(relatedArticle)}
                  onClick={onClose}
                  className={cn(
                    "mt-2 flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3",
                    "transition-colors hover:border-emerald-400/40 hover:bg-emerald-500/15",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  )}
                >
                  <BookOpen className="size-4 shrink-0 text-emerald-400" aria-hidden />
                  <span className="min-w-0">
                    <span className="tool-preview-nowrap block truncate text-sm font-semibold text-white">
                      Read the full article
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-400">
                      Deep dive on /blog/{relatedArticle}/
                    </span>
                  </span>
                </Link>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
