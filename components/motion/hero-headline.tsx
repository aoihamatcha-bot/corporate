"use client";

import { useEffect, useRef } from "react";
import { RevealText } from "./reveal-text";
import { useMotionPaused } from "./motion-preference";

export const openingHoldMs = 1000;
export const openingDockMs = 1200;

export function HeroHeadline({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const paused = useMotionPaused();
  useEffect(() => {
    const heading = ref.current;
    if (!heading || paused) return;
    const animations: Animation[] = [];
    const settle = () => {
      animations.splice(0).forEach((animation) => animation.cancel());
      heading.dataset.dockState = "settled";
    };
    const dock = () => {
      heading.dataset.dockState = "running";
      try {
        // The incoming SVG owns the entrance. The final type is already laid
        // out with loaded fonts; only opacity changes during the handoff.
        heading
          .querySelectorAll<HTMLElement>(".hero-dock-line")
          .forEach((line) => {
            line.dataset.entered = "true";
            line.dataset.revealState = "settled";
          });
        const fade = heading.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: openingDockMs * 0.55,
          delay: openingDockMs * 0.45,
          fill: "both",
          easing: "ease-in-out",
        });
        animations.push(fade);
        // Keep the fade until intro-end removes the CSS cover, avoiding a
        // zero-opacity frame if the two animations finish separately.
        void fade.finished.then(
          () => {
            heading.dataset.dockState = "settled";
          },
          () => {},
        );
      } catch {
        settle();
      }
    };
    window.addEventListener("mystena:hero-dock", dock);
    window.addEventListener("mystena:intro-end", settle);
    window.addEventListener("resize", settle);
    return () => {
      settle();
      window.removeEventListener("mystena:hero-dock", dock);
      window.removeEventListener("mystena:intro-end", settle);
      window.removeEventListener("resize", settle);
    };
  }, [paused, lines]);
  return (
    <h1 ref={ref} id="hero-title" className="hero-headline" tabIndex={-1}>
      {lines.map((line, i) => (
        <RevealText
          key={line}
          className="hero-dock-line"
          palette={i ? "iris" : "sky"}
          direction={i ? "right" : "left"}
        >
          {line}
        </RevealText>
      ))}
    </h1>
  );
}
