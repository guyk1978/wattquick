import type { CSSProperties } from "react";

/** Soft white-glow honeycomb — base layer */
const HEX_BASE = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="98" viewBox="0 0 56 98"><defs><filter id="g" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.25" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g fill="none" stroke="#ffffff" stroke-width="0.9" opacity="0.38" filter="url(#g)"><path d="M28 0 56 16v28L28 60 0 44V16Z"/><path d="M28 38 56 54v28L28 98 0 82V54Z"/></g><g fill="none" stroke="#7dd3fc" stroke-width="0.65" opacity="0.2"><path d="M28 0 56 16v28L28 60 0 44V16Z"/><path d="M28 38 56 54v28L28 98 0 82V54Z"/></g></svg>`);

/** Mixed fills — some cells lit, some teal */
const HEX_ACCENT = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="168" height="196" viewBox="0 0 168 196"><defs><filter id="g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g fill="none" stroke="#cffafe" stroke-width="0.85" opacity="0.16"><path d="M28 0 56 16v28L28 60 0 44V16Z"/><path d="M28 38 56 54v28L28 98 0 82V54Z"/><path d="M84 0 112 16v28L84 60 56 44V16Z"/><path d="M84 38 112 54v28L84 98 56 82V54Z"/><path d="M140 0 168 16v28L140 60 112 44V16Z"/><path d="M140 38 168 54v28L140 98 112 82V54Z"/></g><path fill="rgba(255,255,255,0.16)" stroke="#fff" stroke-width="1.4" filter="url(#g)" d="M84 0 112 16v28L84 60 56 44V16Z" opacity="0.72"/><path fill="rgba(255,255,255,0.1)" stroke="#ecfeff" stroke-width="1.25" filter="url(#g)" d="M28 38 56 54v28L28 98 0 82V54Z" opacity="0.58"/><path fill="rgba(45,212,191,0.12)" stroke="#5eead4" stroke-width="1.1" d="M140 38 168 54v28L140 98 112 82V54Z" opacity="0.5"/><path fill="none" stroke="#fff" stroke-width="1.65" filter="url(#g)" d="M84 38 112 54v28L84 98 56 82V54Z" opacity="0.78"/></svg>`);

/** Bright upper-right cluster — visible behind hero / sidebar top */
const HEX_GLOW = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="112" height="98" viewBox="0 0 112 98"><defs><filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path fill="rgba(255,255,255,0.2)" stroke="#fff" stroke-width="1.5" filter="url(#g)" d="M84 0 112 16v28L84 60 56 44V16Z" opacity="0.85"/><path fill="none" stroke="#fff" stroke-width="1.35" filter="url(#g)" d="M28 0 56 16v28L28 60 0 44V16Z" opacity="0.55"/><path fill="rgba(167,243,247,0.15)" stroke="#e0f2fe" stroke-width="1.2" filter="url(#g)" d="M84 38 112 54v28L84 98 56 82V54Z" opacity="0.65"/></svg>`);

/** Horizontal code band for hero atmosphere */
const CODE_AURA = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="220" viewBox="0 0 640 220"><defs><filter id="b" x="-15%" y="-30%" width="130%" height="160%"><feGaussianBlur stdDeviation="5.5"/></filter><linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0e4a4c" stop-opacity="0"/><stop offset="22%" stop-color="#0e4a4c" stop-opacity="0.45"/><stop offset="78%" stop-color="#0e4a4c" stop-opacity="0.45"/><stop offset="100%" stop-color="#0e4a4c" stop-opacity="0"/></linearGradient></defs><rect width="640" height="220" fill="url(#fade)"/><g filter="url(#b)" opacity="0.9"><rect x="48" y="52" width="360" height="6" rx="2" fill="#f472b6"/><rect x="48" y="72" width="260" height="6" rx="2" fill="#38bdf8"/><rect x="88" y="92" width="420" height="6" rx="2" fill="#a78bfa"/><rect x="48" y="112" width="200" height="6" rx="2" fill="#fbbf24"/><rect x="108" y="132" width="340" height="6" rx="2" fill="#34d399"/><rect x="48" y="152" width="280" height="6" rx="2" fill="#60a5fa"/></g></svg>`);

export const CALCULATORS_TECH_HEX_PATTERN = `url("data:image/svg+xml,${HEX_BASE}")`;

export const CALCULATORS_TECH_SURFACE_STYLES = {
  "--tech-hub-hex-base": `url("data:image/svg+xml,${HEX_BASE}")`,
  "--tech-hub-hex-accent": `url("data:image/svg+xml,${HEX_ACCENT}")`,
  "--tech-hub-hex-glow": `url("data:image/svg+xml,${HEX_GLOW}")`,
  "--tech-hub-code-aura": `url("data:image/svg+xml,${CODE_AURA}")`,
} as CSSProperties;
