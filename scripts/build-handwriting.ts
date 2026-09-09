// Canonical v3 pen outlines: use the supplied rounded-pressure generator.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
execFileSync(
  process.execPath,
  [
    "--experimental-strip-types",
    fileURLToPath(new URL("./build-handwriting-v3.mjs", import.meta.url)),
  ],
  { stdio: "inherit" },
);
