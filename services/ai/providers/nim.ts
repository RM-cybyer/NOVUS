import { getModelRegistry } from "../registry";
import { normalizeError } from "../errors";
import type { AIProvider, AIProviderConfig, InvokeOptions } from "../provider";
import type {
  ChatMessage,
  ExecutionMetadata,
  ModelRequest,
  ModelResponse,
  StreamChunk,
  TokenUsage,
} from "../types";

const NIM_DEFAULT_BASE_URL = "https://integrate.api.nvidia.com/v1";

interface NimChatChoice {
  message?: {
    role?: string;
    content?: string;
    /** Reasoning models return their scratchpad here, not in `content`. */
    reasoning_content?: string;
    tool_calls?: unknown[];
  };
  finish_reason?: string;
}

interface NimChatResponse {
  choices?: NimChatChoice[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  id?: string;
}

interface NimStreamDelta {
  choices?: Array<{
    delta?: { content?: string; reasoning_content?: string; role?: string };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  id?: string;
}

function mapMessages(request: ModelRequest): Array<Record<string, unknown>> {
  const mapped: Array<Record<string, unknown>> = [];
  if (request.systemPrompt) {
    mapped.push({ role: "system", content: request.systemPrompt });
  }
  for (const msg of request.messages) {
    mapped.push(toOpenAIMessage(msg));
  }
  return mapped;
}

function toOpenAIMessage(msg: ChatMessage): Record<string, unknown> {
  const out: Record<string, unknown> = { role: msg.role, content: msg.content };
  if (msg.toolCallId) out.tool_call_id = msg.toolCallId;
  if (msg.toolCalls) out.tool_calls = msg.toolCalls;
  return out;
}

function buildModelId(
  adapter: NimProvider,
  alias: string,
): { modelId: string; alias: string } {
  const registry = getModelRegistry();
  const model = registry.getModel(alias);
  if (!model) {
    throw normalizeError(adapter.providerId, new Error(`Unknown model alias: ${alias}`));
  }
  if (model.providerId !== "nim") {
    throw normalizeError(
      adapter.providerId,
      new Error(`Model alias ${alias} is not a NVIDIA NIM model`),
    );
  }
  return { modelId: model.providerModelId, alias: model.alias };
}

function buildMetadata(
  config: AIProviderConfig,
  modelId: string,
  alias: string,
  usage: TokenUsage | undefined,
  latencyMs: number | undefined,
  finishReason: string | undefined,
  requestId: string | undefined,
): ExecutionMetadata {
  const model = getModelRegistry().getModel(alias);
  let costUsd: number | undefined;
  if (usage && model?.costPerMillionInput !== undefined && model?.costPerMillionOutput !== undefined) {
    const inputCost = (usage.promptTokens / 1_000_000) * model.costPerMillionInput;
    const outputCost = (usage.completionTokens / 1_000_000) * model.costPerMillionOutput;
    costUsd = inputCost + outputCost;
  }
  return {
    providerId: "nim",
    modelId,
    alias,
    latencyMs,
    tokens: usage,
    costUsd,
    finishReason,
    requestId,
  };
}

function extractUsage(usage: NimChatResponse["usage"] | NimStreamDelta["usage"]): TokenUsage | undefined {
  if (!usage) return undefined;
  return {
    promptTokens: usage.prompt_tokens ?? 0,
    completionTokens: usage.completion_tokens ?? 0,
    totalTokens: usage.total_tokens ?? 0,
  };
}

export class NimProvider implements AIProvider {
  readonly providerId = "nim";
  private readonly baseURL: string;
  private readonly apiKey?: string;
  private readonly timeoutMs: number;

  constructor(private readonly config: AIProviderConfig) {
    this.baseURL = config.baseURL ?? NIM_DEFAULT_BASE_URL;
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs ?? 30_000;
  }

  async invoke(request: ModelRequest, options?: InvokeOptions): Promise<ModelResponse> {
    const modelRef = buildModelId(this, request.modelAlias);
    const body = this.buildBody(request, modelRef.modelId, false);
    const start = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    if (options?.signal) options.signal.addEventListener("abort", () => controller.abort());

    try {
      const res = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: this.headers(options?.requestId),
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const latencyMs = Math.round(performance.now() - start);

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw normalizeError(this.providerId, { message: `NIM HTTP ${res.status}: ${txt.slice(0, 500)}`, status: res.status });
      }

      const data = (await res.json()) as NimChatResponse;
      const choice = data.choices?.[0];
      const content = choice?.message?.content ?? "";
      const finishReason = choice?.finish_reason;
      const usage = extractUsage(data.usage);

      return {
        content,
        toolCalls: choice?.message?.tool_calls,
        usage,
        metadata: buildMetadata(this.config, modelRef.modelId, modelRef.alias, usage, latencyMs, finishReason, data.id ?? options?.requestId),
        fallbackEligible: true,
      };
    } catch (error) {
      throw normalizeError(this.providerId, error);
    } finally {
      clearTimeout(timer);
    }
  }

  async *stream(request: ModelRequest, options?: InvokeOptions): AsyncIterable<StreamChunk> {
    const modelRef = buildModelId(this, request.modelAlias);
    const body = this.buildBody(request, modelRef.modelId, true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    if (options?.signal) options.signal.addEventListener("abort", () => controller.abort());

    try {
      const res = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: this.headers(options?.requestId),
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const txt = await res.text().catch(() => "");
        throw normalizeError(this.providerId, { message: `NIM stream HTTP ${res.status}: ${txt.slice(0, 500)}`, status: res.status });
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let lastUsage: TokenUsage | undefined;
      let lastRequestId = options?.requestId;
      const start = performance.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const chunk = JSON.parse(payload) as NimStreamDelta;
            // The usage-only frame carries an empty choices array, so read
            // usage before touching choices[0].
            lastUsage = extractUsage(chunk.usage) ?? lastUsage;
            lastRequestId = chunk.id ?? lastRequestId;

            const frame = chunk.choices?.[0]?.delta;
            const delta = frame?.content ?? "";
            const reasoningDelta = frame?.reasoning_content ?? "";

            if (delta || reasoningDelta) {
              yield {
                delta,
                reasoningDelta: reasoningDelta || undefined,
                done: false,
                metadata: undefined,
                usage: undefined,
              };
            }
          } catch {
            // skip malformed SSE line
          }
        }
      }

      const latencyMs = Math.round(performance.now() - start);
      const finishMeta = buildMetadata(this.config, modelRef.modelId, modelRef.alias, lastUsage, latencyMs, "stop", lastRequestId);
      yield { delta: "", done: true, metadata: finishMeta, usage: lastUsage };
    } catch (error) {
      throw normalizeError(this.providerId, error);
    } finally {
      clearTimeout(timer);
    }
  }

  async health(): Promise<{ healthy: boolean; latencyMs?: number; detail?: string }> {
    if (!this.apiKey) return { healthy: false, detail: "Missing API key" };
    const start = performance.now();
    try {
      const res = await fetch(`${this.baseURL}/models`, {
        method: "GET",
        headers: this.headers(),
      });
      const latencyMs = Math.round(performance.now() - start);
      if (res.ok) return { healthy: true, latencyMs };
      return { healthy: false, latencyMs, detail: `HTTP ${res.status}` };
    } catch (error) {
      const latencyMs = Math.round(performance.now() - start);
      return { healthy: false, latencyMs, detail: (error as Error).message };
    }
  }

  estimateCost(providerModelId: string, inputTokens: number, outputTokens: number): number | undefined {
    const model = getModelRegistry().listModels().find((m) => m.providerModelId === providerModelId);
    if (!model?.costPerMillionInput || !model?.costPerMillionOutput) return undefined;
    return (
      (inputTokens / 1_000_000) * model.costPerMillionInput +
      (outputTokens / 1_000_000) * model.costPerMillionOutput
    );
  }

  private headers(requestId?: string): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;
    if (requestId) headers["x-request-id"] = requestId;
    return headers;
  }

  private buildBody(request: ModelRequest, modelId: string, stream: boolean): Record<string, unknown> {
    const body: Record<string, unknown> = {
      model: modelId,
      messages: mapMessages(request),
      stream,
    };
    if (stream) {
      // Without this the provider streams every chunk with usage: null, so
      // token counts and cost would be lost on every streamed answer.
      body.stream_options = { include_usage: true };
    }
    if (request.reasoningBudget !== undefined) {
      body.reasoning_budget = request.reasoningBudget;
    }
    if (request.temperature !== undefined) body.temperature = request.temperature;
    if (request.maxTokens !== undefined) body.max_tokens = request.maxTokens;
    if (request.topP !== undefined) body.top_p = request.topP;
    if (request.stop !== undefined) body.stop = request.stop;
    if (request.responseFormat === "json") {
      body.response_format = { type: "json_object" };
    }
    if (request.tools && request.tools.length > 0) {
      body.tools = request.tools;
    }
    return body;
  }
}

export function createNimProvider(config: AIProviderConfig): AIProvider {
  return new NimProvider(config);
}
