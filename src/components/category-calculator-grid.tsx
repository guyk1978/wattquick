import { CategoryCalculatorListItem } from "@/components/category-calculator-list-item";
import type { CalculatorMeta } from "@/lib/calculators";

interface CategoryCalculatorGridProps {
  calculators: CalculatorMeta[];
}

/** Compact list layout for category calculator pages */
export function CategoryCalculatorGrid({
  calculators,
}: CategoryCalculatorGridProps) {
  if (calculators.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No calculators in this category yet.</p>
    );
  }

  return (
    <ul
      className="category-calculator-list m-0 list-none p-0"
      role="list"
      aria-label="Calculators in this category"
    >
      {calculators.map((calc) => (
        <CategoryCalculatorListItem key={calc.id} calculator={calc} />
      ))}
    </ul>
  );
}
