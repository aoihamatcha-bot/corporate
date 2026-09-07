import test from "node:test";
import assert from "node:assert/strict";
import {
  publishedNews,
  publishedArticle,
  type NewsArticle,
} from "../content/news/index";
import { company, publicCompanyRows } from "../content/company";

const now = new Date("2026-09-08T00:00:00Z");
const fixture = (changes: Partial<NewsArticle>): NewsArticle => ({
  slug: "test-article",
  title: "TEST FIXTURE ONLY",
  summary: "Synthetic test data",
  body: ["Test"],
  status: "draft",
  publishedAt: null,
  ...changes,
});
test("drafts, missing dates, invalid dates, future dates and unsafe slugs are never public", () => {
  const items = [
    fixture({}),
    fixture({ status: "published" }),
    fixture({ status: "published", publishedAt: "invalid" }),
    fixture({ status: "published", publishedAt: "2027-01-01T00:00:00Z" }),
    fixture({ status: "draft", publishedAt: "2026-01-01T00:00:00Z" }),
    fixture({
      status: "published",
      publishedAt: "2026-01-01T00:00:00Z",
      slug: "../draft",
    }),
  ];
  assert.deepEqual(publishedNews(items, now), []);
  for (const item of items)
    assert.equal(publishedArticle(item.slug, [item], now), undefined);
});
test("approved articles appear at their publication boundary in descending date order", () => {
  const newest = fixture({
    slug: "newest",
    status: "published",
    publishedAt: now.toISOString(),
  });
  const older = fixture({
    slug: "older",
    status: "published",
    publishedAt: "2026-09-01T00:00:00Z",
  });
  assert.deepEqual(
    publishedNews([older, newest], now).map((x) => x.slug),
    ["newest", "older"],
  );
  assert.equal(
    publishedArticle("newest", [newest], new Date(now.getTime() - 1)),
    undefined,
  );
  assert.equal(publishedArticle("newest", [newest], now)?.slug, "newest");
});
test("unknown company values stay null; unpublished values cannot appear publicly", () => {
  assert.equal(company.legalName, null);
  const draft = { ...company, legalName: "TEST ONLY - DO NOT PUBLISH" };
  assert.equal(
    publicCompanyRows(draft).find((x) => x.label === "法人名")?.value,
    null,
  );
  assert.equal(
    publicCompanyRows({ ...draft, publicationStatus: "published" }).find(
      (x) => x.label === "法人名",
    )?.value,
    draft.legalName,
  );
});
test("initial news collection has no invented announcements", () => {
  assert.deepEqual(publishedNews(), []);
});
