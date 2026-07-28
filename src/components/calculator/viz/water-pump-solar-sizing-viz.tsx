"use client";

import { cn } from "@/lib/utils";

interface WaterPumpSolarSizingVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Water Pump Solar Sizing [VIZ].
 * Daily Wh = W × h × (1 + 0.6%/m × head); kWp = kWh ÷ (PSH × 0.8).
 * Sample: 750 W · 5 hrs · 25 m · 5 PSH → 1.08 kWp · 3 × 400 W · MPPT.
 */
export function WaterPumpSolarSizingViz({
  className,
}: WaterPumpSolarSizingVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--water-pump-solar-sizing", className)}
      aria-label="Water pump solar sizing visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Pump Load · Array kWp</h3>
        <p className="tool-viz__subtitle">
          Running watts and daily hours accumulate watt-hours; head lift and
          system losses size the PV array that keeps tanks full.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg water-pump-solar-sizing-viz"
          role="img"
          aria-labelledby="wps-viz-title wps-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="wps-viz-title">
            Water pump solar sizing animated energy path diagram
          </title>
          <desc id="wps-viz-desc">
            Pump watts times daily run hours times a head multiplier yield daily
            watt-hours, divided by peak sun hours and 80 percent system
            efficiency to size the solar array. Sample: 750 watt pump running 5
            hours at 25 meters head with 5 peak sun hours needs 1.08 kilowatts
            peak, or three 400 watt panels, with MPPT strongly recommended.
          </desc>

          <defs>
            <pattern
              id="wps-viz-grid"
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
              id="wps-viz-arrow"
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
              id="wps-viz-pulse"
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
              id="wps-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#wps-viz-grid)"
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
              PUMP POWER
            </text>
            <text
              className="wps-viz-w-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              750 W
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
              DAILY RUN TIME
            </text>
            <text
              className="wps-viz-hrs-value"
              x="52"
              y="194"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 hrs/day
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
              TOTAL DYNAMIC HEAD
            </text>
            <text
              className="wps-viz-head-value"
              x="52"
              y="284"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25 m
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
              PEAK SUN HOURS
            </text>
            <text
              className="wps-viz-psh-value"
              x="52"
              y="374"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 PSH
            </text>
          </g>

          {/* —— FLOW INTO CENTER —— */}
          <g>
            <path
              d="M 236 80 L 300 80 L 300 160"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#wps-viz-arrow)"
            />
            <path
              className="wps-viz-timeline-pulse"
              d="M 236 80 L 300 80 L 300 160"
              fill="none"
              stroke="url(#wps-viz-pulse)"
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
              className="wps-viz-flow-pulse"
              d="M 236 174 L 280 174 L 280 180 L 300 180"
              fill="none"
              stroke="url(#wps-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.25s" }}
            />
            <path
              d="M 236 264 L 280 264 L 280 200 L 300 200"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="wps-viz-flow-pulse"
              d="M 236 264 L 280 264 L 280 200 L 300 200"
              fill="none"
              stroke="url(#wps-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M 236 354 L 288 354 L 288 300 L 420 300"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#wps-viz-arrow)"
            />
            <path
              className="wps-viz-flow-pulse"
              d="M 236 354 L 288 354 L 288 300 L 420 300"
              fill="none"
              stroke="url(#wps-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.75s" }}
            />
          </g>

          {/* —— CENTER: ENERGY SIZING PATH —— */}
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
              y="74"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY SIZING PATH
            </text>

            {/* Pump icon-ish line art */}
            <g className="wps-viz-pump-node">
              <rect
                x="320"
                y="92"
                width="100"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <circle
                cx="348"
                cy="120"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 348 108 L 348 132 M 336 120 L 360 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="388"
                y="116"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                PUMP
              </text>
              <text
                className="wps-viz-pump-chip"
                x="388"
                y="134"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                750 W
              </text>
            </g>

            <g className="wps-viz-head-node">
              <rect
                x="440"
                y="92"
                width="100"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <path
                d="M 458 136 L 458 108 L 470 108 L 470 100 L 490 120 L 470 140 L 470 132 L 458 132 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <text
                x="508"
                y="116"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                HEAD
              </text>
              <text
                className="wps-viz-head-chip"
                x="508"
                y="134"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ×1.15
              </text>
            </g>

            <g className="wps-viz-sun-node">
              <rect
                x="560"
                y="92"
                width="60"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="590"
                cy="120"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 590 106 L 590 110 M 590 130 L 590 134 M 576 120 L 580 120 M 600 120 L 604 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </g>

            <text
              x="320"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DAILY ENERGY · 750 × 5 × 1.15
            </text>
            <rect
              x="320"
              y="188"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="wps-viz-wh-bar"
              x="320"
              y="188"
              width="260"
              height="14"
              rx="2"
              fill="url(#wps-viz-bar)"
            />
            <text
              className="wps-viz-wh-chip"
              x="480"
              y="224"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4,313 Wh/day
            </text>
            <text
              x="480"
              y="244"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              4.31 kWh · head +15%
            </text>

            <text
              x="320"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ÷ PEAK SUN × η 80%
            </text>
            <rect
              x="320"
              y="288"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="wps-viz-eff-bar"
              x="320"
              y="288"
              width="240"
              height="10"
              rx="2"
              fill="url(#wps-viz-bar)"
            />
            <text
              className="wps-viz-div-chip"
              x="480"
              y="322"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4.31 ÷ (5 × 0.8) = 1.08
            </text>

            <rect
              x="320"
              y="344"
              width="140"
              height="44"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="wps-viz-kwp-chip"
              x="390"
              y="372"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.08 kWp
            </text>

            <rect
              x="480"
              y="344"
              width="140"
              height="44"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="wps-viz-panel-chip"
              x="550"
              y="372"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 × 400 W
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#wps-viz-arrow)"
            />
            <path
              className="wps-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#wps-viz-pulse)"
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
              REQUIRED SOLAR ARRAY
            </text>
            <text
              className="wps-viz-output-value"
              x="696"
              y="122"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.08
            </text>
            <text
              x="780"
              y="122"
              fill="#888888"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
            >
              kWp
            </text>
            <text
              x="696"
              y="148"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 1,080 W STC
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
              DAILY ENERGY DEMAND
            </text>
            <text
              className="wps-viz-kwh-out"
              x="696"
              y="238"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4.31 kWh/day
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
              PANEL COUNT
            </text>
            <text
              className="wps-viz-panels-out"
              x="696"
              y="326"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 × 400 W modules
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
              className="wps-viz-mppt-value"
              x="802"
              y="390"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              MPPT strongly recommended
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
              className="wps-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              (750 × 5 × 1.15) Wh ÷ 1000 ÷ (5 × 0.8) → 1.08 kWp
            </text>
          </g>

          <path
            className="wps-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#wps-viz-pulse)"
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
            head adds ~0.6%/m · chain η ≈ 80% (wiring · MPPT · dust)
          </text>
          <text
            className="wps-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            +15% head lift
          </text>
        </svg>
      </div>
    </section>
  );
}
