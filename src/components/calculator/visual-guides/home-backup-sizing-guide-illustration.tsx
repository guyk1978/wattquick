"use client";

import { cn } from "@/lib/utils";

interface HomeBackupSizingGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: load + hours + V + DoD + η → bank Ah/Wh.
 * Modal only (not embedded in page DOM by default).
 */
export function HomeBackupSizingGuideIllustration({
  className,
}: HomeBackupSizingGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "home-backup-sizing-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="hbs-guide-title hbs-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="hbs-guide-title">Home backup battery sizing flow diagram</title>
      <desc id="hbs-guide-desc">
        Inputs: essential load in watts, backup runtime in hours, system
        voltage, usable depth of discharge, and inverter efficiency. Process:
        calculate load energy including inverter loss, size bank watt-hours for
        depth of discharge, convert to amp-hours at system voltage. Output:
        minimum battery bank size in amp-hours and watt-hours.
      </desc>

      <defs>
        <pattern
          id="bp-hbs-grid-minor"
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
          id="bp-hbs-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-hbs-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-hbs-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-hbs-grid-major)"
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
        FIG. 1 — HOME BACKUP BATTERY SIZING
      </text>
      <path
        d="M 34 52 H 380"
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
        filter="url(#bp-hbs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 300 Q 174 306 168 306 H 44 Q 38 306 36 300 Z"
          strokeWidth="1.1"
        />

        {/* Essential loads */}
        <rect x="48" y="100" width="10" height="14" strokeWidth="0.7" />
        <path d="M 62 107 H 72" strokeWidth="0.5" />
        <circle cx="78" cy="107" r="4" strokeWidth="0.6" />
        <text x="88" y="104" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          essentials
        </text>
        <text x="88" y="118" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          800 W
        </text>

        {/* Runtime */}
        <circle cx="56" cy="142" r="10" strokeWidth="0.8" />
        <line x1="56" y1="142" x2="56" y2="134" strokeWidth="1" />
        <line x1="56" y1="142" x2="62" y2="146" strokeWidth="0.9" />
        <text x="72" y="138" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          runtime
        </text>
        <text x="72" y="152" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          8 hours
        </text>

        {/* System voltage */}
        <text x="48" y="178" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          48 V
        </text>
        <text x="48" y="168" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          bus
        </text>

        {/* DoD */}
        <path d="M 48 196 H 100" strokeWidth="0.8" />
        <path d="M 48 196 H 80" strokeWidth="1.1" />
        <text x="48" y="190" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          DoD
        </text>
        <text x="48" y="214" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          80%
        </text>

        {/* Inverter efficiency */}
        <rect x="48" y="226" width="24" height="18" strokeWidth="0.8" rx="1" />
        <text x="54" y="238" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          INV
        </text>
        <text x="80" y="238" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          92% η
        </text>

        <path d="M 48 252 H 156" strokeWidth="0.5" opacity="0.4" />
        <text x="48" y="268" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          fridge · lights · router
        </text>
        <text x="48" y="284" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          not whole-house panel
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 180 H 218" strokeLinecap="round" />
        <path d="M 214 176 L 222 180 L 214 184" strokeLinejoin="round" />
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
        filter="url(#bp-hbs-pencil)"
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
          1. Load energy (+ inverter)
        </text>
        <text x="256" y="132" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          Wh = (W × hrs) ÷ η
        </text>
        <text x="256" y="150" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          (800×8) ÷ 0.92 ≈ 6,957 Wh
        </text>

        <path d="M 238 162 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="182" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2. Bank Wh for DoD
        </text>
        <text x="256" y="202" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          bank Wh = Wh ÷ (DoD ÷ 100)
        </text>
        <text x="256" y="220" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          6,957 ÷ 0.80 ≈ 8,696 Wh
        </text>

        <path d="M 238 232 H 450" strokeWidth="0.6" opacity="0.45" />

        <text x="238" y="252" fill="currentColor" fontSize="10" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          3. Convert to Ah
        </text>
        <text x="256" y="272" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none">
          bank Ah = bank Wh ÷ V
        </text>
        <text x="256" y="290" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.75">
          8,696 ÷ 48 ≈ 181 Ah
        </text>
      </g>

      {/* Energy flow sketch */}
      <g filter="url(#bp-hbs-pencil)" stroke="currentColor" fill="none" opacity="0.5">
        <rect x="36" y="318" width="168" height="28" strokeWidth="0.7" strokeDasharray="3 2" rx="1" />
        <rect x="40" y="322" width="120" height="20" strokeWidth="0.6" fill="currentColor" fillOpacity="0.08" rx="1" />
        <line x1="160" y1="332" x2="168" y2="332" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
        <text x="44" y="336" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          80% usable slice
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
        filter="url(#bp-hbs-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 312 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        <text x="548" y="108" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          minimum bank
        </text>

        <text x="616" y="152" textAnchor="middle" fill="currentColor" fontSize="30" fontFamily="ui-monospace, monospace" fontWeight="700" stroke="none">
          181 Ah
        </text>
        <text x="616" y="174" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          @ 48 V bus
        </text>

        <text x="616" y="212" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="ui-monospace, monospace" fontWeight="600" stroke="none">
          8,696 Wh
        </text>
        <text x="616" y="232" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          nameplate bank energy
        </text>

        <text x="616" y="268" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.55">
          6,957 Wh delivered to loads
        </text>
        <text x="616" y="286" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.5">
          add 10–20% for aging · cold
        </text>
      </g>

      {/* Bottom note */}
      <g filter="url(#bp-hbs-pencil)" stroke="currentColor" fill="none" opacity="0.55">
        <rect x="228" y="352" width="456" height="48" strokeWidth="0.8" strokeDasharray="4 3" rx="1" />
        <text x="240" y="368" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.65">
          LiFePO₄ ~80–90% DoD · lead-acid ~50%
        </text>
        <text x="240" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          pair with Critical Load Analysis for device-level Wh audit
        </text>
      </g>
    </svg>
  );
}
