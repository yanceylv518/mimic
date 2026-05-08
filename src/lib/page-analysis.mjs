const requiredThemeKeys = ["colors", "fontStyle", "spacing", "radius"];

export function createAnalysisTemplate(pageId) {
  return {
    schemaVersion: 1,
    pageId,
    pageType: "unknown",
    summary: "",
    viewport: {
      width: null,
      height: null
    },
    layout: {
      type: "unknown",
      columns: [],
      density: ""
    },
    sections: [],
    theme: {
      colors: [],
      fontStyle: "",
      spacing: "",
      radius: ""
    },
    notes: []
  };
}

export function validatePageAnalysis(analysis) {
  assertObject(analysis, "analysis");
  assertString(analysis.pageType, "pageType");
  assertArray(analysis.sections, "sections");
  if ("layout" in analysis) {
    assertObject(analysis.layout, "layout");
  }
  assertObject(analysis.theme, "theme");

  for (const key of requiredThemeKeys) {
    if (!(key in analysis.theme)) {
      throw new Error(`Missing required theme key: theme.${key}`);
    }
  }

  assertArray(analysis.theme.colors, "theme.colors");

  for (const section of analysis.sections) {
    assertObject(section, "section");
    assertString(section.id, "section.id");
    assertString(section.type, "section.type");
    if ("title" in section) {
      assertString(section.title, "section.title");
    }
    if ("description" in section) {
      assertString(section.description, "section.description");
    }
    if ("position" in section) {
      assertObject(section.position, "section.position");
    }
  }
}

function assertObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Expected ${name} to be an object.`);
  }
}

function assertArray(value, name) {
  if (!Array.isArray(value)) {
    throw new Error(`Expected ${name} to be an array.`);
  }
}

function assertString(value, name) {
  if (typeof value !== "string") {
    throw new Error(`Expected ${name} to be a string.`);
  }
}
