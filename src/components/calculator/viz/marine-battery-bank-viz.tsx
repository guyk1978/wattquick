"use client";

import { cn } from "@/lib/utils";

interface MarineBatteryBankVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Marine Trolling Motor Runtime [VIZ].
 * Runtime = (Ah × usable DoD%) ÷ continuous amps.
 * Sample: 100 Ah · 80% · 30 A → 2.67 h · 160 min (2h 40m).
 */
export function MarineBatteryBankViz({ className }: MarineBatteryBankVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--marine-battery-bank", className)}
      aria-label="Marine trolling motor runtime visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Marine Trolling Motor Runtime</h3>
        <p className="tool-viz__subtitle">
          Usable bank amp-hours divided by continuous motor draw estimates how
          long you can troll before hitting your DoD limit.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg marine-battery-bank-viz"
          role="img"
          aria-labelledby="mbb-viz-title mbb-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="mbb-viz-title">
            Marine trolling motor runtime animated flow diagram
          </title>
          <desc id="mbb-viz-desc">
            Battery bank capacity in amp-hours is scaled by usable depth of
            discharge, then divided by continuous motor current to estimate
            runtime. Sample: a 100 amp-hour bank at 80 percent usable DoD with a
            30 amp continuous draw yields about 2 hours 40 minutes.
          </desc>

          <defs>
            <pattern
              id="mbb-viz-grid"
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
              id="mbb-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="mbb-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="mbb-viz-bank"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="mbb-viz-drain"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#mbb-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DISCHARGE PATH
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

          {/* —— INPUT: Continuous draw —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONTINUOUS DRAW
            </text>
            <text
              x="56"
              y="140"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 A
            </text>
            <text
              x="56"
              y="172"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              trolling speed clamp
            </text>
            {/* Prop glyph */}
            <g className="mbb-viz-prop" transform="translate(200, 145)">
              <circle cx="0" cy="0" r="18" fill="none" stroke="#a3e635" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="16" ry="5" fill="none" stroke="#a3e635" strokeWidth="1" />
              <ellipse cx="0" cy="0" rx="5" ry="16" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.6" />
            </g>
          </g>

          {/* —— INPUT: Bank —— */}
          <g>
            <rect
              x="40"
              y="230"
              width="230"
              height="198"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="256"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BANK CAPACITY
            </text>
            <text
              x="56"
              y="298"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 Ah
            </text>
            <text
              x="56"
              y="328"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              usable DoD 80%
            </text>
            <rect
              x="56"
              y="350"
              width="56"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect x="74" y="344" width="20" height="6" rx="1" fill="#a3e635" />
            <rect
              className="mbb-viz-bank-fill"
              x="60"
              y="358"
              width="48"
              height="36"
              rx="1"
              fill="url(#mbb-viz-bank)"
            />
            <text
              x="128"
              y="378"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              LiFePO₄ / AGM
            </text>
            <text
              x="128"
              y="398"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              50–90% DoD range
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 142 L 320 142"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mbb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 142 L 320 142"
            fill="none"
            stroke="url(#mbb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 329 L 300 329 L 300 190 L 320 190"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mbb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 329 L 300 329 L 300 190 L 320 190"
            fill="none"
            stroke="url(#mbb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: Usable Ah —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              USABLE CAPACITY
            </text>
            <text
              x="346"
              y="124"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              Ah × DoD%
            </text>
            <text
              x="346"
              y="164"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="mbb-viz-usable-value"
            >
              80 Ah
            </text>
            <text
              x="346"
              y="194"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              100 × 0.80 · reserve 20 Ah
            </text>
          </g>

          {/* —— FLOW: Discharge ÷ amps —— */}
          <g>
            <rect
              x="330"
              y="240"
              width="300"
              height="188"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="266"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DISCHARGE ÷ DRAW
            </text>
            <text
              x="346"
              y="296"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              80 Ah ÷ 30 A
            </text>

            <rect
              x="346"
              y="318"
              width="240"
              height="14"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="mbb-viz-drain-bar"
              x="348"
              y="320"
              width="200"
              height="10"
              rx="1"
              fill="url(#mbb-viz-drain)"
            />

            {/* Boat / water line */}
            <g transform="translate(360, 360)">
              <path
                className="mbb-viz-water"
                d="M 0 40 Q 30 28 60 40 T 120 40 T 180 40"
                fill="none"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <path
                className="mbb-viz-boat"
                d="M 40 28 L 70 28 L 78 40 L 32 40 Z"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <line
                x1="55"
                y1="28"
                x2="55"
                y2="12"
                stroke="#ededed"
                strokeWidth="1.25"
              />
              <path
                d="M 55 12 L 72 20 L 55 22 Z"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1"
              />
            </g>
            <text
              x="346"
              y="412"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous on-water drain
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 147 L 680 147"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mbb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 147 L 680 147"
            fill="none"
            stroke="url(#mbb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#mbb-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 334 L 655 334 L 655 230 L 680 230"
            fill="none"
            stroke="url(#mbb-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              RUNTIME
            </text>
            <text
              x="706"
              y="160"
              fill="#a3e635"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="mbb-viz-output-value"
            >
              2h 40m
            </text>
            <text
              x="706"
              y="196"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
            >
              2.67 hours
            </text>
            <text
              x="706"
              y="224"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              160 minutes
            </text>

            <rect
              x="706"
              y="248"
              width="198"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="mbb-viz-runtime-bar"
              x="708"
              y="250"
              width="148"
              height="8"
              rx="1"
              fill="url(#mbb-viz-drain)"
            />

            {/* Clock glyph */}
            <g transform="translate(780, 310)">
              <circle
                className="mbb-viz-clock"
                cx="0"
                cy="0"
                r="36"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <line
                className="mbb-viz-clock-hand"
                x1="0"
                y1="0"
                x2="0"
                y2="-22"
                stroke="#a3e635"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="0"
                x2="14"
                y2="8"
                stroke="#888888"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>

            <text
              x="706"
              y="400"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              at 30 A continuous
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
              Ah × DoD% → usable Ah ÷ continuous A → hours
            </text>
            <text
              x="520"
              y="28"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAMPLE
            </text>
            <text
              x="520"
              y="52"
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              100 Ah · 80% · 30 A → 2h 40m
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
