import { useId } from "react";

export type StoryBeat =
  | "business"
  | "assembly"
  | "philosophy"
  | "collaboration"
  | "news"
  | "company"
  | "contact";

const trails: Record<StoryBeat, string> = {
  business: "M-80 300 C220 70 540 570 970 250 S1410 150 1510 340",
  assembly: "M-60 440 C330 50 730 670 1160 280 S1390 110 1470 70",
  philosophy: "M-70 590 C340 700 820 120 1480 80",
  collaboration: "M-80 90 C300 60 350 500 725 350 S1150 170 1470 420",
  news: "M-40 570 Q550 620 1460 500",
  company:
    "M75 485 V116 Q75 91 102 91 H1338 Q1365 91 1365 116 V485 Q1365 510 1338 510 H102 Q75 510 75 485",
  contact: "M-80 510 C340 690 540 260 870 305 S1130 440 1300 330",
};

// These layers sit beside the adopted scene-colors; neither owns the other.
export function StoryAccent({ beat }: { beat: StoryBeat }) {
  const id = `story-${useId().replaceAll(":", "")}`;
  return (
    <svg
      className={`story-accent story-accent-${beat}`}
      viewBox="0 0 1440 640"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="100"
          x2="1440"
          y2="480"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-2, #abdfff)" stopOpacity="0" />
          <stop offset=".34" stopColor="var(--color-2, #abdfff)" />
          <stop offset=".7" stopColor="var(--color-4, #dbd4ff)" />
          <stop
            offset="1"
            stopColor="var(--color-3, #9fc4ff)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <g className="story-drift">
        <path
          className="story-ribbon"
          d={trails[beat]}
          stroke={`url(#${id})`}
        />
      </g>
      <g className="story-parallax">
        <path
          className="story-line"
          d={trails[beat]}
          stroke={`url(#${id})`}
          pathLength={1}
        />
        {beat === "collaboration" && (
          <path
            className="story-line story-second-line"
            d="M1490 70 C1150 80 1060 480 725 350 S200 150 -50 420"
            stroke={`url(#${id})`}
            pathLength={1}
          />
        )}
        {beat === "philosophy" && (
          <g className="story-ripples" stroke={`url(#${id})`}>
            <circle cx="1240" cy="160" r="22" />
            <circle cx="1240" cy="160" r="57" />
            <circle cx="1240" cy="160" r="93" />
          </g>
        )}
      </g>
    </svg>
  );
}
