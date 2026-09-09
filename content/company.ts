import type { Locale } from "./i18n";
import { site } from "./site";
export type LocalizedFact = Record<Locale, string | null>;
export type CompanyInformation = {
  publicationStatus: "unpublished" | "published";
  incorporationStatus: "unconfirmed" | "pre-incorporation" | "incorporated";
  legalName: LocalizedFact;
  representative: LocalizedFact;
  address: LocalizedFact;
  businessActivities: LocalizedFact;
  establishedAt: string | null;
  capitalYen: number | null;
  corporateNumber: string | null;
  email: string | null;
  telephone: string | null;
};
export const company: CompanyInformation = {
  publicationStatus: "unpublished",
  incorporationStatus: "unconfirmed",
  legalName: { ja: null, en: null },
  representative: { ja: null, en: null },
  address: { ja: null, en: null },
  businessActivities: { ja: null, en: null },
  establishedAt: null,
  capitalYen: null,
  corporateNumber: null,
  email: null,
  telephone: null,
};
export type CompanyField =
  | "brand"
  | "legalName"
  | "englishName"
  | "representative"
  | "address"
  | "establishedAt"
  | "capitalYen"
  | "businessActivities"
  | "corporateNumber"
  | "email"
  | "telephone";
export function publicCompanyRows(
  locale: Locale,
  data: CompanyInformation = company,
): { key: CompanyField; value: string }[] {
  const rows: { key: CompanyField; value: string }[] = [
    { key: "brand", value: site.brand },
  ];
  if (data.publicationStatus !== "published") return rows;
  const add = (key: CompanyField, value: string | null) => {
    if (value?.trim()) rows.push({ key, value });
  };
  add("legalName", data.legalName[locale]);
  if (locale === "ja") add("englishName", data.legalName.en);
  add("representative", data.representative[locale]);
  add("address", data.address[locale]);
  if (
    data.establishedAt &&
    /^\d{4}-\d{2}-\d{2}$/.test(data.establishedAt) &&
    Number.isFinite(Date.parse(data.establishedAt)) &&
    new Date(data.establishedAt).toISOString().slice(0, 10) ===
      data.establishedAt
  ) {
    add(
      "establishedAt",
      new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(data.establishedAt)),
    );
  }
  if (
    data.capitalYen !== null &&
    Number.isSafeInteger(data.capitalYen) &&
    data.capitalYen >= 0
  ) {
    add(
      "capitalYen",
      new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-GB", {
        style: "currency",
        currency: "JPY",
        currencyDisplay: "code",
        maximumFractionDigits: 0,
      }).format(data.capitalYen),
    );
  }
  add("businessActivities", data.businessActivities[locale]);
  add("corporateNumber", data.corporateNumber);
  add("email", data.email);
  add("telephone", data.telephone);
  return rows;
}
