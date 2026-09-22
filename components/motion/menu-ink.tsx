import type { Palette } from "./entrance";
import { textRhythm, type TextKind } from "./text-rhythm";

// Native dialog open/close restarts only the decorative CSS color layer.
// The source remains readable throughout, without a wipe or moving hit target.
export function MenuInk({
  children,
  large = false,
  kind = "label",
  palette = "sky",
  light = false,
}: {
  children: string;
  large?: boolean;
  kind?: TextKind;
  palette?: Palette;
  light?: boolean;
}) {
  return (
    <span
      className={`menu-ink${large ? " nav-en" : ""}`}
      data-palette={palette}
      data-tone={light ? "light" : "dark"}
      data-motion-kind={kind}
      data-text-motion="color"
      style={textRhythm(children, kind)}
    >
      <span className={`menu-ink-base${large ? " nav-en-base" : ""}`}>
        {children}
      </span>
      <span
        className={`menu-ink-color${large ? " nav-en-color" : ""}`}
        data-text={children}
        aria-hidden="true"
      />
    </span>
  );
}
