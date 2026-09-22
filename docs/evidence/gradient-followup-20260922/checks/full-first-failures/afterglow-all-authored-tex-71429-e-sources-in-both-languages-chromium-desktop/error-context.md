# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: afterglow.spec.ts >> all authored text has a decorative color layer with readable sources in both languages
- Location: tests\e2e\afterglow.spec.ts:3:5

# Error details

```
Error: /en/contact: Information about how we handle personal information will be published in our

expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

@@ -3,11 +3,11 @@
    "clipPath": "none",
    "mask": "none",
    "motion": "color",
    "opacity": "1",
    "overlayHidden": "true",
-   "overlayText": "Information about how we handle personal information will be published in our",
+   "overlayText": "Information about how we handle personal information will be published in our ",
    "overlays": 1,
    "rootAnimations": 0,
    "rootClipPath": "none",
    "rootMask": "none",
    "rootTransform": "none",
```

# Page snapshot

```yaml
- generic [active] [ref=f13e1]:
  - link "Skip to content" [ref=f13e2] [cursor=pointer]:
    - /url: "#main"
    - generic [ref=f13e3]:
      - generic [ref=f13e4]: Skip to content
      - generic [aria-hidden]: Skip to content
  - banner [ref=f13e5]:
    - link "MYSTENA home" [ref=f13e6] [cursor=pointer]:
      - /url: /en
      - img "MYSTENA" [ref=f13e8]
    - navigation "Main navigation" [ref=f13e9]:
      - link "Our business" [ref=f13e10] [cursor=pointer]:
        - /url: /en/business
        - generic [ref=f13e11]:
          - generic [ref=f13e12]: Our business
          - generic [aria-hidden]: Our business
      - link "About us" [ref=f13e13] [cursor=pointer]:
        - /url: /en/about
        - generic [ref=f13e14]:
          - generic [ref=f13e15]: About us
          - generic [aria-hidden]: About us
      - link "Company information" [ref=f13e16] [cursor=pointer]:
        - /url: /en/company
        - generic [ref=f13e17]:
          - generic [ref=f13e18]: Company information
          - generic [aria-hidden]: Company information
    - navigation "Language" [ref=f13e19]:
      - generic [ref=f13e20]:
        - link "日本語" [ref=f13e21] [cursor=pointer]:
          - /url: /contact
          - generic [ref=f13e22]:
            - generic [ref=f13e23]: 日本語
            - generic [aria-hidden]: 日本語
        - generic [ref=f13e25]:
          - generic [ref=f13e26]: English
          - generic [aria-hidden]: English
    - button "Open menu" [ref=f13e28] [cursor=pointer]:
      - generic [ref=f13e29]:
        - generic [ref=f13e30]: Menu
        - generic [aria-hidden]: Menu
  - text: Close 01 Home 02 About 03 Business 04 News 05 Company 06 Contact 日本語 English MYSTENA’s business and company information Contact Privacy policy MYSTENA Explore MYSTENA’s business.
  - main [ref=f13e34]:
    - generic [ref=f13e35]:
      - generic [ref=f13e37]:
        - paragraph [ref=f13e38]:
          - link "Home" [ref=f13e39] [cursor=pointer]:
            - /url: /en
            - generic [ref=f13e40]:
              - generic [ref=f13e41]: Home
              - generic [aria-hidden]: Home
          - generic [ref=f13e42]:
            - generic [ref=f13e43]: /
            - generic [aria-hidden]: /
          - generic [ref=f13e44]:
            - generic [ref=f13e45]: Contact
            - generic [aria-hidden]: Contact
        - heading "Contact" [level=1] [ref=f13e46]:
          - generic [ref=f13e47]:
            - generic [ref=f13e48]: Contact
            - generic [aria-hidden]: Contact
        - paragraph [ref=f13e49]:
          - generic [ref=f13e50]:
            - generic [ref=f13e51]: Contact information for MYSTENA. Our contact channel is being prepared.
            - generic [aria-hidden]: Contact information for MYSTENA. Our contact channel is being prepared.
      - generic [ref=f13e53]:
        - generic [ref=f13e54]:
          - strong [ref=f13e55]:
            - generic [ref=f13e56]:
              - generic [ref=f13e57]: Our contact channel is being prepared.
              - generic [aria-hidden]: Our contact channel is being prepared.
          - generic [ref=f13e58]:
            - generic [ref=f13e59]: The form is not currently accepting input or submissions. We will provide contact details when they are ready.
            - generic [aria-hidden]: The form is not currently accepting input or submissions. We will provide contact details when they are ready.
        - generic [ref=f13e60]:
          - group "Inquiry details (not yet accepting submissions)" [ref=f13e61]:
            - generic [ref=f13e62]:
              - generic [ref=f13e63]:
                - generic [ref=f13e64]:
                  - generic [ref=f13e65]: Inquiry type
                  - generic [aria-hidden]: Inquiry type
                - generic [ref=f13e67]:
                  - generic [ref=f13e68]: Required
                  - generic [aria-hidden]: Required
              - combobox "Inquiry type Required" [disabled] [ref=f13e69]:
                - option "Please select" [disabled] [selected]
                - option "Business and services" [disabled]
                - option "Collaboration" [disabled]
                - option "Media" [disabled]
                - option "Other" [disabled]
            - generic [ref=f13e70]:
              - generic [ref=f13e71]:
                - generic [ref=f13e72]:
                  - generic [ref=f13e73]: Company or organization
                  - generic [aria-hidden]: Company or organization
                - generic [ref=f13e75]:
                  - generic [ref=f13e76]: Optional
                  - generic [aria-hidden]: Optional
              - textbox "Company or organization Optional" [disabled] [ref=f13e77]
            - generic [ref=f13e78]:
              - generic [ref=f13e79]:
                - generic [ref=f13e80]:
                  - generic [ref=f13e81]: Name
                  - generic [aria-hidden]: Name
                - generic [ref=f13e83]:
                  - generic [ref=f13e84]: Required
                  - generic [aria-hidden]: Required
              - textbox "Name Required" [disabled] [ref=f13e85]
            - generic [ref=f13e86]:
              - generic [ref=f13e87]:
                - generic [ref=f13e88]:
                  - generic [ref=f13e89]: Email address
                  - generic [aria-hidden]: Email address
                - generic [ref=f13e91]:
                  - generic [ref=f13e92]: Required
                  - generic [aria-hidden]: Required
              - textbox "Email address Required" [disabled] [ref=f13e93]
            - generic [ref=f13e94]:
              - generic [ref=f13e95]:
                - generic [ref=f13e96]:
                  - generic [ref=f13e97]: Message
                  - generic [aria-hidden]: Message
                - generic [ref=f13e99]:
                  - generic [ref=f13e100]: Required
                  - generic [aria-hidden]: Required
              - textbox "Message Required" [disabled] [ref=f13e101]
          - paragraph [ref=f13e102]:
            - generic [ref=f13e103]:
              - generic [ref=f13e104]: Information about how we handle personal information will be published in our
              - generic [aria-hidden]: Information about how we handle personal information will be published in our
            - link "Privacy policy" [ref=f13e105] [cursor=pointer]:
              - /url: /en/privacy
              - generic [ref=f13e106]:
                - generic [ref=f13e107]: Privacy policy
                - generic [aria-hidden]: Privacy policy
            - generic [ref=f13e108]:
              - generic [ref=f13e109]: .
              - generic [aria-hidden]: .
          - button "Not yet accepting inquiries" [disabled] [ref=f13e110]:
            - generic [ref=f13e111]:
              - generic [ref=f13e112]: Not yet accepting inquiries
              - generic [aria-hidden]: Not yet accepting inquiries
  - contentinfo [ref=f13e113]:
    - generic [ref=f13e114]:
      - generic [ref=f13e115]:
        - paragraph [ref=f13e116]:
          - generic [ref=f13e117]:
            - generic [ref=f13e118]: Entertainment × Technology
            - generic [aria-hidden]: Entertainment × Technology
        - navigation "Footer navigation" [ref=f13e119]:
          - link "About us" [ref=f13e120] [cursor=pointer]:
            - /url: /en/about
            - generic [ref=f13e121]:
              - generic [ref=f13e122]: About us
              - generic [aria-hidden]: About us
          - link "Our business" [ref=f13e123] [cursor=pointer]:
            - /url: /en/business
            - generic [ref=f13e124]:
              - generic [ref=f13e125]: Our business
              - generic [aria-hidden]: Our business
          - link "News" [ref=f13e126] [cursor=pointer]:
            - /url: /en/news
            - generic [ref=f13e127]:
              - generic [ref=f13e128]: News
              - generic [aria-hidden]: News
          - link "Company information" [ref=f13e129] [cursor=pointer]:
            - /url: /en/company
            - generic [ref=f13e130]:
              - generic [ref=f13e131]: Company information
              - generic [aria-hidden]: Company information
          - link "Contact" [ref=f13e132] [cursor=pointer]:
            - /url: /en/contact
            - generic [ref=f13e133]:
              - generic [ref=f13e134]: Contact
              - generic [aria-hidden]: Contact
        - link "Back to top" [ref=f13e135] [cursor=pointer]:
          - /url: "#main"
      - link "MYSTENA home" [ref=f13e138] [cursor=pointer]:
        - /url: /en
        - img "MYSTENA" [ref=f13e140]
      - generic [ref=f13e141]:
        - generic [ref=f13e142]:
          - generic [ref=f13e143]: © MYSTENA
          - generic [aria-hidden]: © MYSTENA
        - link "Privacy policy" [ref=f13e144] [cursor=pointer]:
          - /url: /en/privacy
          - generic [ref=f13e145]:
            - generic [ref=f13e146]: Privacy policy
            - generic [aria-hidden]: Privacy policy
  - alert [ref=f13e147]
```

# Test source

```ts
  7   |     "/",
  8   |     "/about",
  9   |     "/business",
  10  |     "/company",
  11  |     "/news",
  12  |     "/contact",
  13  |     "/privacy",
  14  |     "/missing-page",
  15  |     "/en",
  16  |     "/en/about",
  17  |     "/en/business",
  18  |     "/en/company",
  19  |     "/en/news",
  20  |     "/en/contact",
  21  |     "/en/privacy",
  22  |     "/en/missing-page",
  23  |   ]) {
  24  |     await page.goto(route);
  25  |     if (route === "/" || route === "/en") {
  26  |       // Opening deliberately conceals page content while its modal is active.
  27  |       // Check normal reading only after that retained lifecycle has completed.
  28  |       await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
  29  |       await expect(page.locator(".site-opening")).not.toBeVisible();
  30  |     }
  31  |     const uncovered = await page.evaluate(() => {
  32  |       const walker = document.createTreeWalker(
  33  |         document.body,
  34  |         NodeFilter.SHOW_TEXT,
  35  |       );
  36  |       const missing: string[] = [];
  37  |       while (walker.nextNode()) {
  38  |         const node = walker.currentNode;
  39  |         if (!node.textContent?.trim()) continue;
  40  |         const parent = node.parentElement!;
  41  |         // Hero copy, its capabilities and its cue use the same authored-text
  42  |         // wrappers. Native input content and inaccessible decoration stay exempt.
  43  |         if (
  44  |           parent.closest(
  45  |             ".reveal-source, .menu-ink-base, script, style, input, textarea, option, .sr-only, [aria-hidden='true'], nextjs-portal",
  46  |           )
  47  |         )
  48  |           continue;
  49  |         const range = document.createRange();
  50  |         range.selectNodeContents(node);
  51  |         if (range.getBoundingClientRect().width > 0)
  52  |           missing.push(node.textContent.trim());
  53  |       }
  54  |       return missing;
  55  |     });
  56  |     expect(uncovered, route).toEqual([]);
  57  |     const colorText = await page
  58  |       .locator('.reveal-text:not([data-motion-kind="heading"])')
  59  |       .evaluateAll((elements) =>
  60  |         elements
  61  |           .filter((el) => !el.closest('[aria-hidden="true"], dialog:not([open])'))
  62  |           .map((el) => {
  63  |             const source = el.querySelector(".reveal-source")!;
  64  |             const overlay = el.querySelector(".reveal-color")!;
  65  |             const style = getComputedStyle(source);
  66  |             const rootStyle = getComputedStyle(el);
  67  |             return {
  68  |               text: source.textContent?.trim(),
  69  |               kind: el.getAttribute("data-motion-kind"),
  70  |               motion: el.getAttribute("data-text-motion"),
  71  |               opacity: style.opacity,
  72  |               visibility: style.visibility,
  73  |               clipPath: style.clipPath,
  74  |               mask: style.maskImage,
  75  |               transform: style.transform,
  76  |               rootClipPath: rootStyle.clipPath,
  77  |               rootMask: rootStyle.maskImage,
  78  |               rootTransform: rootStyle.transform,
  79  |               rootAnimations: el.getAnimations().length,
  80  |               sourceAnimations: source.getAnimations().length,
  81  |               overlays: el.querySelectorAll(".reveal-color").length,
  82  |               overlayHidden: overlay.getAttribute("aria-hidden"),
  83  |               overlayText: overlay.getAttribute("data-text"),
  84  |               gradient: getComputedStyle(overlay, "::before").backgroundImage,
  85  |               bands: el.querySelectorAll(".reveal-bands, .reveal-band").length,
  86  |               animations: overlay.getAnimations().map((animation) => {
  87  |                 const timing = animation.effect!.getComputedTiming();
  88  |                 const frames = (animation.effect as KeyframeEffect).getKeyframes();
  89  |                 return {
  90  |                   finite: Number.isFinite(Number(timing.endTime)),
  91  |                   iterations: timing.iterations,
  92  |                   duration: Number(timing.duration),
  93  |                   colorOnly: frames.every((frame) =>
  94  |                     !["clipPath", "maskImage", "transform", "translate"].some(
  95  |                       (property) => property in frame,
  96  |                     ),
  97  |                   ),
  98  |                 };
  99  |               }),
  100 |             };
  101 |           }),
  102 |       );
  103 |     expect(colorText.length, route).toBeGreaterThan(0);
  104 |     expect(colorText.some((entry) => entry.kind === "body"), route).toBe(true);
  105 |     for (const entry of colorText) {
  106 |       expect(entry.text, route).toBeTruthy();
> 107 |       expect(entry, `${route}: ${entry.text}`).toMatchObject({
      |                                                ^ Error: /en/contact: Information about how we handle personal information will be published in our
  108 |         motion: "color",
  109 |         opacity: "1",
  110 |         visibility: "visible",
  111 |         clipPath: "none",
  112 |         mask: "none",
  113 |         transform: "none",
  114 |         rootClipPath: "none",
  115 |         rootMask: "none",
  116 |         rootTransform: "none",
  117 |         rootAnimations: 0,
  118 |         sourceAnimations: 0,
  119 |         overlays: 1,
  120 |         overlayHidden: "true",
  121 |         overlayText: entry.text,
  122 |         bands: 0,
  123 |       });
  124 |       expect(entry.gradient, `${route}: ${entry.text}`).toContain("linear-gradient");
  125 |       for (const animation of entry.animations) {
  126 |         expect(animation).toMatchObject({ finite: true, iterations: 1, colorOnly: true });
  127 |         expect(animation.duration).toBeGreaterThan(0);
  128 |       }
  129 |     }
  130 |   }
  131 | });
  132 | 
  133 | test("body color appears and finishes while its source stays readable and stationary", async ({ page }) => {
  134 |   await page.goto("/about");
  135 |   const body = page.locator('.page-description [data-motion-kind="body"]');
  136 |   await body.scrollIntoViewIfNeeded();
  137 |   await expect(body).toHaveAttribute("data-reveal-state", "running");
  138 |   const result = await body.evaluate(async (el) => {
  139 |     const source = el.querySelector(".reveal-source")!;
  140 |     const overlay = el.querySelector(".reveal-color")!;
  141 |     const animations = overlay.getAnimations();
  142 |     const animation = animations[0];
  143 |     const timing = animation.effect!.getComputedTiming();
  144 |     const frames = (animation.effect as KeyframeEffect).getKeyframes();
  145 |     const initial = source.getBoundingClientRect();
  146 |     const failures: string[] = [];
  147 |     let samples = 0;
  148 |     let maxColorOpacity = 0;
  149 |     let raf = 0;
  150 |     const sample = () => {
  151 |       samples++;
  152 |       const style = getComputedStyle(source);
  153 |       const bounds = source.getBoundingClientRect();
  154 |       if (style.opacity !== "1" || style.visibility !== "visible") failures.push("hidden source");
  155 |       if (style.clipPath !== "none" || style.maskImage !== "none") failures.push("masked source");
  156 |       if (source.getAnimations().length || el.getAnimations().length) failures.push("animated source or root");
  157 |       if (Math.abs(bounds.x - initial.x) > 0.5 || Math.abs(bounds.y - initial.y) > 0.5) failures.push("moving source");
  158 |       maxColorOpacity = Math.max(maxColorOpacity, Number(getComputedStyle(overlay).opacity));
  159 |       raf = requestAnimationFrame(sample);
  160 |     };
  161 |     sample();
  162 |     await animation.finished;
  163 |     cancelAnimationFrame(raf);
  164 |     return {
  165 |       animations: animations.length,
  166 |       finite: Number.isFinite(Number(timing.endTime)),
  167 |       iterations: timing.iterations,
  168 |       opacityFrames: frames.map((frame) => Number(frame.opacity)),
  169 |       samples,
  170 |       maxColorOpacity,
  171 |       failures,
  172 |     };
  173 |   });
  174 |   expect(result).toMatchObject({ animations: 1, finite: true, iterations: 1, failures: [] });
  175 |   expect(result.opacityFrames).toEqual([0, 1, 1, 0]);
  176 |   expect(result.samples).toBeGreaterThan(1);
  177 |   expect(result.maxColorOpacity).toBeGreaterThan(0.95);
  178 |   await expect(body).toHaveAttribute("data-reveal-state", "settled");
  179 |   await expect(body.locator(".reveal-color")).toHaveCSS("opacity", "0");
  180 |   await expect(body.locator(".reveal-source")).toBeVisible();
  181 | });
  182 | 
  183 | test("all menu text receives finite color effects that restart without masking navigation", async ({ page }) => {
  184 |   for (const prefix of ["", "/en"]) {
  185 |     await page.goto(`${prefix}/about`);
  186 |     const open = page.getByRole("button", { name: prefix ? "Open menu" : "メニューを開く" });
  187 |     await open.click();
  188 |     const dialog = page.getByRole("dialog");
  189 |     await expect(dialog.locator('.nav-en[data-text-motion="color"]')).toHaveCount(6);
  190 |     await expect(dialog.locator('.nav-number .menu-ink[data-text-motion="color"]')).toHaveCount(6);
  191 |     await expect(dialog.locator('.nav-ja .menu-ink[data-text-motion="color"]')).toHaveCount(prefix ? 0 : 6);
  192 |     await expect(dialog.locator('.close-trigger .menu-ink[data-text-motion="color"]')).toHaveCount(1);
  193 |     await expect(dialog.locator('.language-options .menu-ink[data-text-motion="color"]')).toHaveCount(2);
  194 |     await expect(dialog.locator('.nav-aux .menu-ink[data-text-motion="color"]')).toHaveCount(1);
  195 |     await expect(dialog.locator('.nav-bottom .menu-ink[data-text-motion="color"]')).toHaveCount(2);
  196 |     await expect(dialog.locator(".menu-ink-wipe, .menu-ink-band, .motion-control")).toHaveCount(0);
  197 |     await expect(dialog.locator(`.nav-aux a[href="${prefix}/privacy"]`)).toHaveAccessibleName(prefix ? "Privacy policy" : "プライバシーポリシー");
  198 |     const menu = await dialog.locator(".menu-ink").evaluateAll((elements) =>
  199 |       elements.map((el) => {
  200 |         const source = el.querySelector(".menu-ink-base")!;
  201 |         const overlay = el.querySelector(".menu-ink-color")!;
  202 |         const style = getComputedStyle(source);
  203 |         return {
  204 |           visible: source.getClientRects().length > 0,
  205 |           motion: el.getAttribute("data-text-motion"),
  206 |           text: source.textContent,
  207 |           overlayText: overlay.getAttribute("data-text"),
```