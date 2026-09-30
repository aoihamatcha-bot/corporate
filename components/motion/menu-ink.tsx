import { textRhythm, type TextKind } from "./text-rhythm";

// Native dialog open/close controls this CSS animation, so every opening gets
// its own entrance without changing the once-only viewport text behavior.
export function MenuInk({
  children,
  large = false,
  kind = "label",
}: {
  children: string;
  large?: boolean;
  kind?: TextKind;
}) {
  return (
    <span
      className={`menu-ink${large ? " nav-en" : ""}`}
      data-palette="sky"
      data-motion-kind={kind}
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
      <i
        className={`menu-ink-wipe${large ? " nav-en-wipe" : ""}`}
        aria-hidden="true"
      />
    </span>
  );
}
