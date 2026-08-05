import { z } from "zod";
import type { AIProviderConfig } from "@/services/ai/provider";
import type { ProviderId } from "@/services/ai/types";

const AIConfigSchema = z.object({
  nimApiKey: z.string().optional(),
  nimBaseUrl: z.string().url().optional(),
  nimTimeoutMs: z.coerce.number().int().positive().default(30_000),
  nimDefaultModel: z.string().optional(),
  defaultProviderId: z.string().default("nim"),
  defaultSensitivity: z.enum(["public", "internal", "sensitive", "restricted"]).default("internal"),
  enableStreaming: z.coerce.boolean().default(true),
  maxRetries: z.coerce.number().int().positive().default(2),
});

export type AIConfig = z.infer<typeof AIConfigSchema>;

export function loadAIConfig(env: Record<string, string | undefined> = process.env): AIConfig {
  const parsed = AIConfigSchema.safeParse({
    nimApiKey: env.NOVUS_AI_NIM_API_KEY ?? env.NIM_API_KEY,
    nimBaseUrl: env.NOVUS_AI_NIM_BASE_URL ?? env.NIM_BASE_URL,
    nimTimeoutMs: env.NOVUS_AI_NIM_TIMEOUT_MS ?? env.NIM_TIMEOUT_MS,
    nimDefaultModel: env.NOVUS_AI_NIM_DEFAULT_MODEL,
    defaultProviderId: env.NOVUS_AI_DEFAULT_PROVIDER,
    defaultSensitivity: env.NOVUS_AI_DEFAULT_SENSITIVITY,
    enableStreaming: env.NOVUS_AI_ENABLE_STREAMING,
    maxRetries: env.NOVUS_AI_MAX_RETRIES,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Invalid AI configuration: ${issues}`);
  }

  return parsed.data;
}

export function buildProviderConfig(providerId: ProviderId, config: AIConfig): AIProviderConfig {
  switch (providerId) {
    case "nim":
      return {
        providerId,
        apiKey: config.nimApiKey,
        baseURL: config.nimBaseUrl,
        timeoutMs: config.nimTimeoutMs,
        defaultModelId: config.nimDefaultModel,
        maxRetries: config.maxRetries,
      };
    default:
      return { providerId, timeoutMs: config.nimTimeoutMs, maxRetries: config.maxRetries };
  }
}

export function isAIConfigured(config: AIConfig): boolean {
  return Boolean(config.nimApiKey);
}
