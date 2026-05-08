import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateTextWithOpenAI, stripCodeFence } from "../lib/openai-text-generation.mjs";
import { validatePageAnalysis } from "../lib/page-analysis.mjs";

export async function patchAiCommand(args) {
  const options = parseArgs(args);

  if (!options.page) {
    throw new Error("Missing required option: --page <page-id>");
  }

  const root = process.cwd();
  const pageDir = path.join(root, "generated", options.page);
  await assertDirectory(pageDir);

  const analysisPath = path.join(pageDir, "analysis.json");
  const analysis = JSON.parse(await readFile(analysisPath, "utf8"));
  validatePageAnalysis(analysis);

  const feedbackPath = path.join(root, "validation", options.page, "ai-feedback.md");
  await assertFile(feedbackPath);

  const previewPath = path.join(root, "preview", "src", "generated", "Page.tsx");
  await assertFile(previewPath);

  const prompt = await readFile(path.join(root, "prompts", "patch-page.md"), "utf8");
  const feedback = await readFile(feedbackPath, "utf8");
  const currentPageSource = await readFile(previewPath, "utf8");
  const model = options.model ?? process.env.PAGE_MIMIC_OPENAI_MODEL ?? "gpt-4.1-mini";
  const baseUrl = normalizeBaseUrl(process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1");

  if (options.dryRun) {
    console.log("AI patch dry run passed.");
    console.log(`- Page: ${options.page}`);
    console.log(`- Model: ${model}`);
    console.log(`- Base URL: ${baseUrl}`);
    console.log(`- Feedback: ${path.relative(root, feedbackPath).replaceAll("\\", "/")}`);
    console.log(`- Current TSX bytes: ${Buffer.byteLength(currentPageSource, "utf8")}`);
    console.log(`- Sections: ${analysis.sections.length}`);
    console.log("- No API request was sent.");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Fill .env before running patch:ai.");
  }

  const output = await generateTextWithOpenAI({
    apiKey,
    baseUrl,
    debug: options.debug,
    instructions: prompt,
    model,
    userText: [
      "Improve this generated page using the visual feedback.",
      "",
      "## Visual Feedback",
      feedback,
      "",
      "## Analysis JSON",
      JSON.stringify(analysis, null, 2),
      "",
      "## Current Page.tsx",
      currentPageSource
    ].join("\n")
  });

  const nextPageSource = stripCodeFence(output);
  validateTsx(nextPageSource);

  const pagePath = path.join(pageDir, "page.tsx");
  const patchDir = path.join(pageDir, "patches");
  await mkdir(patchDir, { recursive: true });
  const backupPath = path.join(patchDir, `before-${timestampForFile()}.tsx`);

  await writeFile(backupPath, currentPageSource);
  await writeFile(pagePath, nextPageSource);
  await writeFile(previewPath, nextPageSource);
  await updateMetadata(pageDir, model, backupPath);

  console.log(`AI patch applied: ${path.relative(root, previewPath).replaceAll("\\", "/")}`);
  console.log(`Previous TSX backed up: ${path.relative(root, backupPath).replaceAll("\\", "/")}`);
  console.log(`- Model: ${model}`);
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

    if (arg === "--debug") {
      options.debug = true;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

async function assertDirectory(directoryPath) {
  const directoryStats = await stat(directoryPath);

  if (!directoryStats.isDirectory()) {
    throw new Error(`Generated page path is not a directory: ${directoryPath}`);
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
      throw new Error(`Required file does not exist: ${filePath}`);
    }

    throw error;
  }
}

function validateTsx(pageSource) {
  if (!pageSource.includes("export default function GeneratedPage")) {
    throw new Error("AI patch output must export default function GeneratedPage.");
  }

  if (pageSource.includes("```")) {
    throw new Error("AI patch output still contains Markdown code fences.");
  }
}

async function updateMetadata(pageDir, model, backupPath) {
  const metadataPath = path.join(pageDir, "metadata.json");
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  const root = process.cwd();
  const nextMetadata = {
    ...metadata,
    status: "patched",
    step: "mvp1-step-5d",
    page: "page.tsx",
    patchMode: "ai",
    patchModel: model,
    previousPageBackup: path.relative(root, backupPath).replaceAll("\\", "/"),
    patchedAt: new Date().toISOString()
  };

  await writeFile(metadataPath, `${JSON.stringify(nextMetadata, null, 2)}\n`);
}

function normalizeBaseUrl(baseUrl) {
  try {
    const url = new URL(baseUrl);
    url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return baseUrl.replace(/\/+$/, "");
  }
}

function timestampForFile() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}
