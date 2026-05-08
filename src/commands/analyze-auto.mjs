import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeScreenshotWithOpenAI } from "../lib/openai-vision-analysis.mjs";
import { validatePageAnalysis } from "../lib/page-analysis.mjs";

export async function analyzeAutoCommand(args) {
  const options = parseArgs(args);

  if (!options.page) {
    throw new Error("Missing required option: --page <page-id>");
  }

  const root = process.cwd();
  const pageDir = path.join(root, "generated", options.page);
  await assertDirectory(pageDir);

  const metadataPath = path.join(pageDir, "metadata.json");
  const metadata = await readMetadata(metadataPath);
  const screenshotPath = path.resolve(root, metadata.screenshot ?? path.join("generated", options.page, "screenshot.png"));
  await assertFile(screenshotPath);

  const promptPath = path.join(root, "prompts", "analyze-page.md");
  const prompt = await readFile(promptPath, "utf8");
  const model = options.model ?? process.env.PAGE_MIMIC_OPENAI_MODEL ?? "gpt-4.1-mini";
  const baseUrl = normalizeBaseUrl(process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1");

  if (options.dryRun) {
    console.log("Auto analysis dry run passed.");
    console.log(`- Page: ${options.page}`);
    console.log(`- Screenshot: ${path.relative(root, screenshotPath).replaceAll("\\", "/")}`);
    console.log(`- Model: ${model}`);
    console.log(`- Base URL: ${baseUrl}`);
    console.log("- No API request was sent.");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing OPENAI_API_KEY. Set it before running analyze:auto, or use --dry-run to validate local inputs."
    );
  }

  const analysis = await analyzeScreenshotWithOpenAI({
    apiKey,
    baseUrl,
    model,
    pageId: options.page,
    prompt,
    screenshotPath
  });

  analysis.pageId = options.page;
  validatePageAnalysis(analysis);

  const analysisPath = path.join(pageDir, "analysis.json");
  await writeFile(analysisPath, `${JSON.stringify(analysis, null, 2)}\n`);
  await updateMetadata(pageDir, {
    model,
    analysisMode: "openai-vision"
  });

  console.log(`Auto analysis written: ${path.relative(root, analysisPath).replaceAll("\\", "/")}`);
  console.log(`- Model: ${model}`);
  console.log(`- Base URL: ${baseUrl}`);
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

    if (arg === "--model") {
      options.model = next;
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

async function assertFile(filePath) {
  try {
    const fileStats = await stat(filePath);

    if (!fileStats.isFile()) {
      throw new Error(`Expected file path: ${filePath}`);
    }
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`Screenshot file does not exist: ${filePath}`);
    }

    throw error;
  }
}

async function readMetadata(metadataPath) {
  try {
    return JSON.parse(await readFile(metadataPath, "utf8"));
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`Metadata file does not exist: ${metadataPath}`);
    }

    throw error;
  }
}

async function updateMetadata(pageDir, details) {
  const metadataPath = path.join(pageDir, "metadata.json");
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  const nextMetadata = {
    ...metadata,
    status: "analyzed",
    step: "mvp1-step-4b",
    analysis: "analysis.json",
    analysisMode: details.analysisMode,
    analysisModel: details.model,
    analyzedAt: new Date().toISOString()
  };

  await writeFile(metadataPath, `${JSON.stringify(nextMetadata, null, 2)}\n`);
}

function normalizeBaseUrl(baseUrl) {
  return baseUrl.replace(/\/+$/, "");
}
