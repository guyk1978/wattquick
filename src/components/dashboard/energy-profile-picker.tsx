"use client";

import {
  ENERGY_PROFILES,
  getProfileConfig,
  type EnergySystemProfile,
} from "@/lib/dashboard-config";
import { cn } from "@/lib/utils";

interface EnergyProfilePickerProps {
  value: EnergySystemProfile;
  onChange: (profile: EnergySystemProfile) => void;
}

export function EnergyProfilePicker({
  value,
  onChange,
}: EnergyProfilePickerProps) {
  const activeConfig = getProfileConfig(value);

  return (
    <div className="space-y-2">
      <div
        className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap"
        role="radiogroup"
        aria-label="Energy system scenario"
      >
        {ENERGY_PROFILES.map((profile) => {
          const active = profile.id === value;
          return (
            <button
              key={profile.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(profile.id)}
              className={cn(
                "command-center-scenario-chip shrink-0 px-3 py-1.5 text-left text-xs font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                active && "command-center-scenario-chip--active"
              )}
            >
              {profile.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground" role="status">
        <span className="font-semibold text-foreground">
          {activeConfig.nodes.length} nodes
        </span>{" "}
        active in this scenario
      </p>
    </div>
  );
}
