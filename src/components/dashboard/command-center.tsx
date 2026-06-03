"use client";

import { useCallback, useEffect, useState } from "react";
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
} from "@/lib/dashboard-config";
import {
  loadEnergyProfile,
  loadRecentCalculators,
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

  useEffect(() => {
    const stored = loadEnergyProfile();
    if (stored) setProfile(stored);
    setRecent(loadRecentCalculators());
    setHydrated(true);
  }, []);

  const profileConfig = getProfileConfig(profile);

  const handleProfileChange = useCallback((next: EnergySystemProfile) => {
    setProfile(next);
    saveEnergyProfile(next);
  }, []);

  const openCalculator = useCallback((id: CalculatorId) => {
    setModalCalc(id);
  }, []);

  const closeModal = useCallback(() => {
    setModalCalc(null);
    setRecent(loadRecentCalculators());
  }, []);

  return (
    <div className="command-center dark text-foreground">
      <header className="mb-8 space-y-4 sm:mb-10">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <LayoutDashboard className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90">
              WattQuick Command Center
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Energy flow control
            </h1>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {hydrated ? profileConfig.description : "Loading your energy profile…"}{" "}
          Tap any node to launch its calculator without leaving the dashboard.
        </p>
        {hydrated ? (
          <EnergyProfilePicker value={profile} onChange={handleProfileChange} />
        ) : (
          <div className="h-10 animate-pulse rounded-xl bg-white/5" aria-hidden />
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(220px,280px)] lg:gap-8">
        <section
          className={cn(
            glassDashboard("primary"),
            "command-center-diagram relative overflow-hidden rounded-3xl p-4 sm:p-6"
          )}
          aria-label="Interactive energy flow diagram"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(34,211,238,0.08),transparent)]"
            aria-hidden
          />
          <div className="glass-neon__inner relative">
            <EnergyFlowDiagram
              profile={profileConfig}
              onOpenCalculator={openCalculator}
            />
          </div>
        </section>

        <DashboardWidgets recent={recent} onOpenCalculator={openCalculator} />
      </div>

      <CalculatorModal calculatorId={modalCalc} onClose={closeModal} />
    </div>
  );
}
