import { CalculatorCard } from "@/components/calculator-card";
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
    <section className={cn("space-y-4", className)} aria-labelledby="suggested-heading">
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
      <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
        {calculators.map((calc) => (
          <li key={calc.id}>
            <CalculatorCard calculator={calc} variant="related" />
          </li>
        ))}
      </ul>
    </section>
  );
}
