import { getAllCalculatorMeta } from "@/lib/calculators";

export function SiteFooter() {
  const count = getAllCalculatorMeta().length;

  return (
    <footer className="mt-auto border-t border-border/50 py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        <p>
          WattQuick — {count} free battery &amp; power micro-calculators. Instant
          answers, no account required.
        </p>
      </div>
    </footer>
  );
}
