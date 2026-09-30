# Before: readability baseline (LOCAL)

Baseline source: detached `7ebe25888dec5f2f1e97da6cf5001e81bcdef55c`, tree `334844413a320852385c8d58239b36dd19d7c54c`; tracked source was clean before and after capture. Source SHA-256 digest `c3157e15464c762fa7e86ad324872c0c0608e4ffcd3d1d723ca384497f5f1295`; the exact scope and build ID are in [record.json](record.json).

Built with `npm ci` and `npm run build` on Node 22.14.0 / npm 10.9.2. Both PASS. Build emitted the existing Next.js warning that fallback font override values for LINE Seed JP are unavailable. No dependency or source change was made. Production-mode local server: `http://127.0.0.1:3018`; baseline worktree: `C:/Users/taisa/Desktop/corporate-readability-baseline-20260922`.

## Visual comparison

Use **[visual-complete/record.json](visual-complete/record.json)** and its 20 PNGs as the complete baseline screenshots. JA/EN × 1440×1000 / 390×844; Hero, business introduction, all four business cards, concept diagram, contact CTA. This is headless Chromium 153.0.8010.12 with desktop-browser viewport emulation, device scale 1, Reduced Motion. It is not real-device coverage.

Fonts were ready, target images decoded, finite animations settled; Reduced Motion suppresses random entrance palettes. Target bounds, actual font family, font status, image state, palettes, page height, and overflow state are recorded per capture. No horizontal document overflow was observed in these captures. No JavaScript errors, console errors, failed requests, or HTTP errors were observed.

The first capture set and its record are preserved in this directory. The original 390px concept element screenshots clipped the last node at the viewport edge: an **evidence harness limitation**, not evidence of missing site content. A direct document-clip diagnostic is preserved as `ja-390-concept-document-clip.png`; it revealed header overlap at the top. The script was then corrected to use full-document clips for isolated element captures, with the sticky header hidden only during those isolated screenshots. This does not change layout or production source. Hero/business-introduction viewport screenshots retain the real header. The complete set was re-captured and the mobile concept and English CTA were visually checked. Old screenshots were not overwritten, and the performance pair was not repeated.

## Local performance diagnostic

Observed 2026-09-22 08:40–08:41 UTC. One cold/warm pair on the JA homepage, 390×844, device scale 1, touch enabled, desktop Chromium UA, normal motion. CDP throttling: 1.6 Mbps down (200,000 B/s), 750 kbps up (93,750 B/s), 150 ms latency, CPU 4×. Each navigation has a 30-second observation window. No scroll, click, keypress, or manual opening dismissal occurs.

Cold means a fresh browser HTTP cache. The local production server and image optimizer had already been warmed by screenshot capture. Warm means full navigation in the same browser context with the HTTP cache retained. This does not emulate a cold deployed CDN, real phone CPU, or real mobile network variability.

| Local diagnostic | Cold | Warm |
| --- | ---: | ---: |
| Last observed LCP | 2,436 ms | 548 ms |
| CLS (maximum session window) | 0.000471 | 0 |
| CDP encoded response bytes | 1,169,154 | 83,073 |
| Font response bytes | 721,440 | 0 |
| `document.fonts.ready` | 6,679.8 ms | 881.4 ms |
| First opening `intro-end` | 12,789.2 ms | 7,481.2 ms |
| Font status at end | loaded | loaded |
| JS / console / request / HTTP errors | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |

Opening is separate from LCP. In the cold run, bootstrap entered `pending` at 2,771.6 ms, writing began at 7,308.3 ms, and the first `intro-end` fired while phase was `docking`, approximately 10 seconds after `pending` (the existing failsafe). The natural completion path fired a second `intro-end` at 13,878.6 ms with phase `complete`. The warm run completed naturally. These observations are retained without treating a short LCP as a short opening or as a reason to silently change the accepted opening contract.

This is a **single local diagnostic sample per cache condition**, not a statistically significant performance result. Field LCP/CLS/INP, real-user p75, and real-device performance are **UNKNOWN / NOT RUN**. No value in this package is field INP, and Core Web Vitals acceptance is not claimed.

## Reuse for the modified implementation

Start its freshly built production server on port 3017, then run the script from the implementation checkout (PowerShell):

```powershell
$env:BASE_URL='http://127.0.0.1:3017'
$env:SOURCE_DIR='C:/Users/taisa/Desktop/corporate-readability-20260922'
$env:PHASE='after'
Remove-Item Env:EVIDENCE_ROOT -ErrorAction SilentlyContinue
Remove-Item Env:CAPTURE_MODE -ErrorAction SilentlyContinue
node scripts/capture-readability.mjs
```

The script refuses an existing phase directory. Use another explicit phase name if new source requires new evidence. `CAPTURE_MODE=visual` is available only for a documented visual re-capture; `all` is the default. Bind the after result to its actual source digest and build ID, then record the delivery commit separately if evidence was captured before that commit.

No Hosted READ, Hosted MUTATION, CI, deploy, GitHub mutation, Ready transition, or merge was performed by this baseline task.
