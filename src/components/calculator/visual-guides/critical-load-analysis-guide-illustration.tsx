"use client";

import { cn } from "@/lib/utils";

interface CriticalLoadAnalysisGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: devices (W × hrs) + outage target → Wh capacity.
 * Modal only (not embedded in page DOM by default).
 */
export function CriticalLoadAnalysisGuideIllustration({
  className,
}: CriticalLoadAnalysisGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 440"
      className={cn(
        "critical-load-analysis-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="critical-load-guide-title critical-load-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="critical-load-guide-title">Critical load analysis flow diagram</title>
      <desc id="critical-load-guide-desc">
        Inputs: essential devices with running watts and hours per day, plus
        target outage duration. Process: sum daily watt-hours, average to an
        hourly rate, multiply by backup hours and a safety buffer. Output:
        required backup capacity in watt-hours.
      </desc>

      <defs>
        <pattern
          id="bp-cl-grid-minor"
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
          id="bp-cl-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-cl-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-cl-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        height="440"
        fill="url(#bp-cl-grid-major)"
        className="text-foreground"
        rx="2"
      />
      <rect
        x="12"
        y="12"
        width="696"
        height="416"
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
        FIG. 1 — CRITICAL LOAD ANALYSIS
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
        filter="url(#bp-cl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Device list */}
        <path
          d="M 36 92 Q 38 88 44 88 H 200 Q 206 88 208 94 V 248 Q 206 254 200 254 H 44 Q 38 254 36 248 Z"
          strokeWidth="1.1"
        />
        <text
          x="48"
          y="108"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
          opacity="0.75"
        >
          essential devices
        </text>
        <text x="48" y="126" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          fridge · 150 W × 12 h
        </text>
        <text x="48" y="142" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          router · 15 W × 24 h
        </text>
        <text x="48" y="158" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          lights · 40 W × 4 h
        </text>
        <path d="M 48 168 H 196" strokeWidth="0.5" opacity="0.4" />
        <text x="48" y="184" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          Σ daily Wh per device
        </text>
        <text x="48" y="200" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          = W × hrs/day each
        </text>
        <text x="48" y="234" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          + more slots…
        </text>

        {/* Backup target hours */}
        <path
          d="M 36 264 Q 38 260 44 260 H 200 Q 206 260 208 266 V 304 Q 206 310 200 310 H 44 Q 38 310 36 304 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="284" r="12" strokeWidth="1" />
        <line x1="72" y1="284" x2="72" y2="274" strokeWidth="1.2" />
        <line x1="72" y1="284" x2="80" y2="290" strokeWidth="1" />
        <text
          x="96"
          y="288"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          8 h outage
        </text>
        <text
          x="48"
          y="272"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          backup target
        </text>
      </g>

      {/* Arrow to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 218 180 H 248" strokeLinecap="round" />
        <path d="M 244 176 L 252 180 L 244 184" strokeLinejoin="round" />
      </g>

      {/* PROCESS */}
      <text
        x="258"
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
        filter="url(#bp-cl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 248 92 Q 250 86 258 86 H 478 Q 486 86 488 94 V 318 Q 486 326 478 326 H 258 Q 250 326 248 318 Z"
          strokeWidth="1.2"
        />

        <text x="268" y="112" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1. Daily energy budget
        </text>
        <text x="286" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          daily Wh = Σ (W × hrs/day)
        </text>
        <text x="286" y="150" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          e.g. 2,160 Wh/day total
        </text>

        <path d="M 268 162 H 460" strokeWidth="0.6" opacity="0.45" />

        <text x="268" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Hourly average
        </text>
        <text x="286" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          avg Wh/h = daily Wh ÷ 24
        </text>
        <text x="286" y="220" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          2,160 ÷ 24 = 90 Wh/h
        </text>

        <path d="M 268 232 H 460" strokeWidth="0.6" opacity="0.45" />

        <text x="268" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Outage + buffer
        </text>
        <text x="286" y="272" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          Wh = avg × target h × 1.2
        </text>
        <text x="286" y="290" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          90 × 8 × 1.2 = 864 Wh
        </text>
        <text x="286" y="308" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          20% buffer for inverter loss
        </text>
      </g>

      {/* Arrow to output */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 498 210 H 528" strokeLinecap="round" />
        <path d="M 524 206 L 532 210 L 524 214" strokeLinejoin="round" />
      </g>

      {/* OUTPUT */}
      <text
        x="548"
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
        filter="url(#bp-cl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 538 92 Q 540 86 548 86 H 684 Q 692 86 694 94 V 318 Q 692 326 684 326 H 548 Q 540 326 538 318 Z"
          strokeWidth="1.3"
        />

        {/* Home + shield */}
        <path d="M 580 130 L 611 112 L 642 130 V 158 Q 611 178 580 158 Z" strokeWidth="1.1" />
        <path d="M 598 142 H 624 M 598 150 H 620" strokeWidth="0.7" opacity="0.5" />

        <rect x="568" y="188" width="28" height="40" strokeWidth="0.9" fill="currentColor" fillOpacity="0.08" />
        <rect x="600" y="188" width="28" height="40" strokeWidth="0.9" fill="currentColor" fillOpacity="0.08" />
        <rect x="632" y="188" width="28" height="40" strokeWidth="0.9" />

        <text
          x="611"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          864 Wh
        </text>
        <text
          x="611"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          required capacity
        </text>
        <text
          x="611"
          y="298"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          + battery bank count
        </text>
      </g>

      {/* Bottom: outage window */}
      <g
        filter="url(#bp-cl-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect x="36" y="352" width="648" height="68" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          plan only essential circuits — not whole-house nameplate
        </text>
        <line x1="72" y1="400" x2="640" y2="400" strokeWidth="0.8" />
        <rect x="72" y="388" width="200" height="12" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12" rx="1" />
        <line x1="272" y1="382" x2="272" y2="406" strokeWidth="1" />
        <text x="276" y="368" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          8 h outage window
        </text>
        <text x="72" y="382" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          grid up
        </text>
        <text x="248" y="382" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          cutoff
        </text>
      </g>
    </svg>
  );
}
