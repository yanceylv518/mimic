import { createReadStream } from "node:fs";
import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { loadEnvFile } from "../lib/env.mjs";
import { createPageFromImageWorkflow, saveUploadedImageWorkflow } from "../workflows/create-page-workflow.mjs";
import { generatePageWorkflow } from "../workflows/generate-page-workflow.mjs";
import { acceptIterationWorkflow, rejectIterationWorkflow } from "../workflows/iteration-decision-workflow.mjs";
import { optimizePageWorkflow } from "../workflows/optimize-page-workflow.mjs";

const root = process.cwd();
const studioDir = path.join(root, "studio");
const port = Number(process.env.PAGE_MIMIC_STUDIO_PORT ?? 5180);
const host = process.env.PAGE_MIMIC_STUDIO_HOST ?? "127.0.0.1";

export function startStudioServer() {
  const server = http.createServer(handleRequest);

  server.listen(port, host, () => {
    console.log(`Page Mimic Studio: http://${host}:${port}/`);
  });

  return server;
}

async function handleRequest(request, response) {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? `${host}:${port}`}`);

    if (url.pathname === "/api/pages") {
      if (request.method === "GET") {
        await sendJson(response, await listPages());
        return;
      }

      if (request.method === "POST") {
        const body = await readJsonBody(request);
        const upload = await saveUploadedImageWorkflow({
          dataUrl: body.dataUrl,
          fileName: body.fileName
        });
        const result = await createPageFromImageWorkflow({
          imagePath: upload.imagePath,
          pageId: body.pageId
        });
        await sendJson(response, result, 201);
        return;
      }
    }

    const generateMatch = url.pathname.match(/^\/api\/pages\/([^/]+)\/generate$/);
    if (generateMatch && request.method === "POST") {
      const body = await readJsonBody(request);
      const result = await generatePageWorkflow({
        debug: Boolean(body.debug),
        model: body.model,
        page: generateMatch[1]
      });
      await sendJson(response, result);
      return;
    }

    const pageMatch = url.pathname.match(/^\/api\/pages\/([^/]+)$/);
    if (pageMatch && request.method === "GET") {
      await sendJson(response, await getPage(pageMatch[1]));
      return;
    }

    const optimizeMatch = url.pathname.match(/^\/api\/pages\/([^/]+)\/optimize$/);
    if (optimizeMatch && request.method === "POST") {
      const body = await readJsonBody(request);
      const result = await optimizePageWorkflow({
        maxRounds: body.maxRounds ?? 1,
        note: body.note ?? "",
        page: optimizeMatch[1]
      });
      await sendJson(response, result);
      return;
    }

    const acceptMatch = url.pathname.match(/^\/api\/pages\/([^/]+)\/iterations\/([^/]+)\/accept$/);
    if (acceptMatch && request.method === "POST") {
      const body = await readJsonBody(request);
      const result = await acceptIterationWorkflow({
        iteration: acceptMatch[2],
        note: body.note ?? "",
        page: acceptMatch[1]
      });
      await sendJson(response, result);
      return;
    }

    const rejectMatch = url.pathname.match(/^\/api\/pages\/([^/]+)\/iterations\/([^/]+)\/reject$/);
    if (rejectMatch && request.method === "POST") {
      const body = await readJsonBody(request);
      const result = await rejectIterationWorkflow({
        iteration: rejectMatch[2],
        note: body.note ?? "",
        page: rejectMatch[1]
      });
      await sendJson(response, result);
      return;
    }

    if (url.pathname.startsWith("/artifacts/")) {
      await sendArtifact(url.pathname, response);
      return;
    }

    await sendStatic(url.pathname === "/" ? "/index.html" : url.pathname, response);
  } catch (error) {
    await sendJson(
      response,
      {
        error: error instanceof Error ? error.message : String(error)
      },
      500
    );
  }
}

async function listPages() {
  const generatedDir = path.join(root, "generated");
  let entries = [];

  try {
    entries = await readdir(generatedDir, { withFileTypes: true });
  } catch (error) {
    if (!error || error.code !== "ENOENT") {
      throw error;
    }
  }

  const pages = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    try {
      pages.push(await getPage(entry.name));
    } catch {
      pages.push({
        pageId: entry.name,
        status: "unreadable"
      });
    }
  }

  return {
    pages
  };
}

async function getPage(pageId) {
  const pageDir = path.join(root, "generated", pageId);
  const metadata = await readOptionalJson(path.join(pageDir, "metadata.json"));
  const analysis = await readOptionalJson(path.join(pageDir, "analysis.json"));
  const iterations = await listIterations(pageId);

  return {
    pageId,
    analysisSummary: analysis
      ? {
          layout: analysis.layout?.type ?? "unknown",
          pageType: analysis.pageType,
          sections: Array.isArray(analysis.sections) ? analysis.sections.length : 0
        }
      : null,
    artifacts: {
      generatedPreview: artifactUrl(`validation/${pageId}/generated-preview.png`),
      sourceScreenshot: artifactUrl(`validation/${pageId}/source-screenshot.png`)
    },
    iterations,
    metadata,
    previewUrl: "http://127.0.0.1:5174/",
    status: metadata?.status ?? "unknown"
  };
}

async function listIterations(pageId) {
  const iterationsDir = path.join(root, "validation", pageId, "iterations");
  let entries = [];

  try {
    entries = await readdir(iterationsDir, { withFileTypes: true });
  } catch (error) {
    if (!error || error.code !== "ENOENT") {
      throw error;
    }
  }

  const iterations = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const iterationDir = path.join(iterationsDir, entry.name);
    const result = await readOptionalJson(path.join(iterationDir, "result.json"));
    const decision = await readOptionalJson(path.join(iterationDir, "decision.json"));

    iterations.push({
      artifacts: {
        after: artifactUrl(`validation/${pageId}/iterations/${entry.name}/after.png`),
        before: artifactUrl(`validation/${pageId}/iterations/${entry.name}/before.png`),
        feedback: artifactUrl(`validation/${pageId}/iterations/${entry.name}/feedback.md`),
        result: artifactUrl(`validation/${pageId}/iterations/${entry.name}/result.json`)
      },
      canDecide: result?.status === "passed" && !decision,
      decision,
      decisionAction: decision?.action ?? null,
      iteration: entry.name,
      note: result?.note ?? null,
      status: result?.status ?? "unknown"
    });
  }

  return iterations.sort((left, right) => left.iteration.localeCompare(right.iteration));
}

async function sendStatic(pathname, response) {
  const filePath = safeResolve(studioDir, pathname);
  await sendFile(filePath, response);
}

async function sendArtifact(pathname, response) {
  const relativePath = decodeURIComponent(pathname.replace(/^\/artifacts\//, ""));
  const filePath = safeResolve(root, relativePath);
  await sendFile(filePath, response);
}

async function sendFile(filePath, response) {
  const fileStats = await stat(filePath);

  if (!fileStats.isFile()) {
    await sendJson(response, { error: "Not found" }, 404);
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentType(filePath)
  });
  createReadStream(filePath).pipe(response);
}

function safeResolve(baseDir, requestedPath) {
  const sanitizedPath = decodeURIComponent(requestedPath).replace(/^[/\\]+/, "");
  const resolved = path.resolve(baseDir, sanitizedPath);
  const base = path.resolve(baseDir);

  if (resolved !== base && !resolved.startsWith(`${base}${path.sep}`)) {
    throw new Error("Invalid path.");
  }

  return resolved;
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw ? JSON.parse(raw) : {};
}

async function readOptionalJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function sendJson(response, payload, statusCode = 200) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(`${JSON.stringify(payload, null, 2)}\n`);
}

function artifactUrl(relativePath) {
  return `/artifacts/${relativePath.split(path.sep).join("/")}`;
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".png": "image/png",
    ".tsx": "text/plain; charset=utf-8",
    ".txt": "text/plain; charset=utf-8"
  };

  return types[extension] ?? "application/octet-stream";
}

await loadEnvFile();
await mkdir(studioDir, { recursive: true });

if (import.meta.url === `file:///${process.argv[1]?.replaceAll("\\", "/")}`) {
  startStudioServer();
}
