import { readFile } from "node:fs/promises";
import path from "node:path";
import { pageAnalysisJsonSchema } from "./page-analysis-json-schema.mjs";

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

export async function analyzeScreenshotWithOpenAI({
  apiKey,
  baseUrl,
  debug = false,
  model,
  pageId,
  prompt,
  screenshotPath
}) {
  const imageUrl = await imageToDataUrl(screenshotPath);
  const response = await fetch(`${baseUrl}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions: prompt,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Analyze this screenshot for pageId "${pageId}" and return analysis JSON.`
            },
            {
              type: "input_image",
              image_url: imageUrl,
              detail: "high"
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "page_analysis",
          strict: true,
          schema: pageAnalysisJsonSchema
        }
      }
    })
  });

  const responseText = await response.text();
  const payload = parseJson(responseText);
  const contentType = response.headers.get("content-type") ?? "";

  if (debug) {
    console.error("OpenAI response debug summary:");
    console.error(
      JSON.stringify(
        {
          status: response.status,
          statusText: response.statusText,
          contentType,
          textPreview: responseText.slice(0, 500),
          payload: summarizePayload(payload)
        },
        null,
        2
      )
    );
  }

  if (!response.ok) {
    const message = payload?.error?.message ?? `${response.status} ${response.statusText}`;
    throw new Error(`OpenAI analysis request failed: ${message}`);
  }

  if (!payload) {
    const preview = responseText.slice(0, 120).replace(/\s+/g, " ").trim();
    throw new Error(
      `OpenAI analysis response was not JSON. Check OPENAI_BASE_URL; it should be an API endpoint ending in /v1, not a web console URL. Content-Type: ${contentType || "unknown"}. Preview: ${preview}`
    );
  }

  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("OpenAI analysis response did not include output text.");
  }

  try {
    return JSON.parse(outputText);
  } catch {
    throw new Error("OpenAI analysis response was not valid JSON.");
  }
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function imageToDataUrl(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();
  const mimeType = mimeTypes[extension];

  if (!mimeType) {
    throw new Error(`Unsupported image extension for OpenAI analysis: ${extension}`);
  }

  const imageBytes = await readFile(imagePath);
  return `data:${mimeType};base64,${imageBytes.toString("base64")}`;
}

function extractOutputText(payload) {
  if (typeof payload?.output_text === "string") {
    return payload.output_text;
  }

  const messages = Array.isArray(payload?.output) ? payload.output : [];

  for (const message of messages) {
    const content = Array.isArray(message?.content) ? message.content : [];
    for (const item of content) {
      if (item?.type === "output_text" && typeof item.text === "string") {
        return item.text;
      }
    }
  }

  return "";
}

function summarizePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { type: typeof payload };
  }

  return {
    keys: Object.keys(payload),
    id: payload.id,
    status: payload.status,
    error: payload.error
      ? {
          type: payload.error.type,
          code: payload.error.code,
          message: payload.error.message
        }
      : undefined,
    outputTypes: Array.isArray(payload.output)
      ? payload.output.map((item) => ({
          type: item?.type,
          role: item?.role,
          status: item?.status,
          contentTypes: Array.isArray(item?.content)
            ? item.content.map((content) => ({
                type: content?.type,
                textPreview:
                  typeof content?.text === "string" ? content.text.slice(0, 120) : undefined
              }))
            : undefined
        }))
      : undefined,
    choicesTypes: Array.isArray(payload.choices)
      ? payload.choices.map((choice) => ({
          keys: Object.keys(choice ?? {}),
          messageKeys: choice?.message ? Object.keys(choice.message) : undefined,
          contentPreview:
            typeof choice?.message?.content === "string"
              ? choice.message.content.slice(0, 120)
              : undefined
        }))
      : undefined
  };
}
