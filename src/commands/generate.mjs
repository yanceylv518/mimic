import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);

export async function generateCommand(args) {
  const options = parseArgs(args);
  const imageInput = options.image;

  if (!imageInput) {
    throw new Error("Missing required option: --image <path>");
  }

  const root = process.cwd();
  const imagePath = path.resolve(root, imageInput);
  const imageStats = await readImageStats(imagePath);
  const pageId = options.pageId ?? (await nextPageId(path.join(root, "generated")));
  const outputDir = path.join(root, "generated", pageId);

  await mkdir(outputDir, { recursive: true });

  const screenshotName = `screenshot${path.extname(imagePath).toLowerCase()}`;
  const screenshotPath = path.join(outputDir, screenshotName);
  await copyFile(imagePath, screenshotPath);

  const metadata = {
    pageId,
    sourceImage: path.relative(root, imagePath).replaceAll("\\", "/"),
    screenshot: path.relative(root, screenshotPath).replaceAll("\\", "/"),
    imageSizeBytes: imageStats.size,
    createdAt: new Date().toISOString(),
    status: "created",
    step: "mvp1-step-3"
  };

  const metadataPath = path.join(outputDir, "metadata.json");
  await writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);

  console.log(`Generated page folder created: ${path.relative(root, outputDir)}`);
  console.log(`- Screenshot: ${metadata.screenshot}`);
  console.log(`- Metadata: ${path.relative(root, metadataPath).replaceAll("\\", "/")}`);
}

function parseArgs(args) {
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === "--image") {
      options.image = next;
      index += 1;
      continue;
    }

    if (arg === "--page-id") {
      options.pageId = next;
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

async function readImageStats(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();

  if (!imageExtensions.has(extension)) {
    throw new Error(
      `Unsupported image extension "${extension}". Use one of: ${Array.from(imageExtensions).join(", ")}`
    );
  }

  try {
    const imageStats = await stat(imagePath);

    if (!imageStats.isFile()) {
      throw new Error(`Image path is not a file: ${imagePath}`);
    }

    return imageStats;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`Image file does not exist: ${imagePath}`);
    }

    throw error;
  }
}

async function nextPageId(generatedDir) {
  await mkdir(generatedDir, { recursive: true });
  const entries = await readdir(generatedDir, { withFileTypes: true });
  const pageNumbers = entries
    .filter((entry) => entry.isDirectory() && /^page-\d+$/.test(entry.name))
    .map((entry) => Number(entry.name.replace("page-", "")))
    .filter(Number.isFinite);

  const nextNumber = pageNumbers.length > 0 ? Math.max(...pageNumbers) + 1 : 1;
  return `page-${String(nextNumber).padStart(3, "0")}`;
}
