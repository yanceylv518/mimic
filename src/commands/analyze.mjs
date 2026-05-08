import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createAnalysisTemplate,
  validatePageAnalysis
} from "../lib/page-analysis.mjs";

export async function analyzeCommand(args) {
  const options = parseArgs(args);

  if (!options.page) {
    throw new Error("Missing required option: --page <page-id>");
  }

  if (!options.analysis && !options.template) {
    throw new Error("Use either --analysis <path> or --template.");
  }

  const root = process.cwd();
  const pageDir = path.join(root, "generated", options.page);
  await assertDirectory(pageDir);

  const analysis = options.template
    ? createAnalysisTemplate(options.page)
    : await readAnalysisFile(path.resolve(root, options.analysis));

  analysis.pageId = options.page;
  validatePageAnalysis(analysis);

  const analysisPath = path.join(pageDir, "analysis.json");
  await writeFile(analysisPath, `${JSON.stringify(analysis, null, 2)}\n`);
  await updateMetadata(pageDir);

  console.log(`Analysis written: ${path.relative(root, analysisPath).replaceAll("\\", "/")}`);
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

    if (arg === "--analysis") {
      options.analysis = next;
      index += 1;
      continue;
    }

    if (arg === "--template") {
      options.template = true;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

async function assertDirectory(directoryPath) {
  try {
    const directoryStats = await stat(directoryPath);

    if (!directoryStats.isDirectory()) {
      throw new Error(`Generated page path is not a directory: ${directoryPath}`);
    }
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`Generated page does not exist: ${directoryPath}`);
    }

    throw error;
  }
}

async function readAnalysisFile(analysisPath) {
  let raw;

  try {
    raw = await readFile(analysisPath, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`Analysis file does not exist: ${analysisPath}`);
    }

    throw error;
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Analysis file is not valid JSON: ${analysisPath}`);
  }
}

async function updateMetadata(pageDir) {
  const metadataPath = path.join(pageDir, "metadata.json");

  try {
    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
    const nextMetadata = {
      ...metadata,
      status: "analyzed",
      step: "mvp1-step-4",
      analysis: "analysis.json",
      analyzedAt: new Date().toISOString()
    };

    await writeFile(metadataPath, `${JSON.stringify(nextMetadata, null, 2)}\n`);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}
