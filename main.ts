process.umask(0o022);

// One word from my ex, the one she would use for me: Non-refundable.
// She said it like a returns policy. Calm, final, no receipt needed.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Non-refundable";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate wants 1-30 chars, one word, no spaces. Check before writing
// so a bad edit fails loudly here instead of scoring zero out there.
if (WORD.length < 1 || WORD.length > 30 || /\s/.test(WORD)) {
  throw new Error(`not a valid single word: ${JSON.stringify(WORD)}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
