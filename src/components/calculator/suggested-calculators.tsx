import { CalculatorAppCard } from "@/components/calculator-app-card";
import type { CalculatorMeta } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface SuggestedCalculatorsProps {
  calculators: CalculatorMeta[];
  title?: string;
  className?: string;
}

export function SuggestedCalculators({
  calculators,
  title = "Related calculators",
  className,
}: SuggestedCalculatorsProps) {
  if (calculators.length === 0) return null;

  return (
    <section className={cn("space-y-5", className)} aria-labelledby="suggested-heading">
      <div className="space-y-0.5">
        <h2
          id="suggested-heading"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>
        <p className="text-xs text-muted-foreground">
          More tools in this category and beyond
        </p>
      </div>
      <ul
        className="calculators-hub__grid list-none p-0"
        aria-label="Related calculator apps"
      >
        {calculators.map((calc) => (
          <li key={calc.id} className="calculators-hub__grid-cell">
            <CalculatorAppCard
              calculator={calc}
              variant="hub"
              actionLabel="Open app"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
