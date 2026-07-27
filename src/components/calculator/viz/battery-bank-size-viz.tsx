"use client";

import { cn } from "@/lib/utils";

interface BatteryBankSizeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Battery Bank Size (Ah) [VIZ] tab.
 * Load W × hours → Wh ÷ voltage → required Ah (+ safety margin note).
 * Sample: 500 W × 8 h = 4,000 Wh ÷ 12 V ≈ 333 Ah.
 */
export function BatteryBankSizeViz({ className }: BatteryBankSizeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--battery-bank-size", className)}
      aria-label="Battery bank size visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Battery Bank Size (Ah)</h3>
        <p className="tool-viz__subtitle">
          Load power over the required runtime becomes watt-hours, then divides
          by system voltage to size the bank in amp-hours.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg battery-bank-size-viz"
          role="img"
          aria-labelledby="bbs-viz-title bbs-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="bbs-viz-title">
            Battery bank size animated flow diagram
          </title>
          <desc id="bbs-viz-desc">
            Load power in watts multiplied by runtime in hours yields energy in
            watt-hours, then divided by system voltage to size the battery bank
            in amp-hours. Sample: 500 watts for 8 hours at 12 volts needs about
            333 amp-hours before safety margin.
          </desc>

          <defs>
            <pattern
              id="bbs-viz-grid"
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
              id="bbs-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient id="bbs-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="bbs-viz-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#bbs-viz-grid)"
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
            x="370"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            ENERGY → Ah
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

          {/* —— INPUT: Load power —— */}
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
              LOAD POWER
            </text>
            <g transform="translate(56, 112)" fill="none" stroke="#ededed">
              <rect x="0" y="6" width="28" height="36" rx="2" strokeWidth="1.3" />
              <path
                d="M18 10 L10 26 H16 L12 40 L24 20 H18 Z"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="bbs-viz-load-bolt"
                fill="currentColor"
                fillOpacity="0.35"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 W
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous demand
            </text>
          </g>

          {/* —— INPUT: Runtime —— */}
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
              RUNTIME NEEDED
            </text>
            <g
              transform="translate(56, 248)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <circle cx="14" cy="22" r="16" />
              <g className="bbs-viz-clock-hand">
                <line
                  x1="14"
                  y1="22"
                  x2="14"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <line x1="14" y1="22" x2="22" y2="26" strokeLinecap="round" />
            </g>
            <text
              x="100"
              y="276"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 hrs
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              autonomy target
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
                fill="#ededed"
                stroke="none"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="bbs-viz-v-pulse"
              >
                V
              </text>
            </g>
            <text
              x="100"
              y="410"
              fill="#ededed"
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
              DC bus / bank nominal
            </text>
          </g>

          {/* Flow inputs → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#bbs-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#bbs-viz-pulse)"
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
              W × h → Wh ÷ V
            </text>

            <rect
              x="376"
              y="120"
              width="228"
              height="72"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="142"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 1 · ENERGY NEED
            </text>
            <text
              x="388"
              y="168"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              500 W × 8 h
            </text>
            <text
              x="388"
              y="188"
              fill="#ededed"
              fontSize="16"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="bbs-viz-output-value"
            >
              = 4,000 Wh
            </text>

            <rect
              x="376"
              y="208"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="230"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · CONVERT Ah
            </text>
            <text
              x="388"
              y="256"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              4,000 Wh ÷ 12 V
            </text>

            {/* Capacity grow bar */}
            <text
              x="376"
              y="300"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BANK CAPACITY BUILD
            </text>
            <rect
              x="376"
              y="312"
              width="228"
              height="16"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="bbs-viz-capacity-bar"
              x="378"
              y="314"
              width="224"
              height="12"
              rx="1"
              fill="url(#bbs-viz-fill)"
            />

            {/* Bank cell row glyph */}
            <g transform="translate(388, 348)" fill="none" stroke="#ededed">
              {[0, 1, 2, 3].map((i) => (
                <g key={i} transform={`translate(${i * 48}, 0)`}>
                  <rect
                    x="0"
                    y="6"
                    width="36"
                    height="28"
                    rx="2"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="10"
                    y="1"
                    width="16"
                    height="5"
                    rx="1"
                    fill="#333333"
                    stroke="none"
                  />
                  <rect
                    className="bbs-viz-cell-fill"
                    x="4"
                    y="12"
                    width="28"
                    height="18"
                    rx="1"
                    fill="currentColor"
                    fillOpacity="0.55"
                    stroke="none"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </g>
              ))}
            </g>

            <text
              x="490"
              y="410"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              Ah = (W × hrs) ÷ V
            </text>
            <text
              x="490"
              y="434"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ×1.2–1.5 for inverter / DoD / aging
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#bbs-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#bbs-viz-pulse)"
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
              stroke="currentColor"
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
              REQUIRED CAPACITY
            </text>

            <text
              x="810"
              y="240"
              fill="#ededed"
              fontSize="34"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="bbs-viz-output-value"
            >
              333 Ah
            </text>
            <text
              x="810"
              y="272"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ideal nameplate
            </text>
            <text
              x="810"
              y="310"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ~400–500 Ah
            </text>
            <text
              x="810"
              y="332"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              with 1.2–1.5× margin
            </text>
            <text
              x="810"
              y="360"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              4,000 Wh @ 12 V
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Ah = (load W × runtime hrs) ÷ system V · derate for inverter, DoD &amp;
            temperature
          </text>
        </svg>
      </div>
    </section>
  );
}
