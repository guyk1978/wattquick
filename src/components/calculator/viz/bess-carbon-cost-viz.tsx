"use client";

import { cn } from "@/lib/utils";

interface BessCarbonCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for BESS Round-trip Carbon Cost [VIZ].
 * loss/cycle = kWh × (1/η − 1); annual CO₂ = loss × cycles × (gCO₂/1000).
 * Sample: 13.5 kWh · 90% · 250 cyc · 420 g → 1.5 kWh/cyc · 375 kWh/yr · 157.5 kg CO₂/yr.
 */
export function BessCarbonCostViz({ className }: BessCarbonCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--bess-carbon-cost", className)}
      aria-label="BESS round-trip carbon cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">BESS Round-trip Carbon</h3>
        <p className="tool-viz__subtitle">
          Each charge–discharge cycle wastes energy as heat — if those lost
          kilowatt-hours came from the grid, they carry a carbon tag.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg bess-carbon-cost-viz"
          role="img"
          aria-labelledby="bcc-viz-title bcc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bcc-viz-title">
            BESS round-trip carbon cost animated flow diagram
          </title>
          <desc id="bcc-viz-desc">
            Battery capacity, round-trip efficiency, cycles per year, and grid
            carbon intensity determine conversion-loss emissions. Sample: a 13.5
            kilowatt-hour battery at 90 percent efficiency with 250 cycles and
            420 grams CO2 per kilowatt-hour loses 375 kilowatt-hours a year and
            emits 157.5 kilograms of CO2 from losses alone.
          </desc>

          <defs>
            <pattern
              id="bcc-viz-grid"
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
              id="bcc-viz-arrow"
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
              id="bcc-viz-pulse"
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
              id="bcc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="bcc-viz-loss"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bcc-viz-grid)"
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

          {/* —— INPUT: Capacity —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY CAPACITY
            </text>
            <text
              className="bcc-viz-kwh-value"
              x="56"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              13.5 kWh
            </text>
          </g>

          {/* —— INPUT: RTE —— */}
          <g>
            <rect
              x="40"
              y="146"
              width="220"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ROUND-TRIP EFF.
            </text>
            <text
              className="bcc-viz-rte-value"
              x="56"
              y="206"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90%
            </text>
          </g>

          {/* —— INPUT: Cycles + grid —— */}
          <g>
            <rect
              x="40"
              y="252"
              width="220"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CYCLES · GRID CO₂
            </text>
            <text
              className="bcc-viz-cyc-value"
              x="56"
              y="314"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              250 / yr
            </text>
            <text
              className="bcc-viz-grid-value"
              x="56"
              y="348"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              420 g/kWh
            </text>
            <text
              x="56"
              y="376"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              carbon intensity (eGRID)
            </text>
          </g>

          {/* Flow → loss path */}
          <path
            d="M 260 85 L 310 85"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bcc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 85 L 310 85"
            fill="none"
            stroke="url(#bcc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 191 L 290 191 L 290 140 L 310 140"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bcc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 191 L 290 191 L 290 140 L 310 140"
            fill="none"
            stroke="url(#bcc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 327 L 290 327 L 290 200 L 310 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bcc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 327 L 290 327 L 290 200 L 310 200"
            fill="none"
            stroke="url(#bcc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Energy loss & emissions path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="362"
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
              ENERGY LOSS · EMISSIONS PATH
            </text>

            {/* Grid → charge */}
            <g className="bcc-viz-grid-src" transform="translate(348, 88)">
              <rect
                x="0"
                y="0"
                width="56"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="28"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                GRID
              </text>
              <text
                x="28"
                y="38"
                textAnchor="middle"
                fill="#ededed"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                420 g
              </text>
            </g>

            <path
              d="M 404 112 L 448 112"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#bcc-viz-arrow)"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 404 112 L 448 112"
              fill="none"
              stroke="url(#bcc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Battery with loss leak */}
            <g className="bcc-viz-battery" transform="translate(456, 84)">
              <rect
                x="0"
                y="0"
                width="100"
                height="56"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect
                x="100"
                y="16"
                width="10"
                height="24"
                rx="2"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <rect
                className="bcc-viz-fill"
                x="8"
                y="8"
                width="72"
                height="40"
                rx="2"
                fill="url(#bcc-viz-bar)"
                opacity="0.7"
              />
              <text
                x="50"
                y="72"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                BESS · η 90%
              </text>
            </g>

            {/* Heat / loss arrows */}
            <g className="bcc-viz-heat" transform="translate(500, 168)">
              <path
                d="M 0 0 L 0 28"
                fill="none"
                stroke="url(#bcc-viz-loss)"
                strokeWidth="2"
                markerEnd="url(#bcc-viz-arrow)"
              />
              <path
                d="M 16 4 L 16 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.65"
                markerEnd="url(#bcc-viz-arrow)"
              />
              <path
                d="M 32 8 L 32 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.4"
                markerEnd="url(#bcc-viz-arrow)"
              />
              <text
                x="16"
                y="56"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                heat / conversion loss
              </text>
            </g>

            {/* Cycle loop chip */}
            <rect
              x="348"
              y="236"
              width="284"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              LOSS PER CYCLE
            </text>
            <text
              className="bcc-viz-math-value"
              x="364"
              y="280"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              13.5 × (1/0.9 − 1) = 1.5 kWh
            </text>

            {/* Annual */}
            <rect
              x="348"
              y="308"
              width="284"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="332"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              ANNUAL LOSS × GRID
            </text>
            <text
              className="bcc-viz-math-value"
              x="364"
              y="356"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.5 × 250 = 375 kWh/yr
            </text>
            <text
              x="364"
              y="372"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              × 0.420 kg/kWh → CO₂
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 200 L 700 200"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#bcc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 200 L 700 200"
            fill="none"
            stroke="url(#bcc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Emissions —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="200"
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
              LOSS EMISSIONS
            </text>
            <text
              className="bcc-viz-output-value"
              x="726"
              y="114"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              157.5 kg
            </text>
            <text
              x="726"
              y="140"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              CO₂ / yr from losses
            </text>
            <rect
              x="726"
              y="160"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bcc-viz-co2-bar"
              x="726"
              y="160"
              width="162"
              height="12"
              rx="2"
              fill="url(#bcc-viz-bar)"
            />
            <text
              className="bcc-viz-detail-value"
              x="726"
              y="198"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              375 kWh × 0.42 kg
            </text>
            <text
              x="726"
              y="220"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              operational only · not LCA
            </text>
          </g>

          {/* —— OUTPUT: Renewable contrast —— */}
          <g>
            <rect
              x="710"
              y="256"
              width="210"
              height="146"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VS RENEWABLE CHARGE
            </text>
            <text
              className="bcc-viz-save-value"
              x="726"
              y="322"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −157.5 kg
            </text>
            <text
              x="726"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              saved with ~0 g charging
            </text>
            <rect
              x="726"
              y="366"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="bcc-viz-save-bar"
              x="726"
              y="366"
              width="162"
              height="10"
              rx="2"
              fill="url(#bcc-viz-bar)"
            />
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="428"
              width="880"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="454"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CYCLE ACCUMULATION
            </text>
            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="bcc-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="bcc-viz-tick"
              cx="280"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="bcc-viz-tick"
              cx="520"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="bcc-viz-tick"
              cx="700"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.4"
            />
            <circle
              className="bcc-viz-tick bcc-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="bcc-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#bcc-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="502"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cycle 1 · 1.5 kWh lost
            </text>
            <text
              x="520"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 250 cycles
            </text>
            <text
              className="bcc-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              375 kWh · 157.5 kg CO₂/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
