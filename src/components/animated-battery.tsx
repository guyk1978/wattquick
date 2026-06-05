import { cn } from "@/lib/utils";

interface AnimatedBatteryProps {
  variant?: "mini" | "hero";
  className?: string;
}

/** Compact charging battery indicator for header branding. */
export function AnimatedBattery({
  variant = "mini",
  className,
}: AnimatedBatteryProps) {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative box-border flex h-[13px] w-6 items-center rounded-[3px] border-2 border-slate-400 bg-transparent p-px",
          className
        )}
        aria-hidden
      >
        <div className="battery-level h-full w-0 rounded-[1px] bg-red-500" />
        <div className="absolute right-[-4px] top-0.5 h-[5px] w-0.5 rounded-r-sm bg-slate-400" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "header-battery-mini ml-2 inline-flex items-center align-middle",
        className
      )}
      title="WattQuick Power"
    >
      <div
        className="relative box-border flex h-2.5 w-[18px] items-center rounded-[2px] border-[1.5px] border-slate-400 bg-transparent p-px"
        aria-hidden
      >
        <div className="battery-level-mini h-full w-0 rounded-[0.5px] bg-red-500" />
        <div className="absolute right-[-3px] top-[1.5px] h-1 w-[1.5px] rounded-r-[0.5px] bg-slate-400" />
      </div>
    </div>
  );
}

interface HeroBatteryBadgeProps {
  className?: string;
}

/** Pill badge with hero-sized animated battery for the homepage. */
export function HeroBatteryBadge({ className }: HeroBatteryBadgeProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 rounded-none border border-border/60 bg-card px-3 py-1.5 text-sm font-semibold tracking-wide text-foreground",
        className
      )}
    >
      <AnimatedBattery variant="hero" className="relative z-[1]" />
      <span className="relative z-[1]">Battery &amp; power micro-tools</span>
    </div>
  );
}
