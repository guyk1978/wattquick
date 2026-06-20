"use client";

import { cn } from "@/lib/utils";

interface EscooterMaintenanceScheduleGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: odometer + weekly km → interval countdown → km & weeks.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterMaintenanceScheduleGuideIllustration({
  className,
}: EscooterMaintenanceScheduleGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-maintenance-schedule-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="esms-guide-title esms-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="esms-guide-title">E-scooter maintenance schedule flow diagram</title>
      <desc id="esms-guide-desc">
        Inputs: current odometer reading and weekly riding distance. Process:
        subtract odometer modulo from fixed service intervals for tyres, brakes,
        and bolt torque. Output: kilometres until each service and weeks until
        tyre service.
      </desc>

      <defs>
        <pattern
          id="bp-esms-grid-minor"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            opacity="0.12"
          />
        </pattern>
        <pattern
          id="bp-esms-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-esms-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-esms-pencil" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0"
            in="noise"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      <rect
        width="720"
        height="420"
        fill="url(#bp-esms-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="396"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.35"
        rx="1"
      />

      <text
        x="36"
        y="44"
        fill="currentColor"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.12em"
        opacity="0.55"
      >
        FIG. 1 — MAINTENANCE SCHEDULE
      </text>
      <path
        d="M 34 52 H 320"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />

      {/* INPUTS */}
      <text
        x="36"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        INPUTS
      </text>

      <g
        filter="url(#bp-esms-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Odometer */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 148 Q 174 154 168 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="118" r="18" strokeWidth="0.9" />
        <path d="M 72 100 V 136 M 54 118 H 90" strokeWidth="0.5" opacity="0.45" />
        <path d="M 62 106 L 82 130 M 82 106 L 62 130" strokeWidth="0.4" opacity="0.35" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          odometer
        </text>
        <text x="48" y="142" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          320 km
        </text>

        {/* Weekly distance */}
        <path
          d="M 36 164 Q 38 160 44 160 H 168 Q 174 160 176 166 V 228 Q 174 234 168 234 H 44 Q 38 234 36 228 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 184 H 152 M 152 184 L 148 180 M 152 184 L 148 188" strokeWidth="0.7" />
        <path d="M 52 204 L 72 192 L 92 208 L 112 196 L 132 212" strokeWidth="0.6" opacity="0.5" />
        <text x="48" y="176" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          weekly
        </text>
        <text x="48" y="218" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          50 km/wk
        </text>
        <text x="48" y="230" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          pace for week estimate
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 118 H 218" strokeLinecap="round" />
        <path d="M 214 114 L 222 118 L 214 122" strokeLinejoin="round" />
        <path d="M 186 196 H 218" strokeLinecap="round" />
        <path d="M 214 192 L 222 196 L 214 200" />
      </g>

      {/* PROCESS */}
      <text
        x="228"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        PROCESS
      </text>

      <g
        filter="url(#bp-esms-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
          strokeWidth="1.2"
        />

        <text x="238" y="112" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          Service intervals
        </text>
        <text x="256" y="134" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          next km = interval − (odo mod interval)
        </text>

        {/* Tyre row */}
        <circle cx="248" cy="158" r="10" strokeWidth="0.8" />
        <path d="M 238 158 H 258 M 248 148 V 168" strokeWidth="0.5" opacity="0.4" />
        <text x="268" y="154" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          tyre @ 500 km
        </text>
        <text x="268" y="168" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          500 − (320 mod 500) = 180 km
        </text>

        {/* Brake row */}
        <rect x="238" y="186" width="20" height="14" strokeWidth="0.8" rx="1" />
        <path d="M 248 186 V 178 M 242 182 H 254" strokeWidth="0.6" />
        <path d="M 238 200 H 258" strokeWidth="0.9" />
        <text x="268" y="194" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          brake @ 400 km
        </text>
        <text x="268" y="208" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          400 − (320 mod 400) = 80 km
        </text>

        {/* Bolt row */}
        <path d="M 248 228 L 244 244 H 252 Z" strokeWidth="0.8" />
        <path d="M 246 236 H 250 M 246 240 H 250" strokeWidth="0.5" />
        <circle cx="248" cy="248" r="3" strokeWidth="0.7" />
        <text x="268" y="234" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          bolt @ 200 km
        </text>
        <text x="268" y="248" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          200 − (320 mod 200) = 80 km
        </text>

        <path d="M 238 262 H 452" strokeWidth="0.5" opacity="0.35" />

        <text x="256" y="282" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          wk to tyre = next tyre km ÷ weekly
        </text>
        <text x="256" y="300" fill="currentColor" fontSize="12" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          180 ÷ 50 = 3.6 wk
        </text>

        {/* Timeline bar */}
        <path d="M 360 268 H 448" strokeWidth="0.8" />
        <path d="M 360 268 H 392" strokeWidth="1.2" />
        <path d="M 392 262 V 274 M 424 262 V 274 M 448 262 V 274" strokeWidth="0.6" opacity="0.5" />
        <text x="376" y="258" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          320
        </text>
        <text x="448" y="258" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          500
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 488 190 H 518" strokeLinecap="round" />
        <path d="M 514 186 L 522 190 L 514 194" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="538"
        y="80"
        fill="currentColor"
        fontSize="13"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        OUTPUT
      </text>

      <g
        filter="url(#bp-esms-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="612" y="118" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          km until service
        </text>

        <text x="560" y="144" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          tyre
        </text>
        <text x="640" y="144" textAnchor="end" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="700">
          180 km
        </text>

        <text x="560" y="168" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          brake
        </text>
        <text x="640" y="168" textAnchor="end" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="700">
          80 km
        </text>

        <text x="560" y="192" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          bolt
        </text>
        <text x="640" y="192" textAnchor="end" fill="currentColor" fontSize="14" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="700">
          80 km
        </text>

        <path d="M 552 204 H 672" strokeWidth="0.6" opacity="0.4" />

        <text x="612" y="228" textAnchor="middle" fill="currentColor" fontSize="22" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          4 wk
        </text>
        <text x="612" y="246" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          to tyre service
        </text>

        {/* Mini icons */}
        <circle cx="576" cy="272" r="8" strokeWidth="0.7" />
        <rect x="600" y="264" width="14" height="10" strokeWidth="0.7" rx="1" />
        <path d="M 607 264 V 258 M 602 261 H 612" strokeWidth="0.5" />
        <path d="M 628 270 L 624 282 H 632 Z" strokeWidth="0.6" />
        <circle cx="628" cy="284" r="2.5" strokeWidth="0.6" />

        <text x="612" y="300" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          folding stem bolts first
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-esms-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          fixed intervals: tyre 500 km · brake inspect 400 km · bolt torque 200 km
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          500 − 320
        </text>
        <text x="130" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="150" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          180 km tyre
        </text>
        <text x="240" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          · 180 ÷ 50
        </text>
        <text x="310" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="330" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3.6 wk
        </text>
      </g>
    </svg>
  );
}
