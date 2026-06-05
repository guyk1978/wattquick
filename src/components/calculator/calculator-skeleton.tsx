import { cn } from "@/lib/utils";

export function CalculatorSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-4xl animate-pulse px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-10",
        className
      )}
    >
      <div className="mb-8 h-5 w-32 rounded-none bg-muted" />
      <div className="mb-10 space-y-4">
        <div className="flex gap-3">
          <div className="size-11 rounded-none bg-muted" />
          <div className="h-6 w-20 rounded-none bg-muted" />
        </div>
        <div className="h-8 w-3/4 max-w-sm rounded-none bg-muted" />
        <div className="h-5 w-full max-w-md rounded-none bg-muted/80" />
      </div>
      <div className="flat-panel space-y-5 p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={cn("space-y-2", i === 3 && "sm:col-span-2")}>
              <div className="h-4 w-24 rounded-none bg-muted" />
              <div className="h-10 rounded-none bg-muted/80" />
            </div>
          ))}
        </div>
        <div className="h-px bg-border/60" />
        <div className="flat-subpanel space-y-2 p-5">
          <div className="h-3 w-28 rounded-none bg-muted" />
          <div className="h-12 w-40 rounded-none bg-muted" />
        </div>
      </div>
    </div>
  );
}
