import type { CalculatorId } from "@/lib/calculators";
import type { EnergySystemProfile, FlowNodeId } from "@/lib/dashboard-config";

const PROFILE_KEY = "wattquick-energy-profile";
const RECENT_KEY = "wattquick-recent-calculators";
const VISITED_NODES_KEY = "wattquick-visited-flow-nodes";
const MAX_RECENT = 4;

export interface RecentCalculatorEntry {
  id: CalculatorId;
  usedAt: number;
  resultSnapshot?: string;
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

export function nodeVisitKey(
  profile: EnergySystemProfile,
  nodeId: FlowNodeId
): string {
  return `${profile}:${nodeId}`;
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

export function loadVisitedNodeKeys(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(VISITED_NODES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((k): k is string => typeof k === "string"));
  } catch {
    return new Set();
  }
}

export function markNodeVisited(
  profile: EnergySystemProfile,
  nodeId: FlowNodeId
): void {
  try {
    const key = nodeVisitKey(profile, nodeId);
    const set = loadVisitedNodeKeys();
    set.add(key);
    localStorage.setItem(VISITED_NODES_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
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

export function recordCalculatorUse(
  id: CalculatorId,
  resultSnapshot?: string | null
): void {
  try {
    const now = Date.now();
    const prev = loadRecentCalculators().filter((e) => e.id !== id);
    const snapshot =
      resultSnapshot?.trim() ||
      prev.find((e) => e.id === id)?.resultSnapshot;
    const next: RecentCalculatorEntry[] = [
      {
        id,
        usedAt: now,
        ...(snapshot ? { resultSnapshot: snapshot } : {}),
      },
      ...prev,
    ].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function updateRecentSnapshot(
  id: CalculatorId,
  resultSnapshot: string | null
): void {
  if (!resultSnapshot?.trim()) return;
  try {
    const list = loadRecentCalculators();
    if (list.length === 0 || list[0]?.id !== id) return;
    const next = [
      { ...list[0], resultSnapshot: resultSnapshot.trim() },
      ...list.slice(1),
    ];
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
