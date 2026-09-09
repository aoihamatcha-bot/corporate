// Concept images never substitute for verified company or operational facts.
import { business } from "./business";
import { corporateAssets } from "./corporate-assets";

export const assets = [
  ...business.flatMap((area) =>
    (["card", "detail"] as const).map((placement) => ({
      id: `${area.id}-${placement}-v2`,
      path: placement === "card" ? area.visual : area.detailVisual,
      kind: "generated" as const,
      source: "Built-in image_gen; see docs/business-thumbnails-v2.json",
      role: `fictional business activity concept image (${placement})`,
      altKey: `business.areas.${area.id}.${placement === "card" ? "visualAlt" : "detailVisualAlt"}`,
      permission: "Created for this site at the Owner's request",
      status: "selected-for-site" as const,
    })),
  ),
  ...corporateAssets.map((asset) => ({
    ...asset,
    kind: "approved-concept-asset" as const,
    source: "docs/asset-adoption-v2.json",
    permission: "All v2 assets approved by Owner for site integration",
    status: "selected-for-site" as const,
  })),
  {
    id: "service-video",
    path: null,
    kind: "video",
    source: null,
    role: "Video body has not been produced; A07 is a static cover only",
    permission: null,
    status: "awaiting-approved-material",
  },
] as const;
