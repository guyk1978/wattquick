import { formatNumber, parsePositive } from "@/lib/format";

const PACK_USABLE_FRACTION = 0.9;
const SOLAR_SYSTEM_EFFICIENCY = 0.85;

export const POWER_STATION_CAPACITY_PRESETS = [
  { value: "500", label: "500 Wh" },
  { value: "1000", label: "1000 Wh" },
  { value: "2000", label: "2000 Wh" },
  { value: "3600", label: "3600 Wh+" },
  { value: "custom", label: "Custom" },
] as const;

export const POWER_STATION_INVERTER_PRESETS = [
  { value: "500", label: "500W", surge: 1000 },
  { value: "1000", label: "1000W", surge: 2000 },
  { value: "1800", label: "1800W", surge: 3600 },
  { value: "3000", label: "3000W+", surge: 6000 },
  { value: "custom", label: "Custom", surge: 0 },
] as const;

export const POWER_STATION_SOLAR_PRESETS = [
  { value: "100", label: "100W" },
  { value: "200", label: "200W" },
  { value: "400", label: "400W" },
  { value: "800", label: "800W+" },
  { value: "custom", label: "Custom" },
] as const;

export const POWER_STATION_WEATHER_OPTIONS = [
  { value: "sunny", label: "Sunny (100% yield)", factor: 1.0 },
  { value: "partly", label: "Partly cloudy (60%)", factor: 0.6 },
  { value: "overcast", label: "Overcast / stormy (20%)", factor: 0.2 },
] as const;

export const POWER_STATION_ALTERNATOR_PRESETS = [
  { value: "none", label: "No DC-DC / alternator", watts: 0 },
  { value: "100", label: "100W DC-DC", watts: 100 },
  { value: "300", label: "300W DC-DC", watts: 300 },
  { value: "800", label: "800W DC-DC", watts: 800 },
  { value: "custom", label: "Custom watts", watts: 0 },
] as const;

export const POWER_STATION_APPLIANCE_PRESETS = [
  { id: "fridge", name: "12V Car Fridge", watts: 50, hoursPerDay: 24, surge: false },
  { id: "pump", name: "Water Pump", watts: 60, hoursPerDay: 0.5, surge: false },
  { id: "leds", name: "LED Lighting", watts: 20, hoursPerDay: 4, surge: false },
  { id: "laptop", name: "Laptop", watts: 65, hoursPerDay: 4, surge: false },
  { id: "drone", name: "Drone Charger", watts: 80, hoursPerDay: 1, surge: false },
  { id: "coffee", name: "Coffee Maker", watts: 900, hoursPerDay: 0.25, surge: true },
  { id: "kettle", name: "Electric Kettle", watts: 1200, hoursPerDay: 0.15, surge: true },
  { id: "starlink", name: "Starlink", watts: 50, hoursPerDay: 8, surge: false },
] as const;

export interface PowerStationAppliance {
  name: string;
  watts: number;
  hoursPerDay: number;
  surge: boolean;
}

export interface PowerStationPlannerInput {
  capacityWh: number;
  inverterContinuousW: number;
  inverterSurgeW: number;
  solarWatts: number;
  sunHours: number;
  weatherFactor: number;
  alternatorWatts: number;
  drivingHoursPerDay: number;
  appliances: PowerStationAppliance[];
}

export interface PowerStationRecommendation {
  severity: "ok" | "info" | "warning" | "critical";
  title: string;
  message: string;
}

export interface PowerStationPlannerResult {
  usableWh: number;
  dailyLoadWh: number;
  peakApplianceW: number;
  maxSimultaneousHintW: number;
  solarYieldWh: number;
  alternatorYieldWh: number;
  totalGenerationWh: number;
  netDailyWh: number;
  autonomyDays: number;
  solarRechargeHours: number;
  alternatorRechargeHours: number | null;
  inverterContinuousOk: boolean;
  inverterSurgeOk: boolean;
  overloadedApplianceNames: string[];
  recommendations: PowerStationRecommendation[];
}

function findOption<T extends { value: string }>(
  options: readonly T[],
  value: string
): T | undefined {
  return options.find((o) => o.value === value);
}

function buildRecommendations(
  input: PowerStationPlannerInput,
  result: Omit<PowerStationPlannerResult, "recommendations">
): PowerStationRecommendation[] {
  const recs: PowerStationRecommendation[] = [];

  if (!result.inverterContinuousOk) {
    recs.push({
      severity: "critical",
      title: "Appliance exceeds inverter continuous rating",
      message: `${result.overloadedApplianceNames.join(", ") || "A load"} draws more than ${formatNumber(input.inverterContinuousW, { maxDecimals: 0 })}W continuous. Use a larger inverter or run that device from another source.`,
    });
  } else if (!result.inverterSurgeOk) {
    recs.push({
      severity: "warning",
      title: "Possible surge overload",
      message: `High-draw devices may exceed the ~${formatNumber(input.inverterSurgeW, { maxDecimals: 0 })}W surge rating. Stagger coffee makers, kettles, and similar loads.`,
    });
  }

  if (result.netDailyWh < -200) {
    recs.push({
      severity: "warning",
      title: "Daily energy deficit",
      message: `You use about ${formatNumber(Math.abs(result.netDailyWh), { maxDecimals: 0 })} Wh more per day than solar + alternator generate. Add panels, drive more with DC-DC, or cut loads.`,
    });
  }

  if (result.autonomyDays < 1.2 && result.netDailyWh < 0) {
    recs.push({
      severity: "critical",
      title: "Low off-grid autonomy",
      message: `Estimated autonomy is only ~${formatNumber(result.autonomyDays, { maxDecimals: 1 })} days before critical depletion. Upsize the station or reduce daily Wh.`,
    });
  }

  if (input.solarWatts < 200 && result.dailyLoadWh > 800) {
    recs.push({
      severity: "info",
      title: "Solar undersized for camping loads",
      message:
        "With fridge + Starlink-style loads, 400W+ of portable solar recovers much faster on sunny days.",
    });
  }

  if (
    result.netDailyWh >= 0 &&
    result.inverterContinuousOk &&
    result.autonomyDays >= 2
  ) {
    recs.unshift({
      severity: "ok",
      title: "Balanced off-grid setup",
      message: `Generation covers daily use with ~${formatNumber(result.autonomyDays, { maxDecimals: 1 })} days of buffer in the pack under these assumptions.`,
    });
  } else if (recs.length === 0) {
    recs.push({
      severity: "ok",
      title: "No critical inverter flags",
      message:
        "Loads fit the inverter envelope. Watch weather and driving hours—yield drops fast when overcast.",
    });
  }

  return recs;
}

export function calculatePowerStationPlannerFromInput(
  input: PowerStationPlannerInput
): PowerStationPlannerResult {
  const usableWh = input.capacityWh * PACK_USABLE_FRACTION;

  const appliances = input.appliances.filter(
    (a) => a.watts > 0 && a.hoursPerDay >= 0 && a.name.trim().length > 0
  );

  const dailyLoadWh = appliances.reduce(
    (sum, a) => sum + a.watts * a.hoursPerDay,
    0
  );
  const peakApplianceW = appliances.reduce(
    (max, a) => Math.max(max, a.watts),
    0
  );
  const surgeAppliances = appliances.filter((a) => a.surge || a.watts >= 800);
  const maxSimultaneousHintW = surgeAppliances.reduce(
    (sum, a) => sum + a.watts,
    0
  );

  const overloadedApplianceNames = appliances
    .filter((a) => a.watts > input.inverterContinuousW)
    .map((a) => a.name);

  const inverterContinuousOk = overloadedApplianceNames.length === 0;
  const inverterSurgeOk =
    peakApplianceW <= input.inverterSurgeW &&
    maxSimultaneousHintW <= input.inverterSurgeW * 1.05;

  const weather = Math.min(1, Math.max(0, input.weatherFactor));
  const solarYieldWh =
    input.solarWatts *
    input.sunHours *
    weather *
    SOLAR_SYSTEM_EFFICIENCY;
  const alternatorYieldWh =
    Math.max(0, input.alternatorWatts) *
    Math.max(0, input.drivingHoursPerDay);
  const totalGenerationWh = solarYieldWh + alternatorYieldWh;
  const netDailyWh = totalGenerationWh - dailyLoadWh;

  let autonomyDays: number;
  if (dailyLoadWh <= 0) {
    autonomyDays = 99;
  } else if (netDailyWh >= 0) {
    // Surplus: pack is a buffer for bad-weather / night — estimate from usable / load
    autonomyDays = Math.min(30, usableWh / Math.max(dailyLoadWh * 0.35, 1));
  } else {
    autonomyDays = usableWh / Math.abs(netDailyWh);
  }

  const solarChargeRate =
    input.solarWatts * weather * SOLAR_SYSTEM_EFFICIENCY;
  const solarRechargeHours =
    solarChargeRate > 0 ? input.capacityWh / solarChargeRate : 99;

  const alternatorRechargeHours =
    input.alternatorWatts > 0
      ? input.capacityWh / input.alternatorWatts
      : null;

  const base = {
    usableWh,
    dailyLoadWh,
    peakApplianceW,
    maxSimultaneousHintW,
    solarYieldWh,
    alternatorYieldWh,
    totalGenerationWh,
    netDailyWh,
    autonomyDays,
    solarRechargeHours,
    alternatorRechargeHours,
    inverterContinuousOk,
    inverterSurgeOk,
    overloadedApplianceNames,
  };

  return {
    ...base,
    recommendations: buildRecommendations(input, base),
  };
}

export function parsePowerStationHardware(
  values: Record<string, string>
): Omit<PowerStationPlannerInput, "appliances"> | null {
  const capacityPreset = values.capacityPreset ?? "1000";
  const capacityWh =
    capacityPreset === "custom"
      ? parsePositive(values.capacityWhCustom ?? "")
      : parsePositive(capacityPreset);

  const inverterPreset = values.inverterPreset ?? "1000";
  let inverterContinuousW: number | null;
  let inverterSurgeW: number;
  if (inverterPreset === "custom") {
    inverterContinuousW = parsePositive(values.inverterWCustom ?? "");
    inverterSurgeW =
      parsePositive(values.inverterSurgeCustom ?? "") ??
      (inverterContinuousW !== null ? inverterContinuousW * 2 : 0);
  } else {
    const preset = findOption(POWER_STATION_INVERTER_PRESETS, inverterPreset);
    inverterContinuousW = parsePositive(inverterPreset);
    inverterSurgeW = preset?.surge ?? (inverterContinuousW ?? 0) * 2;
  }

  const solarPreset = values.solarPreset ?? "200";
  const solarWatts =
    solarPreset === "custom"
      ? parsePositive(values.solarWCustom ?? "")
      : parsePositive(solarPreset);

  const sunHours = parsePositive(values.sunHours ?? "") ?? 5;
  const weatherKey = values.weather ?? "sunny";
  const weatherFactor =
    findOption(POWER_STATION_WEATHER_OPTIONS, weatherKey)?.factor ?? 1;

  const altPreset = values.alternatorPreset ?? "none";
  let alternatorWatts: number | null;
  if (altPreset === "custom") {
    alternatorWatts = parsePositive(values.alternatorWCustom ?? "");
  } else if (altPreset === "none") {
    alternatorWatts = 0;
  } else {
    alternatorWatts = parsePositive(altPreset);
  }

  const drivingHoursPerDay =
    parsePositive(values.drivingHoursPerDay ?? "") ??
    (alternatorWatts && alternatorWatts > 0 ? 2 : 0);

  if (
    capacityWh === null ||
    inverterContinuousW === null ||
    solarWatts === null ||
    alternatorWatts === null
  ) {
    return null;
  }

  return {
    capacityWh,
    inverterContinuousW,
    inverterSurgeW,
    solarWatts,
    sunHours,
    weatherFactor,
    alternatorWatts,
    drivingHoursPerDay,
  };
}

export function calculatePowerStationPlanner(
  values: Record<string, string>,
  appliances: PowerStationAppliance[]
): PowerStationPlannerResult | null {
  const hardware = parsePowerStationHardware(values);
  if (!hardware) return null;
  return calculatePowerStationPlannerFromInput({
    ...hardware,
    appliances,
  });
}

export function formatPowerStationPlannerResult(
  values: Record<string, string>
) {
  // Registry compute path: no appliance list — report pack usable energy only
  const hardware = parsePowerStationHardware(values);
  if (!hardware) return { value: null, unit: "Wh", detail: null };
  const usable = hardware.capacityWh * PACK_USABLE_FRACTION;
  return {
    value: formatNumber(usable, { maxDecimals: 0 }),
    unit: "Wh usable",
    detail: `${formatNumber(hardware.capacityWh, { maxDecimals: 0 })} Wh pack · ${formatNumber(hardware.inverterContinuousW, { maxDecimals: 0 })}W inverter`,
  };
}

export function defaultPowerStationAppliances(): PowerStationAppliance[] {
  return POWER_STATION_APPLIANCE_PRESETS.map((p) => ({
    name: p.name,
    watts: p.watts,
    hoursPerDay: p.hoursPerDay,
    surge: p.surge,
  }));
}
