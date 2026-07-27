"use client";

import { cn } from "@/lib/utils";

interface ApplianceDailyCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Appliance Daily Cost [VIZ] tab.
 * kWh/day = (W × hrs) ÷ 1000; cost = kWh × $/kWh.
 * Sample: 1,500 W · 4 hrs · $0.15/kWh → 6 kWh · $0.90/day · ~$27/mo.
 */
export function ApplianceDailyCostViz({ className }: ApplianceDailyCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--appliance-daily-cost", className)}
      aria-label="Appliance daily cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Appliance Daily Cost</h3>
        <p className="tool-viz__subtitle">
          Watts times daily hours become kilowatt-hours, then your utility rate
          turns that energy into what the appliance costs to run.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg appliance-daily-cost-viz"
          role="img"
          aria-labelledby="adc-viz-title adc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="adc-viz-title">
            Appliance daily cost animated flow diagram
          </title>
          <desc id="adc-viz-desc">
            Appliance power in watts multiplied by hours per day yields daily
            kilowatt-hours, which multiply by the electricity rate to produce
            daily and monthly cost. Sample: a 1500 watt heater running 4 hours
            at 15 cents per kilowatt-hour uses 6 kilowatt-hours and costs about
            90 cents per day or 27 dollars per month.
          </desc>

          <defs>
            <pattern
              id="adc-viz-grid"
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
              id="adc-viz-arrow"
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
              id="adc-viz-pulse"
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
              id="adc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#adc-viz-grid)"
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
            ENERGY · RATE PATH
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
              height="130"
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
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,500 W
            </text>
            <text
              x="56"
              y="172"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              space heater nameplate
            </text>
          </g>

          {/* —— INPUT: Hours —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="246"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURS / DAY
            </text>
            <text
              x="56"
              y="288"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4.0 hrs
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
              $0.15 / kWh
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 137 L 320 137"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#adc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 137 L 320 137"
            fill="none"
            stroke="url(#adc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 270 L 300 270 L 300 175 L 320 175"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#adc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 270 L 300 270 L 300 175 L 320 175"
            fill="none"
            stroke="url(#adc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 383 L 300 383 L 300 300 L 320 300"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#adc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 383 L 300 383 L 300 300 L 320 300"
            fill="none"
            stroke="url(#adc-viz-pulse)"
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
              DAILY ENERGY
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              (W × hrs) ÷ 1000
            </text>
            <text
              x="346"
              y="164"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="adc-viz-kwh-value"
            >
              6.0 kWh
            </text>
            <text
              x="346"
              y="196"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,500 × 4 ÷ 1000
            </text>
          </g>

          {/* —— FLOW: meter / cost path —— */}
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
              kWh × RATE
            </text>

            {/* Appliance + meter glyphs */}
            <g transform="translate(360, 290)">
              <rect
                className="adc-viz-appliance"
                x="0"
                y="0"
                width="64"
                height="48"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 20 16 L 32 16 L 28 28 L 40 28 L 24 48 L 28 32 L 16 32 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                className="adc-viz-bolt"
              />
              <path
                className="tool-viz-flow__pulse"
                d="M 72 24 L 110 24"
                fill="none"
                stroke="url(#adc-viz-pulse)"
                strokeWidth="2"
                markerEnd="url(#adc-viz-arrow)"
              />
              <circle
                className="adc-viz-meter"
                cx="140"
                cy="24"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="140"
                y="28"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $
              </text>
            </g>

            <rect
              x="346"
              y="368"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="adc-viz-cost-bar"
              x="348"
              y="370"
              width="180"
              height="8"
              rx="1"
              fill="url(#adc-viz-bar)"
            />
            <text
              x="346"
              y="408"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              6.0 × $0.15 = $0.90
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#adc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 147 L 680 147"
            fill="none"
            stroke="url(#adc-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#adc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="url(#adc-viz-pulse)"
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
              DAILY COST
            </text>
            <text
              x="706"
              y="160"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="adc-viz-output-value"
            >
              $0.90
            </text>
            <text
              x="706"
              y="192"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              /day
            </text>

            <rect
              x="706"
              y="216"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="adc-viz-day-bar"
              x="708"
              y="218"
              width="120"
              height="8"
              rx="1"
              fill="url(#adc-viz-bar)"
            />

            <text
              x="706"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY (~30 d)
            </text>
            <text
              x="706"
              y="310"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="adc-viz-output-value"
            >
              $27.00
            </text>
            <text
              x="706"
              y="340"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              $0.90 × 30
            </text>
            <text
              x="706"
              y="380"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              6.0 kWh/day metered
            </text>
            <text
              x="706"
              y="404"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              @ $0.15 / kWh
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
              (W × hrs) ÷ 1000 → kWh/day × $/kWh → $/day · ×30 → $/mo
            </text>
            <text
              x="540"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="540"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1,500 W · 4 h · $0.15 → $0.90/day
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
