# Corporate readability copy revision — 2026-09-22

Role: implementation. Starting HEAD: `7ebe25888dec5f2f1e97da6cf5001e81bcdef55c`. Branch: `feat/corporate-readability-20260922`.

The user requested implementation based on `REVIEW.md`, `COPY_REVIEW.md` and `CODEX_BRIEF.md` from `Documents/MYSTENA/corporate-review-20260922`. Those documents are review inputs, not independent authorization to publish or to settle the operational facts they identify as unknown. This revision implements the recommended direction for review: retain the blue/white presentation and the Hero, make supporting copy concrete, and distinguish Home summaries from Business detail.

## Review status and boundaries

- Current revision: **implemented for review; production acceptance NOT RUN**. `copyRevisionReview` records this separately from the 2026-09-10 historical approved copy in `editorialReview`. The historical record and its operational null values are retained.
- Hero: retain JA `好奇心が、世界を変える。` and EN `Curiosity changes the world.`. The handwriting, H1 and title continue to agree. A replacement Hero and new handwriting assets are not needed for the selected direction.
- Four business areas and their order remain unchanged. The long formal marketing/collaboration name remains; summaries explain sales promotion and joint projects without redefining the business scope.
- Company facts, actual service stage, accepted inquiry themes, contact opening, Privacy policy, real business metrics, news and search publication are not established by these edits. No new legal name, achievement, client, delivery channel, sales rule, payment or logistics flow is added.
- Contact remains unconfigured. CTA text now says the channel is being prepared before the visitor follows the link. The disabled form, API 503 and Privacy notice remain part of the existing implementation.
- The three illustrative metric values and their explicit non-achievement notice remain unchanged.

## Dictionary structure and displayed surfaces

The JA dictionary defines the shared `Dictionary` type and EN implements the same keys.

| Key | Purpose and surface |
| --- | --- |
| `business.areas.*.summary` (new) | Short Home card descriptions; each names the actual field of work. |
| `business.areas.*.description` | Business detail, with an additional sentence about what is considered or produced. |
| `business.areas.*.consultation` | Examples on the detail page; examples do not assert current intake availability. |
| `home.workingLabel`, `workingDescription`, `workingButton` (new) | Separate the Home section label from its heading; explain the relationship diagram and link to detail. No new development stage is asserted. |
| `common.businessDetails` (new) | Localized card detail action. |
| `diagram.relationshipLabel`, `relationshipDescription` (new) | HTML explanation of the diagram's subject. The nodes also state each participant's role in words. |
| `collaboration.contactStatus` (new) | Current contact preparation state next to the collaboration CTA. The older unused `collaboration.note` is not reintroduced as an editorial warning. |
| `pages.*.description` | Page introductions and metadata/OG descriptions; these are reviewed together. |
| `home.businessStructure` | Concise, accurate label for the Hero capabilities list; not another paragraph duplicating the business introduction. |
| `home.philosophyLines`, `contactBand.title` | Each now contains one descriptive heading in both languages. JSX must not assume two entries. |

The content-only changes do not generate or replace image files. A01/A02/A06/A07 are historical adopted illustrations with image-embedded text; changing their adjacent HTML does not edit those words. They now appear as supporting concepts on Business rather than Home. The files, hashes and prior adoption evidence are preserved. Any retained image is an illustration/concept, not new evidence of operations. Visual inspection of A05 JA confirms the earlier copy `楽しさをつくる。魅力を届ける。`, which differs from the current Hero. This pre-existing social-image copy remains unchanged; a coordinated JA/EN social-image replacement remains a Visual Acceptance item. The handwritten Hero retains `好奇心が、世界を変える。`. Image-specific verification is recorded separately in the package evidence.

## Decisions for the 25 copy proposals

`REFINE` below means implemented in the current review revision, not Owner production acceptance. `KEEP` and `HOLD` explain why a proposal was not mechanically applied. Short excerpts identify the original; the dictionaries contain the complete JA and EN revision.

| # | Keys / surface | Original excerpt → current decision | Meaning, factual boundary and Owner item |
| --- | --- | --- | --- |
| 01 | `common.tagline`; Hero | **KEEP + REFINE**: keep `エンターテインメント × テクノロジー`; name online services, systems, video and promotion in the Hero description. | Retains the brand label and adds no new area. |
| 02 | `pages.home.title`, `home.heroLines` | **KEEP**: `好奇心が、世界を変える。` / `Curiosity changes the world.` | The preferred review direction retains the existing brand asset. Replacement Hero remains an unselected alternative. |
| 03 | `common.brandNote`; Hero/menu | **REFINE**: `好奇心から、次の出会いへ。` → `MYSTENAの事業をご紹介します。` | A concrete guide to the site, with no new operational claim. |
| 04 | `common.navMessage`; menu | **REFINE**: `心が動く。世界がひらく。` → `MYSTENAの事業と会社情報` | Names the contents of navigation. |
| 05 | `home.description`; Hero | **REFINE**: the three-part abstract paragraph → two sentences listing the four areas and examples already present in the source. | Removes the unconfirmed legal-entity implication of `会社です`; no actual service stage or result is added. |
| 06 | `home.businessTitle`; Home | **REFINE**: `商品との出会いを、もっと楽しく。` → `MYSTENAの4つの事業` | Describes all four cards without favoring one area. |
| 07 | `home.businessDescription`, `businessStructure`, `capabilities` | **REFINE**: repeated planning/experience claims → a brief guide to the summary cards and detail page; `表現` → `映像制作` in the capabilities label. | Labels existing work more concretely; does not remove the platform's approved-copy `運営` scope. |
| 08 | `home.philosophyLines`; Home | **REFINE**: `小さなときめきが、世界を変えていく。` → `私たちが大切にすること` | Avoids a second promise to change the world. The following text names all three existing values. |
| 09 | `home.philosophyDescription`; Home | **REFINE**: `そのきっかけを技術とアイデアで` → curiosity, clarity and building trust as principles for planning/development. | Summarizes the three existing About values; no outcome guarantee. |
| 10 | `about.heading`, `pages.about.description` | **REFINE**: `使いやすいかたちに` → `楽しさと使いやすさを大切にしたサービスづくり`; introduction explains the page's role. | Makes the subject explicit in page and metadata. |
| 11 | `about.paragraphs[0]` | **REFINE**: successive discovery/growth metaphors → consider whether planning, development and introductions are clear and easy to use. | Describes an approach, not completed work or a new commissioned service. |
| 12 | `about.values[0]` | **KEEP heading / REFINE body**: interest in new products, creative approaches and technology informs planning. | Makes curiosity an action; no adoption result is claimed. |
| 13 | `business.areas.platform` | **REFINE**: retain `エンターテインメントEC`; its Home summary immediately explains `オンライン販売サービス`. Detail describes enjoyable product selection. | Retains `企画・開発・運営` from existing approved copy. This does not confirm that a service is operating today. |
| 14 | `business.areas.systems` | **REFINE**: repeated `仕組み` → web services and sales/operations systems; screens and interactions suited to the work. | Specifies the existing development work without inventing projects or results. |
| 15 | `business.areas.creative` | **REFINE**: retain the production list; replace `育てます` with planning structure and presentation for the message/use. | Existing production types remain intact. |
| 16 | `business.areas.marketing` | **KEEP formal title / REFINE description**: retain `マーケティング・コラボレーション`; summarize promotions/social media/joint projects and remove the closing metaphor. | Renaming the formal area to `販売促進・共同企画` is **HOLD** because it could imply a narrower scope. Owner may decide separately. |
| 17 | `business.audience`, `business.deliverable` | **KEEP / HOLD**: retain existing target and deliverable text. | Official values remain null in `editorialReview`. A more precise new audience/deliverable contract must not be inferred from wording changes. No payment, seller-of-record or logistics facts are supplied. |
| 18 | `diagram.*` | **REFINE**: `つながり` → `事業者・MYSTENA・利用者の関係`; nodes state who introduces products, designs presentation/usability and chooses products. | HTML explains the relationship without image enlargement. No new transaction, payment or shipment relationship. |
| 19 | `collaboration.*` | **REFINE**: `新しい届け方を一緒に` → `共同企画・開発・制作について`; existing themes are listed concretely. | New status text says the contact channel is being prepared; it does not assert that any theme is currently accepted. |
| 20 | `pages.company.description`, `home.companyDescription`, `company.intro/notice` | **REFINE**: `運営主体` → `MYSTENAを運営する事業者`; the notice says official details will appear once confirmed. | Explicitly retains MYSTENA as a brand name and the lack of confirmed entity information. |
| 21 | `company.photoTitle/photoNote`, `assets.aboutCaption` | **REFINE**: concrete planning/development/production captions replace poetic captions. | People and office remain an imagined illustration, not employees or an actual office. |
| 22 | `contactBand.*` | **REFINE**: `新しい可能性は、ひとつの会話から。` → `お問い合わせについて`; explain that the channel is being prepared. | Makes expectation match the disabled destination. Opening the channel remains a separate gate. |
| 23 | `pages.news.description`, `news.emptyDescription` | **REFINE**: remove `確認済み` from the public introduction; say announcements appear here when available. | Empty title and zero published articles remain. No article or date is invented. |
| 24 | `privacy.*` | **KEEP**: retain the policy-preparation explanation and inability to submit personal data. | Existing wording is sufficiently explicit; no legal policy or purpose, processor or retention period is invented. |
| 25 | `assets.posterTitle`, `assets.slots[*]` | **REFINE HTML titles**: `サービスの紹介`, `サービスの概要`, `商品を選んで、開封するまでの流れ`. Remove the broad `安心` assertion from the flow description. | Does not define mystery-box mechanics or change the existing product list. The term and embedded image text require separate fact/asset decisions before any new explanation or asset rewrite. |

## JA / EN alignment

- Both languages name the same four areas; Home summaries and detail descriptions have different roles.
- `企画・開発・運営` remains `plan, develop and operate` in platform detail and summaries. Neither language newly claims an active live product or a customer achievement.
- Both contact bands and collaboration status strings say the contact channel is being prepared. Neither language says intake is open.
- Company and Privacy uncertainty, hypothetical metrics, the disabled form and empty news state remain equivalent.
- `Home` replaces `Top` in both dictionaries' English Home short label. No route changes are required.

## Verification and remaining decisions

This document is an editorial decision map, not a test receipt. Package build/type/lint/content/E2E and visual results are recorded in the integration evidence. A source comparison alone does not prove actual browser rendering.

Formal first-time-reader comprehension testing: **NOT RUN**. Codex editorial judgment is not a claim that every Japanese reader immediately understands the page. Real-device and assistive-technology results, if any, must be recorded separately.

Remaining Owner facts: legal identity and public company details, actual service stage, formal audience and deliverables, accepted collaboration topics, contact/Privacy publication, approved mystery-box explanation, real metric definitions/evidence. Production publication, Ready and merge remain separate from this copy revision.
