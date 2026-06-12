import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorsDirectory } from "@/components/calculators-directory";
import { PageShell } from "@/components/page-shell";
import { getAllCalculatorMeta } from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

const calculatorCount = getAllCalculatorMeta().length;

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  description: `Browse ${calculatorCount} free battery, solar, EV, and power micro-calculators. Instant results with minimal inputs.`,
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <PageShell className="calculators-hub-page max-w-[80rem]">
      <header className="calculators-hub-page__header">
        <p className="calculators-hub-page__eyebrow">Application launcher</p>
        <h1 className="calculators-hub-page__title">All calculators</h1>
        <p className="calculators-hub-page__description">
          Browse {calculatorCount} professional power tools. Search or filter by
          category, then open any calculator instantly.
        </p>
      </header>

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading directory…</p>
        }
      >
        <CalculatorsDirectory />
      </Suspense>
    </PageShell>
  );
}
