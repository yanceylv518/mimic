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
- Preserve readable visible text in its original language. If the screenshot contains Simplified Chinese, output Simplified Chinese text directly.
- Never output mojibake or corrupted text such as garbled Chinese characters. If a visible label cannot be read confidently, describe its role in English instead of guessing corrupted text.

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
  "layout": {
    "type": "dashboard | landing-page | document | unknown",
    "columns": ["260px", "1fr", "300px"],
    "density": "compact | medium | spacious"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "title": "Visible section heading or concise inferred title",
      "description": "One sentence describing the section's visual role",
      "layout": "centered | two-column | grid | sidebar | stacked | unknown",
      "position": {
        "region": "left | top | main | right | bottom | overlay",
        "order": 1,
        "width": "260px | 300px | fluid | full",
        "height": "auto | fixed | full",
        "importance": "primary | secondary | utility",
        "density": "compact | medium | spacious"
      },
      "elements": ["visible label, component, or text fragment"],
      "style": {
        "background": "#ffffff",
        "foreground": "#000000",
        "spacing": "large",
        "radius": "12px",
        "border": "subtle | none | strong"
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
4. Important UI elements in each section, including visible labels and short text fragments when readable.
5. Dominant colors and accent colors.
6. Typography style and hierarchy.
7. Spacing density.
8. Border radius and shadow style.
9. Any reusable component candidates.

## Detail Level

For each section:

- `title` should be the visible heading when readable; otherwise use a concise inferred title.
- `description` should explain what the section does visually and functionally.
- `position.region` should describe where the section lives in the page: left navigation, top toolbar, main content, right rail, bottom, or overlay.
- `position.order` should reflect visual order inside that region.
- `position.importance` should identify whether the section is the primary focal area, secondary content, or utility chrome.
- `layout.columns` should approximate the major page grid. For dashboards, infer left/main/right column sizes when visible.
- `layout.density` should describe the overall UI density.
- `elements` should include concrete labels such as button names, navigation item names, card labels, status names, metric labels, and visible headings whenever possible.
- Only include visible text when it is readable. If OCR confidence is low, use a semantic element name such as "navigation item", "metric label", or "primary action".
- `style.background` and `style.foreground` should use approximate hex colors.
- `style.radius` should describe the dominant corner radius for the section.
- `style.border` should describe whether borders are absent, subtle, glowing, or strong.
