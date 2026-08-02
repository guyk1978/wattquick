"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState, type ReactNode } from "react";
import type { CalculatorCategory } from "@/data/calculator-types";
import { CALCULATOR_CATEGORY_LABELS } from "@/data/calculator-types";
import { getCategoryPageHref } from "@/lib/category-routes";
import { cn } from "@/lib/utils";

type TraceTone = "green" | "blue" | "purple";

type EcoNode = {
  id: string;
  category: CalculatorCategory;
  label: string;
  x: number;
  y: number;
  tone: TraceTone;
  /** Anchor on the battery hub this trace connects to */
  hubX: number;
  hubY: number;
  role: "generator" | "storage" | "consumer";
};

const TONES: Record<TraceTone, { stroke: string; glow: string }> = {
  green: { stroke: "#a3e635", glow: "rgba(163, 230, 53, 0.45)" },
  blue: { stroke: "#22d3ee", glow: "rgba(34, 211, 238, 0.45)" },
  purple: { stroke: "#c084fc", glow: "rgba(192, 132, 252, 0.45)" },
};

/** Orthogonal PCB-style path from hub → node */
function pcbPath(
  hx: number,
  hy: number,
  nx: number,
  ny: number,
  bend = 0.45
): string {
  const mx = hx + (nx - hx) * bend;
  return `M ${hx} ${hy} H ${mx} V ${ny} H ${nx}`;
}

const NODES: EcoNode[] = [
  {
    id: "solar",
    category: "solar",
    label: "Solar",
    x: 145,
    y: 175,
    tone: "green",
    hubX: 485,
    hubY: 255,
    role: "generator",
  },
  {
    id: "wind",
    category: "power",
    label: "Power",
    x: 235,
    y: 95,
    tone: "green",
    hubX: 505,
    hubY: 235,
    role: "generator",
  },
  {
    id: "battery",
    category: "battery",
    label: "Battery",
    x: 550,
    y: 275,
    tone: "green",
    hubX: 550,
    hubY: 275,
    role: "storage",
  },
  {
    id: "sizing",
    category: "sizing",
    label: "Battery Sizing",
    x: 625,
    y: 195,
    tone: "green",
    hubX: 580,
    hubY: 245,
    role: "storage",
  },
  {
    id: "backup",
    category: "backup",
    label: "Backup",
    x: 480,
    y: 355,
    tone: "purple",
    hubX: 520,
    hubY: 305,
    role: "storage",
  },
  {
    id: "commercial",
    category: "commercial-ev",
    label: "Commercial EV",
    x: 835,
    y: 100,
    tone: "blue",
    hubX: 615,
    hubY: 245,
    role: "consumer",
  },
  {
    id: "ev",
    category: "ev",
    label: "EV Charging",
    x: 990,
    y: 255,
    tone: "blue",
    hubX: 625,
    hubY: 275,
    role: "consumer",
  },
  {
    id: "ebike",
    category: "ebike",
    label: "E-Bike",
    x: 910,
    y: 400,
    tone: "purple",
    hubX: 605,
    hubY: 315,
    role: "consumer",
  },
  {
    id: "escooter",
    category: "escooter",
    label: "E-Scooter",
    x: 825,
    y: 475,
    tone: "purple",
    hubX: 585,
    hubY: 325,
    role: "consumer",
  },
  {
    id: "pool",
    category: "pool",
    label: "Pool",
    x: 550,
    y: 490,
    tone: "blue",
    hubX: 550,
    hubY: 335,
    role: "consumer",
  },
  {
    id: "appliance",
    category: "appliance",
    label: "Appliances",
    x: 205,
    y: 450,
    tone: "purple",
    hubX: 495,
    hubY: 315,
    role: "consumer",
  },
  {
    id: "green-home",
    category: "green-home",
    label: "Green Home",
    x: 110,
    y: 335,
    tone: "green",
    hubX: 485,
    hubY: 295,
    role: "consumer",
  },
  {
    id: "rv",
    category: "rv-marine",
    label: "RV & Marine",
    x: 365,
    y: 475,
    tone: "blue",
    hubX: 525,
    hubY: 335,
    role: "consumer",
  },
  {
    id: "tou",
    category: "tou",
    label: "TOU",
    x: 725,
    y: 460,
    tone: "purple",
    hubX: 595,
    hubY: 325,
    role: "consumer",
  },
  {
    id: "cost",
    category: "cost",
    label: "Cost",
    x: 1000,
    y: 385,
    tone: "purple",
    hubX: 615,
    hubY: 295,
    role: "consumer",
  },
  {
    id: "convert",
    category: "convert",
    label: "Convert",
    x: 690,
    y: 115,
    tone: "blue",
    hubX: 595,
    hubY: 245,
    role: "consumer",
  },
];

function FlowDot({
  path,
  color,
  delay,
  duration,
  reduceMotion,
}: {
  path: string;
  color: string;
  delay: number;
  duration: number;
  reduceMotion: boolean;
}) {
  if (reduceMotion) return null;
  return (
    <circle r="2.75" fill={color} className="wq-eco__flow-dot" opacity="0.95">
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
    </circle>
  );
}

function NodeBadge({
  label,
  tone,
  active,
}: {
  label: string;
  tone: TraceTone;
  active: boolean;
}) {
  const c = TONES[tone].stroke;
  return (
    <g className={cn("wq-eco__badge", active && "wq-eco__badge--active")}>
      <rect
        x={-28}
        y={42}
        width={56}
        height={18}
        rx={3}
        fill="#0a0a0a"
        stroke={c}
        strokeWidth={1}
        opacity={0.92}
      />
      <circle cx={-16} cy={51} r={3.5} fill={c} className="wq-eco__badge-dot" />
      <text
        x={-8}
        y={54}
        fill="#ededed"
        fontSize={8}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.04em"
      >
        {label.length > 11 ? `${label.slice(0, 10)}…` : label}
      </text>
    </g>
  );
}

function GlyphSolarHouse() {
  return (
    <g fill="none" stroke="#a3e635" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M-36 8 L0 -22 L36 8 V36 H-36 Z" />
      <path d="M-22 -10 L-8 -22 L22 -6" stroke="#fb923c" />
      <rect x={-28} y={-18} width={18} height={10} stroke="#fb923c" />
      <path d="M-26 -16 H-12 M-26 -12 H-12" stroke="#fb923c" strokeWidth={1} />
      <rect x={-10} y={16} width={12} height={20} />
      <rect x={10} y={12} width={14} height={12} />
      <circle cx={-48} cy={-28} r={10} stroke="#fb923c" className="wq-eco__sun" />
      <g className="wq-eco__sun-rays" stroke="#fb923c" strokeWidth={1.25}>
        <path d="M-48 -44 V-40 M-48 -16 V-12 M-64 -28 H-60 M-36 -28 H-32" />
      </g>
    </g>
  );
}

function GlyphWind() {
  return (
    <g fill="none" stroke="#a3e635" strokeWidth={1.5}>
      <line x1={0} y1={8} x2={0} y2={48} />
      <g className="wq-eco__turbine">
        <circle cx={0} cy={8} r={4} fill="#0a0a0a" />
        <path d="M0 8 L0 -28 M0 8 L24 22 M0 8 L-24 22" strokeLinecap="round" />
      </g>
      <path d="M-10 48 H10" />
    </g>
  );
}

function GlyphBattery() {
  return (
    <g fill="none" stroke="#a3e635" strokeWidth={1.75} strokeLinejoin="round">
      <rect x={-40} y={-28} width={80} height={56} rx={4} />
      <rect x={-28} y={-40} width={16} height={12} rx={2} fill="#a3e635" stroke="none" />
      <rect x={12} y={-40} width={16} height={12} rx={2} fill="#a3e635" stroke="none" opacity={0.55} />
      <rect
        x={-32}
        y={-16}
        width={64}
        height={32}
        rx={2}
        fill="url(#wq-eco-battery-fill)"
        stroke="none"
        className="wq-eco__battery-fill"
      />
      <text
        x={0}
        y={6}
        textAnchor="middle"
        fill="#0a0a0a"
        fontSize={11}
        fontFamily="ui-monospace, monospace"
        fontWeight={700}
      >
        Wh
      </text>
    </g>
  );
}

function GlyphCharger() {
  return (
    <g fill="none" stroke="#22d3ee" strokeWidth={1.5} strokeLinejoin="round">
      <rect x={-18} y={-8} width={24} height={48} rx={2} />
      <rect x={-12} y={0} width={12} height={16} />
      <path d="M6 8 H22 V28" />
      <circle cx={22} cy={32} r={5} />
      <path d="M-8 -20 L-2 -8 L4 -20 Z" fill="#22d3ee" stroke="none" opacity={0.85} />
    </g>
  );
}

function GlyphEv() {
  return (
    <g fill="none" stroke="#22d3ee" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M-42 8 H-30 L-18 -12 H18 L30 8 H42 V22 H-42 Z" />
      <circle cx={-22} cy={22} r={8} />
      <circle cx={22} cy={22} r={8} />
      <path d="M-10 -4 H14" />
      <path d="M28 -4 L34 -16" stroke="#a3e635" />
    </g>
  );
}

function GlyphEbike() {
  return (
    <g fill="none" stroke="#c084fc" strokeWidth={1.5}>
      <circle cx={-22} cy={12} r={12} />
      <circle cx={22} cy={12} r={12} />
      <path d="M-22 12 L0 -8 L22 12 M0 -8 V-20 H10" strokeLinejoin="round" />
      <rect x={-6} y={-4} width={12} height={8} rx={1} />
    </g>
  );
}

function GlyphScooter() {
  return (
    <g fill="none" stroke="#e879f9" strokeWidth={1.5} strokeLinejoin="round">
      <circle cx={-18} cy={16} r={9} />
      <circle cx={22} cy={16} r={9} />
      <path d="M-18 16 H14 L22 16 M14 16 L8 -12 H-2" />
      <path d="M-2 -12 V-22" />
    </g>
  );
}

function GlyphPool() {
  return (
    <g fill="none" stroke="#2dd4bf" strokeWidth={1.5}>
      <ellipse cx={0} cy={8} rx={40} ry={16} />
      <path d="M-28 4 Q-10 14 8 4 T40 4" className="wq-eco__water" />
      <path d="M-36 -8 H-20 V8 M36 -8 H20 V8" />
    </g>
  );
}

function GlyphApplianceHouse() {
  return (
    <g fill="none" stroke="#a78bfa" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M-32 10 L0 -20 L32 10 V38 H-32 Z" />
      <rect x={-8} y={18} width={16} height={20} />
      <rect x={-24} y={14} width={12} height={10} />
      <rect x={12} y={14} width={12} height={10} />
      <path d="M40 0 V20 M36 8 H44" stroke="#facc15" />
    </g>
  );
}

function GlyphGreenHome() {
  return (
    <g fill="none" stroke="#4ade80" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M-28 12 L0 -16 L28 12 V36 H-28 Z" />
      <path d="M-16 -4 C-8 -18 8 -18 16 -4" />
      <circle cx={0} cy={-8} r={3} fill="#4ade80" stroke="none" />
    </g>
  );
}

function GlyphRv() {
  return (
    <g fill="none" stroke="#60a5fa" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M-40 8 H20 L36 8 V24 H-40 Z" />
      <path d="M-28 8 V-8 H12 V8" />
      <circle cx={-22} cy={24} r={7} />
      <circle cx={18} cy={24} r={7} />
      <path d="M36 14 H48 V24" />
    </g>
  );
}

function GlyphShop() {
  return (
    <g fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M-30 0 H30 V36 H-30 Z" />
      <path d="M-34 -12 L-30 0 H30 L34 -12 Z" />
      <rect x={-10} y={14} width={20} height={22} />
      <path d="M-22 8 H-10 M10 8 H22" />
    </g>
  );
}

function GlyphTou() {
  return (
    <g fill="none" stroke="#f472b6" strokeWidth={1.5}>
      <circle cx={0} cy={0} r={22} />
      <path d="M0 -12 V0 L10 6" strokeLinecap="round" />
      <path d="M-6 -28 H6 M0 -34 V-28" />
    </g>
  );
}

function GlyphConvert() {
  return (
    <g fill="none" stroke="#818cf8" strokeWidth={1.5} strokeLinecap="round">
      <path d="M-24 0 H24 M12 -10 L24 0 L12 10 M-12 -10 L-24 0 L-12 10" />
      <text
        x={0}
        y={28}
        textAnchor="middle"
        fill="#818cf8"
        fontSize={8}
        fontFamily="ui-monospace, monospace"
      >
        V·A·W
      </text>
    </g>
  );
}

function GlyphSizing() {
  return (
    <g fill="none" stroke="#34d399" strokeWidth={1.5}>
      <rect x={-24} y={-16} width={48} height={32} rx={3} />
      <path d="M-16 -4 H16 M-16 4 H8 M-16 12 H12" />
      <path d="M20 -24 L32 -12 M28 -24 H20 V-16" />
    </g>
  );
}

function GlyphBackup() {
  return (
    <g fill="none" stroke="#f87171" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M0 -24 L22 -12 V8 L0 24 L-22 8 V-12 Z" />
      <path d="M0 -8 V8 M-6 2 H6" />
    </g>
  );
}

const GLYPHS: Record<string, () => ReactNode> = {
  solar: GlyphSolarHouse,
  wind: GlyphWind,
  battery: GlyphBattery,
  sizing: GlyphSizing,
  backup: GlyphBackup,
  commercial: GlyphCharger,
  ev: GlyphEv,
  ebike: GlyphEbike,
  escooter: GlyphScooter,
  pool: GlyphPool,
  appliance: GlyphApplianceHouse,
  "green-home": GlyphGreenHome,
  rv: GlyphRv,
  tou: GlyphTou,
  cost: GlyphShop,
  convert: GlyphConvert,
};

type WattQuickEcosystemProps = {
  className?: string;
};

/**
 * Homepage ecosystem canvas — Industrial Matte PCB network of WattQuick
 * categories radiating from a central battery hub.
 */
export function WattQuickEcosystem({ className }: WattQuickEcosystemProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<string | null>(null);

  const onEnter = useCallback((id: string) => setHovered(id), []);
  const onLeave = useCallback(() => setHovered(null), []);

  return (
    <section
      className={cn("wq-eco", className)}
      aria-label="WattQuick calculator ecosystem"
    >
      <div className="wq-eco__frame">
        <svg
          viewBox="0 0 1100 600"
          className="wq-eco__svg"
          role="img"
          aria-labelledby="wq-eco-title wq-eco-desc"
        >
          <title id="wq-eco-title">WattQuick energy ecosystem map</title>
          <desc id="wq-eco-desc">
            Interactive schematic connecting solar, wind, battery storage, EV
            charging, e-mobility, pool, home appliances, and cost tools through
            neon circuit traces.
          </desc>

          <defs>
            <pattern
              id="wq-eco-grid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="0.75"
              />
            </pattern>
            <linearGradient
              id="wq-eco-battery-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
            <filter id="wq-eco-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="1100" height="600" fill="#0a0a0a" />
          <rect
            width="1100"
            height="600"
            fill="url(#wq-eco-grid)"
            opacity="0.7"
          />

          <text
            x="40"
            y="44"
            fill="#737373"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.16em"
          >
            FIG. 01 — WATTQUICK ECOSYSTEM
          </text>

          {/* PCB traces */}
          {NODES.filter((n) => n.id !== "battery").map((node, i) => {
            const d = pcbPath(node.hubX, node.hubY, node.x, node.y, 0.4 + (i % 3) * 0.08);
            const tone = TONES[node.tone];
            const related =
              hovered === null ||
              hovered === node.id ||
              hovered === "battery";
            const dimmed = hovered !== null && !related;

            return (
              <g key={`trace-${node.id}`}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={tone.stroke}
                  strokeWidth={1.25}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  filter="url(#wq-eco-glow)"
                  className={cn(
                    "wq-eco__trace",
                    dimmed && "wq-eco__trace--dim",
                    hovered === node.id && "wq-eco__trace--hot"
                  )}
                  /* initial={false}: paint final state in SSR so LCP is not gated on hydration. */
                  initial={false}
                  animate={{
                    pathLength: 1,
                    opacity: dimmed ? 0.15 : hovered === node.id ? 1 : 0.55,
                  }}
                  transition={{ opacity: { duration: reduceMotion ? 0 : 0.25 } }}
                />
                <FlowDot
                  path={
                    node.role === "generator"
                      ? pcbPath(node.x, node.y, node.hubX, node.hubY, 0.4 + (i % 3) * 0.08)
                      : d
                  }
                  color={tone.stroke}
                  delay={0.8 + i * 0.18}
                  duration={3.2 + (i % 4) * 0.45}
                  reduceMotion={reduceMotion}
                />
                <FlowDot
                  path={
                    node.role === "generator"
                      ? pcbPath(node.x, node.y, node.hubX, node.hubY, 0.4 + (i % 3) * 0.08)
                      : d
                  }
                  color={tone.stroke}
                  delay={2.2 + i * 0.18}
                  duration={3.2 + (i % 4) * 0.45}
                  reduceMotion={reduceMotion}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const Glyph = GLYPHS[node.id] ?? GlyphBattery;
            const href = getCategoryPageHref(node.category);
            const active = hovered === node.id;
            const dimmed = hovered !== null && hovered !== node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                onMouseEnter={() => onEnter(node.id)}
                onMouseLeave={onLeave}
                onFocus={() => onEnter(node.id)}
                onBlur={onLeave}
              >
                <motion.g
                  className={cn(
                    "wq-eco__node",
                    active && "wq-eco__node--active",
                    dimmed && "wq-eco__node--dim"
                  )}
                  /* initial={false}: nodes visible in first HTML paint (mobile LCP). */
                  initial={false}
                  animate={{
                    opacity: dimmed ? 0.35 : 1,
                    scale: active ? 1.08 : 1,
                  }}
                  transition={{
                    opacity: { duration: reduceMotion ? 0 : 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <a
                    href={href}
                    className="wq-eco__node-link"
                    aria-label={`${CALCULATOR_CATEGORY_LABELS[node.category]} calculators`}
                  >
                    <title>{CALCULATOR_CATEGORY_LABELS[node.category]}</title>
                    <circle r={48} fill="transparent" />
                    <Glyph />
                    <NodeBadge
                      label={node.label}
                      tone={node.tone}
                      active={active}
                    />
                  </a>
                </motion.g>
              </g>
            );
          })}

          <text
            x={550}
            y={572}
            textAnchor="middle"
            fill="#737373"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.05em"
          >
            Hover a node to highlight its circuit · click to open that category
          </text>
        </svg>
      </div>
    </section>
  );
}
