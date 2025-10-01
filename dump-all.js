// dump-all.js
// Usage: node dump-all.js
// Runs dump-services.js, dump-src.js, and dump-styles.js in sequence

const { execSync } = require("child_process");

function run(script) {
  console.log(`\n=== Running ${script} ===`);
  try {
    execSync(`node ${script}`, { stdio: "inherit" });
  } catch (err) {
    console.error(`Error running ${script}:`, err.message);
  }
}

const scripts = [
  "dump-services.js",
  "dump-src.js",
  "dump-styles.js",
];

for (const s of scripts) {
  run(s);
}

console.log("\nAll dumps complete.");
