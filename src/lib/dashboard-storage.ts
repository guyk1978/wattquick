import type { CalculatorId } from "@/lib/calculators";
import type { EnergySystemProfile } from "@/lib/dashboard-config";

const PROFILE_KEY = "wattquick-energy-profile";
const RECENT_KEY = "wattquick-recent-calculators";
const MAX_RECENT = 3;

export interface RecentCalculatorEntry {
  id: CalculatorId;
  usedAt: number;
}

function isEnergyProfile(value: string): value is EnergySystemProfile {
  return (
    value === "solar-home" ||
    value === "battery-tou" ||
    value === "ev-home" ||
    value === "off-grid" ||
    value === "rv-marine"
  );
}

export function loadEnergyProfile(): EnergySystemProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw || !isEnergyProfile(raw)) return null;
    return raw;
  } catch {
    return null;
  }
}

export function saveEnergyProfile(profile: EnergySystemProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, profile);
  } catch {
    /* quota / private mode */
  }
}

export function loadRecentCalculators(): RecentCalculatorEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is RecentCalculatorEntry =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as RecentCalculatorEntry).id === "string" &&
          typeof (item as RecentCalculatorEntry).usedAt === "number"
      )
      .slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function recordCalculatorUse(id: CalculatorId): void {
  try {
    const now = Date.now();
    const prev = loadRecentCalculators().filter((e) => e.id !== id);
    const next: RecentCalculatorEntry[] = [
      { id, usedAt: now },
      ...prev,
    ].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
