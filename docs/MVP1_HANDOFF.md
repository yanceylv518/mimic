# MVP1 Handoff

MVP1 is a local-first screenshot-to-preview workflow. It proves the project can create a page task, attach analysis data, generate React + Tailwind code, and preview the result locally.

## Current Verified Page

The current verified task is:

```text
generated/page-002/
```

It contains:

```text
screenshot.png
metadata.json
analysis.json
page.tsx
README.md
```

`page-001` was only a tiny smoke-test image. `page-002` is the user-provided screenshot task.

## Run The MVP1 Flow

From the repository root:

```bash
npm run cli -- check
npm run generate -- --image input/screenshot.png
npm run analyze -- --page page-002 --analysis examples/page-analysis.example.json
npm run render -- --page page-002
npm run render:ai -- --page page-002
npm run preview:build
npm run preview:dev
npm run validate:visual -- --page page-002
npm run feedback:ai -- --page page-002
```

Then open:

```text
http://127.0.0.1:5174/
```

Check the running preview:

```bash
npm run preview:check
```

Create visual validation and AI feedback:

```bash
npm run validate:visual -- --page page-002
npm run feedback:ai -- --page page-002
```

## What MVP1 Proves

- A screenshot can be registered as a generated page task.
- Each page task can store screenshot, metadata, analysis, and generated code.
- `analysis.json` can be validated and used as the input for React page generation.
- Generated React + Tailwind code can be synced into the preview app.
- A code model can generate TSX from `analysis.json` with `render:ai`.
- A vision model can compare source and preview screenshots with `feedback:ai`.
- The preview app builds and runs locally.

## Important Limitation

MVP1 is now a working local loop, but it is not a pixel-level recreation system yet.

The current visual validation report is still a manual comparison aid. It captures the source screenshot, generated preview screenshot, console errors, and a checklist, but it does not score similarity automatically.

AI visual feedback is advisory only. It writes concrete differences and recommended fixes, but it does not apply code changes yet.

## Step 4B: Automatic Visual Analysis

Dry run:

```bash
npm run analyze:auto -- --page page-002 --dry-run
```

Real API run:

```bash
npm run analyze:auto -- --page page-002
```

Fill local `.env` first:

```text
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
PAGE_MIMIC_OPENAI_MODEL=gpt-4.1-mini
```

## Next Recommended Work

Before moving to MVP2, choose one of these:

1. Add Step 5D: apply one controlled TSX patch from `ai-feedback.md`.
2. Improve the generation prompt for better dashboard spacing, table density, and sidebar fidelity.
3. Start MVP2: build a local web studio UI around the existing CLI flow.
