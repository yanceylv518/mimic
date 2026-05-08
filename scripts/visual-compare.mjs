import { mkdir, readFile, stat, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const pageId = getArg("--page") ?? "page-002";
const previewUrl = getArg("--url") ?? process.env.PAGE_MIMIC_PREVIEW_URL ?? "http://127.0.0.1:5174/";
const root = process.cwd();
const pageDir = path.join(root, "generated", pageId);
const metadataPath = path.join(pageDir, "metadata.json");
const reportDir = path.join(root, "validation", pageId);
const generatedScreenshotPath = path.join(reportDir, "generated-preview.png");
const sourceScreenshotPath = path.join(reportDir, "source-screenshot.png");
const reportPath = path.join(reportDir, "report.md");

await assertDirectory(pageDir);
const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
const sourceImage = path.resolve(root, metadata.screenshot ?? path.join("generated", pageId, "screenshot.png"));

await mkdir(reportDir, { recursive: true });
await copyFile(sourceImage, sourceScreenshotPath);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: {
    width: 1536,
    height: 1024
  },
  deviceScaleFactor: 1
});

const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push(message.text());
  }
});

await page.goto(previewUrl, { waitUntil: "networkidle", timeout: 30000 });
await page.screenshot({ path: generatedScreenshotPath, fullPage: true });
await browser.close();

const analysisPath = path.join(pageDir, "analysis.json");
const analysis = JSON.parse(await readFile(analysisPath, "utf8"));
const generatedStats = await stat(generatedScreenshotPath);
const sourceStats = await stat(sourceScreenshotPath);

const report = `# Visual Validation Report

Page: \`${pageId}\`

Preview URL: ${previewUrl}

## Artifacts

- Source screenshot: \`source-screenshot.png\`
- Generated preview screenshot: \`generated-preview.png\`

## Analysis Summary

- Page type: \`${analysis.pageType}\`
- Layout: \`${analysis.layout?.type ?? "unknown"}\`
- Columns: \`${(analysis.layout?.columns ?? []).join(" / ") || "unknown"}\`
- Sections: ${analysis.sections.length}

## Basic Checks

- Generated screenshot bytes: ${generatedStats.size}
- Source screenshot bytes: ${sourceStats.size}
- Console errors: ${consoleErrors.length}

${consoleErrors.length > 0 ? consoleErrors.map((error) => `- ${error}`).join("\n") : "No console errors captured."}

## Manual Review Checklist

- Compare left sidebar width and density.
- Compare top toolbar spacing.
- Compare hero/recommendation panel prominence.
- Compare main content card grid.
- Compare right utility sidebar.
- Check whether real labels and visible Chinese text are preserved.
`;

await writeFile(reportPath, report);

console.log(`Visual report written: ${path.relative(root, reportPath).replaceAll("\\", "/")}`);
console.log(`- Source: ${path.relative(root, sourceScreenshotPath).replaceAll("\\", "/")}`);
console.log(`- Generated: ${path.relative(root, generatedScreenshotPath).replaceAll("\\", "/")}`);

function getArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return undefined;
  }

  return process.argv[index + 1];
}

async function assertDirectory(directoryPath) {
  const directoryStats = await stat(directoryPath);

  if (!directoryStats.isDirectory()) {
    throw new Error(`Expected directory: ${directoryPath}`);
  }
}
