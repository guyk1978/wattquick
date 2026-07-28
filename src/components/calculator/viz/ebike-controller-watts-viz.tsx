"use client";

import { cn } from "@/lib/utils";

interface EbikeControllerWattsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Controller Amps to Watts [VIZ].
 * P_in = V × I; P_shaft = P_in × η.
 * Sample: 48 V · 22 A · 80% η → 1,056 W input · ~845 W shaft.
 */
export function EbikeControllerWattsViz({
  className,
}: EbikeControllerWattsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-controller-watts", className)}
      aria-label="E-bike controller amps to watts visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">V × I · Shaft Power</h3>
        <p className="tool-viz__subtitle">
          Battery voltage times controller amps sets electrical input — motor
          efficiency then trims that to mechanical watts at the shaft.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-controller-watts-viz"
          role="img"
          aria-labelledby="ecw-viz-title ecw-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ecw-viz-title">
            E-bike controller amps to watts conversion diagram
          </title>
          <desc id="ecw-viz-desc">
            Battery voltage multiplied by controller current yields electrical
            input power; motor efficiency converts that to shaft power. Sample:
            48 volts at 22 amps with 80 percent efficiency is 1,056 watts input
            and about 845 watts at the motor shaft.
          </desc>

          <defs>
            <pattern
              id="ecw-viz-grid"
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
              id="ecw-viz-arrow"
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
              id="ecw-viz-pulse"
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
              id="ecw-viz-bar"
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
            fill="url(#ecw-viz-grid)"
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
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY VOLTAGE
            </text>
            <text
              className="ecw-viz-v-value"
              x="52"
              y="106"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>

            <rect
              x="36"
              y="152"
              width="200"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="178"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONTROLLER CURRENT
            </text>
            <text
              className="ecw-viz-a-value"
              x="52"
              y="222"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              22 A
            </text>

            <rect
              x="36"
              y="268"
              width="200"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="294"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MOTOR EFFICIENCY
            </text>
            <text
              className="ecw-viz-eta-value"
              x="52"
              y="338"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80%
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 86 L 300 86 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ecw-viz-arrow)"
            />
            <path
              className="ecw-viz-timeline-pulse"
              d="M 236 86 L 300 86 L 300 140"
              fill="none"
              stroke="url(#ecw-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 202 L 280 202 L 280 180 L 300 180"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="ecw-viz-power-pulse"
              d="M 236 202 L 280 202 L 280 180 L 300 180"
              fill="none"
              stroke="url(#ecw-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.25s" }}
            />
            <path
              d="M 236 318 L 288 318 L 288 260 L 300 260"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ecw-viz-arrow)"
            />
            <path
              className="ecw-viz-power-pulse"
              d="M 236 318 L 288 318 L 288 260 L 300 260"
              fill="none"
              stroke="url(#ecw-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.5s" }}
            />
          </g>

          {/* —— CENTER: CONVERSION PATH —— */}
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
              ELECTRICAL → MECHANICAL PATH
            </text>

            {/* Pack → controller → motor */}
            <g className="ecw-viz-pack-node">
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
                PACK
              </text>
              <text
                className="ecw-viz-pack-chip"
                x="364"
                y="134"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                48 V
              </text>
            </g>

            <path
              d="M 408 120 L 440 120"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ecw-viz-arrow)"
            />
            <path
              className="ecw-viz-power-pulse"
              d="M 408 120 L 440 120"
              fill="none"
              stroke="url(#ecw-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g className="ecw-viz-ctrl-node">
              <rect
                x="440"
                y="92"
                width="88"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="484"
                y="114"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                CTRL
              </text>
              <text
                className="ecw-viz-ctrl-chip"
                x="484"
                y="134"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                22 A
              </text>
            </g>

            <path
              d="M 528 120 L 560 120"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ecw-viz-arrow)"
            />
            <path
              className="ecw-viz-power-pulse"
              d="M 528 120 L 560 120"
              fill="none"
              stroke="url(#ecw-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <g className="ecw-viz-motor-node">
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
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 590 106 L 590 134 M 576 120 L 604 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            </g>

            {/* P = V × I */}
            <text
              x="320"
              y="180"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              P = V × I · ELECTRICAL INPUT
            </text>
            <rect
              x="320"
              y="190"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ecw-viz-in-bar"
              x="320"
              y="190"
              width="300"
              height="14"
              rx="2"
              fill="url(#ecw-viz-bar)"
            />
            <text
              className="ecw-viz-in-chip"
              x="480"
              y="226"
              textAnchor="middle"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 × 22 = 1,056 W
            </text>

            {/* Efficiency loss */}
            <text
              x="320"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              × η 80% · MOTOR + DRIVETRAIN
            </text>
            <rect
              x="320"
              y="268"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ecw-viz-eta-bar"
              x="320"
              y="268"
              width="240"
              height="10"
              rx="2"
              fill="url(#ecw-viz-bar)"
            />
            <text
              className="ecw-viz-loss-chip"
              x="480"
              y="300"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −211 W heat / copper / iron
            </text>

            {/* Shaft */}
            <rect
              x="320"
              y="320"
              width="140"
              height="44"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="ecw-viz-shaft-chip"
              x="390"
              y="347"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              845 W shaft
            </text>
            <rect
              x="480"
              y="320"
              width="140"
              height="44"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="ecw-viz-ratio-chip"
              x="550"
              y="347"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80% of input
            </text>

            <text
              x="320"
              y="388"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              peak controller limit · continuous may be lower
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ecw-viz-arrow)"
            />
            <path
              className="ecw-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#ecw-viz-pulse)"
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
              ELECTRICAL INPUT
            </text>
            <text
              className="ecw-viz-output-value"
              x="696"
              y="122"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,056
            </text>
            <text
              x="696"
              y="148"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              W · V × A
            </text>

            <rect
              x="680"
              y="184"
              width="244"
              height="100"
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
              SHAFT POWER
            </text>
            <text
              className="ecw-viz-shaft-out"
              x="696"
              y="250"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              845 W
            </text>
            <text
              x="696"
              y="270"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              at the motor / wheel
            </text>

            <rect
              x="680"
              y="300"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="326"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EFFICIENCY APPLIED
            </text>
            <text
              className="ecw-viz-eta-out"
              x="696"
              y="354"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              η = 0.80
            </text>

            <rect
              x="680"
              y="388"
              width="244"
              height="20"
              rx="2"
              fill="transparent"
            />
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
              className="ecw-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              48 V × 22 A = 1,056 W_in · × 0.80 → 845 W_shaft
            </text>
          </g>

          <path
            className="ecw-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#ecw-viz-pulse)"
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
            use OEM η when known · hub motors often 75–85%
          </text>
          <text
            className="ecw-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            ~1.05 kW class
          </text>
        </svg>
      </div>
    </section>
  );
}
