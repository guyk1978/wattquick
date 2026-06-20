"use client";

import { cn } from "@/lib/utils";

interface SolarDailyYieldGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: panel W + sun hours + efficiency → Wh/day.
 * Modal only (not embedded in page DOM by default).
 */
export function SolarDailyYieldGuideIllustration({
  className,
}: SolarDailyYieldGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "solar-daily-yield-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="sdy-guide-title sdy-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="sdy-guide-title">Solar daily yield flow diagram</title>
      <desc id="sdy-guide-desc">
        Inputs: panel wattage rating, peak sun hours, and system efficiency.
        Process: multiply panel power by harvest time and efficiency losses.
        Output: estimated daily energy yield in watt-hours per day.
      </desc>

      <defs>
        <pattern
          id="bp-sdy-grid-minor"
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
          id="bp-sdy-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-sdy-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-sdy-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-sdy-grid-major)"
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
        FIG. 1 — SOLAR DAILY YIELD
      </text>
      <path
        d="M 34 52 H 280"
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
        filter="url(#bp-sdy-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Panel rating W */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 148 Q 174 154 168 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="104" width="40" height="28" strokeWidth="0.9" rx="1" />
        <path d="M 60 112 H 84 M 60 120 H 84 M 68 104 V 132 M 76 104 V 132" strokeWidth="0.5" opacity="0.6" />
        <text
          x="104"
          y="124"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          400 W
        </text>
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          panel rating
        </text>

        {/* Peak sun hours */}
        <path
          d="M 36 168 Q 38 164 44 164 H 168 Q 174 164 176 170 V 224 Q 174 230 168 230 H 44 Q 38 230 36 224 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="190" r="12" strokeWidth="1" />
        <path
          d="M 72 174 V 170 M 72 210 V 214 M 58 190 H 54 M 86 190 H 90 M 61 177 L 58 174 M 83 177 L 86 174 M 61 203 L 58 206 M 83 203 L 86 206"
          strokeWidth="0.7"
        />
        <text
          x="96"
          y="194"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          5 h sun
        </text>
        <text
          x="48"
          y="180"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          peak sun hrs
        </text>
        <path d="M 52 212 H 160" strokeWidth="0.6" opacity="0.5" />
        <path d="M 52 212 H 92" strokeWidth="1.2" />
        <text
          x="48"
          y="222"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          harvest window / day
        </text>

        {/* System efficiency */}
        <path
          d="M 36 244 Q 38 240 44 240 H 168 Q 174 240 176 246 V 282 Q 174 288 168 288 H 44 Q 38 288 36 282 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 264 H 156" strokeWidth="0.8" />
        <path d="M 52 264 H 128" strokeWidth="1.2" />
        <text
          x="48"
          y="256"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          system η
        </text>
        <text
          x="48"
          y="278"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          80%
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 120 H 218" strokeLinecap="round" />
        <path d="M 214 116 L 222 120 L 214 124" strokeLinejoin="round" />
        <path d="M 186 196 H 218" strokeLinecap="round" />
        <path d="M 214 192 L 222 196 L 214 200" />
        <path d="M 186 264 H 218" strokeLinecap="round" />
        <path d="M 214 260 L 222 264 L 214 268" />
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
        filter="url(#bp-sdy-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 288 Q 476 296 468 296 H 228 Q 220 296 218 288 Z"
          strokeWidth="1.2"
        />

        <text
          x="238"
          y="112"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Energy harvest
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh/day = W × h × η
        </text>
        <text
          x="256"
          y="162"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          400 × 5 × 0.80
        </text>
        <text
          x="256"
          y="186"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          = 1600 Wh/day
        </text>

        {/* Sun over panels producing energy flow */}
        <path d="M 280 228 Q 360 198 440 228" strokeWidth="0.9" opacity="0.6" />
        <circle cx="360" cy="208" r="10" strokeWidth="0.9" />
        <path
          d="M 360 194 V 190 M 360 226 V 230 M 346 208 H 342 M 374 208 H 378"
          strokeWidth="0.6"
        />
        <rect x="296" y="238" width="36" height="24" strokeWidth="0.9" rx="1" />
        <rect x="336" y="238" width="36" height="24" strokeWidth="0.9" rx="1" />
        <rect x="376" y="238" width="36" height="24" strokeWidth="0.9" rx="1" />
        <path d="M 304 246 H 324 M 344 246 H 364 M 384 246 H 404" strokeWidth="0.5" opacity="0.6" />
        <path d="M 412 250 H 448 M 448 250 L 444 246 M 448 250 L 444 254" strokeWidth="0.8" />
        <rect x="452" y="240" width="16" height="20" strokeWidth="0.8" rx="1" />
        <text
          x="460"
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          Wh
        </text>

        <text
          x="256"
          y="278"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          power × time × usable fraction
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
        filter="url(#bp-sdy-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 288 Q 692 296 684 296 H 538 Q 530 296 528 288 Z"
          strokeWidth="1.3"
        />

        {/* Battery / meter showing daily energy */}
        <rect x="572" y="118" width="80" height="48" strokeWidth="1.1" rx="2" />
        <path d="M 592 138 H 632 M 592 148 H 620" strokeWidth="0.8" opacity="0.7" />
        <text
          x="612"
          y="132"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          daily harvest
        </text>
        <path d="M 580 166 H 644" strokeWidth="0.7" opacity="0.5" />
        <path d="M 580 166 H 628" strokeWidth="1.1" />

        <text
          x="612"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="26"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          1600
        </text>
        <text
          x="612"
          y="240"
          textAnchor="middle"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          Wh/day
        </text>
        <text
          x="612"
          y="262"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          compare to daily load
        </text>
        <text
          x="612"
          y="278"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          after inverter & cable losses
        </text>
      </g>

      {/* Bottom note — inverse of solar panel size */}
      <g
        filter="url(#bp-sdy-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      >
        <rect
          x="36"
          y="352"
          width="648"
          height="48"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          rx="1"
        />
        <text
          x="48"
          y="368"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          inverse of Solar Panel Size — forward estimate from installed array
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          400 W
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          5 h
        </text>
        <text x="175" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          80%
        </text>
        <text x="235" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="255" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1600 Wh/day
        </text>
      </g>
    </svg>
  );
}
