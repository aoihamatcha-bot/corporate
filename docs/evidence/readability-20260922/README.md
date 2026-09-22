# Before / After — Corporate readability

LOCAL comparison for the 2026-09-22 implementation. [Changes, tests and boundaries](../../verification-readability-20260922.md) / [25 copy decisions](../../readability-copy-20260922.md).

Before: `7ebe25888dec5f2f1e97da6cf5001e81bcdef55c`. After source: `95187af52e92934b8df85059f4f820989be226c4`. Viewport, fonts, image decoding, motion, source digest and build identity are recorded in the corresponding JSON. These are desktop Chromium viewports, not physical devices. Use `before/visual-complete/` for complete baseline diagrams; earlier captures are historical and retained.

| Japanese | Before PC | After PC | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Hero | [1440px](before/visual-complete/ja-1440-hero.png) | [1440px](after/ja-1440-hero.png) | [390px](before/visual-complete/ja-390-hero.png) | [390px](after/ja-390-hero.png) |
| Business introduction | [1440px](before/visual-complete/ja-1440-business-start.png) | [1440px](after/ja-1440-business-start.png) | [390px](before/visual-complete/ja-390-business-start.png) | [390px](after/ja-390-business-start.png) |
| Four areas | [1440px](before/visual-complete/ja-1440-business-cards.png) | [1440px](after/ja-1440-business-cards.png) | [390px](before/visual-complete/ja-390-business-cards.png) | [390px](after/ja-390-business-cards.png) |
| Relationship diagram | [1440px](before/visual-complete/ja-1440-concept.png) | [1440px](after/ja-1440-concept.png) | [390px](before/visual-complete/ja-390-concept.png) | [390px](after/ja-390-concept.png) |
| Contact availability | [1440px](before/visual-complete/ja-1440-contact-cta.png) | [1440px](after/ja-1440-contact-cta.png) | [390px](before/visual-complete/ja-390-contact-cta.png) | [390px](after/ja-390-contact-cta.png) |

| English | Before PC | After PC | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Hero | [1440px](before/visual-complete/en-1440-hero.png) | [1440px](after/en-1440-hero.png) | [390px](before/visual-complete/en-390-hero.png) | [390px](after/en-390-hero.png) |
| Business introduction | [1440px](before/visual-complete/en-1440-business-start.png) | [1440px](after/en-1440-business-start.png) | [390px](before/visual-complete/en-390-business-start.png) | [390px](after/en-390-business-start.png) |
| Four areas | [1440px](before/visual-complete/en-1440-business-cards.png) | [1440px](after/en-1440-business-cards.png) | [390px](before/visual-complete/en-390-business-cards.png) | [390px](after/en-390-business-cards.png) |
| Relationship diagram | [1440px](before/visual-complete/en-1440-concept.png) | [1440px](after/en-1440-concept.png) | [390px](before/visual-complete/en-390-concept.png) | [390px](after/en-390-concept.png) |
| Contact availability | [1440px](before/visual-complete/en-1440-contact-cta.png) | [1440px](after/en-1440-contact-cta.png) | [390px](before/visual-complete/en-390-contact-cta.png) | [390px](after/en-390-contact-cta.png) |

| Detail / destination | Before PC | After PC | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Japanese Business: systems | [1440px](details/before-ja-1440-business.png) | [1440px](details/after-ja-1440-business.png) | [390px](details/before-ja-390-business.png) | [390px](details/after-ja-390-business.png) |
| Japanese Contact | [1440px](details/before-ja-1440-contact.png) | [1440px](details/after-ja-1440-contact.png) | [390px](details/before-ja-390-contact.png) | [390px](details/after-ja-390-contact.png) |
| English Business: systems | [1440px](details/before-en-1440-business.png) | [1440px](details/after-en-1440-business.png) | [390px](details/before-en-390-business.png) | [390px](details/after-en-390-business.png) |
| English Contact | [1440px](details/before-en-1440-contact.png) | [1440px](details/after-en-1440-contact.png) | [390px](details/before-en-390-contact.png) | [390px](details/after-en-390-contact.png) |

The source screenshots preserve their pixels. Long cards/diagrams use a full-document clip after decoding images; the sticky header is hidden for those component captures only so it does not cover their text. Viewport screenshots retain the normal header. See each record for capture type and target bounds.

Performance records are single cold/warm LOCAL diagnostics. They do not establish field Core Web Vitals, INP, or a statistically significant improvement. The preserved opening remains a distinct delay from LCP.
