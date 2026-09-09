"use client";

import { useSyncExternalStore } from "react";

// Follow device accessibility settings; no site toggle or stored override.
const queries = ["(prefers-reduced-motion: reduce)", "(forced-colors: active)"];
function snapshot() {
  return queries.some((query) => window.matchMedia(query).matches);
}
function subscribe(callback: () => void) {
  const media = queries.map((query) => window.matchMedia(query));
  media.forEach((item) => item.addEventListener("change", callback));
  return () =>
    media.forEach((item) => item.removeEventListener("change", callback));
}
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
