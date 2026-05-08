import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  extractComponentCandidatesFromAnalysis,
  mergeComponentCandidates
} from "../lib/component-registry.mjs";
import { validatePageAnalysis } from "../lib/page-analysis.mjs";

export async function componentsExtractCommand(args) {
  const options = parseArgs(args);

  if (!options.page) {
    throw new Error("Missing required option: --page <page-id>");
  }

  const root = process.cwd();
  const analysisPath = path.join(root, "generated", options.page, "analysis.json");
  const analysis = JSON.parse(await readFile(analysisPath, "utf8"));
  validatePageAnalysis(analysis);

  const candidates = await extractComponentCandidatesFromAnalysis({
    analysis,
    cwd: root,
    pageId: options.page
  });

  if (options.dryRun) {
    console.log("Component extraction dry run passed.");
    console.log(`- Page: ${options.page}`);
    console.log(`- Candidates: ${candidates.length}`);
    for (const candidate of candidates) {
      console.log(`  - ${candidate.id}: ${candidate.name}`);
    }
    return;
  }

  const registry = await mergeComponentCandidates({
    candidates,
    cwd: root
  });

  console.log("Component registry updated.");
  console.log(`- Page: ${options.page}`);
  console.log(`- Candidates: ${candidates.length}`);
  console.log(`- Registry size: ${registry.components.length}`);
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

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}
