"use client";
import { useEffect } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { useMotionPaused, toggleMotion } from "./motion-preference";
import { RevealText } from "./reveal-text";
import { MenuInk } from "./menu-ink";
export function MotionControl({
  labels,
  menu = false,
}: {
  labels: Dictionary["common"]["motion"];
  menu?: boolean;
}) {
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
      aria-label={paused ? labels.play : labels.pause}
      title={paused ? labels.pausedTitle : labels.pause}
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
        <MenuInk kind="utility">{`${labels.label} ${paused ? labels.off : labels.on}`}</MenuInk>
      ) : (
        <RevealText kind="utility">{`${labels.label} ${paused ? labels.off : labels.on}`}</RevealText>
      )}
    </button>
  );
}
