const url = process.env.PAGE_MIMIC_PREVIEW_URL ?? "http://127.0.0.1:5174/";

try {
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Preview check failed: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const html = await response.text();

  if (!html.includes("root")) {
    console.error("Preview check failed: response does not look like the preview app.");
    process.exit(1);
  }

  console.log(`Preview check passed: ${url}`);
} catch (error) {
  console.error(
    `Preview check failed: ${error instanceof Error ? error.message : String(error)}`
  );
  console.error("Start the preview app with: npm run preview:dev");
  process.exit(1);
}
