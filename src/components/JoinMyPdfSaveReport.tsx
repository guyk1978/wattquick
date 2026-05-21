"use client";

import { FileDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { JOIN_MY_PDF_URL } from "@/lib/partners";
import { cn } from "@/lib/utils";

interface JoinMyPdfSaveReportProps {
  calculatorTitle: string;
  resultLabel: string;
  value: string | null;
  unit?: string;
  detail?: string | null;
  values: Record<string, string>;
  fieldLabels: Record<string, string>;
  className?: string;
}

function buildReportText({
  calculatorTitle,
  resultLabel,
  value,
  unit,
  detail,
  values,
  fieldLabels,
  pageUrl,
}: {
  calculatorTitle: string;
  resultLabel: string;
  value: string;
  unit?: string;
  detail?: string | null;
  values: Record<string, string>;
  fieldLabels: Record<string, string>;
  pageUrl: string;
}): string {
  const lines = [
    "WattQuick — Calculation Report",
    `Calculator: ${calculatorTitle}`,
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "--- Inputs ---",
  ];

  for (const [id, label] of Object.entries(fieldLabels)) {
    const v = values[id]?.trim();
    if (v) lines.push(`${label}: ${v}`);
  }

  lines.push("", "--- Result ---", `${resultLabel}: ${value}${unit ? ` ${unit}` : ""}`);
  if (detail) lines.push(`Detail: ${detail}`);
  lines.push("", `Source: ${pageUrl}`);

  return lines.join("\n");
}

export function JoinMyPdfSaveReport({
  calculatorTitle,
  resultLabel,
  value,
  unit,
  detail,
  values,
  fieldLabels,
  className,
}: JoinMyPdfSaveReportProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const hasResult = value !== null;

  const handleSaveReport = useCallback(async () => {
    if (!hasResult || value === null) return;

    const report = buildReportText({
      calculatorTitle,
      resultLabel,
      value,
      unit,
      detail,
      values,
      fieldLabels,
      pageUrl: pageUrl || window.location.href,
    });

    try {
      await navigator.clipboard.writeText(report);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      /* clipboard unavailable — still open partner */
    }

    window.open(JOIN_MY_PDF_URL, "_blank", "noopener,noreferrer");
  }, [
    calculatorTitle,
    detail,
    fieldLabels,
    hasResult,
    pageUrl,
    resultLabel,
    unit,
    value,
    values,
  ]);

  if (!hasResult) return null;

  return (
    <section
      className={cn(
        "rounded-xl border border-border/50 bg-muted/20 px-4 py-3",
        className
      )}
      aria-label="Save calculation report"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Save Report:</span>{" "}
          Download your battery and solar calculation specs as a private PDF via{" "}
          <span className="font-medium text-foreground">JoinMyPDF</span>.
          {status === "copied" ? (
            <span className="mt-1 block text-xs text-primary">
              Specs copied — paste into JoinMyPDF to build your PDF.
            </span>
          ) : null}
        </p>
        <button
          type="button"
          onClick={handleSaveReport}
          className={cn(
            "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold",
            "border border-primary/30 bg-primary/10 text-foreground",
            "shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)] transition-colors",
            "hover:border-primary/50 hover:bg-primary/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <FileDown className="size-4 text-[#3b82f6]" aria-hidden />
          {status === "copied" ? "Open JoinMyPDF" : "Save via JoinMyPDF"}
        </button>
      </div>
    </section>
  );
}
