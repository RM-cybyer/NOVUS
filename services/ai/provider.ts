import type { AIProviderError } from "./errors";
import type { ModelRequest, ModelResponse, StreamChunk } from "./types";

export interface AIProviderConfig {
  providerId: string;
  apiKey?: string;
  baseURL?: string;
  defaultModelId?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface InvokeOptions {
  signal?: AbortSignal;
  signalOnRetry?: () => boolean;
  requestId?: string;
}

export interface AIProvider {
  readonly providerId: string;

  invoke(request: ModelRequest, options?: InvokeOptions): Promise<ModelResponse>;

  stream(
    request: ModelRequest,
    options?: InvokeOptions,
  ): AsyncIterable<StreamChunk>;

  health(): Promise<{ healthy: boolean; latencyMs?: number; detail?: string }>;

  estimateCost(
    providerModelId: string,
    inputTokens: number,
    outputTokens: number,
  ): number | undefined;
}

export type ProviderFactory = (config: AIProviderConfig) => AIProvider;

export { AIProviderError };
