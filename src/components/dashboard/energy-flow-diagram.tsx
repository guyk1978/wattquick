"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BatteryCharging,
  Car,
  Fuel,
  Home,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { CalculatorId } from "@/lib/calculators";
import {
  NODE_LAYOUT,
  type EnergyFlowEdge,
  type EnergyProfileConfig,
  type FlowNodeConfig,
  type FlowNodeId,
} from "@/lib/dashboard-config";
import { cn } from "@/lib/utils";

const ICONS: Record<FlowNodeId, LucideIcon> = {
  solar: Sun,
  battery: BatteryCharging,
  grid: Zap,
  load: Home,
  ev: Car,
  generator: Fuel,
};

const ACCENT_RING: Record<FlowNodeConfig["accent"], string> = {
  emerald: "ring-emerald-400/50 shadow-[0_0_28px_rgba(52,211,153,0.35)]",
  cyan: "ring-cyan-400/50 shadow-[0_0_28px_rgba(34,211,238,0.35)]",
  blue: "ring-blue-400/50 shadow-[0_0_28px_rgba(96,165,250,0.35)]",
  amber: "ring-amber-400/50 shadow-[0_0_28px_rgba(251,191,36,0.3)]",
  violet: "ring-violet-400/50 shadow-[0_0_28px_rgba(167,139,250,0.35)]",
};

const STROKE_TONE: Record<EnergyFlowEdge["tone"], string> = {
  green: "stroke-emerald-400/55",
  blue: "stroke-cyan-400/55",
  mixed: "stroke-blue-400/45",
};

const PARTICLE_FILL: Record<EnergyFlowEdge["tone"], string> = {
  green: "#34d399",
  blue: "#22d3ee",
  mixed: "#60a5fa",
};

interface EnergyFlowDiagramProps {
  profile: EnergyProfileConfig;
  scenarioKey: string;
  onOpenCalculator: (id: CalculatorId, nodeId: FlowNodeId) => void;
  /** Nodes added when switching scenario — stronger pulse */
  newNodeIds: Set<FlowNodeId>;
  /** Nodes never opened in this profile */
  unvisitedNodeIds: Set<FlowNodeId>;
  className?: string;
}

function toSvgCoords(id: FlowNodeId): { x: number; y: number } {
  const p = NODE_LAYOUT[id];
  return { x: p.x * 100, y: p.y * 100 };
}

export function EnergyFlowDiagram({
  profile,
  scenarioKey,
  onOpenCalculator,
  newNodeIds,
  unvisitedNodeIds,
  className,
}: EnergyFlowDiagramProps) {
  const activeNodes = useMemo(
    () => new Set(profile.nodes.map((n) => n.id)),
    [profile.nodes]
  );

  const edges = profile.edges.filter(
    (e) => activeNodes.has(e.from) && activeNodes.has(e.to)
  );

  return (
    <div
      className={cn(
        "command-center-flow relative aspect-[4/3] w-full min-h-[280px] sm:min-h-[340px] lg:aspect-[16/11]",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        <motion.svg
          key={`edges-${scenarioKey}`}
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <defs>
            <linearGradient id="flow-glow-green" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(52 211 153 / 0)" />
              <stop offset="50%" stopColor="rgb(52 211 153 / 0.7)" />
              <stop offset="100%" stopColor="rgb(52 211 153 / 0)" />
            </linearGradient>
            <linearGradient id="flow-glow-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(34 211 238 / 0)" />
              <stop offset="50%" stopColor="rgb(34 211 238 / 0.7)" />
              <stop offset="100%" stopColor="rgb(34 211 238 / 0)" />
            </linearGradient>
          </defs>

          <AnimatePresence>
            {edges.map((edge, i) => {
              const a = toSvgCoords(edge.from);
              const b = toSvgCoords(edge.to);
              const strokeClass = STROKE_TONE[edge.tone];
              const particleColor = PARTICLE_FILL[edge.tone];
              const edgeKey = `${scenarioKey}-${edge.from}-${edge.to}`;

              return (
                <motion.g
                  key={edgeKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                >
                  <motion.line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    strokeWidth={0.35}
                    className={strokeClass}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                  />
                  <motion.line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    strokeWidth={0.9}
                    stroke={
                      edge.tone === "green"
                        ? "url(#flow-glow-green)"
                        : "url(#flow-glow-blue)"
                    }
                    fill="none"
                    strokeDasharray="3 5"
                    animate={{ strokeDashoffset: [0, -16] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "linear",
                      delay: i * 0.12,
                    }}
                  />
                  {[0, 0.45].map((phase) => (
                    <motion.circle
                      key={phase}
                      r={0.9}
                      fill={particleColor}
                      filter="drop-shadow(0 0 4px currentColor)"
                      animate={{
                        cx: [a.x, b.x],
                        cy: [a.y, b.y],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.4 + i * 0.2,
                        ease: "linear",
                        delay: i * 0.2 + phase * 1.2,
                      }}
                    />
                  ))}
                </motion.g>
              );
            })}
          </AnimatePresence>
        </motion.svg>
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {profile.nodes.map((node) => {
          const pos = NODE_LAYOUT[node.id];
          const Icon = ICONS[node.id];
          const isNew = newNodeIds.has(node.id);
          const isUnvisited = unvisitedNodeIds.has(node.id);
          const shouldPulse = isNew || isUnvisited;

          return (
            <motion.button
              key={`${scenarioKey}-${node.id}`}
              type="button"
              layout
              layoutId={`flow-node-${node.id}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onOpenCalculator(node.calculatorId, node.id)}
              className={cn(
                "command-center-node absolute flex flex-col items-center gap-1 rounded-xl border border-white/15 bg-slate-900/85 px-2.5 py-2 backdrop-blur-md",
                "ring-2 ring-offset-2 ring-offset-slate-950",
                ACCENT_RING[node.accent],
                shouldPulse && "command-center-node--pulse",
                isNew && "command-center-node--pulse-new",
                "transition-shadow focus-visible:outline-none focus-visible:ring-cyan-400"
              )}
              style={{
                left: `${pos.x * 100}%`,
                top: `${pos.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={`Open ${node.label} calculator`}
            >
              <span className="relative flex size-9 items-center justify-center rounded-lg bg-white/5 sm:size-10">
                {shouldPulse ? (
                  <span
                    className="command-center-node__ring absolute inset-0 rounded-lg"
                    aria-hidden
                  />
                ) : null}
                <Icon className="relative size-4 text-white sm:size-5" strokeWidth={2} aria-hidden />
              </span>
              <span className="dashboard-flow-label max-w-[5rem] text-center text-[10px] font-semibold leading-tight text-slate-200 sm:max-w-[5.5rem] sm:text-[11px]">
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
