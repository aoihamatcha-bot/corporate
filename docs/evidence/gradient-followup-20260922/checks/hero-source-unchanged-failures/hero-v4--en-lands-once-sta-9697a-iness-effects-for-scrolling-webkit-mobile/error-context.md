# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hero-v4.spec.ts >> /en lands once, stays still and saves business effects for scrolling
- Location: tests\e2e\hero-v4.spec.ts:4:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 20
Received:   19
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2]:
    - /url: "#main"
    - generic [ref=e3]:
      - generic [ref=e4]: Skip to content
      - generic [aria-hidden]: Skip to content
  - banner [ref=e5]:
    - link "MYSTENA home" [ref=e6]:
      - /url: /en
      - img "MYSTENA" [ref=e8]
    - text: Our business About us Company information
    - navigation "Language" [ref=e9]:
      - generic [ref=e10]:
        - link "日本語" [ref=e11]:
          - /url: /
          - generic [ref=e12]:
            - generic [ref=e13]: 日本語
            - generic [aria-hidden]: 日本語
        - generic [ref=e15]:
          - generic [ref=e16]: English
          - generic [aria-hidden]: English
    - button "Open menu" [ref=e18] [cursor=pointer]:
      - generic [ref=e19]:
        - generic [ref=e20]: Menu
        - generic [aria-hidden]: Menu
  - text: Close 01 Home 02 About 03 Business 04 News 05 Company 06 Contact 日本語 English MYSTENA’s business and company information Contact Privacy policy MYSTENA Explore MYSTENA’s business.
  - main [ref=e21]:
    - generic [ref=e22]:
      - region [ref=e23]:
        - generic [ref=e28]:
          - paragraph [ref=e29]:
            - generic [ref=e31]:
              - generic [ref=e32]: Entertainment × Technology
              - text: Entertainment × Technology
          - heading "Curiosity changes the world." [level=1] [ref=e33]:
            - generic [ref=e34]:
              - generic [ref=e35]: Curiosity changes
              - text: Curiosity changes
            - generic [ref=e36]:
              - generic [ref=e37]: the world.
              - text: the world.
          - paragraph [ref=e38]:
            - generic [ref=e39]:
              - generic [ref=e40]: MYSTENA works on online services, system development, video production and promotion. Explore our four areas, from systems that support sales and operations to product videos and joint projects with brands and creators.
              - text: MYSTENA works on online services, system development, video production and promotion. Explore our four areas, from systems that support sales and operations to product videos and joint projects with brands and creators.
          - generic [ref=e41]:
            - link "Explore our business" [ref=e42]:
              - /url: /en/business
              - generic [ref=e43]:
                - generic [ref=e44]: Explore our business
                - text: Explore our business
            - link "View company information" [ref=e48]:
              - /url: /en/company
              - generic [ref=e49]:
                - generic [ref=e50]: View company information
                - text: View company information
        - generic [ref=e54]:
          - generic [ref=e56]:
            - generic [ref=e57]: Explore MYSTENA’s business.
            - text: Explore MYSTENA’s business.
          - link "Scroll to explore" [ref=e58]:
            - /url: "#business"
            - generic [ref=e59]:
              - generic [ref=e60]: Scroll to explore
              - text: Scroll to explore
        - list "Planning, development, video production and promotion" [ref=e64]:
          - listitem [ref=e65]:
            - generic [ref=e66]:
              - generic [ref=e67]: Planning
              - text: Planning
          - listitem [ref=e70]:
            - generic [ref=e71]:
              - generic [ref=e72]: Development
              - text: Development
          - listitem [ref=e75]:
            - generic [ref=e76]:
              - generic [ref=e77]: Video production
              - text: Video production
          - listitem [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]: Promotion
              - text: Promotion
      - generic [ref=e84]:
        - generic [ref=e85]:
          - paragraph [ref=e86]:
            - generic [ref=e87]:
              - generic [ref=e88]: "01"
              - generic [aria-hidden]: "01"
            - generic [ref=e89]:
              - generic [ref=e90]: Our business
              - generic [aria-hidden]: Our business
          - generic [ref=e91]:
            - heading "MYSTENA’s four business areas" [level=2] [ref=e92]:
              - generic [ref=e93]:
                - generic [ref=e94]: MYSTENA’s four business areas
                - generic [aria-hidden]: MYSTENA’s four business areas
            - paragraph [ref=e95]:
              - generic [ref=e96]:
                - generic [ref=e97]: Start with an overview of each area. Our business page explains the work involved and possible joint project themes.
                - generic [aria-hidden]: Start with an overview of each area. Our business page explains the work involved and possible joint project themes.
        - generic [ref=e98]:
          - link "A 2D illustration of a woman choosing products in an online shop Business area 01 Entertainment commerce Planning, developing and operating online sales services that make choosing products enjoyable. View details" [ref=e99]:
            - /url: /en/business#platform
            - img "A 2D illustration of a woman choosing products in an online shop" [ref=e103]
            - generic [ref=e105]:
              - generic [ref=e106]: Business area 01
              - generic [aria-hidden]: Business area 01
            - heading "Entertainment commerce" [level=3] [ref=e107]:
              - generic [ref=e108]:
                - generic [ref=e109]: Entertainment commerce
                - generic [aria-hidden]: Entertainment commerce
            - paragraph [ref=e110]:
              - generic [ref=e111]:
                - generic [ref=e112]: Planning, developing and operating online sales services that make choosing products enjoyable.
                - generic [aria-hidden]: Planning, developing and operating online sales services that make choosing products enjoyable.
            - generic [ref=e115]:
              - generic [ref=e116]: View details
              - generic [aria-hidden]: View details
          - link "A 2D illustration of two developers writing code and building a web interface Business area 02 Service and system development Developing web services for businesses and systems that manage sales and operations. View details" [ref=e119]:
            - /url: /en/business#systems
            - img "A 2D illustration of two developers writing code and building a web interface" [ref=e123]
            - generic [ref=e125]:
              - generic [ref=e126]: Business area 02
              - generic [aria-hidden]: Business area 02
            - heading "Service and system development" [level=3] [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: Service and system development
                - generic [aria-hidden]: Service and system development
            - paragraph [ref=e130]:
              - generic [ref=e131]:
                - generic [ref=e132]: Developing web services for businesses and systems that manage sales and operations.
                - generic [aria-hidden]: Developing web services for businesses and systems that manage sales and operations.
            - generic [ref=e135]:
              - generic [ref=e136]: View details
              - generic [aria-hidden]: View details
          - link "An AI-generated concept image of a product camera setup and video editing screen Business area 03 Video and content production Producing product videos, in-service visual sequences, advertising materials and digital content. View details" [ref=e139]:
            - /url: /en/business#creative
            - img "An AI-generated concept image of a product camera setup and video editing screen" [ref=e143]
            - generic [ref=e145]:
              - generic [ref=e146]: Business area 03
              - generic [aria-hidden]: Business area 03
            - heading "Video and content production" [level=3] [ref=e147]:
              - generic [ref=e148]:
                - generic [ref=e149]: Video and content production
                - generic [aria-hidden]: Video and content production
            - paragraph [ref=e150]:
              - generic [ref=e151]:
                - generic [ref=e152]: Producing product videos, in-service visual sequences, advertising materials and digital content.
                - generic [aria-hidden]: Producing product videos, in-service visual sequences, advertising materials and digital content.
            - generic [ref=e155]:
              - generic [ref=e156]: View details
              - generic [aria-hidden]: View details
          - link "A 2D illustration of a creator collaboration promoting a product Business area 04 Marketing and collaboration Planning sales promotions, social media initiatives and joint projects with brands and creators. View details" [ref=e159]:
            - /url: /en/business#marketing
            - img "A 2D illustration of a creator collaboration promoting a product" [ref=e163]
            - generic [ref=e165]:
              - generic [ref=e166]: Business area 04
              - generic [aria-hidden]: Business area 04
            - heading "Marketing and collaboration" [level=3] [ref=e167]:
              - generic [ref=e168]:
                - generic [ref=e169]: Marketing and collaboration
                - generic [aria-hidden]: Marketing and collaboration
            - paragraph [ref=e170]:
              - generic [ref=e171]:
                - generic [ref=e172]: Planning sales promotions, social media initiatives and joint projects with brands and creators.
                - generic [aria-hidden]: Planning sales promotions, social media initiatives and joint projects with brands and creators.
            - generic [ref=e175]:
              - generic [ref=e176]: View details
              - generic [aria-hidden]: View details
      - generic [ref=e180]:
        - generic [ref=e181]:
          - paragraph [ref=e182]:
            - generic [ref=e183]:
              - generic [ref=e184]: "02"
              - generic [aria-hidden]: "02"
            - generic [ref=e185]:
              - generic [ref=e186]: Our work
              - generic [aria-hidden]: Our work
          - generic [ref=e187]:
            - heading "What we are working on" [level=2] [ref=e188]:
              - generic [ref=e189]:
                - generic [ref=e190]: What we are working on
                - generic [aria-hidden]: What we are working on
            - paragraph [ref=e191]:
              - generic [ref=e192]:
                - generic [ref=e193]: Explore the roles of businesses introducing products and people looking for them in an online sales service.
                - generic [aria-hidden]: Explore the roles of businesses introducing products and people looking for them in an online sales service.
        - figure "Businesses and users The people involved in an online sales service and the role we envisage for MYSTENA." [ref=e194]:
          - generic [ref=e195]:
            - heading "Businesses and users" [level=3] [ref=e196]:
              - generic [ref=e197]:
                - generic [ref=e198]: Businesses and users
                - generic [aria-hidden]: Businesses and users
            - paragraph [ref=e199]:
              - generic [ref=e200]:
                - generic [ref=e201]: The people involved in an online sales service and the role we envisage for MYSTENA.
                - generic [aria-hidden]: The people involved in an online sales service and the role we envisage for MYSTENA.
          - generic [ref=e202]:
            - strong [ref=e203]:
              - generic [ref=e204]:
                - generic [ref=e205]: What this diagram shows
                - generic [aria-hidden]: What this diagram shows
            - paragraph [ref=e206]:
              - generic [ref=e207]:
                - generic [ref=e208]: The roles involved in presenting products and making them easy to find and choose.
                - generic [aria-hidden]: The roles involved in presenting products and making them easy to find and choose.
          - list [ref=e209]:
            - listitem [ref=e210]:
              - generic [ref=e212]:
                - generic [ref=e213]: "01"
                - generic [aria-hidden]: "01"
              - heading "Businesses offering products" [level=4] [ref=e214]:
                - generic [ref=e215]:
                  - generic [ref=e216]: Businesses offering products
                  - generic [aria-hidden]: Businesses offering products
              - paragraph [ref=e217]:
                - generic [ref=e218]:
                  - generic [ref=e219]: Introducing products and content
                  - generic [aria-hidden]: Introducing products and content
            - listitem [ref=e220]:
              - generic [ref=e222]:
                - generic [ref=e223]: "02"
                - generic [aria-hidden]: "02"
              - heading "MYSTENA’s service" [level=4] [ref=e224]:
                - generic [ref=e225]:
                  - generic [ref=e226]: MYSTENA’s service
                  - generic [aria-hidden]: MYSTENA’s service
              - paragraph [ref=e227]:
                - generic [ref=e228]:
                  - generic [ref=e229]: Designing how products are presented and how the service is used
                  - generic [aria-hidden]: Designing how products are presented and how the service is used
            - listitem [ref=e230]:
              - generic [ref=e232]:
                - generic [ref=e233]: "03"
                - generic [aria-hidden]: "03"
              - heading "People looking for products" [level=4] [ref=e234]:
                - generic [ref=e235]:
                  - generic [ref=e236]: People looking for products
                  - generic [aria-hidden]: People looking for products
              - paragraph [ref=e237]:
                - generic [ref=e238]:
                  - generic [ref=e239]: Enjoying learning about and choosing products and content
                  - generic [aria-hidden]: Enjoying learning about and choosing products and content
        - link "Explore the service approach" [ref=e240]:
          - /url: /en/business#approach
          - generic [ref=e241]:
            - generic [ref=e242]: Explore the service approach
            - generic [aria-hidden]: Explore the service approach
      - generic [ref=e247]:
        - paragraph [ref=e248]:
          - generic [ref=e249]:
            - generic [ref=e250]: "03"
            - generic [aria-hidden]: "03"
          - generic [ref=e251]:
            - generic [ref=e252]: Our approach
            - generic [aria-hidden]: Our approach
        - heading "What matters to us" [level=2] [ref=e253]:
          - generic [ref=e254]:
            - generic [ref=e255]: What matters to us
            - generic [aria-hidden]: What matters to us
        - generic [ref=e256]:
          - paragraph [ref=e258]:
            - generic [ref=e259]:
              - generic [ref=e260]: Staying curious, making things clear and building trust over time. These three principles guide how we plan and develop services.
              - generic [aria-hidden]: Staying curious, making things clear and building trust over time. These three principles guide how we plan and develop services.
          - link "Explore our approach" [ref=e261]:
            - /url: /en/about
            - generic [ref=e262]:
              - generic [ref=e263]: Explore our approach
              - generic [aria-hidden]: Explore our approach
        - region [ref=e267]:
          - heading "MYSTENA in numbers" [level=3] [ref=e268]:
            - generic [ref=e269]:
              - generic [ref=e270]: MYSTENA in numbers
              - generic [aria-hidden]: MYSTENA in numbers
          - generic [ref=e271]:
            - generic [ref=e272]:
              - term [ref=e273]:
                - generic [ref=e274]:
                  - generic [ref=e275]: Partners
                  - generic [aria-hidden]: Partners
              - definition [ref=e276]:
                - generic [ref=e277]:
                  - generic [ref=e278]: "2"
                  - generic [aria-hidden] [ref=e279]:
                    - generic [ref=e280]: "2"
                    - generic: "2"
                - generic [ref=e282]:
                  - generic [ref=e283]: companies
                  - generic [aria-hidden]: companies
            - generic [ref=e284]:
              - term [ref=e285]:
                - generic [ref=e286]:
                  - generic [ref=e287]: Participating stores
                  - generic [aria-hidden]: Participating stores
              - definition [ref=e288]:
                - generic [ref=e289]:
                  - generic [ref=e290]: "10"
                  - generic [aria-hidden] [ref=e291]:
                    - generic [ref=e292]: "10"
                    - generic: "10"
                - generic [ref=e294]:
                  - generic [ref=e295]: stores
                  - generic [aria-hidden]: stores
            - generic [ref=e296]:
              - term [ref=e297]:
                - generic [ref=e298]:
                  - generic [ref=e299]: Registered users
                  - generic [aria-hidden]: Registered users
              - definition [ref=e300]:
                - generic [ref=e301]:
                  - generic [ref=e302]: 1,000
                  - generic [aria-hidden] [ref=e303]:
                    - generic [ref=e304]: 1,000
                    - generic: 1,000
                - generic [ref=e306]:
                  - generic [ref=e307]: people
                  - generic [aria-hidden]: people
          - paragraph [ref=e308]:
            - generic [ref=e309]:
              - generic [ref=e310]: Figures are illustrative placeholders for this layout, not actual business results.
              - generic [aria-hidden]: Figures are illustrative placeholders for this layout, not actual business results.
      - generic [ref=e312]:
        - paragraph [ref=e313]:
          - generic [ref=e314]:
            - generic [ref=e315]: "04"
            - generic [aria-hidden]: "04"
          - generic [ref=e316]:
            - generic [ref=e317]: PARTNERSHIPS
            - generic [aria-hidden]: PARTNERSHIPS
        - generic [ref=e318]:
          - heading "Joint projects, development and production" [level=2] [ref=e319]:
            - generic [ref=e320]:
              - generic [ref=e321]: Joint projects, development and production
              - generic [aria-hidden]: Joint projects, development and production
          - generic [ref=e322]:
            - paragraph [ref=e323]:
              - generic [ref=e324]:
                - generic [ref=e325]: Our collaboration themes include joint product planning, sales service development and product video production.
                - generic [aria-hidden]: Our collaboration themes include joint product planning, sales service development and product video production.
            - paragraph [ref=e326]:
              - generic [ref=e327]:
                - generic [ref=e328]: Depending on the product, service or material involved, we consider projects such as the following.
                - generic [aria-hidden]: Depending on the product, service or material involved, we consider projects such as the following.
          - list [ref=e329]:
            - listitem [ref=e330]:
              - generic [ref=e332]:
                - generic [ref=e333]: "01"
                - generic [aria-hidden]: "01"
              - generic [ref=e334]:
                - generic [ref=e335]: Co-developing or curating products and limited editions
                - generic [aria-hidden]: Co-developing or curating products and limited editions
            - listitem [ref=e336]:
              - generic [ref=e338]:
                - generic [ref=e339]: "02"
                - generic [aria-hidden]: "02"
              - generic [ref=e340]:
                - generic [ref=e341]: Developing sales services and business systems
                - generic [aria-hidden]: Developing sales services and business systems
            - listitem [ref=e342]:
              - generic [ref=e344]:
                - generic [ref=e345]: "03"
                - generic [aria-hidden]: "03"
              - generic [ref=e346]:
                - generic [ref=e347]: Producing product videos and advertising materials
                - generic [aria-hidden]: Producing product videos and advertising materials
            - listitem [ref=e348]:
              - generic [ref=e350]:
                - generic [ref=e351]: "04"
                - generic [aria-hidden]: "04"
              - generic [ref=e352]:
                - generic [ref=e353]: Social media initiatives and influencer partnerships
                - generic [aria-hidden]: Social media initiatives and influencer partnerships
          - paragraph [ref=e354]:
            - generic [ref=e355]:
              - generic [ref=e356]: Our contact channel for collaboration inquiries is being prepared.
              - generic [aria-hidden]: Our contact channel for collaboration inquiries is being prepared.
          - link "About contacting us" [ref=e357]:
            - /url: /en/contact
            - generic [ref=e359]:
              - generic [ref=e360]: About contacting us
              - generic [aria-hidden]: About contacting us
      - generic [ref=e365]:
        - paragraph [ref=e366]:
          - generic [ref=e367]:
            - generic [ref=e368]: "05"
            - generic [aria-hidden]: "05"
          - generic [ref=e369]:
            - generic [ref=e370]: News
            - generic [aria-hidden]: News
        - generic [ref=e371]:
          - generic [ref=e372]:
            - paragraph [ref=e373]:
              - generic [ref=e374]:
                - generic [ref=e375]: There are no announcements at this time.
                - generic [aria-hidden]: There are no announcements at this time.
            - paragraph [ref=e376]:
              - generic [ref=e377]:
                - generic [ref=e378]: Announcements will be published here when available.
                - generic [aria-hidden]: Announcements will be published here when available.
          - link "View all news" [ref=e379]:
            - /url: /en/news
            - generic [ref=e380]:
              - generic [ref=e381]: View all news
              - generic [aria-hidden]: View all news
      - generic [ref=e386]:
        - paragraph [ref=e387]:
          - generic [ref=e388]:
            - generic [ref=e389]: "06"
            - generic [aria-hidden]: "06"
          - generic [ref=e390]:
            - generic [ref=e391]: Company information
            - generic [aria-hidden]: Company information
        - link "Learn about the organization behind MYSTENA. View company information" [ref=e392]:
          - /url: /en/company
          - heading "Learn about the organization behind MYSTENA." [level=2] [ref=e393]:
            - generic [ref=e394]:
              - generic [ref=e395]: Learn about the organization behind MYSTENA.
              - generic [aria-hidden]: Learn about the organization behind MYSTENA.
          - generic [ref=e397]:
            - generic [ref=e398]: View company information
            - generic [aria-hidden]: View company information
      - generic [ref=e402]:
        - paragraph [ref=e403]:
          - generic [ref=e404]:
            - generic [ref=e405]: Contact
            - generic [aria-hidden]: Contact
        - generic [ref=e406]:
          - heading "About contacting us" [level=2] [ref=e407]:
            - generic [ref=e408]:
              - generic [ref=e409]: About contacting us
              - generic [aria-hidden]: About contacting us
          - generic [ref=e410]:
            - paragraph [ref=e411]:
              - generic [ref=e412]:
                - generic [ref=e413]: We are preparing a contact channel for planning, development, video production and collaboration inquiries.
                - generic [aria-hidden]: We are preparing a contact channel for planning, development, video production and collaboration inquiries.
            - link "Contact" [ref=e414]:
              - /url: /en/contact
              - generic [ref=e415]:
                - generic [ref=e416]: Contact
                - generic [aria-hidden]: Contact
  - contentinfo [ref=e420]:
    - generic [ref=e421]:
      - generic [ref=e422]:
        - paragraph [ref=e423]:
          - generic [ref=e424]:
            - generic [ref=e425]: Entertainment × Technology
            - generic [aria-hidden]: Entertainment × Technology
        - navigation "Footer navigation" [ref=e426]:
          - link "About us" [ref=e427]:
            - /url: /en/about
            - generic [ref=e428]:
              - generic [ref=e429]: About us
              - generic [aria-hidden]: About us
          - link "Our business" [ref=e430]:
            - /url: /en/business
            - generic [ref=e431]:
              - generic [ref=e432]: Our business
              - generic [aria-hidden]: Our business
          - link "News" [ref=e433]:
            - /url: /en/news
            - generic [ref=e434]:
              - generic [ref=e435]: News
              - generic [aria-hidden]: News
          - link "Company information" [ref=e436]:
            - /url: /en/company
            - generic [ref=e437]:
              - generic [ref=e438]: Company information
              - generic [aria-hidden]: Company information
          - link "Contact" [ref=e439]:
            - /url: /en/contact
            - generic [ref=e440]:
              - generic [ref=e441]: Contact
              - generic [aria-hidden]: Contact
        - link "Back to top" [ref=e442]:
          - /url: "#main"
      - link "MYSTENA home" [ref=e445]:
        - /url: /en
        - img "MYSTENA" [ref=e447]
      - generic [ref=e448]:
        - generic [ref=e449]:
          - generic [ref=e450]: © MYSTENA
          - generic [aria-hidden]: © MYSTENA
        - link "Privacy policy" [ref=e451]:
          - /url: /en/privacy
          - generic [ref=e452]:
            - generic [ref=e453]: Privacy policy
            - generic [aria-hidden]: Privacy policy
  - alert [ref=e454]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | for (const route of ["/", "/en"]) {
  4   |   test(`${route} lands once, stays still and saves business effects for scrolling`, async ({
  5   |     page,
  6   |     isMobile,
  7   |   }, testInfo) => {
  8   |     if (!isMobile) await page.setViewportSize({ width: 1440, height: 1200 });
  9   |     const errors: string[] = [];
  10  |     page.on("pageerror", (error) => errors.push(error.message));
  11  |     // A fresh context with delayed real font responses exercises the handoff's
  12  |     // font readiness, without replacing the browser font API or seeking time.
  13  |     await page.route(/\.woff2(?:\?|$)/, async (route) => {
  14  |       await new Promise((resolve) => setTimeout(resolve, 800));
  15  |       await route.continue();
  16  |     });
  17  |     await page.goto(route, { waitUntil: "domcontentloaded" });
  18  |     await expect(page.locator(".site-opening")).toHaveAttribute(
  19  |       "data-phase",
  20  |       "writing",
  21  |     );
  22  |     const evidence = await page.evaluate(async () => {
  23  |       const hero = document.querySelector<HTMLElement>(".hero")!;
  24  |       const title = document.querySelector<HTMLElement>("#hero-title")!;
  25  |       const cue = document.querySelector(".hero-scroll-cue path")!;
  26  |       const business = document.querySelector<HTMLElement>("#business")!;
  27  |       let cueStarted = false,
  28  |         cueAfterOpening = false,
  29  |         doneAt = 0;
  30  |       const frames: {
  31  |         font: string;
  32  |         rect: string;
  33  |         animations: number;
  34  |         color: string;
  35  |         businessTop: number;
  36  |       }[] = [];
  37  |       await new Promise<void>((resolve) => {
  38  |         function sample() {
  39  |           const intro = document.documentElement.dataset.intro;
  40  |           const cueRunning = cue
  41  |             .getAnimations()
  42  |             .some((a) => a.playState === "running");
  43  |           if (intro === "docking" && cueRunning) cueStarted = true;
  44  |           if (intro === "done") {
  45  |             if (!doneAt) doneAt = performance.now();
  46  |             cueAfterOpening ||= cueRunning;
  47  |             const box = title.getBoundingClientRect();
  48  |             const style = getComputedStyle(title);
  49  |             frames.push({
  50  |               font: style.font,
  51  |               rect: JSON.stringify([box.x, box.y, box.width, box.height]),
  52  |               color: getComputedStyle(title.querySelector(".reveal-source")!)
  53  |                 .color,
  54  |               animations: hero
  55  |                 .getAnimations({ subtree: true })
  56  |                 .filter((a) => a.playState === "running").length,
  57  |               businessTop: business.getBoundingClientRect().top,
  58  |             });
  59  |             if (performance.now() - doneAt > 2300) return resolve();
  60  |           }
  61  |           requestAnimationFrame(sample);
  62  |         }
  63  |         sample();
  64  |       });
  65  |       return {
  66  |         cueStarted,
  67  |         cueAfterOpening,
  68  |         frames,
  69  |         height: innerHeight,
  70  |         scroll: scrollY,
  71  |         fonts: document.fonts.status,
  72  |       };
  73  |     });
  74  |     await testInfo.attach("landing-samples", {
  75  |       body: JSON.stringify(evidence),
  76  |       contentType: "application/json",
  77  |     });
  78  |     expect(evidence.cueStarted).toBe(true);
  79  |     expect(evidence.cueAfterOpening).toBe(false);
  80  |     expect(evidence.fonts).toBe("loaded");
  81  |     expect(evidence.scroll).toBe(0);
> 82  |     expect(evidence.frames.length).toBeGreaterThan(20);
      |                                    ^ Error: expect(received).toBeGreaterThan(expected)
  83  |     expect(new Set(evidence.frames.map((frame) => frame.font)).size).toBe(1);
  84  |     expect(new Set(evidence.frames.map((frame) => frame.rect)).size).toBe(1);
  85  |     expect(new Set(evidence.frames.map((frame) => frame.color)).size).toBe(1);
  86  |     expect(evidence.frames.every((frame) => frame.animations === 0)).toBe(true);
  87  |     expect(
  88  |       evidence.frames.every((frame) => frame.businessTop >= evidence.height),
  89  |     ).toBe(true);
  90  |     const business = page.locator("#business");
  91  |     const title = business.locator(".section-heading .reveal-text");
  92  |     await expect(business).not.toHaveClass(/scene-entered/);
  93  |     await expect(business).not.toHaveAttribute("data-story-entered", "true");
  94  |     await expect(title).not.toHaveAttribute("data-entered", "true");
  95  |     await expect(page.locator(".hero .reveal-band, .cursor-trail")).toHaveCount(
  96  |       0,
  97  |     );
  98  |     await page.mouse.move(200, 400, { steps: 8 });
  99  |     expect(
  100 |       await page
  101 |         .locator(".hero")
  102 |         .evaluate((el) => el.getAnimations({ subtree: true }).length),
  103 |     ).toBe(0);
  104 |     await title.scrollIntoViewIfNeeded();
  105 |     await expect(business).toHaveClass(/scene-entered/);
  106 |     await expect(title).toHaveAttribute("data-reveal-state", "running");
  107 |     expect(
  108 |       await title
  109 |         .locator(".reveal-color")
  110 |         .evaluate((el) => el.getAnimations().length),
  111 |     ).toBeGreaterThan(0);
  112 |     await expect(title).toHaveAttribute("data-reveal-state", "settled");
  113 |     await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  114 |     await title.scrollIntoViewIfNeeded();
  115 |     expect(
  116 |       await title.evaluate((el) => el.getAnimations({ subtree: true }).length),
  117 |     ).toBe(0);
  118 |     expect(errors).toEqual([]);
  119 |   });
  120 | }
  121 | 
  122 | test("viewport-sized hero and static business band fit short, tall and narrow screens", async ({
  123 |   page,
  124 |   isMobile,
  125 | }, testInfo) => {
  126 |   await page.emulateMedia({ reducedMotion: "reduce" });
  127 |   const sizes = isMobile
  128 |     ? [
  129 |         { width: 320, height: 568 },
  130 |         { width: 390, height: 844 },
  131 |         { width: 844, height: 390 },
  132 |       ]
  133 |     : [
  134 |         { width: 1366, height: 768 },
  135 |         { width: 1440, height: 1200 },
  136 |         { width: 1920, height: 1440 },
  137 |       ];
  138 |   const evidence = [];
  139 |   for (const size of sizes) {
  140 |     await page.setViewportSize(size);
  141 |     for (const route of ["/", "/en"]) {
  142 |       await page.goto(route);
  143 |       await page.evaluate(() => document.fonts.ready);
  144 |       const layout = await page.evaluate(() => ({
  145 |         top: document.querySelector("#business")!.getBoundingClientRect().top,
  146 |         height: innerHeight,
  147 |         width: innerWidth,
  148 |         scrollWidth: document.documentElement.scrollWidth,
  149 |         items: [...document.querySelectorAll(".hero-capabilities li")].map(
  150 |           (el) => {
  151 |             const range = document.createRange();
  152 |             range.selectNodeContents(el.querySelector("span")!);
  153 |             const text = range.getBoundingClientRect();
  154 |             const box = el.getBoundingClientRect();
  155 |             return {
  156 |               left: text.left,
  157 |               right: text.right,
  158 |               boxLeft: box.left,
  159 |               boxRight: box.right,
  160 |             };
  161 |           },
  162 |         ),
  163 |       }));
  164 |       evidence.push({ size, route, layout });
  165 |       expect(layout.top).toBeGreaterThanOrEqual(layout.height);
  166 |       expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
  167 |       expect(layout.items).toHaveLength(4);
  168 |       layout.items.forEach((item) => {
  169 |         expect(item.left).toBeGreaterThanOrEqual(item.boxLeft);
  170 |         expect(item.right).toBeLessThanOrEqual(item.boxRight);
  171 |       });
  172 |       await expect(page.locator(".hero-capabilities")).toBeVisible();
  173 |       await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1");
  174 |     }
  175 |   }
  176 |   await testInfo.attach("viewport-layout", {
  177 |     body: JSON.stringify(evidence),
  178 |     contentType: "application/json",
  179 |   });
  180 | });
  181 | 
```