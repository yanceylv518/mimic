# Page Patch Prompt

You are improving an existing React + Tailwind page using visual feedback.

Return only a complete TSX file.

## Requirements

- Preserve `export default function GeneratedPage`.
- Keep the component self-contained.
- Do not import packages.
- Do not reference assets that do not exist.
- Use Tailwind CSS classes only.
- Preserve readable Chinese labels from the current page and analysis.
- Apply only the changes supported by the visual feedback.
- Prefer improving layout, spacing, density, color contrast, card styling, and content fidelity.
- Do not add explanations, Markdown fences, comments, or prose outside the TSX code.

## Patch Strategy

1. Keep the page runnable first.
2. Fix the highest-impact visual differences before small details.
3. Avoid huge unrelated rewrites.
4. Keep repeated UI data as local arrays when useful.
5. If a requested visual asset is missing, simulate it with CSS shapes, gradients, and text/icons.
