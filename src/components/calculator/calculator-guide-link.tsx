import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import {
  getGuideLinkLabelForCalculator,
  getGuidePathForCalculator,
} from "@/lib/calculators/calculator-landings-registry";
import { cn } from "@/lib/utils";

interface CalculatorGuideLinkProps {
  calculatorId: CalculatorId;
  className?: string;
}

/** Sole link from a calculator tool to its dedicated guide landing page. */
export function CalculatorGuideLink({
  calculatorId,
  className,
}: CalculatorGuideLinkProps) {
  const href = getGuidePathForCalculator(calculatorId);
  const label = getGuideLinkLabelForCalculator(calculatorId);

  if (!href || !label) {
    return null;
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline",
        className
      )}
    >
      <BookOpen className="size-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}
