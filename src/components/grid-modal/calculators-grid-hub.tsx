import { WattQuickEcosystem } from "@/components/home/wattquick-ecosystem";
import { CategoryNavigationGrid } from "@/components/grid-modal/category-navigation-grid";
import { GridShell } from "@/components/grid-modal/grid-shell";
import type { LegalDocId } from "@/lib/legal-types";
import dynamic from "next/dynamic";

const PlatformOverview = dynamic(
  () =>
    import("@/components/grid-modal/platform-overview").then((mod) => ({
      default: mod.PlatformOverview,
    })),
  {
    ssr: true,
    loading: () => null,
  }
);

type CalculatorsGridHubProps = {
  /** Deep-link into LegalModal (used by /privacy and /terms). */
  initialLegalDoc?: LegalDocId | null;
};

/** Hub: ecosystem map entry point for Grid-to-Modal. */
export function CalculatorsGridHub({
  initialLegalDoc = null,
}: CalculatorsGridHubProps = {}) {
  return (
    <GridShell
      initialLegalDoc={initialLegalDoc}
      title="WattQuick Engineering Ecosystem"
      description="Advanced engineering tools, real-world calculators, and interactive system diagnostics for battery, solar, EV, and power infrastructure."
    >
      <WattQuickEcosystem />
      <CategoryNavigationGrid />
      <PlatformOverview />
    </GridShell>
  );
}
