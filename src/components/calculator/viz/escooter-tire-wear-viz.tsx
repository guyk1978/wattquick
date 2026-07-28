"use client";

import { cn } from "@/lib/utils";

interface EscooterTireWearVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Tyre Wear Life [VIZ].
 * Life km = (450 / wearFactor) × treadMm; weeks = lifeKm / weeklyKm.
 * Sample: 50 km/wk · 1.5 mm · urban 1.35× → 333 km/mm · 500 km · 10 wk.
 */
export function EscooterTireWearViz({ className }: EscooterTireWearVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-tire-wear", className)}
      aria-label="E-scooter tyre wear life visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Tyre Tread Wear &amp; Life</h3>
        <p className="tool-viz__subtitle">
          Weekly kilometres grind usable rubber against the surface factor —
          remaining tread depth maps to total life distance and weeks left.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-tire-wear-viz"
          role="img"
          aria-labelledby="estw-viz-title estw-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="estw-viz-title">
            E-scooter tyre wear life animated flow diagram
          </title>
          <desc id="estw-viz-desc">
            Weekly distance, usable tread depth, and surface wear factor feed a
            friction path that converts millimetres of rubber into kilometres of
            life. Sample: 50 kilometres per week, 1.5 millimetres usable tread,
            urban surface factor 1.35 yields about 333 kilometres per millimetre,
            500 kilometres total life, and 10 weeks remaining.
          </desc>

          <defs>
            <pattern
              id="estw-viz-grid"
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
              id="estw-viz-arrow"
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
              id="estw-viz-pulse"
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
              id="estw-viz-tread"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient
              id="estw-viz-life"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="estw-viz-weeks"
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
            fill="url(#estw-viz-grid)"
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

          {/* —— INPUT: Weekly distance —— */}
          <g>
            <rect
              x="40"
              y="40"
              width="220"
              height="100"
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
              WEEKLY DISTANCE
            </text>
            <text
              className="estw-viz-km-value"
              x="56"
              y="102"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50 km
            </text>
            <text
              x="56"
              y="124"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              riding load / week
            </text>
          </g>

          {/* —— INPUT: Usable tread —— */}
          <g>
            <rect
              x="40"
              y="156"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="182"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              USABLE TREAD
            </text>
            <text
              className="estw-viz-tread-value"
              x="56"
              y="218"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.5 mm
            </text>
            <text
              x="56"
              y="240"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              rubber above wear limit
            </text>
          </g>

          {/* —— INPUT: Surface / advanced —— */}
          <g>
            <rect
              x="40"
              y="272"
              width="220"
              height="120"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="298"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SURFACE FACTOR
            </text>
            <text
              className="estw-viz-factor-value"
              x="56"
              y="334"
              fill="#ededed"
              fontSize="26"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1.35×
            </text>
            <text
              x="56"
              y="358"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              urban mixed · advanced
            </text>
            <text
              x="56"
              y="376"
              fill="#666666"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
            >
              smooth 1.0 · rough 1.8
            </text>
          </g>

          {/* Flow: inputs → wear path */}
          <path
            d="M 260 90 L 310 90"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 90 L 310 90"
            fill="none"
            stroke="url(#estw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 260 206 L 290 206 L 290 150 L 310 150"
            fill="none"
            stroke="url(#estw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 260 332 L 290 332 L 290 210 L 310 210"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 260 332 L 290 332 L 290 210 L 310 210"
            fill="none"
            stroke="url(#estw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: "0.7s" }}
          />

          {/* —— FLOW: Friction & tread loss —— */}
          <g>
            <rect
              x="320"
              y="40"
              width="320"
              height="352"
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
              SURFACE FRICTION · TREAD LOSS
            </text>

            {/* Tyre cross-section */}
            <g transform="translate(360, 90)">
              <ellipse
                className="estw-viz-tyre"
                cx="80"
                cy="70"
                rx="78"
                ry="78"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <ellipse
                cx="80"
                cy="70"
                rx="42"
                ry="42"
                fill="#0a0a0a"
                stroke="#333333"
                strokeWidth="1.25"
              />
              <circle
                cx="80"
                cy="70"
                r="8"
                fill="none"
                stroke="#444444"
                strokeWidth="1"
              />

              {/* Usable tread band (outer rubber) — shrinks */}
              <path
                className="estw-viz-tread-band"
                d="M 80 0 A 78 78 0 0 1 150 40"
                fill="none"
                stroke="url(#estw-viz-tread)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <text
                x="168"
                y="28"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                1.5 mm band
              </text>

              {/* Road surface */}
              <line
                className="estw-viz-road"
                x1="-10"
                y1="152"
                x2="170"
                y2="152"
                stroke="#444444"
                strokeWidth="2"
              />
              <path
                className="estw-viz-contact"
                d="M 30 152 Q 80 142 130 152"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Friction / abrasion arrows along road */}
              <g className="estw-viz-friction" transform="translate(20, 162)">
                <path
                  d="M 0 0 L 40 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  markerEnd="url(#estw-viz-arrow)"
                />
                <path
                  d="M 50 8 L 95 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  opacity="0.75"
                  markerEnd="url(#estw-viz-arrow)"
                />
                <path
                  d="M 105 16 L 145 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.55"
                  markerEnd="url(#estw-viz-arrow)"
                />
                <text
                  x="72"
                  y="36"
                  textAnchor="middle"
                  fill="#888888"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                >
                  abrasion × 1.35
                </text>
              </g>
            </g>

            {/* km per mm math chip */}
            <rect
              x="348"
              y="300"
              width="264"
              height="72"
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
              letterSpacing="0.08em"
            >
              KM PER MM TREAD
            </text>
            <text
              className="estw-viz-math-value"
              x="364"
              y="354"
              fill="#ededed"
              fontSize="20"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              450 ÷ 1.35 = 333 km/mm
            </text>
          </g>

          {/* Flow: wear → outputs */}
          <path
            d="M 640 180 L 690 180"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 640 180 L 690 180"
            fill="none"
            stroke="url(#estw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 640 280 L 670 280 L 670 320 L 690 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#estw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 640 280 L 670 280 L 670 320 L 690 320"
            fill="none"
            stroke="url(#estw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Lifespan distance —— */}
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
              TREAD LIFE
            </text>
            <text
              className="estw-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 km
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              333 × 1.5 mm
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
              className="estw-viz-life-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#estw-viz-life)"
            />
            <text
              className="estw-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              full usable rubber budget
            </text>
          </g>

          {/* —— OUTPUT: Weeks remaining —— */}
          <g>
            <rect
              x="700"
              y="256"
              width="220"
              height="136"
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
              WEEKS REMAINING
            </text>
            <text
              className="estw-viz-output-value"
              x="716"
              y="322"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              10 wk
            </text>
            <text
              x="716"
              y="346"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              500 km ÷ 50 km/wk
            </text>
            <rect
              x="716"
              y="360"
              width="172"
              height="8"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="estw-viz-weeks-bar"
              x="716"
              y="360"
              width="120"
              height="8"
              rx="2"
              fill="url(#estw-viz-weeks)"
            />
          </g>

          {/* —— Footer strip: replacement cycle —— */}
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
              REPLACEMENT CYCLE AT A GLANCE
            </text>

            {/* Timeline ticks */}
            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="estw-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="estw-viz-tick"
              cx="260"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="estw-viz-tick"
              cx="464"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="estw-viz-tick"
              cx="668"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.4"
            />
            <circle
              className="estw-viz-tick estw-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="estw-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#estw-viz-pulse)"
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
              wk 0 · new tread
            </text>
            <text
              x="464"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              distance burns rubber
            </text>
            <text
              className="estw-viz-detail-value"
              x="880"
              y="504"
              textAnchor="end"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              wk 10 · replace
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
