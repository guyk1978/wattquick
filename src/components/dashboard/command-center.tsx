"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { CalculatorModal } from "@/components/dashboard/calculator-modal";
import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets";
import { EnergyFlowDiagram } from "@/components/dashboard/energy-flow-diagram";
import { EnergyProfilePicker } from "@/components/dashboard/energy-profile-picker";
import type { CalculatorId } from "@/lib/calculators";
import {
  DEFAULT_ENERGY_PROFILE,
  getProfileConfig,
  type EnergySystemProfile,
  type FlowNodeId,
} from "@/lib/dashboard-config";
import { getAddedNodeIds, getNodeIds } from "@/lib/dashboard-scenario";
import {
  loadEnergyProfile,
  loadRecentCalculators,
  loadVisitedNodeKeys,
  markNodeVisited,
  nodeVisitKey,
  saveEnergyProfile,
  type RecentCalculatorEntry,
} from "@/lib/dashboard-storage";
import { glassDashboard } from "@/lib/glass-ui";
import { cn } from "@/lib/utils";

export function CommandCenter() {
  const [profile, setProfile] = useState<EnergySystemProfile>(
    DEFAULT_ENERGY_PROFILE
  );
  const [hydrated, setHydrated] = useState(false);
  const [recent, setRecent] = useState<RecentCalculatorEntry[]>([]);
  const [modalCalc, setModalCalc] = useState<CalculatorId | null>(null);
  const [visitedKeys, setVisitedKeys] = useState<Set<string>>(new Set());
  const [newNodeIds, setNewNodeIds] = useState<Set<FlowNodeId>>(new Set());
  const prevNodeIdsRef = useRef<FlowNodeId[]>(
    getNodeIds(getProfileConfig(DEFAULT_ENERGY_PROFILE).nodes)
  );

  const profileConfig = getProfileConfig(profile);

  const unvisitedNodeIds = useMemo(() => {
    const unvisited = new Set<FlowNodeId>();
    for (const node of profileConfig.nodes) {
      const key = nodeVisitKey(profile, node.id);
      if (!visitedKeys.has(key)) unvisited.add(node.id);
    }
    return unvisited;
  }, [profile, profileConfig.nodes, visitedKeys]);

  useEffect(() => {
    const stored = loadEnergyProfile();
    if (stored) {
      setProfile(stored);
      prevNodeIdsRef.current = getNodeIds(getProfileConfig(stored).nodes);
    }
    setRecent(loadRecentCalculators());
    setVisitedKeys(loadVisitedNodeKeys());
    setHydrated(true);
  }, []);

  const handleProfileChange = useCallback((next: EnergySystemProfile) => {
    const nextConfig = getProfileConfig(next);
    const nextIds = getNodeIds(nextConfig.nodes);
    const added = getAddedNodeIds(prevNodeIdsRef.current, nextIds);
    prevNodeIdsRef.current = nextIds;
    setNewNodeIds(new Set(added));
    setProfile(next);
    saveEnergyProfile(next);
  }, []);

  useEffect(() => {
    if (newNodeIds.size === 0) return;
    const t = window.setTimeout(() => setNewNodeIds(new Set()), 8000);
    return () => window.clearTimeout(t);
  }, [newNodeIds, profile]);

  const refreshRecent = useCallback(() => {
    setRecent(loadRecentCalculators());
  }, []);

  const openCalculator = useCallback((id: CalculatorId) => {
    setModalCalc(id);
  }, []);

  const openFromNode = useCallback(
    (id: CalculatorId, nodeId: FlowNodeId) => {
      markNodeVisited(profile, nodeId);
      setVisitedKeys(loadVisitedNodeKeys());
      setNewNodeIds((prev) => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
      setModalCalc(id);
    },
    [profile]
  );

  const closeModal = useCallback(() => {
    setModalCalc(null);
    refreshRecent();
  }, [refreshRecent]);

  return (
    <div className="command-center text-foreground">
      <header className="mb-8 space-y-4 sm:mb-10">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-none border border-border/60 bg-primary/10 text-primary">
            <LayoutDashboard className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              WattQuick Command Center
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Energy flow control
            </h1>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {hydrated ? profileConfig.description : "Loading your energy profile…"}{" "}
          Pick a scenario—nodes and flows update live. Pulsing nodes are new or not
          yet opened.
        </p>
        {hydrated ? (
          <EnergyProfilePicker value={profile} onChange={handleProfileChange} />
        ) : (
          <div className="h-9 animate-pulse rounded-none bg-muted/40" aria-hidden />
        )}
      </header>

      <div
        className="grid gap-6 lg:grid-cols-[1fr_minmax(200px,240px)] lg:gap-8"
        aria-live="polite"
        aria-atomic="false"
      >
        <section
          className={cn(
            glassDashboard("primary"),
            "command-center-diagram relative overflow-hidden p-3 sm:p-4"
          )}
          aria-label="Interactive energy flow diagram"
        >
          <div className="relative">
            {hydrated ? (
              <EnergyFlowDiagram
                profile={profileConfig}
                scenarioKey={profile}
                onOpenCalculator={openFromNode}
                newNodeIds={newNodeIds}
                unvisitedNodeIds={unvisitedNodeIds}
              />
            ) : (
              <div
                className="flex aspect-[4/3] min-h-[280px] items-center justify-center text-sm text-muted-foreground"
                aria-hidden
              >
                Loading scenario…
              </div>
            )}
          </div>
        </section>

        <DashboardWidgets recent={recent} onOpenCalculator={openCalculator} />
      </div>

      <CalculatorModal
        calculatorId={modalCalc}
        onClose={closeModal}
        onOpenCalculator={openCalculator}
      />
    </div>
  );
}
