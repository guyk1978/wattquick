import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";

const DEFAULT_DOD = 0.9;
const INVERTER_EFFICIENCY = 0.94;
const SOLAR_SYSTEM_EFFICIENCY = 0.85;
const LFP_BASE_CYCLES_AT_80_DOD = 6000;
const ANNUAL_CALENDAR_DEGRADATION = 0.015;

export const SOLAR_BACKUP_BATTERY_PRESETS = [
  { value: "5", label: "5 kWh" },
  { value: "10", label: "10 kWh" },
  { value: "15", label: "15 kWh" },
  { value: "20", label: "20 kWh" },
  { value: "30", label: "30 kWh+" },
  { value: "custom", label: "Custom" },
] as const;

export const SOLAR_BACKUP_INVERTER_PRESETS = [
  { value: "5", label: "5 kW", surgeKw: 10 },
  { value: "8", label: "8 kW", surgeKw: 16 },
  { value: "10", label: "10 kW", surgeKw: 20 },
  { value: "12", label: "12 kW+", surgeKw: 24 },
  { value: "custom", label: "Custom", surgeKw: 0 },
] as const;

export const SOLAR_BACKUP_SOLAR_PRESETS = [
  { value: "none", label: "No solar" },
  { value: "3", label: "3 kW" },
  { value: "6", label: "6 kW" },
  { value: "10", label: "10 kW+" },
  { value: "custom", label: "Custom kW" },
] as const;

export const SOLAR_BACKUP_MODE_OPTIONS = [
  { value: "ups", label: "Emergency backup only (UPS)" },
  { value: "peak", label: "Peak shaving / TOU savings" },
] as const;

export const SOLAR_BACKUP_REGION_OPTIONS = [
  { value: "low", label: "Northern / winter (3.0 hrs)", sunHours: 3 },
  { value: "moderate", label: "Temperate / spring (4.5 hrs)", sunHours: 4.5 },
  { value: "sunny", label: "Sunny belt / summer (5.5 hrs)", sunHours: 5.5 },
  { value: "desert", label: "High-sun desert (6.5 hrs)", sunHours: 6.5 },
  { value: "custom", label: "Custom peak sun hours", sunHours: 5 },
] as const;

export const SOLAR_BACKUP_APPLIANCE_PRESETS = [
  {
    id: "fridge",
    name: "Refrigerator",
    watts: 150,
    hours: 24,
    surge: true,
    essential: true,
  },
  {
    id: "router",
    name: "Router / Modem",
    watts: 15,
    hours: 24,
    surge: false,
    essential: true,
  },
  {
    id: "leds",
    name: "LED Lighting",
    watts: 60,
    hours: 6,
    surge: false,
    essential: true,
  },
  {
    id: "washer",
    name: "Washing Machine",
    watts: 500,
    hours: 1,
    surge: true,
    essential: false,
  },
  {
    id: "ac",
    name: "Air Conditioner",
    watts: 1500,
    hours: 6,
    surge: true,
    essential: false,
  },
  {
    id: "medical",
    name: "Medical Devices",
    watts: 100,
    hours: 24,
    surge: false,
    essential: true,
  },
  {
    id: "laptop",
    name: "Laptop / Workstation",
    watts: 80,
    hours: 8,
    surge: false,
    essential: true,
  },
  {
    id: "tv",
    name: "TV / Entertainment",
    watts: 120,
    hours: 4,
    surge: false,
    essential: false,
  },
] as const;

export interface SolarBackupAppliance {
  name: string;
  watts: number;
  hours: number;
  surge: boolean;
  essential: boolean;
}

export interface SolarBackupInput {
  batteryKwh: number;
  inverterKw: number;
  inverterSurgeKw: number;
  solarKw: number;
  hasSolar: boolean;
  mode: "ups" | "peak";
  sunHours: number;
  peakRatePerKwh: number;
  offPeakRatePerKwh: number;
  appliances: SolarBackupAppliance[];
}

export interface SolarBackupRecommendation {
  severity: "ok" | "info" | "warning" | "critical";
  title: string;
  message: string;
}

export interface SolarBackupResult {
  usableKwh: number;
  fullLoadW: number;
  essentialLoadW: number;
  fullLoadDailyWh: number;
  essentialDailyWh: number;
  fullLoadRuntimeHours: number;
  essentialRuntimeHours: number;
  solarDailyKwh: number;
  extendedFullRuntimeHours: number;
  extendedEssentialRuntimeHours: number;
  peakApplianceW: number;
  surgeCombinedW: number;
  inverterContinuousOk: boolean;
  inverterSurgeOk: boolean;
  overloadedApplianceNames: string[];
  estimatedCycleLife: number;
  estimatedLifespanYears: number;
  annualDegradationPercent: number;
  capacityAfter10YearsKwh: number;
  monthlySavings: number | null;
  recommendations: SolarBackupRecommendation[];
}

function findOption<T extends { value: string }>(
  options: readonly T[],
  value: string
): T | undefined {
  return options.find((o) => o.value === value);
}

function cycleLifeAtDod(dod: number): number {
  // Rough LFP curve: more DoD → fewer cycles vs 80% baseline
  const ratio = 0.8 / Math.max(0.5, Math.min(0.95, dod));
  return Math.round(LFP_BASE_CYCLES_AT_80_DOD * Math.pow(ratio, 1.35));
}

function buildRecommendations(
  input: SolarBackupInput,
  result: Omit<SolarBackupResult, "recommendations">
): SolarBackupRecommendation[] {
  const recs: SolarBackupRecommendation[] = [];

  if (!result.inverterContinuousOk) {
    recs.push({
      severity: "critical",
      title: "Appliance exceeds inverter continuous rating",
      message: `${result.overloadedApplianceNames.join(", ") || "A load"} draws more than ${formatNumber(input.inverterKw * 1000, { maxDecimals: 0 })}W continuous. Upsize the inverter or shed that circuit during outages.`,
    });
  } else if (!result.inverterSurgeOk) {
    recs.push({
      severity: "warning",
      title: "Possible inverter surge overload",
      message: `Motor/compressor starts may exceed ~${formatNumber(input.inverterSurgeKw * 1000, { maxDecimals: 0 })}W surge. Stagger AC, fridge, and washer starts.`,
    });
  }

  if (result.essentialRuntimeHours < 4) {
    recs.push({
      severity: "warning",
      title: "Short essential backup window",
      message: `Essential/eco loads only last ~${formatNumber(result.essentialRuntimeHours, { maxDecimals: 1 })} hours. Add battery kWh or cut non-critical circuits.`,
    });
  }

  if (!input.hasSolar && input.mode === "peak") {
    recs.push({
      severity: "info",
      title: "Peak shaving without solar",
      message:
        "Battery-only peak shaving still works by shifting TOU rates, but adding panels raises self-consumption savings.",
    });
  }

  if (input.hasSolar && result.solarDailyKwh > 0 && result.fullLoadRuntimeHours < 8) {
    recs.push({
      severity: "info",
      title: "Solar extends blackout runtime",
      message: `~${formatNumber(result.solarDailyKwh, { maxDecimals: 1 })} kWh/day from panels can stretch full-load backup toward ~${formatNumber(result.extendedFullRuntimeHours, { maxDecimals: 1 })} hours in daylight.`,
    });
  }

  if (
    result.inverterContinuousOk &&
    result.essentialRuntimeHours >= 8 &&
    (input.mode === "ups" || (result.monthlySavings ?? 0) > 20)
  ) {
    recs.unshift({
      severity: "ok",
      title:
        input.mode === "peak"
          ? "Solid backup + savings profile"
          : "Solid emergency backup profile",
      message:
        input.mode === "peak"
          ? `Essential runtime ~${formatNumber(result.essentialRuntimeHours, { maxDecimals: 1 })} hrs with about ${formatCurrency(result.monthlySavings ?? 0)}/mo peak-shaving estimate.`
          : `Essential circuits hold ~${formatNumber(result.essentialRuntimeHours, { maxDecimals: 1 })} hours with ~${formatNumber(result.estimatedLifespanYears, { maxDecimals: 0 })}-year LFP cycle outlook.`,
    });
  } else if (recs.length === 0) {
    recs.push({
      severity: "ok",
      title: "No critical inverter flags",
      message:
        "Loads fit the inverter envelope under these assumptions. Re-check surge when multiple motors start together.",
    });
  }

  return recs;
}

export function calculateSolarBackupFromInput(
  input: SolarBackupInput
): SolarBackupResult {
  const usableKwh = input.batteryKwh * DEFAULT_DOD;
  const usableWh = usableKwh * 1000 * INVERTER_EFFICIENCY;

  const appliances = input.appliances.filter(
    (a) => a.watts > 0 && a.hours >= 0 && a.name.trim().length > 0
  );

  const fullLoadW = appliances.reduce((sum, a) => sum + a.watts, 0);
  const essentialAppliances = appliances.filter((a) => a.essential);
  const essentialLoadW = essentialAppliances.reduce((sum, a) => sum + a.watts, 0);

  const fullLoadDailyWh = appliances.reduce(
    (sum, a) => sum + a.watts * a.hours,
    0
  );
  const essentialDailyWh = essentialAppliances.reduce(
    (sum, a) => sum + a.watts * a.hours,
    0
  );

  // Continuous-equivalent average for energy-based runtime during outage day
  const fullAvgW = fullLoadDailyWh / 24;
  const essentialAvgW = essentialDailyWh / 24;

  const fullLoadRuntimeHours =
    fullAvgW > 0
      ? usableWh / fullAvgW
      : fullLoadW > 0
        ? usableWh / fullLoadW
        : 99;
  const essentialRuntimeHours =
    essentialAvgW > 0
      ? usableWh / essentialAvgW
      : essentialLoadW > 0
        ? usableWh / essentialLoadW
        : 99;

  const solarDailyKwh = input.hasSolar
    ? input.solarKw * input.sunHours * SOLAR_SYSTEM_EFFICIENCY
    : 0;
  const solarAvgW = (solarDailyKwh * 1000) / 24;

  const netFullW = Math.max(fullAvgW - solarAvgW, fullAvgW * 0.15);
  const netEssentialW = Math.max(essentialAvgW - solarAvgW, essentialAvgW * 0.1);
  const extendedFullRuntimeHours =
    netFullW > 0 ? usableWh / netFullW : fullLoadRuntimeHours;
  const extendedEssentialRuntimeHours =
    netEssentialW > 0 ? usableWh / netEssentialW : essentialRuntimeHours;

  const peakApplianceW = appliances.reduce((max, a) => Math.max(max, a.watts), 0);
  const surgeAppliances = appliances.filter((a) => a.surge || a.watts >= 800);
  const surgeCombinedW = surgeAppliances.reduce((sum, a) => sum + a.watts, 0);

  const inverterContinuousW = input.inverterKw * 1000;
  const inverterSurgeW = input.inverterSurgeKw * 1000;
  const overloadedApplianceNames = appliances
    .filter((a) => a.watts > inverterContinuousW)
    .map((a) => a.name);

  const inverterContinuousOk = overloadedApplianceNames.length === 0;
  const inverterSurgeOk =
    peakApplianceW <= inverterSurgeW &&
    surgeCombinedW <= inverterSurgeW * 1.05;

  const estimatedCycleLife = cycleLifeAtDod(DEFAULT_DOD);
  const cyclesPerYear = input.mode === "peak" ? 365 : 50; // UPS: occasional outages
  const estimatedLifespanYears = Math.min(
    25,
    estimatedCycleLife / Math.max(cyclesPerYear, 1)
  );
  const cycleWearPerYear =
    (cyclesPerYear / estimatedCycleLife) * (1 - 0.8); // ~20% fade over rated life
  const annualDegradationPercent =
    (ANNUAL_CALENDAR_DEGRADATION + cycleWearPerYear) * 100;
  const capacityAfter10YearsKwh =
    input.batteryKwh * Math.pow(1 - annualDegradationPercent / 100, 10);

  let monthlySavings: number | null = null;
  if (input.mode === "peak") {
    const rateDelta = Math.max(
      0,
      input.peakRatePerKwh - input.offPeakRatePerKwh
    );
    // Daily throughput capped by usable bank and solar/self-consumption opportunity
    const dailyShiftKwh = Math.min(
      usableKwh,
      Math.max(solarDailyKwh, usableKwh * 0.6),
      fullLoadDailyWh / 1000
    );
    monthlySavings = dailyShiftKwh * rateDelta * 30;
  }

  const base = {
    usableKwh,
    fullLoadW,
    essentialLoadW,
    fullLoadDailyWh,
    essentialDailyWh,
    fullLoadRuntimeHours,
    essentialRuntimeHours,
    solarDailyKwh,
    extendedFullRuntimeHours,
    extendedEssentialRuntimeHours,
    peakApplianceW,
    surgeCombinedW,
    inverterContinuousOk,
    inverterSurgeOk,
    overloadedApplianceNames,
    estimatedCycleLife,
    estimatedLifespanYears,
    annualDegradationPercent,
    capacityAfter10YearsKwh,
    monthlySavings,
  };

  return {
    ...base,
    recommendations: buildRecommendations(input, base),
  };
}

export function parseSolarBackupHardware(
  values: Record<string, string>
): Omit<SolarBackupInput, "appliances"> | null {
  const batteryPreset = values.batteryPreset ?? "10";
  const batteryKwh =
    batteryPreset === "custom"
      ? parsePositive(values.batteryKwhCustom ?? "")
      : parsePositive(batteryPreset);

  const inverterPreset = values.inverterPreset ?? "8";
  let inverterKw: number | null;
  let inverterSurgeKw: number;
  if (inverterPreset === "custom") {
    inverterKw = parsePositive(values.inverterKwCustom ?? "");
    inverterSurgeKw =
      parsePositive(values.inverterSurgeKwCustom ?? "") ??
      (inverterKw !== null ? inverterKw * 2 : 0);
  } else {
    const preset = findOption(SOLAR_BACKUP_INVERTER_PRESETS, inverterPreset);
    inverterKw = parsePositive(inverterPreset);
    inverterSurgeKw = preset?.surgeKw ?? (inverterKw ?? 0) * 2;
  }

  const solarPreset = values.solarPreset ?? "6";
  let solarKw: number | null;
  let hasSolar: boolean;
  if (solarPreset === "none") {
    solarKw = 0;
    hasSolar = false;
  } else if (solarPreset === "custom") {
    solarKw = parsePositive(values.solarKwCustom ?? "");
    hasSolar = solarKw !== null && solarKw > 0;
  } else {
    solarKw = parsePositive(solarPreset);
    hasSolar = true;
  }

  const modeRaw = values.mode ?? "ups";
  const mode: "ups" | "peak" = modeRaw === "peak" ? "peak" : "ups";

  const region = values.region ?? "moderate";
  let sunHours: number;
  if (region === "custom") {
    sunHours = parsePositive(values.sunHoursCustom ?? "") ?? 5;
  } else {
    sunHours =
      findOption(SOLAR_BACKUP_REGION_OPTIONS, region)?.sunHours ?? 4.5;
  }

  const peakRatePerKwh =
    parsePositive(values.peakRatePerKwh ?? "") ?? 0.32;
  const offPeakRatePerKwh =
    parsePositive(values.offPeakRatePerKwh ?? "") ?? 0.12;

  if (batteryKwh === null || inverterKw === null || solarKw === null) {
    return null;
  }

  return {
    batteryKwh,
    inverterKw,
    inverterSurgeKw,
    solarKw,
    hasSolar,
    mode,
    sunHours,
    peakRatePerKwh,
    offPeakRatePerKwh,
  };
}

export function calculateSolarBackup(
  values: Record<string, string>,
  appliances: SolarBackupAppliance[]
): SolarBackupResult | null {
  const hardware = parseSolarBackupHardware(values);
  if (!hardware) return null;
  return calculateSolarBackupFromInput({
    ...hardware,
    appliances,
  });
}

export function formatSolarBackupResult(values: Record<string, string>) {
  const hardware = parseSolarBackupHardware(values);
  if (!hardware) return { value: null, unit: "hrs", detail: null };
  const usable = hardware.batteryKwh * DEFAULT_DOD;
  return {
    value: formatNumber(usable, { maxDecimals: 1 }),
    unit: "kWh usable",
    detail: `${formatNumber(hardware.batteryKwh, { maxDecimals: 1 })} kWh pack · ${formatNumber(hardware.inverterKw, { maxDecimals: 1 })} kW inverter`,
  };
}
