"use client";

import { cn } from "@/lib/utils";

interface AcEnergyCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Air Conditioner Energy Cost [VIZ].
 * Cost = (W × hrs × days ÷ 1000) × $/kWh.
 * Sample: 1,200 W · 8 h · 30 d · $0.14/kWh → 288 kWh · $40.32.
 */
export function AcEnergyCostViz({ className }: AcEnergyCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ac-energy-cost", className)}
      aria-label="Air conditioner energy cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">AC Energy Cost</h3>
        <p className="tool-viz__subtitle">
          Cooling watts times run hours become kilowatt-hours — your utility
          rate turns that energy into the monthly air-conditioning bill.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ac-energy-cost-viz"
          role="img"
          aria-labelledby="aec-viz-title aec-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="aec-viz-title">
            Air conditioner energy cost animated flow diagram
          </title>
          <desc id="aec-viz-desc">
            AC power draw in watts, hours per day, billing days, and electricity
            rate determine kilowatt-hours and total cost. Sample: a 1200 watt
            air conditioner running 8 hours per day for 30 days at 14 cents per
            kilowatt-hour uses 288 kilowatt-hours and costs 40 dollars and 32
            cents.
          </desc>

          <defs>
            <pattern
              id="aec-viz-grid"
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
              id="aec-viz-arrow"
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
              id="aec-viz-pulse"
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
              id="aec-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="aec-viz-cool"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
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
            fill="url(#aec-viz-grid)"
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

          {/* —— INPUT: AC power —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="110"
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
              AC POWER DRAW
            </text>
            <text
              className="aec-viz-w-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 W
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              average compressor draw
            </text>
          </g>

          {/* —— INPUT: Hours —— */}
          <g>
            <rect
              x="40"
              y="166"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="192"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HOURS PER DAY
            </text>
            <text
              className="aec-viz-hrs-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 hrs
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cooling duty cycle
            </text>
          </g>

          {/* —— INPUT: Advanced rate/days —— */}
          <g>
            <rect
              x="40"
              y="282"
              width="220"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RATE · DAYS
            </text>
            <text
              className="aec-viz-adv-value"
              x="56"
              y="344"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14 · 30 d
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $/kWh × billing period
            </text>
            <text
              x="56"
              y="386"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              advanced tariff inputs
            </text>
          </g>

          {/* Flow → energy path */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#aec-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#aec-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#aec-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="url(#aec-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#aec-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="url(#aec-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Energy consumption path —— */}
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
              ENERGY CONSUMPTION PATH
            </text>

            {/* AC unit silhouette */}
            <g className="aec-viz-unit" transform="translate(360, 88)">
              <rect
                x="0"
                y="0"
                width="120"
                height="72"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="20"
                x2="108"
                y2="20"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                x1="12"
                y1="36"
                x2="108"
                y2="36"
                stroke="#444444"
                strokeWidth="1"
              />
              <line
                x1="12"
                y1="52"
                x2="108"
                y2="52"
                stroke="#444444"
                strokeWidth="1"
              />
              <text
                x="60"
                y="90"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                indoor unit · 1.2 kW
              </text>
            </g>

            {/* Cool airflow arrows */}
            <g className="aec-viz-cool" transform="translate(500, 100)">
              <path
                d="M 0 12 L 48 12"
                fill="none"
                stroke="url(#aec-viz-cool)"
                strokeWidth="2"
                markerEnd="url(#aec-viz-arrow)"
              />
              <path
                d="M 0 28 L 64 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.7"
                markerEnd="url(#aec-viz-arrow)"
              />
              <path
                d="M 0 44 L 40 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.5"
                markerEnd="url(#aec-viz-arrow)"
              />
              <text
                x="32"
                y="68"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                cool air · run hours
              </text>
            </g>

            {/* kWh accumulation */}
            <rect
              x="348"
              y="200"
              width="284"
              height="88"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="226"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              kWh ACCUMULATION
            </text>
            <text
              className="aec-viz-kwh-value"
              x="364"
              y="258"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              288 kWh
            </text>
            <rect
              x="364"
              y="270"
              width="252"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="aec-viz-kwh-bar"
              x="364"
              y="270"
              width="252"
              height="8"
              rx="2"
              fill="url(#aec-viz-bar)"
            />

            {/* Formula */}
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
              FORMULA
            </text>
            <text
              className="aec-viz-math-value"
              x="364"
              y="358"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              (1200 × 8 × 30) ÷ 1000 = 288
            </text>
            <text
              x="364"
              y="376"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              × $0.14 / kWh → bill
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 244 L 700 244"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#aec-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 244 L 700 244"
            fill="none"
            stroke="url(#aec-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Cost —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="220"
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
              ESTIMATED COST
            </text>
            <text
              className="aec-viz-output-value"
              x="726"
              y="120"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $40.32
            </text>
            <text
              x="726"
              y="148"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              288 kWh × $0.14
            </text>
            <rect
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="aec-viz-cost-bar"
              x="726"
              y="168"
              width="162"
              height="12"
              rx="2"
              fill="url(#aec-viz-bar)"
            />
            <text
              className="aec-viz-detail-value"
              x="726"
              y="208"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~30-day cooling bill
            </text>
            <text
              x="726"
              y="232"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              duty cycle may vary
            </text>
          </g>

          {/* —— OUTPUT: Daily slice —— */}
          <g>
            <rect
              x="710"
              y="276"
              width="210"
              height="126"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="302"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAILY ENERGY
            </text>
            <text
              className="aec-viz-daily-value"
              x="726"
              y="340"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              9.6 kWh/day
            </text>
            <text
              x="726"
              y="364"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              1.2 kW × 8 hrs
            </text>
            <text
              className="aec-viz-detail-value"
              x="726"
              y="386"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $1.34 / day
            </text>
          </g>

          {/* —— Footer timeline —— */}
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
              COOLING BILL TIMELINE
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
              className="aec-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="aec-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="aec-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="aec-viz-tick aec-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="aec-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#aec-viz-pulse)"
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
              day 1 · plug in
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh stack at 9.6 / day
            </text>
            <text
              className="aec-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              day 30 · $40.32
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
