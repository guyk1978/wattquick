"use client";

import { cn } from "@/lib/utils";

interface InverterSizingVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Inverter Sizing [VIZ] tab.
 * Peak load W × (1 + margin%) → minimum inverter watts.
 * Sample: 1800 W × 1.25 = 2250 W.
 */
export function InverterSizingViz({ className }: InverterSizingVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--inverter-sizing", className)}
      aria-label="Inverter sizing visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Inverter Sizing</h3>
        <p className="tool-viz__subtitle">
          Peak AC demand scales by a safety margin so continuous and surge
          ratings clear motors, compressors, and future loads.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg inverter-sizing-viz"
          role="img"
          aria-labelledby="inv-viz-title inv-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="inv-viz-title">Inverter sizing animated flow diagram</title>
          <desc id="inv-viz-desc">
            Peak load in watts multiplies by one plus the safety margin
            percentage to yield the minimum inverter size. Sample: 1800 watts
            with a 25 percent margin requires 2250 watts.
          </desc>

          <defs>
            <pattern
              id="inv-viz-grid"
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
              id="inv-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient id="inv-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="inv-viz-expand"
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
            fill="url(#inv-viz-grid)"
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
            x="380"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            SCALE UP
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

          {/* —— INPUT: Peak load —— */}
          <g>
            <rect
              x="40"
              y="88"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="116"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK LOAD
            </text>
            <g transform="translate(56, 136)" fill="none" stroke="#ededed">
              <rect x="0" y="8" width="36" height="44" rx="2" strokeWidth="1.3" />
              <path
                d="M22 14 L14 34 H20 L16 52 L30 28 H22 Z"
                strokeWidth="1.3"
                strokeLinejoin="round"
                className="inv-viz-load-bolt"
                fill="currentColor"
                fillOpacity="0.35"
              />
            </g>
            <text
              x="112"
              y="168"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1800 W
            </text>
            <text
              x="112"
              y="192"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              simultaneous AC demand
            </text>
            <text
              x="112"
              y="212"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              sum worst-case loads
            </text>
          </g>

          {/* —— INPUT: Safety margin —— */}
          <g>
            <rect
              x="40"
              y="268"
              width="240"
              height="148"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAFETY MARGIN
            </text>
            <g
              transform="translate(56, 318)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <path d="M4 40 L18 8 L32 40 Z" />
              <line
                x1="18"
                y1="22"
                x2="18"
                y2="30"
                stroke="currentColor"
                className="inv-viz-margin-pulse"
              />
              <circle
                cx="18"
                cy="36"
                r="1.5"
                fill="currentColor"
                stroke="none"
                className="inv-viz-margin-pulse"
              />
            </g>
            <text
              x="112"
              y="348"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25%
            </text>
            <text
              x="112"
              y="374"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              surge + expansion headroom
            </text>
            <text
              x="112"
              y="396"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              raise for motors / pumps
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#inv-viz-arrow)"
          >
            <path d="M 280 162 H 340 V 200 H 360" />
            <path d="M 280 342 H 340 V 300 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#inv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 162 H 340 V 200 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 342 H 340 V 300 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="360"
              y="88"
              width="260"
              height="328"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="118"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PEAK × (1 + MARGIN)
            </text>

            <rect
              x="376"
              y="138"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="160"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              FACTOR
            </text>
            <text
              x="388"
              y="186"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              1 + 25/100 = <tspan fill="#ededed">1.25×</tspan>
            </text>

            <rect
              x="376"
              y="218"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="240"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SCALE
            </text>
            <text
              x="388"
              y="266"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              1800 W × 1.25
            </text>

            {/* Expand bars: base → with margin */}
            <text
              x="376"
              y="312"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CAPACITY EXPANSION
            </text>
            <text
              x="376"
              y="334"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              PEAK
            </text>
            <rect
              x="420"
              y="324"
              width="184"
              height="12"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="inv-viz-peak-bar"
              x="422"
              y="326"
              width="140"
              height="8"
              rx="1"
              fill="currentColor"
              fillOpacity="0.55"
            />
            <text
              x="376"
              y="360"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              +MARGIN
            </text>
            <rect
              x="420"
              y="350"
              width="184"
              height="12"
              rx="1"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="inv-viz-margin-bar"
              x="422"
              y="352"
              width="176"
              height="8"
              rx="1"
              fill="url(#inv-viz-expand)"
            />

            <text
              x="490"
              y="396"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              W_inv = W_peak × (1 + m/100)
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#inv-viz-arrow)"
          >
            <path d="M 620 252 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#inv-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 252 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="240"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MIN. INVERTER SIZE
            </text>

            {/* Inverter brick glyph */}
            <g transform="translate(762, 192)" fill="none" stroke="#ededed">
              <rect x="0" y="8" width="96" height="48" rx="3" strokeWidth="1.4" />
              <text
                x="48"
                y="28"
                fill="#888888"
                stroke="none"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                INVERTER
              </text>
              <text
                x="48"
                y="44"
                fill="#ededed"
                stroke="none"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="inv-viz-output-value"
              >
                2250 W
              </text>
              <path d="M -16 32 H 0" stroke="#333333" strokeWidth="1.5" />
              <path
                className="tool-viz-flow__pulse"
                d="M -16 32 H 0"
                stroke="url(#inv-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
              <path d="M 96 32 H 112" stroke="#333333" strokeWidth="1.5" />
              <path
                className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
                d="M 96 32 H 112"
                stroke="url(#inv-viz-pulse)"
                strokeWidth="2"
                pathLength="100"
              />
            </g>

            <text
              x="810"
              y="280"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="inv-viz-output-value"
            >
              2250 W
            </text>
            <text
              x="810"
              y="308"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              1800 W + 25% margin
            </text>
            <text
              x="810"
              y="340"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              match continuous rating ≥ this
            </text>
            <text
              x="810"
              y="358"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              check surge for motor starts
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Inverter W = peak load × (1 + margin ÷ 100) · motors may need 2–3×
            surge headroom
          </text>
        </svg>
      </div>
    </section>
  );
}
