import { analyzeCommand } from "./commands/analyze.mjs";
import { checkCommand } from "./commands/check.mjs";
import { generateCommand } from "./commands/generate.mjs";

const command = process.argv[2] ?? "help";
const args = process.argv.slice(3);

const commands = {
  analyze: analyzeCommand,
  check: checkCommand,
  generate: generateCommand,
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
  npm run cli -- check
  npm run generate -- --image input/screenshot.png

Commands:
  analyze     Write analysis.json for a generated page.
  check       Verify required project paths.
  generate    Create a generated page folder from one screenshot.
`);
}
