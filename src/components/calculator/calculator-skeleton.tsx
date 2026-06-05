import { cn } from "@/lib/utils";

export function CalculatorSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-lg animate-pulse px-4 pb-16 pt-6 sm:max-w-2xl sm:px-6 sm:pb-20 sm:pt-10",
        className
      )}
    >
      <div className="mb-8 h-5 w-32 rounded-lg bg-muted" />
      <div className="mb-10 space-y-4">
        <div className="flex gap-3">
          <div className="size-12 rounded-2xl bg-muted" />
          <div className="h-6 w-20 rounded-full bg-muted" />
        </div>
        <div className="h-8 w-3/4 max-w-sm rounded-lg bg-muted" />
        <div className="h-5 w-full max-w-md rounded-lg bg-muted/80" />
      </div>
      <div className="space-y-6 rounded-3xl border border-border/40 bg-card/50 p-6">
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn("space-y-2", i === 3 && "sm:col-span-2")}>
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-12 rounded-xl bg-muted/80" />
            </div>
          ))}
        </div>
        <div className="h-px bg-border/60" />
        <div className="space-y-3 rounded-2xl bg-muted/30 p-8">
          <div className="h-3 w-28 rounded bg-muted" />
          <div className="h-14 w-40 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
