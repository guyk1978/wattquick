import type { VampireDeviceType } from "@/lib/calculators/appliances";

export interface VampireDeviceLine {
  id: string;
  deviceType: VampireDeviceType;
  watts: string;
  count: string;
}

export interface VampireLineBreakdown {
  label: string;
  watts: number;
  count: number;
  subtotalWatts: number;
  annualCost: number;
}

export interface VampireParsedResult {
  annualCost: number;
  annualKwh: number;
  monthlyCost: number;
  totalStandbyWatts: number;
  lineCount: number;
}
