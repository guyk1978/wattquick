"use client";

import { cn } from "@/lib/utils";

interface EvCostPerMileVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Cost Per Mile [VIZ] tab.
 * kWh/mi × $/kWh → cost per mile.
 * Sample: 0.28 × $0.15 = $0.042/mi (~4.2¢/mi).
 */
export function EvCostPerMileViz({ className }: EvCostPerMileVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-cost-per-mile", className)}
      aria-label="EV cost per mile visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Cost Per Mile</h3>
        <p className="tool-viz__subtitle">
          Vehicle energy use per mile multiplies by your electricity rate to
          show what each mile of driving costs at the wall.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-cost-per-mile-viz"
          role="img"
          aria-labelledby="ecpm-viz-title ecpm-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ecpm-viz-title">
            EV cost per mile animated flow diagram
          </title>
          <desc id="ecpm-viz-desc">
            Energy consumption in kilowatt-hours per mile multiplies by the
            electricity rate in dollars per kilowatt-hour to produce driving
            cost per mile. Sample: 0.28 kilowatt-hours per mile at 15 cents per
            kilowatt-hour equals about 4.2 cents per mile.
          </desc>

          <defs>
            <pattern
              id="ecpm-viz-grid"
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
              id="ecpm-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient
              id="ecpm-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="ecpm-viz-cost"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ecpm-viz-grid)"
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
            x="370"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            kWh/mi × RATE
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

          {/* —— INPUT: Energy per mile —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="168"
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
              ENERGY PER MILE
            </text>
            {/* Minimal car + pack glyph */}
            <g transform="translate(56, 136)" fill="none" stroke="#ededed">
              <path
                d="M4 28 H8 L14 16 H42 L50 28 H56 V40 H50 V36 H12 V40 H4 Z"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="40" r="4" strokeWidth="1.2" />
              <circle cx="46" cy="40" r="4" strokeWidth="1.2" />
              <rect
                className="ecpm-viz-pack-fill"
                x="20"
                y="20"
                width="18"
                height="10"
                rx="1"
                fill="currentColor"
                fillOpacity="0.7"
                stroke="none"
              />
            </g>
            <text
              x="56"
              y="210"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.28 kWh/mi
            </text>
            <text
              x="56"
              y="234"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              trip meter · wall kWh ÷ mi
            </text>
          </g>

          {/* —— INPUT: Electricity rate —— */}
          <g>
            <rect
              x="40"
              y="280"
              width="240"
              height="168"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRICITY RATE
            </text>
            <g transform="translate(56, 326)" fill="none" stroke="#ededed">
              <rect x="0" y="4" width="40" height="28" rx="2" strokeWidth="1.3" />
              <text
                x="20"
                y="23"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                stroke="none"
                className="ecpm-viz-meter-dot"
              >
                $
              </text>
              <circle
                className="ecpm-viz-meter-dot"
                cx="48"
                cy="18"
                r="3"
                fill="currentColor"
                stroke="none"
              />
            </g>
            <text
              x="56"
              y="392"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.15 /kWh
            </text>
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              home utility · 15¢/kWh
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ecpm-viz-arrow)"
          >
            <path d="M 280 172 H 330 V 210 H 360" />
            <path d="M 280 364 H 330 V 310 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#ecpm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 172 H 330 V 210 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 364 H 330 V 310 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: multiply —— */}
          <g>
            <rect
              x="360"
              y="88"
              width="260"
              height="360"
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
              OPERATING COST PATH
            </text>

            <rect
              x="376"
              y="140"
              width="228"
              height="52"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="162"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CONSUMPTION
            </text>
            <text
              x="388"
              y="182"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
            >
              0.28 kWh/mi
            </text>

            <text
              x="490"
              y="230"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ecpm-viz-multiply"
            >
              ×
            </text>

            <rect
              x="376"
              y="250"
              width="228"
              height="52"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="272"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              TARIFF
            </text>
            <text
              x="388"
              y="292"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
            >
              $0.15 /kWh
            </text>

            <text
              x="376"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              COST INTENSITY
            </text>
            <rect
              x="376"
              y="352"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ecpm-viz-cost-bar"
              x="378"
              y="354"
              width="224"
              height="12"
              rx="1"
              fill="url(#ecpm-viz-cost)"
            />

            <text
              x="490"
              y="402"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              $/mi = kWh/mi × $/kWh
            </text>
            <text
              x="490"
              y="424"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              use bill kWh for wall losses
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ecpm-viz-arrow)"
          >
            <path d="M 620 268 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#ecpm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 268 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="250"
              rx="4"
              fill="#111111"
              stroke="currentColor"
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
              COST PER MILE
            </text>

            {/* Road / mile marker glyph */}
            <g
              transform="translate(786, 196)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <path d="M0 20 H48" strokeDasharray="6 4" />
              <path
                d="M12 8 H20 L24 16 H36 L32 28 H8 Z"
                strokeLinejoin="round"
                className="ecpm-viz-car"
              />
            </g>

            <text
              x="810"
              y="280"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="ecpm-viz-output-value"
            >
              $0.042/mi
            </text>
            <text
              x="810"
              y="310"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 4.2¢ /mi
            </text>
            <text
              x="810"
              y="342"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              0.28 × $0.15
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              vs gas often 10–15¢/mi
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Cost/mi = kWh/mi × $/kWh · meter wall energy for charging losses
          </text>
        </svg>
      </div>
    </section>
  );
}
