import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export async function acceptIterationWorkflow({
  cwd = process.cwd(),
  dryRun = false,
  iteration,
  note = "",
  page
}) {
  const context = await getIterationContext({ cwd, iteration, page });
  await assertFile(context.afterTsx);

  if (dryRun) {
    printDecisionDryRun("accept", context, note);
    return { dryRun: true, action: "accept", iteration: context.iterationName, page };
  }

  await copyFile(context.afterTsx, context.previewPath);
  await copyFile(context.afterTsx, context.generatedPagePath);
  await writeDecision(context, {
    action: "accept",
    note,
    sourceTsx: context.afterTsx
  });
  await updateMetadata(context, {
    acceptedIteration: context.iterationName,
    status: "accepted"
  });

  return {
    action: "accept",
    decisionPath: context.decisionPath,
    iteration: context.iterationName,
    page
  };
}

export async function rejectIterationWorkflow({
  cwd = process.cwd(),
  dryRun = false,
  iteration,
  note = "",
  page
}) {
  const context = await getIterationContext({ cwd, iteration, page });
  await assertFile(context.beforeTsx);

  if (dryRun) {
    printDecisionDryRun("reject", context, note);
    return { dryRun: true, action: "reject", iteration: context.iterationName, page };
  }

  await copyFile(context.beforeTsx, context.previewPath);
  await copyFile(context.beforeTsx, context.generatedPagePath);
  await writeDecision(context, {
    action: "reject",
    note,
    sourceTsx: context.beforeTsx
  });
  await updateMetadata(context, {
    rejectedIteration: context.iterationName,
    status: "rejected"
  });

  return {
    action: "reject",
    decisionPath: context.decisionPath,
    iteration: context.iterationName,
    page
  };
}

async function getIterationContext({ cwd, iteration, page }) {
  if (!page) {
    throw new Error("Missing required workflow option: page");
  }

  if (!iteration) {
    throw new Error("Missing required workflow option: iteration");
  }

  const root = cwd;
  const iterationName = normalizeIterationName(iteration);
  const pageDir = path.join(root, "generated", page);
  const iterationDir = path.join(root, "validation", page, "iterations", iterationName);
  const resultPath = path.join(iterationDir, "result.json");
  const result = JSON.parse(await readFile(resultPath, "utf8"));

  if (result.status !== "passed") {
    throw new Error(`Cannot decide ${iterationName}; iteration status is ${result.status}.`);
  }

  return {
    afterTsx: path.join(root, result.artifacts.afterTsx),
    beforeTsx: path.join(root, result.artifacts.beforeTsx),
    decisionPath: path.join(iterationDir, "decision.json"),
    generatedPagePath: path.join(pageDir, "page.tsx"),
    iterationDir,
    iterationName,
    metadataPath: path.join(pageDir, "metadata.json"),
    page,
    previewPath: path.join(root, "preview", "src", "generated", "Page.tsx"),
    result,
    root
  };
}

async function writeDecision(context, { action, note, sourceTsx }) {
  await mkdir(context.iterationDir, { recursive: true });
  await writeFile(
    context.decisionPath,
    `${JSON.stringify(
      {
        action,
        decidedAt: new Date().toISOString(),
        iteration: context.iterationName,
        note: note || null,
        page: context.page,
        sourceTsx: relative(context.root, sourceTsx),
        syncedTo: {
          generatedPage: relative(context.root, context.generatedPagePath),
          previewPage: relative(context.root, context.previewPath)
        }
      },
      null,
      2
    )}\n`
  );
}

async function updateMetadata(context, updates) {
  const metadata = JSON.parse(await readFile(context.metadataPath, "utf8"));
  const nextMetadata = {
    ...metadata,
    ...updates,
    decisionAt: new Date().toISOString(),
    decisionIteration: context.iterationName,
    step: "mvp1-step-5f"
  };

  await writeFile(context.metadataPath, `${JSON.stringify(nextMetadata, null, 2)}\n`);
}

async function assertFile(filePath) {
  const fileStats = await stat(filePath);

  if (!fileStats.isFile()) {
    throw new Error(`Expected file: ${filePath}`);
  }
}

function normalizeIterationName(iteration) {
  const raw = String(iteration).trim();

  if (/^iteration-\d+$/.test(raw)) {
    return raw.replace(/iteration-(\d+)$/, (_, value) => `iteration-${value.padStart(3, "0")}`);
  }

  if (/^\d+$/.test(raw)) {
    return `iteration-${raw.padStart(3, "0")}`;
  }

  throw new Error(`Invalid iteration value: ${iteration}`);
}

function printDecisionDryRun(action, context, note) {
  console.log(`Iteration ${action} dry run passed.`);
  console.log(`- Page: ${context.page}`);
  console.log(`- Iteration: ${context.iterationName}`);
  console.log(`- Note: ${note || "(none)"}`);
  console.log(`- Source TSX: ${relative(context.root, action === "accept" ? context.afterTsx : context.beforeTsx)}`);
  console.log(`- Preview target: ${relative(context.root, context.previewPath)}`);
  console.log("- No files were changed.");
}

function relative(root, filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}
