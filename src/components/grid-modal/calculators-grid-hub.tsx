import { WattQuickEcosystem } from "@/components/home/wattquick-ecosystem";
import { GridShell } from "@/components/grid-modal/grid-shell";
import { PlatformOverview } from "@/components/grid-modal/platform-overview";
import { getAllCalculatorMeta } from "@/lib/calculators";
import type { LegalDocId } from "@/lib/legal-types";

type CalculatorsGridHubProps = {
  /** Deep-link into LegalModal (used by /privacy and /terms). */
  initialLegalDoc?: LegalDocId | null;
};

/** Hub: ecosystem map entry point for Grid-to-Modal. */
export function CalculatorsGridHub({
  initialLegalDoc = null,
}: CalculatorsGridHubProps = {}) {
  const count = getAllCalculatorMeta().length;

  return (
    <GridShell
      initialLegalDoc={initialLegalDoc}
      title="Calculators"
      description={`${count} free battery, solar, EV, and power tools. Pick a category, then open a calculator.`}
    >
      <WattQuickEcosystem />
      <PlatformOverview />
    </GridShell>
  );
}
