export type HeroVideo = { src: string; type: "video/mp4" | "video/webm" };

// Owner: the final hero movie is still in production (2026-09-10).
// Reserved settings: HERO motion is paused in v4, so changing this constant
// alone does not enable playback. The adopted A08 illustration stays static.
export const heroVideo: HeroVideo | null = null;
