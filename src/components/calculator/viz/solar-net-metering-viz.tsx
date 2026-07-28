"use client";

import { cn } from "@/lib/utils";

interface SolarNetMeteringVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Grid-Tie Net Metering [VIZ].
 * Self = min(prod, use); export / import from the difference; bill & savings.
 * Sample: 900 kWh prod · 850 kWh use · $0.14 / $0.08 → self 850 · export 50
 * · bill $119 → −$4 · save $123/mo.
 */
export function SolarNetMeteringViz({ className }: SolarNetMeteringVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-net-metering", className)}
      aria-label="Grid-tie net metering visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar · Home · Grid Credits</h3>
        <p className="tool-viz__subtitle">
          Production feeds the house first; surplus exports for credits, and
          any shortfall imports at retail — the bill delta is your monthly
          savings.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-net-metering-viz"
          role="img"
          aria-labelledby="snm-viz-title snm-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="snm-viz-title">
            Grid-tie net metering animated energy and credit diagram
          </title>
          <desc id="snm-viz-desc">
            Monthly solar production and home use, with retail and export rates,
            determine self-consumption, grid export, imports, and bill savings.
            Sample: 900 kilowatt-hours produced and 850 used at 0.14 dollars
            retail and 0.08 dollars export yields 850 kilowatt-hours self-use,
            50 exported, a bill from 119 dollars to a 4 dollar credit, and 123
            dollars monthly savings.
          </desc>

          <defs>
            <pattern
              id="snm-viz-grid"
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
              id="snm-viz-arrow"
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
              id="snm-viz-pulse"
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
              id="snm-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#snm-viz-grid)"
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
            rx="4"
          />

          {/* —— INPUTS —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SOLAR PRODUCTION
            </text>
            <text
              className="snm-viz-prod-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              900 kWh
            </text>

            <rect
              x="40"
              y="140"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="164"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOME USE
            </text>
            <text
              className="snm-viz-use-value"
              x="56"
              y="196"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              850 kWh
            </text>

            <rect
              x="40"
              y="224"
              width="220"
              height="136"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATES
            </text>
            <text
              className="snm-viz-retail-value"
              x="56"
              y="284"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14 retail
            </text>
            <text
              className="snm-viz-export-value"
              x="56"
              y="314"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.08 export
            </text>
            <text
              x="56"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              NEM / net billing
            </text>
          </g>

          {/* Flow → energy path */}
          <path
            d="M 260 84 L 310 84"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#snm-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 84 L 310 84"
            fill="none"
            stroke="url(#snm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#snm-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 176 L 290 176 L 290 140 L 310 140"
            fill="none"
            stroke="url(#snm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#snm-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 290 L 290 290 L 290 220 L 310 220"
            fill="none"
            stroke="url(#snm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Energy balance —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY-FLOW · CREDIT PATH
            </text>

            {/* Nodes: PV · Home · Grid */}
            <rect
              className="snm-viz-pv"
              x="348"
              y="100"
              width="72"
              height="56"
              rx="4"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <text
              x="384"
              y="124"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              PV
            </text>
            <text
              x="384"
              y="142"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              900
            </text>

            <rect
              className="snm-viz-home"
              x="454"
              y="100"
              width="72"
              height="56"
              rx="4"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <text
              x="490"
              y="124"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              HOME
            </text>
            <text
              x="490"
              y="142"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              850
            </text>

            <rect
              className="snm-viz-grid-node"
              x="560"
              y="100"
              width="72"
              height="56"
              rx="4"
              fill="#0a0a0a"
              stroke="#555555"
              strokeWidth="1.75"
            />
            <text
              x="596"
              y="124"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              GRID
            </text>
            <text
              x="596"
              y="142"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              meter
            </text>

            {/* Self-use flow PV → Home */}
            <path
              d="M 420 128 L 454 128"
              fill="none"
              stroke="#333333"
              strokeWidth="2"
              markerEnd="url(#snm-viz-arrow)"
            />
            <path
              className="snm-viz-self-flow"
              d="M 420 128 L 454 128"
              fill="none"
              stroke="url(#snm-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              className="snm-viz-self-chip"
              x="437"
              y="118"
              textAnchor="middle"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              850 self
            </text>

            {/* Export flow Home/PV → Grid */}
            <path
              d="M 526 128 L 560 128"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#snm-viz-arrow)"
            />
            <path
              className="snm-viz-export-flow"
              d="M 526 128 L 560 128"
              fill="none"
              stroke="url(#snm-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              className="snm-viz-exp-chip"
              x="543"
              y="118"
              textAnchor="middle"
              fill="#ededed"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +50
            </text>

            {/* Stacked bars: self / export / import */}
            <text
              x="336"
              y="196"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              SELF-USE
            </text>
            <rect
              x="420"
              y="186"
              width="220"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="snm-viz-self-bar"
              x="420"
              y="186"
              width="208"
              height="12"
              rx="2"
              fill="url(#snm-viz-bar)"
            />

            <text
              x="336"
              y="226"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              EXPORT
            </text>
            <rect
              x="420"
              y="216"
              width="220"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="snm-viz-export-bar"
              x="420"
              y="216"
              width="12"
              height="12"
              rx="2"
              fill="url(#snm-viz-bar)"
            />

            <text
              x="336"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              IMPORT
            </text>
            <rect
              x="420"
              y="246"
              width="220"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <text
              x="428"
              y="256"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              dominantBaseline="middle"
            >
              0 kWh
            </text>

            {/* Bill comparison */}
            <rect
              x="348"
              y="280"
              width="284"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="snm-viz-math-value"
              x="364"
              y="306"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $119 → −$4 credit
            </text>
            <text
              className="snm-viz-bill-chip"
              x="364"
              y="328"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              50 × $0.08 export credit applied
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 660 140 L 700 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#snm-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 140 L 700 140"
            fill="none"
            stroke="url(#snm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#snm-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 660 250 L 680 250 L 680 280 L 700 280"
            fill="none"
            stroke="url(#snm-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Savings —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="180"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY SAVINGS
            </text>
            <text
              className="snm-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $123
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              vs bill without solar
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="snm-viz-save-bar"
              x="726"
              y="168"
              width="140"
              height="12"
              rx="2"
              fill="url(#snm-viz-bar)"
            />
            <text
              className="snm-viz-detail-value"
              x="726"
              y="202"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~$1,476 / year
            </text>
          </g>

          {/* —— OUTPUT: Grid interaction —— */}
          <g>
            <rect
              x="710"
              y="236"
              width="210"
              height="124"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              GRID INTERACTION
            </text>
            <text
              className="snm-viz-grid-out"
              x="726"
              y="300"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +50 kWh out
            </text>
            <text
              className="snm-viz-grid-out"
              x="726"
              y="324"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0 kWh in
            </text>
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              surplus month · net exporter
            </text>
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="388"
              width="880"
              height="132"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="416"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HIGHER SELF-USE · RETAIL VALUE · EXPORT OFTEN CREDITED BELOW RETAIL
            </text>

            <text
              x="56"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              $0
            </text>
            <rect
              x="100"
              y="442"
              width="520"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="snm-viz-bill-bar"
              x="100"
              y="442"
              width="390"
              height="14"
              rx="2"
              fill="url(#snm-viz-bar)"
            />
            <text
              x="420"
              y="452"
              fill="#0a0a0a"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              dominantBaseline="middle"
            >
              save $123
            </text>
            <text
              x="640"
              y="452"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              was $119
            </text>

            <path
              className="snm-viz-timeline-pulse"
              d="M 56 490 L 880 490"
              fill="none"
              stroke="url(#snm-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="514"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              bill = import × retail − export × credit
            </text>
            <text
              className="snm-viz-detail-value"
              x="880"
              y="514"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              $123/mo · 850 self · 50 export
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
