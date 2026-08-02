import {
  Anchor,
  BatteryCharging,
  Refrigerator,
  Sun,
  Tent,
  Zap,
} from "lucide-react";
import { formatDuration, formatNumber, parsePositive } from "@/lib/format";
import {
  calculateCampingFridgeRuntime,
  calculateInverterOverload,
  calculateMarineRuntime,
  calculatePortableRecharge,
  calculateRvSolar,
} from "@/lib/calculators/rv-marine";
import {
  formatPowerStationPlannerResult,
  POWER_STATION_ALTERNATOR_PRESETS,
  POWER_STATION_CAPACITY_PRESETS,
  POWER_STATION_INVERTER_PRESETS,
  POWER_STATION_SOLAR_PRESETS,
  POWER_STATION_WEATHER_OPTIONS,
} from "@/lib/calculators/power-station-planner";
import type { CalculatorDataEntry } from "@/data/calculator-types";

const seo = (heading: string, body: string, faq: string) => ({
  sections: [{ heading, body }, { heading: "Frequently asked questions", body: faq }],
});

export const calculatorsRvMarine = [
  {
    slug: "power-station-planner",
    href: "/power-station-planner",
    title: "Portable Power Station & RV Off-Grid Energy Planner",
    description:
      "Plan camping and RV energy: daily Wh balance, off-grid autonomy days, solar and alternator recharge, and appliance surge limits.",
    keywords: [
      "portable power station planner",
      "rv off-grid energy calculator",
      "camping power station solar",
      "power station autonomy days",
      "rv appliance energy balance",
    ],
    icon: Tent,
    tag: "Off-Grid",
    category: "rv-marine",
    suggestions: [
      "rv-solar-calculator",
      "portable-power-station-recharge",
      "camping-fridge-runtime",
      "12v-to-120v-inverter",
    ],
    fields: [
      {
        id: "capacityPreset",
        label: "Power station capacity",
        inputType: "select",
        defaultValue: "1000",
        options: [...POWER_STATION_CAPACITY_PRESETS],
      },
      {
        id: "capacityWhCustom",
        label: "Custom capacity",
        unit: "Wh",
        placeholder: "1500",
        defaultValue: "1500",
        advanced: true,
      },
      {
        id: "inverterPreset",
        label: "Max AC inverter output",
        inputType: "select",
        defaultValue: "1000",
        options: [...POWER_STATION_INVERTER_PRESETS],
      },
      {
        id: "inverterWCustom",
        label: "Custom continuous watts",
        unit: "W",
        placeholder: "1500",
        defaultValue: "1500",
        advanced: true,
      },
      {
        id: "inverterSurgeCustom",
        label: "Custom surge watts",
        unit: "W",
        placeholder: "3000",
        defaultValue: "3000",
        advanced: true,
      },
      {
        id: "solarPreset",
        label: "Portable solar panels",
        inputType: "select",
        defaultValue: "200",
        options: [...POWER_STATION_SOLAR_PRESETS],
      },
      {
        id: "solarWCustom",
        label: "Custom solar watts",
        unit: "W",
        placeholder: "600",
        defaultValue: "600",
        advanced: true,
      },
      {
        id: "sunHours",
        label: "Peak sun hours",
        unit: "hrs",
        placeholder: "5",
        defaultValue: "5",
      },
      {
        id: "weather",
        label: "Weather condition",
        inputType: "select",
        defaultValue: "sunny",
        options: [...POWER_STATION_WEATHER_OPTIONS],
      },
      {
        id: "alternatorPreset",
        label: "Vehicle DC-DC / alternator",
        inputType: "select",
        defaultValue: "none",
        options: [...POWER_STATION_ALTERNATOR_PRESETS],
      },
      {
        id: "alternatorWCustom",
        label: "Custom DC-DC watts",
        unit: "W",
        placeholder: "400",
        defaultValue: "400",
        advanced: true,
      },
      {
        id: "drivingHoursPerDay",
        label: "Hours driving per day",
        unit: "hrs",
        placeholder: "2",
        defaultValue: "2",
      },
    ],
    result: {
      label: "Off-grid autonomy",
      emptyMessage: "Enter station, solar, and appliance details",
    },
    seo: seo(
      "Off-grid power station energy balance",
      "Daily load Wh is the sum of appliance watts × hours/day. Solar yield = panel W × peak sun hours × weather factor × 85% efficiency. Alternator Wh = DC-DC watts × driving hours. Autonomy uses usable pack Wh (≈90% of capacity) against net daily deficit, with surge checks against inverter continuous and peak ratings.",
      "Q: Why does my kettle trip the inverter? A: High-draw appliances can exceed continuous AC output even when daily Wh looks fine—check the surge & peak load warning."
    ),
    compute: formatPowerStationPlannerResult,
  },
  {
    slug: "rv-solar-calculator",
    href: "/rv-solar-calculator",
    title: "RV Solar & House Battery Calculator",
    description: "Match rooftop panel yield to daily 12V/24V loads and bank Ah shortfall.",
    keywords: ["rv solar calculator", "rv house battery sizing", "camper solar ah"],
    icon: Sun,
    tag: "RV Solar",
    category: "rv-marine",
    suggestions: ["power-station-planner", "solar-roof-space", "solar-battery-bank", "battery-bank-size"],
    fields: [
      { id: "panelWatts", label: "Panel watts", unit: "W", placeholder: "400" },
      { id: "sunHours", label: "Peak sun hours", unit: "hrs", placeholder: "5" },
      { id: "efficiency", label: "System efficiency", unit: "%", placeholder: "80", defaultValue: "80" },
      { id: "dailyLoadWh", label: "Daily load", unit: "Wh/day", placeholder: "1800" },
      { id: "systemVoltage", label: "House voltage", unit: "V", placeholder: "12" },
    ],
    result: { label: "Daily solar yield", emptyMessage: "Enter panels, sun & load" },
    seo: seo(
      "RV solar balance",
      "Yield Wh = panel W × sun h × efficiency%. Shortfall Ah = (load − yield) ÷ voltage when yield is low.",
      "Q: 12 V vs 24 V? A: Higher voltage reduces amps for same watts—smaller cables."
    ),
    compute(values) {
      const pw = parsePositive(values.panelWatts ?? "");
      const sh = parsePositive(values.sunHours ?? "");
      const eff = parsePositive(values.efficiency ?? "");
      const load = parsePositive(values.dailyLoadWh ?? "");
      const v = parsePositive(values.systemVoltage ?? "");
      if (pw === null || sh === null || eff === null || load === null || v === null) return { value: null };
      const r = calculateRvSolar({
        panelWatts: pw,
        sunHours: sh,
        efficiencyPercent: eff,
        dailyLoadWh: load,
        systemVoltage: v,
      });
      return {
        value: formatNumber(r.dailyYieldWh, { maxDecimals: 0 }),
        unit: "Wh/day",
        detail: r.coversLoad
          ? `Surplus ${r.surplusWh} Wh`
          : `Need +${r.bankAhNeeded} Ah bank headroom`,
      };
    },
  },
  {
    slug: "marine-battery-bank",
    href: "/marine-battery-bank",
    title: "Marine Trolling Motor Runtime Calculator",
    description: "Continuous amp draw vs. bank Ah for trolling and house loads.",
    keywords: ["trolling motor battery runtime", "marine battery bank ah", "boat motor amps"],
    icon: Anchor,
    tag: "Marine",
    category: "rv-marine",
    suggestions: ["battery-runtime", "battery-c-rate", "watts-to-amps"],
    fields: [
      { id: "continuousAmps", label: "Continuous draw", unit: "A", placeholder: "25" },
      { id: "bankAh", label: "Bank capacity", unit: "Ah", placeholder: "200" },
      {
        id: "usablePercent",
        label: "Usable DoD",
        inputType: "range",
        min: 50,
        max: 90,
        step: 5,
        defaultValue: "80",
        unit: "%",
      },
    ],
    result: { label: "Runtime", emptyMessage: "Enter amps & bank Ah" },
    seo: seo(
      "Marine runtime",
      "Hours ≈ (Ah × usable%) ÷ continuous amps. Thrust settings vary—use clamp meter on your speed.",
      "Q: Starting surge? A: This is continuous trolling; size breaker for motor inrush separately."
    ),
    compute(values) {
      const a = parsePositive(values.continuousAmps ?? "");
      const ah = parsePositive(values.bankAh ?? "");
      const pct = Number(values.usablePercent?.trim() || "80");
      if (a === null || ah === null) return { value: null };
      const r = calculateMarineRuntime({ continuousAmps: a, bankAh: ah, usablePercent: pct });
      const d = formatDuration(r.runtimeHours);
      return {
        value: d.display,
        unit: d.unit,
        detail: `${r.runtimeMinutes} min at ${a} A continuous`,
      };
    },
  },
  {
    slug: "portable-power-station-recharge",
    href: "/portable-power-station-recharge",
    title: "Portable Power Station Recharge Times",
    description: "Compare wall AC, car 12V, and solar MPPT hours to refill Wh capacity.",
    keywords: ["portable power station charge time", "jackery recharge solar", "power station hours"],
    icon: BatteryCharging,
    tag: "Portable",
    category: "rv-marine",
    suggestions: ["ev-charge-time", "solar-daily-yield", "battery-charging-time"],
    fields: [
      { id: "capacityWh", label: "Capacity", unit: "Wh", placeholder: "1000" },
      { id: "wallWatts", label: "Wall AC input", unit: "W", placeholder: "600" },
      { id: "carWatts", label: "Car 12V input", unit: "W", placeholder: "120" },
      { id: "solarWatts", label: "Solar MPPT", unit: "W", placeholder: "200" },
      { id: "efficiency", label: "Charge efficiency", unit: "%", placeholder: "90", defaultValue: "90" },
    ],
    result: { label: "Fastest: wall AC", emptyMessage: "Enter Wh & input watts" },
    seo: seo(
      "Recharge times",
      "Hours = Wh ÷ (input W × charge efficiency). Solar assumes rated MPPT watts in good sun.",
      "Q: Why wall fastest? A: Higher sustained watts than cig outlet or small panel."
    ),
    compute(values) {
      const wh = parsePositive(values.capacityWh ?? "");
      const wall = parsePositive(values.wallWatts ?? "");
      const car = parsePositive(values.carWatts ?? "");
      const solar = parsePositive(values.solarWatts ?? "");
      const eff = parsePositive(values.efficiency ?? "");
      if (wh === null || wall === null || car === null || solar === null || eff === null)
        return { value: null };
      const r = calculatePortableRecharge({
        capacityWh: wh,
        wallWatts: wall,
        carWatts: car,
        solarWatts: solar,
        chargeEfficiencyPercent: eff,
      });
      const fastest = Math.min(r.hoursWall, r.hoursCar, r.hoursSolar);
      const d = formatDuration(fastest);
      return {
        value: d.display,
        unit: d.unit,
        detail: `Wall ${r.hoursWall}h · Car ${r.hoursCar}h · Solar ${r.hoursSolar}h`,
      };
    },
  },
  {
    slug: "12v-to-120v-inverter",
    href: "/12v-to-120v-inverter",
    title: "12V to 120V Inverter Load Planner",
    description: "Check continuous and surge loads against inverter ratings.",
    keywords: ["inverter surge watts", "12v inverter sizing", "continuous vs surge load"],
    icon: Zap,
    tag: "Inverter",
    category: "rv-marine",
    suggestions: ["inverter-sizing", "inverter-loss-calculator", "watts-to-amps"],
    fields: [
      { id: "inverterContinuousW", label: "Inverter continuous", unit: "W", placeholder: "2000" },
      { id: "inverterSurgeW", label: "Inverter surge", unit: "W", placeholder: "4000" },
      { id: "loadContinuousW", label: "Load continuous", unit: "W", placeholder: "1400" },
      { id: "loadSurgeW", label: "Load surge", unit: "W", placeholder: "2800" },
    ],
    result: { label: "Load vs. rating", emptyMessage: "Enter inverter & load W" },
    seo: seo(
      "Surge planning",
      "Loads must stay under continuous and surge ratings. Motor starts drive surge—list compressor and pump SKUs.",
      "Q: Inverter beep then trip? A: Often surge exceeded or battery sag under load."
    ),
    compute(values) {
      const ic = parsePositive(values.inverterContinuousW ?? "");
      const is = parsePositive(values.inverterSurgeW ?? "");
      const lc = parsePositive(values.loadContinuousW ?? "");
      const ls = parsePositive(values.loadSurgeW ?? "");
      if (ic === null || is === null || lc === null || ls === null) return { value: null };
      const r = calculateInverterOverload({
        inverterContinuousW: ic,
        inverterSurgeW: is,
        loadContinuousW: lc,
        loadSurgeW: ls,
      });
      return {
        value: r.continuousOk && r.surgeOk ? "OK" : "Over",
        unit: "",
        detail: `Continuous ${r.loadPercentOfContinuous}% · headroom ${r.headroomContinuous}% · surge ${r.surgeOk ? "OK" : "exceeded"}`,
      };
    },
  },
  {
    slug: "camping-fridge-runtime",
    href: "/camping-fridge-runtime",
    title: "12V Camping Fridge Runtime Calculator",
    description: "Ambient temperature effect on compressor duty cycle and battery days.",
    keywords: ["12v fridge runtime", "camping fridge battery", "compressor fridge ah"],
    icon: Refrigerator,
    tag: "Camping",
    category: "rv-marine",
    suggestions: ["power-station-planner", "fridge-energy-usage", "battery-runtime", "rv-solar-calculator"],
    fields: [
      { id: "batteryWh", label: "Battery energy", unit: "Wh", placeholder: "1200" },
      { id: "ratedDailyWh", label: "Fridge rated use", unit: "Wh/day", placeholder: "350", hint: "At 77°F lab rating" },
      {
        id: "ambient",
        label: "Ambient heat",
        inputType: "select",
        defaultValue: "mild",
        options: [
          { value: "cool", label: "Cool (60–70°F)" },
          { value: "mild", label: "Mild (70–85°F)" },
          { value: "hot", label: "Hot (85°F+)" },
        ],
        colSpan: 2,
      },
    ],
    result: { label: "Estimated runtime", emptyMessage: "Enter battery & fridge Wh/day" },
    seo: seo(
      "Duty cycle in heat",
      "Hot ambient increases compressor duty. Cool ≈0.85× rated Wh, mild 1.0×, hot 1.35× daily draw.",
      "Q: Ice vs compressor? A: This targets 12V compressor fridges, not ice chests."
    ),
    compute(values) {
      const wh = parsePositive(values.batteryWh ?? "");
      const rated = parsePositive(values.ratedDailyWh ?? "");
      const amb = values.ambient;
      const factors = { cool: 0.85, mild: 1, hot: 1.35 };
      if (wh === null || rated === null || !(amb in factors)) return { value: null };
      const r = calculateCampingFridgeRuntime({
        batteryWh: wh,
        ratedDailyWh: rated,
        ambientFactor: factors[amb as keyof typeof factors],
      });
      return {
        value: formatNumber(r.runtimeHours, { maxDecimals: 0 }),
        unit: "hours",
        detail: `~${r.adjustedDailyWh} Wh/day draw in ${amb} conditions`,
      };
    },
  },
] as const satisfies readonly CalculatorDataEntry[];
