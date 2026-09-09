import Image from "next/image";
import { RevealText } from "./motion/reveal-text";
import { MenuInk } from "./motion/menu-ink";

export function Wordmark({
  dark = false,
  menu = false,
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
      <span className="brand-wordmark-motion" aria-hidden="true">
        {menu ? (
          <MenuInk kind="utility">MYSTENA</MenuInk>
        ) : (
          <RevealText kind="utility">MYSTENA</RevealText>
        )}
      </span>
    </span>
  );
}
