"use client";

import { cn } from "@/lib/utils";

interface SolarBatteryBankVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Solar Battery Bank Size [VIZ].
 * (daily Wh × autonomy days) ÷ (DoD/100) → minimum bank Wh.
 * Sample: (3000 × 2) ÷ 0.80 = 7,500 Wh = 7.5 kWh (~625 Ah @ 12 V).
 */
export function SolarBatteryBankViz({ className }: SolarBatteryBankVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--solar-battery-bank", className)}
      aria-label="Solar battery bank size visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Solar Battery Bank Size</h3>
        <p className="tool-viz__subtitle">
          Daily use across autonomy days, divided by usable DoD, sets the
          minimum nameplate storage for cloudy-day reserve.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg solar-battery-bank-viz"
          role="img"
          aria-labelledby="sbb-viz-title sbb-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="sbb-viz-title">
            Solar battery bank size animated flow diagram
          </title>
          <desc id="sbb-viz-desc">
            Daily energy use multiplied by autonomy days and divided by depth of
            discharge yields minimum battery bank watt-hours. Sample: 3000
            watt-hours per day for 2 days at 80 percent DoD requires 7500
            watt-hours or 7.5 kilowatt-hours.
          </desc>

          <defs>
            <pattern
              id="sbb-viz-grid"
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
              id="sbb-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
            </marker>
            <linearGradient id="sbb-viz-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="sbb-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
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
            fill="url(#sbb-viz-grid)"
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
            STORAGE PATH
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

          {/* —— INPUT: Daily use —— */}
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
              DAILY ENERGY USE
            </text>
            <g transform="translate(56, 112)" fill="none" stroke="#ededed">
              <rect x="0" y="6" width="28" height="36" rx="2" strokeWidth="1.3" />
              <path
                d="M18 10 L10 26 H16 L12 40 L24 20 H18 Z"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="sbb-viz-bolt"
                fill="currentColor"
                fillOpacity="0.35"
              />
            </g>
            <text
              x="100"
              y="142"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3000 Wh
            </text>
            <text
              x="100"
              y="166"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              per day · off-grid loads
            </text>
          </g>

          {/* —— INPUT: Autonomy —— */}
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
              AUTONOMY DAYS
            </text>
            <g
              transform="translate(56, 252)"
              fill="none"
              stroke="#ededed"
              strokeWidth="1.3"
            >
              <rect x="0" y="4" width="32" height="32" rx="2" />
              <line x1="8" y1="4" x2="8" y2="0" />
              <line x1="24" y1="4" x2="24" y2="0" />
              <text
                x="16"
                y="26"
                fill="#ededed"
                stroke="none"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                textAnchor="middle"
                className="sbb-viz-days"
              >
                2
              </text>
            </g>
            <text
              x="100"
              y="276"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2 days
            </text>
            <text
              x="100"
              y="300"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              cloudy / no-sun reserve
            </text>
          </g>

          {/* —— INPUT: DoD —— */}
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
              USABLE DoD
            </text>
            <g transform="translate(56, 382)" stroke="#ededed" fill="none">
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
                className="sbb-viz-dod-fill"
                x="4"
                y="16"
                width="20"
                height="28"
                rx="1"
                fill="currentColor"
                fillOpacity="0.75"
                stroke="none"
              />
            </g>
            <text
              x="100"
              y="410"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              80%
            </text>
            <text
              x="100"
              y="434"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              LiFePO4 typical usable
            </text>
          </g>

          {/* Flow → process */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#sbb-viz-arrow)"
          >
            <path d="M 280 131 H 330 V 180 H 360" />
            <path d="M 280 265 H 330 V 230 H 360" />
            <path d="M 280 399 H 330 V 320 H 360" />
          </g>
          <g
            fill="none"
            stroke="url(#sbb-viz-pulse)"
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
              (Wh × DAYS) ÷ DoD
            </text>

            <rect
              x="376"
              y="120"
              width="228"
              height="64"
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
              STEP 1 · ENERGY RESERVE
            </text>
            <text
              x="388"
              y="168"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              3000 × 2 ={" "}
              <tspan fill="#ededed">6,000 Wh</tspan>
            </text>

            <rect
              x="376"
              y="200"
              width="228"
              height="64"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="222"
              fill="#555555"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              STEP 2 · DoD PROTECT
            </text>
            <text
              x="388"
              y="248"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              6,000 ÷ 0.80
            </text>

            {/* Bank stack */}
            <text
              x="376"
              y="292"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              BANK FILL (USABLE 80%)
            </text>
            <g transform="translate(400, 308)">
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${i * 56}, 0)`}>
                  <rect
                    x="0"
                    y="6"
                    width="44"
                    height="56"
                    rx="3"
                    fill="#0a0a0a"
                    stroke="#ededed"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="12"
                    y="1"
                    width="20"
                    height="6"
                    rx="1"
                    fill="#333333"
                  />
                  <rect
                    className="sbb-viz-cell-fill"
                    x="4"
                    y="18"
                    width="36"
                    height="40"
                    rx="1"
                    fill="url(#sbb-viz-fill)"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                </g>
              ))}
            </g>

            <text
              x="490"
              y="400"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              Wh_bank = (Wh × days) ÷ DoD
            </text>
            <text
              x="490"
              y="424"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              +20% for inverter / wiring losses
            </text>
            <text
              x="490"
              y="444"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              Ah = Wh ÷ system V
            </text>
          </g>

          {/* Flow → output */}
          <g
            fill="none"
            stroke="#333333"
            strokeWidth="1.25"
            strokeLinecap="round"
            markerEnd="url(#sbb-viz-arrow)"
          >
            <path d="M 620 265 H 700" />
          </g>
          <g
            fill="none"
            stroke="url(#sbb-viz-pulse)"
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
              y="130"
              width="220"
              height="270"
              rx="4"
              fill="#111111"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <text
              x="716"
              y="162"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              MIN. BANK SIZE
            </text>

            <text
              x="810"
              y="220"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              textAnchor="middle"
              className="sbb-viz-output-value"
            >
              7,500 Wh
            </text>
            <text
              x="810"
              y="252"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              = 7.5 kWh
            </text>
            <text
              x="810"
              y="290"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 625 Ah @ 12 V
            </text>
            <text
              x="810"
              y="312"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              ≈ 156 Ah @ 48 V
            </text>
            <text
              x="810"
              y="348"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              3000 Wh · 2 days · 80% DoD
            </text>
            <text
              x="810"
              y="368"
              fill="#555555"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              nameplate before losses
            </text>
          </g>

          <text
            x="48"
            y="528"
            fill="#555555"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            Bank Wh = (daily Wh × autonomy days) ÷ (DoD ÷ 100) · lead-acid often
            50% DoD
          </text>
        </svg>
      </div>
    </section>
  );
}
