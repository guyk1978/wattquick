import { Battery, Home, Lamp, LayoutGrid, Network, Sun, Thermometer, Wind } from "lucide-react";
import { formatCurrency, formatNumber, parsePositive } from "@/lib/format";
import {
  calculateBessCarbonCost,
  calculateHeatLoss,
  calculateHomeInsulationSavings,
  calculateLedRoi,
  calculateLedSavingsRoi,
  calculateMicrogridRoi,
  GRID_CO2_REGION_PRESETS,
  INSULATION_CLIMATE_PRESETS,
  INSULATION_LEVEL_PRESETS,
  LEGACY_BULB_PRESETS,
  WINDOW_GLAZING_PRESETS,
  calculateSmallWindTurbineYield,
  calculateSolarWaterHeaterEfficiency,
  calculateThermostatSavings,
  calculateWindowHeatGain,
} from "@/lib/calculators/green-home";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const seo = (heading: string, body: string, faq: string) => ({
  sections: [{ heading, body }, { heading: "Frequently asked questions", body: faq }],
});

export const calculatorsGreenHome = [
  {
    slug: "heat-loss-insulation",
    href: "/heat-loss-insulation",
    title: "Building Heat Loss & Insulation Calculator",
    description: "Estimate heat loss watts from envelope area, ΔT, and R-value.",
    keywords: ["heat loss calculator", "r value heat loss", "building envelope btu"],
    icon: Home,
    tag: "Envelope",
    category: "green-home",
    suggestions: ["heater-cost", "heat-pump-vs-resistance", "smart-thermostat-savings"],
    fields: [
      { id: "wallAreaSqFt", label: "Envelope area", unit: "sq ft", placeholder: "2000" },
      { id: "deltaTempF", label: "Indoor−outdoor ΔT", unit: "°F", placeholder: "40" },
      { id: "rValue", label: "Wall R-value", unit: "R", placeholder: "20" },
    ],
    result: { label: "Heat loss", emptyMessage: "Enter area, ΔT & R-value" },
    seo: seo(
      "Heat loss formula",
      "BTU/hr ≈ (area × ΔT) ÷ R. Convert to watts for electric heat sizing. Add roof, windows, and infiltration separately for full models.",
      "Q: Whole house? A: Sum each surface—this is one envelope segment."
    ),
    compute(values) {
      const a = parsePositive(values.wallAreaSqFt ?? "");
      const d = parsePositive(values.deltaTempF ?? "");
      const r = parsePositive(values.rValue ?? "");
      if (a === null || d === null || r === null) return { value: null };
      const res = calculateHeatLoss({ wallAreaSqFt: a, deltaTempF: d, rValue: r });
      return {
        value: formatNumber(res.kw, { maxDecimals: 2 }),
        unit: "kW",
        detail: `${res.btuPerHour} BTU/hr · ${res.watts} W steady loss`,
      };
    },
  },
  {
    slug: "home-insulation-savings",
    href: "/home-insulation-savings",
    title: "Home Insulation Savings Calculator",
    description:
      "Estimate annual heating and cooling savings from upgrading wall insulation and windows—before/after energy use and efficiency score.",
    keywords: [
      "home insulation savings calculator",
      "insulation energy savings",
      "u value calculator",
      "hvac savings insulation",
      "window upgrade savings",
    ],
    icon: Home,
    tag: "Envelope",
    category: "green-home",
    suggestions: [
      "heat-loss-insulation",
      "smart-thermostat-savings",
      "heater-cost",
      "heat-pump-vs-resistance",
    ],
    fields: [
      {
        id: "floorAreaM2",
        label: "Conditioned floor area",
        unit: "m²",
        placeholder: "120",
        defaultValue: "120",
        hint: "Heated/cooled living space",
      },
      {
        id: "insulationLevel",
        label: "Current wall insulation",
        inputType: "select",
        colSpan: 2,
        defaultValue: "standard",
        options: Object.entries(INSULATION_LEVEL_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
      {
        id: "windowType",
        label: "Window glazing",
        inputType: "select",
        colSpan: 2,
        defaultValue: "double",
        options: Object.entries(WINDOW_GLAZING_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
      {
        id: "climateZone",
        label: "Climate zone",
        inputType: "select",
        colSpan: 2,
        defaultValue: "moderate",
        options: Object.entries(INSULATION_CLIMATE_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
        hint: "Auto-detected from your location when available",
      },
      {
        id: "ratePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
        defaultValue: "0.14",
      },
    ],
    result: {
      label: "Annual HVAC savings",
      emptyMessage: "Enter floor area, envelope details & rate",
    },
    seo: {
      sections: [
        {
          heading: "What we model",
          body: "Composite U-value from wall insulation and window type drives estimated annual HVAC kWh for your climate. The upgrade scenario targets advanced insulation plus Low-E glazing—typical deep retrofit targets.",
        },
        {
          heading: "U-value and savings",
          body: "Lower U means less heat loss and gain. Moving from standard walls to high-performance insulation often cuts HVAC energy 20–30% when paired with better glazing. Results are planning estimates—air sealing and HVAC efficiency also matter.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Gas heat? A: Savings scale similarly in BTU terms—enter your blended $/kWh equivalent. Q: Only walls? A: Window type is included; attic work adds savings beyond this model. Q: Climate default? A: We suggest a zone from browser location when permitted.",
        },
      ],
    },
    compute(values) {
      const floorAreaM2 = parsePositive(values.floorAreaM2 ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      const insulationLevel = values.insulationLevel ?? "standard";
      const windowType = values.windowType ?? "double";
      const climateZone = values.climateZone ?? "moderate";
      if (
        floorAreaM2 === null ||
        ratePerKwh === null ||
        !(insulationLevel in INSULATION_LEVEL_PRESETS) ||
        !(windowType in WINDOW_GLAZING_PRESETS) ||
        !(climateZone in INSULATION_CLIMATE_PRESETS)
      ) {
        return { value: null };
      }
      const result = calculateHomeInsulationSavings({
        floorAreaM2,
        insulationLevel: insulationLevel as keyof typeof INSULATION_LEVEL_PRESETS,
        windowType: windowType as keyof typeof WINDOW_GLAZING_PRESETS,
        climateZone: climateZone as keyof typeof INSULATION_CLIMATE_PRESETS,
        ratePerKwh,
      });
      if (!result) return { value: null };
      return {
        value: formatCurrency(result.annualSavings),
        unit: "/yr",
        detail: `${formatNumber(result.savingsPercent, { maxDecimals: 1 })}% · score ${formatNumber(result.efficiencyScoreBefore, { maxDecimals: 1 })}→${formatNumber(result.efficiencyScoreAfter, { maxDecimals: 1 })}/10`,
      };
    },
  },
  {
    slug: "led-savings-roi",
    href: "/led-savings-roi",
    title: "LED Savings & ROI Calculator",
    description:
      "Compare legacy bulb vs. LED costs, CO₂ savings, and payback time for a single fixture.",
    keywords: [
      "led savings calculator",
      "led roi calculator",
      "led payback period",
      "light bulb energy savings",
      "led carbon savings",
    ],
    icon: Lamp,
    tag: "Lighting",
    category: "green-home",
    suggestions: [
      "led-vs-incandescent-roi",
      "lighting-circuit-load",
      "electricity-bill",
      "energy-consumption",
    ],
    fields: [
      {
        id: "legacyBulbType",
        label: "Existing bulb type",
        inputType: "select",
        colSpan: 2,
        defaultValue: "incandescent",
        options: Object.entries(LEGACY_BULB_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
      },
      {
        id: "legacyWatts",
        label: "Existing bulb watts",
        unit: "W",
        placeholder: "60",
        defaultValue: "60",
      },
      {
        id: "ledWatts",
        label: "LED replacement watts",
        unit: "W",
        placeholder: "9",
        defaultValue: "9",
      },
      {
        id: "ledBulbPrice",
        label: "LED bulb price",
        unit: "$",
        placeholder: "4",
        defaultValue: "4",
      },
      {
        id: "hoursPerDay",
        label: "Hours of use per day",
        unit: "hrs",
        placeholder: "5",
        defaultValue: "5",
      },
      {
        id: "ratePerKwh",
        label: "Electricity rate",
        unit: "$/kWh",
        placeholder: "0.14",
        defaultValue: "0.14",
      },
      {
        id: "gridCarbonRegion",
        label: "Grid carbon intensity",
        inputType: "select",
        colSpan: 2,
        defaultValue: "global",
        options: Object.entries(GRID_CO2_REGION_PRESETS).map(([value, preset]) => ({
          value,
          label: preset.label,
        })),
        hint: "Average kg CO₂ per kWh for your region—used for footprint estimates.",
      },
      {
        id: "co2KgPerKwh",
        label: "CO₂ per kWh",
        unit: "kg",
        placeholder: "0.5",
        defaultValue: "0.5",
        hint: "Updates with region—override if you have utility-specific data.",
      },
    ],
    result: {
      label: "Time to break even",
      emptyMessage: "Enter bulb watts, price, hours & rate",
    },
    seo: seo(
      "Payback math",
      "Daily savings = (legacy W − LED W) × hours ÷ 1,000 × $/kWh. Payback days = LED bulb price ÷ daily savings. Operating cost ignores bulb replacements—use LED vs. Incandescent ROI for lifetime bulb economics.",
      "Q: LED uses more watts? A: No payback on energy—pick a lower-watt LED with matched lumens. Q: Whole home? A: Add one row per fixture or use the retrofit ROI calculator for many bulbs."
    ),
    compute(values) {
      const legacyWatts = parsePositive(values.legacyWatts ?? "");
      const ledWatts = parsePositive(values.ledWatts ?? "");
      const ledBulbPrice = parsePositive(values.ledBulbPrice ?? "");
      const hoursPerDay = parsePositive(values.hoursPerDay ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "");
      const co2KgPerKwh = parsePositive(values.co2KgPerKwh ?? "");
      if (
        legacyWatts === null ||
        ledWatts === null ||
        ledBulbPrice === null ||
        hoursPerDay === null ||
        ratePerKwh === null ||
        co2KgPerKwh === null
      ) {
        return { value: null };
      }
      const result = calculateLedSavingsRoi({
        legacyWatts,
        ledWatts,
        ledBulbPrice,
        hoursPerDay,
        ratePerKwh,
        co2KgPerKwh,
      });
      if (!result || result.paybackMonths === null) {
        return { value: null, detail: "LED must use fewer watts than the existing bulb" };
      }
      const monthsLabel =
        result.paybackMonths < 1
          ? `${formatNumber(result.paybackDays ?? 0, { maxDecimals: 0 })} days`
          : `${formatNumber(result.paybackMonths, { maxDecimals: 1 })} months`;
      return {
        value: monthsLabel,
        unit: "",
        detail: `${formatCurrency(result.annualSavings)}/yr · ${formatNumber(result.annualCo2SavedKg, { maxDecimals: 1 })} kg CO₂/yr avoided · ${result.wattSavings} W saved`,
      };
    },
  },
  {
    slug: "led-vs-incandescent-roi",
    href: "/led-vs-incandescent-roi",
    title: "LED vs. Incandescent ROI Calculator",
    description: "Energy and bulb replacement savings when matching lumens with lower watts.",
    keywords: ["led vs incandescent savings", "led roi calculator", "light bulb payback"],
    icon: Lamp,
    tag: "Lighting",
    category: "green-home",
    suggestions: [
      "led-savings-roi",
      "electricity-bill",
      "energy-consumption",
      "lighting-circuit-load",
    ],
    fields: [
      { id: "bulbCount", label: "Bulbs", unit: "#", placeholder: "20" },
      { id: "incandW", label: "Incandescent W", unit: "W", placeholder: "60" },
      { id: "ledW", label: "LED W", unit: "W", placeholder: "9" },
      { id: "hoursPerDay", label: "Hours / day", unit: "hrs", placeholder: "5" },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
      { id: "ledCost", label: "LED bulb $", unit: "$", placeholder: "4" },
      { id: "incandCost", label: "Incand bulb $", unit: "$", placeholder: "1" },
      { id: "ledLife", label: "LED life", unit: "hrs", placeholder: "15000" },
      { id: "incandLife", label: "Incand life", unit: "hrs", placeholder: "1000" },
    ],
    result: { label: "Annual savings", emptyMessage: "Enter bulbs, watts & rates" },
    seo: seo(
      "LED payback",
      "Savings = reduced kWh × rate + fewer replacements. Match lumens and CRI for fair comparison.",
      "Q: Dimming? A: Use compatible dimmers—non-dim LEDs may fail early."
    ),
    compute(values) {
      const n = parsePositive(values.bulbCount ?? "");
      const iw = parsePositive(values.incandW ?? "");
      const lw = parsePositive(values.ledW ?? "");
      const h = parsePositive(values.hoursPerDay ?? "");
      const rate = parsePositive(values.rate ?? "");
      const lc = parsePositive(values.ledCost ?? "");
      const ic = parsePositive(values.incandCost ?? "");
      const ll = parsePositive(values.ledLife ?? "");
      const il = parsePositive(values.incandLife ?? "");
      if (n === null || iw === null || lw === null || h === null || rate === null || lc === null || ic === null || ll === null || il === null)
        return { value: null };
      const r = calculateLedRoi({
        bulbCount: n,
        incandescentWatts: iw,
        ledWatts: lw,
        hoursPerDay: h,
        ratePerKwh: rate,
        ledBulbCost: lc,
        incandBulbCost: ic,
        ledLifeHours: ll,
        incandLifeHours: il,
      });
      return {
        value: formatCurrency(r.totalAnnualSavings),
        unit: "/yr",
        detail: `Energy ${formatCurrency(r.annualEnergySavings)} · bulbs ${formatCurrency(r.annualBulbSavings)}`,
      };
    },
  },
  {
    slug: "smart-thermostat-savings",
    href: "/smart-thermostat-savings",
    title: "Smart Thermostat Savings Calculator",
    description: "HVAC kWh reduction from setback schedules and seasonal rates.",
    keywords: ["smart thermostat savings", "hvac setback calculator", "nest savings kwh"],
    icon: Thermometer,
    tag: "HVAC",
    category: "green-home",
    suggestions: ["heater-cost", "ac-energy-cost", "heat-pump-vs-resistance"],
    fields: [
      { id: "monthlyKwh", label: "Heating/cooling kWh", unit: "kWh/mo", placeholder: "650" },
      {
        id: "setbackPercent",
        label: "Estimated savings",
        inputType: "range",
        min: 5,
        max: 25,
        step: 1,
        defaultValue: "12",
        unit: "%",
        colSpan: 2,
      },
      { id: "rate", label: "Rate", unit: "$/kWh", placeholder: "0.14" },
    ],
    result: { label: "Monthly savings", emptyMessage: "Enter kWh, setback % & rate" },
    seo: seo(
      "Setback impact",
      "Savings ≈ monthly kWh × setback% × rate. EPA and utility studies often cite 8–15% HVAC reduction with learning thermostats.",
      "Q: Heat pump? A: Yes—savings apply to any electric HVAC kWh."
    ),
    compute(values) {
      const k = parsePositive(values.monthlyKwh ?? "");
      const p = Number(values.setbackPercent?.trim() || "12");
      const rate = parsePositive(values.rate ?? "");
      if (k === null || rate === null || p <= 0) return { value: null };
      const r = calculateThermostatSavings({
        monthlyHeatingKwh: k,
        setbackSavingsPercent: p,
        ratePerKwh: rate,
      });
      return {
        value: formatCurrency(r.monthlySavings),
        unit: "/mo",
        detail: `${r.savedKwh} kWh saved · ${formatCurrency(r.annualSavings)}/yr`,
      };
    },
  },
  {
    slug: "window-solar-heat-gain",
    href: "/window-solar-heat-gain",
    title: "Window Solar Heat Gain (SHGC) Calculator",
    description: "Cooling load from glazing SHGC, area, and sun exposure.",
    keywords: ["shgc calculator", "window heat gain", "solar heat gain cooling load"],
    icon: LayoutGrid,
    tag: "Windows",
    category: "green-home",
    suggestions: ["ac-energy-cost", "heat-loss-insulation", "solar-daily-yield"],
    fields: [
      { id: "windowAreaSqFt", label: "Glass area", unit: "sq ft", placeholder: "120" },
      { id: "shgc", label: "SHGC", unit: "", placeholder: "0.35", hint: "0.2–0.7 typical" },
      { id: "peakSunHours", label: "Sun hours / day", unit: "hrs", placeholder: "6" },
      { id: "coolingCop", label: "AC COP", unit: "", placeholder: "3", defaultValue: "3" },
    ],
    result: { label: "Added cooling load", emptyMessage: "Enter area, SHGC & sun hrs" },
    seo: seo(
      "SHGC effect",
      "Lower SHGC blocks more solar gain—critical on west facades. Model scales with glass area and sunny hours.",
      "Q: Low-E vs tint? A: Compare SHGC and VT ratings on NFRC labels."
    ),
    compute(values) {
      const a = parsePositive(values.windowAreaSqFt ?? "");
      const sh = parsePositive(values.shgc ?? "");
      const sun = parsePositive(values.peakSunHours ?? "");
      const cop = parsePositive(values.coolingCop ?? "");
      if (a === null || sh === null || sun === null || cop === null || sh > 1) return { value: null };
      const r = calculateWindowHeatGain({
        windowAreaSqFt: a,
        shgc: sh,
        peakSunHours: sun,
        coolingCop: cop,
      });
      return {
        value: formatNumber(r.coolingKwh, { maxDecimals: 1 }),
        unit: "kWh/day",
        detail: `${r.dailyBtu} BTU/day gain · ~${r.peakCoolingKw} kW peak cooling`,
      };
    },
  },
  {
    slug: "microgrid-roi",
    href: "/microgrid-roi",
    title: "Microgrid ROI Calculator",
    description:
      "Break-even timeline and 10–20 year returns for solar, storage, and on-site generation microgrids.",
    keywords: [
      "microgrid roi calculator",
      "microgrid payback",
      "distributed energy break even",
      "home microgrid savings",
    ],
    icon: Network,
    tag: "Microgrid",
    category: "green-home",
    suggestions: [
      "solar-payback-roi",
      "battery-arbitrage-roi",
      "solar-battery-bank",
    ],
    fields: [
      {
        id: "initialSetupCost",
        label: "Initial setup cost",
        unit: "$",
        placeholder: "45000",
      },
      {
        id: "monthlySavings",
        label: "Monthly savings (self-production)",
        unit: "$/mo",
        placeholder: "320",
        hint: "Utility bill reduction from on-site generation",
      },
      {
        id: "monthlyMaintenance",
        label: "Monthly maintenance",
        unit: "$/mo",
        placeholder: "45",
      },
      {
        id: "annualInflationPercent",
        label: "Annual energy inflation",
        inputType: "range",
        min: 0,
        max: 15,
        step: 0.5,
        defaultValue: "3",
        unit: "%",
        colSpan: 2,
        hint: "Expected yearly rise in retail electricity rates",
      },
    ],
    result: {
      label: "Break-even point",
      emptyMessage: "Enter setup cost, savings & maintenance",
    },
    seo: seo(
      "Microgrid economics",
      "Net monthly benefit = self-production savings minus O&M. Rising utility rates increase effective savings each year—model break-even and long-horizon ROI before committing capex.",
      "Q: Include incentives? A: Subtract tax credits or rebates from setup cost first. Q: What counts as savings? A: Avoided grid kWh × your blended rate, plus demand-charge reductions if applicable."
    ),
    compute(values) {
      const cost = parsePositive(values.initialSetupCost ?? "");
      const savings = parsePositive(values.monthlySavings ?? "");
      const maintenance = parsePositive(values.monthlyMaintenance ?? "");
      const inflation = Number(values.annualInflationPercent?.trim() || "3");
      if (cost === null || savings === null || maintenance === null || inflation < 0) {
        return { value: null };
      }
      const r = calculateMicrogridRoi({
        initialSetupCost: cost,
        monthlySavings: savings,
        monthlyMaintenance: maintenance,
        annualInflationPercent: inflation,
      });
      if (r.breakEvenYears === null) {
        return {
          value: null,
          detail:
            r.monthlyNet <= 0
              ? "Monthly savings must exceed maintenance for a positive payback"
              : "Break-even exceeds 50 years with these inputs",
        };
      }
      return {
        value: formatNumber(r.breakEvenYears, { maxDecimals: 1 }),
        unit: "years",
        detail: `10-yr ROI ${r.roi10Years}% · 20-yr ROI ${r.roi20Years}% · ${formatCurrency(r.cumulative20)} cumulative (20 yr)`,
      };
    },
  },
  {
    slug: "bess-carbon-cost",
    href: "/bess-carbon-cost",
    title: "BESS Round-trip Carbon Cost Calculator",
    description:
      "Estimate annual kg CO₂ from battery round-trip conversion losses and compare grid charging vs. renewable charging.",
    keywords: [
      "bess carbon cost",
      "battery storage co2 emissions",
      "round trip efficiency carbon",
      "home battery carbon footprint",
      "bess lifecycle emissions",
    ],
    icon: Battery,
    tag: "Storage",
    category: "green-home",
    suggestions: [
      "carbon-footprint-offset",
      "solar-battery-bank",
      "microgrid-roi",
    ],
    fields: [
      {
        id: "capacityKwh",
        label: "Battery capacity",
        unit: "kWh",
        placeholder: "13.5",
      },
      {
        id: "roundTripEfficiency",
        label: "Round-trip efficiency",
        unit: "%",
        placeholder: "90",
        defaultValue: "90",
        hint: "AC-AC or DC-DC energy out ÷ energy in per full cycle",
      },
      {
        id: "cyclesPerYear",
        label: "Cycles per year",
        unit: "#/yr",
        placeholder: "250",
        hint: "Full equivalent cycles (throughput ÷ capacity)",
      },
      {
        id: "gridGco2PerKwh",
        label: "Grid carbon intensity",
        unit: "gCO₂/kWh",
        placeholder: "420",
        hint: "Regional average — EPA eGRID or utility disclosure",
      },
    ],
    result: {
      label: "Conversion-loss emissions",
      emptyMessage: "Enter kWh, efficiency, cycles & grid gCO₂/kWh",
    },
    seo: {
      sections: [
        {
          heading: "Why BESS carbon accounting matters",
          body: "Every charge/discharge cycle wastes energy as heat in the battery, inverter, and wiring. That wasted kWh still came from somewhere—if the grid, it carries a carbon tag. Storage is only as green as the electrons you put in.",
        },
        {
          heading: "Round-trip loss formula",
          body: "Loss kWh per cycle ≈ capacity × (1 ÷ efficiency − 1). Annual loss = loss per cycle × cycles/year. kg CO₂ = annual loss kWh × (gCO₂/kWh ÷ 1000). Renewable charging assumes ~0 marginal gCO₂ on those loss kWh.",
        },
        {
          heading: "Make storage greener",
          body: "Charge from on-site solar surplus, community solar, or documented renewable tariffs during low-carbon grid hours. Pair with Solar Daily Yield and Carbon Offset tools for full-site context.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Include manufacturing emissions? A: This is operational loss only—embodied carbon is separate LCA. Q: Partial cycles? A: Enter equivalent full cycles per year (annual throughput ÷ capacity). Q: 95% efficiency? A: Loss shrinks—but never zero.",
        },
      ],
    },
    compute(values) {
      const capacityKwh = parsePositive(values.capacityKwh ?? "");
      const roundTripEfficiency = parsePositive(values.roundTripEfficiency ?? "");
      const cyclesPerYear = parsePositive(values.cyclesPerYear ?? "");
      const gridGco2PerKwh = parsePositive(values.gridGco2PerKwh ?? "");
      if (
        capacityKwh === null ||
        roundTripEfficiency === null ||
        cyclesPerYear === null ||
        gridGco2PerKwh === null ||
        roundTripEfficiency <= 0 ||
        roundTripEfficiency > 100
      ) {
        return { value: null };
      }
      const result = calculateBessCarbonCost({
        capacityKwh,
        roundTripEfficiencyPercent: roundTripEfficiency,
        cyclesPerYear,
        gridGco2PerKwh,
      });
      return {
        value: formatNumber(result.lossCarbonGridKg, { maxDecimals: 1 }),
        unit: "kg CO₂/yr",
        detail: `${result.annualLossKwh} kWh/yr lost · save ${formatNumber(result.carbonSavedWithRenewablesKg, { maxDecimals: 1 })} kg with renewable charging`,
      };
    },
  },
  {
    slug: "solar-water-heater-efficiency",
    href: "/solar-water-heater-efficiency",
    title: "Solar Water Heater Efficiency Calculator",
    description:
      "Estimate thermal efficiency, absorbed kWh, and electric heating savings from tank volume, ΔT, sun hours, and collector area.",
    keywords: [
      "solar water heater efficiency",
      "solar thermal calculator",
      "collector efficiency percent",
      "solar hot water savings",
      "flat plate collector performance",
    ],
    icon: Sun,
    tag: "Solar thermal",
    category: "green-home",
    suggestions: [
      "heater-cost",
      "heat-pump-vs-resistance",
      "solar-daily-yield",
    ],
    fields: [
      {
        id: "tankVolumeLiters",
        label: "Tank volume",
        unit: "L",
        placeholder: "200",
        hint: "Storage tank nominal volume",
      },
      {
        id: "deltaTempC",
        label: "Temperature rise ΔT",
        unit: "°C",
        placeholder: "35",
        hint: "Cold inlet to target hot water",
      },
      {
        id: "sunExposureHours",
        label: "Sun exposure",
        unit: "hrs",
        placeholder: "5",
        hint: "Effective full-sun hours on the collector",
      },
      {
        id: "collectorAreaSqM",
        label: "Collector area",
        unit: "m²",
        placeholder: "3",
        hint: "Gross aperture area of flat-plate or evacuated tubes",
      },
      {
        id: "ratePerKwh",
        label: "Electric rate",
        unit: "$/kWh",
        placeholder: "0.14",
        defaultValue: "0.14",
        hint: "For savings vs. resistance element heating",
      },
    ],
    result: {
      label: "Thermal efficiency",
      emptyMessage: "Enter tank volume, ΔT, sun hours & collector area",
    },
    seo: {
      sections: [
        {
          heading: "Why solar thermal efficiency matters",
          body: "Flat-plate and evacuated-tube collectors convert intercepted sunlight into sensible heat in your tank. Scale, shading, stagnation, and plumbing losses all show up as a gap between incident solar and measured ΔT. Field-checking efficiency explains “why the tank is lukewarm” before you replace hardware.",
        },
        {
          heading: "Energy and efficiency formulas",
          body: "Water energy ≈ liters × 4.186 × ΔT ÷ 3600 kWh. Incident solar ≈ collector m² × sun hours × 0.75 kW/m² average irradiance. Thermal efficiency % = water kWh ÷ incident kWh (capped at 100%). Savings compare the same kWh at your retail electric rate versus a resistance element.",
        },
        {
          heading: "Improve real-world performance",
          body: "Descale heat exchangers, verify tilt/azimuth, insulate store and lines, and log morning vs. afternoon tank temperatures. Re-run after maintenance seasons to catch drift.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Efficiency above 65%? A: You may have surplus sun or optimistic sun hours—verify with on-site irradiance. Q: °F? A: Convert ΔT to °C (Δ°C = Δ°F ÷ 1.8). Q: Thermosyphon vs. pumped? A: Same water-energy math; pumping adds parasitic kWh not modeled here.",
        },
      ],
    },
    compute(values) {
      const tankVolumeLiters = parsePositive(values.tankVolumeLiters ?? "");
      const deltaTempC = parsePositive(values.deltaTempC ?? "");
      const sunExposureHours = parsePositive(values.sunExposureHours ?? "");
      const collectorAreaSqM = parsePositive(values.collectorAreaSqM ?? "");
      const ratePerKwh = parsePositive(values.ratePerKwh ?? "") ?? 0.14;
      if (
        tankVolumeLiters === null ||
        deltaTempC === null ||
        sunExposureHours === null ||
        collectorAreaSqM === null
      ) {
        return { value: null };
      }
      const result = calculateSolarWaterHeaterEfficiency({
        tankVolumeLiters,
        deltaTempC,
        sunExposureHours,
        collectorAreaSqM,
        ratePerKwh,
      });
      return {
        value: formatNumber(result.thermalEfficiencyPercent, { maxDecimals: 1 }),
        unit: "%",
        detail: `${result.energyAbsorbedKwh} kWh to water · save ${formatCurrency(result.electricSavings)} vs. electric · ${result.incidentSolarKwh} kWh incident`,
      };
    },
  },
  {
    slug: "small-wind-turbine-yield",
    href: "/small-wind-turbine-yield",
    title: "Small Wind Turbine Yield Calculator",
    description:
      "Estimate rotor power (W), daily kWh, and annual energy from blade diameter, average wind speed, and system efficiency.",
    keywords: [
      "small wind turbine calculator",
      "wind turbine yield kwh",
      "home wind power estimate",
      "wind speed cubic power",
      "hybrid solar wind sizing",
    ],
    icon: Wind,
    tag: "Wind",
    category: "green-home",
    suggestions: [
      "solar-daily-yield",
      "solar-panel-size",
      "microgrid-roi",
    ],
    fields: [
      {
        id: "bladeDiameterM",
        label: "Blade diameter (rotor)",
        unit: "m",
        placeholder: "3.5",
        hint: "Total rotor diameter, not blade length alone",
      },
      {
        id: "avgWindSpeedMs",
        label: "Average wind speed",
        unit: "m/s",
        placeholder: "5.5",
        hint: "Annual mean at hub height—anemometer preferred",
      },
      {
        id: "efficiencyPercent",
        label: "System efficiency",
        unit: "%",
        placeholder: "35",
        defaultValue: "35",
        hint: "Overall rotor + drivetrain + generator (often 25–45%)",
      },
    ],
    result: {
      label: "Power at average wind",
      emptyMessage: "Enter rotor diameter, wind speed & efficiency",
    },
    seo: {
      sections: [
        {
          heading: "Why wind yield follows v³",
          body: "Kinetic power in wind scales with the cube of speed—double the breeze delivers eight times the power potential. Swept area grows with diameter squared. Small changes in site wind or hub height dominate turbine payback.",
        },
        {
          heading: "Formulas used",
          body: "P (W) ≈ ½ × 1.225 × π(d/2)² × v³ × efficiency. Daily kWh ≈ time-averaged power × 24 h, with a Rayleigh-style factor on mean wind (planning only). Install below ~2.5 m/s average acts as cut-in for most units.",
        },
        {
          heading: "Site vs. spreadsheet",
          body: "Raise turbines above roof turbulence, clear trees in prevailing wind sector, and use real hub-height wind data—not ground-level guesses. Pair with Solar Daily Yield for hybrid microgrid sizing.",
        },
        {
          heading: "Frequently asked questions",
          body: "Q: Efficiency above 59%? A: Betz limit is aerodynamic only—enter manufacturer overall system %. Q: Urban roof? A: Turbulence slashes yield; measure first. Q: Night production? A: Wind complements solar when resource exists—this tool quantifies kWh if wind is there.",
        },
      ],
    },
    compute(values) {
      const bladeDiameterM = parsePositive(values.bladeDiameterM ?? "");
      const avgWindSpeedMs = parsePositive(values.avgWindSpeedMs ?? "");
      const efficiencyPercent = parsePositive(values.efficiencyPercent ?? "");
      if (
        bladeDiameterM === null ||
        avgWindSpeedMs === null ||
        efficiencyPercent === null ||
        efficiencyPercent > 100
      ) {
        return { value: null };
      }
      const result = calculateSmallWindTurbineYield({
        bladeDiameterM,
        avgWindSpeedMs,
        efficiencyPercent,
      });
      return {
        value: formatNumber(result.powerAtMeanWindW, { maxDecimals: 0 }),
        unit: "W",
        detail: `${result.dailyKwh} kWh/day · ${result.annualKwh} kWh/yr · ${result.sweptAreaSqM} m² rotor`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
