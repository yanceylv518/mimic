import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);

export async function createPageFromImageWorkflow({
  cwd = process.cwd(),
  imagePath,
  pageId
}) {
  if (!imagePath) {
    throw new Error("Missing required workflow option: imagePath");
  }

  const root = cwd;
  const sourcePath = path.resolve(root, imagePath);
  const imageStats = await readImageStats(sourcePath);
  const nextPageId = pageId ?? (await createNextPageId(path.join(root, "generated")));
  const outputDir = path.join(root, "generated", nextPageId);

  await mkdir(outputDir, { recursive: true });

  const screenshotName = `screenshot${path.extname(sourcePath).toLowerCase()}`;
  const screenshotPath = path.join(outputDir, screenshotName);
  await copyFile(sourcePath, screenshotPath);

  const metadata = {
    pageId: nextPageId,
    sourceImage: relative(root, sourcePath),
    screenshot: relative(root, screenshotPath),
    imageSizeBytes: imageStats.size,
    createdAt: new Date().toISOString(),
    status: "created",
    step: "mvp1-step-6b"
  };

  const metadataPath = path.join(outputDir, "metadata.json");
  await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);

  return {
    metadata,
    metadataPath: relative(root, metadataPath),
    pageDir: relative(root, outputDir),
    pageId: nextPageId,
    screenshot: metadata.screenshot
  };
}

export async function saveUploadedImageWorkflow({
  cwd = process.cwd(),
  dataUrl,
  fileName
}) {
  if (!dataUrl) {
    throw new Error("Missing uploaded image data.");
  }

  const parsed = parseDataUrl(dataUrl);
  const extension = extensionFromMimeType(parsed.mimeType) ?? path.extname(fileName ?? "").toLowerCase();

  if (!imageExtensions.has(extension)) {
    throw new Error(`Unsupported upload image type: ${parsed.mimeType}`);
  }

  const uploadsDir = path.join(cwd, "input", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const safeBaseName = sanitizeFileBaseName(fileName ?? "screenshot");
  const uploadPath = path.join(uploadsDir, `${Date.now()}-${safeBaseName}${extension}`);
  await writeFile(uploadPath, parsed.bytes);

  return {
    imagePath: relative(cwd, uploadPath)
  };
}

async function readImageStats(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();

  if (!imageExtensions.has(extension)) {
    throw new Error(
      `Unsupported image extension "${extension}". Use one of: ${Array.from(imageExtensions).join(", ")}`
    );
  }

  const imageStats = await stat(imagePath);

  if (!imageStats.isFile()) {
    throw new Error(`Image path is not a file: ${imagePath}`);
  }

  return imageStats;
}

async function createNextPageId(generatedDir) {
  await mkdir(generatedDir, { recursive: true });
  const entries = await readdir(generatedDir, { withFileTypes: true });
  const pageNumbers = entries
    .filter((entry) => entry.isDirectory() && /^page-\d+$/.test(entry.name))
    .map((entry) => Number(entry.name.replace("page-", "")))
    .filter(Number.isFinite);

  const nextNumber = pageNumbers.length > 0 ? Math.max(...pageNumbers) + 1 : 1;
  return `page-${String(nextNumber).padStart(3, "0")}`;
}

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/);

  if (!match) {
    throw new Error("Upload must be a base64 data URL.");
  }

  return {
    bytes: Buffer.from(match[2], "base64"),
    mimeType: match[1]
  };
}

function extensionFromMimeType(mimeType) {
  const types = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp"
  };

  return types[mimeType];
}

function sanitizeFileBaseName(fileName) {
  const parsed = path.parse(fileName);
  const base = parsed.name || "screenshot";
  return base.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "screenshot";
}

function relative(root, filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}
