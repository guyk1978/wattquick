import { BlogToolCard } from "@/components/blog/blog-tool-card";
import type { CalculatorId } from "@/lib/calculators";
import { cn } from "@/lib/utils";

export type QuickLaunchPlacement = "sidebar" | "footer";

interface BlogQuickLaunchWidgetProps {
  calculatorId: CalculatorId;
  articleSlug: string;
  placement?: QuickLaunchPlacement;
  className?: string;
}

export function BlogQuickLaunchWidget({
  calculatorId,
  articleSlug,
  placement = "sidebar",
  className,
}: BlogQuickLaunchWidgetProps) {
  return (
    <BlogToolCard
      calculatorId={calculatorId}
      articleSlug={articleSlug}
      variant="widget"
      className={cn(
        placement === "sidebar" ? "blog-tool-card--sticky" : undefined,
        className
      )}
    />
  );
}
