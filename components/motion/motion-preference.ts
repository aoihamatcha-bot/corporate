"use client";

import { useSyncExternalStore } from "react";
const KEY = "mystena-corporate-motion";
let sessionPaused = false;
function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function snapshot() {
  try {
    return reduced() || localStorage.getItem(KEY) === "paused";
  } catch {
    return reduced() || sessionPaused;
  }
}
function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  window.addEventListener("mystena:motion", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener("mystena:motion", callback);
  };
}
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
export function toggleMotion(paused: boolean) {
  if (reduced()) return;
  sessionPaused = !paused;
  try {
    localStorage.setItem(KEY, sessionPaused ? "paused" : "running");
  } catch {
    /* Session preference remains available. */
  }
  window.dispatchEvent(new Event("mystena:motion"));
}
