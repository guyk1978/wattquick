import { cn } from "@/lib/utils";

interface CalculatorsSpotlightAdSlotProps {
  className?: string;
}

/** Full-width AdSense placeholder on the calculators hub hero. */
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
          "calculators-tech-spotlight-ad__frame flex h-full min-h-[15rem] w-full items-center justify-center",
          "border border-dashed border-black/15 bg-transparent px-4 py-6",
          "dark:border-white/15"
        )}
      >
        <p className="calculators-tech-spotlight-ad__label text-center text-sm font-medium tracking-wide text-black dark:text-white">
          AdSense coming soon
        </p>
      </div>
    </aside>
  );
}
