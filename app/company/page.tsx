import { RevealText } from "@/components/motion/reveal-text";
import type { Metadata } from "next";
import { PageIntro, SectionLabel, ContactBand } from "@/components/editorial";
import { pages } from "@/content/pages";
import { company, publicCompanyRows } from "@/content/company";
export const metadata: Metadata = {
  title: pages.company.ja,
  description: pages.company.description,
};
export default function Company() {
  return (
    <>
      <PageIntro {...pages.company} />
      <section className="page-section">
        <div className="container editorial-grid">
          <SectionLabel>COMPANY PROFILE</SectionLabel>
          <div>
            {company.publicationStatus === "unpublished" && (
              <p className="notice">
                <RevealText kind="body">{pages.company.notice}</RevealText>
              </p>
            )}
            <dl className="company-table">
              {publicCompanyRows().map((row) => (
                <div key={row.label}>
                  <dt>
                    <RevealText kind="label">{row.label}</RevealText>
                  </dt>
                  <dd className={row.value ? undefined : "unpublished"}>
                    <RevealText kind="body">
                      {row.value ?? "公開準備中"}
                    </RevealText>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
