"use client";

import { motion } from "framer-motion";
import {
  ENERGY_PROFILES,
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
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap"
      role="radiogroup"
      aria-label="Energy system profile"
    >
      {ENERGY_PROFILES.map((profile) => {
        const active = profile.id === value;
        return (
          <motion.button
            key={profile.id}
            type="button"
            role="radio"
            aria-checked={active}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(profile.id)}
            className={cn(
              "shrink-0 rounded-xl border px-3.5 py-2 text-left transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50",
              active
                ? "border-cyan-500/50 bg-cyan-500/10 text-white shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
            )}
          >
            <span className="block text-xs font-semibold">{profile.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
