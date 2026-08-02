import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GridSectionProps = {
  /** Visible section heading (H2). */
  title: string;
  /** Optional short supporting line under the title. */
  description?: string;
  /** Stable id for aria-labelledby; auto-derived from title when omitted. */
  headingId?: string;
  children: ReactNode;
  className?: string;
};

function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Labeled block wrapper for tool grids and category grids on hub / category pages.
 */
export function GridSection({
  title,
  description,
  headingId,
  children,
  className,
}: GridSectionProps) {
  const id = headingId ?? `grid-section-${slugifyHeading(title)}`;

  return (
    <section
      className={cn("wq-grid-section", className)}
      aria-labelledby={id}
    >
      <header className="wq-grid-section__header">
        <h2 id={id} className="wq-grid-section__title">
          {title}
        </h2>
        {description ? (
          <p className="wq-grid-section__description">{description}</p>
        ) : null}
      </header>
      <div className="wq-grid-section__body">{children}</div>
    </section>
  );
}
