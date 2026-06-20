import { cn } from "@/lib/utils";

interface CalculatorEngineeringStampProps {
  className?: string;
}

export function CalculatorEngineeringStamp({
  className,
}: CalculatorEngineeringStampProps) {
  return (
    <div
      className={cn("calculator-engineering-stamp", className)}
      aria-hidden
    >
      <div className="calculator-engineering-stamp__seal">
        <span className="calculator-engineering-stamp__seal-inner">WQ</span>
      </div>
      <div className="calculator-engineering-stamp__copy">
        <p className="calculator-engineering-stamp__code">SPEC_REFACTOR</p>
        <p className="calculator-engineering-stamp__label">Engineering Stamp</p>
      </div>
    </div>
  );
}
