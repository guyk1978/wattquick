"use client";

import { cn } from "@/lib/utils";

interface MarineBatteryBankGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: continuous amps + bank Ah + DoD → runtime hours.
 * Modal only (not embedded in page DOM by default).
 */
export function MarineBatteryBankGuideIllustration({
  className,
}: MarineBatteryBankGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "marine-battery-bank-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="mbb-guide-title mbb-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="mbb-guide-title">Marine trolling motor runtime flow diagram</title>
      <desc id="mbb-guide-desc">
        Inputs: continuous motor amp draw, battery bank amp-hour capacity, and
        usable depth of discharge. Process: find usable amp-hours, then divide
        by continuous amps. Output: estimated trolling runtime in hours.
      </desc>

      <defs>
        <pattern
          id="bp-mbb-grid-minor"
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
          id="bp-mbb-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-mbb-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-mbb-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-mbb-grid-major)"
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
        FIG. 1 — MARINE TROLLING RUNTIME
      </text>
      <path
        d="M 34 52 H 340"
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
        filter="url(#bp-mbb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Continuous draw A */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 148 Q 174 154 168 154 H 44 Q 38 154 36 148 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="118" r="12" strokeWidth="1" />
        <text
          x="66"
          y="122"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          A
        </text>
        <path d="M 96 108 Q 120 100 140 118 Q 160 136 168 128" strokeWidth="0.9" />
        <circle cx="152" cy="118" r="8" strokeWidth="0.8" />
        <path d="M 148 118 H 156 M 152 114 V 122" strokeWidth="0.6" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          trolling draw
        </text>
        <text
          x="48"
          y="142"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          25 A
        </text>

        {/* Bank Ah */}
        <path
          d="M 36 168 Q 38 164 44 164 H 168 Q 174 164 176 170 V 234 Q 174 240 168 240 H 44 Q 38 240 36 234 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="180" width="28" height="40" strokeWidth="0.9" rx="2" />
        <rect x="84" y="180" width="28" height="40" strokeWidth="0.9" rx="2" />
        <rect x="116" y="180" width="28" height="40" strokeWidth="0.9" rx="2" />
        <path d="M 60 192 H 72 M 60 204 H 72 M 92 192 H 104 M 92 204 H 104 M 124 192 H 136 M 124 204 H 136" strokeWidth="0.5" opacity="0.6" />
        <text
          x="48"
          y="176"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          bank capacity
        </text>
        <text
          x="48"
          y="228"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          200 Ah
        </text>

        {/* Usable DoD */}
        <path
          d="M 36 254 Q 38 250 44 250 H 168 Q 174 250 176 256 V 294 Q 174 300 168 300 H 44 Q 38 300 36 294 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="262" width="24" height="28" strokeWidth="0.9" rx="1" />
        <path d="M 52 270 H 76" strokeWidth="0.6" opacity="0.4" />
        <path d="M 52 270 H 76" strokeWidth="1.1" />
        <text
          x="64"
          y="266"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.5"
        >
          reserve
        </text>
        <text
          x="48"
          y="258"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          usable DoD
        </text>
        <text
          x="88"
          y="280"
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
        <path d="M 186 200 H 218" strokeLinecap="round" />
        <path d="M 214 196 L 222 200 L 214 204" />
        <path d="M 186 274 H 218" strokeLinecap="round" />
        <path d="M 214 270 L 222 274 L 214 278" />
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
        filter="url(#bp-mbb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 296 Q 476 304 468 304 H 228 Q 220 304 218 296 Z"
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
          Amp-hour drain
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          h = (Ah × DoD) ÷ A
        </text>
        <text
          x="256"
          y="160"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.8"
        >
          usable = 200 × 0.80 = 160 Ah
        </text>
        <text
          x="256"
          y="184"
          fill="currentColor"
          fontSize="14"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          160 ÷ 25 = 6.4 h
        </text>

        {/* Boat + motor + current flow */}
        <path
          d="M 280 220 Q 320 200 360 210 Q 400 220 440 210 L 460 218 L 452 228 L 440 224 Q 400 234 360 224 Q 320 214 280 228 Z"
          strokeWidth="0.9"
        />
        <path d="M 448 216 L 468 208" strokeWidth="0.9" />
        <circle cx="472" cy="206" r="6" strokeWidth="0.8" />
        <path d="M 468 206 H 476 M 472 202 V 210" strokeWidth="0.5" />
        <path d="M 300 228 Q 340 240 380 232" strokeWidth="0.6" opacity="0.5" />

        {/* Drain timeline */}
        <path d="M 280 252 H 440" strokeWidth="0.7" opacity="0.5" />
        <path d="M 280 252 H 424" strokeWidth="1.1" />
        <text
          x="280"
          y="248"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          0 h
        </text>
        <text
          x="416"
          y="248"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          6.4 h
        </text>
        <path d="M 424 248 V 256 M 424 252 L 420 248 M 424 252 L 428 248" strokeWidth="0.7" />

        <text
          x="256"
          y="278"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          continuous amps — not starting surge
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
        filter="url(#bp-mbb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 296 Q 692 304 684 304 H 538 Q 530 304 528 296 Z"
          strokeWidth="1.3"
        />

        {/* Clock / runtime */}
        <circle cx="612" cy="148" r="36" strokeWidth="1.2" />
        <path d="M 612 148 V 128" strokeWidth="1.2" />
        <path d="M 612 148 L 628 156" strokeWidth="1" />
        <text
          x="612"
          y="124"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          runtime
        </text>

        <text
          x="612"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          6.4 h
        </text>
        <text
          x="612"
          y="242"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          384 min
        </text>
        <text
          x="612"
          y="264"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          at 25 A continuous
        </text>
        <text
          x="612"
          y="282"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          trolling + house loads
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-mbb-pencil)"
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
          clamp meter at your thrust setting — higher speed = more amps
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          (200 × 80%)
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ÷
        </text>
        <text x="160" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          25 A
        </text>
        <text x="195" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="215" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          6.4 h on the water
        </text>
      </g>
    </svg>
  );
}
