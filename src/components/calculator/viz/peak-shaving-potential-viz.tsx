"use client";

import { cn } from "@/lib/utils";

interface PeakShavingPotentialVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for Peak Shaving Potential [VIZ].
 * Savings = (peak−offPeak rate) × (peakKwh × shift%).
 * Sample: 420/680 kWh · $0.38/$0.11 · 40% → 168 kWh shifted · $45.36/mo · $544/yr.
 */
export function PeakShavingPotentialViz({
  className,
}: PeakShavingPotentialVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--peak-shaving-potential", className)}
      aria-label="Peak shaving potential visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Peak Shaving Potential</h3>
        <p className="tool-viz__subtitle">
          Move a share of expensive on-peak kilowatt-hours into cheap off-peak
          windows — the rate spread times shifted kWh is your monthly savings.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg peak-shaving-potential-viz"
          role="img"
          aria-labelledby="psp-viz-title psp-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="psp-viz-title">
            Peak shaving potential animated flow diagram
          </title>
          <desc id="psp-viz-desc">
            Peak and off-peak kilowatt-hours, rates, and shiftable percent
            determine monthly savings. Sample: 420 peak and 680 off-peak
            kilowatt-hours at 38 and 11 cents with 40 percent shift moves 168
            kilowatt-hours and saves 45 dollars and 36 cents monthly, or 544
            dollars yearly.
          </desc>

          <defs>
            <pattern
              id="psp-viz-grid"
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
              id="psp-viz-arrow"
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
              id="psp-viz-pulse"
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
              id="psp-viz-bar"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="psp-viz-peak"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#888888" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="960" height="560" fill="#0a0a0a" />
          <rect
            x="1"
            y="1"
            width="958"
            height="558"
            fill="url(#psp-viz-grid)"
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

          {/* —— INPUT: Peak / off-peak kWh —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="130"
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
              PEAK / OFF-PEAK kWh
            </text>
            <text
              className="psp-viz-peak-value"
              x="56"
              y="100"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              420 peak
            </text>
            <text
              className="psp-viz-off-value"
              x="56"
              y="128"
              fill="#ededed"
              fontSize="22"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              680 off-pk
            </text>
            <text
              x="56"
              y="152"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              kWh / month
            </text>
          </g>

          {/* —— INPUT: Rates —— */}
          <g>
            <rect
              x="40"
              y="186"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="212"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              TOU RATES
            </text>
            <text
              className="psp-viz-rate-value"
              x="56"
              y="246"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $0.38 / $0.11
            </text>
            <text
              x="56"
              y="268"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              peak · off-peak $/kWh
            </text>
          </g>

          {/* —— INPUT: Shift % —— */}
          <g>
            <rect
              x="40"
              y="302"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="328"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              LOAD SHIFT %
            </text>
            <text
              className="psp-viz-shift-value"
              x="56"
              y="364"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              40%
            </text>
            <text
              x="56"
              y="386"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              of peak load shiftable
            </text>
          </g>

          {/* Flow → shift path */}
          <path
            d="M 260 105 L 310 105"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#psp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 105 L 310 105"
            fill="none"
            stroke="url(#psp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 236 L 290 236 L 290 160 L 310 160"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#psp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 236 L 290 236 L 290 160 L 310 160"
            fill="none"
            stroke="url(#psp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 352 L 290 352 L 290 220 L 310 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#psp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 352 L 290 352 L 290 220 L 310 220"
            fill="none"
            stroke="url(#psp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Load shift path —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="340"
              height="362"
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
              LOAD-SHIFT · RATE DIFFERENTIAL
            </text>

            {/* Before bars */}
            <g transform="translate(348, 88)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                BEFORE
              </text>
              <text
                x="0"
                y="28"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                peak
              </text>
              <rect
                x="48"
                y="18"
                width="220"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="psp-viz-before-peak"
                x="48"
                y="18"
                width="140"
                height="12"
                rx="2"
                fill="url(#psp-viz-peak)"
              />
              <text
                x="0"
                y="56"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                off
              </text>
              <rect
                x="48"
                y="46"
                width="220"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="psp-viz-before-off"
                x="48"
                y="46"
                width="180"
                height="12"
                rx="2"
                fill="url(#psp-viz-bar)"
                opacity="0.55"
              />
            </g>

            {/* Shift arrow */}
            <g className="psp-viz-shift-arrow" transform="translate(470, 168)">
              <path
                d="M 20 0 L 20 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                markerEnd="url(#psp-viz-arrow)"
              />
              <text
                x="40"
                y="18"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                shift 168 kWh (40%)
              </text>
            </g>

            {/* After bars */}
            <g transform="translate(348, 212)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em"
              >
                AFTER
              </text>
              <text
                x="0"
                y="28"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                peak
              </text>
              <rect
                x="48"
                y="18"
                width="220"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="psp-viz-after-peak"
                x="48"
                y="18"
                width="84"
                height="12"
                rx="2"
                fill="url(#psp-viz-peak)"
              />
              <text
                x="0"
                y="56"
                fill="#888888"
                fontSize="9"
                fontFamily="ui-monospace, monospace"
              >
                off
              </text>
              <rect
                x="48"
                y="46"
                width="220"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="psp-viz-after-off"
                x="48"
                y="46"
                width="220"
                height="12"
                rx="2"
                fill="url(#psp-viz-bar)"
              />
            </g>

            {/* Math */}
            <rect
              x="348"
              y="300"
              width="284"
              height="80"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              x="364"
              y="324"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              BILL DELTA
            </text>
            <text
              className="psp-viz-math-value"
              x="364"
              y="348"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $234.40 → $189.04
            </text>
            <text
              x="364"
              y="368"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              spread $0.27 × 168 kWh
            </text>
          </g>

          {/* Flow → output */}
          <path
            d="M 660 220 L 700 220"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#psp-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 660 220 L 700 220"
            fill="none"
            stroke="url(#psp-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT —— */}
          <g>
            <rect
              x="710"
              y="40"
              width="210"
              height="200"
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
              MONTHLY SAVINGS
            </text>
            <text
              className="psp-viz-output-value"
              x="726"
              y="118"
              fill="#ededed"
              fontSize="30"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $45.36
            </text>
            <text
              x="726"
              y="146"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              TOU bill reduction
            </text>
            <rect
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="psp-viz-save-bar"
              x="726"
              y="166"
              width="162"
              height="12"
              rx="2"
              fill="url(#psp-viz-bar)"
            />
            <text
              className="psp-viz-detail-value"
              x="726"
              y="204"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              168 kWh shifted
            </text>
            <text
              x="726"
              y="224"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              EV · laundry · pumps
            </text>
          </g>

          <g>
            <rect
              x="710"
              y="256"
              width="210"
              height="146"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="726"
              y="282"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              ANNUAL SAVINGS
            </text>
            <text
              className="psp-viz-year-value"
              x="726"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              $544/yr
            </text>
            <text
              x="726"
              y="350"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              $45.36 × 12
            </text>
            <rect
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="psp-viz-year-bar"
              x="726"
              y="368"
              width="162"
              height="10"
              rx="2"
              fill="url(#psp-viz-bar)"
            />
          </g>

          {/* —— Footer —— */}
          <g>
            <rect
              x="40"
              y="428"
              width="880"
              height="92"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="454"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              DAY PROFILE · PEAK → OFF-PEAK
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
              className="psp-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="psp-viz-tick"
              cx="280"
              cy="478"
              r="4"
              fill="#888888"
              opacity="0.7"
            />
            <circle
              className="psp-viz-tick"
              cx="520"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="psp-viz-tick psp-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="psp-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#psp-viz-pulse)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="502"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              overnight off-peak
            </text>
            <text
              x="400"
              y="502"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              peak window · shift loads left
            </text>
            <text
              className="psp-viz-detail-value"
              x="880"
              y="502"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              −$45.36 / mo
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
