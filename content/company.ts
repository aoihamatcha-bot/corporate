import { site } from "./site";
export type CompanyInformation = {
  publicationStatus: "unpublished" | "published";
  legalName: string | null;
  entityType: string | null;
  representative: string | null;
  address: string | null;
  establishedAt: string | null;
  capital: string | null;
  telephone: string | null;
  email: string | null;
};
export const company: CompanyInformation = {
  publicationStatus: "unpublished",
  legalName: null,
  entityType: null,
  representative: null,
  address: null,
  establishedAt: null,
  capital: null,
  telephone: null,
  email: null,
};
export function publicCompanyRows(data: CompanyInformation = company) {
  const fields = [
    ["法人名", data.legalName],
    ["法人種別", data.entityType],
    ["代表者", data.representative],
    ["所在地", data.address],
    ["設立", data.establishedAt],
    ["資本金", data.capital],
    ["電話番号", data.telephone],
    ["お問い合わせ先", data.email],
  ] as const;
  return [
    { label: "ブランド名", value: site.brand },
    ...fields.map(([label, value]) => ({
      label,
      value: data.publicationStatus === "published" ? value : null,
    })),
  ];
}
