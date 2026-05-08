import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateTextWithOpenAI, stripCodeFence } from "../lib/openai-text-generation.mjs";
import { validatePageAnalysis } from "../lib/page-analysis.mjs";

export async function renderAiCommand(args) {
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

  const prompt = await readFile(path.join(root, "prompts", "generate-page.md"), "utf8");
  const model = options.model ?? process.env.PAGE_MIMIC_OPENAI_MODEL ?? "gpt-4.1-mini";
  const baseUrl = normalizeBaseUrl(process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1");

  if (options.dryRun) {
    console.log("AI render dry run passed.");
    console.log(`- Page: ${options.page}`);
    console.log(`- Model: ${model}`);
    console.log(`- Base URL: ${baseUrl}`);
    console.log(`- Sections: ${analysis.sections.length}`);
    console.log("- No API request was sent.");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Fill .env before running render:ai.");
  }

  const output = await generateTextWithOpenAI({
    apiKey,
    baseUrl,
    debug: options.debug,
    instructions: prompt,
    model,
    userText: `Generate preview/src/generated/Page.tsx from this analysis JSON:\n\n${JSON.stringify(
      analysis,
      null,
      2
    )}`
  });

  const pageSource = stripCodeFence(output);
  validateTsx(pageSource);

  const pagePath = path.join(pageDir, "page.tsx");
  const previewPath = path.join(root, "preview", "src", "generated", "Page.tsx");
  await mkdir(path.dirname(previewPath), { recursive: true });
  await writeFile(pagePath, pageSource);
  await writeFile(previewPath, pageSource);
  await updateMetadata(pageDir, model);

  console.log(`AI page rendered: ${path.relative(root, pagePath).replaceAll("\\", "/")}`);
  console.log(`Preview synced: ${path.relative(root, previewPath).replaceAll("\\", "/")}`);
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

function validateTsx(pageSource) {
  if (!pageSource.includes("export default function GeneratedPage")) {
    throw new Error("AI render output must export default function GeneratedPage.");
  }

  if (pageSource.includes("```")) {
    throw new Error("AI render output still contains Markdown code fences.");
  }
}

async function updateMetadata(pageDir, model) {
  const metadataPath = path.join(pageDir, "metadata.json");
  const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
  const nextMetadata = {
    ...metadata,
    status: "rendered",
    step: "mvp1-step-5b",
    page: "page.tsx",
    renderMode: "ai",
    renderModel: model,
    renderedAt: new Date().toISOString()
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
