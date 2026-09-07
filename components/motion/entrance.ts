// Every target observes its own viewport entry. A long section must not consume
// animations for text or images that are still below the fold.
export function motionAvailable() {
  return (
    !document.hidden &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !matchMedia("(forced-colors: active)").matches &&
    document.documentElement.dataset.motion !== "paused" &&
    typeof Element.prototype.animate === "function"
  );
}

export function observeEntrance(element: HTMLElement, play: () => () => void) {
  if (!window.IntersectionObserver || element.dataset.entered === "true")
    return () => {};
  let visible = false;
  let stop: (() => void) | undefined;
  const settle = () => stop?.();
  function start() {
    if (!visible || element.dataset.entered === "true" || !motionAvailable())
      return;
    element.dataset.entered = "true";
    stop = play();
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else settle();
    },
    { threshold: 0.12, rootMargin: "-80px 0px -6% 0px" },
  );
  const visibility = () => (document.hidden ? settle() : start());
  observer.observe(element);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("resize", settle, { passive: true });
  return () => {
    observer.disconnect();
    settle();
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("resize", settle);
  };
}

export const palettes = ["sky", "mint", "apricot", "iris"] as const;
export type Palette = (typeof palettes)[number];
