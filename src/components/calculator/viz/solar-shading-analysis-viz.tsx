"use client";

import { cn } from "@/lib/utils";

interface SolarShadingAnalysisVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Shading Analysis [VIZ].
 * String shade → bypass diodes → mismatch drag → annual kWh/$ loss.
 * Sample: 12 × 400 W · 20% shaded · 50% coverage · string →
 * 28.2% · 1,895 kWh/yr · $265/yr · add optimizers (2.3 yr).
 */
export function SolarShadingAnalysisViz({
  className,
}: SolarShadingAnalysisVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-shading-analysis", className)}
      aria-label="Solar shading analysis visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">String Shade · Bypass & Mismatch</h3>
        <p className="tool-viz__subtitle">
          Shadows on a few modules trip bypass diodes and drag string current —
          losses often exceed the shaded area and show up as kWh and $/yr.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-shading-analysis-viz"
          role="img"
          aria-labelledby="ssa-viz-title ssa-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ssa-viz-title">
            Solar shading analysis animated string mismatch diagram
          </title>
          <desc id="ssa-viz-desc">
            Panels in a string, panel watts, shaded module share, and shade
            coverage drive bypass diode and mismatch losses on a string
            inverter. Sample: twelve 400 watt panels with 20 percent shaded and
            50 percent coverage lose 28.2 percent production, about 1,895
            kilowatt-hours per year and 265 dollars per year; optimizers are
            recommended with about 2.3 year payback.
          </desc>

          <defs>
            <pattern
              id="ssa-viz-grid"
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
              id="ssa-viz-arrow"
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
              id="ssa-viz-pulse"
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
              id="ssa-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ssa-viz-shade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#444444" stopOpacity="0.4" />
            </linearGradient>
            <pattern
              id="ssa-viz-hatch"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="#555555"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ssa-viz-grid)"
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
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="58"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PANELS IN STRING
            </text>
            <text
              className="ssa-viz-n-value"
              x="52"
              y="92"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              12
            </text>

            <rect
              x="36"
              y="126"
              width="200"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="148"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PANEL RATING
            </text>
            <text
              className="ssa-viz-w-value"
              x="52"
              y="176"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              400 W
            </text>

            <rect
              x="36"
              y="208"
              width="200"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="230"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SHADED MODULES
            </text>
            <text
              className="ssa-viz-shade-value"
              x="52"
              y="258"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20% · 3 pcs
            </text>

            <rect
              x="36"
              y="290"
              width="200"
              height="70"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="312"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SHADE COVERAGE
            </text>
            <text
              className="ssa-viz-cov-value"
              x="52"
              y="340"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50% · string
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 75 L 300 75 L 300 130"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ssa-viz-arrow)"
            />
            <path
              className="ssa-viz-timeline-pulse"
              d="M 236 75 L 300 75 L 300 130"
              fill="none"
              stroke="url(#ssa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 243 L 280 243 L 280 180 L 300 180"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="ssa-viz-shade-pulse"
              d="M 236 243 L 280 243 L 280 180 L 300 180"
              fill="none"
              stroke="url(#ssa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.3s" }}
            />
          </g>

          {/* —— CENTER: STRING PATH —— */}
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
              STRING CURRENT · OBSTRUCTION PATH
            </text>

            {/* Panel string row */}
            <g className="ssa-viz-string-row">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const x = 320 + i * 48;
                const shaded = i >= 3 && i <= 5;
                return (
                  <g key={i}>
                    <rect
                      x={x}
                      y="92"
                      width="40"
                      height="48"
                      rx="2"
                      fill={shaded ? "#0d0d0d" : "#0a0a0a"}
                      stroke={shaded ? "#666666" : "currentColor"}
                      strokeWidth={shaded ? 1 : 1.25}
                      className={shaded ? "ssa-viz-panel-shade" : "ssa-viz-panel"}
                    />
                    {shaded ? (
                      <rect
                        x={x}
                        y="92"
                        width="20"
                        height="48"
                        fill="url(#ssa-viz-hatch)"
                        opacity="0.85"
                      />
                    ) : null}
                    <path
                      d={`M ${x + 8} 108 L ${x + 32} 108 M ${x + 8} 118 L ${x + 32} 118 M ${x + 8} 128 L ${x + 32} 128`}
                      fill="none"
                      stroke={shaded ? "#555555" : "#444444"}
                      strokeWidth="1"
                    />
                  </g>
                );
              })}
            </g>
            <text
              x="320"
              y="158"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              clear modules
            </text>
            <text
              x="520"
              y="158"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              shaded · diodes ON
            </text>

            {/* Bypass diode markers */}
            <g className="ssa-viz-diode-node">
              <path
                d="M 472 168 L 472 188 L 560 188"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <path
                className="ssa-viz-shade-pulse"
                d="M 472 168 L 472 188 L 560 188"
                fill="none"
                stroke="url(#ssa-viz-pulse)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <polygon
                points="548,182 560,188 548,194"
                fill="currentColor"
              />
              <text
                className="ssa-viz-bypass-chip"
                x="480"
                y="182"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                BYPASS ~⅓
              </text>
            </g>

            {/* Loss stack bars */}
            <text
              x="320"
              y="220"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              DIRECT SHADE · 6.5%
            </text>
            <rect
              x="320"
              y="228"
              width="300"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ssa-viz-direct-bar"
              x="320"
              y="228"
              width="69"
              height="8"
              rx="2"
              fill="url(#ssa-viz-shade)"
            />

            <text
              x="320"
              y="258"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BYPASS DIODE · 6.7%
            </text>
            <rect
              x="320"
              y="266"
              width="300"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ssa-viz-bypass-bar"
              x="320"
              y="266"
              width="71"
              height="8"
              rx="2"
              fill="url(#ssa-viz-bar)"
            />

            <text
              x="320"
              y="296"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              MISMATCH DRAG · 15.0%
            </text>
            <rect
              x="320"
              y="304"
              width="300"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ssa-viz-mismatch-bar"
              x="320"
              y="304"
              width="159"
              height="8"
              rx="2"
              fill="url(#ssa-viz-bar)"
            />

            <text
              x="320"
              y="338"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              COMBINED PRODUCTION LOSS
            </text>
            <rect
              x="320"
              y="348"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ssa-viz-total-bar"
              x="320"
              y="348"
              width="254"
              height="14"
              rx="2"
              fill="url(#ssa-viz-bar)"
            />
            <text
              className="ssa-viz-loss-chip"
              x="480"
              y="388"
              textAnchor="middle"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              28.2% string loss
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ssa-viz-arrow)"
            />
            <path
              className="ssa-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#ssa-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="100"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="696"
              y="72"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL PRODUCTION LOSS
            </text>
            <text
              className="ssa-viz-output-value"
              x="696"
              y="112"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,895
            </text>
            <text
              x="696"
              y="132"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              kWh/yr · of 6,720 baseline
            </text>

            <rect
              x="680"
              y="164"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="190"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              FINANCIAL LOSS
            </text>
            <text
              className="ssa-viz-money-out"
              x="696"
              y="218"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $265/yr
            </text>

            <rect
              x="680"
              y="252"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="278"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOSS SHARE
            </text>
            <text
              className="ssa-viz-pct-out"
              x="696"
              y="306"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              28.2%
            </text>

            <rect
              x="680"
              y="340"
              width="244"
              height="68"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="364"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENGINEERING NOTE
            </text>
            <text
              className="ssa-viz-note-out"
              x="696"
              y="388"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Add optimizers · 2.3 yr PB
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
              className="ssa-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              direct 6.5% + bypass 6.7% + mismatch 15% → 28.2% · 6,720 × 0.282 =
              1,895 kWh
            </text>
          </g>

          <path
            className="ssa-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#ssa-viz-pulse)"
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
            one shaded module can cost the whole string · MLPE limits mismatch
          </text>
          <text
            className="ssa-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            4.8 kWp · $0.14/kWh
          </text>
        </svg>
      </div>
    </section>
  );
}
