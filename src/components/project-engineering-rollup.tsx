import type { EngineeringRollup } from "@/lib/project-rollup";
import { cn } from "@/lib/utils";

interface ProjectEngineeringRollupProps {
  rollup: EngineeringRollup;
  className?: string;
}

function formatMetric(value: number | null, unit: string): string {
  if (value === null) return "—";
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })} ${unit}`;
}

export function ProjectEngineeringRollup({
  rollup,
  className,
}: ProjectEngineeringRollupProps) {
  const { metrics } = rollup;

  const rows = [
    {
      label: "Required backup capacity",
      value: formatMetric(metrics.requiredWh, "Wh"),
    },
    {
      label: "Total battery capacity",
      value: formatMetric(metrics.totalBatteryWh, "Wh"),
    },
    {
      label: "Max continuous load",
      value: formatMetric(metrics.maxContinuousW, "W"),
    },
    {
      label: "Max surge requirement",
      value: formatMetric(metrics.maxSurgeW, "W"),
    },
    {
      label: "Nominal inverter rating",
      value: formatMetric(metrics.nominalInverterW, "W"),
    },
    {
      label: "Total DC cable (one-way)",
      value: formatMetric(metrics.totalCableLengthM, "m"),
    },
  ];

  const hasData = rows.some((row) => row.value !== "—");

  return (
    <section className={cn("space-y-3", className)}>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Engineering summary
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Aggregated from saved calculator snapshots in this project.
        </p>
      </div>

      {!hasData ? (
        <p className="rounded-none border border-dashed border-border/60 px-4 py-6 text-sm text-muted-foreground">
          No rollup metrics yet. Save results from backup sizing, inverter, or
          cable calculators to populate this summary.
        </p>
      ) : (
        <div className="calculator-results-table">
          <table className="calculator-results-table__grid w-full border-collapse text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="calculator-results-table__row">
                  <th
                    scope="row"
                    className="calculator-results-table__label font-medium"
                  >
                    {row.label}
                  </th>
                  <td className="calculator-results-table__value">
                    <span className="calculator-results-table__number font-semibold tabular-nums">
                      {row.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rollup.sources.length > 0 ? (
        <ul className="space-y-1 text-xs text-muted-foreground" role="list">
          {rollup.sources.map((source) => (
            <li key={source}>· {source}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
