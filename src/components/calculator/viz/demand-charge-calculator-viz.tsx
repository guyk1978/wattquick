"use client";

import { cn } from "@/lib/utils";

interface DemandChargeCalculatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Commercial Demand Charge [VIZ].
 * Charge = peak kW × $/kW demand tariff.
 * Sample: 85 kW · $12/kW → $1,020/mo · $12,240/yr.
 */
export function DemandChargeCalculatorViz({
  className,
}: DemandChargeCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--demand-charge-calculator", className)}
      aria-label="Commercial demand charge visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Commercial Demand Charge</h3>
        <p className="tool-viz__subtitle">
          One peak power spike in a billing interval sets the month — multiply
          that kilowatt demand by the utility capacity rate for the demand
          charge adder.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg demand-charge-calculator-viz"
          role="img"
          aria-labelledby="dcc-viz-title dcc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="dcc-viz-title">
            Commercial demand charge animated flow diagram
          </title>
          <desc id="dcc-viz-desc">
            Peak demand in kilowatts multiplied by the utility demand charge
            rate in dollars per kilowatt yields the monthly demand charge.
            Sample: 85 kilowatts at 12 dollars per kilowatt costs 1,020 dollars
            per month, or about 12,240 dollars per year.
          </desc>

          <defs>
            <pattern
              id="dcc-viz-grid"
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
              id="dcc-viz-arrow"
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
              id="dcc-viz-pulse"
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
              id="dcc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="dcc-viz-spike"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#dcc-viz-grid)"
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
            x="340"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DEMAND × RATE PATH
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

          {/* —— INPUT: Peak demand —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
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
              PEAK DEMAND
            </text>
            <text
              className="dcc-viz-peak-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              85 kW
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              max simultaneous load
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              15-min billing interval
            </text>
          </g>

          {/* —— INPUT: Demand charge rate —— */}
          <g>
            <rect
              x="40"
              y="242"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DEMAND CHARGE
            </text>
            <text
              className="dcc-viz-rate-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $12/kW
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              capacity tariff rider
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              separate from energy kWh
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#dcc-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#dcc-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#dcc-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#dcc-viz-arrow)"
          />

          {/* —— CENTER: Load spike × rate —— */}
          <g>
            <rect
              x="320"
              y="72"
              width="340"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="340"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK INTERVAL SPIKE
            </text>

            {/* Load profile bars — one tall spike */}
            <g transform="translate(360, 120)">
              <rect
                x="0"
                y="110"
                width="18"
                height="50"
                rx="1"
                fill="#262626"
              />
              <rect
                x="28"
                y="90"
                width="18"
                height="70"
                rx="1"
                fill="#262626"
              />
              <rect
                x="56"
                y="100"
                width="18"
                height="60"
                rx="1"
                fill="#262626"
              />
              <rect
                className="dcc-viz-spike-bar"
                x="84"
                y="20"
                width="22"
                height="140"
                rx="1"
                fill="url(#dcc-viz-spike)"
              />
              <rect
                x="116"
                y="95"
                width="18"
                height="65"
                rx="1"
                fill="#262626"
              />
              <rect
                x="144"
                y="105"
                width="18"
                height="55"
                rx="1"
                fill="#262626"
              />
              <rect
                x="172"
                y="88"
                width="18"
                height="72"
                rx="1"
                fill="#262626"
              />
              <rect
                x="200"
                y="112"
                width="18"
                height="48"
                rx="1"
                fill="#262626"
              />
              <line
                x1="0"
                y1="160"
                x2="220"
                y2="160"
                stroke="#333333"
                strokeWidth="1"
              />
              <text
                x="95"
                y="14"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                className="dcc-viz-spike-label"
              >
                85 kW
              </text>
              <circle
                className="dcc-viz-spike-dot"
                cx="95"
                cy="20"
                r="4"
                fill="currentColor"
              />
            </g>

            {/* Multiplication path */}
            <path
              className="tool-viz-flow__pulse"
              d="M 390 300 L 460 300"
              fill="none"
              stroke="url(#dcc-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#dcc-viz-arrow)"
            />
            <text
              x="490"
              y="292"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              × RATE
            </text>
            <text
              className="dcc-viz-math-value"
              x="490"
              y="318"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              85 × $12
            </text>

            <rect
              x="340"
              y="340"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="dcc-viz-scale-bar"
              x="342"
              y="342"
              width="230"
              height="8"
              rx="1"
              fill="url(#dcc-viz-bar)"
            />
            <text
              x="340"
              y="374"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              billing tier locked by peak kW
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#dcc-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#dcc-viz-arrow)"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="72"
              width="220"
              height="320"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="720"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY DEMAND
            </text>
            <text
              className="dcc-viz-output-value"
              x="720"
              y="160"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $1,020
            </text>
            <text
              x="720"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              /mo capacity charge
            </text>

            <rect
              x="720"
              y="210"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="dcc-viz-output-bar"
              x="722"
              y="212"
              width="155"
              height="8"
              rx="1"
              fill="url(#dcc-viz-bar)"
            />

            <text
              x="720"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL
            </text>
            <text
              className="dcc-viz-annual-value"
              x="720"
              y="286"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $12,240/yr
            </text>
            <text
              x="720"
              y="316"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              at 85 kW peak
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              shave peak · cut this line
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
              peak kW × $/kW → monthly demand charge
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
              85 kW · $12/kW → $1,020/mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
