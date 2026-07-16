import type { Metadata } from "next";
import { CalculatorAdSlots } from "@/components/calculator/calculator-ad-slots";
import { EnergyWizard } from "@/components/EnergyWizard";
import { GlobalPageLayout } from "@/components/layout/global-page-layout";
import { createPageMetadata } from "@/lib/seo";
import { buildWizardCatalog } from "@/lib/wizard-resolve";

export const metadata: Metadata = createPageMetadata({
  title: "WattQuick Wizard — Energy Planning Paths",
  description:
    "Answer two questions and get a personalized step-by-step path through calculators and guides for solar, backup power, mobility, and bill savings.",
  path: "/wizard",
  keywords: [
    "energy planning wizard",
    "solar planning steps",
    "home backup calculator path",
    "ev charging planning",
  ],
});

export default function WizardPage() {
  const catalog = buildWizardCatalog();

  return (
    <GlobalPageLayout
      breadcrumbs={[{ label: "Wizard" }]}
      title="Start planning"
      description="The WattQuick Wizard builds a structured path—tools and articles in the order that matches your goal and experience level."
    >
      <CalculatorAdSlots />
      <EnergyWizard catalog={catalog} />
    </GlobalPageLayout>
  );
}
