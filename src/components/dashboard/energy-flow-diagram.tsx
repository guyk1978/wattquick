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
  emerald: "border-emerald-500/35",
  cyan: "border-cyan-500/35",
  blue: "border-blue-500/35",
  amber: "border-amber-500/35",
  violet: "border-violet-500/35",
};

const STROKE_TONE: Record<EnergyFlowEdge["tone"], string> = {
  green: "stroke-emerald-400/55",
  blue: "stroke-cyan-400/55",
  mixed: "stroke-blue-400/45",
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
  newNodeIds: _newNodeIds,
  unvisitedNodeIds: _unvisitedNodeIds,
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
          </defs>

          <AnimatePresence>
            {edges.map((edge, i) => {
              const a = toSvgCoords(edge.from);
              const b = toSvgCoords(edge.to);
              const strokeClass = STROKE_TONE[edge.tone];
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
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 1 }}
              onClick={() => onOpenCalculator(node.calculatorId, node.id)}
              className={cn(
                "command-center-node absolute flex flex-col items-center gap-1 rounded-none border bg-card px-2 py-1.5",
                "text-foreground dark:bg-[rgb(6_10_22/0.92)]",
                ACCENT_RING[node.accent],
                "transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              )}
              style={{
                left: `${pos.x * 100}%`,
                top: `${pos.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={`Open ${node.label} calculator`}
            >
              <span className="relative flex size-8 items-center justify-center rounded-none border border-border/50 bg-muted/30 sm:size-9">
                <Icon className="relative size-4 text-foreground sm:size-5" strokeWidth={2} aria-hidden />
              </span>
              <span className="dashboard-flow-label max-w-[5rem] text-center text-[10px] font-semibold leading-tight text-muted-foreground sm:max-w-[5.5rem] sm:text-[11px]">
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
