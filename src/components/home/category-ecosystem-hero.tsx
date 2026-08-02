"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  CALCULATOR_CATEGORY_DESCRIPTIONS,
  CALCULATOR_CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/data/calculator-types";
import { getCategoryHeroSpec } from "@/lib/category-hero-schematics";
import { getCategoryColor } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

type CategoryEcosystemHeroProps = {
  category: CalculatorCategory;
  className?: string;
};

function pcbPath(hx: number, hy: number, nx: number, ny: number): string {
  const mx = hx + (nx - hx) * 0.42;
  return `M ${hx} ${hy} H ${mx} V ${ny} H ${nx}`;
}

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
    <circle r="2.5" fill={color} opacity="0.95">
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
    </circle>
  );
}

function HubGlyph({
  category,
  color,
}: {
  category: CalculatorCategory;
  color: string;
}) {
  if (category === "battery" || category === "sizing" || category === "backup") {
    return (
      <g fill="none" stroke={color} strokeWidth={1.75} strokeLinejoin="round">
        <rect x={-36} y={-24} width={72} height={48} rx={4} />
        <rect
          x={-24}
          y={-34}
          width={14}
          height={10}
          rx={2}
          fill={color}
          stroke="none"
        />
        <rect
          x={10}
          y={-34}
          width={14}
          height={10}
          rx={2}
          fill={color}
          stroke="none"
          opacity={0.5}
        />
        <rect
          x={-28}
          y={-14}
          width={56}
          height={28}
          rx={2}
          fill={color}
          fillOpacity={0.35}
          stroke="none"
          className="wq-cat-hero__hub-fill"
        />
      </g>
    );
  }

  if (category === "solar") {
    return (
      <g fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round">
        <rect x={-34} y={-20} width={68} height={40} rx={2} />
        <path d="M-34 0 H34 M-12 -20 V20 M12 -20 V20" strokeWidth={1.1} />
        <circle cx={-48} cy={-28} r={10} className="wq-cat-hero__pulse" />
      </g>
    );
  }

  if (category === "ev" || category === "commercial-ev") {
    return (
      <g fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round">
        <path d="M-40 6 H-28 L-16 -12 H18 L30 6 H42 V22 H-40 Z" />
        <circle cx={-20} cy={22} r={7} />
        <circle cx={22} cy={22} r={7} />
        <path d="M26 -4 L34 -18" />
      </g>
    );
  }

  if (category === "ebike" || category === "escooter") {
    return (
      <g fill="none" stroke={color} strokeWidth={1.6}>
        <circle cx={-20} cy={10} r={11} />
        <circle cx={22} cy={10} r={11} />
        <path d="M-20 10 L0 -8 L22 10 M0 -8 V-20 H10" strokeLinejoin="round" />
      </g>
    );
  }

  // Default abstract hub
  return (
    <g fill="none" stroke={color} strokeWidth={1.7}>
      <circle cx={0} cy={0} r={28} className="wq-cat-hero__pulse" />
      <circle cx={0} cy={0} r={12} fill={color} fillOpacity={0.25} />
      <path d="M0 -18 V18 M-18 0 H18" strokeWidth={1.3} />
    </g>
  );
}

/**
 * Category landing hero — single Industrial Matte frame with a focused
 * PCB schematic for the active calculator category.
 */
export function CategoryEcosystemHero({
  category,
  className,
}: CategoryEcosystemHeroProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const color = getCategoryColor(category);
  const label = CALCULATOR_CATEGORY_LABELS[category];
  const description = CALCULATOR_CATEGORY_DESCRIPTIONS[category];
  const spec = getCategoryHeroSpec(category);
  const hub = spec.nodes.find((n) => n.role === "hub")!;
  const sats = spec.nodes.filter((n) => n.role === "sat");

  return (
    <section
      className={cn("wq-cat-hero", className)}
      aria-labelledby="wq-cat-hero-heading"
      style={{ "--wq-cat-accent": color } as CSSProperties}
    >
      <header className="wq-cat-hero__copy">
        <p className="wq-cat-hero__eyebrow">FIG. CAT — {label.toUpperCase()}</p>
        <h1 id="wq-cat-hero-heading" className="wq-cat-hero__title">
          {label}
        </h1>
        <p className="wq-cat-hero__subtitle">{description}</p>
      </header>

      <div className="wq-cat-hero__frame">
        <svg
          viewBox="0 0 960 300"
          className="wq-cat-hero__svg"
          role="img"
          aria-label={`${label} category schematic`}
        >
          <defs>
            <pattern
              id={`wq-cat-grid-${category}`}
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="0.75"
              />
            </pattern>
            <filter
              id={`wq-cat-glow-${category}`}
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="960" height="300" fill="#0a0a0a" />
          <rect
            width="960"
            height="300"
            fill={`url(#wq-cat-grid-${category})`}
            opacity="0.75"
          />

          {sats.map((node, i) => {
            const d = pcbPath(hub.x, hub.y, node.x, node.y);
            return (
              <g key={node.id}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.25}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  filter={`url(#wq-cat-glow-${category})`}
                  className="wq-cat-hero__trace"
                  initial={false}
                  animate={{ pathLength: 1, opacity: 0.55 }}
                  transition={{ opacity: { duration: reduceMotion ? 0 : 0.3 } }}
                />
                <FlowDot
                  path={d}
                  color={color}
                  delay={0.7 + i * 0.25}
                  duration={3.4 + (i % 3) * 0.4}
                  reduceMotion={reduceMotion}
                />
              </g>
            );
          })}

          {/* Hub — outer <g> keeps SVG translate; motion only fades opacity */}
          <g transform={`translate(${hub.x} ${hub.y})`}>
            <motion.g
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <HubGlyph category={category} color={color} />
              <text
                y={46}
                textAnchor="middle"
                fill="#ededed"
                fontSize={11}
                fontFamily="ui-monospace, monospace"
                fontWeight={700}
                letterSpacing="0.06em"
              >
                {hub.label}
              </text>
            </motion.g>
          </g>

          {/* Satellites */}
          {sats.map((node, i) => (
            <g key={`node-${node.id}`} transform={`translate(${node.x} ${node.y})`}>
              <motion.g
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0 }}
              >
                <circle
                  r={16}
                  fill="#0a0a0a"
                  stroke={color}
                  strokeWidth={1.25}
                  className="wq-cat-hero__sat"
                />
                <circle r={4} fill={color} className="wq-cat-hero__sat-dot" />
                <text
                  y={32}
                  textAnchor="middle"
                  fill="#a3a3a3"
                  fontSize={10}
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.04em"
                >
                  {node.label}
                </text>
              </motion.g>
            </g>
          ))}

          <text
            x={480}
            y={286}
            textAnchor="middle"
            fill="#525252"
            fontSize={10}
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.08em"
          >
            {spec.caption}
          </text>
        </svg>
      </div>
    </section>
  );
}
