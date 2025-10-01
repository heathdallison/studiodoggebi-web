// summarize-styles.js
// Usage: node summarize-styles.js
// Output: ./styles_summary.txt
//
// Produces a compact digest of the styles in src/app/styles.
// • Scans only *.css, *.scss, *.sass files under src/app/styles
// • Skips huge files
// • Truncates long files to avoid overwhelming output

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src", "app", "styles");
const OUT = path.join(ROOT, "styles_summary.txt");

// ---- Tuning knobs ----------------------------------------------------------
const MAX_SNIPPET_CHARS = 12000; // total output budget
const MAX_FILE_CHARS = 2000;     // per-file snippet cap
const MAX_FILE_BYTES = 200 * 1024; // skip very large files
const INCLUDE_EXT = new Set([".css", ".scss", ".sass"]);

// ---- Helpers ---------------------------------------------------------------
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? walk(res) : [res];
  });
}

function summarizeFile(file) {
  const stat = fs.statSync(file);
  if (stat.size > MAX_FILE_BYTES) {
    return `# ${path.relative(ROOT, file)}\n[skipped, too large: ${stat.size} bytes]\n`;
  }

  const text = fs.readFileSync(file, "utf8");
  const snippet = text.slice(0, MAX_FILE_CHARS);
  return `# ${path.relative(ROOT, file)}\n${snippet}\n\n`;
}

// ---- Main ------------------------------------------------------------------
function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Directory not found: ${SRC}`);
    process.exit(1);
  }

  const files = walk(SRC).filter(f => INCLUDE_EXT.has(path.extname(f)));
  let output = "";

  for (const f of files) {
    if (output.length > MAX_SNIPPET_CHARS) break;
    output += summarizeFile(f);
    if (output.length > MAX_SNIPPET_CHARS) {
      output += "\n[truncated output]\n";
      break;
    }
  }

  fs.writeFileSync(OUT, output, "utf8");
  console.log(`Wrote summary of ${files.length} style file(s) to ${OUT}`);
}

main();
