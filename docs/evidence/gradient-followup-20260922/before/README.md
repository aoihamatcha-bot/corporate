# Gradient follow-up: Before (LOCAL)

Captured 2026-09-22 09:21:21–09:21:38 UTC from the **already-built** production-mode server at `http://127.0.0.1:3017`. The implementation owner identified its built source as `fa9a7b4738395b2f4e205d410e7837ac0f5c1e64`. Editable source changes during capture are not treated as runtime identity.

- Build ID: `b19YiBrdl0VSoKHyvQe0Q`.
- Actual runtime digest: `e843db97147011d14f5a72775e12874f2cdf7b5c82c5342aef24afe37d4db775`.
- Digest covers sorted paths and bytes under `.next/static`, `.next/server`, and `.next/BUILD_ID`. Per-file hashes are in [record.json](record.json).
- The runtime digest was identical before and after capture.
- All 13 observed served JS/CSS response bodies exactly matched the corresponding built files by SHA-256.
- No application source, build output, CI, Hosted setting, or deployment was changed by this task. Only these new evidence files were written.

## Screenshots

JA/EN × 1440×1000 / 390×844: `{ja,en}-{1440,390}-hero.png` and `{ja,en}-{1440,390}-about-intro.png` (8 PNGs). Additional normal-motion background diagnostics:

- [Home about section](ja-1440-home-about-active-diagnostic.png)
- [About page introduction](ja-1440-about-intro-active-diagnostic.png)

The two diagnostics use the actual CSS background animations, sought to `delay + duration × 0.45` and paused using WAAPI **after** finite text animation completes. The exact timing, transform, opacity, computed gradients, and palette are recorded. These screenshots illustrate an active animation phase; they are not natural elapsed-time measurements or a claimed peak-opacity frame.

All captures use headless Chromium 153.0.8010.12, device scale 1, desktop-browser viewport emulation, normal motion, localhost without throttling. `Math.random = () => 0.99` is installed before application JavaScript to make the old Scene palette reassignment reproducible. Hero waits for natural opening phase `complete`, `data-intro=done`, fonts ready and image decoding. Page introductions wait for scene entry and finite animation completion. Infinite animation is not awaited or globally disabled.

The source fixture preserves the normal palette algorithm; this deterministic browser-only random override is a diagnostic condition. No production color or behavior was changed for capture.

## Computed background observations

- Hero uses `rgb(234,246,255)` as its base. Desktop shade is a 90-degree linear gradient with white-blue opacity stops `0.98`, `0.94`, `0.25`, then transparent; mobile shade uses vertical opacity stops `0.99`, `0.96`, `0.65`.
- `/about` and `/en/about` page introductions all become `data-palette="twilight"` after Scene entry. Their settled background contains a radial gradient at 95%/20% with `rgb(213,217,241)`, on `rgb(244,249,255)`.
- The Home about section also becomes `twilight`. Its static background includes blue `rgb(171,223,255)` and violet `rgb(211,206,255)` radial gradients on `rgb(232,247,255)`.
- Scene color layers resolve to twilight purple/pink/peach: lead `rgb(213,217,241) → rgb(235,216,232) → rgb(251,225,210)`; echo `rgb(251,225,210) → rgb(234,231,251) → rgb(213,217,241)`. Their opacity is 0 at natural completion and approximately 0.108609 at the recorded diagnostic phase.

All console messages and page errors were collected: **0 console messages, 0 page errors, 0 failed requests, 0 HTTP errors** across the four locale/viewport contexts. Representative settled About and diagnostic Home-about images were visually inspected. This package is visual/runtime evidence, not field performance or real-device acceptance.

[capture-before.mjs](capture-before.mjs) preserves the exact one-off capture procedure. It is tied to the old expected Build ID and must not be run against a later build or used to overwrite this record.
