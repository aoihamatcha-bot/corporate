import NextLink from "next/link";
import type { ComponentProps } from "react";

// Small editorial pages load on navigation. Avoid speculative background requests
// and aborted prefetches when changing pages in WebKit or leaving the site.
export default function SiteLink(
  props: Omit<ComponentProps<typeof NextLink>, "prefetch">,
) {
  return <NextLink {...props} prefetch={false} />;
}
