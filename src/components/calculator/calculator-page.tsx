import { getCalculatorMeta, type CalculatorId } from "@/lib/calculators";
import { CalculatorLayout } from "./calculator-layout";
import { CalculatorPanel } from "./calculator-panel";
import { CalculatorSeoContent } from "./calculator-seo-content";

interface CalculatorPageProps {
  id: CalculatorId;
}

/** Server wrapper: layout + interactive panel + SEO content. */
export function CalculatorPage({ id }: CalculatorPageProps) {
  const meta = getCalculatorMeta(id);

  return (
    <CalculatorLayout
      calculator={meta}
      seoContent={<CalculatorSeoContent id={id} />}
    >
      <CalculatorPanel id={id} />
    </CalculatorLayout>
  );
}
