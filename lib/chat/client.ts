import type { ChatMessageMetadata, ChatStreamChunk } from "./types";
import type { ChatTurn } from "./prompt";

/** Frames emitted by /api/chat, before they are widened to ChatStreamChunk. */
type WireFrame =
  | { type: "delta"; delta: string }
  | { type: "reasoning"; delta: string }
  | { type: "done"; metadata?: ChatMessageMetadata }
  | { type: "error"; error: string };

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: unknown };
    if (typeof body.error === "string") return body.error;
  } catch {
    // fall through to the generic message
  }
  return "Novus no pudo responder. Intenta de nuevo.";
}

/** POST the conversation to the server route and yield its SSE frames.
    The API key never reaches the browser: it lives only in the route. */
export async function* streamChat(
  turns: ChatTurn[],
  signal?: AbortSignal,
): AsyncGenerator<ChatStreamChunk> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: turns }),
    signal,
  });

  if (!response.ok) {
    yield { type: "error", error: await readErrorMessage(response) };
    return;
  }

  if (!response.body) {
    yield { type: "error", error: "La respuesta del servidor llego vacia." };
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // The last element is a partial line; it stays buffered until its
      // newline arrives in a later read.
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;

        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;

        let frame: WireFrame;
        try {
          frame = JSON.parse(payload) as WireFrame;
        } catch {
          continue; // skip a malformed frame rather than killing the stream
        }

        if (frame.type === "delta") {
          yield { type: "delta", delta: frame.delta };
        } else if (frame.type === "reasoning") {
          yield { type: "reasoning", delta: frame.delta };
        } else if (frame.type === "done") {
          yield { type: "done", metadata: frame.metadata };
        } else if (frame.type === "error") {
          yield { type: "error", error: frame.error };
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
