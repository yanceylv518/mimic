import { loadEnvFile } from "./lib/env.mjs";
import { analyzeCommand } from "./commands/analyze.mjs";
import { analyzeAutoCommand } from "./commands/analyze-auto.mjs";
import { checkCommand } from "./commands/check.mjs";
import { feedbackAiCommand } from "./commands/feedback-ai.mjs";
import { generateCommand } from "./commands/generate.mjs";
import { patchAiCommand } from "./commands/patch-ai.mjs";
import { renderCommand } from "./commands/render.mjs";
import { renderAiCommand } from "./commands/render-ai.mjs";

const command = process.argv[2] ?? "help";
const args = process.argv.slice(3);

await loadEnvFile();

const commands = {
  analyze: analyzeCommand,
  "analyze:auto": analyzeAutoCommand,
  check: checkCommand,
  "feedback:ai": feedbackAiCommand,
  generate: generateCommand,
  "patch:ai": patchAiCommand,
  render: renderCommand,
  "render:ai": renderAiCommand,
  help: helpCommand
};

const handler = commands[command];

if (!handler) {
  console.error(`Unknown command: ${command}`);
  helpCommand();
  process.exit(1);
}

try {
  await handler(args);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

function helpCommand() {
  console.log(`Page Mimic CLI

Usage:
  npm run analyze -- --page page-001 --analysis examples/page-analysis.example.json
  npm run analyze -- --page page-001 --template
  npm run analyze:auto -- --page page-001
  npm run cli -- check
  npm run feedback:ai -- --page page-001
  npm run generate -- --image input/screenshot.png
  npm run patch:ai -- --page page-001
  npm run render -- --page page-001
  npm run render:ai -- --page page-001

Commands:
  analyze       Write analysis.json for a generated page.
  analyze:auto  Use a vision model to generate analysis.json from screenshot.png.
  check         Verify required project paths.
  feedback:ai   Use a vision model to compare source and generated screenshots.
  generate      Create a generated page folder from one screenshot.
  patch:ai      Use AI visual feedback to patch the generated React page.
  render        Generate React page code from analysis.json.
  render:ai     Use a code model to generate React page code from analysis.json.
`);
}
