"use client";

import { cn } from "@/lib/utils";

interface EvForkliftRuntimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Electric Forklift Shift Runtime [VIZ].
 * Runtime ≈ (Ah × usable%) ÷ average amps.
 * Sample: 600 Ah · 48 V · 75 A · 85% → 6.8 h (408 min) · 24,480 Wh usable.
 */
export function EvForkliftRuntimeViz({ className }: EvForkliftRuntimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-forklift-runtime", className)}
      aria-label="Electric forklift shift runtime visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Forklift Shift Runtime</h3>
        <p className="tool-viz__subtitle">
          Usable amp-hours divided by average lift-and-drive current estimates
          how long an industrial pack lasts through a warehouse shift.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-forklift-runtime-viz"
          role="img"
          aria-labelledby="efr-viz-title efr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="efr-viz-title">
            Electric forklift shift runtime animated flow diagram
          </title>
          <desc id="efr-viz-desc">
            Battery capacity in amp-hours, system voltage, and average load
            amps feed a discharge path adjusted for usable capacity. Sample: a
            600 amp-hour 48 volt pack at 75 amp average load with 85 percent
            usable capacity runs about 6.8 hours.
          </desc>

          <defs>
            <pattern
              id="efr-viz-grid"
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
              id="efr-viz-arrow"
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
              id="efr-viz-pulse"
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
              id="efr-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="efr-viz-drain"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#efr-viz-grid)"
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

          {/* —— INPUT: Capacity —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="118"
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
              BATTERY CAPACITY
            </text>
            <g transform="translate(56, 112)" stroke="#ededed" fill="none">
              <rect x="0" y="8" width="28" height="40" rx="2" strokeWidth="1.3" />
              <rect
                x="7"
                y="3"
                width="14"
                height="5"
                rx="1"
                fill="#333333"
                stroke="none"
              />
              <rect
                className="efr-viz-battery-fill"
                x="4"
                y="16"
                width="20"
                height="28"
                rx="1"
                fill="#a3e635"
                fillOpacity="0.8"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              600 Ah
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              industrial traction pack
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="230"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="232"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SYSTEM VOLTAGE
            </text>
            <text
              x="56"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              x="56"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              → 24,480 Wh usable
            </text>
          </g>

          {/* —— INPUT: Load + usable —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="230"
              height="118"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="366"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AVG LOAD · USABLE
            </text>
            {/* Minimal mast/fork glyph */}
            <g
              transform="translate(56, 378)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.2"
              className="efr-viz-fork"
            >
              <path d="M8 36 V8 H16 V36" />
              <path d="M16 14 H36" />
              <path d="M16 22 H32" />
              <rect x="0" y="36" width="40" height="10" rx="1" />
            </g>
            <text
              x="108"
              y="404"
              fill="#a3e635"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              75 A · 85%
            </text>
            <text
              x="108"
              y="428"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DoD limit · lift/drive avg
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#efr-viz-arrow)"
          >
            <path d="M 270 131 H 320 V 180 H 350" />
            <path d="M 270 265 H 320 V 230 H 350" />
            <path d="M 270 399 H 320 V 320 H 350" />
          </g>
          <g
            fill="none"
            stroke="url(#efr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 270 131 H 320 V 180 H 350"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 270 265 H 320 V 230 H 350"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.6s" }}
              d="M 270 399 H 320 V 320 H 350"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="350"
              y="72"
              width="270"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="366"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              (Ah × %) ÷ A
            </text>

            <rect
              x="366"
              y="120"
              width="238"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="378"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · USABLE Ah
            </text>
            <text
              x="378"
              y="164"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              600 × 0.85 ={" "}
              <tspan fill="#a3e635">510 Ah</tspan>
            </text>

            <rect
              x="366"
              y="190"
              width="238"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="378"
              y="212"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · ENERGY CHECK
            </text>
            <text
              x="378"
              y="234"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              510 Ah × 48 V = 24.5 kWh
            </text>

            <rect
              x="366"
              y="260"
              width="238"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <text
              x="378"
              y="282"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 3 · DURATION
            </text>
            <text
              x="378"
              y="304"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              510 Ah ÷ 75 A
            </text>

            {/* Drain bar */}
            <text
              x="366"
              y="348"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              SHIFT DRAIN
            </text>
            <rect
              x="366"
              y="360"
              width="238"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="efr-viz-drain-bar"
              x="368"
              y="362"
              width="234"
              height="12"
              rx="1"
              fill="url(#efr-viz-drain)"
            />

            {/* Pack fill visual */}
            <g transform="translate(390, 392)">
              <rect
                x="0"
                y="0"
                width="48"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <rect
                className="efr-viz-pack-fill"
                x="6"
                y="8"
                width="36"
                height="34"
                rx="2"
                fill="url(#efr-viz-fill)"
              />
              <text
                x="64"
                y="22"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                85% usable slice
              </text>
              <text
                x="64"
                y="40"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                peak lifts spike A higher
              </text>
            </g>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#efr-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#efr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--out"
              d="M 620 265 H 700"
              pathLength="100"
            />
          </g>

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="700"
              y="140"
              width="220"
              height="250"
              rx="4"
              fill="#111111"
              stroke="#a3e635"
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
              EST. SHIFT RUNTIME
            </text>

            <g
              transform="translate(786, 196)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.4"
            >
              <circle cx="24" cy="24" r="22" />
              <g className="efr-viz-clock-hand">
                <line
                  x1="24"
                  y1="24"
                  x2="24"
                  y2="10"
                  stroke="#a3e635"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <line x1="24" y1="24" x2="34" y2="28" strokeLinecap="round" />
            </g>

            <text
              x="810"
              y="280"
              fill="#a3e635"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="efr-viz-output-value"
            >
              6.8 h
            </text>
            <text
              x="810"
              y="310"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              408 minutes
            </text>
            <text
              x="810"
              y="342"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              nearly a full shift
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              600 Ah · 48 V · 75 A
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Hours ≈ (Ah × usable%) ÷ avg A · lithium often allows higher usable % + opportunity charge
          </text>
        </svg>
      </div>
    </section>
  );
}
