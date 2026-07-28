"use client";

import { cn } from "@/lib/utils";

interface MobilityTcoCalculatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Mobility TCO Calculator [VIZ].
 * 36-mo car operating TCO vs e-bike / e-scooter acquisition + upkeep.
 * Sample defaults: car $21,600 · e-bike $3,248 · e-scooter $1,022 →
 * save $18,352 / $20,578 vs car (best: e-scooter).
 */
export function MobilityTcoCalculatorViz({
  className,
}: MobilityTcoCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--mobility-tco-calculator", className)}
      aria-label="Mobility TCO visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">3-Yr TCO · Car vs Micro</h3>
        <p className="tool-viz__subtitle">
          Car fuel, insurance, parking, and depreciation stack every month —
          e-bike and e-scooter shift spend upfront and keep recurring costs tiny.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg mobility-tco-calculator-viz"
          role="img"
          aria-labelledby="mtco-viz-title mtco-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="mtco-viz-title">
            Mobility total cost of ownership comparison diagram
          </title>
          <desc id="mtco-viz-desc">
            Three-year total cost of ownership for car, e-bike, and e-scooter.
            Sample defaults: car 21,600 dollars, e-bike 3,248 dollars, e-scooter
            1,022 dollars, saving about 18,352 dollars with an e-bike and 20,578
            dollars with an e-scooter versus the car.
          </desc>

          <defs>
            <pattern
              id="mtco-viz-grid"
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
              id="mtco-viz-arrow"
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
              id="mtco-viz-pulse"
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
              id="mtco-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="mtco-viz-car"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#mtco-viz-grid)"
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
              x="36"
              y="36"
              width="200"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="58"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CAR · $/MO STACK
            </text>
            <text
              className="mtco-viz-car-value"
              x="52"
              y="88"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Fuel 120 · Ins 150
            </text>
            <text
              className="mtco-viz-car-value"
              x="52"
              y="110"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Maint 50 · Park 80
            </text>
            <text
              className="mtco-viz-car-value"
              x="52"
              y="132"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Deprec 200
            </text>

            <rect
              x="36"
              y="160"
              width="200"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="182"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              E-BIKE
            </text>
            <text
              className="mtco-viz-ebike-value"
              x="52"
              y="210"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Buy $2,000 · Batt $600
            </text>
            <text
              className="mtco-viz-ebike-value"
              x="52"
              y="232"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Maint $15 · Charge $3
            </text>

            <rect
              x="36"
              y="274"
              width="200"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              E-SCOOTER
            </text>
            <text
              className="mtco-viz-esc-value"
              x="52"
              y="324"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Buy $800 · Tires $150
            </text>
            <text
              className="mtco-viz-esc-value"
              x="52"
              y="346"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Charge $2/mo
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 90 L 300 90 L 300 160"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#mtco-viz-arrow)"
            />
            <path
              className="mtco-viz-timeline-pulse"
              d="M 236 90 L 300 90 L 300 160"
              fill="none"
              stroke="url(#mtco-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 210 L 280 210 L 280 220 L 300 220"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="mtco-viz-cash-pulse"
              d="M 236 210 L 280 210 L 280 220 L 300 220"
              fill="none"
              stroke="url(#mtco-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M 236 324 L 280 324 L 280 280 L 300 280"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="mtco-viz-cash-pulse"
              d="M 236 324 L 280 324 L 280 280 L 300 280"
              fill="none"
              stroke="url(#mtco-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.55s" }}
            />
          </g>

          {/* —— CENTER: 3-YR COMPARISON —— */}
          <g>
            <rect
              x="300"
              y="48"
              width="340"
              height="360"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="320"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              36-MONTH EXPENSE FLOW
            </text>

            {/* Car bar */}
            <g className="mtco-viz-car-node">
              <text
                x="320"
                y="108"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                CAR
              </text>
              <rect
                x="320"
                y="118"
                width="300"
                height="28"
                rx="3"
                fill="#1a1a1a"
                stroke="#333333"
                strokeWidth="1"
              />
              <rect
                className="mtco-viz-car-bar"
                x="320"
                y="118"
                width="300"
                height="28"
                rx="3"
                fill="url(#mtco-viz-car)"
              />
              <text
                className="mtco-viz-car-chip"
                x="470"
                y="137"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $21,600
              </text>
            </g>

            {/* E-bike bar ~15% */}
            <g className="mtco-viz-ebike-node">
              <text
                x="320"
                y="178"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                E-BIKE
              </text>
              <rect
                x="320"
                y="188"
                width="300"
                height="28"
                rx="3"
                fill="#1a1a1a"
                stroke="#333333"
                strokeWidth="1"
              />
              <rect
                className="mtco-viz-ebike-bar"
                x="320"
                y="188"
                width="45"
                height="28"
                rx="3"
                fill="url(#mtco-viz-bar)"
              />
              <text
                className="mtco-viz-ebike-chip"
                x="400"
                y="207"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $3,248
              </text>
            </g>

            {/* E-scooter bar ~5% */}
            <g className="mtco-viz-esc-node">
              <text
                x="320"
                y="248"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                E-SCOOTER
              </text>
              <rect
                x="320"
                y="258"
                width="300"
                height="28"
                rx="3"
                fill="#1a1a1a"
                stroke="#333333"
                strokeWidth="1"
              />
              <rect
                className="mtco-viz-esc-bar"
                x="320"
                y="258"
                width="14"
                height="28"
                rx="3"
                fill="url(#mtco-viz-bar)"
              />
              <text
                className="mtco-viz-esc-chip"
                x="360"
                y="277"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $1,022
              </text>
            </g>

            {/* Stack detail */}
            <text
              x="320"
              y="320"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CAR STACK (36 MO)
            </text>
            <text
              className="mtco-viz-stack-chip"
              x="320"
              y="342"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Fuel $4,320 · Ins $5,400 · Park/maint/depr $11,880
            </text>

            <rect
              x="320"
              y="360"
              width="140"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="mtco-viz-best-chip"
              x="390"
              y="380"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              BEST: SCOOTER
            </text>
            <rect
              x="480"
              y="360"
              width="140"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="mtco-viz-horizon-chip"
              x="550"
              y="380"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Horizon 3 yr
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#mtco-viz-arrow)"
            />
            <path
              className="mtco-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#mtco-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="100"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="696"
              y="74"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BEST SAVINGS VS CAR
            </text>
            <text
              className="mtco-viz-output-value"
              x="696"
              y="118"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $20,578
            </text>
            <text
              x="696"
              y="136"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              e-scooter · 3 years
            </text>

            <rect
              x="680"
              y="164"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="190"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              E-BIKE VS CAR
            </text>
            <text
              className="mtco-viz-ebike-out"
              x="696"
              y="218"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $18,352 saved
            </text>

            <rect
              x="680"
              y="252"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              E-SCOOTER VS CAR
            </text>
            <text
              className="mtco-viz-esc-out"
              x="696"
              y="306"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $20,578 saved
            </text>

            <rect
              x="680"
              y="340"
              width="244"
              height="68"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              3-YR TOTALS
            </text>
            <text
              className="mtco-viz-totals-out"
              x="696"
              y="390"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $21.6k · $3.2k · $1.0k
            </text>
          </g>

          {/* —— MATH STRIP —— */}
          <g>
            <rect
              x="36"
              y="420"
              width="888"
              height="52"
              rx="4"
              fill="#0d0d0d"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="mtco-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Car Σ($600/mo)×36 = $21,600 · e-bike $2k+$600+$540+$108 = $3,248
            </text>
          </g>

          <path
            className="mtco-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#mtco-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="56"
            y="528"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            parking + insurance + depreciation dominate car TCO
          </text>
          <text
            className="mtco-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            ~15× cheaper scooter
          </text>
        </svg>
      </div>
    </section>
  );
}
