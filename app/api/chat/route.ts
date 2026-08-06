import { z } from "zod";
import { AIService } from "@/services/ai";
import { AIProviderError, type ErrorCategory } from "@/services/ai/errors";
import { buildProviderConfig, isAIConfigured, loadAIConfig } from "@/lib/ai/config";
import { buildChatRequest, dashboardToChatContext } from "@/lib/chat/prompt";
import { getDashboardSnapshot } from "@/lib/dashboard/demo-data";

/** Node runtime: the NIM adapter uses fetch streaming and a timeout that
    both behave predictably here. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RequestBody = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(16_000),
      }),
    )
    .min(1)
    .max(50),
});

/** Provider failures map to the status that best describes the cause, so
    the client can tell "you have no key" from "the provider is down". */
const STATUS_BY_CATEGORY: Record<ErrorCategory, number> = {
  auth: 502,
  "rate-limit": 429,
  timeout: 504,
  validation: 400,
  "content-policy": 422,
  "provider-unavailable": 502,
  network: 502,
  "policy-block": 403,
  unknown: 500,
};

/** User-facing copy. Provider messages can carry request details, so they
    are logged server-side and never returned verbatim. */
const MESSAGE_BY_CATEGORY: Record<ErrorCategory, string> = {
  auth: "Novus no pudo autenticarse con el proveedor de IA.",
  "rate-limit": "Demasiadas solicitudes seguidas. Espera unos segundos.",
  timeout: "El modelo tardo demasiado en responder.",
  validation: "La solicitud no es valida.",
  "content-policy": "El contenido fue bloqueado por politica del proveedor.",
  "provider-unavailable": "El proveedor de IA no esta disponible ahora mismo.",
  network: "No se pudo conectar con el proveedor de IA.",
  "policy-block": "Ningun modelo disponible cumple la politica de esta solicitud.",
  unknown: "Ocurrio un error inesperado.",
};

function sseFrame(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function errorResponse(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "El cuerpo de la solicitud no es JSON valido.");
  }

  const parsed = RequestBody.safeParse(body);
  if (!parsed.success) {
    return errorResponse(400, "La conversacion enviada no tiene el formato esperado.");
  }

  let config;
  try {
    config = loadAIConfig();
  } catch (error) {
    console.error("[api/chat] invalid AI configuration", error);
    return errorResponse(500, "La configuracion de IA del servidor no es valida.");
  }

  if (!isAIConfigured(config)) {
    return errorResponse(
      503,
      "Falta la API key del proveedor de IA. Define NOVUS_AI_NIM_API_KEY en el entorno del servidor.",
    );
  }

  const snapshot = await getDashboardSnapshot();
  const modelRequest = buildChatRequest(parsed.data.messages, dashboardToChatContext(snapshot));

  const ai = new AIService({ providerConfig: { nim: buildProviderConfig("nim", config) } });

  // Routing runs before the stream opens so a policy block or an unknown
  // alias returns a real status code instead of a 200 with an error frame.
  try {
    ai.route(modelRequest);
  } catch (error) {
    const normalized =
      error instanceof AIProviderError
        ? error
        : new AIProviderError({
            category: "unknown",
            message: (error as Error).message,
            providerId: "router",
            retryable: false,
          });
    console.error("[api/chat] routing failed", normalized.toJSON());
    return errorResponse(
      STATUS_BY_CATEGORY[normalized.category],
      MESSAGE_BY_CATEGORY[normalized.category],
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of ai.stream(modelRequest, { signal: request.signal })) {
          // Reasoning is streamed so the UI can show the model thinking
          // instead of a silent gap, but it never joins the answer text.
          if (chunk.reasoningDelta) {
            controller.enqueue(
              encoder.encode(sseFrame({ type: "reasoning", delta: chunk.reasoningDelta })),
            );
          }
          if (chunk.delta) {
            controller.enqueue(encoder.encode(sseFrame({ type: "delta", delta: chunk.delta })));
          }
          if (chunk.done) {
            controller.enqueue(
              encoder.encode(sseFrame({ type: "done", metadata: chunk.metadata })),
            );
          }
        }
      } catch (error) {
        // The stream already returned 200, so failures mid-flight can only
        // be reported as a frame the client turns back into an error.
        const normalized =
          error instanceof AIProviderError
            ? error
            : new AIProviderError({
                category: "unknown",
                message: (error as Error).message,
                providerId: "nim",
                retryable: false,
              });
        console.error("[api/chat] stream failed", normalized.toJSON());
        controller.enqueue(
          encoder.encode(
            sseFrame({ type: "error", error: MESSAGE_BY_CATEGORY[normalized.category] }),
          ),
        );
      } finally {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
