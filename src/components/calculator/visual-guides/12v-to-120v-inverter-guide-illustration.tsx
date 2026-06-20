"use client";

import { cn } from "@/lib/utils";

interface InverterLoadPlannerGuideIllustrationProps {
  className?: string;
}

/**
 * Hand-drawn blueprint sketch: inverter ratings vs load continuous/surge → OK/Over.
 * Modal only (not embedded in page DOM by default).
 */
export function InverterLoadPlannerGuideIllustration({
  className,
}: InverterLoadPlannerGuideIllustrationProps) {
  return (
    <svg
      viewBox="0 0 720 420"
      className={cn(
        "inverter-load-planner-guide-illustration w-full max-w-3xl",
        className
      )}
      role="img"
      aria-labelledby="inv-guide-title inv-guide-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="inv-guide-title">12V to 120V inverter load planner diagram</title>
      <desc id="inv-guide-desc">
        Inputs: inverter continuous and surge watt ratings, plus load continuous
        and surge watt demands. Process: compare each load tier against its
        inverter limit. Output: pass or fail with continuous headroom percentage.
      </desc>

      <defs>
        <pattern
          id="bp-inv-grid-minor"
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
          id="bp-inv-grid-major"
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <rect width="96" height="96" fill="url(#bp-inv-grid-minor)" />
          <path
            d="M 96 0 L 0 0 0 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
          />
        </pattern>
        <filter id="bp-inv-pencil" x="-2%" y="-2%" width="104%" height="104%">
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
        fill="url(#bp-inv-grid-major)"
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
        FIG. 1 — INVERTER LOAD PLANNER
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
        filter="url(#bp-inv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Inverter ratings */}
        <path
          d="M 36 92 Q 38 88 44 88 H 168 Q 174 88 176 94 V 168 Q 174 174 168 174 H 44 Q 38 174 36 168 Z"
          strokeWidth="1.1"
        />
        <rect x="52" y="100" width="40" height="28" strokeWidth="0.9" rx="1" />
        <text
          x="72"
          y="118"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          INV
        </text>
        <path d="M 100 108 H 120 V 120 H 100 Z M 124 108 H 144 V 120 H 124 Z" strokeWidth="0.6" />
        <text
          x="48"
          y="104"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          inverter
        </text>
        <text
          x="48"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2000 W cont.
        </text>
        <text
          x="48"
          y="158"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          4000 W surge
        </text>

        {/* Load demands */}
        <path
          d="M 36 186 Q 38 182 44 182 H 168 Q 174 182 176 188 V 288 Q 174 294 168 294 H 44 Q 38 294 36 288 Z"
          strokeWidth="1.1"
        />
        <circle cx="72" cy="214" r="10" strokeWidth="0.9" />
        <path d="M 72 204 V 224 M 62 214 H 82" strokeWidth="0.7" />
        <path
          d="M 96 206 Q 108 198 120 210 Q 132 222 144 208"
          strokeWidth="0.9"
        />
        <text
          x="48"
          y="198"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.65"
        >
          AC loads
        </text>
        <text
          x="48"
          y="248"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          1400 W cont.
        </text>
        <text
          x="48"
          y="270"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          2800 W surge
        </text>
        <text
          x="48"
          y="284"
          fill="currentColor"
          fontSize="7"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          motor start spike
        </text>
      </g>

      {/* Arrows to process */}
      <g stroke="currentColor" fill="none" opacity="0.65" strokeWidth="1">
        <path d="M 186 130 H 218" strokeLinecap="round" />
        <path d="M 214 126 L 222 130 L 214 134" strokeLinejoin="round" />
        <path d="M 186 236 H 218" strokeLinecap="round" />
        <path d="M 214 232 L 222 236 L 214 240" />
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
        filter="url(#bp-inv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 218 92 Q 220 86 228 86 H 468 Q 476 86 478 94 V 304 Q 476 312 468 312 H 228 Q 220 312 218 304 Z"
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
          Two-tier check
        </text>
        <text
          x="256"
          y="136"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          load ≤ rating (cont. & surge)
        </text>

        {/* 12V → inverter → 120V */}
        <rect x="268" y="148" width="28" height="20" strokeWidth="0.8" rx="1" />
        <text x="282" y="162" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          12V
        </text>
        <path d="M 296 158 H 320" strokeWidth="0.9" />
        <rect x="320" y="148" width="36" height="20" strokeWidth="0.9" rx="1" />
        <text x="338" y="162" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          INV
        </text>
        <path d="M 356 158 H 380" strokeWidth="0.9" />
        <text x="396" y="162" fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          120V AC
        </text>

        {/* Continuous bar comparison */}
        <text x="256" y="188" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          continuous
        </text>
        <path d="M 256 194 H 440" strokeWidth="0.6" opacity="0.4" />
        <path d="M 256 194 H 436" strokeWidth="1" />
        <path d="M 256 194 H 348" strokeWidth="1.2" />
        <text x="444" y="198" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          2000W
        </text>
        <text x="348" y="188" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          1400W
        </text>

        {/* Surge bar comparison */}
        <text x="256" y="218" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" opacity="0.7">
          surge (start)
        </text>
        <path d="M 256 224 H 440" strokeWidth="0.6" opacity="0.4" />
        <path d="M 256 224 H 436" strokeWidth="1" />
        <path d="M 256 224 H 364" strokeWidth="1.2" />
        <text x="444" y="228" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none">
          4000W
        </text>
        <text x="364" y="218" fill="currentColor" fontSize="7" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          2800W
        </text>

        <text
          x="256"
          y="256"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
        >
          1400 ÷ 2000 = 70% used
        </text>
        <text
          x="256"
          y="278"
          fill="currentColor"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          30% headroom
        </text>

        <text
          x="256"
          y="298"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.6"
        >
          both tiers must pass
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
        filter="url(#bp-inv-pencil)"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 528 92 Q 530 86 538 86 H 684 Q 692 86 694 94 V 304 Q 692 304 684 312 H 538 Q 530 312 528 304 Z"
          strokeWidth="1.3"
        />

        {/* OK badge */}
        <circle cx="612" cy="148" r="32" strokeWidth="1.2" />
        <path d="M 598 148 L 608 158 L 628 138" strokeWidth="1.5" />
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
          status
        </text>

        <text
          x="612"
          y="208"
          textAnchor="middle"
          fill="currentColor"
          fontSize="28"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          stroke="none"
        >
          OK
        </text>
        <text
          x="612"
          y="232"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.7"
        >
          load vs. rating
        </text>
        <text
          x="612"
          y="254"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          fontWeight="600"
        >
          cont. 70% · surge OK
        </text>
        <text
          x="612"
          y="276"
          textAnchor="middle"
          fill="currentColor"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          stroke="none"
          opacity="0.55"
        >
          Over if either tier exceeded
        </text>
      </g>

      {/* Bottom note */}
      <g
        filter="url(#bp-inv-pencil)"
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
          compressors & pumps spike on start — size surge, not just running watts
        </text>
        <text x="72" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          1400 W
        </text>
        <text x="120" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ≤
        </text>
        <text x="140" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          2000 W
        </text>
        <text x="185" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ·
        </text>
        <text x="200" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          2800 W
        </text>
        <text x="250" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none">
          ≤
        </text>
        <text x="270" y="388" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" stroke="none" fontWeight="600">
          4000 W surge
        </text>
      </g>
    </svg>
  );
}
