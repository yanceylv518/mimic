import { optimizePageWorkflow } from "../workflows/optimize-page-workflow.mjs";

export async function optimizeAiCommand(args) {
  const options = parseArgs(args);
  const result = await optimizePageWorkflow(options);

  if (result.dryRun) {
    return;
  }

  console.log("Optimize workflow completed.");
  for (const iteration of result.iterations) {
    console.log(`- ${iteration.iteration}: ${iteration.status}`);
    console.log(`  ${iteration.artifacts.result}`);
  }
}

function parseArgs(args) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === "--page") {
      options.page = next;
      index += 1;
      continue;
    }

    if (arg === "--max-rounds") {
      options.maxRounds = Number(next);
      index += 1;
      continue;
    }

    if (arg === "--model") {
      options.model = next;
      index += 1;
      continue;
    }

    if (arg === "--note") {
      options.note = next;
      index += 1;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}
