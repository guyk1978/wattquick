"use client";

import { cn } from "@/lib/utils";

interface CryptoMiningPowerVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Crypto Mining Power [VIZ].
 * kWh = (W × hrs × days) ÷ 1000; cost = kWh × $/kWh.
 * Sample: 900 W · 24 h · 30 d · $0.15/kWh → 648 kWh · $97.20.
 */
export function CryptoMiningPowerViz({
  className,
}: CryptoMiningPowerVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--crypto-mining-power", className)}
      aria-label="Crypto mining power visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Mining Rig Power Cost</h3>
        <p className="tool-viz__subtitle">
          High-wattage GPU/ASIC draw times run hours stack into kilowatt-hours —
          your tariff turns continuous hash load into period electricity cost.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg crypto-mining-power-viz"
          role="img"
          aria-labelledby="cmp-viz-title cmp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="cmp-viz-title">
            Crypto mining power animated flow diagram
          </title>
          <desc id="cmp-viz-desc">
            Rig power draw, hours per day, billing days, and electricity rate
            determine kilowatt-hours and period cost. Sample: a 900 watt mining
            rig running 24 hours per day for 30 days at 15 cents per
            kilowatt-hour uses 648 kilowatt-hours and costs 97 dollars and 20
            cents.
          </desc>

          <defs>
            <pattern
              id="cmp-viz-grid"
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
              id="cmp-viz-arrow"
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
              id="cmp-viz-pulse"
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
              id="cmp-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="cmp-viz-load"
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
            fill="url(#cmp-viz-grid)"
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

          {/* —— INPUT: Rig power —— */}
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
              RIG POWER DRAW
            </text>
            <text
              className="cmp-viz-w-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              900 W
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              wall / PSU metered
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
              className="cmp-viz-hrs-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              24 hrs
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous hash load
            </text>
          </g>

          {/* —— INPUT: Advanced period/rate —— */}
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
              PERIOD · RATE
            </text>
            <text
              className="cmp-viz-adv-value"
              x="56"
              y="344"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 d · $0.15
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              days × $/kWh tariff
            </text>
            <text
              x="56"
              y="386"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              advanced billing inputs
            </text>
          </g>

          {/* Flow → heavy-load path */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cmp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#cmp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cmp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 155 L 310 155"
            fill="none"
            stroke="url(#cmp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cmp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 342 L 290 342 L 290 215 L 310 215"
            fill="none"
            stroke="url(#cmp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Heavy-load energy path —— */}
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
              HEAVY-LOAD ENERGY PATH
            </text>

            {/* Rig rack silhouette */}
            <g className="cmp-viz-rig" transform="translate(360, 88)">
              <rect
                x="0"
                y="0"
                width="120"
                height="100"
                rx="4"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* GPU / board slots */}
              <rect
                className="cmp-viz-board"
                x="12"
                y="14"
                width="96"
                height="14"
                rx="1"
                fill="none"
                stroke="#555555"
                strokeWidth="1"
              />
              <rect
                className="cmp-viz-board"
                x="12"
                y="36"
                width="96"
                height="14"
                rx="1"
                fill="none"
                stroke="#555555"
                strokeWidth="1"
              />
              <rect
                className="cmp-viz-board"
                x="12"
                y="58"
                width="96"
                height="14"
                rx="1"
                fill="none"
                stroke="#555555"
                strokeWidth="1"
              />
              <rect
                className="cmp-viz-load-fill"
                x="12"
                y="80"
                width="96"
                height="10"
                rx="1"
                fill="url(#cmp-viz-load)"
              />
              <text
                x="60"
                y="120"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                GPU / ASIC rack
              </text>
            </g>

            {/* Power draw arrows */}
            <g className="cmp-viz-draw" transform="translate(510, 110)">
              <path
                d="M 0 8 L 56 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                markerEnd="url(#cmp-viz-arrow)"
              />
              <path
                d="M 0 28 L 72 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.7"
                markerEnd="url(#cmp-viz-arrow)"
              />
              <path
                d="M 0 48 L 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                opacity="0.5"
                markerEnd="url(#cmp-viz-arrow)"
              />
              <text
                x="36"
                y="72"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                900 W wall draw
              </text>
            </g>

            {/* kWh chip */}
            <rect
              x="348"
              y="232"
              width="284"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PERIOD ENERGY
            </text>
            <text
              className="cmp-viz-kwh-value"
              x="364"
              y="286"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              648 kWh
            </text>
            <rect
              x="500"
              y="268"
              width="116"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="cmp-viz-kwh-bar"
              x="500"
              y="268"
              width="116"
              height="8"
              rx="2"
              fill="url(#cmp-viz-bar)"
            />

            {/* Formula */}
            <rect
              x="348"
              y="320"
              width="284"
              height="62"
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
              FORMULA
            </text>
            <text
              className="cmp-viz-math-value"
              x="364"
              y="368"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              (900 × 24 × 30) ÷ 1000 = 648
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 268 L 700 268"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#cmp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 268 L 700 268"
            fill="none"
            stroke="url(#cmp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Period cost —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="200"
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
              PERIOD COST
            </text>
            <text
              className="cmp-viz-output-value"
              x="726"
              y="118"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $97.20
            </text>
            <text
              x="726"
              y="146"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              648 kWh × $0.15
            </text>
            <rect
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="cmp-viz-cost-bar"
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="url(#cmp-viz-bar)"
            />
            <text
              className="cmp-viz-detail-value"
              x="726"
              y="204"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ~30-day power bill
            </text>
            <text
              x="726"
              y="224"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              energy only · not ROI
            </text>
          </g>

          {/* —— OUTPUT: Daily / monthly —— */}
          <g>
            <rect
              x="710"
              y="256"
              width="210"
              height="146"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY BREAKDOWN
            </text>
            <text
              className="cmp-viz-daily-value"
              x="726"
              y="318"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              21.6 kWh/day
            </text>
            <text
              className="cmp-viz-detail-value"
              x="726"
              y="348"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              648 kWh/mo
            </text>
            <text
              x="726"
              y="376"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ $3.24 / day overhead
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
              24/7 HASH LOAD TIMELINE
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
              className="cmp-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="cmp-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="cmp-viz-tick"
              cx="600"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="cmp-viz-tick cmp-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="cmp-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#cmp-viz-pulse)"
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
              day 1 · rig online
            </text>
            <text
              x="600"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +21.6 kWh each day
            </text>
            <text
              className="cmp-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              day 30 · 648 kWh · $97.20
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
