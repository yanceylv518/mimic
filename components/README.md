# Component Registry

This folder records reusable UI components discovered from generated pages.

The registry is intentionally metadata-first in MVP1. It does not force every generated page to import shared components yet. The purpose is to identify repeated dashboard patterns before extracting code.

## Files

```text
components/
  README.md
  registry.json
  specs/
    dashboard.json
```

## Component Maturity

- `candidate`: discovered from one or more pages, not yet implemented as shared code.
- `draft`: has a first shared implementation, still page-specific.
- `stable`: can be reused by generation workflows.

## MVP1 Rule

Generated pages can remain self-contained. Components become shared only after at least two accepted pages reuse the same pattern.
