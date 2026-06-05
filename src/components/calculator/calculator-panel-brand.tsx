/** Centered WattQuick mark for calculator command panels */
export function CalculatorPanelBrand() {
  return (
    <div className="calculator-command__brand flex items-center justify-center gap-2.5 pb-1">
      <span className="flex items-center gap-1" aria-hidden>
        <span className="size-1.5 rounded-none bg-blue-400" />
        <span className="size-1.5 rounded-none bg-blue-500" />
        <span className="size-1.5 rounded-none bg-violet-500" />
      </span>
      <span className="text-lg leading-none tracking-tight sm:text-xl">
        <span className="font-bold text-primary">Watt</span>
        <span className="font-light text-foreground">Quick</span>
      </span>
    </div>
  );
}
