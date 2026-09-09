/**
 * Pen centerlines redrawn by eye from the supplied storyboard (not a font).
 * Local coordinates preserve the reference's slant without an extra skew.
 * After editing a path, run: node scripts/build-handwriting-v3.mjs
 */
export const handwriting: Record<string, string[]> = {
  好: [
    "M52 12 C47 25 40 42 34 52 C30 57 42 62 51 65",
    "M62 25 C60 43 44 65 25 79",
    "M4 58 C24 48 44 40 67 31",
    "M74 15 C79 11 89 6 93 8 C97 10 83 24 77 29",
    "M77 29 C83 35 84 41 81 51 C78 64 76 75 73 76 C72 77 71 76 71 75",
    "M62 51 C75 43 92 37 104 33",
  ],
  奇: [
    "M26 18 C35 14 43 10 49 10",
    "M39 2 C37 15 27 26 23 32",
    "M31 19 C36 23 43 25 49 25",
    "M1 49 C21 37 45 26 65 23",
    "M24 47 C23 50 22 54 22 57",
    "M24 47 C27 46 30 43 33 43 C34 46 31 51 29 53 C27 56 24 57 22 57",
    "M47 31 C47 47 44 64 39 76 C38 79 36 78 35 76",
  ],
  心: [
    "M11 21 C8 29 4 37 1 43",
    "M20 15 C20 28 24 39 30 41 C37 44 46 36 48 28",
    "M34 9 C35 14 36 18 37 21",
    "M54 4 C57 8 59 12 60 15",
  ],
  が: [
    "M5 30 C12 24 22 20 26 22 C30 24 24 36 20 41 C18 44 17 40 16 39",
    "M20 13 C17 24 9 39 2 47",
    "M36 16 C40 20 43 25 48 29",
    "M46 7 C48 9 49 12 50 14",
    "M54 3 C56 5 57 8 58 10",
  ],
  "、": ["M6 10 C8 12 10 16 11 18"],
  世: [
    "M2 52 C27 36 57 17 86 11",
    "M36 21 C34 33 31 52 33 61 C35 72 48 61 70 49",
    "M53 5 C51 17 47 35 46 43 C51 41 57 38 62 37",
    "M70 4 C66 17 62 27 61 39",
  ],
  界: [
    "M29 16 C29 22 30 31 31 37",
    "M29 18 C38 12 50 6 59 6 C68 4 55 23 51 30",
    "M47 13 C43 22 39 31 38 37",
    "M31 28 C38 23 46 19 55 17",
    "M32 36 C38 32 45 30 51 29",
    "M37 35 C28 49 17 63 4 73",
    "M42 31 C47 37 62 41 76 43",
    "M31 48 C32 56 31 62 31 68",
    "M48 43 C48 59 44 76 39 89",
  ],
  を: [
    "M5 17 C11 15 21 11 28 9",
    "M20 5 C17 15 11 24 10 29 C17 24 22 26 21 38",
    "M33 24 C25 29 10 36 11 45 C12 52 26 47 33 42",
  ],
  変: [
    "M34 6 C35 9 35 13 35 17",
    "M7 30 C26 20 43 13 62 9",
    "M28 24 C28 31 25 39 22 45",
    "M41 18 C40 26 38 35 36 42 C35 45 33 43 32 42",
    "M17 35 C15 40 12 44 9 47",
    "M48 27 C50 29 53 32 54 34",
    "M27 47 C23 54 17 60 11 65",
    "M21 52 C29 49 37 46 41 46 C37 59 23 72 7 86",
    "M20 63 C34 71 53 76 70 76",
  ],
  え: [
    "M15 4 C17 6 19 7 21 9",
    "M8 24 C14 20 21 16 24 18 C21 26 10 40 3 50",
    "M12 37 C20 29 23 32 25 41 C27 49 39 42 47 38",
  ],
  る: [
    "M4 14 C11 8 19 2 20 6 C21 11 10 29 3 41 C14 34 28 25 35 29 C47 37 26 57 16 55 C5 51 21 44 34 45",
  ],
  "。": ["M9 4 C3 3 0 12 6 13 C12 15 16 5 9 4"],
};

export const openingPhrase = "好奇心が、世界を変える。";
export const handwritingLines = ["好奇心が、", "世界を変える。"];
export const handwritingViewBox = "20 12 456 222";
export const handwritingMaskWidth = 5.6;

/** The two eyes appear after the lettering; the curved arrow becomes a smile. */
export const openingSmile = {
  eyes: [{ cx: 419, cy: 194 }, { cx: 441, cy: 193 }],
  eyeRadius: 2,
  mouth: "M402 207 C410 233 446 242 464 209 M454 213 L465 207 L466 219",
  eyeDuration: 110,
  mouthDelay: 90,
  mouthDuration: 390,
};

const glyphOrigins = [
  [[40, 30], [146, 28], [216, 42], [288, 36], [354, 64]],
  [[40, 142], [124, 126], [212, 138], [266, 112], [342, 126], [400, 116], [449, 158]],
];

export function glyphPlacement(row: number, column: number) {
  const [x, y] = glyphOrigins[row][column];
  return `translate(${x} ${y})`;
}

/** Mild, rounded pen pressure. These are SVG units, not CSS pixels. */
export const handwritingPen = {
  width: 3.15,
  startPressure: 0.78,
  endPressure: 0.70,
  swell: 0.14,
};

/** A short pen lift between strokes; a longer breath between lines. */
export function createHandwritingSchedule(lengths: readonly number[]) {
  const strokeCount = handwritingLines.reduce(
    (count, line) => count + Array.from(line).reduce((n, glyph) => n + handwriting[glyph].length, 0),
    0,
  );
  if (lengths.length !== strokeCount || lengths.some((n) => !Number.isFinite(n) || n <= 0)) {
    throw new Error("Handwriting path lengths must match the lettering data.");
  }
  const weights = lengths.map((length) => Math.sqrt(length));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let index = 0;
  let cursor = 650;
  const strokes: { delay: number; duration: number }[] = [];
  handwritingLines.forEach((line, row) => {
    if (row > 0) cursor += 105;
    Array.from(line).forEach((glyph, column) => {
      if (column > 0) cursor += 30;
      handwriting[glyph].forEach(() => {
        const duration = 22 + (1100 * weights[index]) / totalWeight;
        strokes.push({ delay: cursor, duration });
        cursor += duration + 5;
        index++;
      });
    });
  });
  const drawingEnd = cursor - 5;
  const trailDelay = drawingEnd + 60;
  const fadeDelay = trailDelay + 480;
  const fadeDuration = 600;
  return { strokes, drawingEnd, trailDelay, fadeDelay, fadeDuration, end: fadeDelay + fadeDuration };
}
