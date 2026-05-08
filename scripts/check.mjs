import { access } from "node:fs/promises";
import path from "node:path";

const requiredPaths = [
  "input",
  "generated",
  "prompts/analyze-page.md",
  "prompts/generate-page.md",
  "preview"
];

const root = process.cwd();
const missing = [];

for (const item of requiredPaths) {
  try {
    await access(path.join(root, item));
  } catch {
    missing.push(item);
  }
}

if (missing.length > 0) {
  console.error("Missing required MVP1 paths:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("MVP1 project skeleton is ready.");
