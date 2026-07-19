import type { CalculatorCategory } from "@/data/calculator-types";
import type { CalculatorId } from "@/lib/calculators/types";
import { formatCurrency, formatNumber } from "@/lib/format";

/**
 * Everything the interpreter needs to turn a technical result into a plain,
 * daily-life sentence. `values` holds the raw input strings and may be empty
 * for calculators that don't thread inputs through (interpreters degrade to
 * output-only phrasing in that case).
 */
export interface InterpreterContext {
  id: CalculatorId;
  category: CalculatorCategory;
  title: string;
  /** definition.result.label, e.g. "Estimated runtime". */
  resultLabel: string;
  /** Formatted primary value (already known to be non-empty). */
  value: string;
  unit?: string;
  detail?: string | null;
  values: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Number + formatting helpers
// ---------------------------------------------------------------------------

/** Parse a number out of a formatted string like "$1,234.5", "27%", "1.6". */
function toNumber(raw?: string | null): number | null {
  if (raw == null) return null;
  const cleaned = raw.replace(/[^0-9.\-]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === ".") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Parse hours from either "4.5" or a combined "12h 30m" display. */
function parseHours(value: string): number | null {
  const combined = value.match(/(\d+)\s*h\s*(\d+)\s*m/i);
  if (combined) {
    return Number(combined[1]) + Number(combined[2]) / 60;
  }
  return toNumber(value);
}

function fmt(n: number, maxDecimals = 1): string {
  return formatNumber(n, { maxDecimals });
}

function plural(n: number, singular: string, pluralForm = `${singular}s`): string {
  return Math.abs(Math.round(n)) === 1 ? singular : pluralForm;
}

// ---------------------------------------------------------------------------
// Everyday reference points for grounded analogies
// ---------------------------------------------------------------------------

const HOME_DAILY_KWH = 30; // typical US household per day
const PHONE_WH = 12; // one smartphone charge
const MICROWAVE_W = 1500;

function describeHours(h: number): string {
  if (h >= 48) return `more than ${Math.floor(h / 24)} full days between charges`;
  if (h >= 20) return "about a full day between charges";
  if (h >= 8) return "a full 8-hour shift with a little to spare";
  if (h >= 5) return "most of a full work shift";
  if (h >= 2) return "a solid few hours of use";
  if (h >= 1) return "about an hour of use";
  return `roughly ${Math.round(h * 60)} minutes of use`;
}

function describeKwh(kwh: number): string {
  const days = kwh / HOME_DAILY_KWH;
  if (kwh < 1) return "enough to run a laptop for a few hours";
  if (days < 1) return `about ${Math.round(days * 24)} hours of a typical home's power`;
  return `enough to power a typical home for about ${fmt(days)} ${plural(days, "day")}`;
}

function describeWh(wh: number): string {
  if (wh >= 500) return describeKwh(wh / 1000);
  const phones = wh / PHONE_WH;
  if (wh < 40) return "roughly a single phone charge";
  return `about ${Math.round(phones)} phone charges`;
}

function describePower(watts: number): string {
  if (watts < 20) return "about what an LED bulb draws";
  if (watts < 200) return "roughly a refrigerator's draw";
  if (watts < MICROWAVE_W) return "similar to a microwave running";
  return `about ${fmt(watts / MICROWAVE_W)}× a microwave's draw`;
}

function describeMoney(amount: number, unit?: string): string {
  const u = (unit ?? "").toLowerCase();
  if (u.includes("yr") || u.includes("year")) {
    return `that's around ${formatCurrency(amount / 12)} a month`;
  }
  if (u.includes("mo") || u.includes("month")) {
    return `that adds up to about ${formatCurrency(amount * 12)} over a year`;
  }
  return "";
}

// ---------------------------------------------------------------------------
// Unit classification
// ---------------------------------------------------------------------------

type UnitKind =
  | "efficiency-kwh-mi"
  | "energy-kwh"
  | "energy-wh"
  | "capacity-ah"
  | "power-kw"
  | "power-w"
  | "current-a"
  | "voltage-v"
  | "distance-mi"
  | "distance-km"
  | "time-h"
  | "percent"
  | "money"
  | "other";

function classifyUnit(value: string, unit?: string): UnitKind {
  const u = (unit ?? "").toLowerCase().trim();
  const v = value.toLowerCase();

  if (v.includes("$") || u.startsWith("$") || u.includes("/yr") || u.includes("/mo")) {
    return "money";
  }
  if (u.includes("kwh/mi") || u.includes("kwh/km")) return "efficiency-kwh-mi";
  if (u === "kwh" || u.includes("kwh")) return "energy-kwh";
  if (u === "wh") return "energy-wh";
  if (u === "ah") return "capacity-ah";
  if (u === "kw") return "power-kw";
  if (u === "w") return "power-w";
  if (u === "a" || u === "amps") return "current-a";
  if (u === "v" || u === "volts") return "voltage-v";
  if (u === "mi" || u === "miles") return "distance-mi";
  if (u === "km") return "distance-km";
  if (u === "h" || u === "hour" || u === "hours" || /\dh\s*\d+m/.test(v)) return "time-h";
  if (u === "%") return "percent";
  return "other";
}

// ---------------------------------------------------------------------------
// Generic, output-driven fallback (works for any calculator)
// ---------------------------------------------------------------------------

function analogyForKind(kind: UnitKind, n: number, ctx: InterpreterContext): string | null {
  switch (kind) {
    case "energy-kwh":
      return describeKwh(n);
    case "energy-wh":
      return describeWh(n);
    case "power-w":
      return describePower(n);
    case "power-kw":
      return describePower(n * 1000);
    case "time-h": {
      const h = parseHours(ctx.value) ?? n;
      return describeHours(h);
    }
    case "distance-mi":
    case "distance-km":
      return `about ${Math.round(n)} ${plural(n, ctx.unit === "km" ? "kilometer" : "mile")} of travel`;
    case "money":
      return describeMoney(n, ctx.unit) || null;
    default:
      return null;
  }
}

function genericInterpretation(ctx: InterpreterContext): string {
  const n = toNumber(ctx.value);
  const unitText = ctx.unit ? ` ${ctx.unit}` : "";
  const lead = `Your ${ctx.resultLabel.toLowerCase()} comes out to about ${ctx.value}${unitText}.`;
  if (n == null) return lead;
  const analogy = analogyForKind(classifyUnit(ctx.value, ctx.unit), n, ctx);
  return analogy ? `${lead} In everyday terms, that's ${analogy}.` : lead;
}

// ---------------------------------------------------------------------------
// Per-category interpreters
// ---------------------------------------------------------------------------

const CATEGORY_INTERPRETERS: Partial<
  Record<CalculatorCategory, (ctx: InterpreterContext) => string | null>
> = {
  battery: batteryLike,
  sizing: batteryLike,
  backup: batteryLike,
  power: (ctx) => {
    const n = toNumber(ctx.value);
    const kind = classifyUnit(ctx.value, ctx.unit);
    if (n == null) return genericInterpretation(ctx);
    if (kind === "power-w" || kind === "power-kw") {
      const watts = kind === "power-kw" ? n * 1000 : n;
      return `That works out to about ${ctx.value} ${ctx.unit} — ${describePower(watts)}.`;
    }
    if (kind === "current-a") {
      return `That's roughly ${ctx.value} amps of current draw — size your wiring and breakers with headroom above this.`;
    }
    if (kind === "voltage-v") {
      return `That's about ${ctx.value} volts across the circuit.`;
    }
    return genericInterpretation(ctx);
  },
  ev: evLike,
  "commercial-ev": evLike,
  solar: (ctx) => {
    const n = toNumber(ctx.value);
    const kind = classifyUnit(ctx.value, ctx.unit);
    if (n == null) return genericInterpretation(ctx);
    if (kind === "power-kw") {
      return `That's a ${ctx.value} kW solar system — on a sunny day (about 4 sun-hours) it could generate roughly ${fmt(n * 4)} kWh.`;
    }
    if (kind === "energy-kwh") {
      return `That's about ${ctx.value} ${ctx.unit} of solar energy — ${describeKwh(n)}.`;
    }
    if (/panel/i.test(ctx.resultLabel) || (ctx.unit ?? "").toLowerCase() === "panels") {
      return `You'd need roughly ${ctx.value} panels to hit this target — plan your roof or ground space around that count.`;
    }
    return genericInterpretation(ctx);
  },
  appliance: costOrEnergy,
  cost: (ctx) => {
    const n = toNumber(ctx.value);
    const kind = classifyUnit(ctx.value, ctx.unit);
    if (n == null) return genericInterpretation(ctx);
    if ((ctx.unit ?? "").toLowerCase().includes("year") || /payback|break/i.test(ctx.resultLabel)) {
      return `You'd recoup the cost in about ${ctx.value} ${ctx.unit} — everything after that is money in your pocket.`;
    }
    if (kind === "money") {
      const extra = describeMoney(n, ctx.unit);
      return `That comes to about ${ctx.value}${ctx.unit ? ` ${ctx.unit}` : ""}${extra ? ` — ${extra}` : ""}.`;
    }
    return genericInterpretation(ctx);
  },
  tou: costOrEnergy,
  "green-home": costOrEnergy,
  pool: costOrEnergy,
  ebike: mobilityRange,
  escooter: mobilityRange,
  convert: (ctx) => {
    const n = toNumber(ctx.value);
    const unitText = ctx.unit ? ` ${ctx.unit}` : "";
    const lead = `In plain terms, that's ${ctx.value}${unitText}.`;
    if (n == null) return lead;
    const analogy = analogyForKind(classifyUnit(ctx.value, ctx.unit), n, ctx);
    return analogy ? `${lead} Roughly ${analogy}.` : lead;
  },
};

function batteryLike(ctx: InterpreterContext): string | null {
  const kind = classifyUnit(ctx.value, ctx.unit);
  const n = toNumber(ctx.value);
  if (kind === "time-h") {
    const h = parseHours(ctx.value);
    if (h != null) {
      return `Your setup should keep running for about ${ctx.value} ${ctx.unit} — ${describeHours(h)}.`;
    }
  }
  if (kind === "energy-kwh" && n != null) {
    return `That's roughly ${ctx.value} ${ctx.unit} of usable energy — ${describeKwh(n)}.`;
  }
  if (kind === "energy-wh" && n != null) {
    return `That's roughly ${ctx.value} ${ctx.unit} of stored energy — ${describeWh(n)}.`;
  }
  if (kind === "capacity-ah") {
    return `That's ${ctx.value} ${ctx.unit} of battery capacity — multiply by your system voltage to see the watt-hours it actually stores.`;
  }
  return genericInterpretation(ctx);
}

function evLike(ctx: InterpreterContext): string | null {
  const kind = classifyUnit(ctx.value, ctx.unit);
  const n = toNumber(ctx.value);
  if (kind === "time-h") {
    const h = parseHours(ctx.value);
    if (h != null) {
      return `That's about ${ctx.value} ${ctx.unit} of runtime on a charge — ${describeHours(h)}.`;
    }
  }
  if (kind === "efficiency-kwh-mi" && n != null) {
    const tripKwh = n * 30;
    const pctMatch = ctx.detail?.match(/([+-]?\d+(?:\.\d+)?)\s*%/);
    const pctClause = pctMatch
      ? ` — city stop-and-go adds about ${pctMatch[1].replace("+", "")}% over steady highway driving`
      : "";
    return `At ${ctx.value} kWh per mile, a typical 30-mile day would use about ${fmt(tripKwh)} kWh${pctClause}.`;
  }
  if (kind === "distance-mi" && n != null) {
    if (n >= 30) {
      return `That's about ${ctx.value} miles of range — enough for roughly ${Math.round(n / 30)} typical 30-mile ${plural(n / 30, "commute")} on a single charge.`;
    }
    return `That's about ${ctx.value} miles of range before you'd need to plug in again.`;
  }
  if (kind === "money" && n != null) {
    const extra = describeMoney(n, ctx.unit);
    return `That's about ${ctx.value}${ctx.unit ? ` ${ctx.unit}` : ""} in energy cost${extra ? ` — ${extra}` : ""}.`;
  }
  if (kind === "energy-kwh" && n != null) {
    return `That's about ${ctx.value} ${ctx.unit} — ${describeKwh(n)}.`;
  }
  return genericInterpretation(ctx);
}

function mobilityRange(ctx: InterpreterContext): string | null {
  const kind = classifyUnit(ctx.value, ctx.unit);
  const n = toNumber(ctx.value);
  if ((kind === "distance-mi" || kind === "distance-km") && n != null) {
    const unitWord = kind === "distance-km" ? "kilometers" : "miles";
    return `That's about ${ctx.value} ${unitWord} of range on a full charge — plan your rides with a little buffer for hills and headwind.`;
  }
  if (kind === "money" && n != null) {
    const extra = describeMoney(n, ctx.unit);
    return `That's about ${ctx.value}${ctx.unit ? ` ${ctx.unit}` : ""}${extra ? ` — ${extra}` : ""}.`;
  }
  return genericInterpretation(ctx);
}

function costOrEnergy(ctx: InterpreterContext): string | null {
  const kind = classifyUnit(ctx.value, ctx.unit);
  const n = toNumber(ctx.value);
  if (kind === "money" && n != null) {
    const extra = describeMoney(n, ctx.unit);
    return `That's about ${ctx.value}${ctx.unit ? ` ${ctx.unit}` : ""} on your electricity${extra ? ` — ${extra}` : ""}.`;
  }
  if (kind === "energy-kwh" && n != null) {
    return `That's about ${ctx.value} ${ctx.unit} of electricity — ${describeKwh(n)}.`;
  }
  if (kind === "energy-wh" && n != null) {
    return `That's about ${ctx.value} ${ctx.unit} of electricity — ${describeWh(n)}.`;
  }
  if (kind === "power-w" && n != null) {
    return `That's about ${ctx.value} ${ctx.unit} — ${describePower(n)}.`;
  }
  return genericInterpretation(ctx);
}

// ---------------------------------------------------------------------------
// Per-calculator overrides (highest priority)
// ---------------------------------------------------------------------------

const ID_INTERPRETERS: Partial<Record<string, (ctx: InterpreterContext) => string | null>> = {
  "ev-delivery-van-efficiency": (ctx) => {
    const hw = toNumber(ctx.values.highwayKwhPerMile);
    const stops = toNumber(ctx.values.stopsPerMile);
    const penalty = toNumber(ctx.values.stopPenaltyPercent);
    const detailPct = ctx.detail?.match(/([+-]?\d+(?:\.\d+)?)\s*%/);

    let increasePct: number | null = detailPct ? Number(detailPct[1].replace("+", "")) : null;
    let multiplier: number | null = null;
    if (hw != null && stops != null && penalty != null) {
      multiplier = 1 + stops * (penalty / 100);
      increasePct = Math.round((multiplier - 1) * 100);
    } else if (increasePct != null) {
      multiplier = 1 + increasePct / 100;
    }

    if (increasePct == null || multiplier == null) return evLike(ctx);

    const lostPer20 = Math.round(20 * (1 - 1 / multiplier));
    const stopsClause = stops != null ? `With ${fmt(stops)} ${plural(stops, "stop")} per mile, ` : "";
    return `${stopsClause}your delivery van uses about ${increasePct}% more energy than steady highway driving. That's roughly ${lostPer20} ${plural(lostPer20, "mile")} of range lost for every 20 miles you cover in the city.`;
  },
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Turn a computed calculator result into a friendly, 1–2 sentence explanation.
 * Returns `null` when there's nothing sensible to say (caller renders nothing).
 */
export function interpretResult(ctx: InterpreterContext): string | null {
  if (!ctx.value || !ctx.value.trim()) return null;

  const override = ID_INTERPRETERS[ctx.id];
  if (override) {
    const sentence = override(ctx);
    if (sentence) return sentence;
  }

  const byCategory = CATEGORY_INTERPRETERS[ctx.category];
  if (byCategory) {
    const sentence = byCategory(ctx);
    if (sentence) return sentence;
  }

  return genericInterpretation(ctx);
}
