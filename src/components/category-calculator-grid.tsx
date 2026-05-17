import { CalculatorCard } from "@/components/calculator-card";
import type { CalculatorMeta } from "@/lib/calculators";

interface CategoryCalculatorGridProps {
  calculators: CalculatorMeta[];
}

export function CategoryCalculatorGrid({
  calculators,
}: CategoryCalculatorGridProps) {
  if (calculators.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No calculators in this category yet.</p>
    );
  }

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
      {calculators.map((calc) => (
        <li key={calc.id}>
          <CalculatorCard calculator={calc} />
        </li>
      ))}
    </ul>
  );
}
