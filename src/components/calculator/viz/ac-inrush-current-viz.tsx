"use client";

import { cn } from "@/lib/utils";

interface AcInrushCurrentVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for AC Inrush Current Limit [VIZ].
 * I_run = P ÷ V; I_peak = I_run × inrush factor.
 * Sample: 1,800 W · 120 V · 6× → 15 A run · 90 A peak.
 */
export function AcInrushCurrentViz({ className }: AcInrushCurrentVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ac-inrush-current", className)}
      aria-label="AC inrush current visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">AC Inrush Current</h3>
        <p className="tool-viz__subtitle">
          Steady-state amps spike by the inrush factor at startup — size the
          breaker curve for the peak, not just the running load.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ac-inrush-current-viz"
          role="img"
          aria-labelledby="aic-viz-title aic-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="aic-viz-title">
            AC inrush current animated conversion diagram
          </title>
          <desc id="aic-viz-desc">
            Nominal power divided by voltage yields running current, then
            multiplied by the inrush factor yields peak startup amperage.
            Sample: 1,800 watts at 120 volts with a 6 times factor equals 15
            amperes running and 90 amperes peak.
          </desc>

          <defs>
            <pattern
              id="aic-viz-grid"
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
              id="aic-viz-arrow"
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
              id="aic-viz-pulse"
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
              id="aic-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="aic-viz-wave-fill"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#aic-viz-grid)"
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
            I_RUN × FACTOR
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

          {/* —— INPUT: Power —— */}
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
              NOMINAL POWER
            </text>
            <text
              className="aic-viz-w-value"
              x="56"
              y="138"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,800 W
            </text>
            <text
              x="56"
              y="158"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              running / nameplate
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
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
              OPERATING VOLTAGE
            </text>
            <text
              className="aic-viz-v-value"
              x="56"
              y="254"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              120 V
            </text>
            <text
              x="56"
              y="274"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              line voltage
            </text>
          </g>

          {/* —— INPUT: Inrush factor —— */}
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
              INRUSH FACTOR
            </text>
            <text
              className="aic-viz-factor-value"
              x="56"
              y="366"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6×
            </text>
            <text
              x="140"
              y="366"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              motors 5–7×
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 122 L 320 122"
            fill="none"
            stroke="url(#aic-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#aic-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 238 L 320 238"
            fill="none"
            stroke="url(#aic-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#aic-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 348 L 320 348"
            fill="none"
            stroke="url(#aic-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#aic-viz-arrow)"
          />

          {/* —— CENTER: Surge waveform —— */}
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
              STARTUP SURGE
            </text>

            {/* Waveform plot frame */}
            <rect
              x="340"
              y="112"
              width="300"
              height="160"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            {/* Steady-state baseline */}
            <line
              x1="348"
              y1="230"
              x2="632"
              y2="230"
              stroke="#333333"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="348"
              y="246"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              I_RUN 15 A
            </text>
            {/* Peak guide */}
            <line
              x1="348"
              y1="140"
              x2="632"
              y2="140"
              stroke="#333333"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <text
              x="560"
              y="134"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              I_PEAK
            </text>

            {/* Surge waveform fill + stroke */}
            <path
              className="aic-viz-wave-fill"
              d="M 348 230 L 380 230 L 400 140 L 420 155 L 440 230 L 632 230 L 632 260 L 348 260 Z"
              fill="url(#aic-viz-wave-fill)"
            />
            <path
              className="aic-viz-wave-stroke"
              d="M 348 230 L 380 230 L 400 140 L 420 155 L 440 230 L 632 230"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Traveling pulse along surge */}
            <circle
              className="aic-viz-surge-dot"
              cx="400"
              cy="140"
              r="5"
              fill="currentColor"
            />

            {/* Intermediate chips */}
            <g transform="translate(340, 288)">
              <rect
                x="0"
                y="0"
                width="130"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="12"
                y="18"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                I_RUN = P ÷ V
              </text>
              <text
                className="aic-viz-run-chip"
                x="12"
                y="36"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                15 A
              </text>
            </g>
            <text
              x="485"
              y="316"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ×
            </text>
            <g transform="translate(510, 288)">
              <rect
                x="0"
                y="0"
                width="130"
                height="44"
                rx="3"
                fill="#0a0a0a"
                stroke="#333333"
              />
              <text
                x="12"
                y="18"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                × FACTOR
              </text>
              <text
                className="aic-viz-factor-chip"
                x="12"
                y="36"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                6×
              </text>
            </g>

            <text
              className="aic-viz-math-value"
              x="340"
              y="368"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 A × 6 = 90 A
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#aic-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#aic-viz-arrow)"
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
              PEAK INRUSH
            </text>
            <text
              className="aic-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              90
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              A
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
              className="aic-viz-output-bar"
              x="722"
              y="204"
              width="150"
              height="8"
              rx="1"
              fill="url(#aic-viz-bar)"
            />

            <text
              x="720"
              y="248"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DETAIL
            </text>
            <text
              className="aic-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 A run · 6×
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Type C breaker class
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~50–200 ms spike
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
              I_peak = (P ÷ V) × factor
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
              1,800 W · 120 V · 6× → 90 A
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
