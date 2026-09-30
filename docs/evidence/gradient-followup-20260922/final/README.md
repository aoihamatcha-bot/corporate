# Gradient follow-up: final visual evidence (LOCAL)

Captured 2026-09-22 09:54:52–09:55:25 UTC from `http://127.0.0.1:3017`, bound to final runtime source **`a58d9d7ef97fa218506a4feb5e364cd11d31d424`**. Earlier `before/` and intermediate `after/` records are preserved unchanged.

## Binding and integrity

| Identity | Value |
| --- | --- |
| Build ID | `Wdc_zTNX4t7zHF0FLGcpR` |
| Source SHA-256 | `3b4b9891385eac5f5609e6501e81e55d62f1084755ffd9b6cc70d3b82493efc5` |
| Actual runtime SHA-256 | `304d4550fb7817c812a498bc25dedc4f7bb9e6e9572ac347e3e8ce8b99b2ac9c` |
| Served JS/CSS body matches | 13 / 13 |

The source digest covers the 133 tracked files under `app`, `components`, `content`, `styles`, `public`, `package.json`, `package-lock.json`, and `next.config.ts`: sorted path + NUL + bytes + NUL. Runtime hashing covers actual `.next/static`, `.next/server`, and `.next/BUILD_ID` files with the same path/bytes convention. [record.json](record.json) includes per-runtime-file hashes and served response-body hashes.

Source SHA/digest and actual runtime digest were identical before and after capture. The runtime-source scope was clean; the only tracked working-tree modification reported by Git was the separately prepared `docs/KNOWN_FAILURE_PATTERNS.md`, outside the runtime digest scope. Thus the whole working tree is not claimed to be clean. No application source or runtime was changed by the capture task.

## Screenshots (14)

- `{ja,en}-{1440,390}-hero.png`: 4 Hero images.
- `{ja,en}-{1440,390}-about-intro.png`: 4 About introduction images.
- [Home about active background](ja-1440-home-about-active-diagnostic.png).
- [About introduction active background](ja-1440-about-intro-active-diagnostic.png).
- [PC body plateau](ja-1440-body-color-plateau-diagnostic.png) / [mobile body plateau](ja-390-body-color-plateau-diagnostic.png).
- [PC menu-label plateau](ja-1440-menu-label-color-plateau-diagnostic.png) / [mobile menu-label plateau](ja-390-menu-label-color-plateau-diagnostic.png).

Conditions match the earlier captures: JA/EN, 1440×1000 / 390×844, device scale 1, headless Chromium 153.0.8010.12 with desktop-browser viewport emulation, normal motion, `Math.random=0.99` set before application JavaScript. Hero waits for natural opening phase `complete`, `data-intro=done`, fonts ready, image decoding, and finite Hero animation completion. About introductions wait for Scene entry and finite animation completion. Infinite decorative animation is not awaited or globally disabled.

Background diagnostics seek the actual scene-color animations to `delay + duration × 0.45` and pause them. They show the same diagnostic phase used in Before and intermediate After. This is not a claimed natural timestamp or peak-opacity frame. Text diagnostics pause only the decorative color overlays at their opacity-1 plateau. Source opacity, visibility, masks, clip-paths, layout, and hit targets are never modified.

The browser work ran while separate focused regression tests used another context on the same server. There is **no performance or animation-duration comparison claim** from this capture; performance/INP/field acceptance is NOT RUN here.

## Inspection and observed state

- All About introductions retain authored `mint` despite forced random 0.99. The settled radial mint tint uses alpha 0.32 on `rgb(244,249,255)`; Before drifted to `twilight`.
- Home about retains authored `sky`. The blue/violet static tint uses alpha 0.32 / 0.22. Scene lead/echo opacity at the same diagnostic phase is approximately 0.0434436, versus 0.108609 in Before.
- The sampled final Home about image no longer shows the hard vertical background boundary observed near x=1190 in the intermediate After. Its background blends at the edges in this frame. This is a visual observation at the stated phase, not a proof about every animation frame.
- Japanese and English mobile Hero images show the scroll cue on its light pill and readable copy. Representative JA/EN mobile images, About active background, Home about active background, mobile body plateau, and mobile menu plateau were visually inspected.
- Both sampled body sources retain opacity 1, visibility visible, clip-path none, mask-image none, transform none, and zero source animations, while the color overlay is at opacity 1.
- All 26 menu text source nodes retain the same unmasked, stationary source properties. All 26 desktop overlays are at opacity 1. Mobile has 24 opacity-1 overlays; the remaining two belong to the already hidden mobile aside copy/CTA and remain at opacity 0. Capture did not hide any text.

The plateau captures are visual checks of color visibility. Full rise/hold/fade, fallback, and lifecycle behavior belongs to the independent focused/regression test evidence.

## Natural videos (2)

- [Mobile body, natural motion](ja-390-body-natural.webm): 390×844, VP8, 25 fps, **4.20 seconds**.
- [Mobile menu, natural motion](ja-390-menu-natural.webm): 390×844, VP8, 25 fps, **8.56 seconds**.

These short recordings have no WAAPI pause/seek, no source/style override, and no video editing. Random remains fixed at 0.99. The body recording covers load through finite color-animation completion; menu covers load, open, natural completion, and Escape close. `ffprobe` verified format, dimensions, frame rate, and duration. Named files are deliverables; transient originals remain in ignored `.recordings/`.

## Results and boundaries

Across four screenshot contexts and two video contexts: **0 console messages, 0 page errors, 0 failed requests, 0 HTTP errors**. Capture script ESLint: PASS. Source/runtime integrity checks: PASS. No CI, Hosted READ, Hosted MUTATION, deploy, or commit was performed by this capture task.

[capture-final.mjs](capture-final.mjs) preserves the exact procedure, including expected Build ID, required source SHA, HEAD equality checks before browser launch, and refusal to overwrite existing captures. [artifact-manifest.json](artifact-manifest.json) records the PNG/WebM sizes and SHA-256 hashes. Any later runtime-source change needs separately bound evidence.
