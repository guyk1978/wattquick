"use client";

import { cn } from "@/lib/utils";

interface EscooterBrakePadWearVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Brake Pad Wear [VIZ].
 * km/set = 1200 / (regenFactor × hillFactor); weeks = km / weeklyKm.
 * Sample: 100 km/wk · 50% regen · 20% hills → 800 km · 8 wk.
 */
export function EscooterBrakePadWearViz({
  className,
}: EscooterBrakePadWearVizProps) {
  return (
    <section
      className={cn("tool-viz tool-viz--escooter-brake-pad-wear", className)}
      aria-label="E-scooter brake pad wear visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Regen Offset · Pad Life</h3>
        <p className="tool-viz__subtitle">
          Weekly kilometres split between motor regen and friction pads — hills
          amplify mechanical duty, then pad-set life falls out in distance and
          weeks.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-brake-pad-wear-viz"
          role="img"
          aria-labelledby="esbpw-viz-title esbpw-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esbpw-viz-title">
            E-scooter brake pad wear and regen offset diagram
          </title>
          <desc id="esbpw-viz-desc">
            Weekly distance, regenerative braking share, and hilly route share
            determine how much stopping force friction pads absorb versus motor
            regen. Sample: 100 kilometres per week at 50 percent regen and 20
            percent hills yields about 800 kilometres per pad set and 8 weeks
            until replacement.
          </desc>

          <defs>
            <pattern
              id="esbpw-viz-grid"
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
              id="esbpw-viz-arrow"
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
              id="esbpw-viz-pulse"
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
              id="esbpw-viz-regen"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="esbpw-viz-friction"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.85" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient
              id="esbpw-viz-life"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="esbpw-viz-weeks"
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
            fill="url(#esbpw-viz-grid)"
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
              width="200"
              height="108"
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
              className="esbpw-viz-km-value"
              x="56"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              100 km
            </text>
            <text
              x="56"
              y="132"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              commute mileage / wk
            </text>
          </g>

          {/* —— INPUT: Regen share —— */}
          <g>
            <rect
              x="260"
              y="40"
              width="200"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="276"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              REGEN BRAKING SHARE
            </text>
            <text
              className="esbpw-viz-regen-value"
              x="276"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50%
            </text>
            <text
              x="276"
              y="132"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              motor braking offset
            </text>
          </g>

          {/* —— INPUT: Hilly / advanced —— */}
          <g>
            <rect
              x="480"
              y="40"
              width="200"
              height="108"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="496"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              HILLY ROUTE SHARE
            </text>
            <text
              className="esbpw-viz-hill-value"
              x="496"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              20%
            </text>
            <text
              x="496"
              y="132"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              friction duty boost
            </text>
          </g>

          {/* Flow: inputs → split */}
          <path
            d="M 140 148 L 140 176 L 480 176"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esbpw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 140 148 L 140 176 L 480 176"
            fill="none"
            stroke="url(#esbpw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 360 148 L 360 176"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 360 148 L 360 176"
            fill="none"
            stroke="url(#esbpw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 580 148 L 580 176 L 480 176"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay-2"
            d="M 580 148 L 580 176 L 480 176"
            fill="none"
            stroke="url(#esbpw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— CENTER: Braking split schematic —— */}
          <g>
            <rect
              x="40"
              y="196"
              width="640"
              height="200"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="222"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              STOPPING FORCE SPLIT · BASE 1,200 KM PAD SET
            </text>

            {/* Scooter deck + wheel line art */}
            <g className="esbpw-viz-scooter" transform="translate(72, 248)">
              <rect
                x="28"
                y="28"
                width="110"
                height="14"
                rx="2"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <path
                d="M 28 28 L 8 8 L 8 0"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <circle
                className="esbpw-viz-wheel"
                cx="18"
                cy="58"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                className="esbpw-viz-wheel"
                cx="148"
                cy="58"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="18" cy="58" r="4" fill="currentColor" />
              <circle cx="148" cy="58" r="4" fill="currentColor" />
              {/* Caliper / pad on rear wheel */}
              <path
                className="esbpw-viz-pad"
                d="M 138 42 L 158 42 L 158 50 L 138 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <text
                x="88"
                y="88"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                deck · rotor · pad
              </text>
            </g>

            {/* Regen path (electronic) */}
            <g transform="translate(280, 248)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                MOTOR REGEN
              </text>
              <rect
                x="0"
                y="14"
                width="160"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="esbpw-viz-regen-bar"
                x="0"
                y="14"
                width="80"
                height="12"
                rx="2"
                fill="url(#esbpw-viz-regen)"
              />
              <text
                className="esbpw-viz-regen-chip"
                x="0"
                y="48"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                50% electronic
              </text>
              <path
                className="esbpw-viz-regen-flow"
                d="M 170 20 L 220 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                markerEnd="url(#esbpw-viz-arrow)"
              />
              <text
                x="228"
                y="24"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                pack recover
              </text>
            </g>

            {/* Friction path (mechanical) */}
            <g transform="translate(280, 318)">
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                FRICTION PADS
              </text>
              <rect
                x="0"
                y="14"
                width="160"
                height="12"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="esbpw-viz-friction-bar"
                x="0"
                y="14"
                width="96"
                height="12"
                rx="2"
                fill="url(#esbpw-viz-friction)"
              />
              <text
                className="esbpw-viz-friction-chip"
                x="0"
                y="48"
                fill="#ededed"
                fontSize="13"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                pad wear · ×1.20 hills
              </text>
              <path
                className="esbpw-viz-friction-flow"
                d="M 170 20 L 220 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                markerEnd="url(#esbpw-viz-arrow)"
              />
              <text
                x="228"
                y="24"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                rotor heat
              </text>
            </g>

            {/* Formula chip */}
            <rect
              x="56"
              y="348"
              width="200"
              height="36"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="esbpw-viz-math-value"
              x="156"
              y="372"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              1,200 ÷ (1.25 × 1.20)
            </text>
          </g>

          {/* Flow: center → outputs */}
          <path
            d="M 680 260 L 700 260"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esbpw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 260 L 700 260"
            fill="none"
            stroke="url(#esbpw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esbpw-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 340 L 690 340 L 690 320 L 700 320"
            fill="none"
            stroke="url(#esbpw-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Km per pad set —— */}
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
              KM PER PAD SET
            </text>
            <text
              className="esbpw-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              800 km
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              regen ×1.25 · hill ×1.20
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
              className="esbpw-viz-life-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#esbpw-viz-life)"
            />
            <text
              className="esbpw-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              friction lifespan budget
            </text>
          </g>

          {/* —— OUTPUT: Weeks per pad set —— */}
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
              WEEKS PER PAD SET
            </text>
            <text
              className="esbpw-viz-weeks-out"
              x="716"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              8 wk
            </text>
            <rect
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="#1a1a1a"
              stroke="#333333"
            />
            <rect
              className="esbpw-viz-weeks-bar"
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="url(#esbpw-viz-weeks)"
            />
            <text
              className="esbpw-viz-detail-value"
              x="716"
              y="378"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              800 ÷ 100 km/wk
            </text>
          </g>

          {/* —— Footer: replacement timeline —— */}
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

            <line
              x1="56"
              y1="478"
              x2="880"
              y2="478"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <circle
              className="esbpw-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="esbpw-viz-tick"
              cx="260"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.7"
            />
            <circle
              className="esbpw-viz-tick"
              cx="464"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="esbpw-viz-tick"
              cx="668"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.4"
            />
            <circle
              className="esbpw-viz-tick esbpw-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="esbpw-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#esbpw-viz-pulse)"
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
              wk 0 · new pads
            </text>
            <text
              x="464"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~400 km · mid wear
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              wk 8 · replace · 800 km
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
