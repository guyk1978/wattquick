"use client";

import { cn } from "@/lib/utils";

interface HeaterCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Electric Heater Cost [VIZ] tab.
 * Cost = (W × hrs × days ÷ 1000) × $/kWh.
 * Sample: 1,500 W · 6 h · 30 d · $0.14/kWh → 270 kWh · $37.80.
 */
export function HeaterCostViz({ className }: HeaterCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--heater-cost", className)}
      aria-label="Electric heater cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Electric Heater Cost</h3>
        <p className="tool-viz__subtitle">
          High-wattage resistance heat turns run hours into kilowatt-hours —
          your utility rate converts that energy into the heating bill.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg heater-cost-viz"
          role="img"
          aria-labelledby="htc-viz-title htc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="htc-viz-title">
            Electric heater cost animated flow diagram
          </title>
          <desc id="htc-viz-desc">
            Heater power in watts multiplied by hours per day and days of use
            yields kilowatt-hours, which multiply by the electricity rate for
            total cost. Sample: a 1500 watt heater running 6 hours per day for
            30 days at 14 cents per kilowatt-hour uses 270 kilowatt-hours and
            costs 37 dollars and 80 cents.
          </desc>

          <defs>
            <pattern
              id="htc-viz-grid"
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
              id="htc-viz-arrow"
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
              id="htc-viz-pulse"
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
              id="htc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="htc-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#htc-viz-grid)"
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
            HEAT · RATE PATH
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

          {/* —— INPUT: Power —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="110"
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
              HEATER POWER
            </text>
            <text
              x="56"
              y="138"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,500 W
            </text>
            <text
              x="56"
              y="164"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              portable high setting
            </text>
          </g>

          {/* —— INPUT: Schedule —— */}
          <g>
            <rect
              x="40"
              y="200"
              width="230"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="226"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RUN SCHEDULE
            </text>
            <text
              x="56"
              y="262"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 hrs / day
            </text>
            <text
              x="56"
              y="294"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 days
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
          <g>
            <rect
              x="40"
              y="338"
              width="230"
              height="90"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ELECTRICITY RATE
            </text>
            <text
              x="56"
              y="400"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14 / kWh
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 127 L 320 127"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#htc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 127 L 320 127"
            fill="none"
            stroke="url(#htc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 260 L 300 260 L 300 170 L 320 170"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#htc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 260 L 300 260 L 300 170 L 320 170"
            fill="none"
            stroke="url(#htc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 383 L 300 383 L 300 300 L 320 300"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#htc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 383 L 300 383 L 300 300 L 320 300"
            fill="none"
            stroke="url(#htc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: kWh —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="150"
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
              ENERGY USED
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              (W × h × d) ÷ 1000
            </text>
            <text
              x="346"
              y="164"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="htc-viz-kwh-value"
            >
              270 kWh
            </text>
            <text
              x="346"
              y="196"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,500 × 6 × 30 ÷ 1000
            </text>
          </g>

          {/* —— FLOW: heater + rate —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="300"
              height="188"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RESISTANCE HEAT → $
            </text>

            {/* Heater glyph with heat waves */}
            <g transform="translate(360, 290)">
              <rect
                className="htc-viz-heater"
                x="0"
                y="16"
                width="70"
                height="48"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line x1="12" y1="28" x2="58" y2="28" stroke="#333333" strokeWidth="1" />
              <line x1="12" y1="40" x2="58" y2="40" stroke="#333333" strokeWidth="1" />
              <line x1="12" y1="52" x2="58" y2="52" stroke="#333333" strokeWidth="1" />
              <path
                className="htc-viz-heat"
                d="M 14 8 Q 20 0 26 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <path
                className="htc-viz-heat"
                d="M 32 8 Q 38 0 44 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.7"
              />
              <path
                className="htc-viz-heat"
                d="M 50 8 Q 56 0 62 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.45"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 80 40 L 120 40"
                fill="none"
                stroke="url(#htc-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#htc-viz-arrow)"
              />
              <circle
                className="htc-viz-meter"
                cx="148"
                cy="40"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="148"
                y="44"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $
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
              className="htc-viz-cost-bar"
              x="348"
              y="382"
              width="190"
              height="8"
              rx="1"
              fill="url(#htc-viz-bar)"
            />
            <text
              x="346"
              y="412"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              270 × $0.14 = $37.80
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#htc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 147 L 680 147"
            fill="none"
            stroke="url(#htc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#htc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="url(#htc-viz-pulse)"
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
              ESTIMATED COST
            </text>
            <text
              x="706"
              y="168"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="htc-viz-output-value"
            >
              $37.80
            </text>
            <text
              x="706"
              y="204"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              for 30-day run
            </text>

            <rect
              x="706"
              y="228"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="htc-viz-output-bar"
              x="708"
              y="230"
              width="160"
              height="8"
              rx="1"
              fill="url(#htc-viz-bar)"
            />

            <text
              x="706"
              y="280"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY
            </text>
            <text
              x="706"
              y="314"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              270 kWh
            </text>
            <text
              x="706"
              y="348"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $1.26 / day
            </text>
            <text
              x="706"
              y="380"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              9 kWh/day @ $0.14
            </text>
            <text
              x="706"
              y="408"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              zone heat to cut hours
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
              (W × hrs × days) ÷ 1000 → kWh × $/kWh → cost
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
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1,500 W · 6 h · 30 d · $0.14 → $37.80
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
