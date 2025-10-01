// summarize-angular.js
// Output: ./angular_summary.txt
// Focused digest of how the Angular app works:
// • Routes (Routes arrays, provideRouter/forRoot)
// • Components: selector, standalone, imports, (truncated) template
// • Services: ***ALL *.service.ts*** (class name, constructor deps, public/arrow methods)
// • Key configs: index.html <base>, angular.json build options
// Skips tests, styles, assets, binaries, huge files, etc.

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC  = path.join(ROOT, "src");
const OUT  = path.join(ROOT, "angular_summary.txt");

// ---- Tuning knobs ----------------------------------------------------------
const MAX_SNIPPET_CHARS = 12000;     // total output budget
const MAX_FILE_CHARS    = 3000;      // per-file snippet cap
const MAX_FILE_BYTES    = 400 * 1024;// skip very large files
const INCLUDE_EXT       = new Set([".ts", ".html", ".json"]);
// ---------------------------------------------------------------------------

function detectEncoding(buf){
  if (buf.length >= 3 && buf[0]===0xEF && buf[1]===0xBB && buf[2]===0xBF) return "utf8-bom";
  if (buf.length >= 2 && buf[0]===0xFF && buf[1]===0xFE) return "utf16le";
  if (buf.length >= 2 && buf[0]===0xFE && buf[1]===0xFF) return "utf16be";
  return "utf8";
}
function decodeBuf(buf, enc){
  if (enc === "utf8-bom") return buf.slice(3).toString("utf8");
  if (enc === "utf16le")  return buf.slice(2).toString("utf16le");
  if (enc === "utf16be") {
    const b = buf.slice(2);
    const swapped = Buffer.allocUnsafe(b.length);
    for (let i=0;i+1<b.length;i+=2){ swapped[i]=b[i+1]; swapped[i+1]=b[i]; }
    return swapped.toString("utf16le");
  }
  return buf.toString("utf8");
}
function readTextSafe(abs){
  const stat = fs.statSync(abs);
  if (stat.size > MAX_FILE_BYTES) return null;
  const buf = fs.readFileSync(abs);
  return decodeBuf(buf, detectEncoding(buf));
}
function collectFiles(dir, acc){
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) collectFiles(full, acc);
    else if (INCLUDE_EXT.has(path.extname(full).toLowerCase())) acc.push(full);
  }
}

function stripComments(ts) {
  return ts
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^\:])\/\/[^\n]*/g, "$1"); // avoid nuking `http://` in strings
}

function trimSnippet(s, max=MAX_FILE_CHARS){
  s = s.trim();
  return s.length > max ? (s.slice(0, max) + "\n…(truncated)…") : s;
}

// ---------- ROUTES ----------
function extractRoutes(ts){
  const out = [];
  const m = ts.match(/export\s+const\s+routes\s*:\s*Routes\s*=\s*\[([\s\S]*?)\];/);
  if (m) out.push("export const routes: Routes = [" + m[1].trim() + "];");
  const m2 = ts.match(/provideRouter\(\s*\[([\s\S]*?)\]\s*\)/);
  if (m2) out.push("provideRouter([ " + m2[1].trim() + " ])");
  const m3 = ts.match(/RouterModule\.forRoot\(\s*\[([\s\S]*?)\]\s*(?:,[\s\S]*?)?\)/);
  if (m3) out.push("RouterModule.forRoot([ " + m3[1].trim() + " ])");
  return out.join("\n\n");
}

// ---------- COMPONENT META ----------
function extractComponentMeta(ts, fileAbs){
  const deco = ts.match(/@Component\s*\(\s*\{([\s\S]*?)\}\s*\)\s*export\s+class\s+([A-Za-z0-9_]+)/);
  if (!deco) return null;
  const body = deco[1];
  const klass = deco[2];

  const sel = (body.match(/selector\s*:\s*['"`]([^'"`]+)['"`]/) || [])[1] || "(no selector)";
  const standalone = (body.match(/standalone\s*:\s*(true|false)/) || [])[1];
  const imports = (body.match(/imports\s*:\s*\[([\s\S]*?)\]/) || [])[1];

  // inline or external template
  const inlineMatch = body.match(/template\s*:\s*`([\s\S]*?)`/) ||
                      body.match(/template\s*:\s*['"]([\s\S]*?)['"]/);
  const tmplUrl = (body.match(/templateUrl\s*:\s*['"`]([^'"`]+)['"`]/) || [])[1];

  let template = "";
  if (inlineMatch?.[1]) template = inlineMatch[1];
  else if (tmplUrl) {
    const htmlPath = path.resolve(path.dirname(fileAbs), tmplUrl);
    if (fs.existsSync(htmlPath)) template = readTextSafe(htmlPath) || "";
  }
  template = template ? trimSnippet(template, 800) : "(no template)";

  return `@Component -> ${klass}
selector: ${sel}
standalone: ${standalone}
imports: ${imports ? trimSnippet(imports, 800) : "(none)"}
--- template ---
${template}`;
}

// ---------- SERVICES (ALL *.service.ts) ----------
function isService(absPath){
  return absPath.toLowerCase().endsWith(".service.ts");
}
function compressWS(s){ return s.replace(/\s+/g, " ").trim(); }
function extractServiceSummary(ts){
  const clsM = ts.match(/export\s+class\s+([A-Za-z0-9_]+)/);
  const cls  = clsM ? clsM[1] : "(service)";
  const ctor = ts.match(/constructor\s*\(([\s\S]*?)\)\s*\{/);
  const ctorSig = ctor ? compressWS(ctor[1]) : "(none)";

  // class methods
  const methods = new Set();
  const methRE = /(?:public\s+)?([A-Za-z_]\w*)\s*\(([^)]*)\)\s*(:\s*[^)\{;]+)?\s*\{/g;
  let m;
  while ((m = methRE.exec(ts))) {
    const name = m[1]; if (name === "constructor") continue;
    methods.add(`${name}(${compressWS(m[2])})${m[3] ? m[3].replace(/\s+/g,' ') : ""}`);
  }
  // arrow function methods: foo = (a: T) => { ... }
  const arrowRE = /([A-Za-z_]\w*)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  while ((m = arrowRE.exec(ts))) {
    methods.add(`${m[1]}(${compressWS(m[2])}) => …`);
  }

  const list = Array.from(methods).sort();
  return `Service ${cls}
constructor: ${ctorSig}
methods:
  ${list.length ? list.join("\n  ") : "(none)"}`;
}

// ---------- small config summaries ----------
function summarizeAngularJson(){
  const p = path.join(ROOT, "angular.json");
  if (!fs.existsSync(p)) return null;
  const raw = readTextSafe(p);
  if (!raw) return null;
  try {
    const j = JSON.parse(raw);
    const projName = Object.keys(j.projects || {})[0];
    const build = j.projects?.[projName]?.architect?.build?.options || {};
    const out = {
      project: projName,
      outputPath: build.outputPath,
      baseHref: build.baseHref,
      deployUrl: build.deployUrl,
      index: build.index,
      browser: build.browser
    };
    return "angular.json (build options)\n" + JSON.stringify(out, null, 2);
  } catch { return null; }
}
function summarizeIndexHtml(){
  const p = path.join(SRC, "index.html");
  if (!fs.existsSync(p)) return null;
  const html = readTextSafe(p) || "";
  const base = (html.match(/<base\s+href=["']([^"']+)["']/i) || [])[1];
  return `<index.html> base href: ${base || "(none found)"}`;
}

// ---------- main ----------
function main(){
  if (!fs.existsSync(SRC)) {
    console.error(`❌ No "src" directory at ${SRC}`);
    process.exit(1);
  }

  const files = [];
  collectFiles(SRC, files);
  files.sort();

  const chunks = [];

  const ajson = summarizeAngularJson(); if (ajson) chunks.push(ajson);
  const idx   = summarizeIndexHtml();   if (idx)   chunks.push(idx);

  for (const abs of files) {
    if (chunks.join("\n\n").length > MAX_SNIPPET_CHARS) break;

    const rel  = path.relative(ROOT, abs).split(path.sep).join("/");
    let   text = readTextSafe(abs);
    if (text == null) continue;

    if (abs.endsWith(".ts")) text = stripComments(text);

    // ROUTES (first)
    let added = false;
    if (/routes?\.ts$/.test(abs) || /routing/i.test(abs) || /router/i.test(text)) {
      const r = extractRoutes(text);
      if (r) { chunks.push(`=== ROUTING: ${rel} ===\n${trimSnippet(r)}`); added = true; }
    }

    // SERVICES (ALL *.service.ts)
    if (!added && isService(abs)) {
      const s = extractServiceSummary(text);
      if (s) chunks.push(`=== SERVICE: ${rel} ===\n${trimSnippet(s, 2000)}`);
      added = true;
    }

    // COMPONENTS
    if (!added && abs.endsWith(".ts")) {
      const meta = extractComponentMeta(text, abs);
      if (meta) chunks.push(`=== COMPONENT: ${rel} ===\n${meta}`);
      added = true;
    }

    // IMPORTANT HTML templates under app/ (only router-related)
    if (abs.endsWith(".html") && /src\/app\//.test(rel)) {
      if (/routerLink|router-outlet|sd-nav/i.test(text)) {
        chunks.push(`=== TEMPLATE: ${rel} ===\n${trimSnippet(text, 1200)}`);
      }
    }
  }

  const finalText = chunks.join("\n\n");
  fs.writeFileSync(OUT, finalText.slice(0, MAX_SNIPPET_CHARS), "utf8");
  console.log(`✅ Wrote ${OUT} (${finalText.length} chars, capped at ${MAX_SNIPPET_CHARS})`);
}

main();
