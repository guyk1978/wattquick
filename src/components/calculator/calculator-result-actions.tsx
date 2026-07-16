"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface CalculatorResultActionsProps {
  label: string;
  value: string;
  unit?: string;
  detail?: string | null;
  className?: string;
}

function buildResultText(
  label: string,
  value: string,
  unit?: string,
  detail?: string | null
): string {
  const primary = unit ? `${value} ${unit}` : value;
  const lines = [`${label}: ${primary}`];
  if (detail?.trim()) lines.push(detail.trim());
  if (typeof window !== "undefined") {
    lines.push(window.location.href);
  }
  return lines.join("\n");
}

/** Compact Copy / Share controls shown next to the primary result. */
export function CalculatorResultActions({
  label,
  value,
  unit,
  detail,
  className,
}: CalculatorResultActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = buildResultText(label, value, unit, detail);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [detail, label, unit, value]);

  const handleShare = useCallback(async () => {
    const text = buildResultText(label, value, unit, detail);
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: label, text, url });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    await handleCopy();
  }, [detail, handleCopy, label, unit, value]);

  return (
    <div
      className={cn("calculator-result-actions", className)}
      role="group"
      aria-label="Result actions"
    >
      <button
        type="button"
        className="calculator-result-actions__btn"
        onClick={handleCopy}
        aria-label={copied ? "Result copied" : "Copy result"}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <button
        type="button"
        className="calculator-result-actions__btn calculator-result-actions__btn--accent"
        onClick={handleShare}
        aria-label="Share result"
      >
        <Share2 className="size-3.5" aria-hidden />
        <span>Share</span>
      </button>
    </div>
  );
}
