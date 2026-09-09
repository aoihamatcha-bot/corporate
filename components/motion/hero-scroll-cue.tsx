"use client";

import { useEffect, useRef } from "react";
import { motionAvailable } from "./entrance";

export function HeroScrollCue({ label }: { label: string }) {
  const ref = useRef<SVGPathElement>(null);
  useEffect(() => {
    let animation: Animation | undefined;
    let drawn = false;
    const settle = () => animation?.cancel();
    const draw = () => {
      if (drawn || !ref.current || !motionAvailable()) return;
      drawn = true;
      // Draw once during the existing handoff, without a delayed second act.
      try {
        animation = ref.current.animate(
          [
            { strokeDashoffset: "1", opacity: 0 },
            { strokeDashoffset: "0", opacity: 0.7 },
          ],
          { duration: 700, easing: "ease-out" },
        );
      } catch {
        // Static SVG remains readable if the animation API fails.
      }
    };
    window.addEventListener("mystena:hero-dock", draw);
    window.addEventListener("mystena:intro-end", settle);
    return () => {
      settle();
      window.removeEventListener("mystena:hero-dock", draw);
      window.removeEventListener("mystena:intro-end", settle);
    };
  }, []);
  return (
    <a href="#business" className="scroll-link hero-scroll-cue">
      <span>{label}</span>
      <svg viewBox="0 0 80 28" aria-hidden="true" fill="none">
        <path
          ref={ref}
          pathLength="1"
          d="M3 8 C20 2 39 5 51 12 S65 22 71 16 M65 16 L71 16 L72 10"
        />
      </svg>
    </a>
  );
}
