"use client";

import { cn } from "@/lib/utils";

interface DcCableSizeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for DC Cable Size [VIZ] tab.
 * Load A + one-way ft + voltage → ampacity AWG + voltage-drop check.
 * Sample: 40 A · 20 ft one-way @ 12 V → 8 AWG (~27% drop → consider upsizing).
 */
export function DcCableSizeViz({ className }: DcCableSizeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--dc-cable-size", className)}
      aria-label="DC cable size visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DC Cable Size Calculator</h3>
        <p className="tool-viz__subtitle">
          Current, run length, and bus voltage drive wire gauge selection —
          ampacity first, then a round-trip voltage-drop check.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg dc-cable-size-viz"
          role="img"
          aria-labelledby="dcs-viz-title dcs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="dcs-viz-title">DC cable size animated flow diagram</title>
          <desc id="dcs-viz-desc">
            Load current in amps, one-way cable length in feet, and system
            voltage determine recommended American Wire Gauge. Sample: 40 amps
            over 20 feet one-way on a 12 volt system recommends 8 AWG from
            ampacity, then checks round-trip voltage drop.
          </desc>

          <defs>
            <pattern
              id="dcs-viz-grid"
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
              id="dcs-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient id="dcs-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="dcs-viz-conductor"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#dcs-viz-grid)"
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
            x="360"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DROP PATH
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

          {/* —— INPUT: Load current —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="240"
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
              LOAD CURRENT
            </text>
            <g transform="translate(56, 112)" fill="none" stroke="#ededed">
              <rect x="0" y="6" width="28" height="36" rx="2" strokeWidth="1.3" />
              <path
                d="M18 10 L10 26 H16 L12 40 L24 20 H18 Z"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="dcs-viz-bolt"
                fill="#a3e635"
                fillOpacity="0.35"
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
              40 A
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous DC draw
            </text>
          </g>

          {/* —— INPUT: Length —— */}
          <g>
            <rect
              x="40"
              y="206"
              width="240"
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
              ONE-WAY LENGTH
            </text>
            <g
              transform="translate(56, 252)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
              strokeLinecap="round"
            >
              <line x1="0" y1="18" x2="32" y2="18" />
              <path d="M0 12 V24 M32 12 V24" />
              <circle
                className="dcs-viz-length-dot"
                cx="16"
                cy="18"
                r="3"
                fill="#a3e635"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="276"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20 ft
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              source → load (one way)
            </text>
          </g>

          {/* —— INPUT: Voltage —— */}
          <g>
            <rect
              x="40"
              y="340"
              width="240"
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
              SYSTEM VOLTAGE
            </text>
            <g
              transform="translate(56, 382)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="14" cy="22" r="16" />
              <text
                x="14"
                y="27"
                fill="#a3e635"
                stroke="none"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="dcs-viz-v-pulse"
              >
                V
              </text>
            </g>
            <text
              x="100"
              y="410"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12 V
            </text>
            <text
              x="100"
              y="434"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              DC bus / battery bank
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#dcs-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#dcs-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              className="tool-viz-flow__pulse"
              d="M 280 131 H 330 V 180 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
              d="M 280 265 H 330 V 230 H 360"
              pathLength="100"
            />
            <path
              className="tool-viz-flow__pulse"
              style={{ animationDelay: "0.7s" }}
              d="M 280 399 H 330 V 320 H 360"
              pathLength="100"
            />
          </g>

          {/* —— PROCESS —— */}
          <g>
            <rect
              x="360"
              y="72"
              width="260"
              height="386"
              rx="4"
              fill="#111111"
              stroke="#404040"
              strokeWidth="1.25"
            />
            <text
              x="376"
              y="102"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              AMPACITY → DROP CHECK
            </text>

            {/* Source → cable → load schematic */}
            <g transform="translate(384, 120)">
              <rect
                x="0"
                y="8"
                width="44"
                height="36"
                rx="2"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <text
                x="22"
                y="30"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                SRC
              </text>

              {/* Conductor pair (round-trip) */}
              <path
                d="M 44 18 H 156"
                fill="none"
                stroke="#333333"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 44 34 H 156"
                fill="none"
                stroke="#333333"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                className="dcs-viz-current-flow"
                d="M 44 18 H 156"
                fill="none"
                stroke="url(#dcs-viz-conductor)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                className="dcs-viz-current-flow dcs-viz-current-flow--return"
                d="M 156 34 H 44"
                fill="none"
                stroke="url(#dcs-viz-conductor)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <rect
                x="156"
                y="8"
                width="44"
                height="36"
                rx="2"
                fill="#0a0a0a"
                stroke="#ededed"
                strokeWidth="1.2"
              />
              <text
                x="178"
                y="30"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                textAnchor="middle"
              >
                LOAD
              </text>
            </g>

            <text
              x="490"
              y="188"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              round-trip resistance · I × R × 2L
            </text>

            <rect
              x="376"
              y="204"
              width="228"
              height="56"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="226"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · AMPACITY
            </text>
            <text
              x="388"
              y="248"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              40 A → copper table →{" "}
              <tspan fill="#a3e635">8 AWG</tspan>
            </text>

            <rect
              x="376"
              y="274"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="296"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · ~3% DROP TARGET
            </text>
            <text
              x="388"
              y="320"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              drop ≈ 27% @ 8 AWG
            </text>
            <text
              x="388"
              y="338"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              over limit · consider thicker wire
            </text>

            {/* Cross-section sizes */}
            <text
              x="376"
              y="372"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CROSS-SECTION
            </text>
            <g transform="translate(388, 384)">
              {[
                { r: 5, label: "10" },
                { r: 8, label: "8" },
                { r: 11, label: "6" },
                { r: 14, label: "4" },
              ].map((wire, i) => (
                <g key={wire.label} transform={`translate(${i * 52}, 0)`}>
                  <circle
                    cx="16"
                    cy="16"
                    r={wire.r}
                    fill="none"
                    stroke={wire.label === "8" ? "#a3e635" : "#555555"}
                    strokeWidth={wire.label === "8" ? 1.6 : 1.1}
                    className={
                      wire.label === "8" ? "dcs-viz-awg-active" : undefined
                    }
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r={Math.max(2, wire.r - 3)}
                    fill={wire.label === "8" ? "#a3e635" : "#333333"}
                    fillOpacity={wire.label === "8" ? 0.55 : 0.8}
                    stroke="none"
                    className={
                      wire.label === "8" ? "dcs-viz-awg-fill" : undefined
                    }
                  />
                  <text
                    x="16"
                    y="42"
                    fill={wire.label === "8" ? "#a3e635" : "#555555"}
                    fontSize="9"
                    fontFamily="ui-monospace, monospace"
                    textAnchor="middle"
                  >
                    {wire.label}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#dcs-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#dcs-viz-pulse)"
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
              RECOMMENDED AWG
            </text>

            <circle
              cx="810"
              cy="230"
              r="36"
              fill="none"
              stroke="#333333"
              strokeWidth="8"
            />
            <circle
              className="dcs-viz-awg-fill"
              cx="810"
              cy="230"
              r="28"
              fill="#a3e635"
              fillOpacity="0.55"
              stroke="none"
            />
            <text
              x="810"
              y="238"
              fill="#0a0a0a"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
            >
              8
            </text>

            <text
              x="810"
              y="300"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="dcs-viz-output-value"
            >
              8 AWG
            </text>
            <text
              x="810"
              y="328"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              40 A · 20 ft · 12 V
            </text>
            <text
              x="810"
              y="356"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ampacity pick · check drop
            </text>
            <text
              x="810"
              y="372"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              copper only · follow code
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Pick AWG by ampacity, then verify ~3% round-trip drop · enter one-way
            length (math uses 2×)
          </text>
        </svg>
      </div>
    </section>
  );
}
