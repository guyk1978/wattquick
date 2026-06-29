import { AdSenseInArticleUnit } from "@/components/adsense/adsense-in-article-unit";
import { ADSENSE_SITE_IN_ARTICLE_SLOT } from "@/lib/adsense";
import { cn } from "@/lib/utils";

interface CalculatorsSpotlightAdSlotProps {
  className?: string;
}

/** Full-width AdSense unit on the calculators hub hero. */
export function CalculatorsSpotlightAdSlot({
  className,
}: CalculatorsSpotlightAdSlotProps) {
  return (
    <aside
      className={cn(
        "calculators-tech-spotlight-ad relative flex min-h-[15rem] w-full items-center justify-center overflow-hidden rounded-2xl",
        "border border-black/10 bg-transparent dark:border-white/10",
        className
      )}
      aria-label="Advertisement"
    >
      <div
        className={cn(
          "calculators-tech-spotlight-ad__frame calculators-tech-spotlight-ad__frame--live",
          "flex h-full min-h-[15rem] w-full items-center justify-center overflow-hidden",
          "bg-transparent px-4 py-6"
        )}
      >
        <AdSenseInArticleUnit slotId={ADSENSE_SITE_IN_ARTICLE_SLOT} />
      </div>
    </aside>
  );
}
