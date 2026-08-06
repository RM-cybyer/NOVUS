import { z } from "zod";
import {
  CapabilityTag,
  ContextWindowCategory,
  CostCategory,
  LatencyCategory,
  ProviderId,
  type SensitivityLevel,
} from "./types";

export const ModelCapabilities = z.object({
  reasoning: z.boolean().default(false),
  fast: z.boolean().default(false),
  longContext: z.boolean().default(false),
  structuredOutput: z.boolean().default(false),
  toolCalling: z.boolean().default(false),
  embeddings: z.boolean().default(false),
  code: z.boolean().default(false),
  streaming: z.boolean().default(true),
});
export type ModelCapabilities = z.infer<typeof ModelCapabilities>;

export const ModelRecord = z.object({
  alias: z.string().min(1),
  providerId: ProviderId,
  providerModelId: z.string().min(1),
  displayName: z.string(),
  capabilities: z.array(CapabilityTag).min(1),
  capabilityDetail: ModelCapabilities,
  contextWindow: ContextWindowCategory,
  contextWindowTokens: z.number().int().positive(),
  latencyCategory: LatencyCategory,
  costCategory: CostCategory,
  fallbackEligible: z.boolean().default(true),
  deprecated: z.boolean().default(false),
  maxSensitivity: z.custom<SensitivityLevel>(),
  safetyNotes: z.array(z.string()).default([]),
  costPerMillionInput: z.number().nonnegative().optional(),
  costPerMillionOutput: z.number().nonnegative().optional(),
});
export type ModelRecord = z.infer<typeof ModelRecord>;

export const ProviderRecord = z.object({
  id: ProviderId,
  displayName: z.string(),
  adapterType: z.string(),
  supportedCapabilities: z.array(CapabilityTag),
  regions: z.array(z.string()).default([]),
  dataHandlingNotes: z.array(z.string()).default([]),
  maxSensitivity: z.custom<SensitivityLevel>(),
  available: z.boolean().default(true),
  requiresApiKey: z.boolean().default(true),
});
export type ProviderRecord = z.infer<typeof ProviderRecord>;

export const models: ModelRecord[] = [
  {
    alias: "nova-reasoning",
    providerId: "nim",
    providerModelId: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    displayName: "Nova Reasoning (NVIDIA Nemotron 3 Nano Omni)",
    // Tool calling is not claimed: it has not been verified against this
    // model, and claiming it would let the router pick it for tool work.
    capabilities: ["reasoning", "long-context", "domain-analysis"],
    capabilityDetail: {
      reasoning: true,
      fast: false,
      longContext: true,
      structuredOutput: true,
      toolCalling: false,
      embeddings: false,
      code: false,
      streaming: true,
    },
    contextWindow: "long",
    // Assumed, not published in NVIDIA's /v1/models response. Only used to
    // reject oversized prompts, and chat prompts sit far below it.
    contextWindowTokens: 128_000,
    latencyCategory: "medium",
    costCategory: "low",
    fallbackEligible: true,
    deprecated: false,
    maxSensitivity: "sensitive",
    safetyNotes: [
      "Emits a separate reasoning trace; never surface it as the answer.",
      "Requires structured-output validation for financial decisions.",
    ],
    // Pricing intentionally omitted: unknown for this endpoint, and a
    // guessed rate would produce fabricated cost figures in the UI.
  },
  {
    alias: "nova-fast",
    providerId: "nim",
    providerModelId: "meta/llama-3.1-8b-instruct",
    displayName: "Nova Fast (NVIDIA NIM)",
    capabilities: ["fast", "reasoning"],
    capabilityDetail: {
      reasoning: true,
      fast: true,
      longContext: false,
      structuredOutput: true,
      toolCalling: true,
      embeddings: false,
      code: false,
      streaming: true,
    },
    contextWindow: "medium",
    contextWindowTokens: 8_192,
    latencyCategory: "low",
    costCategory: "free",
    fallbackEligible: true,
    deprecated: false,
    maxSensitivity: "internal",
    safetyNotes: ["Suitable for quick summarization and chat.", "Not suitable for sensitive financial decisions without evaluation."],
    costPerMillionInput: 0,
    costPerMillionOutput: 0,
  },
  {
    alias: "nova-embeddings",
    providerId: "nim",
    providerModelId: "nvidia/nv-embedqa-e5-v5",
    displayName: "Nova Embeddings (NVIDIA NIM)",
    capabilities: ["embeddings"],
    capabilityDetail: {
      reasoning: false,
      fast: true,
      longContext: false,
      structuredOutput: false,
      toolCalling: false,
      embeddings: true,
      code: false,
      streaming: false,
    },
    contextWindow: "short",
    contextWindowTokens: 2_048,
    latencyCategory: "ultra-low",
    costCategory: "free",
    fallbackEligible: false,
    deprecated: false,
    maxSensitivity: "sensitive",
    safetyNotes: ["Embeddings only; do not use for generation."],
    costPerMillionInput: 0,
    costPerMillionOutput: 0,
  },
  {
    alias: "nova-fast-fallback",
    providerId: "nim",
    providerModelId: "meta/llama-3.1-8b-instruct",
    displayName: "Nova Fast Fallback (NVIDIA NIM)",
    capabilities: ["fast"],
    capabilityDetail: {
      reasoning: false,
      fast: true,
      longContext: false,
      structuredOutput: true,
      toolCalling: false,
      embeddings: false,
      code: false,
      streaming: true,
    },
    contextWindow: "medium",
    contextWindowTokens: 8_192,
    latencyCategory: "ultra-low",
    costCategory: "free",
    fallbackEligible: true,
    deprecated: false,
    maxSensitivity: "internal",
    safetyNotes: ["Conservative low-cost fallback only."],
    costPerMillionInput: 0,
    costPerMillionOutput: 0,
  },
];

export const providers: ProviderRecord[] = [
  {
    id: "nim",
    displayName: "NVIDIA NIM",
    adapterType: "nim",
    supportedCapabilities: ["reasoning", "fast", "long-context", "structured-extraction", "embeddings", "tool-orchestration", "domain-analysis", "code"],
    regions: ["us", "eu"],
    dataHandlingNotes: ["Provider processes prompts server-side per NVIDIA data policy.", "Review privacy policy for sensitive workflows."],
    maxSensitivity: "sensitive",
    available: true,
    requiresApiKey: true,
  },
  {
    id: "openai",
    displayName: "OpenAI",
    adapterType: "openai",
    supportedCapabilities: ["reasoning", "fast", "long-context", "structured-extraction", "embeddings", "tool-orchestration", "code"],
    regions: ["us"],
    dataHandlingNotes: ["Reserved for future integration.", "Requires separate security review before activation."],
    maxSensitivity: "internal",
    available: false,
    requiresApiKey: true,
  },
  {
    id: "anthropic",
    displayName: "Anthropic",
    adapterType: "anthropic",
    supportedCapabilities: ["reasoning", "long-context", "tool-orchestration", "code"],
    regions: ["us"],
    dataHandlingNotes: ["Reserved for future integration."],
    maxSensitivity: "internal",
    available: false,
    requiresApiKey: true,
  },
  {
    id: "gemini",
    displayName: "Google Gemini",
    adapterType: "gemini",
    supportedCapabilities: ["reasoning", "fast", "long-context", "structured-extraction", "tool-orchestration"],
    regions: ["us", "eu"],
    dataHandlingNotes: ["Reserved for future integration."],
    maxSensitivity: "internal",
    available: false,
    requiresApiKey: true,
  },
  {
    id: "groq",
    displayName: "Groq",
    adapterType: "groq",
    supportedCapabilities: ["fast", "reasoning"],
    regions: ["us"],
    dataHandlingNotes: ["Reserved for future integration."],
    maxSensitivity: "internal",
    available: false,
    requiresApiKey: true,
  },
  {
    id: "openrouter",
    displayName: "OpenRouter",
    adapterType: "openrouter",
    supportedCapabilities: ["reasoning", "fast", "long-context", "structured-extraction", "tool-orchestration", "code"],
    regions: ["us"],
    dataHandlingNotes: ["Reserved for future integration. Routes to multiple providers; review per-model data policy."],
    maxSensitivity: "internal",
    available: false,
    requiresApiKey: true,
  },
  {
    id: "local",
    displayName: "Local Model",
    adapterType: "local",
    supportedCapabilities: ["reasoning", "fast", "private"],
    regions: ["edge"],
    dataHandlingNotes: ["Local execution only; no external network calls."],
    maxSensitivity: "restricted",
    available: false,
    requiresApiKey: false,
  },
];

const sensitivityRank: Record<SensitivityLevel, number> = {
  public: 0,
  internal: 1,
  sensitive: 2,
  restricted: 3,
};

export class ModelRegistry {
  private readonly models = new Map<string, ModelRecord>();
  private readonly providers = new Map<ProviderId, ProviderRecord>();

  constructor(
    initialModels: ModelRecord[] = models,
    initialProviders: ProviderRecord[] = providers,
  ) {
    for (const model of initialModels) this.models.set(model.alias, model);
    for (const provider of initialProviders) this.providers.set(provider.id, provider);
  }

  registerModel(model: ModelRecord): void {
    this.models.set(model.alias, model);
  }

  registerProvider(provider: ProviderRecord): void {
    this.providers.set(provider.id, provider);
  }

  getModel(alias: string): ModelRecord | undefined {
    return this.models.get(alias);
  }

  getProvider(id: ProviderId): ProviderRecord | undefined {
    return this.providers.get(id);
  }

  listModels(): ModelRecord[] {
    return Array.from(this.models.values());
  }

  listProviders(): ProviderRecord[] {
    return Array.from(this.providers.values());
  }

  isAllowedSensitivity(model: ModelRecord, sensitivity: SensitivityLevel): boolean {
    return sensitivityRank[sensitivity] <= sensitivityRank[model.maxSensitivity];
  }

  isProviderAvailable(id: ProviderId): boolean {
    return this.providers.get(id)?.available ?? false;
  }
}

let defaultRegistry: ModelRegistry | null = null;

export function getModelRegistry(): ModelRegistry {
  if (!defaultRegistry) defaultRegistry = new ModelRegistry();
  return defaultRegistry;
}
