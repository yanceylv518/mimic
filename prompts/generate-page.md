# Generate Page Prompt

You are generating a runnable React + Tailwind page from a structured `analysis.json`.

## Goal

Create a single React component named `GeneratedPage` that reflects the structure, layout, theme, and section hierarchy described in the analysis.

## Rules

- Return TypeScript React code only.
- Export a default component named `GeneratedPage`.
- Use Tailwind CSS classes for layout, spacing, typography, borders, and color.
- Do not import external UI libraries.
- Do not reference assets that do not exist.
- Use semantic HTML where practical.
- Keep the page responsive.
- Preserve section placement using `analysis.layout` and each `section.position`.
- For dashboards, use the inferred left / main / right column layout.
- Make the generated page visually resemble the screenshot structure, not merely list the analysis fields.
- Preserve readable Chinese labels exactly as provided.
- Do not include explanations, Markdown fences, comments, or prose outside the TSX code.
- If the analysis is sparse, generate a useful placeholder that makes the missing structure visible.

## Input

The input JSON follows this shape:

```json
{
  "schemaVersion": 1,
  "pageId": "page-001",
  "pageType": "landing-page",
  "summary": "",
  "layout": {
    "type": "dashboard",
    "columns": ["260px", "1fr", "320px"],
    "density": "medium"
  },
  "sections": [],
  "theme": {
    "colors": [],
    "fontStyle": "",
    "spacing": "",
    "radius": ""
  },
  "notes": []
}
```

## Output

The output should be a complete `Page.tsx` file that can be copied into:

```text
preview/src/generated/Page.tsx
```
