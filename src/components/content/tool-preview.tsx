import { BlogToolCard } from "@/components/blog/blog-tool-card";
import type { CalculatorId } from "@/lib/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";
import { cn } from "@/lib/utils";

interface ToolPreviewProps {
  toolId: string;
  articleSlug: string;
  className?: string;
}

/**
 * In-article tool card — navigates to the full calculator page.
 */
export function ToolPreview({ toolId, articleSlug, className }: ToolPreviewProps) {
  if (!isCalculatorId(toolId)) {
    return null;
  }

  return (
    <BlogToolCard
      calculatorId={toolId as CalculatorId}
      articleSlug={articleSlug}
      variant="embed"
      className={cn("my-8 sm:my-10", className)}
    />
  );
}
