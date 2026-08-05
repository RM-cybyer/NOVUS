# AI Services Layer

This layer implements a provider‑neutral API for interacting with multiple text generation providers. The main responsibilities are:

- **Provider Registry** – Stores available providers and their capabilities.
- **Model Registry** – Stores model metadata and selection rules.
- **Routing Engine** – Chooses the best model for a given workflow requirement.
- **Provider Adapters** – Translates the internal request/response contracts into provider‑specific HTTP calls.
- **Error Normalization** – Converts provider‑specific errors into a stable `AIProviderError` type.
- **Streaming Support** – Exposes a unified `async iterable` for text streams.
- **Fallback & Retry** – Implements policy‑driven retries and fallbacks based on model capability and sensitivity.

## Usage
```ts
import { AIService } from "@/services/ai";
import { loadAIConfig, buildProviderConfig } from "@/lib/ai/config";

const config = loadAIConfig(process.env);
const providerCfg = buildProviderConfig("nim", config);
const service = new AIService({ providerConfig: { nim: providerCfg } });

const resp = await service.invoke({
  modelAlias: "nova-reasoning",
  messages: [{ role: "user", content: "Hello" }],
  workflowType: "chat",
});
```

## Extending the Layer
- Add a new provider to `services/ai/providers` and update the registry.
- Register the provider in `registry` and expose a factory in `index.ts`.
- Ensure the model records include cost and latency metadata.
- Update routing criteria if the new provider has unique capabilities.

## Security
- No provider keys are hard‑coded.  They come from the environment via `lib/ai/config`.
- The public API never logs request payloads.  All network calls are encrypted.
- Sensitive workflows are gated by the routing engine.

## Roadmap
- Implement OpenAI, Anthropic, Gemini adapters.
- Add a policy engine to customise routing per user or org.
- Add telemetry & metrics.
"