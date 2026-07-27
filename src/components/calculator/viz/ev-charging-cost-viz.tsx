"use client";

import { cn } from "@/lib/utils";

interface EvChargingCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Charging Cost [VIZ] tab.
 * Energy kWh × electricity rate $/kWh → charging cost.
 * Sample: 60 kWh × $0.15 = $9.00.
 */
export function EvChargingCostViz({ className }: EvChargingCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-charging-cost", className)}
      aria-label="EV charging cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV Charging Cost</h3>
        <p className="tool-viz__subtitle">
          Energy delivered from the wall multiplies by your utility rate to
          estimate the bill for a charging session.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-charging-cost-viz"
          role="img"
          aria-labelledby="evc-viz-title evc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="evc-viz-title">EV charging cost animated flow diagram</title>
          <desc id="evc-viz-desc">
            Energy delivered in kilowatt-hours multiplies by the electricity
            rate in dollars per kilowatt-hour to produce total charging cost.
            Sample: 60 kilowatt-hours at 15 cents per kilowatt-hour equals 9
            dollars.
          </desc>

          <defs>
            <pattern
              id="evc-viz-grid"
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
              id="evc-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient id="evc-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="evc-viz-cost"
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
            fill="url(#evc-viz-grid)"
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
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            ENERGY × RATE
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

          {/* —— INPUT: Energy —— */}
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
              ENERGY DELIVERED
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
                className="evc-viz-battery-fill"
                x="4"
                y="16"
                width="24"
                height="36"
                rx="1"
                fill="currentColor"
                fillOpacity="0.85"
                stroke="none"
              />
            </g>
            <text
              x="106"
              y="162"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60 kWh
            </text>
            <text
              x="106"
              y="188"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              from the wall / session
            </text>
            <text
              x="106"
              y="210"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              include charger losses
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
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
              ELECTRICITY RATE
            </text>
            <g
              transform="translate(56, 318)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <rect x="4" y="10" width="28" height="36" rx="2" />
              <path d="M12 10 V2 M24 10 V2" />
              <circle
                className="evc-viz-meter-dot"
                cx="18"
                cy="28"
                r="4"
                fill="currentColor"
                fillOpacity="0.45"
              />
            </g>
            <text
              x="106"
              y="348"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.15
            </text>
            <text
              x="106"
              y="374"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              per kWh · home utility
            </text>
            <text
              x="106"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              use off-peak if TOU
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#evc-viz-arrow)"
          >
            <path d="M 280 162 H 340 V 200 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#evc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 162 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 342 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
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
              kWh × $/kWh
            </text>

            {/* EV plug glyph */}
            <g transform="translate(430, 140)" fill="none" stroke="#ededed">
              <rect x="0" y="12" width="48" height="36" rx="3" strokeWidth="1.3" />
              <path d="M12 12 V4 M36 12 V4" strokeWidth="1.3" />
              <path
                d="M 48 30 H 80"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 48 30 H 80"
                stroke="url(#evc-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              <rect
                x="80"
                y="8"
                width="56"
                height="44"
                rx="3"
                strokeWidth="1.3"
              />
              <text
                x="108"
                y="34"
                fill="#888888"
                stroke="none"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                EV PACK
              </text>
              <rect
                className="evc-viz-battery-fill"
                x="86"
                y="18"
                width="44"
                height="24"
                rx="1"
                fill="currentColor"
                fillOpacity="0.35"
                stroke="none"
              />
            </g>

            <rect
              x="376"
              y="220"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="490"
              y="248"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              <tspan fill="#ededed">60 kWh</tspan>
              <tspan fill="#888888"> × </tspan>
              <tspan fill="#ededed">$0.15</tspan>
            </text>
            <text
              x="490"
              y="270"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              className="evc-viz-multiply"
            >
              cost = energy × rate
            </text>

            <text
              x="376"
              y="316"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BILL ACCUMULATION
            </text>
            <rect
              x="376"
              y="328"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="evc-viz-cost-bar"
              x="378"
              y="330"
              width="224"
              height="12"
              rx="1"
              fill="url(#evc-viz-cost)"
            />

            <text
              x="490"
              y="380"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              wall kWh · not battery SoC alone
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#evc-viz-arrow)"
          >
            <path d="M 620 252 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#evc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 252 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="240"
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
              CHARGING COST
            </text>

            <text
              x="810"
              y="250"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="evc-viz-output-value"
            >
              $9.00
            </text>
            <text
              x="810"
              y="290"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              60 kWh × $0.15/kWh
            </text>
            <text
              x="810"
              y="328"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              home / Level 2 session
            </text>
            <text
              x="810"
              y="348"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              run peak vs off-peak separately
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Cost = kWh × $/kWh · use wall energy (charger losses) for bill-accurate
            totals
          </text>
        </svg>
      </div>
    </section>
  );
}
