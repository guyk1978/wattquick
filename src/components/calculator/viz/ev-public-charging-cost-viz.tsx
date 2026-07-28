"use client";

import { cn } from "@/lib/utils";

interface EvPublicChargingCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Public Charging & Idle Fee [VIZ].
 * Total = kWh × $/kWh + session fee + idle min × $/min.
 * Sample: 40 kWh · $0.45 · $0 session · 15 min · $0.40/min →
 * energy $18 · idle $6 · total $24 · effective $0.60/kWh.
 */
export function EvPublicChargingCostViz({
  className,
}: EvPublicChargingCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-public-charging-cost", className)}
      aria-label="EV public charging and idle fee visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Session Energy · Idle Penalty</h3>
        <p className="tool-viz__subtitle">
          Public kWh charges stack with connection fees — then idle minutes
          after full charge add penalties that push effective $/kWh higher.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-public-charging-cost-viz"
          role="img"
          aria-labelledby="epcc-viz-title epcc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="epcc-viz-title">
            EV public charging session cost and idle fee diagram
          </title>
          <desc id="epcc-viz-desc">
            Energy delivered times the energy rate plus session fee plus idle
            minutes times idle fee equals total session cost. Sample: 40
            kilowatt-hours at 0.45 dollars per kilowatt-hour with 15 idle
            minutes at 0.40 dollars per minute totals 24 dollars, or 0.60
            dollars effective per kilowatt-hour.
          </desc>

          <defs>
            <pattern
              id="epcc-viz-grid"
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
              id="epcc-viz-arrow"
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
              id="epcc-viz-pulse"
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
              id="epcc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="epcc-viz-idle"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#epcc-viz-grid)"
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
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="60"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY DELIVERED
            </text>
            <text
              className="epcc-viz-kwh-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40 kWh
            </text>

            <rect
              x="36"
              y="136"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="160"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY RATE
            </text>
            <text
              className="epcc-viz-rate-value"
              x="52"
              y="194"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.45/kWh
            </text>

            <rect
              x="36"
              y="226"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="250"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              IDLE TIME
            </text>
            <text
              className="epcc-viz-idle-value"
              x="52"
              y="284"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 min
            </text>

            <rect
              x="36"
              y="316"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="340"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              IDLE FEE RATE
            </text>
            <text
              className="epcc-viz-fee-value"
              x="52"
              y="374"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.40/min
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 80 L 300 80 L 300 150"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#epcc-viz-arrow)"
            />
            <path
              className="epcc-viz-timeline-pulse"
              d="M 236 80 L 300 80 L 300 150"
              fill="none"
              stroke="url(#epcc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 174 L 280 174 L 280 170 L 300 170"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="epcc-viz-energy-pulse"
              d="M 236 174 L 280 174 L 280 170 L 300 170"
              fill="none"
              stroke="url(#epcc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 236 264 L 280 264 L 280 280 L 300 280"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#epcc-viz-arrow)"
            />
            <path
              className="epcc-viz-idle-pulse"
              d="M 236 264 L 280 264 L 280 280 L 300 280"
              fill="none"
              stroke="url(#epcc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.45s" }}
            />
            <path
              d="M 236 354 L 288 354 L 288 300 L 300 300"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="epcc-viz-idle-pulse"
              d="M 236 354 L 288 354 L 288 300 L 300 300"
              fill="none"
              stroke="url(#epcc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.65s" }}
            />
          </g>

          {/* —— CENTER: SESSION ACCUMULATION —— */}
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
              SESSION COST ACCUMULATION
            </text>

            {/* Charger → EV line art */}
            <g className="epcc-viz-charger-node">
              <rect
                x="320"
                y="92"
                width="72"
                height="52"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <path
                d="M 340 110 L 356 110 L 348 128 L 364 128 L 348 148"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <text
                x="356"
                y="158"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                DCFC
              </text>
            </g>

            <path
              d="M 392 118 L 488 118"
              fill="none"
              stroke="#555555"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              className="epcc-viz-energy-pulse"
              d="M 392 118 L 488 118"
              fill="none"
              stroke="url(#epcc-viz-pulse)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              x="440"
              y="108"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              40 kWh in
            </text>

            <g className="epcc-viz-ev-node">
              <rect
                x="488"
                y="92"
                width="132"
                height="52"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 504 128 L 520 108 L 580 108 L 600 128 L 504 128"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <circle
                cx="528"
                cy="128"
                r="6"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <circle
                cx="584"
                cy="128"
                r="6"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <text
                x="554"
                y="158"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                EV PACK
              </text>
            </g>

            {/* Energy charge bar */}
            <text
              x="320"
              y="188"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY CHARGE · 40 × $0.45
            </text>
            <rect
              x="320"
              y="198"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="epcc-viz-energy-bar"
              x="320"
              y="198"
              width="225"
              height="14"
              rx="2"
              fill="url(#epcc-viz-bar)"
            />
            <text
              className="epcc-viz-energy-chip"
              x="480"
              y="234"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $18.00
            </text>

            {/* Idle fee bar */}
            <text
              x="320"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              IDLE PENALTY · 15 × $0.40
            </text>
            <rect
              x="320"
              y="278"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="epcc-viz-idle-bar"
              x="320"
              y="278"
              width="75"
              height="14"
              rx="2"
              fill="url(#epcc-viz-idle)"
            />
            <text
              className="epcc-viz-idle-chip"
              x="480"
              y="314"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $6.00
            </text>

            {/* Session fee note */}
            <rect
              x="320"
              y="332"
              width="140"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="epcc-viz-session-chip"
              x="390"
              y="352"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Session $0.00
            </text>
            <rect
              x="480"
              y="332"
              width="140"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="epcc-viz-eff-chip"
              x="550"
              y="352"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Eff. $0.60/kWh
            </text>

            <text
              x="320"
              y="388"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              move within grace · idle clocks after full
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#epcc-viz-arrow)"
            />
            <path
              className="epcc-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#epcc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="120"
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
              TOTAL SESSION COST
            </text>
            <text
              className="epcc-viz-output-value"
              x="696"
              y="122"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $24.00
            </text>
            <text
              x="696"
              y="148"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              energy + idle · public DCFC
            </text>

            <rect
              x="680"
              y="184"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="210"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY CHARGES
            </text>
            <text
              className="epcc-viz-energy-out"
              x="696"
              y="238"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $18.00
            </text>

            <rect
              x="680"
              y="272"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              IDLE FEE
            </text>
            <text
              className="epcc-viz-idle-out"
              x="696"
              y="326"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $6.00
            </text>

            <rect
              x="680"
              y="360"
              width="244"
              height="48"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="epcc-viz-split-value"
              x="802"
              y="390"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75% energy · 25% idle
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
              className="epcc-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (40 × $0.45) + $0 + (15 × $0.40) → $24.00 · $24 ÷ 40 = $0.60/kWh
            </text>
          </g>

          <path
            className="epcc-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#epcc-viz-pulse)"
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
            unplug after full · grace periods often 5–15 min
          </text>
          <text
            className="epcc-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            +$6 idle tax
          </text>
        </svg>
      </div>
    </section>
  );
}
