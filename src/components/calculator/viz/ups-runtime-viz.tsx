"use client";

import { cn } from "@/lib/utils";

interface UpsRuntimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for UPS Runtime [VIZ] tab.
 * Battery Wh + load W → discharge ÷ → estimated backup time.
 */
export function UpsRuntimeViz({ className }: UpsRuntimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ups-runtime", className)}
      aria-label="UPS runtime visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">UPS Runtime</h3>
        <p className="tool-viz__subtitle">
          Stored battery energy discharges through the connected load to
          estimate how long backup power lasts.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ups-runtime-viz"
          role="img"
          aria-labelledby="ups-viz-title ups-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ups-viz-title">UPS runtime animated flow diagram</title>
          <desc id="ups-viz-desc">
            Battery energy in watt-hours and connected load power in watts flow
            into a discharge calculation that divides Wh by W, then outputs
            estimated backup runtime in hours and minutes.
          </desc>

          <defs>
            <pattern
              id="ups-viz-grid"
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
              id="ups-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="ups-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="ups-viz-drain"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
            <clipPath id="ups-viz-gauge-clip">
              <rect x="396" y="268" width="208" height="16" rx="2" />
            </clipPath>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ups-viz-grid)"
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

          {/* Column labels */}
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
            x="400"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DISCHARGE
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

          {/* —— INPUT: Battery energy —— */}
          <g className="ups-viz-node">
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
              BATTERY ENERGY
            </text>

            {/* Battery glyph */}
            <g transform="translate(56, 136)" stroke="#ededed" fill="none">
              <rect x="0" y="10" width="36" height="56" rx="3" strokeWidth="1.4" />
              <rect
                x="10"
                y="4"
                width="16"
                height="7"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="ups-viz-battery-fill"
                x="5"
                y="28"
                width="26"
                height="33"
                rx="1.5"
                fill="#a3e635"
                fillOpacity="0.88"
                stroke="none"
              />
            </g>

            <text
              x="112"
              y="168"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 Wh
            </text>
            <text
              x="112"
              y="192"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              stored capacity
            </text>
            <text
              x="112"
              y="212"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              e.g. 12 V × 42 Ah ≈ 504 Wh
            </text>
          </g>

          {/* —— INPUT: Load power —— */}
          <g className="ups-viz-node">
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
              CONNECTED LOAD
            </text>

            {/* Load / bolt glyph */}
            <g transform="translate(56, 318)" fill="none" stroke="#ededed">
              <rect x="0" y="8" width="36" height="44" rx="2" strokeWidth="1.3" />
              <path
                d="M22 14 L14 34 H20 L16 52 L30 28 H22 Z"
                strokeWidth="1.3"
                strokeLinejoin="round"
                className="ups-viz-load-bolt"
                fill="#a3e635"
                fillOpacity="0.35"
              />
            </g>

            <text
              x="112"
              y="348"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              150 W
            </text>
            <text
              x="112"
              y="372"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              constant draw
            </text>
            <text
              x="112"
              y="392"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              PC · modem · lights…
            </text>
          </g>

          {/* Flow paths: inputs → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path d="M 280 162 H 340 V 210 H 380" />
            <path d="M 280 342 H 340 V 280 H 380" />
          </g>
          <g
            fill="none"
            stroke="url(#ups-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 162 H 340 V 210 H 380"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 342 H 340 V 280 H 380"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS: discharge —— */}
          <g className="ups-viz-node ups-viz-node--process">
            <rect
              x="380"
              y="120"
              width="240"
              height="280"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="396"
              y="148"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY ÷ LOAD
            </text>

            <text
              x="500"
              y="190"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              500 Wh ÷ 150 W
            </text>
            <text
              x="500"
              y="218"
              textAnchor="middle"
              fill="#a3e635"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              = 3.33 h
            </text>

            <line
              x1="400"
              y1="238"
              x2="600"
              y2="238"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="396"
              y="262"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DISCHARGE OVER TIME
            </text>

            {/* Drain gauge track */}
            <rect
              x="396"
              y="268"
              width="208"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ups-viz-drain-bar"
              x="396"
              y="268"
              width="208"
              height="16"
              rx="2"
              fill="url(#ups-viz-drain)"
              clipPath="url(#ups-viz-gauge-clip)"
            />
            <text
              x="396"
              y="304"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              full
            </text>
            <text
              x="604"
              y="304"
              textAnchor="end"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              empty
            </text>

            <text
              x="396"
              y="336"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Ideal (no losses)
            </text>
            <text
              x="604"
              y="336"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              3 h 20 m
            </text>

            <text
              x="396"
              y="360"
              fill="#f59e0b"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              −15% inverter loss
            </text>
            <text
              x="604"
              y="360"
              textAnchor="end"
              fill="#f59e0b"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              ~2 h 50 m
            </text>

            <text
              x="396"
              y="384"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              real UPS runtime often 10–20% shorter
            </text>
          </g>

          {/* Process → output */}
          <path
            d="M 620 260 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#ups-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
            d="M 620 260 H 700"
            fill="none"
            stroke="url(#ups-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
          />

          {/* —— OUTPUT —— */}
          <g className="ups-viz-node ups-viz-node--output">
            <rect
              x="700"
              y="120"
              width="220"
              height="280"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
              strokeWidth="1.35"
              strokeOpacity="0.65"
            />
            <text
              x="810"
              y="152"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.12em"
            >
              ESTIMATED RUNTIME
            </text>

            {/* Clock / shield glyph */}
            <g
              transform="translate(786, 168)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="24" cy="28" r="22" />
              <path d="M24 16 V30 L34 36" strokeLinecap="round" />
            </g>

            <text
              className="ups-viz-output-value"
              x="810"
              y="248"
              textAnchor="middle"
              fill="#a3e635"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3 h 20 m
            </text>
            <text
              x="810"
              y="274"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ideal backup window
            </text>

            <line
              x1="724"
              y1="294"
              x2="896"
              y2="294"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="810"
              y="322"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PRACTICAL
            </text>
            <text
              x="810"
              y="350"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              ~2 h 50 m
            </text>
            <text
              x="810"
              y="374"
              textAnchor="middle"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              with ~15% conversion loss
            </text>
          </g>

          {/* Footnote strip */}
          <rect
            x="40"
            y="460"
            width="880"
            height="72"
            rx="4"
            fill="#0f0f0f"
            stroke="#262626"
            strokeWidth="1"
          />
          <text
            x="56"
            y="488"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.08em"
          >
            FLOW
          </text>
          <text
            x="56"
            y="512"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            Runtime (h) = battery Wh ÷ load W · plan 10–20% less for inverter
            efficiency
          </text>
        </svg>
      </div>
    </section>
  );
}
