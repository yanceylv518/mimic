import { checkCommand } from "./commands/check.mjs";
import { generateCommand } from "./commands/generate.mjs";

const command = process.argv[2] ?? "help";
const args = process.argv.slice(3);

const commands = {
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
  npm run cli -- check
  npm run generate -- --image input/screenshot.png

Commands:
  check       Verify required project paths.
  generate    Create a generated page folder from one screenshot.
`);
}
