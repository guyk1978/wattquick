import type { CalculatorMeta } from "@/lib/calculators";
import { CalculatorPageHeader } from "./calculator-page-header";
import { CalculatorPageLayout } from "./calculator-page-layout";
import { cn } from "@/lib/utils";

interface CalculatorLayoutProps {
  calculator: CalculatorMeta;
  children: React.ReactNode;
  contentSection?: React.ReactNode;
  seoContent?: React.ReactNode;
  className?: string;
}

export function CalculatorLayout({
  calculator,
  children,
  contentSection,
  seoContent,
  className,
}: CalculatorLayoutProps) {
  return (
    <div className={cn("calculator-route calculator-route--status-ui calculator-route--blueprint", className)}>
      <CalculatorPageLayout
        calculatorId={calculator.id}
        pageHeader={<CalculatorPageHeader calculator={calculator} />}
        contentSection={contentSection}
        bottomContent={
          seoContent ? (
            <aside className="flat-subpanel p-4 sm:p-5" aria-label="Calculator guide">
              {seoContent}
            </aside>
          ) : null
        }
      >
        {children}
      </CalculatorPageLayout>
    </div>
  );
}
