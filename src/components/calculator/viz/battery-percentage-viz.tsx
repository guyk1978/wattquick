"use client";

import { cn } from "@/lib/utils";

interface BatteryPercentageVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Percentage [VIZ] tab.
 * Current mAh ÷ Full mAh × 100 → state-of-charge %.
 * Sample: 3200 / 5000 = 64%.
 */
export function BatteryPercentageViz({ className }: BatteryPercentageVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-percentage", className)}
      aria-label="Battery percentage visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Percentage</h3>
        <p className="tool-viz__subtitle">
          Remaining charge divided by full capacity yields state-of-charge — the
          percentage of energy still available in the pack.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-percentage-viz"
          role="img"
          aria-labelledby="bp-viz-title bp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bp-viz-title">
            Battery percentage animated flow diagram
          </title>
          <desc id="bp-viz-desc">
            Current charge in milliamp-hours divides by full capacity in
            milliamp-hours, then multiplies by one hundred to produce the
            remaining charge percentage. Sample values: 3200 mAh over 5000 mAh
            equals 64 percent.
          </desc>

          <defs>
            <pattern
              id="bp-viz-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#262626"
                strokeWidth="0.75"
              />
            </pattern>
            <marker
              id="bp-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="bp-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="bp-viz-fill-grad"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.55" />
            </linearGradient>
            <clipPath id="bp-viz-cell-clip">
              <rect x="412" y="198" width="136" height="168" rx="4" />
            </clipPath>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bp-viz-grid)"
            opacity="0.55"
          />
          <rect
            x="12"
            y="12"
            width="936"
            height="536"
            fill="none"
            stroke="#262626"
            strokeWidth="1"
            rx="2"
          />

          {/* Column labels */}
          <text
            x="48"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            INPUTS
          </text>
          <text
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            RATIO
          </text>
          <text
            x="700"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>

          {/* —— INPUT: Current charge —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="116"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CURRENT CHARGE
            </text>

            <g transform="translate(56, 136)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="32" height="48" rx="2" strokeWidth="1.3" />
              <rect
                x="8"
                y="3"
                width="16"
                height="6"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="bp-viz-battery-fill bp-viz-battery-fill--partial"
                x="4"
                y="24"
                width="24"
                height="28"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.88"
                stroke="none"
              />
            </g>

            <text
              x="106"
              y="162"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3200 mAh
            </text>
            <text
              x="106"
              y="188"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              remaining energy now
            </text>
            <text
              x="106"
              y="210"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              numerator · same unit as full
            </text>
          </g>

          {/* —— INPUT: Full capacity —— */}
          <g>
            <rect
              x="40"
              y="268"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              FULL CAPACITY
            </text>

            <g transform="translate(56, 318)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="32" height="48" rx="2" strokeWidth="1.3" />
              <rect
                x="8"
                y="3"
                width="16"
                height="6"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="bp-viz-battery-fill"
                x="4"
                y="12"
                width="24"
                height="40"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.55"
                stroke="none"
              />
            </g>

            <text
              x="106"
              y="348"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5000 mAh
            </text>
            <text
              x="106"
              y="374"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nameplate / design max
            </text>
            <text
              x="106"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              denominator · 100% SoC
            </text>
          </g>

          {/* Flow: inputs → ratio */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#bp-viz-arrow)"
          >
            <path d="M 280 162 H 340 V 220 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#bp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 162 H 340 V 220 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 342 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: ratio / fill —— */}
          <g>
            <rect
              x="360"
              y="88"
              width="260"
              height="328"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="118"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CURRENT ÷ FULL × 100
            </text>

            {/* Formula strip */}
            <rect
              x="376"
              y="138"
              width="228"
              height="42"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="490"
              y="165"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              <tspan fill="#a3e635">3200</tspan>
              <tspan fill="#888888"> ÷ </tspan>
              <tspan fill="#a3e635">5000</tspan>
              <tspan fill="#888888"> × 100</tspan>
            </text>

            {/* Large cell schematic */}
            <g transform="translate(0, 0)">
              {/* Terminal */}
              <rect
                x="454"
                y="186"
                width="52"
                height="12"
                rx="2"
                fill="#333333"
                stroke="#555555"
                strokeWidth="1"
              />
              {/* Shell */}
              <rect
                x="408"
                y="194"
                width="144"
                height="176"
                rx="6"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.5"
              />
              {/* Animated fill — 64% of inner height ≈ 108 of 168 */}
              <g clipPath="url(#bp-viz-cell-clip)">
                <rect
                  className="bp-viz-soc-fill"
                  x="412"
                  y="258"
                  width="136"
                  height="108"
                  fill="url(#bp-viz-fill-grad)"
                />
                {/* Level ticks */}
                <g stroke="#262626" strokeWidth="1">
                  <line x1="412" y1="240" x2="548" y2="240" />
                  <line x1="412" y1="282" x2="548" y2="282" />
                  <line x1="412" y1="324" x2="548" y2="324" />
                </g>
              </g>
              <text
                x="480"
                y="312"
                fill="#0a0a0a"
                fontSize="22"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="bp-viz-soc-label"
              >
                64%
              </text>
            </g>

            {/* Scale labels */}
            <text
              x="560"
              y="210"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              100%
            </text>
            <text
              x="560"
              y="286"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              64%
            </text>
            <text
              x="560"
              y="362"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              0%
            </text>

            <text
              x="490"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              state-of-charge fill
            </text>
          </g>

          {/* Flow: ratio → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#bp-viz-arrow)"
          >
            <path d="M 620 252 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#bp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 252 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT: Charge level —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="240"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHARGE LEVEL
            </text>

            {/* Circular gauge ring */}
            <circle
              cx="810"
              cy="248"
              r="48"
              fill="none"
              stroke="#262626"
              strokeWidth="6"
            />
            <circle
              className="bp-viz-gauge-arc"
              cx="810"
              cy="248"
              r="48"
              fill="none"
              stroke="#a3e635"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="193 302"
              transform="rotate(-90 810 248)"
            />
            <text
              x="810"
              y="242"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="bp-viz-output-value"
            >
              64%
            </text>
            <text
              x="810"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              SoC
            </text>

            <text
              x="810"
              y="328"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              3200 of 5000 mAh
            </text>
            <text
              x="810"
              y="352"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              remaining in pack
            </text>
          </g>

          {/* Footer note */}
          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            SoC % = (current ÷ full) × 100 · use matching units (mAh or Ah)
          </text>
        </svg>
      </div>
    </section>
  );
}
