"use client";

import { cn } from "@/lib/utils";

interface PowerFactorVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Power Factor Calculator [VIZ].
 * PF = kW ÷ kVA (cos φ on the AC power triangle).
 * Sample: 8 kW · 10 kVA → 0.80.
 */
export function PowerFactorViz({ className }: PowerFactorVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--power-factor", className)}
      aria-label="Power factor visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Power Factor</h3>
        <p className="tool-viz__subtitle">
          Real power over apparent power yields the power-factor ratio — how
          much of the AC supply does useful work versus reactive circulating
          current.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg power-factor-viz"
          role="img"
          aria-labelledby="pf-viz-title pf-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="pf-viz-title">
            Power factor animated conversion diagram
          </title>
          <desc id="pf-viz-desc">
            Real power in kilowatts divided by apparent power in
            kilovolt-amperes yields the power factor ratio. Sample: 8 kilowatts
            at 10 kilovolt-amperes equals 0.80.
          </desc>

          <defs>
            <pattern
              id="pf-viz-grid"
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
              id="pf-viz-arrow"
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
              id="pf-viz-pulse"
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
              id="pf-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="pf-viz-fill"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#pf-viz-grid)"
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
            P ÷ S → PF
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

          {/* —— INPUT: Real power —— */}
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
              REAL POWER
            </text>
            <text
              className="pf-viz-kw-value"
              x="56"
              y="148"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 kW
            </text>
            <text
              x="56"
              y="178"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              useful work (P)
            </text>
            <text
              x="56"
              y="200"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              meters · heaters · loads
            </text>
          </g>

          {/* —— INPUT: Apparent power —— */}
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
              APPARENT POWER
            </text>
            <text
              className="pf-viz-kva-value"
              x="56"
              y="318"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 kVA
            </text>
            <text
              x="56"
              y="348"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              vector sum (S)
            </text>
            <text
              x="56"
              y="370"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              transformer · feeder
            </text>
          </g>

          {/* —— Flow inputs → mid —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 270 147 L 320 147"
            fill="none"
            stroke="url(#pf-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#pf-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 317 L 320 317"
            fill="none"
            stroke="url(#pf-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#pf-viz-arrow)"
          />

          {/* —— CENTER: Power triangle + divide —— */}
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

            {/* Right triangle: P base, Q height, S hypotenuse · PF = P/S = 0.8 */}
            <g transform="translate(380, 112)">
              <path
                className="pf-viz-triangle-fill"
                d="M 20 150 L 180 150 L 180 30 Z"
                fill="url(#pf-viz-fill)"
              />
              <line
                className="pf-viz-p-leg"
                x1="20"
                y1="150"
                x2="180"
                y2="150"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                className="pf-viz-q-leg"
                x1="180"
                y1="150"
                x2="180"
                y2="30"
                stroke="#555555"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                className="pf-viz-s-hyp"
                x1="20"
                y1="150"
                x2="180"
                y2="30"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* cos φ arc near origin */}
              <path
                className="pf-viz-angle-arc"
                d="M 48 150 A 28 28 0 0 0 44 128"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              <circle
                className="pf-viz-vertex"
                cx="20"
                cy="150"
                r="4"
                fill="currentColor"
              />
              <circle
                className="pf-viz-vertex"
                cx="180"
                cy="150"
                r="4"
                fill="currentColor"
              />
              <circle
                className="pf-viz-vertex"
                cx="180"
                cy="30"
                r="4"
                fill="#888888"
              />
              <text
                x="100"
                y="168"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                className="pf-viz-p-label"
              >
                P · 8 kW
              </text>
              <text
                x="198"
                y="95"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                Q · 6
              </text>
              <text
                x="78"
                y="78"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                className="pf-viz-s-label"
              >
                S · 10 kVA
              </text>
              <text
                x="58"
                y="142"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                className="pf-viz-phi-label"
              >
                φ
              </text>
            </g>

            <text
              x="340"
              y="330"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PF = cos φ = P ÷ S
            </text>
            <text
              className="pf-viz-math-value"
              x="340"
              y="358"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 ÷ 10 = 0.80
            </text>
            <rect
              x="340"
              y="372"
              width="280"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="pf-viz-scale-bar"
              x="342"
              y="374"
              width="220"
              height="6"
              rx="1"
              fill="url(#pf-viz-bar)"
            />
          </g>

          {/* —— Flow mid → output —— */}
          <path
            className="tool-viz-flow__pulse"
            d="M 660 232 L 700 232"
            fill="none"
            stroke="url(#pf-viz-pulse)"
            strokeWidth="2"
            markerEnd="url(#pf-viz-arrow)"
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
              POWER FACTOR
            </text>
            <text
              className="pf-viz-output-value"
              x="720"
              y="155"
              fill="#ededed"
              fontSize="40"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.80
            </text>
            <text
              x="720"
              y="182"
              fill="#888888"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
            >
              ratio · 0–1
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
              className="pf-viz-output-bar"
              x="722"
              y="204"
              width="140"
              height="8"
              rx="1"
              fill="url(#pf-viz-bar)"
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
              className="pf-viz-detail-value"
              x="720"
              y="278"
              fill="#ededed"
              fontSize="15"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 kW ÷ 10 kVA
            </text>
            <text
              x="720"
              y="310"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              80% useful · 20% Q
            </text>
            <text
              x="720"
              y="348"
              fill="#666666"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              lagging · motors
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
              PF = kW ÷ kVA = cos φ
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
              8 kW · 10 kVA → 0.80
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
