import { readFile } from "node:fs/promises";
import path from "node:path";

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

export async function generateVisualFeedbackWithOpenAI({
  apiKey,
  baseUrl,
  debug = false,
  generatedScreenshotPath,
  instructions,
  model,
  reportText,
  sourceScreenshotPath
}) {
  const sourceImageUrl = await imageToDataUrl(sourceScreenshotPath);
  const generatedImageUrl = await imageToDataUrl(generatedScreenshotPath);

  const response = await fetch(`${baseUrl}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Compare these screenshots and validation report. The first image is the source screenshot. The second image is the generated preview.\n\n${reportText}`
            },
            {
              type: "input_image",
              image_url: sourceImageUrl,
              detail: "high"
            },
            {
              type: "input_image",
              image_url: generatedImageUrl,
              detail: "high"
            }
          ]
        }
      ]
    })
  });

  const responseText = await response.text();
  const payload = parseJson(responseText);
  const contentType = response.headers.get("content-type") ?? "";

  if (debug) {
    console.error("OpenAI visual feedback debug summary:");
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
    throw new Error(`OpenAI visual feedback failed: ${message}`);
  }

  if (!payload) {
    const preview = responseText.slice(0, 120).replace(/\s+/g, " ").trim();
    throw new Error(
      `OpenAI visual feedback response was not JSON. Check OPENAI_BASE_URL. Content-Type: ${contentType || "unknown"}. Preview: ${preview}`
    );
  }

  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("OpenAI visual feedback response did not include output text.");
  }

  return stripCodeFence(outputText);
}

async function imageToDataUrl(imagePath) {
  const extension = path.extname(imagePath).toLowerCase();
  const mimeType = mimeTypes[extension];

  if (!mimeType) {
    throw new Error(`Unsupported image extension for visual feedback: ${extension}`);
  }

  const imageBytes = await readFile(imagePath);
  return `data:${mimeType};base64,${imageBytes.toString("base64")}`;
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
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

function stripCodeFence(text) {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```(?:md|markdown)?\s*([\s\S]*?)\s*```$/);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
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
      : undefined
  };
}
