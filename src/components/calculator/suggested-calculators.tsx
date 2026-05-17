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
    <section className={cn("space-y-5", className)} aria-labelledby="suggested-heading">
      <div className="space-y-1">
        <h2
          id="suggested-heading"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          More tools in this category and beyond
        </p>
      </div>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 sm:gap-4">
        {calculators.map((calc, i) => (
          <li
            key={calc.id}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-400"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CalculatorCard calculator={calc} variant="compact" />
          </li>
        ))}
      </ul>
    </section>
  );
}
