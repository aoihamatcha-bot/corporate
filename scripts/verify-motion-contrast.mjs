import fs from "node:fs/promises";
const css = await fs.readFile("styles/tokens.css", "utf8");
const toRgb = (hex) =>
  hex
    .slice(1)
    .match(/../g)
    .map((part) => parseInt(part, 16) / 255);
const root = Object.fromEntries(
  [
    ...css.split("[data-palette")[0].matchAll(/--([\w-]+):\s*(#[\da-f]{6})/gi),
  ].map((match) => [match[1], toRgb(match[2])]),
);
const foregrounds = [...css.matchAll(/--type-[123]:\s*(#[\da-f]{6})/gi)].map(
  (match) => toRgb(match[1]),
);
const backgrounds = Object.entries(root)
  .filter(([name]) =>
    /^(sky|mint|apricot|iris|lagoon|rose|honey|twilight)-[1-4]$|^menu-(color|echo)-\d$|^paper$/.test(
      name,
    ),
  )
  .map(([, rgb]) => rgb);
function luminance(rgb) {
  const linear = rgb.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
const mix = (a, b, p) => a.map((v, i) => v * (1 - p) + b[i] * p);
let minBackground = 1;
for (const a of backgrounds)
  for (const b of backgrounds)
    for (let step = 0; step <= 100; step++)
      minBackground = Math.min(minBackground, luminance(mix(a, b, step / 100)));
const maxForeground = Math.max(...foregrounds.map(luminance));
const bodyBrightness = Number(
  css.match(/--text-body-brightness:\s*([\d.]+)/)[1],
);
const maxBodyForeground = Math.max(
  ...foregrounds.map((rgb) => luminance(rgb.map((v) => v * bodyBrightness))),
);
// sRGB interpolation and alpha over the darker base ink cannot produce a
// foreground brighter than the brightest text endpoint (convex luminance).
const result = {
  measuredAt: new Date().toISOString(),
  method:
    "sRGB text endpoint maximum; every backdrop endpoint pair at 1% intervals. Text color fades onto opaque black ink. Decorative wipes intentionally occlude part of a line briefly and are not text-color samples. Photo backgrounds, antialiasing and unmeasured display behavior excluded.",
  foregroundCount: foregrounds.length,
  backgroundCount: backgrounds.length,
  coloredBodyTextMinimum: (minBackground + 0.05) / (maxBodyForeground + 0.05),
  coloredLargeTextMinimum: (minBackground + 0.05) / (maxForeground + 0.05),
  blackTextMinimum: (minBackground + 0.05) / (luminance(root.ink) + 0.05),
  mutedTextMinimum: (minBackground + 0.05) / (luminance(root.muted) + 0.05),
};
console.log(JSON.stringify(result, null, 2));
if (process.argv[2])
  await fs.writeFile(process.argv[2], JSON.stringify(result, null, 2));
if (
  result.coloredBodyTextMinimum < 4.5 ||
  result.coloredLargeTextMinimum < 3 ||
  result.blackTextMinimum < 4.5 ||
  result.mutedTextMinimum < 4.5
)
  process.exitCode = 1;
