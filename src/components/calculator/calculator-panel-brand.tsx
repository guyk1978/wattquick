/** Centered WattQuick mark for calculator command panels */
export function CalculatorPanelBrand() {
  return (
    <div className="calculator-command__brand flex items-center justify-center gap-2.5 pb-1">
      <span className="flex items-center gap-1" aria-hidden>
        <span className="size-1.5 rounded-full bg-blue-400" />
        <span className="size-1.5 rounded-full bg-blue-500" />
        <span className="size-1.5 rounded-full bg-violet-500" />
      </span>
      <span className="text-lg leading-none tracking-tight sm:text-xl">
        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-violet-500 bg-clip-text font-bold text-transparent">
          Watt
        </span>
        <span className="font-light text-foreground">Quick</span>
      </span>
    </div>
  );
}
