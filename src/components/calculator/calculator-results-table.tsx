import { cn } from "@/lib/utils";

export type CalculatorResultRow = {
  label: string;
  value: string;
  unit?: string;
};

interface CalculatorResultsTableProps {
  rows: CalculatorResultRow[];
  className?: string;
}

/** Flat matte secondary results grid — label + value + unit per row */
export function CalculatorResultsTable({
  rows,
  className,
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
    </div>
  );
}
