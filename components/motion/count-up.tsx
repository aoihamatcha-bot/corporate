"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/content/i18n";
import { observeEntrance, randomPalette } from "./entrance";
import { useMotionPaused } from "./motion-preference";

export function CountUp({
  value,
  locale,
  index,
}: {
  value: number;
  locale: Locale;
  index: number;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const color = useRef<HTMLSpanElement>(null);
  const paused = useMotionPaused();
  const formatted = new Intl.NumberFormat(locale).format(value);

  useEffect(() => {
    const element = root.current;
    const number = digits.current;
    const overlay = color.current;
    if (!element || !number || !overlay || paused) return;

    return observeEntrance(element, () => {
      let frame = 0;
      let glow: Animation | undefined;
      let stopped = false;
      const contrast = matchMedia("(forced-colors: active)");
      const formatter = new Intl.NumberFormat(locale);
      const duration = 1600 + index * 200;
      const delay = index * 140;
      const hold = 500;
      const fade = 1100;
      const total = duration + hold + fade;
      const render = (text: string) => {
        if (number.textContent === text) return;
        number.textContent = text;
        overlay.dataset.text = text;
      };
      const settle = () => {
        if (stopped) return;
        stopped = true;
        cancelAnimationFrame(frame);
        glow?.cancel();
        render(formatted);
        element.dataset.counterState = "settled";
        contrast.removeEventListener("change", onContrast);
      };
      function onContrast() {
        if (contrast.matches) settle();
      }

      element.dataset.counterState = "running";
      element.dataset.palette = randomPalette();
      try {
        render("0");
        glow = overlay.animate(
          [
            { opacity: 1, backgroundPosition: "0% 50%" },
            {
              opacity: 1,
              backgroundPosition: "65% 50%",
              offset: (duration + hold) / total,
              easing: "ease-in-out",
            },
            { opacity: 0, backgroundPosition: "100% 50%" },
          ],
          { duration: total, delay, easing: "linear", fill: "backwards" },
        );
        glow.onfinish = settle;
        const start = performance.now() + delay;
        const tick = (now: number) => {
          if (stopped) return;
          const progress = Math.min(Math.max((now - start) / duration, 0), 1);
          const eased = 1 - (1 - progress) ** 3;
          render(formatter.format(Math.floor(value * eased)));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else render(formatted);
        };
        frame = requestAnimationFrame(tick);
        contrast.addEventListener("change", onContrast);
      } catch {
        settle();
      }
      return settle;
    });
  }, [value, locale, index, formatted, paused]);

  return (
    <span
      ref={root}
      className="count-up"
      data-counter-state="static"
      data-palette="sky"
    >
      {/* Read the final value once; frame updates remain decorative. */}
      <span className="sr-only">{formatted}</span>
      <span className="count-up-visual" aria-hidden="true">
        <span className="count-up-reserve">{formatted}</span>
        <span ref={digits} className="count-up-digits">
          {formatted}
        </span>
        <span ref={color} className="count-up-color" data-text={formatted} />
      </span>
    </span>
  );
}
