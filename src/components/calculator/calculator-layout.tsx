import { getRelatedCalculators, type CalculatorMeta } from "@/lib/calculators";
import { CalculatorPageHeader } from "./calculator-page-header";
import { CalculatorPageLayout } from "./calculator-page-layout";
import { SuggestedCalculators } from "./suggested-calculators";
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
  const suggestions = getRelatedCalculators(calculator.id);

  return (
    <div className={cn("calculator-route", className)}>
      <CalculatorPageLayout
        calculatorId={calculator.id}
        pageHeader={<CalculatorPageHeader calculator={calculator} />}
        contentSection={contentSection}
        bottomContent={
          <>
            {seoContent ? (
              <aside className="flat-subpanel p-6 sm:p-8" aria-label="Calculator guide">
                {seoContent}
              </aside>
            ) : null}
            <div className="calculator-route__suggestions border-t border-border/50 pt-10">
              <SuggestedCalculators calculators={suggestions} />
            </div>
          </>
        }
      >
        {children}
      </CalculatorPageLayout>
    </div>
  );
}
