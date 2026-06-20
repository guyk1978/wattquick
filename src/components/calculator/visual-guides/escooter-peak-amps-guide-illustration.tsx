"use client";

import { cn } from "@/lib/utils";

interface EscooterPeakAmpsGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: peak A vs controller limit & pack C-rate → OK/Over.
 * Modal only (not embedded in page DOM by default).
 */
export function EscooterPeakAmpsGuideIllustration({
  className,
}: EscooterPeakAmpsGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "escooter-peak-amps-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="espa-guide-title espa-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="espa-guide-title">E-scooter peak discharge amps flow diagram</title>
      <desc id="espa-guide-desc">
        Inputs: battery voltage, acceleration peak amps, controller amp limit,
        pack amp-hour capacity, and continuous C-rating. Process: compare peak
        draw to controller ceiling and to maximum pack amps from C-rate. Output:
        peak power watts and pass or fail for each limit.
      </desc>

      <defs>
        <pattern
          id="bp-espa-grid-minor"
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
          id="bp-espa-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-espa-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-espa-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-espa-grid-major)"
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
        FIG. 1 — PEAK DISCHARGE AMPS
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
        filter="url(#bp-espa-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Pack V + Ah + C */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 168 Q 174 174 168 174 H 44 Q 38 174 36 168 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="28" height="28" strokeWidth="0.9" rx="2" />
        <path d="M 60 108 H 72 M 60 116 H 72 M 60 124 H 72" strokeWidth="0.5" opacity="0.6" />
        <text x="48" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          pack
        </text>
        <text x="92" y="118" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          36 V
        </text>
        <text x="48" y="148" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          7.8 Ah · 2C
        </text>

        {/* Peak draw */}
        <path
          d="M 36 182 Q 38 178 44 178 H 168 Q 174 178 176 184 V 238 Q 174 244 168 244 H 44 Q 38 244 36 238 Z"
          strokeWidth="1.1"
        />
        <path d="M 52 198 Q 72 188 92 208 Q 112 228 132 210" strokeWidth="1" />
        <circle cx="72" cy="208" r="8" strokeWidth="0.8" />
        <path d="M 68 208 H 76 M 72 204 V 212" strokeWidth="0.5" />
        <text x="48" y="194" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          launch peak
        </text>
        <text x="48" y="228" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          18 A peak
        </text>

        {/* Controller limit */}
        <path
          d="M 36 252 Q 38 248 44 248 H 168 Q 174 248 176 254 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="260" width="36" height="24" strokeWidth="0.9" rx="1" />
        <text x="70" y="276" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          ESC
        </text>
        <text x="48" y="256" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          controller
        </text>
        <text x="96" y="284" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          20 A max
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 130 H 218" strokeLinecap="round" />
        <path d="M 214 126 L 222 130 L 214 134" strokeLinejoin="round" />
        <path d="M 186 210 H 218" strokeLinecap="round" />
        <path d="M 214 206 L 222 210 L 214 214" />
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
        filter="url(#bp-espa-pencil)"
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
          Two-tier burst check
        </text>
        <text x="256" y="136" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          max pack A = Ah × C
        </text>
        <text x="256" y="156" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.8">
          7.8 × 2 = 15.6 A
        </text>
        <text x="256" y="180" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          peak ≤ controller? 18 ≤ 20 ✓
        </text>
        <text x="256" y="200" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          peak ≤ pack? 18 ≤ 15.6 ✗
        </text>
        <text x="256" y="224" fill="currentColor" fontSize="11" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          P = V × I = 648 W
        </text>

        {/* Current spike waveform */}
        <path d="M 280 248 H 320 V 264 H 360 V 240 H 400 V 256 H 440" strokeWidth="0.9" />
        <path d="M 360 240 V 232 M 356 236 L 360 232 L 364 236" strokeWidth="0.6" />
        <path d="M 320 264 H 440" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
        <text x="328" y="260" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          15.6A
        </text>
        <text x="384" y="236" fill="currentColor" fontSize="6" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          18A
        </text>

        <text x="256" y="288" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          burst exceeds C-rate — cells heat fast
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
        filter="url(#bp-espa-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="612" y="118" textAnchor="middle" fill="currentColor" fontSize="26" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          648 W
        </text>
        <text x="612" y="138" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          peak power
        </text>

        <rect x="556" y="152" width="112" height="22" strokeWidth="0.9" rx="1" />
        <path d="M 564 163 H 620" strokeWidth="1.1" />
        <text x="564" y="158" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          controller
        </text>
        <text x="664" y="168" textAnchor="end" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          OK
        </text>

        <rect x="556" y="182" width="112" height="22" strokeWidth="0.9" rx="1" />
        <path d="M 564 193 H 600" strokeWidth="1.1" strokeDasharray="3 2" />
        <text x="564" y="188" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.6">
          pack C-rate
        </text>
        <text x="664" y="198" textAnchor="end" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          OVER
        </text>

        <text x="612" y="232" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none">
          max pack 15.6 A
        </text>
        <text x="612" y="254" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          both must pass for safe launch
        </text>
        <text x="612" y="274" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          clamp meter on hard accel
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-espa-pencil)" stroke="currentColor" fill="none" strokeLinecap="round" opacity="0.55">
        <rect x="36" y="352" width="648" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="48" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          hard launches spike above continuous C — repeated peaks heat small cells
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          36 V
        </text>
        <text x="105" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ×
        </text>
        <text x="125" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          18 A
        </text>
        <text x="160" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          =
        </text>
        <text x="180" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          648 W launch burst
        </text>
      </g>
    </svg>
  );
}
