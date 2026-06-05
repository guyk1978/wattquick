import { BatteryCharging, Cable, Calendar, Cpu, Gauge, Home, Layers, Shield, Zap } from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  parseNonNegative,
  parsePositive,
} from "@/lib/format";
import {
  calculateBatteryCalendarAging,
  calculateBatteryVoltageDrop,
  calculateBessRoi,
  calculateCrate,
  calculateCriticalLoadAnalysis,
  calculateHomeBackupSizing,
  calculateInverterLoss,
  calculateSeriesParallel,
  CRITICAL_LOAD_MAX_DEVICE_SLOTS,
  type CriticalLoadDevice,
} from "@/lib/calculators/battery";
import {
  calculateInverterLoadingCurve,
  calculateInverterPeakLoadSurge,
  INVERTER_MOTOR_LOAD_PRESETS,
  INVERTER_OVERLOAD_PROFILE_OPTIONS,
  isInverterOverloadProfile,
  type InverterMotorLoad,
  type InverterMotorLoadPreset,
} from "@/lib/calculators/electrical";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const INVERTER_LOAD_PRESET_OPTIONS = Object.entries(INVERTER_MOTOR_LOAD_PRESETS).map(
  ([value, preset]) => ({
    value,
    label: preset.label,
  })
);

function parseCriticalLoadDevicesFromValues(
  values: Record<string, string | undefined>
): CriticalLoadDevice[] | null {
  const devices: CriticalLoadDevice[] = [];

  for (let slot = 1; slot <= CRITICAL_LOAD_MAX_DEVICE_SLOTS; slot += 1) {
    const name = values[`device${slot}Name`]?.trim();
    const runningWatts = parsePositive(values[`device${slot}Watts`] ?? "");
    const hoursPerDay = parsePositive(values[`device${slot}Hours`] ?? "");
    if (!name || runningWatts === null || hoursPerDay === null) {
      continue;
    }
    const highSurge = values[`device${slot}HighSurge`] === "true";
    devices.push({ name, runningWatts, hoursPerDay, highSurge });
  }

  return devices.length > 0 ? devices : null;
}

function parseInverterLoadsFromValues(
  values: Record<string, string | undefined>
): InverterMotorLoad[] | null {
  const loads: InverterMotorLoad[] = [];
  for (const slot of [1, 2, 3, 4] as const) {
    const preset = values[`appliance${slot}Preset`] as
      | InverterMotorLoadPreset
      | undefined;
    if (!preset || preset === "none" || !(preset in INVERTER_MOTOR_LOAD_PRESETS)) {
      continue;
    }
    const runningWatts = parsePositive(values[`appliance${slot}RunningW`] ?? "");
    const surgeFactor = parsePositive(values[`appliance${slot}Surge`] ?? "");
    if (
      runningWatts === null ||
      surgeFactor === null ||
      surgeFactor < 1 ||
      surgeFactor > 12
    ) {
      return null;
    }
    loads.push({ preset, runningWatts, surgeFactor });
  }
  return loads.length > 0 ? loads : null;
}

/** Battery micro-calculators (batch 5) */
export const calculatorsBattery = [
  {
    slug: "battery-series-parallel",
    href: "/battery-series-parallel",
    title: "Battery Series & Parallel Calculator",
    description:
      "Calculate pack voltage, amp-hours, and watt-hours from series/parallel cell layout.",
    keywords: [
      "battery series parallel",
      "battery bank wiring",
      "series parallel ah voltage",
    ],
    icon: Layers,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-bank-size", "battery-energy", "ah-to-wh"],
    fields: [
      { id: "seriesCount", label: "Cells in series", unit: "S", placeholder: "4" },
      { id: "parallelCount", label: "Strings in parallel", unit: "P", placeholder: "2" },
      { id: "cellVoltage", label: "Cell voltage", unit: "V", placeholder: "3.2" },
      { id: "cellCapacityAh", label: "Cell capacity", unit: "Ah", placeholder: "100" },
    ],
    result: {
      label: "Pack energy",
      emptyMessage: "Enter series, parallel & cell specs",
    },
    seo: {
      sections: [
        {
          heading: "Series vs. parallel",
          body: "Series adds voltage (4 × 3.2 V = 12.8 V). Parallel adds capacity (2 × 100 Ah = 200 Ah). Pack Wh = total V × total Ah.",
        },
        {
          heading: "Configuration label",
          body: "A 4S2P pack means four cells in series per string and two strings in parallel—common for DIY lithium banks.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Must all cells match? A: Yes—use matched cells and a BMS rated for your series count. Q: Can I mix old and new? A: No—parallel strings should be balanced and matched.",
        },
      ],
    },
    compute(values) {
      const seriesCount = parsePositive(values.seriesCount ?? "");
      const parallelCount = parsePositive(values.parallelCount ?? "");
      const cellVoltage = parsePositive(values.cellVoltage ?? "");
      const cellCapacityAh = parsePositive(values.cellCapacityAh ?? "");
      if (
        seriesCount === null ||
        parallelCount === null ||
        cellVoltage === null ||
        cellCapacityAh === null
      ) {
        return { value: null };
      }
      const result = calculateSeriesParallel({
        seriesCount,
        parallelCount,
        cellVoltage,
        cellCapacityAh,
      });
      return {
        value: formatNumber(result.totalWh, { maxDecimals: 0 }),
        unit: "Wh",
        detail: `${result.configuration} · ${result.totalVoltage} V · ${result.totalCapacityAh} Ah`,
      };
    },
  },
  {
    slug: "battery-c-rate",
    href: "/battery-c-rate",
    title: "Battery C-Rate Calculator",
    description:
      "Find discharge C-rate and runtime from capacity and load current—updates live.",
    keywords: ["battery c rate calculator", "discharge rate ah", "battery discharge time"],
    icon: Gauge,
    tag: "Battery",
    category: "battery",
    suggestions: ["battery-runtime", "battery-charging-time", "watts-to-amps"],
    fields: [
      { id: "capacityAh", label: "Battery capacity", unit: "Ah", placeholder: "100" },
      { id: "dischargeAmps", label: "Discharge current", unit: "A", placeholder: "50" },
    ],
    result: {
      label: "Discharge C-rate",
      emptyMessage: "Enter Ah and discharge amps",
    },
    seo: {
      sections: [
        {
          heading: "C-rate formula",
          body: "C-rate = discharge current ÷ capacity (A ÷ Ah). 1C on a 100 Ah pack = 100 A and ~1 hour to empty. 0.5C = 50 A and ~2 hours.",
        },
        {
          heading: "Why C-rate matters",
          body: "High C-rates heat cells and reduce effective capacity. Check your battery datasheet for max continuous discharge.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this linear? A: Real packs sag under load—this is an ideal estimate. Q: What about Peukert? A: Lead-acid loses more capacity at high C; lithium is closer to linear for planning.",
        },
      ],
    },
    compute(values) {
      const capacityAh = parsePositive(values.capacityAh ?? "");
      const dischargeAmps = parsePositive(values.dischargeAmps ?? "");
      if (capacityAh === null || dischargeAmps === null) return { value: null };
      const result = calculateCrate({ capacityAh, dischargeAmps });
      return {
        value: formatNumber(result.cRate, { maxDecimals: 2 }),
        unit: "C",
        detail: `~${result.hoursToEmpty} h (${result.minutesToEmpty} min) to empty at constant current`,
      };
    },
  },
  {
    slug: "inverter-loss-calculator",
    href: "/inverter-loss-calculator",
    title: "Inverter Loss Calculator",
    description:
      "Convert DC input watts to AC output and show power lost as heat in the inverter.",
    keywords: ["inverter loss calculator", "inverter efficiency watts", "dc to ac loss"],
    icon: Cpu,
    tag: "Battery",
    category: "battery",
    suggestions: ["inverter-sizing", "solar-inverter-efficiency", "ups-runtime"],
    fields: [
      { id: "dcInputWatts", label: "DC input power", unit: "W", placeholder: "1200" },
      {
        id: "efficiencyPercent",
        label: "Inverter efficiency",
        inputType: "range",
        min: 80,
        max: 99,
        step: 1,
        defaultValue: "92",
        unit: "%",
        colSpan: 2,
      },
    ],
    result: {
      label: "AC output power",
      emptyMessage: "Enter DC watts and efficiency",
    },
    seo: {
      sections: [
        {
          heading: "Efficiency formula",
          body: "AC output = DC input × (efficiency ÷ 100). Loss watts = DC − AC. Size batteries for DC input including losses.",
        },
        {
          heading: "Sizing tip",
          body: "When sizing backup, divide load watts by efficiency before converting to Ah. Pair with Home Backup Sizing for bank capacity.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Why is efficiency below 100%? A: Switching losses and heat in the inverter. Q: Does efficiency change with load? A: Yes—often lowest at very light load.",
        },
      ],
    },
    compute(values) {
      const dcInputWatts = parsePositive(values.dcInputWatts ?? "");
      const efficiencyPercent = Number(values.efficiencyPercent?.trim() || "92");
      if (
        dcInputWatts === null ||
        !Number.isFinite(efficiencyPercent) ||
        efficiencyPercent <= 0 ||
        efficiencyPercent > 100
      ) {
        return { value: null };
      }
      const result = calculateInverterLoss({ dcInputWatts, efficiencyPercent });
      return {
        value: formatNumber(result.acOutputWatts, { maxDecimals: 0 }),
        unit: "W AC",
        detail: `Loss ${formatNumber(result.lossWatts, { maxDecimals: 0 })} W (${result.lossPercent}%) from ${dcInputWatts} W DC`,
      };
    },
  },
  {
    slug: "inverter-peak-load-surge",
    href: "/inverter-peak-load-surge",
    title: "Inverter Peak Load & Surge Calculator",
    description:
      "Sum motor running watts and staggered surge demand—get continuous load, peak W, and a recommended pure-sine inverter tier.",
    keywords: [
      "inverter surge calculator",
      "motor starting watts inverter",
      "peak load inverter sizing",
      "inrush inverter backup",
      "refrigerator ac pump surge",
    ],
    icon: Zap,
    tag: "Battery",
    category: "battery",
    suggestions: [
      "inverter-loading-curve",
      "home-backup-sizing",
      "inverter-sizing",
      "inverter-loss-calculator",
      "ac-inrush-current",
    ],
    fields: [
      {
        id: "appliance1Preset",
        label: "Load 1 — appliance",
        inputType: "select",
        colSpan: 2,
        defaultValue: "refrigerator",
        options: INVERTER_LOAD_PRESET_OPTIONS,
      },
      {
        id: "appliance1RunningW",
        label: "Load 1 — running watts",
        unit: "W",
        defaultValue: "150",
      },
      {
        id: "appliance1Surge",
        label: "Load 1 — surge factor",
        unit: "×",
        defaultValue: "3",
        hint: "Typical motors 3×–7× running",
      },
      {
        id: "appliance2Preset",
        label: "Load 2 — appliance",
        inputType: "select",
        colSpan: 2,
        defaultValue: "air_conditioner",
        options: INVERTER_LOAD_PRESET_OPTIONS,
      },
      {
        id: "appliance2RunningW",
        label: "Load 2 — running watts",
        unit: "W",
        defaultValue: "1200",
      },
      {
        id: "appliance2Surge",
        label: "Load 2 — surge factor",
        unit: "×",
        defaultValue: "5",
      },
      {
        id: "appliance3Preset",
        label: "Load 3 — appliance",
        inputType: "select",
        colSpan: 2,
        defaultValue: "water_pump",
        options: INVERTER_LOAD_PRESET_OPTIONS,
      },
      {
        id: "appliance3RunningW",
        label: "Load 3 — running watts",
        unit: "W",
        defaultValue: "750",
      },
      {
        id: "appliance3Surge",
        label: "Load 3 — surge factor",
        unit: "×",
        defaultValue: "4",
      },
      {
        id: "appliance4Preset",
        label: "Load 4 — appliance (optional)",
        inputType: "select",
        colSpan: 2,
        defaultValue: "none",
        options: INVERTER_LOAD_PRESET_OPTIONS,
      },
      {
        id: "appliance4RunningW",
        label: "Load 4 — running watts",
        unit: "W",
        placeholder: "0",
        defaultValue: "0",
      },
      {
        id: "appliance4Surge",
        label: "Load 4 — surge factor",
        unit: "×",
        defaultValue: "3",
      },
    ],
    result: {
      label: "Recommended inverter",
      emptyMessage: "Select at least one load with running watts",
    },
    seo: {
      sections: [
        {
          heading: "Continuous vs. peak",
          body: "Continuous watts are the sum of running loads. Peak watts add the largest motor surge margin (running × (factor − 1)) plus 35% of the second-largest—modeling staggered starts instead of every motor at once.",
        },
        {
          heading: "Picking an inverter",
          body: "We snap to standard pure-sine tiers with ~2× surge rating and 15% continuous headroom. Verify manufacturer surge seconds and LRA on motor nameplates.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: All motors start together? A: Use naive sum (set one load with combined watts) or add a higher surge factor. Q: vs. AC inrush tool? A: That sizes breakers in amps; this sizes inverters in watts. Q: Battery bank? A: Pair with Home Backup Sizing after you know AC load.",
        },
      ],
    },
    compute(values) {
      const loads = parseInverterLoadsFromValues(values);
      if (!loads) return { value: null };
      const result = calculateInverterPeakLoadSurge({ loads });
      if (!result) return { value: null };
      return {
        value: formatNumber(result.recommendedContinuousW, { maxDecimals: 0 }),
        unit: "W",
        detail: `${formatNumber(result.continuousW, { maxDecimals: 0 })} W cont · ${formatNumber(result.peakW, { maxDecimals: 0 })} W peak · ${result.recommendedSurgeW} W surge class`,
      };
    },
  },
  {
    slug: "inverter-loading-curve",
    href: "/inverter-loading-curve",
    title: "Inverter Loading Curve",
    relatedArticleId: "inverter-thermal-management-guide",
    description:
      "Estimate overload shutdown time from nominal power, current load, ambient temperature, and manufacturer overload curves.",
    keywords: [
      "inverter overload calculator",
      "inverter thermal derating",
      "110 percent inverter load",
      "inverter shutdown time",
      "off grid inverter overload",
    ],
    icon: Gauge,
    tag: "Battery",
    category: "battery",
    suggestions: [
      "inverter-peak-load-surge",
      "critical-load-analysis",
      "inverter-sizing",
      "inverter-loss-calculator",
    ],
    fields: [
      {
        id: "nominalPowerW",
        label: "Nominal inverter power",
        unit: "W",
        placeholder: "3000",
        defaultValue: "3000",
      },
      {
        id: "currentLoadW",
        label: "Current load",
        unit: "W",
        placeholder: "3300",
        defaultValue: "3300",
        hint: "Sustained AC output demand",
      },
      {
        id: "ambientTempC",
        label: "Ambient temperature",
        unit: "°C",
        placeholder: "35",
        defaultValue: "35",
        hint: "Cabinet / install site air temp",
      },
      {
        id: "inverterProfile",
        label: "Inverter overload profile",
        inputType: "select",
        colSpan: 2,
        defaultValue: "standard",
        options: INVERTER_OVERLOAD_PROFILE_OPTIONS,
        hint: "Manufacturer-style overload time curve",
      },
    ],
    result: {
      label: "Time to overload shutdown",
      emptyMessage: "Enter nominal power, load, temp & profile",
    },
    seo: {
      sections: [
        {
          heading: "Thermal derating",
          body: "Derated power = nominal × (1 − (T − 25°C) × 0.01). Hot installs lose continuous headroom before overload timing even matters.",
        },
        {
          heading: "Overload curves",
          body: "Profiles model typical allowed run times at 110%, 120%, and above—log-interpolated between datasheet points. Always confirm against your exact model manual.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: 110% for how long? A: Depends on profile—often ~30–60 min on off-grid units, much less on grid-tie. Q: vs. surge calculator? A: Peak Load & Surge sizes motor starts; this validates sustained overload. Q: Continuous safe? A: At or below 100% of derated nominal.",
        },
      ],
    },
    compute(values) {
      const nominalPowerW = parsePositive(values.nominalPowerW ?? "");
      const currentLoadW = parsePositive(values.currentLoadW ?? "");
      const ambientTempC = Number(values.ambientTempC?.trim() ?? "");
      const profileRaw = values.inverterProfile ?? "standard";

      if (
        nominalPowerW === null ||
        currentLoadW === null ||
        !Number.isFinite(ambientTempC) ||
        !isInverterOverloadProfile(profileRaw)
      ) {
        return { value: null };
      }

      const result = calculateInverterLoadingCurve({
        nominalPowerW,
        currentLoadW,
        ambientTempC,
        profile: profileRaw,
      });

      if (!result) return { value: null };

      return {
        value: result.shutdownLabel,
        detail: `${result.statusLabel} · ${formatNumber(result.loadPercentOfDerated, { maxDecimals: 1 })}% load · ${formatNumber(result.deratedNominalW, { maxDecimals: 0 })} W derated`,
      };
    },
  },
  {
    slug: "home-backup-sizing",
    href: "/home-backup-sizing",
    title: "Home Backup Battery Sizing Calculator",
    description:
      "Size a backup battery bank for essential loads, runtime, voltage, and depth of discharge.",
    keywords: [
      "home backup battery sizing",
      "off grid backup ah",
      "emergency battery bank",
    ],
    icon: Home,
    tag: "Battery",
    category: "battery",
    suggestions: [
      "inverter-peak-load-surge",
      "generator-runtime-savings",
      "battery-bank-size",
      "ups-runtime",
      "inverter-loss-calculator",
    ],
    fields: [
      { id: "loadWatts", label: "Essential load", unit: "W", placeholder: "800" },
      { id: "backupHours", label: "Backup time", unit: "hrs", placeholder: "8" },
      { id: "systemVoltage", label: "System voltage", unit: "V", placeholder: "48" },
      {
        id: "depthOfDischargePercent",
        label: "Usable depth of discharge",
        inputType: "range",
        min: 50,
        max: 95,
        step: 5,
        defaultValue: "80",
        unit: "%",
      },
      {
        id: "inverterEfficiencyPercent",
        label: "Inverter efficiency",
        unit: "%",
        placeholder: "92",
        defaultValue: "92",
      },
    ],
    result: {
      label: "Minimum bank size",
      emptyMessage: "Enter load, hours & voltage",
    },
    seo: {
      sections: [
        {
          heading: "Sizing formula",
          body: "Wh needed = (load W × hours) ÷ inverter efficiency. Bank Wh = Wh needed ÷ (DoD ÷ 100). Bank Ah = bank Wh ÷ system voltage.",
        },
        {
          heading: "Add margin",
          body: "Consider 10–20% extra for battery aging and cold weather. Lithium often allows 80–90% DoD; lead-acid is typically 50%.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Is this for whole house? A: Use essential circuits only—fridge, lights, internet. Q: Include solar? A: This is storage-only; add solar yield separately.",
        },
      ],
    },
    compute(values) {
      const loadWatts = parsePositive(values.loadWatts ?? "");
      const backupHours = parsePositive(values.backupHours ?? "");
      const systemVoltage = parsePositive(values.systemVoltage ?? "");
      const depthOfDischargePercent = Number(
        values.depthOfDischargePercent?.trim() || "80"
      );
      const inverterEfficiencyPercent = parsePositive(
        values.inverterEfficiencyPercent ?? ""
      );
      if (
        loadWatts === null ||
        backupHours === null ||
        systemVoltage === null ||
        inverterEfficiencyPercent === null ||
        depthOfDischargePercent <= 0 ||
        depthOfDischargePercent > 100
      ) {
        return { value: null };
      }
      const result = calculateHomeBackupSizing({
        loadWatts,
        backupHours,
        systemVoltage,
        depthOfDischargePercent,
        inverterEfficiencyPercent,
      });
      return {
        value: formatNumber(result.bankAh, { maxDecimals: 0 }),
        unit: "Ah",
        detail: `${result.bankWh} Wh bank · ${result.whNeeded} Wh load energy incl. inverter loss`,
      };
    },
  },
  {
    slug: "battery-voltage-drop",
    href: "/battery-voltage-drop",
    title: "Battery Voltage Drop Calculator",
    description:
      "Estimate DC wire voltage drop and voltage at the load from amps, length, and system voltage.",
    keywords: [
      "battery voltage drop calculator",
      "dc wire voltage drop",
      "battery cable loss",
    ],
    icon: Cable,
    tag: "Battery",
    category: "battery",
    suggestions: ["dc-cable-size", "watts-to-amps", "battery-runtime"],
    fields: [
      { id: "loadAmps", label: "Load current", unit: "A", placeholder: "40" },
      { id: "oneWayLengthFt", label: "One-way wire length", unit: "ft", placeholder: "15" },
      { id: "systemVoltage", label: "System voltage", unit: "V", placeholder: "12" },
    ],
    result: {
      label: "Voltage at load",
      emptyMessage: "Enter amps, length & voltage",
    },
    seo: {
      sections: [
        {
          heading: "Why voltage drop matters",
          body: "Undersized cables cause sag that trips inverters and reduces performance. Aim for ≤3% drop on critical DC runs.",
        },
        {
          heading: "Wire sizing",
          body: "We recommend a conservative AWG from ampacity tables, then calculate drop for that gauge. Use DC Cable Size for manual gauge picks.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: One-way or round-trip? A: Enter one-way length; math uses round-trip resistance. Q: Copper only? A: Yes—aluminum needs larger gauge.",
        },
      ],
    },
    compute(values) {
      const loadAmps = parsePositive(values.loadAmps ?? "");
      const oneWayLengthFt = parsePositive(values.oneWayLengthFt ?? "");
      const systemVoltage = parsePositive(values.systemVoltage ?? "");
      if (loadAmps === null || oneWayLengthFt === null || systemVoltage === null) {
        return { value: null };
      }
      const result = calculateBatteryVoltageDrop({
        loadAmps,
        oneWayLengthFt,
        systemVoltage,
      });
      return {
        value: formatNumber(result.voltageAtLoad, { maxDecimals: 2 }),
        unit: "V",
        detail: `${result.dropPercent}% drop (${result.dropVolts} V) · ${result.recommendedAwg} AWG recommended`,
      };
    },
  },
  {
    slug: "battery-calendar-aging",
    href: "/battery-calendar-aging",
    title: "Battery Calendar Aging Calculator",
    description:
      "Estimate Li-ion capacity fade from storage temperature, average SOC, and pack age—calendar loss % and remaining SoH.",
    keywords: [
      "battery calendar aging",
      "storage soc degradation",
      "li-ion shelf life calculator",
      "battery state of health storage",
      "lfp nmc calendar fade",
    ],
    icon: Calendar,
    tag: "Battery",
    category: "battery",
    suggestions: [
      "battery-percentage",
      "battery-depth-of-discharge",
      "ev-battery-degradation",
    ],
    fields: [
      {
        id: "avgStorageTempC",
        label: "Avg storage temperature",
        unit: "°C",
        placeholder: "25",
        hint: "Ambient where the pack spends most idle hours",
      },
      {
        id: "avgSocPercent",
        label: "Average charge level",
        unit: "% SOC",
        placeholder: "50",
        hint: "Mean state of charge while stored—not peak trips",
      },
      {
        id: "batteryAgeYears",
        label: "Pack age",
        unit: "years",
        placeholder: "3",
        defaultValue: "0",
      },
    ],
    result: {
      label: "Remaining SoH",
      emptyMessage: "Enter storage °C, avg SOC % & age",
    },
    seo: {
      sections: [
        {
          heading: "Why calendar aging happens",
          body: "Li-ion cells degrade electrochemically even at zero cycles—SEI growth, electrolyte oxidation, and electrode interactions continue. Heat and high state-of-charge accelerate side reactions. That is calendar aging, distinct from cycle (throughput) aging.",
        },
        {
          heading: "Model assumptions",
          body: "Baseline ~2%/year fade at 25 °C and 50% SOC. Rate scales ~2× per 10 °C above 25 °C and rises sharply when average SOC stays above 80–100%. Planning estimate only—chemistries (LFP vs. NMC) and BMS differ.",
        },
        {
          heading: "Storage best practices",
          body: "For long idle periods: ~50% SOC, cool and dry (15–25 °C ideal), avoid hot garages at 100%. Re-check SoH before returning backup or seasonal vehicles to service.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include driving cycles? A: No—this is calendar-only; add cycle wear separately. Q: Can SoH recover? A: No—fade is largely irreversible. Q: Cold storage? A: Slows calendar fade vs. hot, but avoid charging lithium below 0 °C.",
        },
      ],
    },
    compute(values) {
      const tempRaw = values.avgStorageTempC?.trim() ?? "";
      const avgStorageTempC =
        tempRaw === "" || tempRaw === "-" ? null : Number(tempRaw);
      const avgSocPercent = parsePositive(values.avgSocPercent ?? "");
      const batteryAgeYears = parseNonNegative(values.batteryAgeYears ?? "");
      if (
        avgStorageTempC === null ||
        !Number.isFinite(avgStorageTempC) ||
        avgSocPercent === null ||
        avgSocPercent > 100 ||
        batteryAgeYears === null
      ) {
        return { value: null };
      }
      const result = calculateBatteryCalendarAging({
        avgStorageTempC,
        avgSocPercent,
        batteryAgeYears,
      });
      return {
        value: formatNumber(result.remainingSoh, { maxDecimals: 1 }),
        unit: "% SoH",
        detail: `${result.calendarLossPercent}% calendar loss · ${result.annualLossPercent}%/yr at ${avgStorageTempC}°C & ${avgSocPercent}% avg SOC`,
      };
    },
  },
  {
    slug: "bess-roi",
    href: "/bess-roi",
    title: "BESS ROI Calculator (Battery Energy Storage System)",
    description:
      "See if adding battery storage to existing solar pays back from peak vs. off-peak TOU arbitrage—daily savings, payback years, and LCOS.",
    keywords: [
      "bess roi calculator",
      "battery energy storage system roi",
      "solar battery payback",
      "tou battery arbitrage",
      "levelized cost of storage lcos",
      "peak off peak battery savings",
    ],
    icon: BatteryCharging,
    tag: "BESS ROI",
    category: "battery",
    suggestions: [
      "electricity-rate-plan",
      "battery-arbitrage-roi",
      "solar-degradation-20-year-roi",
      "battery-cost",
    ],
    fields: [
      {
        id: "batteryCapacityKwh",
        label: "Battery capacity",
        unit: "kWh",
        placeholder: "13.5",
        hint: "Nameplate usable nameplate (e.g. Powerwall 13.5 kWh)",
      },
      {
        id: "batteryInstallCost",
        label: "Battery cost (installed)",
        unit: "$",
        placeholder: "12000",
        hint: "Hardware + installation before incentives",
      },
      {
        id: "peakRatePerKwh",
        label: "Peak electricity rate",
        unit: "$/kWh",
        placeholder: "0.38",
        hint: "On-peak or summer peak ¢/kWh from your TOU plan",
      },
      {
        id: "offPeakRatePerKwh",
        label: "Off-peak electricity rate",
        unit: "$/kWh",
        placeholder: "0.09",
        hint: "Night / super-off-peak rate you charge from",
      },
      {
        id: "cyclesPerDay",
        label: "Cycles per day",
        unit: "#",
        placeholder: "1",
        defaultValue: "1",
        hint: "Full charge–discharge arbitrage cycles per day",
      },
      {
        id: "batteryLifeYears",
        label: "Battery life",
        unit: "years",
        placeholder: "10",
        hint: "Planning horizon or warranty period for LCOS",
      },
      {
        id: "depthOfDischargePercent",
        label: "Depth of discharge (DoD)",
        unit: "%",
        placeholder: "90",
        defaultValue: "90",
        hint: "Usable fraction of nameplate per cycle",
      },
      {
        id: "roundTripEfficiencyPercent",
        label: "Round-trip efficiency",
        unit: "%",
        placeholder: "90",
        defaultValue: "90",
        hint: "AC charge + discharge losses (inverter + BMS)",
      },
    ],
    result: {
      label: "Payback period",
      emptyMessage: "Enter capacity, cost, TOU rates & battery life",
    },
    seo: {
      sections: [
        {
          heading: "When BESS arbitrage pays",
          body: "Daily savings ≈ (peak − off-peak) × kWh shifted per cycle × cycles/day. kWh shifted = capacity × DoD × round-trip efficiency. Without a wide TOU spread, payback stretches—compare your tariff first with the Electricity Rate Plan calculator.",
        },
        {
          heading: "Payback & LCOS",
          body: "Payback years = installed cost ÷ annual savings. LCOS (levelized cost of storage) = installed cost ÷ total kWh delivered over battery life—useful to compare against buying peak energy from the grid.",
        },
        {
          heading: "Depth of discharge",
          body: "Higher DoD yields more arbitrage kWh but increases cycle aging. Many lithium warranties cap daily DoD (e.g. 80–90%). Model conservatively if you also use the pack for backup.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include solar self-consumption? A: This tool is TOU spread + cycles; add avoided export/import separately. Q: Tax credits? A: Subtract incentives from install cost before payback. Q: vs. Battery Arbitrage ROI? A: That tool estimates profit without install cost or LCOS.",
        },
      ],
    },
    compute(values) {
      const batteryCapacityKwh = parsePositive(values.batteryCapacityKwh ?? "");
      const batteryInstallCost = parsePositive(values.batteryInstallCost ?? "");
      const peakRatePerKwh = parsePositive(values.peakRatePerKwh ?? "");
      const offPeakRatePerKwh = parsePositive(values.offPeakRatePerKwh ?? "");
      const cyclesPerDay = parsePositive(values.cyclesPerDay ?? "");
      const batteryLifeYears = parsePositive(values.batteryLifeYears ?? "");
      const depthOfDischargePercent = Number(
        values.depthOfDischargePercent?.trim() ?? ""
      );
      const roundTripEfficiencyPercent = parsePositive(
        values.roundTripEfficiencyPercent ?? ""
      );
      if (
        batteryCapacityKwh === null ||
        batteryInstallCost === null ||
        peakRatePerKwh === null ||
        offPeakRatePerKwh === null ||
        cyclesPerDay === null ||
        batteryLifeYears === null ||
        roundTripEfficiencyPercent === null ||
        !Number.isFinite(depthOfDischargePercent) ||
        depthOfDischargePercent <= 0 ||
        depthOfDischargePercent > 100 ||
        roundTripEfficiencyPercent <= 0 ||
        roundTripEfficiencyPercent > 100
      ) {
        return { value: null };
      }
      const result = calculateBessRoi({
        batteryCapacityKwh,
        batteryInstallCost,
        peakRatePerKwh,
        offPeakRatePerKwh,
        cyclesPerDay,
        batteryLifeYears,
        depthOfDischargePercent,
        roundTripEfficiencyPercent,
      });
      return {
        value:
          result.paybackYears !== null
            ? formatNumber(result.paybackYears, { maxDecimals: 1 })
            : "—",
        unit: result.paybackYears !== null ? "yr" : undefined,
        detail: `${formatCurrency(result.dailySavings)}/day · LCOS $${formatNumber(result.lcosPerKwh, { maxDecimals: 3 })}/kWh`,
      };
    },
  },
  {
    slug: "critical-load-analysis",
    href: "/critical-load-analysis",
    relatedArticleId: "home-backup-load-guide",
    title: "Critical Load Analysis",
    description:
      "Plan home backup power by listing essential devices, daily runtime, and target outage hours.",
    keywords: [
      "critical load analysis",
      "home backup power calculator",
      "essential load sizing",
      "backup battery planning",
    ],
    icon: Shield,
    tag: "Backup",
    category: "backup",
    suggestions: [
      "home-backup-sizing",
      "ups-runtime",
      "inverter-peak-load-surge",
      "battery-bank-size",
    ],
    fields: [
      ...Array.from({ length: CRITICAL_LOAD_MAX_DEVICE_SLOTS }, (_, index) => {
        const slot = index + 1;
        return [
          { id: `device${slot}Name`, label: `Device ${slot} name` },
          {
            id: `device${slot}Watts`,
            label: `Device ${slot} running watts`,
            unit: "W",
          },
          {
            id: `device${slot}Hours`,
            label: `Device ${slot} hours per day`,
            unit: "hrs",
          },
          {
            id: `device${slot}HighSurge`,
            label: `Device ${slot} high surge`,
          },
        ];
      }).flat(),
      {
        id: "backupTargetHours",
        label: "Backup target time",
        unit: "hrs",
        placeholder: "8",
        defaultValue: "8",
      },
    ],
    result: {
      label: "Required Wh capacity",
      emptyMessage: "Add devices and backup target time",
    },
    seo: {
      sections: [
        {
          heading: "How critical load analysis works",
          body: "List each essential appliance with running watts and hours used per day. We average daily consumption into an hourly Wh rate, multiply by your target outage duration, and add a 20% safety buffer for inverter loss and aging.",
        },
        {
          heading: "Battery bank suggestion",
          body: "The 12 V 100 Ah count is a planning shortcut—nominal 1,200 Wh per battery with 80% depth of discharge and 92% inverter efficiency. Pair with Home Backup Battery Sizing for voltage, DoD, and bank Ah.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Peak vs. average load? A: Total running watts shows simultaneous demand; Wh capacity uses your daily usage pattern. Q: Include surge? A: Use Inverter Peak Load Surge for motor start sizing. Q: Whole house? A: List only circuits you need during an outage.",
        },
      ],
    },
    compute(values) {
      const devices = parseCriticalLoadDevicesFromValues(values);
      const backupTargetHours = parsePositive(values.backupTargetHours ?? "");
      if (!devices || backupTargetHours === null) {
        return { value: null };
      }

      const result = calculateCriticalLoadAnalysis({
        devices,
        backupTargetHours,
      });

      return {
        value: formatNumber(result.requiredWh, { maxDecimals: 0 }),
        unit: "Wh",
        detail: `${formatNumber(result.totalRunningWatts, { maxDecimals: 0 })} W total load · ${result.batteryBankLabel} · ${result.inverterEfficiencyPercent}% inverter`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
