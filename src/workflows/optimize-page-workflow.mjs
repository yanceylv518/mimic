import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

export async function optimizePageWorkflow({
  cwd = process.cwd(),
  dryRun = false,
  maxRounds = 1,
  model,
  note = "",
  onProgress = () => {},
  page
}) {
  if (!page) {
    throw new Error("Missing required workflow option: page");
  }

  const root = cwd;
  const pageDir = path.join(root, "generated", page);
  const validationDir = path.join(root, "validation", page);
  const iterationsDir = path.join(validationDir, "iterations");
  const previewPath = path.join(root, "preview", "src", "generated", "Page.tsx");

  await assertDirectory(pageDir);
  await assertFile(previewPath);

  const rounds = Number(maxRounds);
  if (!Number.isInteger(rounds) || rounds < 1) {
    throw new Error("--max-rounds must be a positive integer.");
  }

  if (dryRun) {
    console.log("Optimize workflow dry run passed.");
    console.log(`- Page: ${page}`);
    console.log(`- Max rounds: ${rounds}`);
    console.log(`- Note: ${note || "(none)"}`);
    console.log(`- Preview: ${path.relative(root, previewPath).replaceAll("\\", "/")}`);
    console.log("- No commands were executed.");
    return {
      page,
      dryRun: true,
      maxRounds: rounds
    };
  }

  await mkdir(iterationsDir, { recursive: true });

  const results = [];

  for (let round = 0; round < rounds; round += 1) {
    const iterationNumber = await nextIterationNumber(iterationsDir);
    const iterationName = `iteration-${String(iterationNumber).padStart(3, "0")}`;
    const iterationDir = path.join(iterationsDir, iterationName);
    await mkdir(iterationDir, { recursive: true });

    const result = {
      iteration: iterationName,
      page,
      note: note || null,
      status: "running",
      startedAt: new Date().toISOString(),
      commands: [],
      artifacts: {}
    };

    try {
      await writeFile(path.join(iterationDir, "note.txt"), note ? `${note}\n` : "");
      await copyFile(previewPath, path.join(iterationDir, "before.tsx"));
      result.artifacts.beforeTsx = relative(root, path.join(iterationDir, "before.tsx"));

      onProgress({ step: `${iterationName}: validate before`, stepStatus: "running" });
      await runAndRecord({
        command: process.execPath,
        args: ["scripts/visual-compare.mjs", "--page", page],
        cwd: root,
        logPath: path.join(iterationDir, "01-validate-before.log"),
        result
      });
      onProgress({ step: `${iterationName}: validate before`, stepStatus: "passed" });
      await copyValidationArtifacts({
        root,
        validationDir,
        iterationDir,
        screenshotName: "before.png",
        reportName: "report-before.md"
      });
      result.artifacts.beforeScreenshot = relative(root, path.join(iterationDir, "before.png"));

      onProgress({ step: `${iterationName}: feedback`, stepStatus: "running" });
      await runAndRecord({
        command: process.execPath,
        args: compact(["src/cli.mjs", "feedback:ai", "--page", page, model ? "--model" : "", model ?? ""]),
        cwd: root,
        logPath: path.join(iterationDir, "02-feedback.log"),
        result
      });
      onProgress({ step: `${iterationName}: feedback`, stepStatus: "passed" });
      await copyFile(path.join(validationDir, "ai-feedback.md"), path.join(iterationDir, "feedback.md"));
      result.artifacts.feedback = relative(root, path.join(iterationDir, "feedback.md"));

      onProgress({ step: `${iterationName}: patch`, stepStatus: "running" });
      await runAndRecord({
        command: process.execPath,
        args: compact([
          "src/cli.mjs",
          "patch:ai",
          "--page",
          page,
          model ? "--model" : "",
          model ?? "",
          note ? "--note" : "",
          note
        ]),
        cwd: root,
        logPath: path.join(iterationDir, "03-patch.log"),
        result
      });
      onProgress({ step: `${iterationName}: patch`, stepStatus: "passed" });
      await copyFile(previewPath, path.join(iterationDir, "after.tsx"));
      result.artifacts.afterTsx = relative(root, path.join(iterationDir, "after.tsx"));

      onProgress({ step: `${iterationName}: build`, stepStatus: "running" });
      await runAndRecord({
        command: buildCommand().command,
        args: buildCommand().args,
        cwd: root,
        logPath: path.join(iterationDir, "04-build.log"),
        result
      });
      onProgress({ step: `${iterationName}: build`, stepStatus: "passed" });

      onProgress({ step: `${iterationName}: validate after`, stepStatus: "running" });
      await runAndRecord({
        command: process.execPath,
        args: ["scripts/visual-compare.mjs", "--page", page],
        cwd: root,
        logPath: path.join(iterationDir, "05-validate-after.log"),
        result
      });
      onProgress({ step: `${iterationName}: validate after`, stepStatus: "passed" });
      await copyValidationArtifacts({
        root,
        validationDir,
        iterationDir,
        screenshotName: "after.png",
        reportName: "report-after.md"
      });
      result.artifacts.afterScreenshot = relative(root, path.join(iterationDir, "after.png"));
      result.artifacts.result = relative(root, path.join(iterationDir, "result.json"));
      result.status = "passed";
    } catch (error) {
      result.status = "failed";
      result.error = error instanceof Error ? error.message : String(error);
      result.artifacts.result = relative(root, path.join(iterationDir, "result.json"));
      await writeResult(iterationDir, result);
      results.push(result);
      throw error;
    }

    result.finishedAt = new Date().toISOString();
    await writeResult(iterationDir, result);
    results.push(result);
  }

  return {
    page,
    status: "passed",
    iterations: results
  };
}

async function runAndRecord({ args, command, cwd, logPath, result }) {
  const startedAt = new Date().toISOString();

  try {
    const output = await runCommand(command, args, { cwd });
    await writeFile(logPath, output.combined);
    result.commands.push({
      command,
      args,
      exitCode: output.exitCode,
      log: relative(cwd, logPath),
      startedAt,
      finishedAt: new Date().toISOString()
    });
  } catch (error) {
    const combined = error?.combined ?? String(error);
    await writeFile(logPath, combined);
    result.commands.push({
      command,
      args,
      exitCode: error?.exitCode ?? 1,
      log: relative(cwd, logPath),
      startedAt,
      finishedAt: new Date().toISOString()
    });
    throw error;
  }
}

function runCommand(command, args, { cwd }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      shell: false
    });
    let combined = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      combined += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      combined += text;
      process.stderr.write(text);
    });

    child.on("error", reject);
    child.on("close", (exitCode) => {
      if (exitCode === 0) {
        resolve({ combined, exitCode });
        return;
      }

      const error = new Error(`${command} ${args.join(" ")} failed with exit code ${exitCode}`);
      error.combined = combined;
      error.exitCode = exitCode;
      reject(error);
    });
  });
}

async function copyValidationArtifacts({ iterationDir, reportName, screenshotName, validationDir }) {
  await copyFile(path.join(validationDir, "generated-preview.png"), path.join(iterationDir, screenshotName));
  await copyFile(path.join(validationDir, "report.md"), path.join(iterationDir, reportName));
}

async function nextIterationNumber(iterationsDir) {
  let entries = [];

  try {
    entries = await readdir(iterationsDir);
  } catch (error) {
    if (!error || error.code !== "ENOENT") {
      throw error;
    }
  }

  const numbers = entries
    .map((entry) => entry.match(/^iteration-(\d+)$/)?.[1])
    .filter(Boolean)
    .map((value) => Number(value));

  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

async function writeResult(iterationDir, result) {
  await writeFile(path.join(iterationDir, "result.json"), `${JSON.stringify(result, null, 2)}\n`);
}

async function assertDirectory(directoryPath) {
  const directoryStats = await stat(directoryPath);

  if (!directoryStats.isDirectory()) {
    throw new Error(`Expected directory: ${directoryPath}`);
  }
}

async function assertFile(filePath) {
  const fileStats = await stat(filePath);

  if (!fileStats.isFile()) {
    throw new Error(`Expected file: ${filePath}`);
  }
}

function compact(values) {
  return values.filter(Boolean);
}

function buildCommand() {
  if (process.platform === "win32") {
    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", "npm --prefix preview run build"]
    };
  }

  return {
    command: "npm",
    args: ["--prefix", "preview", "run", "build"]
  };
}

function relative(root, filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}
