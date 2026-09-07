"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMotionPaused } from "./motion-control";
import {
  motionAvailable,
  observeEntrance,
  palettes,
  type Palette,
} from "./entrance";
import { motionToken } from "./tokens";

export function GradientImage({
  src,
  sizes,
  preload = false,
  className = "",
  palette = "sky",
  blend = "screen",
}: {
  src: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  palette?: Palette;
  blend?: "screen" | "multiply";
}) {
  const root = useRef<HTMLSpanElement>(null);
  const cycle = useRef(palettes.indexOf(palette));
  const paused = useMotionPaused();

  useEffect(() => {
    const element = root.current;
    if (!element || paused) return;
    const wash = element.querySelector<HTMLElement>(".image-wash")!;
    const echo = element.querySelector<HTMLElement>(".image-echo")!;
    const wipe = element.querySelector<HTMLElement>(".image-wipe")!;
    let animations: Animation[] = [];
    let active = false;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    function settle() {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      element!.dataset.imageState = "settled";
    }
    function play(hold = false) {
      settle();
      if (!motionAvailable()) return settle;
      element!.dataset.palette = palettes[cycle.current % palettes.length];
      cycle.current += 1;
      element!.dataset.imageState = hold ? "hover" : "entering";
      try {
        const duration = motionToken("--image-color-ms", 1500);
        animations.push(
          wash.animate(
            hold
              ? [
                  { opacity: 0.9, transform: "translateX(-101%)" },
                  { opacity: 0.9, transform: "translateX(0)" },
                ]
              : [
                  { opacity: 0.95 },
                  { opacity: 0.85, offset: 0.45 },
                  { opacity: 0 },
                ],
            {
              duration: hold ? motionToken("--image-hover-ms", 280) : duration,
              fill: hold ? "forwards" : "none",
              easing: "cubic-bezier(.22,.8,.3,1)",
            },
          ),
        );
        if (!hold) {
          animations.push(
            echo.animate(
              [
                { opacity: 0.65, transform: "translateX(-100%)" },
                { opacity: 0.45, transform: "translateX(0)", offset: 0.4 },
                { opacity: 0, transform: "translateX(100%)" },
              ],
              { duration, delay: 100, easing: "ease-out" },
            ),
          );
          animations.push(
            wipe.animate(
              [
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0)", offset: 0.35 },
                { clipPath: "inset(0 0 0 100%)" },
              ],
              {
                duration: motionToken("--text-wipe-ms", 620),
                easing: "cubic-bezier(.65,0,.2,1)",
              },
            ),
          );
          animations[1].onfinish = settle;
        }
      } catch {
        settle();
      }
      return settle;
    }
    // Choose a first variant only on the client; subsequent interactions visit
    // each of the four palettes exactly once before repeating.
    cycle.current =
      (cycle.current + Math.floor(Math.random() * palettes.length)) %
      palettes.length;
    const disposeEntrance = observeEntrance(element, () => {
      const image = element.querySelector("img")!;
      const ready = () => play();
      if (image.complete) return play();
      image.addEventListener("load", ready, { once: true });
      return () => {
        image.removeEventListener("load", ready);
        settle();
      };
    });
    const link = element.closest("a");
    function enter() {
      if (active) return;
      active = true;
      if (link) play(true);
    }
    function leave() {
      active = false;
      if (element!.dataset.imageState !== "hover") return;
      settle();
      if (!motionAvailable()) return;
      try {
        const exit = wash.animate(
          [
            { opacity: 0.9, transform: "translateX(0)" },
            { opacity: 0.9, transform: "translateX(101%)" },
          ],
          {
            duration: motionToken("--image-hover-ms", 280),
            easing: "ease-out",
          },
        );
        animations.push(exit);
        exit.onfinish = settle;
      } catch {
        settle();
      }
    }
    function onPointerEnter(event: PointerEvent) {
      if (pointer.matches && event.pointerType !== "touch") enter();
    }
    function onPointerLeave() {
      if (link?.contains(document.activeElement)) return;
      leave();
    }
    const onVisibility = () => {
      if (document.hidden) {
        active = false;
        settle();
      }
    };
    link?.addEventListener("pointerenter", onPointerEnter);
    link?.addEventListener("pointerleave", onPointerLeave);
    link?.addEventListener("focus", enter);
    link?.addEventListener("blur", leave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposeEntrance();
      settle();
      link?.removeEventListener("pointerenter", onPointerEnter);
      link?.removeEventListener("pointerleave", onPointerLeave);
      link?.removeEventListener("focus", enter);
      link?.removeEventListener("blur", leave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  return (
    <span
      ref={root}
      className={`gradient-image ${className}`}
      data-palette={palette}
      data-blend={blend}
    >
      <Image src={src} alt="" fill sizes={sizes} preload={preload} />
      <i className="image-wash" aria-hidden="true" />
      <i className="image-echo" aria-hidden="true" />
      <i className="image-wipe" aria-hidden="true" />
    </span>
  );
}
