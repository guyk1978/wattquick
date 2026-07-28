"use client";

import { cn } from "@/lib/utils";

interface DcCableVoltageDropVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for DC Cable Size & Voltage Drop [VIZ].
 * Round-trip Cu R → ΔV = I×R, % drop, I²R watts; pick mm² for max % + ampacity.
 * Sample: 30 A · 15 m · 48 V · 2% max → 25 mm² (≈4 AWG) · 1.31% · 18.9 W.
 */
export function DcCableVoltageDropViz({
  className,
}: DcCableVoltageDropVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--dc-cable-voltage-drop", className)}
      aria-label="DC cable size and voltage drop visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DC Run · Gauge & Drop</h3>
        <p className="tool-viz__subtitle">
          Current through copper length and cross-section creates resistive
          sag and I²R heat — size mm² / AWG to keep drop inside your limit.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg dc-cable-voltage-drop-viz"
          role="img"
          aria-labelledby="dcvd-viz-title dcvd-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="dcvd-viz-title">
            DC cable voltage drop animated transmission path diagram
          </title>
          <desc id="dcvd-viz-desc">
            System current, voltage, one-way cable length, and maximum drop
            percent size copper mm squared and AWG. Sample: 30 amps over 15
            meters at 48 volts with a 2 percent limit recommends 25 square
            millimeters about 4 AWG, with 1.31 percent drop and 18.9 watts
            power loss.
          </desc>

          <defs>
            <pattern
              id="dcvd-viz-grid"
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
              id="dcvd-viz-arrow"
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
              id="dcvd-viz-pulse"
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
              id="dcvd-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="dcvd-viz-loss"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#dcvd-viz-grid)"
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
              SYSTEM CURRENT
            </text>
            <text
              className="dcvd-viz-a-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30 A
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
              SYSTEM VOLTAGE
            </text>
            <text
              className="dcvd-viz-v-value"
              x="52"
              y="194"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V DC
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
              ONE-WAY LENGTH
            </text>
            <text
              className="dcvd-viz-len-value"
              x="52"
              y="284"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              15 m
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
              MAX DROP ALLOWED
            </text>
            <text
              className="dcvd-viz-max-value"
              x="52"
              y="374"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2.0%
            </text>
          </g>

          {/* —— FLOW INTO CENTER —— */}
          <g>
            <path
              d="M 236 80 L 300 80 L 300 150"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#dcvd-viz-arrow)"
            />
            <path
              className="dcvd-viz-timeline-pulse"
              d="M 236 80 L 300 80 L 300 150"
              fill="none"
              stroke="url(#dcvd-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 174 L 280 174 L 280 170 L 300 170"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="dcvd-viz-flow-pulse"
              d="M 236 174 L 280 174 L 280 170 L 300 170"
              fill="none"
              stroke="url(#dcvd-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.2s" }}
            />
            <path
              d="M 236 264 L 280 264 L 280 190 L 300 190"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="dcvd-viz-flow-pulse"
              d="M 236 264 L 280 264 L 280 190 L 300 190"
              fill="none"
              stroke="url(#dcvd-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.4s" }}
            />
          </g>

          {/* —— CENTER: TRANSMISSION PATH —— */}
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
              RESISTIVE TRANSMISSION PATH
            </text>

            {/* Source / load nodes with cable between */}
            <g className="dcvd-viz-src-node">
              <rect
                x="320"
                y="92"
                width="72"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="356"
                y="112"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                ARRAY
              </text>
              <text
                className="dcvd-viz-src-chip"
                x="356"
                y="128"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                48.00 V
              </text>
            </g>

            {/* Cable run line art */}
            <path
              d="M 392 116 L 528 116"
              fill="none"
              stroke="#555555"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              className="dcvd-viz-cable-pulse"
              d="M 392 116 L 528 116"
              fill="none"
              stroke="url(#dcvd-viz-pulse)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              x="460"
              y="104"
              textAnchor="middle"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              15 m × 2 = 30 m Cu
            </text>

            <g className="dcvd-viz-load-node">
              <rect
                x="528"
                y="92"
                width="92"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="574"
                y="112"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                MPPT
              </text>
              <text
                className="dcvd-viz-load-chip"
                x="574"
                y="128"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                47.37 V
              </text>
            </g>

            <text
              x="320"
              y="172"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              MIN mm² FOR 2% DROP
            </text>
            <rect
              x="320"
              y="182"
              width="300"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="dcvd-viz-min-bar"
              x="320"
              y="182"
              width="197"
              height="12"
              rx="2"
              fill="url(#dcvd-viz-bar)"
            />
            <text
              className="dcvd-viz-min-chip"
              x="480"
              y="214"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              ≥ 16.41 mm² · ampacity → 25 mm²
            </text>

            <text
              x="320"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ROUND-TRIP R @ 25 mm²
            </text>
            <text
              className="dcvd-viz-r-chip"
              x="480"
              y="268"
              textAnchor="middle"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.0210 Ω
            </text>

            <text
              x="320"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              ΔV = I × R · P = I²R
            </text>
            <rect
              x="320"
              y="308"
              width="140"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="dcvd-viz-dv-chip"
              x="390"
              y="331"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              −0.63 V
            </text>
            <rect
              x="480"
              y="308"
              width="140"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="dcvd-viz-p-chip"
              x="550"
              y="331"
              textAnchor="middle"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              18.9 W
            </text>

            <text
              x="320"
              y="370"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DROP VS 2% LIMIT
            </text>
            <rect
              x="320"
              y="380"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="dcvd-viz-drop-bar"
              x="320"
              y="380"
              width="197"
              height="10"
              rx="2"
              fill="url(#dcvd-viz-loss)"
            />
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#dcvd-viz-arrow)"
            />
            <path
              className="dcvd-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#dcvd-viz-pulse)"
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
              RECOMMENDED CABLE
            </text>
            <text
              className="dcvd-viz-output-value"
              x="696"
              y="118"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              25 mm²
            </text>
            <text
              x="696"
              y="146"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 4 AWG copper
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
              VOLTAGE DROP
            </text>
            <text
              className="dcvd-viz-pct-out"
              x="696"
              y="238"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.31% · −0.63 V
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
              POWER LOSS (I²R)
            </text>
            <text
              className="dcvd-viz-loss-out"
              x="696"
              y="326"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              18.9 W
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
              className="dcvd-viz-ok-value"
              x="802"
              y="390"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              WITHIN 2% LIMIT
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
              className="dcvd-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              30 A × 0.021 Ω → 0.63 V (1.31%) · I²R = 18.9 W · pick 25 mm²
            </text>
          </g>

          <path
            className="dcvd-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#dcvd-viz-pulse)"
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
            Cu ~20 °C · round-trip path · ampacity + drop gate size
          </text>
          <text
            className="dcvd-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            V_load 47.37 V
          </text>
        </svg>
      </div>
    </section>
  );
}
