import { z } from "zod";

export const ProviderId = z.enum([
  "nim",
  "openai",
  "anthropic",
  "gemini",
  "groq",
  "openrouter",
  "local",
]);
export type ProviderId = z.infer<typeof ProviderId>;

export const CapabilityTag = z.enum([
  "reasoning",
  "fast",
  "long-context",
  "structured-extraction",
  "embeddings",
  "tool-orchestration",
  "domain-analysis",
  "private",
  "code",
]);
export type CapabilityTag = z.infer<typeof CapabilityTag>;

export const ContextWindowCategory = z.enum([
  "short",
  "medium",
  "long",
  "ultra",
]);
export type ContextWindowCategory = z.infer<typeof ContextWindowCategory>;

export const LatencyCategory = z.enum(["ultra-low", "low", "medium", "high"]);
export type LatencyCategory = z.infer<typeof LatencyCategory>;

export const CostCategory = z.enum(["free", "low", "medium", "high", "premium"]);
export type CostCategory = z.infer<typeof CostCategory>;

export const WorkflowType = z.enum([
  "chat",
  "reasoning",
  "summarization",
  "structured-extraction",
  "financial-analysis",
  "planning",
  "decision-synthesis",
  "embedding",
  "reflection",
]);
export type WorkflowType = z.infer<typeof WorkflowType>;

export const SensitivityLevel = z.enum(["public", "internal", "sensitive", "restricted"]);
export type SensitivityLevel = z.infer<typeof SensitivityLevel>;

export const MessageRole = z.enum(["system", "user", "assistant", "tool"]);
export type MessageRole = z.infer<typeof MessageRole>;

export const ToolDefinition = z.object({
  name: z.string().min(1),
  description: z.string(),
  parameters: z.record(z.string(), z.unknown()).optional(),
});
export type ToolDefinition = z.infer<typeof ToolDefinition>;

export const ChatMessage = z.object({
  role: MessageRole,
  content: z.string(),
  toolCallId: z.string().optional(),
  toolCalls: z.array(z.unknown()).optional(),
});
export type ChatMessage = z.infer<typeof ChatMessage>;

export const ModelRequestSchema = z.object({
  modelAlias: z.string().min(1),
  messages: z.array(ChatMessage).min(1),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().positive().optional(),
  topP: z.number().min(0).max(1).optional(),
  stop: z.array(z.string()).optional(),
  tools: z.array(ToolDefinition).optional(),
  responseFormat: z
    .enum(["text", "json"])
    .optional(),
  sensitivity: SensitivityLevel.default("internal"),
  workflowType: WorkflowType.default("chat"),
  stream: z.boolean().default(false),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
export type ModelRequest = z.infer<typeof ModelRequestSchema>;

export const TokenUsage = z.object({
  promptTokens: z.number().int().nonnegative(),
  completionTokens: z.number().int().nonnegative(),
  totalTokens: z.number().int().nonnegative(),
});
export type TokenUsage = z.infer<typeof TokenUsage>;

export const ExecutionMetadata = z.object({
  providerId: ProviderId,
  modelId: z.string(),
  alias: z.string(),
  latencyMs: z.number().nonnegative().optional(),
  tokens: TokenUsage.optional(),
  costUsd: z.number().nonnegative().optional(),
  finishReason: z.string().optional(),
  requestId: z.string().optional(),
});
export type ExecutionMetadata = z.infer<typeof ExecutionMetadata>;

export const ModelResponse = z.object({
  content: z.string(),
  toolCalls: z.array(z.unknown()).optional(),
  usage: TokenUsage.optional(),
  metadata: ExecutionMetadata,
  fallbackEligible: z.boolean().default(true),
});
export type ModelResponse = z.infer<typeof ModelResponse>;

export const StreamChunk = z.object({
  delta: z.string(),
  done: z.boolean().default(false),
  usage: TokenUsage.optional(),
  metadata: ExecutionMetadata.optional(),
});
export type StreamChunk = z.infer<typeof StreamChunk>;

export const ModelAlias = z.string().min(1);
export type ModelAlias = z.infer<typeof ModelAlias>;
