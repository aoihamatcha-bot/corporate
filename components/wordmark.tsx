import Image from "next/image";

export function Wordmark({
  dark = false,
}: {
  dark?: boolean;
  menu?: boolean;
}) {
  return (
    <span className="brand-wordmark">
      <Image
        src={`/images/corporate/a10-wordmark-${dark ? "dark" : "light"}-fit.svg`}
        width={849}
        height={128}
        alt="MYSTENA"
        unoptimized
      />
    </span>
  );
}
