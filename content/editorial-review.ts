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
