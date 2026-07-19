import Link from "next/link";
import type { CalculatorId } from "@/lib/calculators";
import { getRelatedCalculators } from "@/lib/calculators/related";
import { cn } from "@/lib/utils";

type ToolModalRelatedProps = {
  id: CalculatorId;
  className?: string;
};

/** RELATED tab: sibling calculators resolved from suggestions + category. */
export function ToolModalRelated({ id, className }: ToolModalRelatedProps) {
  const related = getRelatedCalculators(id);

  if (related.length === 0) return null;

  return (
    <section
      className={cn("tool-modal-related", className)}
      aria-label="Related tools"
    >
      <h3 className="tool-modal-related__title">Related tools</h3>
      <ul className="wq-tool-grid tool-modal-related__grid" role="list">
        {related.map((tool) => {
          const Icon = tool.icon;
          return (
            <li key={tool.id}>
              <Link href={tool.href} className="wq-tool-card">
                <span className="wq-tool-card__icon" aria-hidden>
                  <Icon strokeWidth={1.75} className="size-5" />
                </span>
                <span className="wq-tool-card__title">{tool.title}</span>
                <span className="wq-tool-card__meta">{tool.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
