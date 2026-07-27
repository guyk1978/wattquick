"use client";

import { cn } from "@/lib/utils";

interface EnergyConsumptionVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Energy Consumption [VIZ] tab.
 * kWh = (W × hrs/day × days) ÷ 1000.
 * Sample: 1,500 W · 8 hrs · 30 days → 360 kWh.
 */
export function EnergyConsumptionViz({ className }: EnergyConsumptionVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--energy-consumption", className)}
      aria-label="Energy consumption visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Energy Consumption</h3>
        <p className="tool-viz__subtitle">
          Watts times hours per day, accumulated over your operating period,
          converts power draw into total kilowatt-hours on the meter.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg energy-consumption-viz"
          role="img"
          aria-labelledby="enc-viz-title enc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="enc-viz-title">
            Energy consumption animated flow diagram
          </title>
          <desc id="enc-viz-desc">
            Power draw in watts multiplied by hours per day and number of days
            yields total energy in kilowatt-hours. Sample: 1500 watts for 8 hours
            per day over 30 days uses 360 kilowatt-hours or 360000 watt-hours.
          </desc>

          <defs>
            <pattern
              id="enc-viz-grid"
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
              id="enc-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="enc-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="enc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#enc-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            POWER · TIME PATH
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

          {/* —— INPUT: Watts —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER DRAW
            </text>
            <text
              x="56"
              y="140"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,500 W
            </text>
            <text
              x="56"
              y="170"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              nameplate / measured
            </text>
          </g>

          {/* —— INPUT: Hours —— */}
          <g>
            <rect
              x="40"
              y="210"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="236"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURS / DAY
            </text>
            <text
              x="56"
              y="280"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8.0 hrs
            </text>
          </g>

          {/* —— INPUT: Days —— */}
          <g>
            <rect
              x="40"
              y="328"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="354"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAYS
            </text>
            <text
              x="56"
              y="398"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 days
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 132 L 320 132"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#enc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 132 L 320 132"
            fill="none"
            stroke="url(#enc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 260 L 300 260 L 300 175 L 320 175"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#enc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 260 L 300 260 L 300 175 L 320 175"
            fill="none"
            stroke="url(#enc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 378 L 300 378 L 300 300 L 320 300"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#enc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 378 L 300 378 L 300 300 L 320 300"
            fill="none"
            stroke="url(#enc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Daily —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY ENERGY
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              W × hrs ÷ 1000
            </text>
            <text
              x="346"
              y="164"
              fill="#a3e635"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="enc-viz-daily-value"
            >
              12 kWh/day
            </text>
            <text
              x="346"
              y="192"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,500 × 8 ÷ 1000
            </text>
          </g>

          {/* —— FLOW: Period accumulation —— */}
          <g>
            <rect
              x="330"
              y="230"
              width="300"
              height="198"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PERIOD ACCUMULATION
            </text>
            <text
              x="346"
              y="286"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              daily kWh × days
            </text>

            {/* Load + meter glyphs */}
            <g transform="translate(360, 310)">
              <rect
                className="enc-viz-load"
                x="0"
                y="0"
                width="56"
                height="40"
                rx="3"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <path
                className="enc-viz-bolt"
                d="M 18 10 L 30 10 L 26 22 L 36 22 L 22 40 L 26 26 L 14 26 Z"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.25"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 64 20 L 100 20"
                fill="none"
                stroke="url(#enc-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#enc-viz-arrow)"
              />
              <circle
                className="enc-viz-meter"
                cx="130"
                cy="20"
                r="20"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <text
                x="130"
                y="24"
                textAnchor="middle"
                fill="#ededed"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                kWh
              </text>
            </g>

            <rect
              x="346"
              y="380"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="enc-viz-accum-bar"
              x="348"
              y="382"
              width="200"
              height="8"
              rx="1"
              fill="url(#enc-viz-bar)"
            />
            <text
              x="346"
              y="412"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              12 × 30 = 360
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 142 L 680 142"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#enc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 142 L 680 142"
            fill="none"
            stroke="url(#enc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 329 L 655 329 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#enc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 329 L 655 329 L 655 230 L 680 230"
            fill="none"
            stroke="url(#enc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY USED
            </text>
            <text
              x="706"
              y="160"
              fill="#a3e635"
              fontSize="44"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="enc-viz-output-value"
            >
              360
            </text>
            <text
              x="706"
              y="196"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
            >
              kWh
            </text>
            <text
              x="706"
              y="228"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              = 360,000 Wh
            </text>

            <rect
              x="706"
              y="250"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="enc-viz-output-bar"
              x="708"
              y="252"
              width="176"
              height="8"
              rx="1"
              fill="url(#enc-viz-bar)"
            />

            <text
              x="706"
              y="300"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              FORMULA
            </text>
            <text
              x="706"
              y="332"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (W × h × d) ÷ 1000
            </text>
            <text
              x="706"
              y="364"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,500 × 8 × 30
            </text>
            <text
              x="706"
              y="392"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ÷ 1000 = 360.00
            </text>
          </g>

          {/* —— Legend —— */}
          <g transform="translate(40, 448)">
            <rect
              x="0"
              y="0"
              width="880"
              height="80"
              rx="4"
              fill="#0f0f0f"
              stroke="#262626"
              strokeWidth="1"
            />
            <text
              x="20"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PATH
            </text>
            <text
              x="20"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (W × hrs/day × days) ÷ 1000 → kWh · ×1000 → Wh
            </text>
            <text
              x="520"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="520"
              y="52"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1,500 W · 8 h · 30 d → 360 kWh
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
