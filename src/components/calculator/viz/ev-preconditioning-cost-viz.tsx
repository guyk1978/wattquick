"use client";

import { cn } from "@/lib/utils";

interface EvPreconditioningCostVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Battery Pre-conditioning Cost [VIZ].
 * Energy = kW × hours; cost = kWh × $/kWh; mode from ambient vs thermal band.
 * Sample: −5 °C · 5 kW · 15 min · $0.15/kWh → 1.25 kWh · $0.19 · heating.
 */
export function EvPreconditioningCostViz({
  className,
}: EvPreconditioningCostVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-preconditioning-cost", className)}
      aria-label="EV battery pre-conditioning cost visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Pack Heat · Pre-Charge Cost</h3>
        <p className="tool-viz__subtitle">
          Cold ambient forces BMS heating power before DC fast charge — kW ×
          minutes becomes kWh, then multiplies by your electricity rate.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-preconditioning-cost-viz"
          role="img"
          aria-labelledby="epre-viz-title epre-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="epre-viz-title">
            EV battery pre-conditioning thermal cost diagram
          </title>
          <desc id="epre-viz-desc">
            Outside temperature, BMS thermal power, pre-conditioning duration,
            and electricity rate determine energy and cost to warm or cool the
            pack. Sample: minus 5 degrees Celsius ambient with 5 kilowatts for
            15 minutes at 0.15 dollars per kilowatt-hour uses 1.25 kilowatt-hours
            and costs 0.19 dollars for battery heating.
          </desc>

          <defs>
            <pattern
              id="epre-viz-grid"
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
              id="epre-viz-arrow"
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
              id="epre-viz-pulse"
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
              id="epre-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="epre-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#epre-viz-grid)"
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
              OUTSIDE TEMP
            </text>
            <text
              className="epre-viz-temp-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −5 °C
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
              BMS THERMAL POWER
            </text>
            <text
              className="epre-viz-kw-value"
              x="52"
              y="194"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 kW
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
              DURATION
            </text>
            <text
              className="epre-viz-min-value"
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
              ELECTRICITY RATE
            </text>
            <text
              className="epre-viz-rate-value"
              x="52"
              y="374"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.15/kWh
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 80 L 300 80 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#epre-viz-arrow)"
            />
            <path
              className="epre-viz-timeline-pulse"
              d="M 236 80 L 300 80 L 300 140"
              fill="none"
              stroke="url(#epre-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 174 L 280 174 L 280 180 L 300 180"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="epre-viz-heat-pulse"
              d="M 236 174 L 280 174 L 280 180 L 300 180"
              fill="none"
              stroke="url(#epre-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.25s" }}
            />
            <path
              d="M 236 264 L 280 264 L 280 220 L 300 220"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="epre-viz-heat-pulse"
              d="M 236 264 L 280 264 L 280 220 L 300 220"
              fill="none"
              stroke="url(#epre-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.5s" }}
            />
          </g>

          {/* —— CENTER: THERMAL PATH —— */}
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
              THERMAL ENERGY PATH
            </text>

            {/* Ambient → pack band */}
            <g className="epre-viz-ambient-node">
              <rect
                x="320"
                y="92"
                width="88"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="364"
                y="114"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                AMBIENT
              </text>
              <text
                className="epre-viz-amb-chip"
                x="364"
                y="134"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −5 °C
              </text>
            </g>

            <path
              d="M 408 120 L 448 120"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#epre-viz-arrow)"
            />
            <path
              className="epre-viz-heat-pulse"
              d="M 408 120 L 448 120"
              fill="none"
              stroke="url(#epre-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g className="epre-viz-pack-node">
              <rect
                x="448"
                y="88"
                width="172"
                height="64"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Heat fill rising in pack */}
              <rect
                className="epre-viz-pack-fill"
                x="456"
                y="112"
                width="156"
                height="32"
                rx="2"
                fill="url(#epre-viz-heat)"
                opacity="0.7"
              />
              <text
                x="534"
                y="108"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                PACK · TARGET 15–35 °C
              </text>
              <text
                className="epre-viz-mode-chip"
                x="534"
                y="138"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                HEATING · 5 kW
              </text>
            </g>

            {/* Delta note */}
            <text
              x="320"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ΔT TO FAST-CHARGE WINDOW
            </text>
            <rect
              x="320"
              y="188"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="epre-viz-delta-bar"
              x="320"
              y="188"
              width="200"
              height="10"
              rx="2"
              fill="url(#epre-viz-bar)"
            />
            <text
              className="epre-viz-delta-chip"
              x="480"
              y="218"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −5 °C → ≥15 °C · +20 °C lift
            </text>

            {/* Energy formula bar */}
            <text
              x="320"
              y="250"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ENERGY · 5 kW × 0.25 h
            </text>
            <rect
              x="320"
              y="260"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="epre-viz-energy-bar"
              x="320"
              y="260"
              width="250"
              height="14"
              rx="2"
              fill="url(#epre-viz-bar)"
            />
            <text
              className="epre-viz-energy-chip"
              x="480"
              y="296"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.25 kWh
            </text>

            <rect
              x="320"
              y="316"
              width="140"
              height="40"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="epre-viz-time-chip"
              x="390"
              y="341"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 min run
            </text>
            <rect
              x="480"
              y="316"
              width="140"
              height="40"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="epre-viz-mode-out"
              x="550"
              y="341"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Battery heating
            </text>

            <text
              x="320"
              y="388"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              plug in · heat from grid · save driving range
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#epre-viz-arrow)"
            />
            <path
              className="epre-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#epre-viz-pulse)"
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
              PRE-CONDITIONING COST
            </text>
            <text
              className="epre-viz-output-value"
              x="696"
              y="122"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.19
            </text>
            <text
              x="696"
              y="148"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              cheap for a faster DCFC
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
              ENERGY CONSUMED
            </text>
            <text
              className="epre-viz-kwh-out"
              x="696"
              y="238"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.25 kWh
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
              THERMAL MODE
            </text>
            <text
              className="epre-viz-mode-label"
              x="696"
              y="326"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Battery heating
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
              className="epre-viz-band-value"
              x="802"
              y="390"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              &lt;10 °C → heat · &gt;30 °C cool
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
              className="epre-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              5 kW × (15 ÷ 60) h = 1.25 kWh × $0.15 → $0.19
            </text>
          </g>

          <path
            className="epre-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#epre-viz-pulse)"
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
            condition on wall power · not from pack range
          </text>
          <text
            className="epre-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            ~15–45 min typical
          </text>
        </svg>
      </div>
    </section>
  );
}
