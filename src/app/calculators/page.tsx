import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorsDirectory } from "@/components/calculators-directory";
import { PageHeader, PageShell } from "@/components/page-shell";
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
    <PageShell className="max-w-6xl">
      <PageHeader
        title="All calculators"
        description="Tap a cube to read what it does, then open the calculator or keep browsing. Search and category filters update the grid as you type."
      />
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
