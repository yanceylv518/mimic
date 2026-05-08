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
  model,
  pageId,
  prompt,
  screenshotPath
}) {
  const imageUrl = await imageToDataUrl(screenshotPath);
  const response = await fetch("https://api.openai.com/v1/responses", {
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

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error?.message ?? `${response.status} ${response.statusText}`;
    throw new Error(`OpenAI analysis request failed: ${message}`);
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
