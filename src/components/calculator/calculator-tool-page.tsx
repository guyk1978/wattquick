import { getCalculatorMeta, type CalculatorId } from "@/lib/calculators";
import { CalculatorLayout } from "./calculator-layout";
import { CalculatorPanel } from "./calculator-panel";

interface CalculatorToolPageProps {
  id: CalculatorId;
}

/** Calculator-only page: interactive tool without SEO article blocks. */
export function CalculatorToolPage({ id }: CalculatorToolPageProps) {
  const meta = getCalculatorMeta(id);

  return (
    <CalculatorLayout calculator={meta}>
      <CalculatorPanel id={id} />
    </CalculatorLayout>
  );
}
