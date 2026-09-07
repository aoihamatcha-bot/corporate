"use client";

import { useSyncExternalStore, useEffect } from "react";
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
export function MotionControl() {
  const paused = useMotionPaused();
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);
  function toggle() {
    if (reduced()) return;
    sessionPaused = !paused;
    try {
      localStorage.setItem(KEY, sessionPaused ? "paused" : "running");
    } catch {
      /* Keep a usable session preference when storage is unavailable. */
    }
    window.dispatchEvent(new Event("mystena:motion"));
  }
  return (
    <button
      type="button"
      className="motion-control"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={
        paused ? "動きを再生する（OSの動き抑制設定を優先）" : "動きを止める"
      }
      title={paused ? "動きを停止中。OSの設定が優先されます" : "動きを止める"}
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {paused ? <path d="m7 4 9 6-9 6Z" /> : <path d="M7 4v12M13 4v12" />}
      </svg>
      <span>
        動き<span className="motion-state"> {paused ? "OFF" : "ON"}</span>
      </span>
    </button>
  );
}
