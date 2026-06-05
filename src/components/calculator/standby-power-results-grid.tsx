import { cn } from "@/lib/utils";

export type StandbyPowerResultRow = {
  id: string;
  label: string;
  display: string;
  /** Long prose (e.g. comparison) — 2-line clamp */
  multiline?: boolean;
  /** Highlight value in accent yellow */
  accent?: boolean;
};

interface StandbyPowerResultsGridProps {
  rows: StandbyPowerResultRow[];
  className?: string;
}

/** Compact 2-column results grid for Standby Power Aggregator dashboard */
export function StandbyPowerResultsGrid({
  rows,
  className,
}: StandbyPowerResultsGridProps) {
  if (rows.length === 0) return null;

  return (
    <div className={cn("standby-power-results-grid", className)}>
      {rows.map((row) => (
        <div
          key={row.id}
          className={cn(
            "standby-power-results-grid__row",
            row.multiline && "standby-power-results-grid__row--multiline"
          )}
        >
          <span className="standby-power-results-grid__label">{row.label}</span>
          <span
            className={cn(
              "standby-power-results-grid__value tabular-nums",
              row.accent && "standby-power-results-grid__value--accent",
              row.multiline && "standby-power-results-grid__value--multiline"
            )}
            title={row.multiline ? row.display : undefined}
          >
            {row.display}
          </span>
        </div>
      ))}
    </div>
  );
}
