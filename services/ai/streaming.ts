import type { StreamChunk } from "./types";
import type { ExecutionMetadata } from "./types";

export interface StreamCallbacks {
  onChunk?: (chunk: StreamChunk) => void;
  onError?: (error: unknown) => void;
  onClose?: (fullContent: string, metadata?: ExecutionMetadata) => void;
}

export async function consumeStream(
  stream: AsyncIterable<StreamChunk>,
  callbacks?: StreamCallbacks,
  signal?: AbortSignal,
): Promise<{ content: string; metadata?: ExecutionMetadata }> {
  const parts: string[] = [];
  let metadata: ExecutionMetadata | undefined;

  try {
    for await (const chunk of stream) {
      if (signal?.aborted) break;
      if (chunk.delta) parts.push(chunk.delta);
      if (chunk.metadata) metadata = chunk.metadata;
      callbacks?.onChunk?.(chunk);
      if (chunk.done) break;
    }
  } catch (error) {
    callbacks?.onError?.(error);
    throw error;
  }

  const content = parts.join("");
  callbacks?.onClose?.(content, metadata);
  return { content, metadata };
}

export function makeStreamChunk(
  delta: string,
  done: boolean,
  metadata?: ExecutionMetadata,
  usage?: StreamChunk["usage"],
): StreamChunk {
  return { delta, done, metadata, usage };
}

export function createSseReadableStream(
  upstream: AsyncIterable<StreamChunk>,
): ReadableStream<StreamChunk> {
  const encoder = new TextEncoder();
  return new ReadableStream<StreamChunk>({
    async start(controller) {
      try {
        for await (const chunk of upstream) {
          controller.enqueue(chunk);
          encoder.encode(chunk.delta);
          if (chunk.done) break;
        }
      } catch (error) {
        controller.error(error);
        return;
      }
      controller.close();
    },
  });
}

export async function* replayAsStream(content: string, metadata?: ExecutionMetadata): AsyncIterable<StreamChunk> {
  const chunkSize = 8;
  for (let i = 0; i < content.length; i += chunkSize) {
    yield makeStreamChunk(content.slice(i, i + chunkSize), false, metadata);
  }
  yield makeStreamChunk("", true, metadata);
}
