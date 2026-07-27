"use client";

import { cn } from "@/lib/utils";

interface TwelveVTo120VInverterVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for 12V→120V Inverter Load Planner [VIZ].
 * Continuous & surge load vs inverter ratings → OK / Over + headroom %.
 * Sample: 2,000 / 4,000 W inverter · 1,400 / 2,800 W load → OK · 70% · 30% headroom.
 */
export function TwelveVTo120VInverterViz({
  className,
}: TwelveVTo120VInverterVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--12v-to-120v-inverter", className)}
      aria-label="12V to 120V inverter load planner visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">12V to 120V Inverter Load Planner</h3>
        <p className="tool-viz__subtitle">
          Continuous and surge loads must clear inverter ratings — motors and
          compressors spike on start even when steady watts look fine.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg twelve-v-to-120v-inverter-viz"
          role="img"
          aria-labelledby="vti-viz-title vti-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="vti-viz-title">
            12V to 120V inverter load planner animated flow diagram
          </title>
          <desc id="vti-viz-desc">
            Inverter continuous and surge ratings are compared against appliance
            continuous and surge loads. Sample: a 2000 watt continuous and 4000
            watt surge inverter with a 1400 watt continuous and 2800 watt surge
            load is OK at 70 percent of continuous rating with 30 percent
            headroom.
          </desc>

          <defs>
            <pattern
              id="vti-viz-grid"
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
              id="vti-viz-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#a3e635" />
            </marker>
            <linearGradient
              id="vti-viz-pulse"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
              <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="vti-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a3e635" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a3e635" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#vti-viz-grid)"
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
            x="350"
            y="48"
            fill="#888888"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.14em"
          >
            DC → AC PATH
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

          {/* —— INPUT: Inverter ratings —— */}
          <g>
            <rect
              x="40"
              y="72"
              width="230"
              height="160"
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
              INVERTER RATING
            </text>
            <text
              x="56"
              y="136"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,000 W
            </text>
            <text
              x="56"
              y="160"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              continuous
            </text>
            <text
              x="56"
              y="196"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              4,000 W surge
            </text>
            <text
              x="56"
              y="218"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              peak motor start
            </text>
          </g>

          {/* —— INPUT: Loads —— */}
          <g>
            <rect
              x="40"
              y="250"
              width="230"
              height="178"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="276"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              APPLIANCE LOAD
            </text>
            <text
              x="56"
              y="316"
              fill="#a3e635"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,400 W
            </text>
            <text
              x="56"
              y="340"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              continuous run
            </text>
            <text
              x="56"
              y="376"
              fill="#ededed"
              fontSize="18"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              2,800 W surge
            </text>
            <text
              x="56"
              y="404"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              compressor / pump start
            </text>
          </g>

          {/* —— Flow: inputs → mid —— */}
          <path
            d="M 270 152 L 320 152"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vti-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 152 L 320 152"
            fill="none"
            stroke="url(#vti-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 270 339 L 300 339 L 300 210 L 320 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vti-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 270 339 L 300 339 L 300 210 L 320 210"
            fill="none"
            stroke="url(#vti-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— FLOW: 12V → inverter → 120V —— */}
          <g>
            <rect
              x="330"
              y="72"
              width="300"
              height="168"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              12 V DC → 120 V AC
            </text>

            {/* Battery */}
            <g transform="translate(356, 130)">
              <rect
                x="0"
                y="8"
                width="40"
                height="48"
                rx="2"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <rect x="12" y="2" width="16" height="6" rx="1" fill="#a3e635" />
              <rect
                className="vti-viz-battery"
                x="4"
                y="14"
                width="32"
                height="36"
                rx="1"
                fill="url(#vti-viz-bar)"
              />
              <text
                x="20"
                y="72"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                12 V
              </text>
            </g>

            {/* Inverter box */}
            <g transform="translate(430, 128)">
              <rect
                className="vti-viz-inverter"
                x="0"
                y="0"
                width="80"
                height="56"
                rx="3"
                fill="#0a0a0a"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <text
                x="40"
                y="24"
                textAnchor="middle"
                fill="#a3e635"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                INV
              </text>
              <text
                x="40"
                y="42"
                textAnchor="middle"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                DC→AC
              </text>
            </g>

            {/* Outlet */}
            <g transform="translate(540, 136)">
              <rect
                x="0"
                y="0"
                width="44"
                height="40"
                rx="2"
                fill="none"
                stroke="#a3e635"
                strokeWidth="1.5"
              />
              <circle cx="14" cy="14" r="4" fill="none" stroke="#a3e635" strokeWidth="1.25" />
              <circle cx="30" cy="14" r="4" fill="none" stroke="#a3e635" strokeWidth="1.25" />
              <rect x="18" y="26" width="8" height="6" rx="1" fill="#a3e635" />
              <text
                x="22"
                y="58"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                120 V
              </text>
            </g>

            <path
              className="tool-viz-flow__pulse"
              d="M 400 154 L 426 154"
              fill="none"
              stroke="url(#vti-viz-pulse)"
              strokeWidth="2"
            />
            <path
              className="tool-viz-flow__pulse"
              d="M 514 154 L 536 154"
              fill="none"
              stroke="url(#vti-viz-pulse)"
              strokeWidth="2"
            />
          </g>

          {/* —— FLOW: Load vs limits —— */}
          <g>
            <rect
              x="330"
              y="258"
              width="300"
              height="170"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="346"
              y="284"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOAD vs LIMITS
            </text>

            <text
              x="346"
              y="316"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              continuous 1,400 / 2,000
            </text>
            <rect
              x="346"
              y="326"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="vti-viz-cont-bar"
              x="348"
              y="328"
              width="166"
              height="8"
              rx="1"
              fill="url(#vti-viz-bar)"
            />

            <text
              x="346"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              surge 2,800 / 4,000
            </text>
            <rect
              x="346"
              y="378"
              width="240"
              height="12"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="vti-viz-surge-bar"
              x="348"
              y="380"
              width="166"
              height="8"
              rx="1"
              fill="#555555"
            />

            <text
              x="346"
              y="412"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              conversion loss / sag separate
            </text>
          </g>

          {/* —— Flow mid → output —— */}
          <path
            d="M 630 156 L 680 156"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vti-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 156 L 680 156"
            fill="none"
            stroke="url(#vti-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 630 343 L 655 343 L 655 250 L 680 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#vti-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 630 343 L 655 343 L 655 250 L 680 250"
            fill="none"
            stroke="url(#vti-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="690"
              y="72"
              width="230"
              height="356"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="706"
              y="98"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOAD vs RATING
            </text>
            <text
              x="706"
              y="160"
              fill="#a3e635"
              fontSize="48"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="vti-viz-output-value"
            >
              OK
            </text>
            <text
              x="706"
              y="196"
              fill="#888888"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              continuous + surge clear
            </text>

            <text
              x="706"
              y="244"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              CONTINUOUS LOAD
            </text>
            <text
              x="706"
              y="280"
              fill="#a3e635"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              className="vti-viz-output-value"
            >
              70%
            </text>
            <rect
              x="706"
              y="296"
              width="198"
              height="10"
              rx="2"
              fill="#0a0a0a"
              stroke="#333333"
            />
            <rect
              className="vti-viz-pct-bar"
              x="708"
              y="298"
              width="136"
              height="6"
              rx="1"
              fill="url(#vti-viz-bar)"
            />

            <text
              x="706"
              y="344"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HEADROOM
            </text>
            <text
              x="706"
              y="380"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              30%
            </text>
            <text
              x="706"
              y="408"
              fill="#888888"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              surge OK · 2,800 ≤ 4,000
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
              load W ≤ continuous & surge → OK / Over + headroom %
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
              fill="#a3e635"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              1,400 / 2,000 · 2,800 / 4,000 → OK · 30%
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
