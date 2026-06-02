import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorsDirectory } from "@/components/calculators-directory";
import { PageHeader, PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  description:
    "Browse 94 free battery, solar, EV, and power micro-calculators. Instant results with minimal inputs.",
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <PageShell className="max-w-3xl">
      <PageHeader
        title="All calculators"
        description="Full directory in a scannable list. Search or filter by category—results update as you type."
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
