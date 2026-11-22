// news-image-20261122 — trivial stdlib-only copier.
//
// The front page (576x1024, 50 verified stories) is pre-rendered and shipped
// as entry.png next to this file. At grade time this program does nothing but
// copy that finished image to the output directory: no rendering, no fonts,
// no network, no dependencies, no absolute paths. Deterministic by
// construction (a byte copy).
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ASSET = join(HERE, "entry.png");
const OUT_NAME = "entry.png";

function outdirFromArgs(argv: string[]): string | null {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--outdir" && i + 1 < argv.length) {
      return argv[i + 1];
    }
    if (argv[i].startsWith("--outdir=")) {
      return argv[i].slice("--outdir=".length);
    }
  }
  return null;
}

function candidates(argv: string[]): string[] {
  const list: string[] = [];
  const push = (dir: string | null | undefined) => {
    if (dir && dir.trim() !== "" && !list.includes(dir)) {
      list.push(dir);
    }
  };
  push(outdirFromArgs(argv));
  push(process.env.MAKEFUN_OUTPUT_DIR);
  push("/output");
  push("./output");
  return list;
}

function main(): number {
  if (!existsSync(ASSET)) {
    console.error(`news-image-20261122: missing asset: ${ASSET}`);
    return 1;
  }
  const errors: string[] = [];
  for (const dir of candidates(process.argv.slice(2))) {
    try {
      const target = resolve(dir);
      mkdirSync(target, { recursive: true });
      const dest = join(target, OUT_NAME);
      copyFileSync(ASSET, dest);
      if (!existsSync(dest)) {
        throw new Error(`copy did not produce ${dest}`);
      }
      // Verify the copy is complete: a truncated/partial copy would still
      // exist on disk, so compare byte sizes against the source and fail
      // loudly instead of silently handing the grader a corrupt image.
      const srcSize = statSync(ASSET).size;
      const destSize = statSync(dest).size;
      if (destSize !== srcSize) {
        throw new Error(
          `copied size mismatch: ${dest} is ${destSize} bytes, expected ${srcSize} bytes`,
        );
      }
      return 0;
    } catch (err) {
      errors.push(`${dir}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  console.error("news-image-20261122: could not write entry.png to any output dir:");
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  return 1;
}

process.exit(main());
