import { AdSenseInArticleUnit } from "@/components/adsense/adsense-in-article-unit";
import { ADSENSE_TOOL_IN_ARTICLE_SLOT } from "@/lib/adsense";
import { cn } from "@/lib/utils";

interface ToolAdSlotsProps {
  className?: string;
}

/** Live AdSense slots between the calculator workbench and guide content. */
export function ToolAdSlots({ className }: ToolAdSlotsProps) {
  return (
    <aside
      className={cn("calculator-ad-slots", className)}
      aria-label="Advertisement"
    >
      <div className="calculator-ad-slots__grid">
        <div className="calculator-ad-slot calculator-ad-slot--live">
          <AdSenseInArticleUnit slotId={ADSENSE_TOOL_IN_ARTICLE_SLOT} />
        </div>
        <div className="calculator-ad-slot calculator-ad-slot--live">
          <AdSenseInArticleUnit slotId={ADSENSE_TOOL_IN_ARTICLE_SLOT} />
        </div>
      </div>
    </aside>
  );
}
