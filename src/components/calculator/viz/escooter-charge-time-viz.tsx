"use client";

import { cn } from "@/lib/utils";

interface EscooterChargeTimeVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Charge Time [VIZ].
 * hours = batteryWh / (V × A × efficiency).
 * Sample: 720 Wh · 48 V · 4 A · 88% → 192 W · 4h 16m (vs ~8h 31m at 2 A).
 */
export function EscooterChargeTimeViz({
  className,
}: EscooterChargeTimeVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-charge-time", className)}
      aria-label="E-scooter charge time visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Pack Charge Duration</h3>
        <p className="tool-viz__subtitle">
          Charger wattage replenishes pack watt-hours through an efficiency
          gate — higher amps shorten empty-to-full time on the same voltage.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-charge-time-viz"
          role="img"
          aria-labelledby="esct-viz-title esct-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esct-viz-title">
            E-scooter charge time animated flow diagram
          </title>
          <desc id="esct-viz-desc">
            Battery capacity, pack voltage, charger current, and charge
            efficiency determine charger wattage and empty-to-full duration.
            Sample: 720 watt-hours at 48 volts on a 4 amp charger at 88 percent
            efficiency yields 192 watts and about 4 hours 16 minutes, versus
            roughly 8 hours 31 minutes on a 2 amp stock brick.
          </desc>

          <defs>
            <pattern
              id="esct-viz-grid"
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
              id="esct-viz-arrow"
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
              id="esct-viz-pulse"
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
              id="esct-viz-fill"
              x1="0%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient
              id="esct-viz-power"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <clipPath id="esct-viz-pack-clip">
              <rect x="392" y="168" width="176" height="96" rx="3" />
            </clipPath>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#esct-viz-grid)"
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

          {/* —— INPUT: Battery capacity —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="110"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              BATTERY CAPACITY
            </text>
            <text
              className="esct-viz-wh-value"
              x="56"
              y="106"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              720 Wh
            </text>
            <text
              x="56"
              y="130"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              48 V × 15 Ah pack
            </text>
          </g>

          {/* —— INPUT: Pack voltage —— */}
          <g>
            <rect
              x="40"
              y="166"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="192"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              PACK VOLTAGE
            </text>
            <text
              className="esct-viz-v-value"
              x="56"
              y="228"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V
            </text>
            <text
              x="56"
              y="250"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              nominal bus voltage
            </text>
          </g>

          {/* —— INPUT: Advanced charger —— */}
          <g>
            <rect
              x="40"
              y="282"
              width="220"
              height="130"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="308"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHARGER · ADVANCED
            </text>
            <text
              className="esct-viz-a-value"
              x="56"
              y="344"
              fill="#ededed"
              fontSize="24"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4 A · 88%
            </text>
            <text
              x="56"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              current × efficiency
            </text>
            <text
              x="56"
              y="390"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              stock 2 A ≈ 2× longer
            </text>
          </g>

          {/* Flow: inputs → power transfer */}
          <path
            d="M 260 95 L 310 95"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esct-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 95 L 310 95"
            fill="none"
            stroke="url(#esct-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 216 L 290 216 L 290 160 L 310 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esct-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 216 L 290 216 L 290 160 L 310 160"
            fill="none"
            stroke="url(#esct-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 347 L 290 347 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esct-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 347 L 290 347 L 290 220 L 310 220"
            fill="none"
            stroke="url(#esct-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Power transfer path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="372"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="336"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              POWER TRANSFER · EMPTY → FULL
            </text>

            {/* Charger brick */}
            <g transform="translate(348, 90)">
              <rect
                className="esct-viz-charger"
                x="0"
                y="0"
                width="72"
                height="48"
                rx="3"
                fill="#0a0a0a"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x="36"
                y="22"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                BRICK
              </text>
              <text
                className="esct-viz-w-chip"
                x="36"
                y="38"
                textAnchor="middle"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                192 W
              </text>
            </g>

            {/* Cable path charger → pack */}
            <path
              d="M 420 114 L 470 114 L 470 216 L 392 216"
              fill="none"
              stroke="#333333"
              strokeWidth="1.5"
              markerEnd="url(#esct-viz-arrow)"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 420 114 L 470 114 L 470 216 L 392 216"
              fill="none"
              stroke="url(#esct-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Pack silhouette with rising fill */}
            <g>
              <rect
                x="388"
                y="164"
                width="184"
                height="104"
                rx="4"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1.5"
              />
              <rect
                x="572"
                y="196"
                width="12"
                height="40"
                rx="2"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1"
              />
              <g clipPath="url(#esct-viz-pack-clip)">
                <rect
                  className="esct-viz-pack-fill"
                  x="392"
                  y="168"
                  width="176"
                  height="96"
                  fill="url(#esct-viz-fill)"
                />
              </g>
              <text
                x="480"
                y="212"
                textAnchor="middle"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                720 Wh
              </text>
              <text
                x="480"
                y="232"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                SOC rising
              </text>
            </g>

            {/* Scooter line hint */}
            <g className="esct-viz-scooter" transform="translate(400, 290)">
              <line
                x1="20"
                y1="28"
                x2="140"
                y2="28"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <circle
                cx="40"
                cy="40"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="130"
                cy="40"
                r="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 40 28 L 70 8 L 110 8 L 130 28"
                fill="none"
                stroke="#555555"
                strokeWidth="1.25"
              />
              <rect
                x="78"
                y="4"
                width="28"
                height="14"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>

            {/* Math chip */}
            <rect
              x="344"
              y="348"
              width="292"
              height="48"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="360"
              y="368"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              EFFECTIVE CHARGE POWER
            </text>
            <text
              className="esct-viz-math-value"
              x="360"
              y="386"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              48 V × 4 A × 0.88 = 169 W into pack
            </text>
          </g>

          {/* Flow: transfer → output */}
          <path
            d="M 660 216 L 700 216"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esct-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 216 L 700 216"
            fill="none"
            stroke="url(#esct-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Charge duration —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="240"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CHARGE DURATION
            </text>
            <text
              className="esct-viz-output-value"
              x="726"
              y="118"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4h 16m
            </text>
            <text
              x="726"
              y="144"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              720 ÷ 168.96 W
            </text>
            <rect
              x="726"
              y="164"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="esct-viz-time-bar"
              x="726"
              y="164"
              width="162"
              height="12"
              rx="2"
              fill="url(#esct-viz-power)"
            />
            <text
              className="esct-viz-detail-value"
              x="726"
              y="204"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              empty → 100% SOC
            </text>
            <text
              x="726"
              y="228"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 4.26 hours total
            </text>
            <text
              x="726"
              y="252"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              taper may add minutes
            </text>
          </g>

          {/* —— Compare: 2 A stock —— */}
          <g>
            <rect
              x="710"
              y="296"
              width="210"
              height="116"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="322"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              VS STOCK 2 A
            </text>
            <text
              className="esct-viz-compare-value"
              x="726"
              y="358"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8h 31m
            </text>
            <rect
              x="726"
              y="376"
              width="162"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="esct-viz-compare-bar"
              x="726"
              y="376"
              width="162"
              height="8"
              rx="2"
              fill="url(#esct-viz-power)"
              opacity="0.55"
            />
            <text
              x="726"
              y="400"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              96 W brick · same pack
            </text>
          </g>

          {/* —— Footer: replenishment timeline —— */}
          <g>
            <rect
              x="40"
              y="432"
              width="880"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="458"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              REPLENISHMENT TIMELINE
            </text>
            <line
              x1="56"
              y1="482"
              x2="880"
              y2="482"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="esct-viz-tick"
              cx="56"
              cy="482"
              r="5"
              fill="currentColor"
            />
            <circle
              className="esct-viz-tick"
              cx="280"
              cy="482"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="esct-viz-tick"
              cx="520"
              cy="482"
              r="4"
              fill="currentColor"
              opacity="0.5"
            />
            <circle
              className="esct-viz-tick esct-viz-tick--end"
              cx="880"
              cy="482"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="esct-viz-timeline-pulse"
              d="M 56 482 L 880 482"
              fill="none"
              stroke="url(#esct-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="506"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              0% · plug in
            </text>
            <text
              x="520"
              y="506"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              Wh accumulate at ~169 W
            </text>
            <text
              className="esct-viz-detail-value"
              x="880"
              y="506"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              100% · 4h 16m
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
