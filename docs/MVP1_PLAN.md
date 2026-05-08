# MVP1 Development Plan

## Goal

Build a local command-line page recreation MVP:

1. Input one screenshot.
2. Produce a structured `analysis.json`.
3. Generate a React + Tailwind page.
4. Preview it locally.
5. Keep generated output editable by a developer.

## Scope

MVP1 includes:

- Single screenshot input.
- Single page output.
- Local file storage.
- React + Tailwind preview.
- Basic CLI flow.

MVP1 excludes:

- Web studio UI.
- Multi-round edits.
- Component library extraction.
- Real project export.
- OpenClaw integration.
- Figma API.
- Automated visual scoring.

## Progress Overview

| Step | Name | Status | Output |
| --- | --- | --- | --- |
| 1 | Project skeleton | Done | Root package, base folders, prompt placeholders, check scripts |
| 2 | React + Tailwind preview app | Done | Vite preview app at `preview/`, local preview on port `5174` |
| 3 | CLI base commands | Done | CLI entry, image input handling, generated page folder |
| 4 | Page analysis prompt and `analysis.json` | Done | Stable analysis schema and generated analysis file |
| 4B | Automatic vision analysis | Done | `analyze:auto` command using OpenAI Responses API |
| 4C | Layout positioning | Done | Page layout columns and section position metadata |
| 4D | Visual validation report | Done | Playwright screenshot capture and local comparison report |
| 5 | Generate React page from `analysis.json` | Done | `page.tsx` and synced preview page |
| 5B | AI page rendering | Done | `render:ai` command that generates TSX from `analysis.json` |
| 5C | AI visual feedback | Done | `feedback:ai` compares source and generated screenshots |
| 5D | AI page patch | Done | `patch:ai` updates TSX from visual feedback |
| 5E | Optimization workflow | Done | `optimize:ai` orchestrates validation, feedback, patching, build, and iteration logs |
| 5F | Iteration accept/reject | Done | `iteration:accept` and `iteration:reject` commands |
| 6A | Local Web Studio | Done | `studio:dev` UI for existing pages and A/B/C iteration actions |
| 6B | Upload and generate entry | Done | Studio can upload a screenshot, create a task, and run generation workflow |
| 6 | Local preview and MVP1 handoff | Done | Full screenshot-to-preview flow and README for generated result |

## Step 1: Project Skeleton

### Objective

Create the base project structure and scripts.

### Planned Work

- Create root `package.json`.
- Create `input/`, `generated/`, `prompts/`, `preview/`, and `scripts/`.
- Add prompt placeholders.
- Add a basic project check script.

### Output

```text
package.json
input/
generated/
prompts/
  analyze-page.md
  generate-page.md
preview/
scripts/
  check.mjs
  status.mjs
```

### Acceptance Criteria

- `npm run check` passes.
- The repository has a clear MVP1 skeleton.

### Current Result

Done.

Commit:

```text
4d43afd Initialize MVP1 project skeleton
```

## Step 2: React + Tailwind Preview App

### Objective

Create a local preview app that can render generated pages.

### Planned Work

- Set up Vite + React in `preview/`.
- Configure Tailwind CSS.
- Create `preview/src/generated/Page.tsx` as the generated page slot.
- Let `preview/src/App.tsx` render the generated page.
- Add root preview scripts.

### Output

```text
preview/
  index.html
  package.json
  vite.config.ts
  tailwind.config.js
  postcss.config.js
  src/
    App.tsx
    main.tsx
    index.css
    generated/
      Page.tsx
```

### Acceptance Criteria

- `npm run preview:build` passes.
- `npm run preview:dev` starts the preview app.
- The preview app is available at `http://127.0.0.1:5174/`.
- Tailwind styles are visible in the placeholder page.

### Current Result

Done.

Commit:

```text
1212f4a Add React Tailwind preview app
```

Notes:

- Port `5173` is already used by the existing Xiaolongxia backend, so Page Mimic uses port `5174`.

## Step 3: CLI Base Commands

### Objective

Create the command-line entry for MVP1 generation tasks.

### Planned Work

- Add a CLI entry file.
- Add command modules.
- Support a `check` command.
- Support a `generate` placeholder command.
- Read an image path such as `input/screenshot.png`.
- Create a generated page directory such as `generated/page-001/`.
- Copy the source screenshot into the generated directory.
- Create basic `metadata.json`.

### Expected Output

```text
src/
  cli.ts
  commands/
    check.ts
    generate.ts
generated/
  page-001/
    screenshot.png
    metadata.json
```

### Acceptance Criteria

- The CLI can run from the root project.
- The CLI validates that an image path exists.
- The CLI creates a stable generated page folder.
- The generated folder contains the copied screenshot and metadata.

### Current Result

Done.

Commit:

```text
a841630 Add CLI base generation command
```

Verification:

```bash
npm run cli -- check
npm run generate -- --image input/screenshot.png
```

## Step 4: Page Analysis Prompt And `analysis.json`

### Objective

Stabilize the screenshot analysis output as structured data.

### Planned Work

- Complete `prompts/analyze-page.md`.
- Define the minimal `analysis.json` schema.
- Add CLI support for writing `analysis.json`.
- Keep the first implementation simple enough to support manual or model-provided analysis.

### Expected Output

```text
generated/
  page-001/
    analysis.json
prompts/
  analyze-page.md
examples/
  page-analysis.example.json
```

### Minimal Schema

```json
{
  "pageType": "landing-page",
  "sections": [],
  "theme": {
    "colors": [],
    "fontStyle": "",
    "spacing": "",
    "radius": ""
  }
}
```

### Acceptance Criteria

- Each generation task has an `analysis.json`.
- The schema is stable enough for page generation.
- Later steps can depend on this file.

### Current Result

Done.

Important clarification:

- Step 4 currently implements the `analysis.json` schema, template output, import command, and validation.
- It does not automatically inspect the screenshot yet.
- `examples/page-analysis.example.json` is demo data used to verify the file flow.
- Layout values, theme colors, spacing, and typography in that example are manually authored placeholders, not extracted from `screenshot.png`.
- Automatic visual analysis should be added later as a separate Step 4B after the schema and page generation loop are stable.

Commit:

```text
4027983 Add page analysis command
```

Verification:

```bash
npm run analyze -- --page page-002 --analysis examples/page-analysis.example.json
npm run analyze -- --page page-002 --template
```

Notes:

- `page-001` was created with a tiny CLI smoke-test image.
- `page-002` was created from the user's real screenshot and is the current Step 4 verification target.
- The current Step 4 verification proves that analysis data can be written and validated for `page-002`; it does not prove that the system can visually understand `page-002` yet.

## Step 4B: Automatic Vision Analysis

### Objective

Generate `analysis.json` directly from `screenshot.png` using a multimodal model.

### Planned Work

- Add an `analyze:auto` CLI command.
- Read the screenshot path from `metadata.json`.
- Send the screenshot and `prompts/analyze-page.md` to a vision-capable model.
- Request structured JSON that matches the page analysis schema.
- Validate the returned JSON before writing it to `generated/<page-id>/analysis.json`.
- Keep the command optional so MVP1 still works without an API key.

### Output

```text
src/commands/analyze-auto.mjs
src/lib/openai-vision-analysis.mjs
src/lib/page-analysis-json-schema.mjs
.env.example
```

### Acceptance Criteria

- `npm run analyze:auto -- --page page-002 --dry-run` validates local inputs without sending an API request.
- Missing `OPENAI_API_KEY` fails with a clear error.
- With `OPENAI_API_KEY`, the command can call the OpenAI Responses API and write a validated `analysis.json`.

### Current Result

Implemented, API run pending.

Commit:

```text
e60f01c Add automatic vision analysis command
```

Verification completed:

```bash
npm run analyze:auto -- --page page-002 --dry-run
npm run cli -- check
npm run preview:build
```

Pending verification:

```bash
npm run analyze:auto -- --page page-002
```

Notes:

- The command uses the OpenAI Responses API with image input and structured JSON output.
- The default model is configured by `PAGE_MIMIC_OPENAI_MODEL`, with `gpt-4.1-mini` as the current local default.
- `.env` is loaded automatically from the repository root and is not committed.
- `OPENAI_BASE_URL` can point to a compatible API endpoint. The default is `https://api.openai.com/v1`.
- The default can be changed without code edits.

## Step 4C: Layout Positioning

### Objective

Capture page-level layout and section-level placement so the generated page can better match screenshot structure.

### Current Result

Done.

Output:

```text
analysis.layout
section.position
```

Verification:

```bash
npm run analyze:auto -- --page page-002
npm run render -- --page page-002
npm run preview:build
```

Notes:

- The current dashboard analysis includes columns like `260px / 1fr / 320px`.
- Sections now identify regions such as `left`, `top`, `main`, and `right`.

## Step 4D: Visual Validation Report

### Objective

Capture the generated preview as an image and place it next to the original screenshot for manual review.

### Current Result

Done.

Output:

```text
scripts/visual-compare.mjs
validation/page-002/report.md
validation/page-002/source-screenshot.png
validation/page-002/generated-preview.png
```

Verification:

```bash
npm run validate:visual -- --page page-002
```

Notes:

- `validation/` is local-only and ignored by git.
- The current report captured 0 console errors.
- This is a manual comparison report, not a pixel-level similarity score.

## Step 5: Generate React Page From `analysis.json`

### Objective

Turn structured page analysis into a runnable React page.

### Planned Work

- Complete `prompts/generate-page.md`.
- Generate `generated/page-001/page.tsx`.
- Sync the generated page to `preview/src/generated/Page.tsx`.
- Ensure the preview project still builds.

### Expected Output

```text
generated/
  page-001/
    page.tsx
preview/
  src/
    generated/
      Page.tsx
```

### Acceptance Criteria

- The generated page renders inside the preview app.
- No React, TypeScript, or Vite runtime errors.
- The layout reflects the structure in `analysis.json`.

### Current Result

Done.

Commit:

```text
9f011b1 Add analysis based page renderer
```

Verification:

```bash
npm run render -- --page page-002
npm run preview:build
```

Notes:

- This step proves that a valid `analysis.json` can be converted into runnable React + Tailwind code.
- The current `page-002` render is based on the demo analysis JSON, not automatic visual extraction from the screenshot.
- The generated page is synced to `preview/src/generated/Page.tsx` for local preview.

## Step 6: Local Preview And MVP1 Handoff

### Objective

Complete the MVP1 screenshot-to-preview loop.

### Planned Work

- Start the preview app.
- Confirm the generated page is visible.
- Save a generated result README.
- Document the full MVP1 usage flow.

### Expected Output

```text
generated/page-001/
  screenshot.png
  metadata.json
  analysis.json
  page.tsx
  README.md
```

### Acceptance Criteria

- One screenshot can produce one previewable page.
- The result is easy to inspect and manually edit.
- A developer can rerun the flow from documented commands.

### Current Result

Done.

Commit:

```text
b6d23fc Add MVP1 handoff documentation
```

Verification:

```bash
npm run preview:build
npm run preview:check
npm run mvp1:status
```

Handoff:

- `docs/MVP1_HANDOFF.md`
- `docs/MVP1_HANDOFF.zh-CN.md`
- `generated/page-002/README.md`

## Step 5B: AI Page Rendering

### Objective

Let a code model generate runnable React + Tailwind TSX from the visual analysis file.

### Current Result

Done.

Verification:

```bash
npm run render:ai -- --page page-002
npm run preview:build
npm run preview:check
npm run validate:visual -- --page page-002
```

Outputs:

```text
generated/page-002/page.tsx
preview/src/generated/Page.tsx
validation/page-002/report.md
```

Notes:

- `render:ai` reads `generated/<page>/analysis.json`.
- `prompts/generate-page.md` now instructs the model to generate TSX only.
- Local generated artifacts remain ignored by git.
- The next useful step is an automatic visual feedback loop that compares source and preview screenshots.

## Step 5C: AI Visual Feedback

### Objective

Use a vision model to compare the source screenshot and generated preview screenshot, then produce actionable patch guidance.

### Current Result

Done.

Verification:

```bash
npm run feedback:ai -- --page page-002 --dry-run
npm run feedback:ai -- --page page-002
npm run preview:build
```

Outputs:

```text
validation/page-002/ai-feedback.md
```

Notes:

- This step reads the visual validation artifacts from `validation/<page>/`.
- It does not automatically modify TSX.
- The next step should use this feedback as controlled input for one page patch.

## Step 5D: AI Page Patch

### Objective

Apply one controlled TSX patch from `ai-feedback.md` and the current generated page.

### Current Result

Done.

Verification:

```bash
npm run patch:ai -- --page page-002 --dry-run
npm run patch:ai -- --page page-002
npm run preview:build
npm run preview:check
npm run validate:visual -- --page page-002
```

Outputs:

```text
preview/src/generated/Page.tsx
generated/page-002/page.tsx
generated/page-002/patches/before-*.tsx
validation/page-002/report.md
```

Notes:

- `patch:ai` backs up the previous TSX before writing the new version.
- This is a single-patch loop, not a fully automated multi-iteration agent yet.
- The next step should record patch iterations so multi-round edits remain traceable.

## Step 5E: Optimization Workflow

### Objective

Wrap the individual commands into a workflow function that can later be called by a product backend or Web UI.

### Current Result

Done.

Verification:

```bash
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面" --dry-run
npm run optimize:ai -- --page page-002 --max-rounds 1 --note "页面应该左右结构，撑满页面"
npm run preview:build
```

Outputs:

```text
validation/page-002/iterations/iteration-*/
  before.png
  after.png
  feedback.md
  note.txt
  before.tsx
  after.tsx
  report-before.md
  report-after.md
  01-validate-before.log
  02-feedback.log
  03-patch.log
  04-build.log
  05-validate-after.log
  result.json
```

Notes:

- CLI is now a test entry for `optimizePageWorkflow()`.
- The workflow accepts a human `--note` for structural corrections.
- Iteration artifacts are local and ignored by git.
- The next step should add accept/reject commands for iteration results.

## Step 5F: Iteration Accept / Reject

### Objective

Turn manual A/B/C decisions into product-style commands.

### Current Result

Done.

Verification:

```bash
npm run iteration:accept -- --page page-002 --iteration 2 --dry-run
npm run iteration:reject -- --page page-002 --iteration 2 --dry-run
```

Behavior:

- `iteration:accept` syncs `after.tsx` to the current generated page.
- `iteration:reject` syncs `before.tsx` to the current generated page.
- Both commands write `decision.json` inside the iteration folder.
- Both commands support `--note` and `--dry-run`.

Decision mapping:

```text
A Accept -> iteration:accept
B Continue optimizing -> optimize:ai
C Roll back -> iteration:reject
```

Notes:

- CLI remains a temporary test entry.
- The next phase should expose these workflow operations through a local Web UI.

## Step 6A: Local Web Studio

### Objective

Expose the existing workflow operations through a local product-style UI.

### Current Result

Done.

Run:

```bash
npm run studio:dev
```

Open:

```text
http://127.0.0.1:5180/
```

Current UI:

- Page task selector.
- Upload screenshot and generate page.
- Preview link.
- Source and generated screenshot viewer.
- Iteration history.
- A accept, B continue optimizing, C reject controls.
- Human note input for the next optimization round.

Current API:

```text
GET  /api/pages
POST /api/pages
GET  /api/pages/:pageId
POST /api/pages/:pageId/generate
POST /api/pages/:pageId/optimize
POST /api/pages/:pageId/iterations/:iteration/accept
POST /api/pages/:pageId/iterations/:iteration/reject
GET  /artifacts/*
```

Verification:

```bash
npm run studio:dev
Invoke-WebRequest http://127.0.0.1:5180/api/pages/page-002
```

Notes:

- Studio can now create new page tasks from uploaded screenshots.
- Upload generation is currently a long request.
- The next step should improve progress reporting for long generation requests.

## Step 6B: Upload And Generate Entry

### Objective

Let Studio create a new page task from an uploaded screenshot and run the existing generation workflow.

### Current Result

Done.

New workflows:

```text
src/workflows/create-page-workflow.mjs
src/workflows/generate-page-workflow.mjs
```

UI flow:

```text
Choose screenshot -> Upload and generate page
```

Backend flow:

```text
save uploaded image
create generated/page-xxx
analyze:auto
render:ai
preview:build
validate:visual
refresh Studio state
```

Verification:

```bash
node -e "import('./src/workflows/create-page-workflow.mjs')"
node -e "import('./src/workflows/generate-page-workflow.mjs')"
```

## Update Rule

After each step:

1. Update the progress table.
2. Add the commit hash.
3. Record verification commands.
4. Mark the next step clearly.
5. Wait for confirmation before starting the next step.
