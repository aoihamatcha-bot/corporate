import type { ReactNode } from "react";

// The adopted illustration stays still while the opening lands on the title.
export function HeroArt({ children }: { children: ReactNode }) {
  return (
    <div className="hero-motion-art" data-hero-active="false">
      <div className="hero-camera">{children}</div>
    </div>
  );
}
