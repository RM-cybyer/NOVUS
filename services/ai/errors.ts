import { z } from "zod";

export const ErrorCategory = z.enum([
  "auth",
  "rate-limit",
  "timeout",
  "validation",
  "content-policy",
  "provider-unavailable",
  "network",
  "policy-block",
  "unknown",
]);
export type ErrorCategory = z.infer<typeof ErrorCategory>;

export const ProviderErrorSchema = z.object({
  category: ErrorCategory,
  message: z.string(),
  providerId: z.string(),
  retryable: z.boolean().default(false),
  statusCode: z.number().int().optional(),
  raw: z.unknown().optional(),
});
export type ProviderError = z.infer<typeof ProviderErrorSchema>;

export class AIProviderError extends Error {
  readonly category: ErrorCategory;
  readonly providerId: string;
  readonly retryable: boolean;
  readonly statusCode?: number;
  readonly raw?: unknown;

  constructor(params: ProviderError) {
    super(params.message);
    this.name = "AIProviderError";
    this.category = params.category;
    this.providerId = params.providerId;
    this.retryable = params.retryable;
    this.statusCode = params.statusCode;
    this.raw = params.raw;
  }

  toJSON(): ProviderError {
    return {
      category: this.category,
      message: this.message,
      providerId: this.providerId,
      retryable: this.retryable,
      statusCode: this.statusCode,
      raw: this.raw,
    };
  }
}

export function normalizeError(providerId: string, error: unknown): AIProviderError {
  if (error instanceof AIProviderError) return error;

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    const anyErr = error as unknown as Record<string, unknown>;
    const statusRaw = anyErr.status ?? anyErr.statusCode;
    const status = typeof statusRaw === "number" ? (statusRaw as number) : undefined;

    if (status === 401 || status === 403 || message.includes("unauthorized") || message.includes("invalid api key")) {
      return new AIProviderError({ category: "auth", message: error.message, providerId, retryable: false, statusCode: status, raw: error });
    }
    if (status === 429 || message.includes("rate limit") || message.includes("too many requests")) {
      return new AIProviderError({ category: "rate-limit", message: error.message, providerId, retryable: true, statusCode: status, raw: error });
    }
    if (message.includes("timeout") || message.includes("timed out") || message.includes("aborted")) {
      return new AIProviderError({ category: "timeout", message: error.message, providerId, retryable: true, statusCode: status, raw: error });
    }
    if (status === 400 || message.includes("validation") || message.includes("invalid request")) {
      return new AIProviderError({ category: "validation", message: error.message, providerId, retryable: false, statusCode: status, raw: error });
    }
    if (status === 451 || message.includes("content policy") || message.includes("safety") || message.includes("blocked")) {
      return new AIProviderError({ category: "content-policy", message: error.message, providerId, retryable: false, statusCode: status, raw: error });
    }
    if (status === 502 || status === 503 || status === 504 || message.includes("unavailable") || message.includes("service unavailable")) {
      return new AIProviderError({ category: "provider-unavailable", message: error.message, providerId, retryable: true, statusCode: status, raw: error });
    }
    if (message.includes("fetch") || message.includes("network") || message.includes("econnreset") || message.includes("enotfound")) {
      return new AIProviderError({ category: "network", message: error.message, providerId, retryable: true, statusCode: status, raw: error });
    }
    return new AIProviderError({ category: "unknown", message: error.message, providerId, retryable: false, statusCode: status, raw: error });
  }

  return new AIProviderError({
    category: "unknown",
    message: typeof error === "string" ? error : "Unknown error",
    providerId,
    retryable: false,
    raw: error,
  });
}

export function isRetryable(error: AIProviderError): boolean {
  return error.retryable && (error.category === "rate-limit" || error.category === "timeout" || error.category === "network" || error.category === "provider-unavailable");
}
