"use client";

import { cn } from "@/lib/utils";

interface EvChargingCableLossVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for EV Charging Cable Power Loss [VIZ].
 * Round-trip Cu R → P = I²R; energy = P × hours; % vs I×230 V.
 * Sample: 32 A · 10 m · 6 mm² · 6 h · $0.14 → 59.7 W · 0.358 kWh · $0.05.
 */
export function EvChargingCableLossViz({
  className,
}: EvChargingCableLossVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ev-charging-cable-loss", className)}
      aria-label="EV charging cable power loss visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">I²R Heat · Cable Waste</h3>
        <p className="tool-viz__subtitle">
          Sustained charge current through copper length and mm² creates
          resistive heat — energy you pay for that never reaches the pack.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ev-charging-cable-loss-viz"
          role="img"
          aria-labelledby="eccl-viz-title eccl-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="eccl-viz-title">
            EV charging cable I squared R power loss diagram
          </title>
          <desc id="eccl-viz-desc">
            Charging current, cable length, conductor cross-section, and charge
            hours determine round-trip resistance and I squared R heat loss.
            Sample: 32 amps through a 10 meter 6 square millimeter copper cable
            for 6 hours dissipates 59.7 watts, wastes 0.358 kilowatt-hours, and
            costs about 0.05 dollars at 0.14 dollars per kilowatt-hour.
          </desc>

          <defs>
            <pattern
              id="eccl-viz-grid"
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
              id="eccl-viz-arrow"
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
              id="eccl-viz-pulse"
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
              id="eccl-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="eccl-viz-heat"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#555555" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#eccl-viz-grid)"
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
              CHARGING CURRENT
            </text>
            <text
              className="eccl-viz-a-value"
              x="52"
              y="98"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              32 A
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
              CABLE LENGTH
            </text>
            <text
              className="eccl-viz-len-value"
              x="52"
              y="194"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 m
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
              CONDUCTOR SIZE
            </text>
            <text
              className="eccl-viz-mm-value"
              x="52"
              y="284"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 mm²
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
              CHARGE TIME
            </text>
            <text
              className="eccl-viz-hrs-value"
              x="52"
              y="374"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 hrs
            </text>
          </g>

          {/* —— FLOW —— */}
          <g>
            <path
              d="M 236 80 L 300 80 L 300 140"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#eccl-viz-arrow)"
            />
            <path
              className="eccl-viz-timeline-pulse"
              d="M 236 80 L 300 80 L 300 140"
              fill="none"
              stroke="url(#eccl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 236 174 L 280 174 L 280 180 L 300 180"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="eccl-viz-heat-pulse"
              d="M 236 174 L 280 174 L 280 180 L 300 180"
              fill="none"
              stroke="url(#eccl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.25s" }}
            />
            <path
              d="M 236 264 L 280 264 L 280 220 L 300 220"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              className="eccl-viz-heat-pulse"
              d="M 236 264 L 280 264 L 280 220 L 300 220"
              fill="none"
              stroke="url(#eccl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animationDelay: "0.5s" }}
            />
          </g>

          {/* —— CENTER: I²R PATH —— */}
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
              RESISTANCE · DISSIPATION PATH
            </text>

            {/* EVSE → cable → EV */}
            <g className="eccl-viz-evse-node">
              <rect
                x="320"
                y="92"
                width="64"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="#555555"
                strokeWidth="1"
              />
              <text
                x="352"
                y="112"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                EVSE
              </text>
              <text
                className="eccl-viz-a-chip"
                x="352"
                y="128"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                32 A
              </text>
            </g>

            {/* Thick cable with heat */}
            <path
              d="M 384 116 L 536 116"
              fill="none"
              stroke="#555555"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              className="eccl-viz-cable-pulse"
              d="M 384 116 L 536 116"
              fill="none"
              stroke="url(#eccl-viz-pulse)"
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
            >
              10 m · 6 mm² Cu
            </text>
            {/* Heat wisps */}
            <path
              className="eccl-viz-heat-wisp"
              d="M 420 108 L 424 96 M 460 108 L 464 94 M 500 108 L 504 96"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />

            <g className="eccl-viz-ev-node">
              <rect
                x="536"
                y="92"
                width="84"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="578"
                y="112"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                EV PACK
              </text>
              <text
                className="eccl-viz-pack-chip"
                x="578"
                y="128"
                textAnchor="middle"
                fill="#ededed"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                −59.7 W
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
              ROUND-TRIP R · 2 × (0.0175 × 10 ÷ 6)
            </text>
            <text
              className="eccl-viz-r-chip"
              x="480"
              y="196"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.0583 Ω
            </text>

            <text
              x="320"
              y="228"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              I²R POWER LOSS
            </text>
            <rect
              x="320"
              y="238"
              width="300"
              height="14"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="eccl-viz-loss-bar"
              x="320"
              y="238"
              width="120"
              height="14"
              rx="2"
              fill="url(#eccl-viz-bar)"
            />
            <text
              className="eccl-viz-w-chip"
              x="480"
              y="274"
              textAnchor="middle"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              32² × 0.0583 = 59.7 W
            </text>

            {/* Heat gauge */}
            <text
              x="320"
              y="304"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              HEAT VISUAL · vs 150 W SCALE
            </text>
            <rect
              x="320"
              y="314"
              width="24"
              height="70"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
              strokeWidth="1"
            />
            <rect
              className="eccl-viz-heat-fill"
              x="322"
              y="342"
              width="20"
              height="40"
              rx="1"
              fill="url(#eccl-viz-heat)"
            />

            <rect
              x="360"
              y="320"
              width="120"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="eccl-viz-pct-chip"
              x="420"
              y="343"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.81% of P
            </text>
            <rect
              x="500"
              y="320"
              width="120"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              className="eccl-viz-ref-chip"
              x="560"
              y="343"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              vs 32×230 V
            </text>

            <text
              x="360"
              y="388"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              warm plugs = upsize mm² or shorten
            </text>
          </g>

          {/* —— OUTPUTS —— */}
          <g>
            <path
              d="M 640 228 L 680 228"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#eccl-viz-arrow)"
            />
            <path
              className="eccl-viz-timeline-pulse"
              d="M 640 228 L 680 228"
              fill="none"
              stroke="url(#eccl-viz-pulse)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <rect
              x="680"
              y="48"
              width="244"
              height="110"
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
              CABLE POWER LOSS
            </text>
            <text
              className="eccl-viz-output-value"
              x="696"
              y="118"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              59.7 W
            </text>
            <text
              x="696"
              y="140"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              continuous I²R heat
            </text>

            <rect
              x="680"
              y="174"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="200"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ENERGY WASTE
            </text>
            <text
              className="eccl-viz-kwh-out"
              x="696"
              y="228"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.358 kWh
            </text>

            <rect
              x="680"
              y="262"
              width="244"
              height="72"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="696"
              y="288"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SESSION COST
            </text>
            <text
              className="eccl-viz-cost-out"
              x="696"
              y="316"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.05
            </text>

            <rect
              x="680"
              y="350"
              width="244"
              height="58"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              className="eccl-viz-eff-out"
              x="802"
              y="376"
              textAnchor="middle"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              0.81% loss of charge P
            </text>
            <text
              x="802"
              y="394"
              textAnchor="middle"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              6 mm² copper · $0.14/kWh
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
              className="eccl-viz-math-value"
              x="480"
              y="452"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              32² × 0.0583 Ω = 59.7 W × 6 h ÷ 1000 → 0.358 kWh · $0.05
            </text>
          </g>

          <path
            className="eccl-viz-timeline-pulse"
            d="M 56 500 L 880 500"
            fill="none"
            stroke="url(#eccl-viz-pulse)"
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
            Cu @ ~20 °C · round-trip L+N · avoid thin extensions at 32 A
          </text>
          <text
            className="eccl-viz-detail-value"
            x="880"
            y="528"
            textAnchor="end"
            fill="#ededed"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            ~60 Wh/h heat
          </text>
        </svg>
      </div>
    </section>
  );
}
