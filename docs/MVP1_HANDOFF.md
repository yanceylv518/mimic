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
npm run preview:build
npm run preview:dev
```

Then open:

```text
http://127.0.0.1:5174/
```

Check the running preview:

```bash
npm run preview:check
```

## What MVP1 Proves

- A screenshot can be registered as a generated page task.
- Each page task can store screenshot, metadata, analysis, and generated code.
- `analysis.json` can be validated and used as the input for React page generation.
- Generated React + Tailwind code can be synced into the preview app.
- The preview app builds and runs locally.

## Important Limitation

MVP1 does not automatically understand the screenshot yet.

The current `analysis.json` for `page-002` comes from:

```text
examples/page-analysis.example.json
```

That file is demo analysis data. Its layout, colors, spacing, and typography are manually authored placeholders.

Step 4B now adds an optional automatic visual analysis command. It is implemented, but a real API run still requires `OPENAI_API_KEY`.

## Step 4B: Automatic Visual Analysis

Dry run:

```bash
npm run analyze:auto -- --page page-002 --dry-run
```

Real API run:

```powershell
$env:OPENAI_API_KEY="..."
npm run analyze:auto -- --page page-002
```

Optional model override:

```powershell
$env:PAGE_MIMIC_OPENAI_MODEL="gpt-4.1-mini"
```

## Next Recommended Work

Before moving to MVP2, choose one of these:

1. Run Step 4B with a real API key and inspect the generated `analysis.json`.
2. Improve Step 5: make the rule-based renderer produce richer pages from the current schema.
3. Start MVP2: build a local web studio UI around the existing CLI flow.
