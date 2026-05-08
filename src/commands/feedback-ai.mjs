import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateVisualFeedbackWithOpenAI } from "../lib/openai-visual-feedback.mjs";
import { appendProjectRules, loadProjectRules } from "../lib/project-rules.mjs";

export async function feedbackAiCommand(args) {
  const options = parseArgs(args);

  if (!options.page) {
    throw new Error("Missing required option: --page <page-id>");
  }

  const root = process.cwd();
  const reportDir = path.join(root, "validation", options.page);
  const sourceScreenshotPath = path.join(reportDir, "source-screenshot.png");
  const generatedScreenshotPath = path.join(reportDir, "generated-preview.png");
  const reportPath = path.join(reportDir, "report.md");
  const feedbackPath = path.join(reportDir, "ai-feedback.md");

  await assertFile(sourceScreenshotPath);
  await assertFile(generatedScreenshotPath);
  await assertFile(reportPath);

  const prompt = appendProjectRules(
    await readFile(path.join(root, "prompts", "visual-feedback.md"), "utf8"),
    await loadProjectRules({ cwd: root })
  );
  const reportText = await readFile(reportPath, "utf8");
  const model = options.model ?? process.env.PAGE_MIMIC_OPENAI_MODEL ?? "gpt-4.1-mini";
  const baseUrl = normalizeBaseUrl(process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1");

  if (options.dryRun) {
    console.log("AI visual feedback dry run passed.");
    console.log(`- Page: ${options.page}`);
    console.log(`- Model: ${model}`);
    console.log(`- Base URL: ${baseUrl}`);
    console.log(`- Source: ${path.relative(root, sourceScreenshotPath).replaceAll("\\", "/")}`);
    console.log(`- Generated: ${path.relative(root, generatedScreenshotPath).replaceAll("\\", "/")}`);
    console.log(`- Report: ${path.relative(root, reportPath).replaceAll("\\", "/")}`);
    console.log("- Project rules: loaded");
    console.log("- No API request was sent.");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Fill .env before running feedback:ai.");
  }

  const feedback = await generateVisualFeedbackWithOpenAI({
    apiKey,
    baseUrl,
    debug: options.debug,
    generatedScreenshotPath,
    instructions: prompt,
    model,
    reportText,
    sourceScreenshotPath
  });

  await writeFile(feedbackPath, `${feedback.trim()}\n`);

  console.log(`AI visual feedback written: ${path.relative(root, feedbackPath).replaceAll("\\", "/")}`);
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

async function assertFile(filePath) {
  try {
    const fileStats = await stat(filePath);

    if (!fileStats.isFile()) {
      throw new Error(`Expected file path: ${filePath}`);
    }
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(
        `Required visual validation file does not exist: ${filePath}. Run npm run validate:visual -- --page <page-id> first.`
      );
    }

    throw error;
  }
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
