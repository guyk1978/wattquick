"use client";

import { cn } from "@/lib/utils";

interface HeatPumpVsResistanceVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Heat Pump vs. Resistance Heat [VIZ].
 * resistanceKwh = kW × hrs × days; heatPumpKwh = resistance ÷ COP.
 * Sample: 5 kW · COP 3.5 · 6 h × 30 d · $0.14 → $126 vs $35.99 · save $90.01.
 */
export function HeatPumpVsResistanceViz({
  className,
}: HeatPumpVsResistanceVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--heat-pump-vs-resistance", className)}
      aria-label="Heat pump versus resistance heat visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">COP Multiplier · Cost Split</h3>
        <p className="tool-viz__subtitle">
          Same heating demand — resistance strips burn COP 1 watts while a heat
          pump multiplies heat delivered by COP, cutting kWh and bill share.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg heat-pump-vs-resistance-viz"
          role="img"
          aria-labelledby="hpvr-viz-title hpvr-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="hpvr-viz-title">
            Heat pump versus resistance heating cost comparison diagram
          </title>
          <desc id="hpvr-viz-desc">
            Heating demand times hours and days yields resistance kilowatt-hours
            at COP 1; dividing by heat pump COP yields heat pump kilowatt-hours.
            Sample: 5 kilowatts for 6 hours over 30 days at 14 cents per
            kilowatt-hour costs 126 dollars with resistance heat versus 35
            dollars 99 cents with a COP 3.5 heat pump, saving 90 dollars 1 cent
            or about 71 percent.
          </desc>

          <defs>
            <pattern
              id="hpvr-viz-grid"
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
              id="hpvr-viz-arrow"
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
              id="hpvr-viz-pulse"
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
              id="hpvr-viz-resist"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="hpvr-viz-hp"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="hpvr-viz-save"
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
            fill="url(#hpvr-viz-grid)"
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
              x="40"
              y="40"
              width="150"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              HEATING DEMAND
            </text>
            <text
              className="hpvr-viz-kw-value"
              x="56"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              5 kW
            </text>
          </g>

          <g>
            <rect
              x="206"
              y="40"
              width="150"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="222"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              HEAT PUMP COP
            </text>
            <text
              className="hpvr-viz-cop-value"
              x="222"
              y="100"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.5×
            </text>
          </g>

          <g>
            <rect
              x="372"
              y="40"
              width="150"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              USAGE WINDOW
            </text>
            <text
              className="hpvr-viz-hrs-value"
              x="388"
              y="100"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 h × 30 d
            </text>
          </g>

          <g>
            <rect
              x="538"
              y="40"
              width="142"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="554"
              y="64"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RATE
            </text>
            <text
              className="hpvr-viz-rate-value"
              x="554"
              y="100"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.14
            </text>
          </g>

          {/* Flow inputs → compare */}
          <path
            d="M 115 132 L 115 160 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hpvr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 115 132 L 115 160 L 360 160"
            fill="none"
            stroke="url(#hpvr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 281 132 L 281 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 281 132 L 281 160"
            fill="none"
            stroke="url(#hpvr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 447 132 L 447 160 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            d="M 609 132 L 609 160 L 360 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: Dual path —— */}
          <g>
            <rect
              x="40"
              y="180"
              width="640"
              height="216"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="206"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SAME HEAT DELIVERED · RESISTANCE COP 1 VS HEAT PUMP COP 3.5
            </text>

            {/* Resistance path */}
            <g transform="translate(56, 228)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                RESISTANCE STRIPS
              </text>
              <g className="hpvr-viz-resist-coil" transform="translate(0, 16)">
                <path
                  d="M 0 20 L 16 4 L 32 20 L 48 4 L 64 20 L 80 4 L 96 20"
                  fill="none"
                  stroke="#888888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="0"
                  y="28"
                  width="96"
                  height="8"
                  rx="1"
                  fill="none"
                  stroke="#444444"
                  strokeWidth="1.25"
                />
              </g>
              <text
                className="hpvr-viz-resist-kwh"
                x="0"
                y="72"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                900 kWh
              </text>
              <text
                x="0"
                y="92"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                5 × 6 × 30 · COP 1
              </text>
              <rect
                x="0"
                y="108"
                width="200"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="hpvr-viz-resist-bar"
                x="0"
                y="108"
                width="200"
                height="10"
                rx="2"
                fill="url(#hpvr-viz-resist)"
              />
              <text
                className="hpvr-viz-resist-cost"
                x="0"
                y="140"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $126.00
              </text>
            </g>

            {/* VS divider */}
            <text
              x="320"
              y="300"
              textAnchor="middle"
              fill="#555555"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              VS
            </text>

            {/* Heat pump path */}
            <g transform="translate(380, 228)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                HEAT PUMP CYCLE
              </text>
              <g className="hpvr-viz-hp-unit" transform="translate(0, 8)">
                <rect
                  x="0"
                  y="0"
                  width="72"
                  height="48"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle
                  className="hpvr-viz-fan"
                  cx="36"
                  cy="24"
                  r="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  className="hpvr-viz-fan"
                  d="M 36 24 L 36 14 M 36 24 L 45 29 M 36 24 L 27 29"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                {/* Ambient → heat move arrows */}
                <path
                  className="hpvr-viz-heat-flow"
                  d="M 84 12 L 120 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#hpvr-viz-arrow)"
                />
                <path
                  className="hpvr-viz-heat-flow hpvr-viz-heat-flow--delay"
                  d="M 84 28 L 120 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#hpvr-viz-arrow)"
                  opacity="0.7"
                />
                <path
                  className="hpvr-viz-heat-flow"
                  d="M 84 44 L 120 44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#hpvr-viz-arrow)"
                  opacity="0.45"
                />
                <text
                  x="128"
                  y="30"
                  fill="#888888"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                >
                  move heat · ×3.5
                </text>
              </g>
              <text
                className="hpvr-viz-hp-kwh"
                x="0"
                y="88"
                fill="#ededed"
                fontSize="16"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                257.1 kWh
              </text>
              <text
                x="0"
                y="108"
                fill="#888888"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                900 ÷ 3.5
              </text>
              <rect
                x="0"
                y="120"
                width="72"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="hpvr-viz-hp-bar"
                x="0"
                y="120"
                width="72"
                height="10"
                rx="2"
                fill="url(#hpvr-viz-hp)"
              />
              <text
                className="hpvr-viz-hp-cost"
                x="88"
                y="129"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                $35.99
              </text>
            </g>

            {/* Formula chip */}
            <rect
              x="240"
              y="352"
              width="240"
              height="28"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="hpvr-viz-math-value"
              x="360"
              y="371"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              HP kWh = resistance kWh ÷ COP
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hpvr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#hpvr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#hpvr-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#hpvr-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Savings —— */}
          <g>
            <rect
              x="700"
              y="40"
              width="220"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ESTIMATED SAVINGS
            </text>
            <text
              className="hpvr-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $90.01
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $126.00 − $35.99
            </text>
            <rect
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="hpvr-viz-save-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#hpvr-viz-save)"
            />
            <text
              className="hpvr-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              71% less energy
            </text>
          </g>

          {/* —— OUTPUT: Cost pair —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="140"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="716"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COST COMPARISON
            </text>
            <text
              className="hpvr-viz-resist-out"
              x="716"
              y="314"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Resist $126.00
            </text>
            <text
              className="hpvr-viz-hp-out"
              x="716"
              y="338"
              fill="#ededed"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              Heat pump $35.99
            </text>
            <text
              className="hpvr-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              900 vs 257.1 kWh
            </text>
          </g>

          {/* —— Footer timeline —— */}
          <g>
            <rect
              x="40"
              y="420"
              width="880"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="448"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              EFFICIENCY AT A GLANCE · SAME THERMAL OUTPUT
            </text>

            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="hpvr-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="hpvr-viz-tick"
              cx="360"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="hpvr-viz-tick hpvr-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="hpvr-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#hpvr-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <text
              x="56"
              y="504"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              COP 1 · full bill
            </text>
            <text
              x="360"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              COP 3.5 · ~1/3.5 input
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $90.01 saved · 71%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
