import { access } from "node:fs/promises";
import path from "node:path";

const requiredPaths = [
  "input",
  "generated",
  "prompts/analyze-page.md",
  "prompts/generate-page.md",
  "preview/src/generated/Page.tsx"
];

export async function checkCommand() {
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
    throw new Error(
      `Missing required MVP1 paths:\n${missing.map((item) => `- ${item}`).join("\n")}`
    );
  }

  console.log("Page Mimic CLI check passed.");
}
