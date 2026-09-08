import test from "node:test";
import assert from "node:assert/strict";
import {
  publishedNews,
  publishedArticle,
  articleLanguageAvailability,
  type NewsArticle,
  type NewsTranslation,
} from "../content/news/index";
import { company, publicCompanyRows } from "../content/company";
import { getDictionary } from "../content/dictionaries";
import {
  locales,
  pagePaths,
  localizedPath,
  languageDestination,
} from "../content/i18n";
import { localizedAlternates, pageMetadata } from "../content/metadata";
import { editorialReview } from "../content/editorial-review";
import { business } from "../content/business";

const now = new Date("2026-09-08T00:00:00Z");
const translation = (
  changes: Partial<NewsTranslation> = {},
): NewsTranslation => ({
  title: "TEST FIXTURE ONLY",
  summary: "Synthetic test data",
  body: ["Test"],
  status: "published",
  publishedAt: "2026-09-01T00:00:00Z",
  ...changes,
});
const fixture = (
  copy: Partial<NewsTranslation> = {},
  slug = "test-article",
): NewsArticle => ({
  slug,
  translations: { ja: translation(copy) },
});

test("draft, missing/invalid/future date, unsafe slug and empty copy are never public", () => {
  const items = [
    fixture({ status: "draft" }),
    fixture({ publishedAt: null }),
    fixture({ publishedAt: "invalid" }),
    fixture({ publishedAt: "2027-01-01T00:00:00Z" }),
    fixture({}, "../draft"),
    fixture({ title: " " }),
    fixture({ summary: " " }),
    fixture({ body: [] }),
    fixture({ body: [""] }),
  ];
  for (const locale of locales) {
    assert.deepEqual(publishedNews(locale, items, now), []);
    for (const item of items)
      assert.equal(publishedArticle(item.slug, locale, [item], now), undefined);
  }
  assert.deepEqual(articleLanguageAvailability(items, now), {});
});
test("approved articles appear at the publication boundary in descending date order", () => {
  const newest = fixture({ publishedAt: now.toISOString() }, "newest");
  const older = fixture({}, "older");
  assert.deepEqual(
    publishedNews("ja", [older, newest], now).map((x) => x.slug),
    ["newest", "older"],
  );
  assert.equal(
    publishedArticle("newest", "ja", [newest], new Date(now.getTime() - 1)),
    undefined,
  );
  assert.equal(publishedArticle("newest", "ja", [newest], now)?.slug, "newest");
});
test("each translation has its own publication boundary, with no Japanese fallback", () => {
  const article = fixture();
  assert.equal(publishedArticle(article.slug, "en", [article], now), undefined);
  article.translations.en = translation({ status: "draft" });
  assert.deepEqual(articleLanguageAvailability([article], now), {
    "test-article": ["ja"],
  });
  article.translations.en = translation({
    publishedAt: "2027-01-01T00:00:00Z",
  });
  assert.deepEqual(publishedNews("en", [article], now), []);
  article.translations.en = translation({
    title: "English fixture",
    publishedAt: now.toISOString(),
  });
  assert.equal(
    publishedArticle(article.slug, "en", [article], now)?.title,
    "English fixture",
  );
  assert.deepEqual(articleLanguageAvailability([article], now), {
    "test-article": ["ja", "en"],
  });
});
test("unknown company facts stay null and unpublished values are omitted", () => {
  assert.deepEqual(company.legalName, { ja: null, en: null });
  assert.equal(company.incorporationStatus, "unconfirmed");
  const draft = {
    ...company,
    legalName: { ja: "TEST ONLY", en: "TEST ONLY EN" },
  };
  for (const locale of locales)
    assert.deepEqual(publicCompanyRows(locale, draft), [
      { key: "brand", value: "MYSTENA" },
    ]);
});
test("confirmed company values are localized without inventing English names or optional fields", () => {
  const confirmed = {
    ...company,
    publicationStatus: "published" as const,
    legalName: { ja: "TEST ONLY", en: null },
  };
  assert.equal(
    publicCompanyRows("ja", confirmed).find((x) => x.key === "legalName")
      ?.value,
    "TEST ONLY",
  );
  assert.equal(
    publicCompanyRows("en", confirmed).find((x) => x.key === "legalName"),
    undefined,
  );
  assert.equal(
    publicCompanyRows("ja", confirmed).find((x) => x.key === "capitalYen"),
    undefined,
  );
  assert.equal(
    publicCompanyRows("en", confirmed).find((x) => x.key === "address"),
    undefined,
  );
});
test("dates, currency and identifiers retain the same facts in both locales", () => {
  const confirmed = {
    ...company,
    publicationStatus: "published" as const,
    establishedAt: "2026-01-02",
    capitalYen: 1000000,
    corporateNumber: "TEST-IDENTIFIER",
  };
  const ja = Object.fromEntries(
    publicCompanyRows("ja", confirmed).map((x) => [x.key, x.value]),
  );
  const en = Object.fromEntries(
    publicCompanyRows("en", confirmed).map((x) => [x.key, x.value]),
  );
  assert.equal(ja.establishedAt, "2026年1月2日");
  assert.equal(en.establishedAt, "2 January 2026");
  assert.equal(ja.capitalYen, en.capitalYen);
  assert.equal(ja.corporateNumber, en.corporateNumber);
  assert.equal(
    publicCompanyRows("en", { ...confirmed, establishedAt: "2026-02-30" }).find(
      (x) => x.key === "establishedAt",
    ),
    undefined,
  );
});
test("initial collections contain no invented announcements or operational facts", () => {
  for (const locale of locales) assert.deepEqual(publishedNews(locale), []);
  assert.equal(editorialReview.business.actualStage, null);
  assert.equal(editorialReview.contact.publicEmail, null);
  assert.equal(editorialReview.contact.supportedLanguages, null);
  assert.deepEqual(
    editorialReview.business.proposedAreas,
    business.map((area) => area.id),
  );
});
test("all public pages retain the same destination when changing language", () => {
  for (const path of Object.values(pagePaths)) {
    const en = localizedPath(path, "en");
    assert.equal(localizedPath(en, "ja"), path);
    assert.equal(languageDestination(path, "en").href, en);
    assert.equal(languageDestination(en, "ja").href, path);
  }
  assert.equal(localizedPath("/enterprise", "ja"), "/enterprise");
});
test("unavailable translations link only to the target-language news index", () => {
  const available = articleLanguageAvailability([fixture()], now);
  assert.deepEqual(languageDestination("/news/test-article", "en", available), {
    href: "/en/news",
    available: false,
  });
  assert.deepEqual(
    languageDestination("/en/news/test-article", "ja", available),
    { href: "/news/test-article", available: true },
  );
  assert.deepEqual(
    languageDestination("/en/news/nonexistent", "ja", available),
    { href: "/news", available: false },
  );
});
test("dictionaries have matching nonempty leaves, business areas and metadata", () => {
  function leaves(value: unknown, prefix = ""): string[] {
    if (typeof value === "string") {
      assert.ok(value.trim(), prefix);
      return [prefix];
    }
    assert.ok(value && typeof value === "object", prefix);
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, prefix + "." + key),
    );
  }
  assert.deepEqual(leaves(getDictionary("ja")), leaves(getDictionary("en")));
  for (const locale of locales) {
    assert.deepEqual(
      Object.keys(getDictionary(locale).business.areas),
      business.map((area) => area.id),
    );
    for (const page of Object.keys(pagePaths) as (keyof typeof pagePaths)[]) {
      assert.ok(pageMetadata(locale, page).description);
      assert.equal(pageMetadata(locale, page).alternates, undefined);
    }
  }
});
test("publication alternates use each language's own URL and only available translations", () => {
  assert.deepEqual(
    localizedAlternates("/en/company", ["ja", "en"], "https://example.test"),
    {
      canonical: "https://example.test/en/company",
      languages: {
        ja: "https://example.test/company",
        en: "https://example.test/en/company",
      },
    },
  );
  assert.deepEqual(
    localizedAlternates("/news/test-article", ["ja"], "https://example.test")
      ?.languages,
    { ja: "https://example.test/news/test-article" },
  );
  for (const origin of [
    null,
    "invalid",
    "http://example.test",
    "https://example.test/path",
    "https://user@example.test",
  ])
    assert.equal(localizedAlternates("/", ["ja"], origin), undefined);
});
