import { AdSenseInArticleUnit } from "@/components/adsense/adsense-in-article-unit";
import { ADSENSE_BLOG_IN_ARTICLE_SLOT } from "@/lib/adsense";
import { cn } from "@/lib/utils";

interface BlogAdSlotsProps {
  className?: string;
}

/** Live AdSense slots between the article header and body (same grid layout as placeholders). */
export function BlogAdSlots({ className }: BlogAdSlotsProps) {
  return (
    <aside
      className={cn("calculator-ad-slots", className)}
      aria-label="Advertisement"
    >
      <div className="calculator-ad-slots__grid">
        <div className="calculator-ad-slot calculator-ad-slot--live">
          <AdSenseInArticleUnit slotId={ADSENSE_BLOG_IN_ARTICLE_SLOT} />
        </div>
        <div className="calculator-ad-slot calculator-ad-slot--live">
          <AdSenseInArticleUnit slotId={ADSENSE_BLOG_IN_ARTICLE_SLOT} />
        </div>
      </div>
    </aside>
  );
}
