import type { CalculatorId } from "@/lib/calculators";
import { isCalculatorId } from "@/lib/calculators/utils";
import { extractCalculatorSlugs } from "@/lib/blog/parse-content";

export function resolveRelatedToolId(
  data: Record<string, unknown>,
  content: string
): CalculatorId | undefined {
  const explicit = data.relatedToolId ?? data.relatedTool;
  if (typeof explicit === "string" && isCalculatorId(explicit)) {
    return explicit;
  }

  const embedded = extractCalculatorSlugs(content);
  const first = embedded[0];
  if (first && isCalculatorId(first)) return first;

  return undefined;
}
