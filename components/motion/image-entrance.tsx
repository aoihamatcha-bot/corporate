import type { ReactNode } from "react";

// The stationary frame clips the moving child without changing image hover effects.
export function ImageEntrance({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`story-card-frame ${className}`}>
      <span className="story-card-media">{children}</span>
    </span>
  );
}
