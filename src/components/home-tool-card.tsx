import type { CalculatorMeta } from "@/lib/calculators";
import { CalculatorAppCard } from "@/components/calculator-app-card";
import { cn } from "@/lib/utils";

interface HomeToolCardProps {
  calculator: CalculatorMeta;
  className?: string;
}

export function HomeToolCard({ calculator, className }: HomeToolCardProps) {
  return (
    <CalculatorAppCard
      calculator={calculator}
      variant="default"
      className={cn("home-tool-card", className)}
    />
  );
}
