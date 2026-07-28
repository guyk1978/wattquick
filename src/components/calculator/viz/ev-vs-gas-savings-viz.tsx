"use client";

import { cn } from "@/lib/utils";

interface EvVsGasSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV vs. Gas Car Savings [VIZ].
 * Gas $/mo = (mi ÷ MPG) × $/gal; EV $/mo = mi × kWh/mi × $/kWh; save = gas − EV.
 * Sample: 1,000 mi · $3.50/gal · 28 MPG · $0.14/kWh · 0.30 kWh/mi
 * → Gas $125 · EV $42 · save $83/mo · $996/yr.
 */
export function EvVsGasSavingsViz({ className }: EvVsGasSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-vs-gas-savings", className)}
      aria-label="EV versus gas car savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">EV vs. Gas Savings</h3>
        <p className="tool-viz__subtitle">
          Same monthly miles, two energy bills — gasoline gallons versus
          kilowatt-hours — with the gap as what you keep each month and year.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-vs-gas-savings-viz"
          role="img"
          aria-labelledby="evg-viz-title evg-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="evg-viz-title">
            EV versus gas car savings animated comparison diagram
          </title>
          <desc id="evg-viz-desc">
            Monthly gas cost from miles, MPG, and price per gallon versus EV
            cost from miles, kilowatt-hours per mile, and electricity rate.
            Sample: 1,000 miles yields about 125 dollars gas and 42 dollars EV,
            saving 83 dollars per month or 996 dollars per year.
          </desc>

          <defs>
            <pattern
              id="evg-viz-grid"
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
              id="evg-viz-arrow"
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
              id="evg-viz-pulse"
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
              id="evg-viz-bar"
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
            fill="url(#evg-viz-grid)"
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
            GAS vs EV
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

          {/* —— INPUT stack —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="96"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY MILES
            </text>
            <text
              className="evg-viz-mi-value"
              x="56"
              y="138"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,000 mi
            </text>
          </g>

          <g>
            <rect
              x="40"
              y="188"
              width="230"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="212"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              GAS
            </text>
            <text
              className="evg-viz-gas-in"
              x="56"
              y="244"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $3.50/gal · 28 MPG
            </text>
            <text
              x="56"
              y="270"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              (mi ÷ MPG) × price
            </text>
          </g>

          <g>
            <rect
              x="40"
              y="304"
              width="230"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EV
            </text>
            <text
              className="evg-viz-ev-in"
              x="56"
              y="358"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh · 0.30 kWh/mi
            </text>
          </g>

          {/* —— Flow —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#evg-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#evg-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#evg-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#evg-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 348 L 320 348"
            fill="none"
            stroke="url(#evg-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#evg-viz-arrow)"
          />

          {/* —— CENTER: Compare —— */}
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
              MONTHLY ENERGY COST
            </text>

            {/* Gas column */}
            <g transform="translate(350, 120)">
              <rect
                className="evg-viz-gas-card"
                x="0"
                y="0"
                width="130"
                height="130"
                rx="4"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="16"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                GAS
              </text>
              <text
                className="evg-viz-gas-cost"
                x="16"
                y="70"
                fill="#ededed"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $125
              </text>
              <text
                x="16"
                y="96"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                /mo
              </text>
              <text
                x="16"
                y="118"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                ~35.7 gal
              </text>
            </g>

            <text
              x="490"
              y="190"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −
            </text>

            {/* EV column */}
            <g transform="translate(510, 120)">
              <rect
                className="evg-viz-ev-card"
                x="0"
                y="0"
                width="130"
                height="130"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="16"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                EV
              </text>
              <text
                className="evg-viz-ev-cost"
                x="16"
                y="70"
                fill="#ededed"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $42
              </text>
              <text
                x="16"
                y="96"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                /mo
              </text>
              <text
                x="16"
                y="118"
                fill="#666666"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                300 kWh
              </text>
            </g>

            {/* Cost bars */}
            <text
              x="340"
              y="288"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              COST BARS
            </text>
            <text
              x="340"
              y="312"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              GAS
            </text>
            <rect
              x="380"
              y="302"
              width="250"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="evg-viz-gas-bar"
              x="382"
              y="304"
              width="226"
              height="6"
              rx="1"
              fill="url(#evg-viz-bar)"
            />
            <text
              x="340"
              y="340"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              EV
            </text>
            <rect
              x="380"
              y="330"
              width="250"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="evg-viz-ev-bar"
              x="382"
              y="332"
              width="76"
              height="6"
              rx="1"
              fill="url(#evg-viz-bar)"
            />

            <text
              className="evg-viz-math-value"
              x="340"
              y="372"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $125 − $42 = $83 /mo
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#evg-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#evg-viz-arrow)"
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
              MONTHLY SAVINGS
            </text>
            <text
              className="evg-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $83
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              /mo
            </text>

            <rect
              x="720"
              y="202"
              width="180"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="evg-viz-output-bar"
              x="722"
              y="204"
              width="150"
              height="8"
              rx="1"
              fill="url(#evg-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              YEARLY SAVINGS
            </text>
            <text
              className="evg-viz-year-value"
              x="720"
              y="282"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $996
            </text>
            <text
              className="evg-viz-detail-value"
              x="720"
              y="314"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.13/mi gas · $0.04/mi EV
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              energy only
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
              save = gas $/mo − EV $/mo
            </text>
            <text
              x="480"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="480"
              y="52"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1,000 mi → $83/mo · $996/yr
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
