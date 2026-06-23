import { cn } from "@/lib/utils";

interface CalculatorAdSlotsProps {
  className?: string;
}

/** Two AdSense placeholders between the calculator workbench and guide content. */
export function CalculatorAdSlots({ className }: CalculatorAdSlotsProps) {
  return (
    <aside
      className={cn("calculator-ad-slots", className)}
      aria-label="Advertisement"
    >
      <div className="calculator-ad-slots__grid">
        <div className="calculator-ad-slot">
          <p className="calculator-ad-slot__label">AdSense coming soon</p>
        </div>
        <div className="calculator-ad-slot">
          <p className="calculator-ad-slot__label">AdSense coming soon</p>
        </div>
      </div>
    </aside>
  );
}
