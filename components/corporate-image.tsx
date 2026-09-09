import Image from "next/image";
import { ImageEntrance } from "./motion/image-entrance";
import {
  corporateAsset,
  type CorporateAssetId,
} from "@/content/corporate-assets";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/content/i18n";
import { RevealText } from "./motion/reveal-text";
import { Arrow } from "./icons";

export function CorporateImage({
  id,
  locale,
  sizes = "(max-width: 700px) 90vw, 60vw",
  expandable = false,
  className = "",
}: {
  id: CorporateAssetId;
  locale: Locale;
  sizes?: string;
  expandable?: boolean;
  className?: string;
}) {
  const asset = corporateAsset(id, locale);
  const label = getDictionary(locale).assets.expand;
  const image = (
    <ImageEntrance>
      <Image
        src={asset.path}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        className="corporate-image"
        data-asset-id={id}
      />
    </ImageEntrance>
  );
  return expandable ? (
    <a
      className={`asset-expand ${className}`}
      href={asset.path}
      target="_blank"
      rel="noopener"
      aria-label={`${label}: ${asset.alt}`}
    >
      {image}
      <span className="asset-expand-label">
        <RevealText kind="label">{label}</RevealText>
        <Arrow diagonal />
      </span>
    </a>
  ) : (
    <span className={`corporate-image-frame ${className}`}>{image}</span>
  );
}
