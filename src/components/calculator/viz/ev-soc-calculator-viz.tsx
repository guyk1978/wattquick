"use client";

import { cn } from "@/lib/utils";

interface EvSocCalculatorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Battery SoC Calculator [VIZ].
 * SoC% = (V_rest − V_empty) / (V_full − V_empty) × 100, clamped 0–100.
 * Sample: 360 V · 300–400 V span → 60.0% · 60 V above empty · in range.
 */
export function EvSocCalculatorViz({ className }: EvSocCalculatorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-soc-calculator", className)}
      aria-label="EV battery state of charge visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Resting V · Linear SoC Map</h3>
        <p className="tool-viz__subtitle">
          Idle pack voltage interpolates between empty and full endpoints —
          a planning SoC from the OCV span before chemistry-specific curves.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-soc-calculator-viz"
          role="img"
          aria-labelledby="esoc-viz-title esoc-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esoc-viz-title">
            EV pack voltage to state of charge interpolation diagram
          </title>
          <desc id="esoc-viz-desc">
            Resting pack voltage maps linearly between empty and full voltage
            endpoints to estimate state of charge. Sample: a 360 volt resting
            reading on a 300 to 400 volt pack equals 60 percent SoC, 60 volts
            above empty across a 100 volt span.
          </desc>

          <defs>
            <pattern
              id="esoc-viz-grid"
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
              id="esoc-viz-arrow"
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
              id="esoc-viz-pulse"
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
              id="esoc-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="esoc-viz-gauge"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#esoc-viz-grid)"
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
              PACK VOLTAGE
            </text>
            <text
              className="esoc-viz-v-value"
              x="52"
              y="106"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              360 V
            </text>
            <text
              x="52"
              y="124"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              resting · idle
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
              EMPTY (~0% SoC)
            </text>
            <text
              className="esoc-viz-empty-value"
              x="52"
              y="220"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              300 V
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
              FULL (~100% SoC)
            </text>
            <text
              className="esoc-viz-full-value"
              x="52"
              y="336"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              400 V
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 86 L 300 86 L 300 160"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#esoc-viz-arrow)"
            />
            <path
              className="esoc-viz-timeline-pulse"
              d="M 236 86 L 300 86 L 300 160"
              fill="none"
              stroke="url(#esoc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 202 L 280 202 L 280 280 L 300 280"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="esoc-viz-map-pulse"
              d="M 236 202 L 280 202 L 280 280 L 300 280"
              fill="none"
              stroke="url(#esoc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.3s" }}
            />
            <path
              d="M 236 318 L 280 318 L 280 200 L 300 200"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="esoc-viz-map-pulse"
              d="M 236 318 L 280 318 L 280 200 L 300 200"
              fill="none"
              stroke="url(#esoc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.55s" }}
            />
          </g>

          {/* —— CENTER: INTERPOLATION —— */}
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
              VOLTAGE INTERPOLATION PATH
            </text>

            {/* Vertical OCV gauge: empty at bottom y=360, full at top y=120 */}
            {/* 300V→360, 400V→120, 360V→ mid: (360-300)/100 = 0.6 → y = 360 - 0.6*240 = 216 */}
            <rect
              x="340"
              y="100"
              width="36"
              height="260"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="esoc-viz-soc-fill"
              x="342"
              y="216"
              width="32"
              height="142"
              rx="2"
              fill="url(#esoc-viz-gauge)"
            />

            {/* Endpoint ticks */}
            <path
              d="M 336 100 L 384 100"
              fill="none"
              stroke="#555555"
              strokeWidth="1.5"
            />
            <text
              x="392"
              y="104"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              400 V · 100%
            </text>
            <path
              d="M 336 360 L 384 360"
              fill="none"
              stroke="#555555"
              strokeWidth="1.5"
            />
            <text
              x="392"
              y="364"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              300 V · 0%
            </text>

            {/* Resting marker */}
            <g className="esoc-viz-rest-node">
              <path
                d="M 330 216 L 386 216"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                className="esoc-viz-rest-dot"
                cx="358"
                cy="216"
                r="7"
                fill="currentColor"
              />
              <rect
                x="400"
                y="200"
                width="100"
                height="32"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1"
              />
              <text
                className="esoc-viz-rest-chip"
                x="450"
                y="220"
                textAnchor="middle"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                360 V rest
              </text>
            </g>

            {/* Linear map curve (simplified OCV line) */}
            <path
              className="esoc-viz-curve"
              d="M 520 360 L 600 100"
              fill="none"
              stroke="#555555"
              strokeWidth="1.5"
            />
            <path
              className="esoc-viz-curve-pulse"
              d="M 520 360 L 600 100"
              fill="none"
              stroke="url(#esoc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="560"
              y="90"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              linear OCV map
            </text>
            <circle
              className="esoc-viz-rest-dot"
              cx="568"
              cy="216"
              r="5"
              fill="currentColor"
            />

            {/* Math chips */}
            <rect
              x="400"
              y="260"
              width="220"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="esoc-viz-delta-chip"
              x="510"
              y="283"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ΔV 60 · span 100 V
            </text>

            <rect
              x="400"
              y="308"
              width="220"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="esoc-viz-formula-chip"
              x="510"
              y="331"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              (360−300) ÷ 100 = 60%
            </text>

            <text
              x="400"
              y="372"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              measure at rest · not under load
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#esoc-viz-arrow)"
            />
            <path
              className="esoc-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#esoc-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="130"
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
              ESTIMATED SoC
            </text>
            <text
              className="esoc-viz-output-value"
              x="696"
              y="130"
              fill="#ededed"
              fontSize="42"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              60.0%
            </text>
            <text
              x="696"
              y="156"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              in range · not clamped
            </text>

            <rect
              x="680"
              y="194"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="220"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ABOVE EMPTY
            </text>
            <text
              className="esoc-viz-delta-out"
              x="696"
              y="248"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              +60.0 V
            </text>

            <rect
              x="680"
              y="282"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PACK SPAN
            </text>
            <text
              className="esoc-viz-span-out"
              x="696"
              y="336"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100.0 V
            </text>

            <rect
              x="680"
              y="370"
              width="244"
              height="38"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="esoc-viz-band-out"
              x="802"
              y="394"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              300 V ← → 400 V
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
              className="esoc-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              SoC% = clamp((360 − 300) / (400 − 300) × 100) → 60.0%
            </text>
          </g>

          <path
            className="esoc-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#esoc-viz-pulse)"
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
            BMS blends coulomb count · voltage alone under load misleads
          </text>
          <text
            className="esoc-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            linear OCV baseline
          </text>
        </svg>
      </div>
    </section>
  );
}
