"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "./motion-control";
import { observeEntrance, palettes, type Palette } from "./entrance";
import { motionToken } from "./tokens";

export function RevealText({
  children,
  palette = "sky",
  direction = "left",
  cut = false,
  light = false,
  className = "",
}: {
  children: string;
  palette?: Palette;
  direction?: "left" | "right";
  cut?: boolean;
  light?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const source = useRef<HTMLSpanElement>(null);
  const color = useRef<HTMLSpanElement>(null);
  const bands = useRef<HTMLSpanElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const element = root.current;
    if (!element || paused) return;
    return observeEntrance(element, () => {
      const original = source.current!;
      const overlay = color.current!;
      const layer = bands.current!;
      const animations: Animation[] = [];
      let stopped = false;
      const stop = () => {
        if (stopped) return;
        stopped = true;
        animations.forEach((animation) => animation.cancel());
        layer.replaceChildren();
        element.dataset.revealState = "settled";
      };
      element.dataset.revealState = "running";
      try {
        // Range rects follow real Japanese wrapping without replacing the text
        // nodes, changing reading order, or maintaining a second layout engine.
        const range = document.createRange();
        range.selectNodeContents(original);
        const bounds = element.getBoundingClientRect();
        const lines = Array.from(range.getClientRects()).filter(
          (rect) => rect.width > 0 && rect.height > 0,
        );
        const wipeMs = motionToken("--text-wipe-ms", 620);
        lines.forEach((rect, index) => {
          const band = document.createElement("i");
          band.className = "reveal-band";
          // Each line has a related but separate hue from the text overlay.
          band.dataset.palette =
            palettes[(palettes.indexOf(palette) + 1 + index) % palettes.length];
          Object.assign(band.style, {
            left: `${rect.left - bounds.left}px`,
            top: `${rect.top - bounds.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          });
          layer.append(band);
          const left = "inset(0 100% 0 0)";
          const right = "inset(0 0 0 100%)";
          animations.push(
            band.animate(
              [
                { clipPath: direction === "left" ? left : right },
                { clipPath: "inset(0 0 0 0)", offset: 0.38 },
                { clipPath: "inset(0 0 0 0)", offset: 0.48 },
                { clipPath: direction === "left" ? right : left },
              ],
              {
                duration: wipeMs,
                delay: Math.min(index, 4) * 65,
                easing: "cubic-bezier(.65,0,.2,1)",
                fill: "both",
              },
            ),
          );
        });
        const distance = motionToken(
          cut ? "--cut-distance" : "--entry-distance",
          cut ? 90 : 48,
        );
        animations.push(
          element.animate(
            [
              {
                transform: `translateX(${direction === "left" ? -distance : distance}px)`,
              },
              { transform: "translateX(0)" },
            ],
            {
              duration: motionToken(cut ? "--cut-ms" : "--entry-ms", 900),
              easing: "cubic-bezier(.16,1,.3,1)",
            },
          ),
        );
        const glow = overlay.animate(
          [
            { opacity: 1, backgroundPosition: "0% 50%" },
            { opacity: 1, backgroundPosition: "65% 50%", offset: 0.48 },
            { opacity: 0, backgroundPosition: "100% 50%" },
          ],
          {
            duration: motionToken("--text-color-ms", 1600),
            easing: "ease-out",
          },
        );
        animations.push(glow);
        glow.onfinish = stop;
      } catch {
        // Partial API failure also removes the bands. Server text stays readable.
        stop();
      }
      return stop;
    });
  }, [paused, children, direction, cut, palette]);

  return (
    <span
      ref={root}
      className={`reveal-text ${className}`}
      data-palette={palette}
      data-tone={light ? "light" : "dark"}
      data-reveal={cut ? `cut-${direction}` : direction}
    >
      <span ref={source} className="reveal-source">
        {children}
      </span>
      <span
        ref={color}
        className="reveal-color"
        data-text={children}
        aria-hidden="true"
      />
      <span ref={bands} className="reveal-bands" aria-hidden="true" />
    </span>
  );
}
