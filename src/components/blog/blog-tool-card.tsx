import { ArrowUpRight } from "lucide-react";
import { CalculatorRatingSummary } from "@/components/calculator/calculator-rating-summary";
import { ContentToolLaunchLink } from "@/components/content/content-tool-launch-link";
import type { CalculatorId } from "@/lib/calculators";
import { getCalculatorMeta } from "@/lib/calculators/registry";
import {
  categoryThemeVars,
  getCategoryTheme,
} from "@/lib/calculator-category-theme";
import { cn } from "@/lib/utils";

interface BlogToolCardProps {
  calculatorId: CalculatorId;
  articleSlug: string;
  /** Sidebar widget uses a compact layout */
  variant?: "embed" | "widget";
  className?: string;
}

export function BlogToolCard({
  calculatorId,
  articleSlug,
  variant = "embed",
  className,
}: BlogToolCardProps) {
  const meta = getCalculatorMeta(calculatorId);
  const Icon = meta.icon;
  const theme = getCategoryTheme(meta.category);
  const isWidget = variant === "widget";

  return (
    <aside
      className={cn(
        "blog-tool-card not-prose",
        isWidget && "blog-tool-card--widget",
        className
      )}
      aria-label={`Open tool: ${meta.title}`}
    >
      <div className="blog-tool-card__header">
        <span
          className="blog-tool-card__icon"
          style={categoryThemeVars(theme)}
          aria-hidden
        >
          <Icon className="size-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="blog-tool-card__eyebrow">
            {isWidget ? "Related tool" : "Interactive tool"}
          </p>
          <p className="blog-tool-card__title">{meta.title}</p>
          {!isWidget ? (
            <p className="blog-tool-card__description">{meta.description}</p>
          ) : (
            <p className="blog-tool-card__meta">
              {meta.tag} · instant results
            </p>
          )}
          <CalculatorRatingSummary
            calculatorId={meta.id}
            color={theme.color}
            className="mt-1.5"
          />
        </div>
      </div>

      <ContentToolLaunchLink
        calculatorHref={meta.href}
        calculatorId={meta.id}
        articleSlug={articleSlug}
        className="blog-tool-card__action"
      >
        Open tool
        <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
      </ContentToolLaunchLink>
    </aside>
  );
}
