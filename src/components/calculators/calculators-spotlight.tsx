import Link from "next/link";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

interface CalculatorsSpotlightProps {
  calculatorId: CalculatorId;
  className?: string;
}

export function CalculatorsSpotlight({
  calculatorId,
  className,
}: CalculatorsSpotlightProps) {
  const calculator = getCalculatorMeta(calculatorId);
  const Icon = calculator.icon;

  return (
    <article className={cn("calculators-spotlight", className)}>
      <div className="calculators-spotlight__glow" aria-hidden />

      <div className="calculators-spotlight__body">
        <div className="calculators-spotlight__icon-wrap" aria-hidden>
          <Icon className="size-7" strokeWidth={2} />
        </div>

        <div className="calculators-spotlight__copy">
          <p className="calculators-spotlight__eyebrow">Spotlight · Calculator of the week</p>
          <h2 className="calculators-spotlight__title">{calculator.title}</h2>
          <p className="calculators-spotlight__description">{calculator.description}</p>
        </div>
      </div>

      <Link href={calculator.href} className="calculators-spotlight__cta">
        Start calculation
      </Link>
    </article>
  );
}
