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
