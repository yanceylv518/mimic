import {
  acceptIterationWorkflow,
  rejectIterationWorkflow
} from "../workflows/iteration-decision-workflow.mjs";

export async function iterationAcceptCommand(args) {
  const result = await acceptIterationWorkflow(parseArgs(args));
  printResult(result);
}

export async function iterationRejectCommand(args) {
  const result = await rejectIterationWorkflow(parseArgs(args));
  printResult(result);
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

    if (arg === "--iteration") {
      options.iteration = next;
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

function printResult(result) {
  if (result.dryRun) {
    return;
  }

  console.log(`Iteration ${result.action} completed.`);
  console.log(`- Page: ${result.page}`);
  console.log(`- Iteration: ${result.iteration}`);
  console.log(`- Decision: ${result.decisionPath.replaceAll("\\", "/")}`);
}
