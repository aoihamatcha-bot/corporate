"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "./motion-preference";
import { observeEntrance, randomPalette, type Palette } from "./entrance";
import { motionToken } from "./tokens";
import { textRhythm, type TextKind } from "./text-rhythm";

export function RevealText({
  children,
  palette = "sky",
  direction = "left",
  cut = false,
  light = false,
  className = "",
  kind = "heading",
}: {
  children: string;
  palette?: Palette;
  direction?: "left" | "right";
  cut?: boolean;
  light?: boolean;
  className?: string;
  kind?: TextKind;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const source = useRef<HTMLSpanElement>(null);
  const color = useRef<HTMLSpanElement>(null);
  const bands = useRef<HTMLSpanElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const element = root.current;
    if (!element || paused) return;
    return observeEntrance(
      element,
      () => {
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
          const colors = randomPalette();
          element.dataset.palette = colors;
          const computed = getComputedStyle(element);
          const beat = Number(computed.getPropertyValue("--ink-beat"));
          const token = (part: string) =>
            Number(computed.getPropertyValue(`--${kind}-${part}-ms`));
          const delay = token("delay") + beat * 37;
          const wipeMs = token("wipe") + beat * 19;
          const holdMs = token("hold") + beat * 20;
          const fadeMs = token("fade") + beat * 43;
          const lastBandDelay = Math.min(Math.max(lines.length - 1, 0), 4) * 65;
          const clearMs = wipeMs + lastBandDelay;
          const colorMs = clearMs + holdMs + fadeMs;
          const hidden =
            direction === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
          const mask = [
            { clipPath: hidden },
            { clipPath: hidden, offset: 0.35 },
            { clipPath: "inset(0)" },
          ];
          // Reveal the glyphs behind the departing band, rather than displaying
          // the complete colored sentence before the band arrives.
          const focusedHeading = element.closest("h1")?.matches(":focus");
          if (!focusedHeading && kind !== "utility") {
            for (const target of [original, overlay]) {
              animations.push(
                target.animate(mask, {
                  duration: wipeMs,
                  delay,
                  easing: "cubic-bezier(.65,0,.2,1)",
                  fill: "backwards",
                }),
              );
            }
          }
          if (kind !== "utility")
            lines.forEach((rect, index) => {
              const band = document.createElement("i");
              band.className = "reveal-band";
              // Each line has a related but separate hue from the text overlay.
              band.dataset.palette = randomPalette(colors);
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
                    delay: delay + Math.min(index, 4) * 65,
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
          if (kind === "heading")
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
                  delay,
                  easing: "cubic-bezier(.16,1,.3,1)",
                },
              ),
            );
          const glow = overlay.animate(
            [
              { opacity: 1, backgroundPosition: "0% 50%" },
              {
                opacity: 1,
                backgroundPosition: "65% 50%",
                offset: (clearMs + holdMs) / colorMs,
                easing: "ease-in-out",
              },
              { opacity: 0, backgroundPosition: "100% 50%" },
            ],
            {
              duration: colorMs,
              delay,
              easing: "linear",
            },
          );
          animations.push(glow);
          glow.onfinish = stop;
        } catch {
          // Partial API failure also removes the bands. Server text stays readable.
          stop();
        }
        return stop;
      },
      kind === "utility",
    );
  }, [paused, children, direction, cut, palette, kind]);

  return (
    <span
      ref={root}
      className={`reveal-text ${className}`}
      data-palette={palette}
      data-tone={light ? "light" : "dark"}
      data-reveal={cut ? `cut-${direction}` : direction}
      data-motion-kind={kind}
      style={textRhythm(children, kind)}
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
