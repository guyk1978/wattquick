import { SaveToProjectButton } from "@/components/save-to-project-button";
import type { ProjectSavePayload } from "@/lib/project-store";
import { cn } from "@/lib/utils";

export type CalculatorResultRow = {
  label: string;
  value: string;
  unit?: string;
};

interface CalculatorResultsTableProps {
  rows: CalculatorResultRow[];
  className?: string;
  saveToProject?: ProjectSavePayload;
}

/** Flat matte secondary results grid — label + value + unit per row */
export function CalculatorResultsTable({
  rows,
  className,
  saveToProject,
}: CalculatorResultsTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className={cn("calculator-results-table", className)}>
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
                {row.unit ? (
                  <span className="calculator-results-table__unit text-muted-foreground">
                    {row.unit}
                  </span>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {saveToProject ? (
        <div className="mt-3 flex justify-end border-t border-border/40 pt-3">
          <SaveToProjectButton payload={saveToProject} compact />
        </div>
      ) : null}
    </div>
  );
}
