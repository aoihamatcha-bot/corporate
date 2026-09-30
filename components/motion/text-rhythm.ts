import type { CSSProperties } from "react";

export type TextKind = "heading" | "subtitle" | "body" | "label" | "utility";

// A stable rhythm within each composition, with separate envelopes for each
// typographic role. Palette selection happens independently in the browser.
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
  } as CSSProperties;
}
