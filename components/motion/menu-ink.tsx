import type { TextKind } from "./text-rhythm";

// Navigation labels are readable as soon as the native dialog opens.
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
      data-motion-kind={kind}
      data-text-motion="static"
    >
      <span className={`menu-ink-base${large ? " nav-en-base" : ""}`}>
        {children}
      </span>
    </span>
  );
}
