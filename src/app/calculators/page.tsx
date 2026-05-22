import type { Metadata } from "next";
import { CalculatorExplorer } from "@/components/calculator-explorer";
import { PageHeader, PageShell } from "@/components/page-shell";
import { CALCULATOR_SLUGS } from "@/data/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  description:
    "Browse 79+ free battery, solar, EV, and power micro-calculators. Instant results with minimal inputs.",
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <PageShell className="max-w-5xl">
      <PageHeader
        title="All calculators"
        description="Search or filter by category. Every tool updates live as you type."
      />
      <CalculatorExplorer ids={[...CALCULATOR_SLUGS]} />
    </PageShell>
  );
}
