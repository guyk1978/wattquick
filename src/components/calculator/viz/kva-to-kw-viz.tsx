"use client";

import { cn } from "@/lib/utils";

interface KvaToKwVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for kVA to kW Converter [VIZ].
 * kW = kVA × power factor.
 * Sample: 10 kVA · 0.9 PF → 9 kW.
 */
export function KvaToKwViz({ className }: KvaToKwVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--kva-to-kw", className)}
      aria-label="kVA to kW conversion visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">kVA to kW Converter</h3>
        <p className="tool-viz__subtitle">
          Apparent power (kVA) times power factor yields real power (kW) —
          the fraction of AC power that actually does work.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg kva-to-kw-viz"
          role="img"
          aria-labelledby="ktk-viz-title ktk-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ktk-viz-title">
            Kilovolt-amperes to kilowatts animated conversion diagram
          </title>
          <desc id="ktk-viz-desc">
            Apparent power in kilovolt-amperes multiplied by power factor
            yields real power in kilowatts. Sample: 10 kilovolt-amperes at a
            power factor of 0.9 equals 9 kilowatts.
          </desc>

          <defs>
            <pattern
              id="ktk-viz-grid"
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
              id="ktk-viz-arrow"
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
              id="ktk-viz-pulse"
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
              id="ktk-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ktk-viz-fill"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ktk-viz-grid)"
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
            kVA × PF → kW
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

          {/* —— INPUT: Apparent power —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="150"
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
              APPARENT POWER
            </text>
            <text
              className="ktk-viz-kva-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 kVA
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              vector magnitude S
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              volts × amps / 1000
            </text>
          </g>

          {/* —— INPUT: Power factor —— */}
          <g>
            <rect
              x="40"
              y="242"
              width="230"
              height="150"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER FACTOR
            </text>
            <text
              className="ktk-viz-pf-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.90
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              real / apparent (0–1)
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              motors often 0.7–0.9
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#ktk-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ktk-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#ktk-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ktk-viz-arrow)"
          />

          {/* —— CENTER: Power triangle conversion —— */}
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
              POWER TRIANGLE
            </text>

            {/* Right triangle: P horizontal, Q vertical, S hypotenuse */}
            <g transform="translate(400, 120)">
              <path
                className="ktk-viz-triangle-fill"
                d="M 20 140 L 200 140 L 200 40 Z"
                fill="url(#ktk-viz-fill)"
              />
              {/* P — real power base */}
              <line
                className="ktk-viz-p-leg"
                x1="20"
                y1="140"
                x2="200"
                y2="140"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Q — reactive vertical */}
              <line
                className="ktk-viz-q-leg"
                x1="200"
                y1="140"
                x2="200"
                y2="40"
                stroke="#555555"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* S — apparent hypotenuse */}
              <line
                className="ktk-viz-s-hyp"
                x1="20"
                y1="140"
                x2="200"
                y2="40"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                className="ktk-viz-vertex"
                cx="20"
                cy="140"
                r="4"
                fill="currentColor"
              />
              <circle
                className="ktk-viz-vertex"
                cx="200"
                cy="140"
                r="4"
                fill="currentColor"
              />
              <circle
                className="ktk-viz-vertex"
                cx="200"
                cy="40"
                r="4"
                fill="#888888"
              />
              <text
                x="110"
                y="158"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                className="ktk-viz-p-label"
              >
                P · kW
              </text>
              <text
                x="218"
                y="95"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                Q
              </text>
              <text
                x="85"
                y="80"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                className="ktk-viz-s-label"
              >
                S · kVA
              </text>
            </g>

            <text
              x="340"
              y="310"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CONVERSION
            </text>
            <text
              className="ktk-viz-math-value"
              x="340"
              y="340"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 × 0.90 = 9.00
            </text>
            <rect
              x="340"
              y="356"
              width="280"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="ktk-viz-scale-bar"
              x="342"
              y="358"
              width="230"
              height="8"
              rx="1"
              fill="url(#ktk-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#ktk-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#ktk-viz-arrow)"
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
              REAL POWER
            </text>
            <text
              className="ktk-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="36"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              9.00
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              kW
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
              className="ktk-viz-output-bar"
              x="722"
              y="204"
              width="155"
              height="8"
              rx="1"
              fill="url(#ktk-viz-bar)"
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
              className="ktk-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 kVA × 0.90 PF
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              90% of apparent
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              usable work power
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
              kVA × PF → kW (P = S × cos φ)
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
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              10 kVA · 0.90 PF → 9.00 kW
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
