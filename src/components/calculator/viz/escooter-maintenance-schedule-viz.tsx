"use client";

import { cn } from "@/lib/utils";

interface EscooterMaintenanceScheduleVizProps {
  className?: string;
}

/**
 * Industrial Matte animated schematic for E-Scooter Maintenance Schedule [VIZ].
 * nextKm = interval − (odo % interval); weeks = nextTire / weeklyKm.
 * Sample: 320 km odo · 50 km/wk → tyre 180 · brake 80 · bolt 80 · ~3.6 wk.
 */
export function EscooterMaintenanceScheduleViz({
  className,
}: EscooterMaintenanceScheduleVizProps) {
  return (
    <section
      className={cn(
        "tool-viz tool-viz--escooter-maintenance-schedule",
        className
      )}
      aria-label="E-scooter maintenance schedule visual breakdown"
    >
      <header className="tool-viz__header">
        <p className="tool-viz__eyebrow">FIG. VIZ — DATA FLOW</p>
        <h3 className="tool-viz__title">Odometer · Service Countdown</h3>
        <p className="tool-viz__subtitle">
          Total kilometres and weekly pace map onto fixed tyre, brake, and bolt
          intervals — remaining distance and weeks until the next check.
        </p>
      </header>

      <div className="tool-viz__stage">
        <svg
          viewBox="0 0 960 560"
          className="tool-viz__svg escooter-maintenance-schedule-viz"
          role="img"
          aria-labelledby="esmsch-viz-title esmsch-viz-desc"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="esmsch-viz-title">
            E-scooter maintenance schedule service interval diagram
          </title>
          <desc id="esmsch-viz-desc">
            Odometer mileage and weekly riding distance determine remaining
            kilometres until tyre, brake, and bolt-torque service intervals.
            Sample: 320 kilometres on the odometer at 50 kilometres per week
            leaves 180 kilometres to the next tyre service, 80 kilometres to
            brake and bolt checks, about 3.6 weeks to the tyre milestone.
          </desc>

          <defs>
            <pattern
              id="esmsch-viz-grid"
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
              id="esmsch-viz-arrow"
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
              id="esmsch-viz-pulse"
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
              id="esmsch-viz-tire"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="esmsch-viz-brake"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
              id="esmsch-viz-bolt"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#888888" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="esmsch-viz-weeks"
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
            fill="url(#esmsch-viz-grid)"
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

          {/* —— INPUT: Odometer —— */}
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
              ODOMETER
            </text>
            <text
              className="esmsch-viz-odo-value"
              x="56"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              320 km
            </text>
            <text
              x="156"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              total ridden
            </text>
          </g>

          {/* —— INPUT: Weekly distance —— */}
          <g>
            <rect
              x="280"
              y="40"
              width="220"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="296"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              WEEKLY DISTANCE
            </text>
            <text
              className="esmsch-viz-wk-value"
              x="296"
              y="108"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              50 km
            </text>
            <text
              x="396"
              y="108"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              / week pace
            </text>
          </g>

          {/* —— INPUT: Interval thresholds —— */}
          <g>
            <rect
              x="520"
              y="40"
              width="180"
              height="100"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="536"
              y="66"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              INTERVALS
            </text>
            <text
              className="esmsch-viz-int-value"
              x="536"
              y="92"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              tyre 500 · brake 400
            </text>
            <text
              className="esmsch-viz-int-value"
              x="536"
              y="116"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              bolt / hinge 200 km
            </text>
          </g>

          {/* Flow: inputs → countdown path */}
          <path
            d="M 150 140 L 150 168 L 390 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esmsch-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 150 140 L 150 168 L 390 168"
            fill="none"
            stroke="url(#esmsch-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 390 140 L 390 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 390 140 L 390 168"
            fill="none"
            stroke="url(#esmsch-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 610 140 L 610 168 L 390 168"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay-2"
            d="M 610 140 L 610 168 L 390 168"
            fill="none"
            stroke="url(#esmsch-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— CENTER: Mileage accumulation & service lanes —— */}
          <g>
            <rect
              x="40"
              y="188"
              width="640"
              height="208"
              rx="4"
              fill="#111111"
              stroke="#333333"
              strokeWidth="1"
            />
            <text
              x="56"
              y="214"
              fill="#888888"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              SERVICE COUNTDOWN · next = interval − (odo mod interval)
            </text>

            {/* Scooter line art */}
            <g className="esmsch-viz-scooter" transform="translate(64, 248)">
              <rect
                x="28"
                y="20"
                width="100"
                height="12"
                rx="2"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
              />
              <path
                d="M 28 20 L 10 4 L 10 0"
                fill="none"
                stroke="#444444"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <circle
                className="esmsch-viz-wheel"
                cx="20"
                cy="48"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                className="esmsch-viz-wheel"
                cx="132"
                cy="48"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="20" cy="48" r="3" fill="currentColor" />
              <circle cx="132" cy="48" r="3" fill="currentColor" />
              <text
                x="76"
                y="78"
                textAnchor="middle"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
              >
                320 km logged
              </text>
            </g>

            {/* Three service lanes */}
            <g transform="translate(240, 240)">
              {/* Tyre 500 */}
              <text
                x="0"
                y="0"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                TYRE CHECK · 500 KM
              </text>
              <rect
                x="0"
                y="10"
                width="280"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="esmsch-viz-tire-bar"
                x="0"
                y="10"
                width="180"
                height="10"
                rx="2"
                fill="url(#esmsch-viz-tire)"
              />
              <text
                className="esmsch-viz-tire-chip"
                x="292"
                y="19"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                180 km left
              </text>

              {/* Brake 400 */}
              <text
                x="0"
                y="48"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                BRAKE CHECK · 400 KM
              </text>
              <rect
                x="0"
                y="58"
                width="280"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="esmsch-viz-brake-bar"
                x="0"
                y="58"
                width="80"
                height="10"
                rx="2"
                fill="url(#esmsch-viz-brake)"
              />
              <text
                className="esmsch-viz-brake-chip"
                x="292"
                y="67"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                80 km left
              </text>

              {/* Bolt 200 */}
              <text
                x="0"
                y="96"
                fill="#888888"
                fontSize="10"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em"
              >
                BOLT TORQUE · 200 KM
              </text>
              <rect
                x="0"
                y="106"
                width="280"
                height="10"
                rx="2"
                fill="#1a1a1a"
                stroke="#333333"
              />
              <rect
                className="esmsch-viz-bolt-bar"
                x="0"
                y="106"
                width="80"
                height="10"
                rx="2"
                fill="url(#esmsch-viz-bolt)"
              />
              <text
                className="esmsch-viz-bolt-chip"
                x="292"
                y="115"
                fill="#ededed"
                fontSize="12"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
              >
                80 km left
              </text>
            </g>

            {/* Math chip */}
            <rect
              x="56"
              y="348"
              width="200"
              height="32"
              rx="3"
              fill="#0a0a0a"
              stroke="#2a2a2a"
            />
            <text
              className="esmsch-viz-math-value"
              x="156"
              y="369"
              textAnchor="middle"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              500 − (320 mod 500)
            </text>
          </g>

          {/* Flow: center → outputs */}
          <path
            d="M 680 250 L 700 250"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esmsch-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse"
            d="M 680 250 L 700 250"
            fill="none"
            stroke="url(#esmsch-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 680 330 L 690 330 L 690 310 L 700 310"
            fill="none"
            stroke="#333333"
            strokeWidth="1.5"
            markerEnd="url(#esmsch-viz-arrow)"
          />
          <path
            className="tool-viz-flow__pulse tool-viz-flow__pulse--delay"
            d="M 680 330 L 690 330 L 690 310 L 700 310"
            fill="none"
            stroke="url(#esmsch-viz-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* —— OUTPUT: Next tyre service —— */}
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
              NEXT TYRE SERVICE
            </text>
            <text
              className="esmsch-viz-output-value"
              x="716"
              y="112"
              fill="#ededed"
              fontSize="32"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              180 km
            </text>
            <text
              x="716"
              y="138"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              remaining to 500 km cycle
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
              className="esmsch-viz-out-bar"
              x="716"
              y="158"
              width="172"
              height="10"
              rx="2"
              fill="url(#esmsch-viz-tire)"
            />
            <text
              className="esmsch-viz-detail-value"
              x="716"
              y="198"
              fill="#ededed"
              fontSize="13"
              fontFamily="ui-monospace, monospace"
            >
              brake &amp; bolt sooner · 80 km
            </text>
          </g>

          {/* —— OUTPUT: Weeks to tyre —— */}
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
              WEEKS TO TYRE SERVICE
            </text>
            <text
              className="esmsch-viz-weeks-out"
              x="716"
              y="324"
              fill="#ededed"
              fontSize="28"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
            >
              3.6 wk
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
              className="esmsch-viz-weeks-bar"
              x="716"
              y="344"
              width="172"
              height="10"
              rx="2"
              fill="url(#esmsch-viz-weeks)"
            />
            <text
              className="esmsch-viz-detail-value"
              x="716"
              y="378"
              fill="#ededed"
              fontSize="12"
              fontFamily="ui-monospace, monospace"
            >
              180 ÷ 50 km/wk
            </text>
          </g>

          {/* —— Footer: chronological checkpoints —— */}
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
              UPCOMING CHECKPOINTS AT CURRENT PACE
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
              className="esmsch-viz-tick"
              cx="56"
              cy="478"
              r="5"
              fill="currentColor"
            />
            <circle
              className="esmsch-viz-tick"
              cx="280"
              cy="478"
              r="5"
              fill="currentColor"
              opacity="0.85"
            />
            <circle
              className="esmsch-viz-tick"
              cx="520"
              cy="478"
              r="4"
              fill="currentColor"
              opacity="0.55"
            />
            <circle
              className="esmsch-viz-tick esmsch-viz-tick--end"
              cx="880"
              cy="478"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="esmsch-viz-timeline-pulse"
              d="M 56 478 L 880 478"
              fill="none"
              stroke="url(#esmsch-viz-pulse)"
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
              now · 320 km
            </text>
            <text
              x="280"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +80 km · brake &amp; bolt
            </text>
            <text
              x="520"
              y="504"
              textAnchor="middle"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              +180 km · tyre
            </text>
            <text
              x="880"
              y="504"
              textAnchor="end"
              fill="#888888"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              ~3.6 wk · next tyre due
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}
