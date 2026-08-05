import { AIProviderError } from "./errors";
import type { AIProvider, AIProviderConfig, InvokeOptions } from "./provider";
import { executeWithFallback, RoutingEngine, streamWithFallback, type RoutingDecision } from "./routing";
import { getModelRegistry, ModelRegistry, type ModelRecord } from "./registry";
import { getProvider } from "./providers";
import type {
  ModelRequest,
  ModelResponse,
  ProviderId,
  StreamChunk,
} from "./types";

export interface AIServiceOptions {
  registry?: ModelRegistry;
  providerConfig?: Partial<Record<ProviderId, AIProviderConfig>>;
}

export class AIService {
  private readonly routing: RoutingEngine;
  private readonly registry: ModelRegistry;
  private readonly adapters = new Map<ProviderId, AIProvider>();
  private readonly providerConfig: Partial<Record<ProviderId, AIProviderConfig>>;

  constructor(options: AIServiceOptions = {}) {
    this.registry = options.registry ?? getModelRegistry();
    this.routing = new RoutingEngine(this.registry);
    this.providerConfig = options.providerConfig ?? {};
  }

  getRegistry(): ModelRegistry {
    return this.registry;
  }

  registerProviderAdapter(providerId: ProviderId, provider: AIProvider): void {
    this.adapters.set(providerId, provider);
  }

  private adapterFor(providerId: ProviderId): AIProvider {
    const cached = this.adapters.get(providerId);
    if (cached) return cached;
    const config: AIProviderConfig = {
      providerId,
      ...this.providerConfig[providerId],
    };
    const adapter = getProvider(providerId, config);
    this.adapters.set(providerId, adapter);
    return adapter;
  }

  route(request: ModelRequest): RoutingDecision {
    return this.routing.resolve(request);
  }

  async invoke(request: ModelRequest, options?: InvokeOptions): Promise<ModelResponse> {
    const decision = this.route(request);
    const adapter = this.adapterFor(decision.primary.providerId);
    return executeWithFallback(adapter, request, decision, options);
  }

  async *stream(request: ModelRequest, options?: InvokeOptions): AsyncIterable<StreamChunk> {
    const decision = this.route(request);
    const adapter = this.adapterFor(decision.primary.providerId);
    yield* streamWithFallback(adapter, request, decision, options);
  }

  async health(providerId: ProviderId): Promise<{ healthy: boolean; latencyMs?: number; detail?: string }> {
    try {
      return await this.adapterFor(providerId).health();
    } catch (error) {
      return { healthy: false, detail: (error as Error).message };
    }
  }
}

export type {
  AIProvider,
  AIProviderConfig,
  InvokeOptions,
  ModelRecord,
  ModelRequest,
  ModelResponse,
  RoutingDecision,
  StreamChunk,
};

export { AIProviderError, executeWithFallback, getModelRegistry, RoutingEngine, ModelRegistry };
