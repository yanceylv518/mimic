export async function generateTextWithOpenAI({
  apiKey,
  baseUrl,
  debug = false,
  instructions,
  model,
  userText
}) {
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
              text: userText
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
    console.error("OpenAI text response debug summary:");
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
    throw new Error(`OpenAI text generation failed: ${message}`);
  }

  if (!payload) {
    const preview = responseText.slice(0, 120).replace(/\s+/g, " ").trim();
    throw new Error(
      `OpenAI text response was not JSON. Check OPENAI_BASE_URL. Content-Type: ${contentType || "unknown"}. Preview: ${preview}`
    );
  }

  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("OpenAI text response did not include output text.");
  }

  return outputText;
}

export function stripCodeFence(text) {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```(?:tsx|typescript|ts|jsx|javascript|js)?\s*([\s\S]*?)\s*```$/);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
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
