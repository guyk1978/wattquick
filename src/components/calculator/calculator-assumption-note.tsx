import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalculatorAssumptionNoteProps {
  children: ReactNode;
  className?: string;
}

/** Small matte note below calculator results explaining model assumptions. */
export function CalculatorAssumptionNote({
  children,
  className,
}: CalculatorAssumptionNoteProps) {
  return (
    <p
      className={cn(
        "flat-alert px-3 py-2.5 text-xs leading-relaxed text-muted-foreground",
        className
      )}
    >
      <span className="font-semibold text-foreground">Note: </span>
      {children}
    </p>
  );
}
