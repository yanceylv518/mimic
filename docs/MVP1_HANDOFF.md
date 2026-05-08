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
npm run patch:ai -- --page page-002
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
npm run iteration:accept -- --page page-002 --iteration 2
npm run iteration:reject -- --page page-002 --iteration 2
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

Apply one AI patch and revalidate:

```bash
npm run patch:ai -- --page page-002
npm run preview:build
npm run validate:visual -- --page page-002
```

Run one product-style optimization workflow:

```bash
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
```

Iteration artifacts:

```text
validation/page-002/iterations/iteration-*/
```

Accept or reject an iteration:

```bash
npm run iteration:accept -- --page page-002 --iteration 2 --note "Accepted by human review"
npm run iteration:reject -- --page page-002 --iteration 2 --note "Rejected by human review"
```

## What MVP1 Proves

- A screenshot can be registered as a generated page task.
- Each page task can store screenshot, metadata, analysis, and generated code.
- `analysis.json` can be validated and used as the input for React page generation.
- Generated React + Tailwind code can be synced into the preview app.
- A code model can generate TSX from `analysis.json` with `render:ai`.
- A vision model can compare source and preview screenshots with `feedback:ai`.
- A code model can apply one controlled TSX patch with `patch:ai`.
- A workflow function can orchestrate one optimization round with `optimize:ai`.
- Iteration results can be accepted or rejected with explicit decision records.
- The preview app builds and runs locally.

## Important Limitation

MVP1 is now a working local loop, but it is not a pixel-level recreation system yet.

The current visual validation report is still a manual comparison aid. It captures the source screenshot, generated preview screenshot, console errors, and a checklist, but it does not score similarity automatically.

AI patching is intentionally single-step. It applies one controlled TSX rewrite, then the developer should build and validate before running another iteration.

Optimization workflows are recorded locally. Accept/reject commands now sync the chosen TSX and write `decision.json`.

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

1. Start Step 6A: local Web UI for upload, preview, optimize, accept, reject, and history.
2. Improve the generation prompt for better dashboard spacing, table density, and sidebar fidelity.
3. Start MVP2: real project export and reusable component extraction.
