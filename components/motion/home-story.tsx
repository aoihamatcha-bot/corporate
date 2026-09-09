"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { entranceReady, motionAvailable } from "./entrance";
import { useMotionPaused } from "./motion-preference";

export function HomeStory({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useMotionPaused();
  const pathname = usePathname();
  useEffect(() => {
    const root = ref.current;
    const html = document.documentElement;
    if (
      !root ||
      paused ||
      !window.IntersectionObserver ||
      typeof Element.prototype.animate !== "function"
    ) {
      delete html.dataset.storyMotion;
      return;
    }
    root.dataset.storyReady = "true";
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-story]"),
    );
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        ".story-card-media, .collaboration-themes > li, .home-news .news-list > li, .home-news .news-empty-copy",
      ),
    );
    const visible = new Set<HTMLElement>();
    const active = new Map<HTMLElement, Animation>();
    const visibleTargets = new Set<HTMLElement>();
    const mobile = matchMedia("(max-width: 700px)");
    let frame = 0;

    function settleTarget(el: HTMLElement) {
      // The final CSS state is visible. Cancel only the temporary entrance;
      // opacity never falls back to zero after leaving, resizing or focusing.
      active.get(el)?.cancel();
      active.delete(el);
    }
    function play(el: HTMLElement) {
      if (
        el.dataset.storyEntered ||
        !motionAvailable() ||
        !entranceReady(el) ||
        html.dataset.intro !== "done"
      )
        return;
      // A containing link/section can enter before its image. Measure the
      // unanimated target before starting; once running, never remeasure it.
      const box = el.getBoundingClientRect();
      if (
        box.top + Math.min(box.height * 0.12, 48) > window.innerHeight * 0.92 ||
        box.bottom <= 0
      )
        return;
      el.dataset.storyEntered = "true";
      if (
        el.matches(":focus-within") ||
        el.closest("a, button")?.matches(":focus")
      )
        return;
      const card = el.classList.contains("story-card-media");
      const media = card || el.classList.contains("asset-expand");
      const index = targets.indexOf(el);
      const direction = index % 2 ? 1 : -1;
      const angle = mobile.matches || !media ? 0 : direction * 4;
      const distance = media ? (mobile.matches ? 44 : 76) : 24;
      const initial = `translate3d(${media && !mobile.matches ? direction * 24 : 0}px, ${distance}px, 0) rotate(${angle}deg) scale(${media ? 0.92 : 1})`;
      try {
        const animation = el.animate(
          [
            { opacity: 0, transform: initial },
            {
              opacity: 1,
              transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
            },
          ],
          {
            duration: media ? 1100 : 700,
            delay: mobile.matches ? 0 : (index % 2) * 120,
            easing: "cubic-bezier(.22,.68,0,1)",
            fill: "both",
          },
        );
        active.set(el, animation);
        animation.onfinish = () => settleTarget(el);
      } catch {
        // data-story-entered already exposes the complete image on API failure.
      }
    }
    function update() {
      frame = 0;
      root!.dataset.storyActive = String(
        motionAvailable() && html.dataset.intro === "done",
      );
      if (!motionAvailable()) return;
      const height = window.innerHeight;
      for (const section of visible) {
        const box = section.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, (height - box.top) / (height + box.height)),
        );
        section.style.setProperty("--story-progress", progress.toFixed(4));
        if (html.dataset.intro === "done" && entranceReady(section))
          section.dataset.storyEntered = "true";
      }
      for (const target of visibleTargets) play(target);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    // Observe a stationary box. Observing the animated image itself makes its
    // translate/scale cross the threshold again and prematurely cancel a fade.
    const anchors = new Map<Element, HTMLElement[]>();
    targets.forEach((target) => {
      const anchor = target.parentElement!;
      anchors.set(anchor, [...(anchors.get(anchor) || []), target]);
    });
    const targetObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          for (const el of anchors.get(entry.target) || []) {
            // Parent links may include long text; each image still waits for its
            // own stable, untransformed layout position to enter the viewport.
            if (entry.isIntersecting) visibleTargets.add(el);
            else {
              visibleTargets.delete(el);
              settleTarget(el);
            }
          }
        }
        schedule();
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(el);
        else visible.delete(el);
        el.dataset.storyVisible = String(entry.isIntersecting);
      }
      schedule();
    });
    anchors.forEach((_, anchor) => targetObserver.observe(anchor));
    sections.forEach((section) => sectionObserver.observe(section));
    html.dataset.storyMotion = "ready";
    const settle = () => {
      active.forEach((_, el) => settleTarget(el));
      schedule();
    };
    const focus = (event: FocusEvent) => {
      const focused = event.target;
      if (!(focused instanceof HTMLElement)) return;
      targets.forEach((el) => {
        if (el.contains(focused) || focused.contains(el)) {
          el.dataset.storyEntered = "true";
          settleTarget(el);
        }
      });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", settle);
    window.addEventListener("mystena:intro-end", schedule);
    document.addEventListener("visibilitychange", settle);
    root.addEventListener("focusin", focus);
    schedule();
    return () => {
      targetObserver.disconnect();
      sectionObserver.disconnect();
      cancelAnimationFrame(frame);
      active.forEach((animation) => animation.cancel());
      delete html.dataset.storyMotion;
      root.dataset.storyReady = "false";
      root.dataset.storyActive = "false";
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", settle);
      window.removeEventListener("mystena:intro-end", schedule);
      document.removeEventListener("visibilitychange", settle);
      root.removeEventListener("focusin", focus);
    };
  }, [paused, pathname]);
  return (
    <div ref={ref} className="home-story">
      {children}
    </div>
  );
}
