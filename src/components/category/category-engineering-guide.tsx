import {
  getCategorySeoContent,
  type CategorySeoContent,
} from "@/data/category-seo-content";
import {
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import { cn } from "@/lib/utils";

type CategoryEngineeringGuideProps = {
  category: CalculatorCategory;
  className?: string;
  /** Optional override — defaults to category SEO content. */
  content?: CategorySeoContent;
};

/**
 * Mid-page marketing / SEO guide on category landings.
 * Unique copy per category; accents inherit `--category-color` from GridShell.
 */
export function CategoryEngineeringGuide({
  category,
  className,
  content,
}: CategoryEngineeringGuideProps) {
  const seo = content ?? getCategorySeoContent(category);
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const headingId = `category-guide-${category}`;

  return (
    <section
      className={cn("wq-cat-guide", className)}
      aria-labelledby={headingId}
    >
      <header className="wq-cat-guide__header">
        <p className="wq-cat-guide__eyebrow">Engineering &amp; Practical Guide</p>
        <h2 id={headingId} className="wq-cat-guide__title">
          {seo.guideTitle}
        </h2>
        <p className="wq-cat-guide__lead">{seo.lead}</p>
      </header>

      <ul className="wq-cat-guide__highlights" role="list">
        {seo.highlights.map((item) => (
          <li key={item.title} className="wq-cat-guide__highlight">
            <h3 className="wq-cat-guide__highlight-title">{item.title}</h3>
            <p className="wq-cat-guide__highlight-body">{item.body}</p>
          </li>
        ))}
      </ul>

      <div className="wq-cat-guide__body">
        <h3 className="wq-cat-guide__body-heading">
          Deep dive: {label} tools in practice
        </h3>
        {seo.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
