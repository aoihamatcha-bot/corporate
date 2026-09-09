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

// Anchor navigation and restored scroll positions also satisfy this gate.
export function entranceReady(element: Element) {
  return (
    (!["pending", "running", "docking"].includes(
      document.documentElement.dataset.intro ?? "",
    ) ||
      element.closest(".site-opening") !== null) &&
    (!element.closest("[data-scroll-gated]") || window.scrollY > 8)
  );
}

export function observeEntrance(
  element: HTMLElement,
  play: () => () => void,
  utility = false,
) {
  if (
    !window.IntersectionObserver ||
    element.dataset.entered === "true" ||
    element.closest("[data-motion-static]")
  )
    return () => {};
  let visible = false;
  let disposed = false;
  let fontsReady = !document.fonts || document.fonts.status === "loaded";
  let stop: (() => void) | undefined;
  const settle = () => stop?.();
  function start() {
    if (
      disposed ||
      !fontsReady ||
      !visible ||
      element.dataset.entered === "true" ||
      !motionAvailable() ||
      !entranceReady(element)
    )
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
    { threshold: 0.12, rootMargin: utility ? "0px" : "-80px 0px -6% 0px" },
  );
  const visibility = () => (document.hidden ? settle() : start());
  observer.observe(element);
  // Text bands measure real line boxes. Wait for web fonts before capturing
  // them; failed font requests also settle ready, leaving readable fallbacks.
  if (!fontsReady) {
    void document.fonts.ready.then(() => {
      fontsReady = true;
      start();
    });
  }
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("mystena:intro-end", start);
  const scrollGated = element.closest("[data-scroll-gated]");
  if (scrollGated) window.addEventListener("scroll", start, { passive: true });
  window.addEventListener("resize", settle, { passive: true });
  return () => {
    disposed = true;
    observer.disconnect();
    settle();
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("mystena:intro-end", start);
    if (scrollGated) window.removeEventListener("scroll", start);
    window.removeEventListener("resize", settle);
  };
}

export const palettes = [
  "sky",
  "mint",
  "apricot",
  "iris",
  "lagoon",
  "rose",
  "honey",
  "twilight",
] as const;
export type Palette = (typeof palettes)[number];

// Only called after hydration or on interaction. Server markup is deterministic.
export function randomPalette(except?: Palette): Palette {
  const choices = palettes.filter((palette) => palette !== except);
  return choices[Math.floor(Math.random() * choices.length)];
}
