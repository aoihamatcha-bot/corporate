# Gradient follow-up: After at 4af58a7 (LOCAL, historical source binding)

Captured 2026-09-22 09:30:59–09:31:35 UTC from the production-mode server at `http://127.0.0.1:3017`. This directory belongs specifically to source `4af58a7d7ff7320f3bd6f7568c1b3b1d7042cdbd`. Later CSS/source changes require separate evidence; this record must not be reused as acceptance for those changes.

## Identity and integrity

- Build ID: `D2vAG0ZJlMvj2UBuAZMt_`.
- Actual runtime digest: `5baef07c70c22a6ceab8c721af395d1f36f45747100f242be906f9fc7ec7ce40`.
- Runtime scope: sorted paths and bytes under `.next/static`, `.next/server`, and `.next/BUILD_ID`. Per-file hashes are in [record.json](record.json).
- Source digest: `6d52c7c31bc1ea0ccafec2e377fe89548a6707a8d34a28cea1a877f5f1056474`, covering the 133 tracked runtime-source/assets/config files under the scope stated in `sourceBefore`.
- Source SHA/digest, clean tracked-source state, and actual runtime digest matched before and after capture.
- All 13 observed served JS/CSS response bodies matched the corresponding built files exactly.
- Capture code ESLint: PASS. No source, build, CI, Hosted, or deployment mutation was made. Before evidence was not modified.

## Comparison images

Normal comparison images match the Before capture conditions: JA/EN, 1440×1000 / 390×844, normal motion, `Math.random=0.99` injected before application JavaScript, device scale 1, desktop Chromium viewport emulation. Hero waits for natural opening completion and settled finite animation; target fonts and images are ready. About introductions wait for Scene entry and finite animation completion. Headless Chromium is 153.0.8010.12. These are local emulated viewports, not real-device verification.

- `{ja,en}-{1440,390}-hero.png` (4 images).
- `{ja,en}-{1440,390}-about-intro.png` (4 images).
- `ja-1440-home-about-active-diagnostic.png` and `ja-1440-about-intro-active-diagnostic.png` (2 background diagnostics).

As in Before, background diagnostics seek the real normal-motion Scene color animations to `delay + duration × 0.45` and pause them. This reproduces the same comparison phase; it does not claim a natural elapsed-time capture or peak opacity. No source visibility or mask is changed.

The implementation owner inspected all 14 images and identified a visible vertical boundary near x=1190 in `ja-1440-home-about-active-diagnostic.png`. A subsequent mask-feathering adjustment is planned. The image and its exact-source binding remain here as historical evidence; the subsequent adjustment is not included in this record.

## Text-color diagnostics

- [PC body plateau](ja-1440-body-color-plateau-diagnostic.png)
- [Mobile body plateau](ja-390-body-color-plateau-diagnostic.png)
- [PC menu-label plateau](ja-1440-menu-label-color-plateau-diagnostic.png)
- [Mobile menu-label plateau](ja-390-menu-label-color-plateau-diagnostic.png)

Only decorative overlay animation time is changed. Body overlay is paused midway between its two opacity-1 keyframes (currentTime 1,031 ms for the sampled text). Menu color-appear/fade animations are paused at the middle of their opacity-1 hold interval. No source CSS, source visibility, clip-path, mask, hit-target geometry, or animation keyframe is replaced.

For the body in both viewports, the source has opacity 1, visibility visible, clip-path none, mask-image none, transform none, and zero source animations; the overlay has opacity 1 and a gradient clipped to text. Across all 26 sampled menu text nodes, each source also has these continuous-source properties. PC overlays are all at opacity 1. Mobile has 24 opacity-1 overlays; the two copy/CTA entries already hidden by the mobile `.nav-aside` layout have opacity 0. Their absence is not a capture-side source modification.

These plateau images show color visibility at a diagnostic instant. Full animation lifecycle evidence belongs to the separate regression tests, not these snapshots.

## Natural videos

- [Mobile body, natural motion](ja-390-body-natural.webm): 390×844, VP8, 25 fps, 4.24 seconds.
- [Mobile menu, natural motion](ja-390-menu-natural.webm): 390×844, VP8, 25 fps, 8.68 seconds.

Both recordings use natural normal motion with no WAAPI seek/pause or style overrides. The body clip covers navigation through finite text-color completion. The menu clip covers load, open, natural completion, and Escape close. Random remains fixed at 0.99 as in the screenshots. `ffprobe` confirmed the dimensions, codec, frame rate, and duration. Raw transient recordings are retained under ignored `.recordings/`; the named deliverables are copied without video editing.

## Observed color/background changes

- About introductions preserve authored `mint` after entry despite the forced random value. Their radial tint is the mint color at alpha 0.32, over `rgb(244,249,255)`; Before changed to `twilight`.
- Home about preserves authored `sky`. Static blue/violet radial tints use alpha 0.32 / 0.22 over `rgb(244,249,255)`.
- At the same diagnostic phase, Scene lead/echo opacity is approximately 0.0434436 versus 0.108609 in Before.
- The sampled body text gradient is green/teal/blue: `rgb(0,100,79) → rgb(0,105,119) → rgb(49,79,179)`, with the existing brightness treatment.
- Menu text uses its authored sky gradient: `rgb(12,58,226) → rgb(0,104,122) → rgb(74,34,191)`. Menu surface styling remains separately recorded in JSON.

All messages were collected across four screenshot contexts and two video contexts: **0 console messages, 0 page errors, 0 failed requests, 0 HTTP errors**. The mobile body and menu plateau images were also visually inspected by the capture task. Performance/INP/field acceptance is not measured here.

[capture-after.mjs](capture-after.mjs) preserves the one-off capture procedure and expected Build ID. Do not run it against a later build or overwrite this directory.
