import type { CSSProperties } from "react";

export type TextKind = "heading" | "subtitle" | "body" | "label" | "utility";

export const textColorRiseMs = 160;
export const textColorHoldExtensionMs = 700;
export const textBandFrames: Keyframe[] = [
  { transform: "scaleX(0)", opacity: 0 },
  { transform: "scaleX(1)", opacity: 0.5, offset: 0.38 },
  { transform: "scaleX(1)", opacity: 0.5, offset: 0.6 },
  { transform: "scaleX(1)", opacity: 0 },
];

// A stable rhythm within each composition, with separate envelopes for each
// typographic role. Reading text adds a soft band behind its visible source;
// color outlasts that band before fading to the normal reading color.
export function textRhythm(text: string, kind: TextKind): CSSProperties {
  const beat =
    Array.from(text).reduce(
      (value, char) => (value * 31 + char.charCodeAt(0)) % 997,
      0,
    ) % 8;
  return {
    "--ink-beat": beat,
    "--ink-delay": `calc(var(--${kind}-delay-ms) + ${beat * 37})`,
    "--ink-wipe": `calc(var(--${kind}-wipe-ms) + ${beat * 19})`,
    "--ink-hold": `calc(var(--${kind}-hold-ms) + ${beat * 20})`,
    "--ink-fade": `calc(var(--${kind}-fade-ms) + ${beat * 43})`,
    "--ink-ms": "calc(var(--ink-wipe) + var(--ink-hold) + var(--ink-fade))",
    "--ink-color-rise": textColorRiseMs,
    "--ink-color-hold": `calc(var(--ink-hold) + ${textColorHoldExtensionMs})`,
  } as CSSProperties;
}
