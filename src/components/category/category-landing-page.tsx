import Link from "next/link";
import { CategoryCalculatorGrid } from "@/components/category-calculator-grid";
import { PageHeader, PageShell } from "@/components/page-shell";
import { getCategorySeoContent } from "@/data/category-seo-content";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import type { CalculatorMeta } from "@/lib/calculators";
import { getCategoryPageTitle } from "@/lib/category-routes";

interface CategoryLandingPageProps {
  category: CalculatorCategory;
  calculators: CalculatorMeta[];
}

export function CategoryLandingPage({
  category,
  calculators,
}: CategoryLandingPageProps) {
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const summary = CALCULATOR_CATEGORY_DESCRIPTIONS[category];
  const seo = getCategorySeoContent(category);

  return (
    <PageShell className="max-w-6xl">
      <Link
        href="/calculators/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← All calculators
      </Link>

      <PageHeader
        title={getCategoryPageTitle(category)}
        description={summary}
      />

      <section
        aria-labelledby="category-seo-intro-heading"
        className="category-seo-intro border-b border-border/50 pb-12"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {seo.eyebrow}
        </p>
        <h2 id="category-seo-intro-heading" className="sr-only">
          About {label} calculators
        </h2>
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-800 dark:text-slate-300 sm:text-base">
          {seo.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="category-tools-heading" className="pt-12">
        <h2
          id="category-tools-heading"
          className="mb-8 text-xl font-semibold tracking-tight text-foreground"
        >
          All {label.toLowerCase()} tools
        </h2>
        <CategoryCalculatorGrid calculators={calculators} />
      </section>
    </PageShell>
  );
}
