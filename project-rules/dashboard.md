# Dashboard Generation Rules

These rules apply to dashboard, admin, SaaS, CRM, and operational tool pages.

## Layout

- The page must fill the browser width and height. Do not place the whole dashboard inside a centered container.
- Prefer a three-column dashboard layout when the screenshot has side navigation and a utility sidebar:
  - left fixed navigation sidebar
  - middle main content area
  - right fixed status / tools sidebar
- The right sidebar should be an independent column with a stable width, usually around 300-340px.
- Main content should use the remaining fluid width.

## Header And Toolbar

- Do not place the whole top toolbar inside a centered content card.
- A search bar may live at the top of the middle main content area.
- Utility buttons such as refresh, settings, and system status must align to the page right edge or the right sidebar edge.
- If the screenshot has a right utility sidebar, move refresh / settings / system-status controls to the top-right area or right sidebar header.
- Do not fix toolbar alignment only by adding `ml-auto` or `justify-end` to the button group when the parent header is too narrow. Fix the parent grid/header layout scope.
- The toolbar should visually align with the right edge of the "system status" card when that card exists.

## Visual Style

- Dark admin dashboards should use low-contrast backgrounds, weak borders, and compact spacing.
- Avoid large floating rounded cards around the entire app shell.
- Cards should be nested only when the screenshot clearly shows nested panels.
- Use dense spacing for repeated operational lists and status rows.

## Content Fidelity

- Preserve visible Chinese labels from the screenshot.
- Keep side navigation labels and right sidebar labels close to the screenshot.
- Do not replace concrete dashboard content with generic placeholders unless the screenshot text is unreadable.
