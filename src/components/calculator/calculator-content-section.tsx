import {
  CALCULATOR_CONTENT_HEADINGS,
  getCalculatorContentSection,
} from "@/data/calculator-content";
import type { CalculatorId } from "@/lib/calculators";

interface CalculatorContentSectionProps {
  id: CalculatorId;
}

/**
 * Desktop-only editorial block below the calculator results.
 * Copy is driven by `src/data/calculator-content.ts` per tool slug.
 */
export function CalculatorContentSection({ id }: CalculatorContentSectionProps) {
  const { title, formula, example } = getCalculatorContentSection(id);

  return (
    <section
      aria-label="Calculator guide"
      className="mt-12 hidden w-full max-w-[44rem] lg:block lg:mt-16"
    >
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>

      <div className="mt-8 space-y-8">
        <section>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {CALCULATOR_CONTENT_HEADINGS.formula}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-300">
            {formula}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {CALCULATOR_CONTENT_HEADINGS.example}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-300">
            {example}
          </p>
        </section>
      </div>
    </section>
  );
}
