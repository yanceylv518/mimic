import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeAutoCommand } from "../commands/analyze-auto.mjs";
import { renderAiCommand } from "../commands/render-ai.mjs";

export async function generatePageWorkflow({
  cwd = process.cwd(),
  debug = false,
  dryRun = false,
  model,
  onProgress = () => {},
  page
}) {
  if (!page) {
    throw new Error("Missing required workflow option: page");
  }

  if (dryRun) {
    await analyzeAutoCommand(compact(["--page", page, model ? "--model" : "", model ?? "", "--dry-run"]));
    await renderAiCommand(compact(["--page", page, model ? "--model" : "", model ?? "", "--dry-run"]));
    console.log("Generate workflow dry run passed.");
    return {
      dryRun: true,
      page
    };
  }

  const root = cwd;
  const workflowDir = path.join(root, "validation", page, "generate");
  await mkdir(workflowDir, { recursive: true });

  const result = {
    page,
    startedAt: new Date().toISOString(),
    status: "running",
    steps: []
  };

  try {
    await runStep(result, "analyze:auto", onProgress, async () => {
      await analyzeAutoCommand(compact(["--page", page, model ? "--model" : "", model ?? "", debug ? "--debug" : ""]));
    });

    await runStep(result, "render:ai", onProgress, async () => {
      await renderAiCommand(compact(["--page", page, model ? "--model" : "", model ?? "", debug ? "--debug" : ""]));
    });

    await runStep(result, "preview:build", onProgress, async () => {
      await runCommand(buildCommand().command, buildCommand().args, { cwd: root });
    });

    await runStep(result, "validate:visual", onProgress, async () => {
      await runCommand(process.execPath, ["scripts/visual-compare.mjs", "--page", page], { cwd: root });
    });

    result.status = "passed";
  } catch (error) {
    result.status = "failed";
    result.error = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    result.finishedAt = new Date().toISOString();
    await writeFile(path.join(workflowDir, "result.json"), `${JSON.stringify(result, null, 2)}\n`);
  }

  return result;
}

async function runStep(result, name, onProgress, task) {
  const step = {
    finishedAt: null,
    name,
    startedAt: new Date().toISOString(),
    status: "running"
  };
  result.steps.push(step);
  onProgress({
    step: name,
    stepStatus: "running"
  });

  try {
    await task();
    step.status = "passed";
    onProgress({
      step: name,
      stepStatus: "passed"
    });
  } catch (error) {
    step.status = "failed";
    step.error = error instanceof Error ? error.message : String(error);
    onProgress({
      error: step.error,
      step: name,
      stepStatus: "failed"
    });
    throw error;
  } finally {
    step.finishedAt = new Date().toISOString();
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

      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${exitCode}`));
    });
  });
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

function compact(values) {
  return values.filter(Boolean);
}
