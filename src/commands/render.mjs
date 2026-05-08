import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateReactPage } from "../lib/react-page-generator.mjs";
import { validatePageAnalysis } from "../lib/page-analysis.mjs";

export async function renderCommand(args) {
  const options = parseArgs(args);

  if (!options.page) {
    throw new Error("Missing required option: --page <page-id>");
  }

  const root = process.cwd();
  const pageDir = path.join(root, "generated", options.page);
  await assertDirectory(pageDir);

  const analysisPath = path.join(pageDir, "analysis.json");
  const analysis = await readAnalysis(analysisPath);
  validatePageAnalysis(analysis);

  const pageSource = generateReactPage(analysis);
  const pagePath = path.join(pageDir, "page.tsx");
  const previewPath = path.join(root, "preview", "src", "generated", "Page.tsx");

  await mkdir(path.dirname(previewPath), { recursive: true });
  await writeFile(pagePath, pageSource);
  await writeFile(previewPath, pageSource);
  await updateMetadata(pageDir);

  console.log(`Page rendered: ${path.relative(root, pagePath).replaceAll("\\", "/")}`);
  console.log(`Preview synced: ${path.relative(root, previewPath).replaceAll("\\", "/")}`);
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

async function readAnalysis(analysisPath) {
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
      status: "rendered",
      step: "mvp1-step-5",
      page: "page.tsx",
      renderedAt: new Date().toISOString()
    };

    await writeFile(metadataPath, `${JSON.stringify(nextMetadata, null, 2)}\n`);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}
