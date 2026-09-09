"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPaused } from "./motion-preference";
import {
  entranceReady,
  motionAvailable,
  randomPalette,
  type Palette,
} from "./entrance";
import { StoryAccent, type StoryBeat } from "./story-accent";

// Content is visible in server HTML. Animation enhances an already readable page.
export function Scene({
  children,
  className = "",
  palette = "sky",
  direction = "left",
  id,
  story,
  deferUntilScroll = false,
}: {
  children: ReactNode;
  className?: string;
  palette?: Palette;
  direction?: "left" | "right";
  id?: string;
  story?: StoryBeat;
  deferUntilScroll?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useRef(false);
  const paused = useMotionPaused();
  useEffect(() => {
    const el = ref.current;
    if (!el || paused || !window.IntersectionObserver) return;
    let visible = false;
    const start = () => {
      if (!visible || seen.current || !motionAvailable() || !entranceReady(el))
        return;
      const title = el.querySelector(".section-top");
      if (
        deferUntilScroll &&
        title &&
        title.getBoundingClientRect().top > innerHeight * 0.88
      )
        return;
      seen.current = true;
      el.dataset.palette = randomPalette();
      el.classList.add("scene-entered");
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        el.dataset.visible = String(visible);
        start();
      },
      { threshold: 0.08 },
    );
    const onVisibility = () => {
      el.dataset.hidden = String(document.hidden);
      start();
    };
    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("mystena:intro-end", start);
    if (deferUntilScroll)
      window.addEventListener("scroll", start, { passive: true });
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mystena:intro-end", start);
      if (deferUntilScroll) window.removeEventListener("scroll", start);
    };
  }, [paused, direction, deferUntilScroll]);

  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;
    const media = matchMedia("(hover: hover) and (pointer: fine)");
    let raf = 0,
      x = 0,
      y = 0,
      echoX = 0,
      echoY = 0,
      targetX = 0,
      targetY = 0;
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      el!.dataset.pointer = "false";
    }
    function frame() {
      raf = 0;
      if (
        document.hidden ||
        !media.matches ||
        el!.dataset.visible === "false"
      ) {
        stop();
        return;
      }
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      echoX += (x - echoX) * 0.065;
      echoY += (y - echoY) * 0.065;
      el!.style.setProperty("--pointer-x", `${x}px`);
      el!.style.setProperty("--pointer-y", `${y}px`);
      el!.style.setProperty("--echo-x", `${echoX}px`);
      el!.style.setProperty("--echo-y", `${echoY}px`);
      if (
        Math.abs(targetX - x) +
          Math.abs(targetY - y) +
          Math.abs(x - echoX) +
          Math.abs(y - echoY) >
        0.4
      )
        raf = requestAnimationFrame(frame);
    }
    function move(event: PointerEvent) {
      if (!media.matches || event.pointerType === "touch" || document.hidden)
        return;
      const bounds = el!.getBoundingClientRect();
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      if (el!.dataset.pointer !== "true") {
        x = echoX = targetX;
        y = echoY = targetY;
      }
      el!.dataset.pointer = "true";
      if (!raf) raf = requestAnimationFrame(frame);
    }
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", stop);
    document.addEventListener("visibilitychange", stop);
    media.addEventListener("change", stop);
    return () => {
      stop();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", stop);
      document.removeEventListener("visibilitychange", stop);
      media.removeEventListener("change", stop);
    };
  }, [paused]);
  return (
    <section
      ref={ref}
      id={id}
      className={`scene ${className}`}
      data-palette={palette}
      data-direction={direction}
      data-story={story}
      data-scroll-gated={deferUntilScroll || undefined}
    >
      <div className="scene-colors" aria-hidden="true">
        <i className="color-lead" />
        <i className="color-echo" />
        <i className="pointer-light" />
        <i className="pointer-echo" />
      </div>
      {story ? <StoryAccent beat={story} /> : null}
      {children}
    </section>
  );
}
