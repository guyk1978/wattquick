"use client";

import { cn } from "@/lib/utils";

interface AcInverterSavingsVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for AC Efficiency & Inverter Savings [VIZ].
 * On/off watts × duty; inverter = on/off × (1 − savings%); payback = premium ÷ $/mo.
 * Sample: 1.5 HP · 8 h · $0.14 · 35% · $300 premium → $3.72/mo · ~6 yr 8.6 mo.
 */
export function AcInverterSavingsViz({ className }: AcInverterSavingsVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--ac-inverter-savings", className)}
      aria-label="AC efficiency and inverter savings visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Modulate · Save · Pay Back</h3>
        <p className="tool-viz__subtitle">
          Fixed-speed compressors slam full power then idle — inverters hold a
          smooth load band, cutting monthly kWh until the purchase premium is
          recovered.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg ac-inverter-savings-viz"
          role="img"
          aria-labelledby="acis-viz-title acis-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="acis-viz-title">
            AC inverter versus on/off efficiency and payback diagram
          </title>
          <desc id="acis-viz-desc">
            Air conditioner capacity converts to average watts for on/off and
            inverter modes; monthly kilowatt-hours and costs compare, then
            purchase premium divided by monthly savings yields payback. Sample:
            1.5 horsepower unit running eight hours per day at fourteen cents
            per kilowatt-hour with thirty-five percent inverter savings and a
            three hundred dollar premium saves three dollars seventy-two cents
            per month with about six years eight point six months payback.
          </desc>

          <defs>
            <pattern
              id="acis-viz-grid"
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
              id="acis-viz-arrow"
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
              id="acis-viz-pulse"
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
              id="acis-viz-onoff"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="acis-viz-inv"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="acis-viz-save"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#acis-viz-grid)"
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
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              CAPACITY
            </text>
            <text
              className="acis-viz-cap-value"
              x="56"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.5 HP
            </text>
          </g>

          <g>
            <rect
              x="206"
              y="40"
              width="150"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="222"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              RUN HOURS
            </text>
            <text
              className="acis-viz-hrs-value"
              x="222"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 h/d
            </text>
          </g>

          <g>
            <rect
              x="372"
              y="40"
              width="150"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="388"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              INVERTER SAVE
            </text>
            <text
              className="acis-viz-pct-value"
              x="388"
              y="98"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              35%
            </text>
          </g>

          <g>
            <rect
              x="538"
              y="40"
              width="142"
              height="88"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="554"
              y="62"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.08em"
            >
              PREMIUM
            </text>
            <text
              className="acis-viz-prem-value"
              x="554"
              y="98"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $300
            </text>
          </g>

          {/* Flow → compare */}
          <path
            d="M 115 128 L 115 156 L 360 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#acis-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 115 128 L 115 156 L 360 156"
            fill="none"
            stroke="url(#acis-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 281 128 L 281 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 281 128 L 281 156"
            fill="none"
            stroke="url(#acis-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 447 128 L 447 156 L 360 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            d="M 609 128 L 609 156 L 360 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />

          {/* —— CENTER: On/off vs inverter —— */}
          <g>
            <rect
              x="40"
              y="176"
              width="640"
              height="220"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="202"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              COMPRESSOR PROFILE · 13,500 BTU/H · $0.14/KWH
            </text>

            {/* On/off square wave */}
            <g transform="translate(56, 224)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                ON/OFF CYCLING
              </text>
              <path
                className="acis-viz-square"
                d="M 0 48 L 0 16 L 28 16 L 28 48 L 56 48 L 56 16 L 84 16 L 84 48 L 112 48 L 112 16 L 140 16 L 140 48"
                fill="none"
                stroke="#888888"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <text
                className="acis-viz-onoff-w"
                x="0"
                y="72"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ~317 W avg
              </text>
              <rect
                x="0"
                y="88"
                width="160"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="acis-viz-onoff-bar"
                x="0"
                y="88"
                width="160"
                height="10"
                rx="2"
                fill="url(#acis-viz-onoff)"
              />
              <text
                className="acis-viz-onoff-cost"
                x="0"
                y="120"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                76 kWh · $10.64/mo
              </text>
            </g>

            <text
              x="280"
              y="290"
              textAnchor="middle"
              fill="#555555"
              fontSize="14"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              VS
            </text>

            {/* Inverter smooth modulate */}
            <g transform="translate(340, 224)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                INVERTER MODULATE
              </text>
              <path
                className="acis-viz-sine"
                d="M 0 40 Q 20 18 40 32 T 80 32 T 120 32 T 160 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
              <g className="acis-viz-unit" transform="translate(180, 8)">
                <rect
                  x="0"
                  y="0"
                  width="56"
                  height="48"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle
                  className="acis-viz-fan"
                  cx="28"
                  cy="24"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  className="acis-viz-fan"
                  d="M 28 24 L 28 15 M 28 24 L 36 28 M 28 24 L 20 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </g>
              <text
                className="acis-viz-inv-w"
                x="0"
                y="72"
                fill="#ededed"
                fontSize="14"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                ~206 W avg
              </text>
              <rect
                x="0"
                y="88"
                width="104"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="acis-viz-inv-bar"
                x="0"
                y="88"
                width="104"
                height="10"
                rx="2"
                fill="url(#acis-viz-inv)"
              />
              <text
                className="acis-viz-inv-cost"
                x="0"
                y="120"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                49.4 kWh · $6.92/mo
              </text>
            </g>

            <rect
              x="200"
              y="356"
              width="280"
              height="28"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="acis-viz-math-value"
              x="340"
              y="375"
              textAnchor="middle"
              fill="#ededed"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $300 premium ÷ $3.72/mo = payback
            </text>
          </g>

          {/* Flow → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#acis-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#acis-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#acis-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#acis-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Payback —— */}
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
              PAYBACK PERIOD
            </text>
            <text
              className="acis-viz-output-value"
              x="716"
              y="108"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              6 yr 8.6 mo
            </text>
            <text
              x="716"
              y="134"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ≈ 80.6 months · 2,455 d
            </text>
            <rect
              x="716"
              y="154"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="acis-viz-pay-bar"
              x="716"
              y="154"
              width="172"
              height="10"
              rx="2"
              fill="url(#acis-viz-save)"
            />
            <text
              className="acis-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              $950 − $650 premium
            </text>
          </g>

          {/* —— OUTPUT: Monthly savings —— */}
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
              MONTHLY SAVINGS
            </text>
            <text
              className="acis-viz-save-out"
              x="716"
              y="318"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $3.72
            </text>
            <rect
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="acis-viz-save-bar"
              x="716"
              y="336"
              width="172"
              height="10"
              rx="2"
              fill="url(#acis-viz-inv)"
            />
            <text
              className="acis-viz-detail-value"
              x="716"
              y="372"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              26.6 kWh · $44.64/yr
            </text>
          </g>

          {/* —— Footer —— */}
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
              PAYBACK CLOCK · PREMIUM RECOVERY
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
              className="acis-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="acis-viz-tick"
              cx="320"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.75"
            />
            <circle
              className="acis-viz-tick"
              cx="560"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="acis-viz-tick acis-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="acis-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#acis-viz-pulse)"
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
              buy · +$300
            </text>
            <text
              x="320"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              yr 2 · ~$89 saved
            </text>
            <text
              x="560"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              yr 4 · ~$178
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~6.7 yr · premium paid
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
