import { AIProviderError } from "./errors";
import type { ModelRegistry } from "./registry";
import type { ModelRecord } from "./registry";
import type { AIProvider, InvokeOptions, ProviderFactory } from "./provider";
import {
  type ModelRequest,
  type ModelResponse,
  type ProviderId,
  type SensitivityLevel,
  type StreamChunk,
  type WorkflowType,
} from "./types";

export interface RoutingInput {
  workflowType: WorkflowType;
  sensitivity: SensitivityLevel;
  requiredCapabilities?: string[];
  contextLength?: number;
  requiresTools?: boolean;
  requiresStructuredOutput?: boolean;
  latencyTargetMs?: number;
  costBudgetUsd?: number;
}

export interface RoutingDecision {
  primary: ModelRecord;
  fallbackChain: ModelRecord[];
  rationale: string;
}

const fallbackSafety: Record<SensitivityLevel, boolean> = {
  public: true,
  internal: true,
  sensitive: true,
  restricted: false,
};

export class RoutingEngine {
  constructor(private readonly registry: ModelRegistry) {}

  resolve(request: ModelRequest): RoutingDecision {
    return this.select({
      workflowType: request.workflowType,
      sensitivity: request.sensitivity,
      requiredCapabilities:
        request.tools && request.tools.length > 0 ? ["tool-orchestration"] : undefined,
      contextLength: this.estimateContextLength(request),
      requiresTools: request.tools !== undefined && request.tools.length > 0,
      requiresStructuredOutput: request.responseFormat === "json",
    });
  }

  select(input: RoutingInput): RoutingDecision {
    const candidates = this.registry
      .listModels()
      .filter((model) => !model.deprecated)
      .filter((model) => this.registry.isProviderAvailable(model.providerId))
      .filter((model) => this.registry.isAllowedSensitivity(model, input.sensitivity))
      .filter((model) => this.capabilitiesMatch(model, input))
      .filter((model) => this.contextFits(model, input.contextLength ?? 0))
      .sort((a, b) => this.rankScore(b, input) - this.rankScore(a, input));

    if (candidates.length === 0) {
      throw new AIProviderError({
        category: "policy-block",
        message: `No eligible model for workflow ${input.workflowType} at sensitivity ${input.sensitivity}`,
        providerId: "router",
        retryable: false,
      });
    }

    const primary = candidates[0]!;

    const fallbackChain = candidates
      .slice(1)
      .filter((model) => model.fallbackEligible)
      .slice(0, 3);

    return {
      primary,
      fallbackChain,
      rationale: `Selected ${primary.alias} (${primary.providerId}) for ${input.workflowType} workflow at ${input.sensitivity} sensitivity based on capability, latency and cost fit.`,
    };
  }

  private capabilitiesMatch(model: ModelRecord, input: RoutingInput): boolean {
    if (input.requiresTools && !model.capabilityDetail.toolCalling) return false;
    if (input.requiresStructuredOutput && !model.capabilityDetail.structuredOutput) return false;
    if (input.requiredCapabilities) {
      for (const cap of input.requiredCapabilities) {
        if (!model.capabilities.includes(cap as ModelRecord["capabilities"][number])) return false;
      }
    }
    return true;
  }

  private contextFits(model: ModelRecord, contextLength: number): boolean {
    return contextLength === 0 || model.contextWindowTokens >= contextLength;
  }

  private rankScore(model: ModelRecord, input: RoutingInput): number {
    let score = 0;

    if (this.workflowCapabilityBonus(model, input.workflowType)) score += 10;

    if (input.latencyTargetMs !== undefined) {
      if (model.latencyCategory === "ultra-low") score += 5;
      else if (model.latencyCategory === "low") score += 3;
      else if (model.latencyCategory === "medium") score += 1;
    }

    if (input.costBudgetUsd !== undefined) {
      const unitCost = (model.costPerMillionInput ?? 0) + (model.costPerMillionOutput ?? 0);
      if (unitCost === 0) score += 4;
      else if (unitCost < 1) score += 2;
    }

    if (model.capabilityDetail.reasoning) score += 2;
    if (model.capabilityDetail.structuredOutput) score += 1;

    return score;
  }

  private workflowCapabilityBonus(model: ModelRecord, workflow: WorkflowType): boolean {
    switch (workflow) {
      case "reasoning":
      case "decision-synthesis":
      case "planning":
      case "financial-analysis":
        return model.capabilityDetail.reasoning;
      case "summarization":
      case "chat":
        return model.capabilityDetail.fast || model.capabilityDetail.reasoning;
      case "structured-extraction":
        return model.capabilityDetail.structuredOutput;
      case "embedding":
        return model.capabilityDetail.embeddings;
      case "reflection":
        return model.capabilityDetail.reasoning || model.capabilityDetail.longContext;
      default:
        return true;
    }
  }

  private estimateContextLength(request: ModelRequest): number {
    const messageChars = request.messages.reduce((acc, m) => acc + m.content.length, 0);
    const systemChars = request.systemPrompt?.length ?? 0;
    return Math.ceil((messageChars + systemChars) / 4);
  }
}

export async function executeWithFallback(
  adapter: AIProvider,
  request: ModelRequest,
  decision: RoutingDecision,
  options?: InvokeOptions & {
    onFallback?: (model: ModelRecord, error: AIProviderError) => void;
  },
): Promise<ModelResponse> {
  let lastError: AIProviderError | null = null;
  if (decision.fallbackChain.length > 0 && !fallbackSafety[request.sensitivity]) {
    throw new AIProviderError({
      category: "policy-block",
      message: `Fallback disabled for sensitivity ${request.sensitivity}`,
      providerId: "router",
      retryable: false,
    });
  }

  try {
    return await adapter.invoke({ ...request, modelAlias: decision.primary.alias }, options);
  } catch (error) {
    if (error instanceof AIProviderError && error.retryable) {
      lastError = error;
    } else {
      throw error;
    }
  }

  for (const fallback of decision.fallbackChain) {
    options?.onFallback?.(fallback, lastError!);
    try {
      return await adapter.invoke({ ...request, modelAlias: fallback.alias }, options);
    } catch (error) {
      if (error instanceof AIProviderError && error.retryable) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastError ?? new Error("Fallback exhausted");
}

export async function* streamWithFallback(
  adapter: AIProvider,
  request: ModelRequest,
  decision: RoutingDecision,
  options?: InvokeOptions,
): AsyncIterable<StreamChunk> {
  yield* adapter.stream({ ...request, modelAlias: decision.primary.alias }, options);
}

export type { AIProvider, ProviderFactory, ProviderId };
