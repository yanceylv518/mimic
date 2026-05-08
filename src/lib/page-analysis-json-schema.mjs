export const pageAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "pageId", "pageType", "summary", "viewport", "sections", "theme", "notes"],
  properties: {
    schemaVersion: {
      type: "number"
    },
    pageId: {
      type: "string"
    },
    pageType: {
      type: "string"
    },
    summary: {
      type: "string"
    },
    viewport: {
      type: "object",
      additionalProperties: false,
      required: ["width", "height"],
      properties: {
        width: {
          type: ["number", "null"]
        },
        height: {
          type: ["number", "null"]
        }
      }
    },
    sections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "type", "title", "description", "layout", "elements", "style"],
        properties: {
          id: {
            type: "string"
          },
          type: {
            type: "string"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          layout: {
            type: "string"
          },
          elements: {
            type: "array",
            items: {
              type: "string"
            }
          },
          style: {
            type: "object",
            additionalProperties: false,
            required: ["background", "foreground", "spacing", "radius", "border"],
            properties: {
              background: {
                type: "string"
              },
              foreground: {
                type: "string"
              },
              spacing: {
                type: "string"
              },
              radius: {
                type: "string"
              },
              border: {
                type: "string"
              }
            }
          }
        }
      }
    },
    theme: {
      type: "object",
      additionalProperties: false,
      required: ["colors", "fontStyle", "spacing", "radius"],
      properties: {
        colors: {
          type: "array",
          items: {
            type: "string"
          }
        },
        fontStyle: {
          type: "string"
        },
        spacing: {
          type: "string"
        },
        radius: {
          type: "string"
        }
      }
    },
    notes: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};
