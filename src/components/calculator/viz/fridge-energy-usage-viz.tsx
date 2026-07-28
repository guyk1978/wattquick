"use client";

import { cn } from "@/lib/utils";

interface FridgeEnergyUsageVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Refrigerator Energy Usage [VIZ].
 * Monthly kWh = (W × 24 × 30) ÷ 1000; cost = kWh × $/kWh.
 * Sample: 150 W · $0.14/kWh → 108 kWh/mo · $15.12.
 */
export function FridgeEnergyUsageViz({
  className,
}: FridgeEnergyUsageVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--fridge-energy-usage", className)}
      aria-label="Refrigerator energy usage visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Fridge Energy Usage</h3>
        <p className="tool-viz__subtitle">
          Average watts run around the clock — 24×30 hours stack into monthly
          kilowatt-hours, then the utility rate sets the bill.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg fridge-energy-usage-viz"
          role="img"
          aria-labelledby="feu-viz-title feu-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="feu-viz-title">
            Refrigerator energy usage animated flow diagram
          </title>
          <desc id="feu-viz-desc">
            Average refrigerator power in watts and electricity rate determine
            continuous-duty monthly kilowatt-hours and cost. Sample: 150 watts
            average at 14 cents per kilowatt-hour uses 108 kilowatt-hours per
            month and costs about 15 dollars and 12 cents.
          </desc>

          <defs>
            <pattern
              id="feu-viz-grid"
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
              id="feu-viz-arrow"
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
              id="feu-viz-pulse"
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
              id="feu-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="feu-viz-duty"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#feu-viz-grid)"
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

          {/* —— INPUT: Average power —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="160"
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
              AVERAGE POWER
            </text>
            <text
              className="feu-viz-w-value"
              x="56"
              y="114"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              150 W
            </text>
            <text
              x="56"
              y="142"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              running average
            </text>
            <text
              x="56"
              y="164"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              not peak compressor
            </text>
            <text
              x="56"
              y="182"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              cycles on / off all day
            </text>
          </g>

          {/* —— INPUT: Rate —— */}
          <g>
            <rect
              x="40"
              y="220"
              width="220"
              height="140"
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
              ELECTRICITY RATE
            </text>
            <text
              className="feu-viz-rate-value"
              x="56"
              y="292"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14/kWh
            </text>
            <text
              x="56"
              y="320"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              local utility tariff
            </text>
            <text
              x="56"
              y="342"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              fixed 24×30 duty model
            </text>
          </g>

          {/* Flow → continuous path */}
          <path
            d="M 260 120 L 310 120"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#feu-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 120 L 310 120"
            fill="none"
            stroke="url(#feu-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 290 L 290 290 L 290 180 L 310 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#feu-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 290 L 290 290 L 290 180 L 310 180"
            fill="none"
            stroke="url(#feu-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Continuous-duty energy path —— */}
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
              CONTINUOUS-DUTY ENERGY PATH
            </text>

            {/* Fridge silhouette */}
            <g className="feu-viz-fridge" transform="translate(360, 88)">
              <rect
                x="0"
                y="0"
                width="88"
                height="140"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="0"
                y1="48"
                x2="88"
                y2="48"
                stroke="#444444"
                strokeWidth="1"
              />
              <circle cx="72" cy="24" r="3" fill="none" stroke="#555555" />
              <circle cx="72" cy="80" r="3" fill="none" stroke="#555555" />
              {/* Compressor duty pulse */}
              <rect
                className="feu-viz-compressor"
                x="20"
                y="108"
                width="48"
                height="20"
                rx="2"
                fill="url(#feu-viz-duty)"
                opacity="0.85"
              />
              <text
                x="44"
                y="158"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                fridge · 150 W avg
              </text>
            </g>

            {/* 24/7 clock ring */}
            <g className="feu-viz-clock" transform="translate(500, 110)">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <circle
                className="feu-viz-clock-hand"
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="60 190"
                strokeLinecap="round"
              />
              <circle cx="48" cy="48" r="3" fill="currentColor" />
              <text
                x="48"
                y="104"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                24 hrs × 30 days
              </text>
            </g>

            {/* Daily accumulation */}
            <rect
              x="348"
              y="252"
              width="284"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="274"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              DAILY LOAD
            </text>
            <text
              className="feu-viz-daily-value"
              x="364"
              y="296"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              150 W × 24 h = 3.6 kWh/day
            </text>

            {/* Monthly formula */}
            <rect
              x="348"
              y="322"
              width="284"
              height="60"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="344"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              MONTHLY kWh
            </text>
            <text
              className="feu-viz-math-value"
              x="364"
              y="368"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              (150 × 24 × 30) ÷ 1000 = 108
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 220 L 700 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#feu-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 220 L 700 220"
            fill="none"
            stroke="url(#feu-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Monthly kWh —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="160"
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
              MONTHLY ENERGY
            </text>
            <text
              className="feu-viz-kwh-value"
              x="726"
              y="112"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              108 kWh
            </text>
            <text
              x="726"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh / month
            </text>
            <rect
              x="726"
              y="156"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="feu-viz-kwh-bar"
              x="726"
              y="156"
              width="162"
              height="10"
              rx="2"
              fill="url(#feu-viz-bar)"
            />
            <text
              className="feu-viz-detail-value"
              x="726"
              y="184"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous 24/7 duty
            </text>
          </g>

          {/* —— OUTPUT: Monthly cost —— */}
          <g>
            <rect
              x="710"
              y="216"
              width="210"
              height="186"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="242"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MONTHLY COST
            </text>
            <text
              className="feu-viz-output-value"
              x="726"
              y="292"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $15.12
            </text>
            <text
              x="726"
              y="320"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              108 kWh × $0.14
            </text>
            <rect
              x="726"
              y="340"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="feu-viz-cost-bar"
              x="726"
              y="340"
              width="162"
              height="12"
              rx="2"
              fill="url(#feu-viz-bar)"
            />
            <text
              className="feu-viz-detail-value"
              x="726"
              y="378"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $0.50 / day
            </text>
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
              24/7 ACCUMULATION TIMELINE
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
              className="feu-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="feu-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="feu-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="feu-viz-tick feu-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="feu-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#feu-viz-pulse)"
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
              hour 0
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +3.6 kWh each day
            </text>
            <text
              className="feu-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              day 30 · 108 kWh · $15.12
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
