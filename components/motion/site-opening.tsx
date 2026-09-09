"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Locale } from "@/content/i18n";
import {
  handwriting,
  handwritingLines,
  openingPhrase,
  glyphPlacement,
  handwritingViewBox,
  handwritingMaskWidth,
  createHandwritingSchedule,
  openingSmile,
} from "./handwriting";
import { handwritingInk } from "./handwriting-ink";
import { useMotionPaused } from "./motion-preference";
import { motionAvailable } from "./entrance";
import { openingHoldMs, openingDockMs } from "./hero-headline";

export function SiteOpening({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDialogElement>(null);
  const finishRef = useRef<(focus?: boolean) => void>(() => {});
  const generation = useRef({ value: 0 });
  const paused = useMotionPaused();

  useEffect(() => {
    const lifecycle = generation.current;
    const currentGeneration = ++lifecycle.value;
    const dialog = ref.current;
    const root = document.documentElement;
    if (!dialog || root.dataset.intro !== "pending") return;
    const animations: Animation[] = [];
    let timer = 0;
    let done = false;
    let disposed = false;
    function finish(focus = false) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      root.dataset.intro = "done";
      animations.forEach((animation) => animation.cancel());
      dialog!.close();
      window.dispatchEvent(new Event("mystena:intro-end"));
      if (focus)
        document.getElementById("main")?.focus({ preventScroll: true });
    }
    finishRef.current = finish;
    async function dock() {
      if (document.fonts) await document.fonts.ready;
      if (done || disposed) return;
      const svg = dialog!.querySelector<SVGSVGElement>(".opening-handwriting")!;
      const matrix = svg.getScreenCTM();
      const targets = document.querySelectorAll<HTMLElement>(
        "#hero-title .reveal-source",
      );
      const rows = Array.from(
        svg.querySelectorAll<SVGGElement>("[data-handwriting-row]"),
      );
      if (!matrix || targets.length !== rows.length) {
        finish();
        return;
      }
      root.dataset.intro = "docking";
      dialog!.dataset.phase = "docking";
      try {
        const flights = rows.map((row, index) => {
          const range = document.createRange();
          range.selectNodeContents(targets[index]);
          const target = range.getBoundingClientRect();
          const from = row.getBBox();
          const inverse = matrix.inverse();
          const start = new DOMPoint(target.left, target.top).matrixTransform(
            inverse,
          );
          const end = new DOMPoint(target.right, target.bottom).matrixTransform(
            inverse,
          );
          const sx = (end.x - start.x) / from.width,
            sy = (end.y - start.y) / from.height;
          const tx = start.x - from.x * sx,
            ty = start.y - from.y * sy;
          return row.animate(
            [
              { transform: "matrix(1,0,0,1,0,0)", opacity: 1 },
              {
                transform: `matrix(${sx},0,0,${sy},${tx},${ty})`,
                opacity: 0.75,
                offset: 0.8,
              },
              { transform: `matrix(${sx},0,0,${sy},${tx},${ty})`, opacity: 0 },
            ],
            {
              duration: openingDockMs,
              easing: "cubic-bezier(.22,.68,0,1)",
              fill: "forwards",
            },
          );
        });
        animations.push(...flights);
        animations.push(
          dialog!.animate(
            [{ backgroundColor: "#fff" }, { backgroundColor: "transparent" }],
            { duration: openingDockMs * 0.7, fill: "forwards" },
          ),
        );
        dialog!
          .querySelectorAll(".opening-logo, .opening-smile")
          .forEach((element) => {
            animations.push(
              element.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 400,
                fill: "forwards",
              }),
            );
          });
        window.dispatchEvent(new Event("mystena:hero-dock"));
        await Promise.all(flights.map((animation) => animation.finished));
        if (done || disposed) return;
        dialog!.dataset.phase = "complete";
        finish();
      } catch {
        if (!done && !disposed) finish();
      }
    }
    const alreadyScrolled = window.scrollY > 8;
    if (paused || !motionAvailable() || !dialog.showModal || alreadyScrolled) {
      // A scroll can arrive between the first paint and this effect. Honor it
      // with the same focus handoff as a scroll during the running opening.
      finish(alreadyScrolled);
      return;
    }
    try {
      root.dataset.intro = "running";
      dialog.dataset.phase = "writing";
      dialog.showModal();
      dialog.focus({ preventScroll: true });
      const logo = dialog.querySelector(".opening-logo")!;
      animations.push(
        logo.animate(
          [
            { opacity: 0, transform: "translate(-50%, -50%)" },
            { opacity: 1, transform: "translate(-50%, -50%)", offset: 0.55 },
            {
              opacity: 1,
              transform:
                "translate(-50%, calc(-50% - var(--opening-logo-rise)))",
            },
          ],
          {
            duration: 850,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "forwards",
          },
        ),
      );
      const paths = Array.from(
        dialog.querySelectorAll<SVGPathElement>(".handwriting-stroke"),
      );
      const schedule = createHandwritingSchedule(
        paths.map((path) => path.getTotalLength()),
      );
      paths.forEach((path, index) => {
        const { delay, duration } = schedule.strokes[index];
        animations.push(
          path.animate(
            [
              { strokeDashoffset: 1, opacity: 0 },
              { strokeDashoffset: 0.999, opacity: 1, offset: 0.001 },
              { strokeDashoffset: 0, opacity: 1 },
            ],
            {
              duration,
              delay,
              easing: "linear",
              fill: "both",
            },
          ),
        );
      });
      dialog.querySelectorAll(".opening-smile-eye").forEach((eye) => {
        animations.push(
          eye.animate([{ opacity: 0 }, { opacity: 0.8 }], {
            duration: openingSmile.eyeDuration,
            delay: schedule.trailDelay,
            fill: "both",
            easing: "ease-out",
          }),
        );
      });
      const line = dialog.querySelector(".opening-trail")!;
      animations.push(
        line.animate(
          [
            { strokeDashoffset: 1, opacity: 0 },
            { strokeDashoffset: 0, opacity: 0.8 },
          ],
          {
            duration: openingSmile.mouthDuration,
            delay: schedule.trailDelay + openingSmile.mouthDelay,
            fill: "both",
            easing: "ease-in-out",
          },
        ),
      );
      // Start the full one-second hold only after the last pen animation has
      // actually finished, including the supplied smile/arrow flourish.
      void Promise.all(animations.map((animation) => animation.finished)).then(
        () => {
          if (done) return;
          dialog.dataset.phase = "hold";
          timer = window.setTimeout(() => {
            void dock();
          }, openingHoldMs);
        },
        () => {},
      );
    } catch {
      finish();
    }
    const dismiss = () => finish(true);
    const visibility = () => {
      if (document.hidden) finish();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (!done && event.key === "Tab") {
        event.preventDefault();
        dismiss();
      }
      if (["Escape", "PageDown", "ArrowDown", "End", " "].includes(event.key))
        dismiss();
    };
    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("touchstart", dismiss, { passive: true });
    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("keydown", keyboard);
    window.addEventListener("resize", dismiss);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      // A font promise or flight completion can outlive a preference change.
      // An obsolete effect must never restart a cover after it was dismissed.
      disposed = true;
      clearTimeout(timer);
      animations.forEach((animation) => animation.cancel());
      dialog.close();
      if (!done) root.dataset.intro = "pending";
      // Strict Mode immediately replays effects. Let that setup restart the
      // opening; a real unmount still releases all other entrance observers.
      queueMicrotask(() => {
        if (lifecycle.value === currentGeneration) finish();
      });
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("resize", dismiss);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [paused]);

  return (
    <dialog
      ref={ref}
      className="site-opening"
      tabIndex={-1}
      aria-label={locale === "ja" ? "MYSTENA オープニング" : "MYSTENA opening"}
      onCancel={() => finishRef.current(true)}
    >
      <Image
        className="opening-logo"
        src="/images/corporate/a10-wordmark-light-fit.svg"
        width={849}
        height={128}
        alt="MYSTENA"
        unoptimized
      />
      <p className="sr-only" lang="ja">
        {openingPhrase}
      </p>
      <svg
        className="opening-handwriting"
        viewBox={handwritingViewBox}
        fill="none"
        aria-hidden="true"
      >
        {handwritingLines.map((line, row) => (
          <g key={row} data-handwriting-row={row}>
            {Array.from(line).map((glyph, column) => (
              <g
                key={`${row}-${column}`}
                transform={glyphPlacement(row, column)}
              >
                {handwriting[glyph].map((d, stroke) => (
                  <g key={stroke}>
                    <defs>
                      <mask
                        id={`pen-${row}-${column}-${stroke}`}
                        maskUnits="userSpaceOnUse"
                        x="-20"
                        y="-20"
                        width="150"
                        height="150"
                      >
                        <path
                          className="handwriting-stroke"
                          d={d}
                          pathLength={1}
                          strokeWidth={handwritingMaskWidth}
                        />
                      </mask>
                    </defs>
                    <path
                      className="handwriting-ink"
                      d={handwritingInk[glyph][stroke]}
                      mask={`url(#pen-${row}-${column}-${stroke})`}
                    />
                  </g>
                ))}
              </g>
            ))}
          </g>
        ))}
        <g className="opening-smile">
          {openingSmile.eyes.map((eye, index) => (
            <circle
              key={index}
              className="opening-smile-eye"
              cx={eye.cx}
              cy={eye.cy}
              r={openingSmile.eyeRadius}
            />
          ))}
          <path
            className="opening-trail"
            d={openingSmile.mouth}
            pathLength={1}
          />
        </g>
      </svg>
    </dialog>
  );
}
