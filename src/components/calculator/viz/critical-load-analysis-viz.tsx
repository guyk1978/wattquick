"use client";

import { cn } from "@/lib/utils";

interface CriticalLoadAnalysisVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Critical Load Analysis [VIZ] tab.
 * Devices → total load / surge → required Wh + battery bank.
 */
export function CriticalLoadAnalysisViz({
  className,
}: CriticalLoadAnalysisVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--critical-load", className)}
      aria-label="Critical load analysis visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Critical Load Analysis</h3>
        <p className="tool-viz__subtitle">
          Essential devices feed daily energy, surge detection, and backup
          capacity sizing.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg critical-load-analysis-viz"
          role="img"
          aria-labelledby="cl-viz-title cl-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="cl-viz-title">
            Critical load analysis animated flow diagram
          </title>
          <desc id="cl-viz-desc">
            Household devices with running watts and daily runtime flow into
            total load computation and surge detection, then output required
            storage capacity in watt-hours and recommended battery bank size.
          </desc>

          <defs>
            <pattern
              id="cl-viz-grid"
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
              id="cl-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="cl-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#cl-viz-grid)"
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
            className="tool-viz__label"
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
            className="tool-viz__label"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            CALCULATION
          </text>
          <text
            x="700"
            y="48"
            className="tool-viz__label"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            OUTPUT
          </text>

          {/* —— INPUT DEVICE CARDS —— */}
          <g className="cl-viz-node cl-viz-node--device">
            <rect
              x="40"
              y="68"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <path
              d="M56 96 h18 v22 h-18 z M59 96 v-6 h12 v6"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="65" cy="108" r="2" fill="#a3e635" />
            <text
              x="88"
              y="94"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="600"
            >
              Refrigerator
            </text>
            <text
              x="88"
              y="114"
              fill="#a3e635"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              150 W
            </text>
            <text
              x="88"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 8 h / day
            </text>
            <text
              x="232"
              y="94"
              textAnchor="end"
              fill="#f59e0b"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              SURGE
            </text>
          </g>

          <g className="cl-viz-node cl-viz-node--device">
            <rect
              x="40"
              y="156"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              x="56"
              y="178"
              width="22"
              height="14"
              rx="1"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            />
            <path
              d="M60 192 h14 M67 192 v8"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.1"
            />
            <circle
              className="cl-viz-pulse-dot"
              cx="67"
              cy="185"
              r="2.5"
              fill="#a3e635"
            />
            <text
              x="88"
              y="182"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="600"
            >
              Router / modem
            </text>
            <text
              x="88"
              y="202"
              fill="#a3e635"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              15 W
            </text>
            <text
              x="88"
              y="218"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 24 h / day
            </text>
          </g>

          <g className="cl-viz-node cl-viz-node--device">
            <rect
              x="40"
              y="244"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <path
              d="M67 268 l-10 14 h20 z"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="67" cy="272" r="1.8" fill="#a3e635" />
            <text
              x="88"
              y="270"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="600"
            >
              Lighting
            </text>
            <text
              x="88"
              y="290"
              fill="#a3e635"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              200 W
            </text>
            <text
              x="88"
              y="306"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 5 h / day
            </text>
          </g>

          <g className="cl-viz-node cl-viz-node--device">
            <rect
              x="40"
              y="332"
              width="220"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              x="56"
              y="354"
              width="22"
              height="16"
              rx="1"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
            />
            <path
              d="M60 362 h14 M67 354 v-5"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.1"
            />
            <text
              x="88"
              y="358"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight="600"
            >
              Water pump
            </text>
            <text
              x="88"
              y="378"
              fill="#a3e635"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              750 W
            </text>
            <text
              x="88"
              y="394"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              × 0.5 h / day
            </text>
            <text
              x="232"
              y="358"
              textAnchor="end"
              fill="#f59e0b"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              SURGE
            </text>
          </g>

          <text
            x="40"
            y="430"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            + TV &amp; more device slots…
          </text>

          {/* Flow paths: devices → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <path id="cl-flow-1" d="M 260 104 H 320 V 180 H 380" />
            <path id="cl-flow-2" d="M 260 192 H 380" />
            <path id="cl-flow-3" d="M 260 280 H 320 V 220 H 380" />
            <path id="cl-flow-4" d="M 260 368 H 320 V 300 H 380" />
          </g>

          {/* Animated pulses along input flows */}
          <g
            fill="none"
            stroke="url(#cl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            className="cl-viz-flow"
          >
            <path
              className="cl-viz-flow__pulse cl-viz-flow__pulse--1"
              d="M 260 104 H 320 V 180 H 380"
              pathLength="100"
            />
            <path
              className="cl-viz-flow__pulse cl-viz-flow__pulse--2"
              d="M 260 192 H 380"
              pathLength="100"
            />
            <path
              className="cl-viz-flow__pulse cl-viz-flow__pulse--3"
              d="M 260 280 H 320 V 220 H 380"
              pathLength="100"
            />
            <path
              className="cl-viz-flow__pulse cl-viz-flow__pulse--4"
              d="M 260 368 H 320 V 300 H 380"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS NODES —— */}
          <g className="cl-viz-node cl-viz-node--process">
            <rect
              x="380"
              y="120"
              width="240"
              height="100"
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
              TOTAL LOAD
            </text>
            <text
              x="396"
              y="178"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,215 W
            </text>
            <text
              x="396"
              y="200"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Σ running watts · 3,335 Wh/day
            </text>
          </g>

          <g className="cl-viz-node cl-viz-node--process cl-viz-node--surge">
            <rect
              x="380"
              y="248"
              width="240"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#f59e0b"
              strokeWidth="1.25"
              strokeOpacity="0.55"
            />
            <text
              x="396"
              y="276"
              fill="#f59e0b"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SURGE DETECTION
            </text>
            <text
              x="396"
              y="306"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ~4,500 W
            </text>
            <text
              x="396"
              y="328"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              fridge + pump · ×5 inrush factor
            </text>
          </g>

          {/* Process → output connector */}
          <path
            d="M 620 170 H 660 V 250 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#cl-viz-arrow)"
          />
          <path
            className="cl-viz-flow__pulse cl-viz-flow__pulse--out"
            d="M 620 170 H 660 V 250 H 700"
            fill="none"
            stroke="url(#cl-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="100"
          />
          <path
            d="M 620 298 H 660 V 320 H 700"
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* —— OUTPUT —— */}
          <g className="cl-viz-node cl-viz-node--output">
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
              REQUIRED CAPACITY
            </text>
            <text
              className="cl-viz-output-value"
              x="810"
              y="210"
              textAnchor="middle"
              fill="#a3e635"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,334 Wh
            </text>
            <text
              x="810"
              y="236"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              8 h outage · 1.2× buffer
            </text>

            <line
              x1="724"
              y1="258"
              x2="896"
              y2="258"
              stroke="#262626"
              strokeWidth="1"
            />

            <text
              x="810"
              y="286"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY BANK
            </text>

            {/* Battery glyphs */}
            <g transform="translate(748, 304)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="28" height="44" rx="2" strokeWidth="1.2" />
              <rect x="8" y="4" width="12" height="5" rx="1" fill="#333333" stroke="none" />
              <rect
                className="cl-viz-battery-fill"
                x="4"
                y="28"
                width="20"
                height="20"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.85"
                stroke="none"
              />
              <rect x="40" y="8" width="28" height="44" rx="2" strokeWidth="1.2" />
              <rect x="48" y="4" width="12" height="5" rx="1" fill="#333333" stroke="none" />
              <rect
                className="cl-viz-battery-fill cl-viz-battery-fill--delay"
                x="44"
                y="28"
                width="20"
                height="20"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.85"
                stroke="none"
              />
            </g>

            <text
              x="810"
              y="372"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              2× 100 Ah · 12 V
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
            Σ (W × hrs/day) → avg Wh/h → × backup hours × 1.2 buffer → Wh capacity
            &amp; bank count
          </text>
        </svg>
      </div>
    </section>
  );
}
