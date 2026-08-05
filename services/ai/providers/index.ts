import type { AIProvider, AIProviderConfig, ProviderFactory } from "../provider";
import type { ProviderId } from "../types";
import { createNimProvider } from "./nim";

export interface AdapterRegistration {
  providerId: ProviderId;
  factory: ProviderFactory;
  available: boolean;
}

export const adapterRegistry: Record<ProviderId, AdapterRegistration> = {
  nim: { providerId: "nim", factory: createNimProvider, available: true },
  openai: { providerId: "openai", factory: makeUnavailable("openai"), available: false },
  anthropic: { providerId: "anthropic", factory: makeUnavailable("anthropic"), available: false },
  gemini: { providerId: "gemini", factory: makeUnavailable("gemini"), available: false },
  groq: { providerId: "groq", factory: makeUnavailable("groq"), available: false },
  openrouter: { providerId: "openrouter", factory: makeUnavailable("openrouter"), available: false },
  local: { providerId: "local", factory: makeUnavailable("local"), available: false },
};

function makeUnavailable(providerId: string): ProviderFactory {
  return (): AIProvider => {
    throw new Error(`Provider "${providerId}" is not yet supported. Reserved for future integration.`);
  };
}

export function getProvider(providerId: ProviderId, config: AIProviderConfig): AIProvider {
  const registration = adapterRegistry[providerId];
  if (!registration) {
    throw new Error(`Unknown provider: ${providerId}`);
  }
  if (!registration.available) {
    throw new Error(`Provider "${providerId}" is reserved for future integration.`);
  }
  return registration.factory(config);
}

export function listAvailableProviders(): AdapterRegistration[] {
  return Object.values(adapterRegistry).filter((r) => r.available);
}

export function registerProvider(providerId: ProviderId, factory: ProviderFactory, available: boolean): void {
  adapterRegistry[providerId] = { providerId, factory, available };
}
