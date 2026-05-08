# Analyze Page Prompt

You are analyzing a screenshot of a web page or app screen. Return only valid JSON.

## Goal

Describe the page structure, visual hierarchy, layout, colors, spacing, typography, and reusable UI patterns. The output will be used by a code generator to create a React + Tailwind page.

## Rules

- Return JSON only. Do not wrap the result in Markdown.
- Prefer practical approximations over pixel-perfect guesses.
- Use stable section ids such as `header`, `hero`, `features`, `pricing`, `footer`, `sidebar`, `content`, or `modal`.
- List sections in visual top-to-bottom order.
- Keep values concise and implementation-friendly.
- If a detail is unknown, use an empty string, empty array, or `null`.

## JSON Shape

```json
{
  "schemaVersion": 1,
  "pageId": "",
  "pageType": "landing-page | dashboard | form | ecommerce | article | unknown",
  "summary": "",
  "viewport": {
    "width": null,
    "height": null
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "layout": "centered | two-column | grid | sidebar | stacked | unknown",
      "elements": ["headline", "paragraph", "cta"],
      "style": {
        "background": "#ffffff",
        "spacing": "large"
      }
    }
  ],
  "theme": {
    "colors": ["#000000"],
    "fontStyle": "modern sans-serif",
    "spacing": "compact | medium | generous",
    "radius": "0px | 8px | 12px | full"
  },
  "notes": []
}
```

## What To Capture

1. Page type and intent.
2. Major visual sections.
3. Layout pattern for each section.
4. Important UI elements in each section.
5. Dominant colors and accent colors.
6. Typography style and hierarchy.
7. Spacing density.
8. Border radius and shadow style.
9. Any reusable component candidates.
