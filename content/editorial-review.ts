// Owner adopted the business copy for production on 2026-09-10.
// Unconfirmed legal and operational facts remain separate and unpublished.
export const editorialReview = {
  source: "MYSTENA_CORPORATE_CONTENT_REVIEW_JA_EN_v0_1.md",
  status: "approved" as "review" | "approved",
  business: {
    scopeStatus: "owner-approved-copy",
    proposedAreas: ["platform", "systems", "creative", "marketing"],
    actualStage: null,
    proposedStage: "in-development",
    publicServiceName: null,
    targetAudiences: null,
    deliverables: null,
    revenueModel: null,
    commissionedProduction: null,
  },
  collaboration: { acceptedThemes: null, serviceParticipationOpen: null },
  contact: {
    status: "unconfigured",
    publicEmail: null,
    supportedLanguages: null,
  },
  privacy: { status: "unpublished", approvedBody: { ja: null, en: null } },
} as const;

// The 2026-09-10 approval above is historical. It does not approve this revision.
// This request authorizes implementation and review, not production publication.
export const copyRevisionReview = {
  source: "docs/readability-copy-20260922.md",
  date: "2026-09-22",
  status: "review",
  implementationStatus: "requested",
  productionAcceptance: "not-requested",
  retainedHero: "好奇心が、世界を変える。",
  businessScope: "unchanged",
  operationalFacts: "unconfirmed",
} as const;
