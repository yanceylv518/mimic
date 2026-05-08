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
| 5 | Generate React page from `analysis.json` | Next | `page.tsx` and synced preview page |
| 6 | Local preview and MVP1 handoff | Pending | Full screenshot-to-preview flow and README for generated result |

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
b068ee3 Add CLI base generation command
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

Commit:

```text
d26f80a Add page analysis command
```

Verification:

```bash
npm run analyze -- --page page-002 --analysis examples/page-analysis.example.json
npm run analyze -- --page page-002 --template
```

Notes:

- `page-001` was created with a tiny CLI smoke-test image.
- `page-002` was created from the user's real screenshot and is the current Step 4 verification target.

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

Next.

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

Pending.

## Update Rule

After each step:

1. Update the progress table.
2. Add the commit hash.
3. Record verification commands.
4. Mark the next step clearly.
5. Wait for confirmation before starting the next step.
