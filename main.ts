process.umask(0o022);

// One word from my ex, the one she would use for me: Non-refundable.
// She said it like a returns policy. Calm, final, no receipt needed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Non-refundable";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate wants 1-30 chars, one word, no spaces. Check before writing
// so a bad edit fails loudly here instead of scoring zero out there.
if (WORD.length < 1 || WORD.length > 30 || /\s/.test(WORD)) {
  throw new Error(`not a valid single word: ${JSON.stringify(WORD)}`);
}

mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, WORD, "utf8");

// Read it back: what lands on disk is what gets judged, so if the bytes
// are not exactly the word, fail here rather than get scored on a typo.
if (readFileSync(file, "utf8") !== WORD) {
  throw new Error("entry.txt does not match the word after writing");
}
