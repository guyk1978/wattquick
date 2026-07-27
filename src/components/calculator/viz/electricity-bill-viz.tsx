"use client";

import { cn } from "@/lib/utils";

interface ElectricityBillVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Electricity Bill Estimator [VIZ].
 * Bill = kWh × $/kWh.
 * Sample: 850 kWh · $0.14/kWh → $119.00.
 */
export function ElectricityBillViz({ className }: ElectricityBillVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--electricity-bill", className)}
      aria-label="Electricity bill estimator visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Electricity Bill Estimator</h3>
        <p className="tool-viz__subtitle">
          Monthly kilowatt-hours times your utility rate sets the energy-only
          bill — fixed fees and tiers sit outside this core math.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg electricity-bill-viz"
          role="img"
          aria-labelledby="ebe-viz-title ebe-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebe-viz-title">
            Electricity bill estimator animated flow diagram
          </title>
          <desc id="ebe-viz-desc">
            Energy used in kilowatt-hours multiplied by the electricity rate
            yields the estimated bill. Sample: 850 kilowatt-hours at 14 cents
            per kilowatt-hour costs 119 dollars.
          </desc>

          <defs>
            <pattern
              id="ebe-viz-grid"
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
              id="ebe-viz-arrow"
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
              id="ebe-viz-pulse"
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
              id="ebe-viz-bar"
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
            fill="url(#ebe-viz-grid)"
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
            USAGE × RATE PATH
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

          {/* —— INPUT: Energy used —— */}
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
              ENERGY USED
            </text>
            <text
              className="ebe-viz-kwh-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              850 kWh
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              monthly consumption
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              meter / statement total
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
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
              UTILITY RATE
            </text>
            <text
              className="ebe-viz-rate-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $/kWh energy charge
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              before fees & taxes
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#ebe-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebe-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#ebe-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebe-viz-arrow)"
          />

          {/* —— CENTER: Billing multiplication —— */}
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
              BILLING MULTIPLICATION
            </text>

            {/* Meter / usage bars */}
            <g transform="translate(360, 120)">
              <rect
                x="0"
                y="0"
                width="100"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="50"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                METER
              </text>
              <text
                className="ebe-viz-meter-value"
                x="50"
                y="48"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                850
              </text>
              {/* usage fill bar */}
              <rect
                x="12"
                y="56"
                width="76"
                height="6"
                rx="1"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="ebe-viz-usage-bar"
                x="13"
                y="57"
                width="60"
                height="4"
                rx="1"
                fill="url(#ebe-viz-bar)"
              />
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 475 155 L 510 155"
              fill="none"
              stroke="url(#ebe-viz-pulse)"
              strokeWidth="2"
              markerEnd="url(#ebe-viz-arrow)"
            />

            <text
              x="530"
              y="148"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×
            </text>

            <g transform="translate(555, 120)">
              <rect
                x="0"
                y="0"
                width="80"
                height="70"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="40"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                RATE
              </text>
              <text
                className="ebe-viz-rate-chip"
                x="40"
                y="48"
                textAnchor="middle"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $0.14
              </text>
            </g>

            {/* Dollar pulse node */}
            <circle
              className="ebe-viz-dollar-dot"
              cx="490"
              cy="230"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="490"
              y="236"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $
            </text>

            <path
              className="tool-viz-flow__pulse"
              d="M 490 205 L 490 208"
              fill="none"
              stroke="url(#ebe-viz-pulse)"
              strokeWidth="2"
            />

            <text
              x="340"
              y="290"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY × PRICE
            </text>
            <text
              className="ebe-viz-math-value"
              x="340"
              y="320"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              850 × $0.14
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
              className="ebe-viz-scale-bar"
              x="342"
              y="342"
              width="220"
              height="8"
              rx="1"
              fill="url(#ebe-viz-bar)"
            />
            <text
              x="340"
              y="374"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              energy-only · no delivery fees
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ebe-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ebe-viz-arrow)"
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
              ESTIMATED BILL
            </text>
            <text
              className="ebe-viz-output-value"
              x="720"
              y="160"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $119.00
            </text>
            <text
              x="720"
              y="188"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              energy charge / mo
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
              className="ebe-viz-output-bar"
              x="722"
              y="212"
              width="155"
              height="8"
              rx="1"
              fill="url(#ebe-viz-bar)"
            />

            <text
              x="720"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DETAIL
            </text>
            <text
              className="ebe-viz-detail-value"
              x="720"
              y="286"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              850 kWh × $0.14
            </text>
            <text
              x="720"
              y="318"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              find heavy loads next
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              tiers & taxes not included
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
              kWh × $/kWh → estimated electricity bill
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
              850 kWh · $0.14 → $119.00
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
