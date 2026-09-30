# Corporate engineering observations

This registry records reproduced Corporate implementation failures. It does not change publication, security, or visual acceptance requirements. Historical observations remain historical.

## CORP-001 — Hidden decorative text still contributes to layout overflow

- Confirmed: 2026-09-22 readability implementation, before the correction in `76d149c`.
- Trigger: snapshot computed font sizes/line heights and enlarge text to 200%, without increasing the width of an SVG wordmark.
- Root cause: the wordmark retained an `aria-hidden` decorative text layer whose source used `visibility: hidden`. Hiding painting or accessibility exposure does not remove the text's layout and overflow bounds. Once utility text became static, this duplicate layer had no remaining purpose.
- Symptom: Home document width reached 1,823px in a 1,440px viewport. The illustrative metric grid also contributed to this failure.
- Correction: remove the obsolete wordmark text layer and its unused CSS. Keep the existing SVG, dimensions, accessible name, and accepted visual asset.
- Sibling review: header, footer and menu wordmarks share the same component; all receive the correction.
- Regression: `tests/e2e/readability.spec.ts`, 200% text enlargement across all seven JA/EN pages and menu interaction. Do not hide overflow or reduce enlarged text to make the assertion pass.
- Initial FAIL evidence: `evidence/readability-20260922/checks/focused-initial.json` and `.log`. These reflect the initial working tree, not the later corrected commit.

## CORP-002 — Fixed columns cannot accommodate enlarged nonbreaking metrics

- Confirmed: same 200% text-enlargement diagnostic as CORP-001.
- Root cause: the fixed three-column metric grid reserved roughly 393px per column while the enlarged `1,000` text needed about 536px. Explicit width reservation for the counter does not make the containing column responsive.
- Correction: use an `auto-fit` grid with a minimum based on the local `em` scale. Numbers retain their full value and wrap as complete cards onto additional rows. The sample notice and 2 / 10 / 1,000 values remain unchanged.
- Related surface: menu number and label columns also use shrinkable tracks and wrapping to accommodate enlarged text.
- Regression: text enlargement plus existing metric count-up, Reduced Motion and no-JavaScript tests. No retry or timeout increase.

## CORP-003 — Motion tests need explicit geometry and opening preconditions

- Confirmed on source `76d149c`: the full run had 175 PASS / 2 FAIL, with no retries.
- Offscreen test: shorter EN About copy moved the stationary image frame to top759.25px at 1440×900. Its entry threshold was807.25px, inside the828px viewport gate, so automatic entrance was correct. The baseline frame top838.625px had remained offscreen. Do not change product spacing to satisfy a stale test assumption.
- Static text test: WebKit evaluated the skip link during the retained opening's `data-intro=pending` phase, when non-opening content is intentionally hidden. This did not establish hidden body text after the opening.
- Regression approach: explicitly arrange and assert offscreen geometry, separately verify an initially visible image enters, and wait for the actual opening completion state before auditing post-opening visibility. Keep animation/fallback assertions, test all intended elements, and preserve initial failure evidence. Do not add fixed sleeps, visible-only filtering, retries, or larger timeouts.

## CORP-004 — Decorative palette mutation also recolors a resting surface

- Confirmed on `fa9a7b4` in the gradient follow-up: a deterministic random value of 0.99 changes About's authored mint Scene to twilight when it enters the viewport. The same `data-palette` supplies the persistent page-intro radial background, so the resting surface also changes after hydration.
- The random palette was a historical design choice, not a security failure. The coupling became inappropriate when the Owner requested a coherent background across the readability revision.
- Correction: keep the authored Scene palette, soften finite background washes, and keep text/image decorations independent from the resting surface. Review siblings that combine fixed gradients with inherited palette variables.
- Separate composition issue: Hero's full shade and bottom pseudo-element compounded to roughly 97% white at the mobile bottom edge. Keep the full reading shade and remove the redundant bottom layer; do not reduce text contrast to expose the picture.
- Regression: `gradient-surfaces.spec.ts` verifies stable backgrounds at both ends of the random range, finite feathered washes, one Hero shade, and static gradient text with Forced Colors fallback. Before runtime binding and computed backgrounds are retained under `evidence/gradient-followup-20260922/before/`.

## CORP-005 — WebKit keyframe serialization can differ from effective paint

- Confirmed on source `4af58a7` with Playwright WebKit: a CSS opacity keyframe using `var(--scene-wash-opacity)` was returned as `"0"` by `KeyframeEffect.getKeyframes()`, while seeking the same effect and reading computed opacity produced the intended maximum of `0.28`.
- Evidence: `evidence/gradient-followup-20260922/checks/webkit-wash-diagnostic.json` records both the serialized frames and the effective samples on the unchanged runtime.
- Correction: preserve the actual maximum-opacity assertion, seek the finite effect at 1% intervals, and inspect the browser's effective computed style. Do not alter the visual requirement to match incomplete inspection metadata.
- Related tests: avoid assuming every browser serializes CSS custom-property keyframes identically.

### Independent harness correction — symmetric whitespace comparison

- The initial `4af58a7` run also failed the all-authored-text audit in three browser configurations on `/en/contact`. The audit trimmed the source text but compared it with the raw overlay text. The trailing space before the inline Privacy link is required sentence spacing; the implementation preserved the same string in both layers.
- Correction: compare raw source text with raw overlay text. Do not remove the content's space or normalize only one side. This harness defect is separate from WebKit keyframe serialization and CORP-006's rendering diagnosis.
- Initial evidence: `evidence/gradient-followup-20260922/checks/e2e-full-first.json` and `failure-summary.json`. Preserve the original failures after correcting the assertion.

## CORP-006 — Moving text gradients in the sticky header reduce WebKit frame sampling

- Confirmed in local diagnostics on source `4af58a7d7ff7320f3bd6f7568c1b3b1d7042cdbd`, using Playwright WebKit with iPhone 13 emulation (390×844, DPR 3), an 800ms font delay and video recording. Hero itself had no active animation and retained one measured position, but the sticky header's color overlays were still animating their gradient background positions.
- Root cause: the header's moving text-gradient backgrounds introduced rendering work that reduced animation-frame sampling in this harness. The original video run collected 19 rAF samples in 2318ms; hiding the header color overlays collected 101 in 2308ms. Removing the pseudo-element filter, adding `will-change: opacity`, or making the header background opaque did not materially improve the original result.
- The decisive override removed `backgroundPosition` from the actual `Element.animate` keyframes while preserving opacity, offsets, easing and timing. With the color overlays retained, it collected 36 samples in 2322ms. A CSS background-position override alone did not establish that the running WAAPI effect had changed; inspect the actual effect keyframes.
- Correction: keep the complete static palette at 100% background width and animate only opacity in non-heading `ColorText` and `MenuInk`. Preserve finite color appearance, hold and fade, always-visible source text, menu replay and accessibility fallbacks. The shared correction includes header, body, utility and menu uses; heading band motion remains separate.
- Evidence: `evidence/gradient-followup-20260922/checks/webkit-header-color-video-ab-4af58a7.json`, `webkit-header-compositing-ab-4af58a7.json`, and `webkit-header-opacity-only-4af58a7.json`. These are diagnostic interventions on the recorded source, not acceptance results for the final implementation, real-device performance measurements, field performance or INP evidence.
- Failure history: the initial full run recorded 189 PASS / 6 FAIL out of 195. Two failures were WebKit Hero sampling checks. The source-unchanged Hero reproduction recorded 1 PASS / 1 FAIL: JA recovered on manual retry and is FLAKY; EN still failed. The other four initial failures were the independent harness issues recorded under CORP-005. Do not relabel the manual recovery as an initial PASS, weaken the sampling assertion, or replace this history with later results.
- Regression: retain the original Hero stability and sampling checks, verify finite opacity-only decoration keyframes for both text implementations, and exercise the existing Reduced Motion/API-failure fallbacks. Final implementation results belong in the follow-up evidence with their own source binding.

## CORP-007 — Text-color coverage alone does not prove the requested entrance

- Confirmed on `12fbd28` in the September 30 follow-up: authored body, label and utility text had a color overlay but no background band. The component split routed these roles to ColorText, while only AnimatedHeading created bands. Structural coverage tests passed even though the requested band-to-color-to-normal sequence was absent for most text.
- Correction: add a non-occluding, line-measured band behind stationary copy; give menu labels and counters the same visual sequence. Hero now has one finite stationary text entrance under the Owner's explicit all-text request. Keep picture/geometry/handoff behavior separate.
- Regression: verify actual simultaneous band/color paint, normal ink after completion, visible unmasked source, finite cleanup, menu replay and fallback behavior, in addition to authored-text coverage. Preserve opacity-only color animation to avoid the separate CORP-006 paint cost.

## CORP-008 — A visible opening cover is not yet an interactive modal

- Confirmed on `31be953` in the September 30 full run. The desktop Tab test saw the CSS cover with `data-intro=pending`, pressed Tab, then observed `running`; the opening ended naturally in `data-phase=complete` and did not focus main. The source-unchanged Tab reproduction passed, so the original failure is retained as a manually recovered FLAKY harness result.
- Root cause: visibility alone also matches the pre-hydration cover. It does not establish the native modal or its input listeners. This is separate from the Hero rendering-sample failure.
- Correction: the active-opening dismissal tests for Tab, Escape and scroll assert `data-intro=running` and dialog `open=true` before input. Preserve the main focus, modal release and subsequent menu operation assertions; no timeout/retry changes. This does not prove cancellation of a key pressed before hydration, and it does not change the opening implementation.
- Evidence: `evidence/text-entrance-20260930/checks/opening-tab-trace-timeline.json`, initial trace, full-run report and source-unchanged reproduction report.

## CORP-009 — Constant gradient-color holds can still consume WebKit painting work

- Confirmed on `31be953` after the September 30 Hero text entrance was restored. The full-run JA Hero check collected 19 rAF samples (requirement >20); source-unchanged JA/EN reproduction also failed. Positions and fonts stayed fixed. The earlier CORP-006 background-position fix was still present.
- Diagnostic isolation: removing the new soft bands, isolation, pseudo-element brightness filter, or promoting/containing layers did not materially improve the sample count. Removing every text-color overlay produced 77 samples; removing only Hero or header color was insufficient. Moving the gradient to direct text also did not improve it. These overrides are diagnostics, not accepted UI changes.
- Decisive diagnostic: pause the unchanged opacity-1 interval of each ColorText effect, then resume at the fade boundary on its original schedule. With bands, gradients, filters and the readable source retained, the same sequential video harness collected 28 samples versus baseline 17. This establishes a useful implementation correction in the local WebKit harness, not real-device FPS or a browser-engine-wide claim.
- Correction: suspend only the constant color hold in shared ColorText, with cleanup of both scheduled callbacks on finish/resize/visibility/preference/unmount/API failure. Preserve rise/hold/fade lengths, gradient colors and the original Hero sampling requirement. The natural body regression verifies the visible paused plateau and eventual cleanup.
- Evidence: `evidence/text-entrance-20260930/checks/webkit-compositing-31be953.json`, `webkit-compositing-scope-31be953.json`, `webkit-compositing-structure-31be953.json`, `webkit-compositing-hold-31be953.json`, full-run and source-unchanged reports. Final corrected-source acceptance is recorded separately.

## CORP-010 — A longer nominal animation does not guarantee a perceptible band

- Confirmed on the runtime delivered at `a2b6ab2` (production source `6ced095`), after the Owner rejected its speed and colors. The body/utility WAAPI band applied `cubic-bezier(.16,1,.3,1)` to the entire multi-phase effect. The color-rise, band plateau and fade were compressed toward the beginning. The menu used the same curve between CSS keyframes; its short 420–853ms role timings also gave it little visible hold. These are related visual pacing issues, not identical WAAPI/CSS easing semantics.
- Natural Chromium samples of representative About copy showed band opacity above 0.45 for about 22ms at 1440px and 83ms at 390px. Its maximum was 0.5. Earlier peak-only stills and tests proving any nonzero band did not establish a perceptible duration. Sampling is local, includes frame/capture scheduling, and is not a general performance benchmark.
- Correction: 1500–1933ms bands (plus at most 260ms of line stagger), a linear overall timeline, ease-in-out only on the expansion/departure phases, and a true 40–65% full-band hold. Reading bands reach 0.85 opacity; text takes 480ms to appear, stays after the band for 1000–1340ms, then fades over 1300–1901ms. Keep the CORP-009 constant-color pause and all cleanup paths.
- Palette correction: headings had continued using vivid image accent stops while reading bands used pastel stops. Use the pre-existing eight pastel families for heading/body/menu/counter bands, and reduce text-color saturation without changing those palette values or image effects. This is a response to the Owner's visual rejection, not a claim that the previous colors were technically invalid.
- Regression: natural elapsed band paint (>900ms above 0.5 and >350ms above 0.84), original pastel stops across all four band implementations, finite return to normal text, readable stationary source, menu replay, counters, motion fallbacks, and unchanged Hero stability assertions. Explicit duration expectations changed with the Owner's slower-motion requirement; retries and timeouts did not.
- Evidence: `evidence/gradient-pacing-20260930/before/record.json` and `candidate/record.json`, with bound builds, unchanged runtime hashes, served-asset checks, natural videos and unseeked screenshots. Preserve the earlier visual evidence as the rejected candidate, not as visual acceptance.

## CORP-011 — Reporter output names do not override an explicit output file

- Confirmed during gradient-pacing evidence packaging. `playwright.config.ts` defines the JSON reporter's `outputFile` as `test-results/results.json`. Setting `PLAYWRIGHT_JSON_OUTPUT_NAME` did not override it. Playwright 1.63.0's `resolveOutputFile` checks `PLAYWRIGHT_JSON_OUTPUT_FILE`, then configured `outputFile`, before consulting the name/directory variables.
- The next test invocation cleaned the temporary output directory before the first JSON was copied. The first run's complete 57-case list log and successful process exit were retained; its original JSON and per-test attachments were not. Do not fabricate an original JSON or rerun identical expensive tests solely to hide this capture error.
- Correction for subsequent runs: set an absolute `PLAYWRIGHT_JSON_OUTPUT_FILE` outside `test-results`, assert the file exists, and archive artifacts before starting another run. The second 15-case run's original JSON was copied before any further test invocation. The evidence binding labels the 57-case summary as derived from its retained list log.
- This is an evidence-export failure, not a test or product failure. Keep both verification outcome and artifact availability explicit.
