"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import { getNextCalculatorStep } from "@/lib/dashboard-chaining";
import { getDefaultResultSnapshot } from "@/lib/dashboard-snapshot";
import {
  recordCalculatorUse,
  updateRecentSnapshot,
} from "@/lib/dashboard-storage";
import {
  getArticleUrl,
  getToolLaunchContext,
  shouldShowBackToArticle,
} from "@/lib/content-tool-link";
import { cn } from "@/lib/utils";

interface CalculatorModalProps {
  calculatorId: CalculatorId | null;
  onClose: () => void;
  onOpenCalculator: (id: CalculatorId) => void;
}

export function CalculatorModal({
  calculatorId,
  onClose,
  onOpenCalculator,
}: CalculatorModalProps) {
  const meta = calculatorId ? getCalculatorMeta(calculatorId) : null;
  const nextStep = calculatorId ? getNextCalculatorStep(calculatorId) : null;
  const snapshotRef = useRef<string | null>(null);
  const [liveSnapshot, setLiveSnapshot] = useState<string | null>(null);
  const [launchCtx, setLaunchCtx] = useState(
    () => (calculatorId ? getToolLaunchContext() : null)
  );

  useEffect(() => {
    if (calculatorId) setLaunchCtx(getToolLaunchContext());
  }, [calculatorId]);

  const showBack =
    calculatorId && shouldShowBackToArticle(calculatorId, launchCtx);

  useEffect(() => {
    if (!calculatorId) return;
    const fallback = getDefaultResultSnapshot(calculatorId);
    snapshotRef.current = fallback;
    setLiveSnapshot(fallback);
    recordCalculatorUse(calculatorId, fallback);
  }, [calculatorId]);

  const handleSnapshot = useCallback(
    (snapshot: string | null) => {
      if (!calculatorId || !snapshot) return;
      snapshotRef.current = snapshot;
      setLiveSnapshot(snapshot);
      updateRecentSnapshot(calculatorId, snapshot);
    },
    [calculatorId]
  );

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
      if (calculatorId && snapshotRef.current) {
        recordCalculatorUse(calculatorId, snapshotRef.current);
      }
    };
  }, [calculatorId, onClose]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleNextStep = useCallback(() => {
    if (!nextStep) return;
    onOpenCalculator(nextStep.nextId);
  }, [nextStep, onOpenCalculator]);

  return (
    <AnimatePresence>
      {calculatorId && meta ? (
        <motion.div
          key={calculatorId}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dashboard-calc-modal-title"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdrop}
        >
          <div
            className="absolute inset-0 bg-background/80"
            aria-hidden
          />
          <motion.div
            className={cn(
              "command-center-modal flat-panel relative z-10 flex max-h-[92vh] w-full flex-col",
              "sm:max-h-[88vh] sm:max-w-2xl"
            )}
            initial={{ y: 48, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 32, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 flex-col gap-3 border-b border-border/40 px-4 py-3 sm:px-5">
              {showBack && launchCtx ? (
                <Link
                  href={getArticleUrl(launchCtx.articleSlug)}
                  onClick={onClose}
                  className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                >
                  <ArrowLeft className="size-3.5" aria-hidden />
                  <span className="tool-preview-nowrap max-w-[16rem] truncate sm:max-w-none">
                    Back to article
                  </span>
                </Link>
              ) : null}
              <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Quick launch
                </p>
                <h2
                  id="dashboard-calc-modal-title"
                  className="truncate text-lg font-semibold text-foreground sm:text-xl"
                >
                  {meta.title}
                </h2>
                {liveSnapshot ? (
                  <p
                    className={cn(
                      "dashboard-modal-stat mt-1 text-sm font-semibold text-foreground"
                    )}
                  >
                    {liveSnapshot}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex size-9 shrink-0 items-center justify-center rounded-none border border-border/60 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                aria-label="Close calculator"
              >
                <X className="size-5" />
              </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              <CalculatorPanel
                id={calculatorId}
                onResultSnapshot={handleSnapshot}
              />
            </div>

            {nextStep ? (
              <div className="shrink-0 border-t border-border/40 bg-muted/20 px-4 py-3 sm:px-5">
                <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  Next steps
                </p>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={cn(
                    "flat-subpanel mt-2 flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left",
                    "transition-colors hover:bg-muted/40",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {nextStep.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {nextStep.reason}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                </button>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
