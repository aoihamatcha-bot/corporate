"use client";
import { useEffect } from "react";
import { useMotionPaused, toggleMotion } from "./motion-preference";
import { RevealText } from "./reveal-text";
import { MenuInk } from "./menu-ink";
export function MotionControl({ menu = false }: { menu?: boolean }) {
  const paused = useMotionPaused();
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);
  return (
    <button
      type="button"
      className="motion-control"
      onClick={() => toggleMotion(paused)}
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
      {menu ? (
        <MenuInk kind="utility">{`動き ${paused ? "OFF" : "ON"}`}</MenuInk>
      ) : (
        <RevealText kind="utility">{`動き ${paused ? "OFF" : "ON"}`}</RevealText>
      )}
    </button>
  );
}
