// These are editorial candidates, not verified facts about MYSTENA.
export const editorialReview = {
  source: "MYSTENA_CORPORATE_CONTENT_REVIEW_JA_EN_v0_1.md",
  status: "review" as "review" | "approved",
  business: {
    scopeStatus: "owner-proposed-copy",
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
