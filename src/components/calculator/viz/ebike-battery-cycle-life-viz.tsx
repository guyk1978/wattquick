"use client";

import { cn } from "@/lib/utils";

interface EbikeBatteryCycleLifeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Bike Battery Cycle Life [VIZ].
 * Expected cycles ≈ k × DoD⁻¹·⁵; remaining = expected − completed.
 * Sample: 250 cycles · 80% DoD · k=1,750 · 700 mfr → 2,446 total ·
 * 2,196 remaining · 10.2% used · 450 to 80% SOH spec.
 */
export function EbikeBatteryCycleLifeViz({
  className,
}: EbikeBatteryCycleLifeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ebike-battery-cycle-life", className)}
      aria-label="E-bike battery cycle life visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">DoD · Cycle Wear Curve</h3>
        <p className="tool-viz__subtitle">
          Deeper average discharge shortens lithium cycle life — the k × DoD⁻¹·⁵
          model maps completed rides to remaining cycles before SOH fade.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ebike-battery-cycle-life-viz"
          role="img"
          aria-labelledby="ebcl-viz-title ebcl-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="ebcl-viz-title">
            E-bike battery cycle life and depth of discharge diagram
          </title>
          <desc id="ebcl-viz-desc">
            Cycles completed, average depth of discharge, chemistry constant,
            and manufacturer rated cycles estimate remaining model life.
            Sample: 250 cycles at 80 percent DoD with k equals 1,750 yields
            about 2,446 expected cycles, 2,196 remaining, 10.2 percent life
            used, and 450 cycles left to the manufacturer 80 percent SOH rating.
          </desc>

          <defs>
            <pattern
              id="ebcl-viz-grid"
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
              id="ebcl-viz-arrow"
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
              id="ebcl-viz-pulse"
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
              id="ebcl-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="ebcl-viz-fade"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#555555" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#ebcl-viz-grid)"
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
              CYCLES COMPLETED
            </text>
            <text
              className="ebcl-viz-n-value"
              x="52"
              y="92"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              250
            </text>

            <rect
              x="36"
              y="126"
              width="200"
              height="78"
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
              AVG DEPTH OF DISCHARGE
            </text>
            <text
              className="ebcl-viz-dod-value"
              x="52"
              y="182"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80%
            </text>

            <rect
              x="36"
              y="216"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="238"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHEMISTRY k
            </text>
            <text
              className="ebcl-viz-k-value"
              x="52"
              y="272"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,750
            </text>

            <rect
              x="36"
              y="306"
              width="200"
              height="78"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="52"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MFR RATED · SOH
            </text>
            <text
              className="ebcl-viz-mfr-value"
              x="52"
              y="362"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              700 · 80%
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 75 L 300 75 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ebcl-viz-arrow)"
            />
            <path
              className="ebcl-viz-timeline-pulse"
              d="M 236 75 L 300 75 L 300 140"
              fill="none"
              stroke="url(#ebcl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 165 L 280 165 L 280 180 L 300 180"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="ebcl-viz-wear-pulse"
              d="M 236 165 L 280 165 L 280 180 L 300 180"
              fill="none"
              stroke="url(#ebcl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.25s" }}
            />
            <path
              d="M 236 255 L 280 255 L 280 220 L 300 220"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="ebcl-viz-wear-pulse"
              d="M 236 255 L 280 255 L 280 220 L 300 220"
              fill="none"
              stroke="url(#ebcl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.5s" }}
            />
          </g>

          {/* —— CENTER: DEGRADATION PATH —— */}
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
              CAPACITY RETENTION PATH
            </text>

            {/* DoD vs life curve (schematic) */}
            <path
              d="M 330 150 L 330 340 L 620 340"
              fill="none"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="330"
              y="142"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              cycles
            </text>
            <text
              x="620"
              y="358"
              textAnchor="end"
              fill="#666666"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              DoD →
            </text>

            {/* Inverse power curve: shallow DoD = high cycles */}
            <path
              className="ebcl-viz-curve"
              d="M 350 170 C 420 175, 480 210, 520 260 S 590 330, 610 335"
              fill="none"
              stroke="#555555"
              strokeWidth="1.5"
            />
            <path
              className="ebcl-viz-curve-pulse"
              d="M 350 170 C 420 175, 480 210, 520 260 S 590 330, 610 335"
              fill="none"
              stroke="url(#ebcl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Op point at 80% DoD */}
            <circle
              className="ebcl-viz-op-dot"
              cx="560"
              cy="300"
              r="6"
              fill="currentColor"
            />
            <rect
              x="480"
              y="268"
              width="100"
              height="24"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="ebcl-viz-op-chip"
              x="530"
              y="284"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80% DoD
            </text>

            <text
              x="340"
              y="188"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              50% DoD ≈ 4,950
            </text>
            <text
              x="540"
              y="330"
              fill="#888888"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              90% ≈ 2,050
            </text>

            <text
              x="320"
              y="372"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              MODEL LIFE USED · 250 / 2,446
            </text>
            <rect
              x="320"
              y="382"
              width="300"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="ebcl-viz-used-bar"
              x="320"
              y="382"
              width="31"
              height="10"
              rx="2"
              fill="url(#ebcl-viz-bar)"
            />
          </g>

          {/* Formula chips in center upper */}
          <g>
            <rect
              x="400"
              y="88"
              width="220"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="ebcl-viz-formula-chip"
              x="510"
              y="111"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              k × DoD⁻¹·⁵ = 2,446
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#ebcl-viz-arrow)"
            />
            <path
              className="ebcl-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#ebcl-viz-pulse)"
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
              y="74"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              REMAINING CYCLES (MODEL)
            </text>
            <text
              className="ebcl-viz-output-value"
              x="696"
              y="118"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,196
            </text>
            <text
              x="696"
              y="136"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              cycles left
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
              EXPECTED TOTAL LIFE
            </text>
            <text
              className="ebcl-viz-total-out"
              x="696"
              y="218"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,446 cycles
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
              LIFE USED
            </text>
            <text
              className="ebcl-viz-used-out"
              x="696"
              y="306"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10.2%
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
              TO 80% SOH SPEC
            </text>
            <text
              className="ebcl-viz-soh-out"
              x="696"
              y="390"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              450 cycles · mfr 700
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
              className="ebcl-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              1,750 × (0.80)⁻¹·⁵ ≈ 2,446 · remaining = 2,446 − 250 = 2,196
            </text>
          </g>

          <path
            className="ebcl-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#ebcl-viz-pulse)"
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
            shallower DoD extends life · 50% vs 90% ≈ 2.4× more cycles
          </text>
          <text
            className="ebcl-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            k=1,750 Li-ion
          </text>
        </svg>
      </div>
    </section>
  );
}
