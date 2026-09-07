// CSS is the single adjustment point for the choreography, including JS-driven motion.
export function motionToken(name: string, fallback: number) {
  const value = Number(
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
  );
  return Number.isFinite(value) && value > 0 ? value : fallback;
}
