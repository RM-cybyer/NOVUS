"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import type { ChatMessage, DecisionCard, SuggestedAction } from "@/lib/chat/types";
import type { ModelRequest } from "@/services/ai/types";
import { loadAIConfig, buildProviderConfig } from "@/lib/ai/config";
import { AIService } from "@/services/ai";
import { ChatMessageBubble } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@/components/primitives/scroll-area";
import { Badge } from "@/components/primitives/badge";
import { cn } from "@/lib/utils/cn";

const WELCOME_MESSAGES = [
  "Hola. En qué te ayudo hoy?",
  "¿Qué decisión tienes entre manos?",
  "Cuéntame qué necesitas resolver.",
];

const SUGGESTED_PROMPTS: SuggestedAction[] = [
  { id: "s1", label: "Analizar mis finanzas", prompt: "Analiza mi situación financiera actual y dame recomendaciones", icon: "💰" },
  { id: "s2", label: "Revisar mis metas", prompt: "¿Cómo voy con mis metas? ¿Hay alguna en riesgo?", icon: "🎯" },
  { id: "s3", label: "Planificar la semana", prompt: "Ayúdame a planificar mi semana basándote en mi agenda y prioridades", icon: "📅" },
  { id: "s4", label: "Resumir memoria", prompt: "¿Qué cosas importantes recuerda Novus de mí?", icon: "🧠" },
];

function TypingIndicator({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-surface-raised) text-(--color-text-tertiary) text-[11px] font-medium" aria-hidden>
        <Sparkles className="size-3.5" />
      </div>
      <div className="flex gap-1 items-end h-6 px-3 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface)">
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          className="block h-1.5 w-1.5 rounded-full bg-(--color-text-muted)"
        />
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
          className="block h-1.5 w-1.5 rounded-full bg-(--color-text-muted)"
        />
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          className="block h-1.5 w-1.5 rounded-full bg-(--color-text-muted)"
        />
      </div>
    </motion.div>
  );
}

function DecisionCard({ card, reduce }: { card: DecisionCard; reduce: boolean }) {
  const kindMeta: Record<DecisionCard["kind"], { label: string; icon: string }> = {
    finance: { label: "Finanzas", icon: "💰" },
    goal: { label: "Meta", icon: "🎯" },
    calendar: { label: "Agenda", icon: "📅" },
    business: { label: "Negocio", icon: "🏢" },
    memory: { label: "Memoria", icon: "🧠" },
    info: { label: "Info", icon: "ℹ️" },
  };
  const meta = kindMeta[card.kind];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="group flex gap-3 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface) p-4 transition-colors hover:border-(--color-border-strong)"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-lg) bg-(--color-surface-raised) text-[18px]" aria-hidden>
        {meta.icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge kind={card.priority === "high" ? "danger" : card.priority === "medium" ? "accent" : "neutral"}>
            {meta.label}
          </Badge>
          <h4 className="font-semibold text-(--color-text-primary)">{card.title}</h4>
        </div>
        <p className="mt-1 text-[13px] leading-snug text-(--color-text-secondary) line-clamp-2">{card.description}</p>
        <a
          href={card.actionHref}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-(--color-accent) hover:text-(--color-accent-text) transition-colors"
        >
          {card.actionLabel}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </motion.div>
  );
}

function SuggestedActionsList({ actions, onSelect, reduce }: { actions: SuggestedAction[]; onSelect: (prompt: string) => void; reduce: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-(--letter-spacing-caps) text-(--color-text-tertiary)">
        Sugerencias
      </p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            onClick={() => onSelect(action.prompt)}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) px-3 py-2 text-left text-sm font-medium text-(--color-text-secondary) transition-colors duration-(--duration-fast) hover:border-(--color-border-strong) hover:bg-(--color-surface-raised)"
          >
            <span className="text-[16px]" aria-hidden>{action.icon}</span>
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const aiService = useRef<AIService | null>(null);

  useEffect(() => {
    const env = typeof window !== "undefined" ? (window as { __ENV__?: Record<string, string | undefined> }).__ENV__ : undefined;
    const config = loadAIConfig(env);
    const providerConfig = buildProviderConfig("nim", config);
    aiService.current = new AIService({ providerConfig: { nim: providerConfig } });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, isStreaming, reduce]);

  const handleSend = useCallback(
    async (text: string, _attachments?: File[]) => {
      if (!aiService.current) return;

      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setShowSuggestions(false);
      setIsStreaming(true);
      setError(null);

      const assistantMessageId = `msg-${Date.now() + 1}`;
      let fullContent = "";
      let finalMetadata: ChatMessage["metadata"];
      let decisionCards: DecisionCard[] = [];
      let suggestedActions: SuggestedAction[] = [];

      try {
        const request: ModelRequest = {
          modelAlias: "nova-reasoning",
          messages: [
            ...messages.slice(-10).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: text },
          ],
          systemPrompt:
            "Eres Novus, el AI Operating System para la vida, finanzas y negocios. Actúas como Chief of Staff, Strategic Advisor, Financial Advisor y Second Brain. Comprendes al usuario profundamente. Analiza antes de responder. Explica el porqué. Conecta información. Genera recomendaciones accionables con decision cards. Nunca respondas solo por responder.",
          stream: true,
          sensitivity: "internal",
          workflowType: "chat",
        };

        for await (const chunk of aiService.current.stream(request)) {
          fullContent += chunk.delta;
          if (chunk.metadata) finalMetadata = chunk.metadata;

          setMessages((prev) => {
            const idx = prev.findIndex((m) => m.id === assistantMessageId);
            if (idx === -1) {
              return [
                ...prev,
                {
                  id: assistantMessageId,
                  role: "assistant" as const,
                  content: fullContent,
                  timestamp: Date.now(),
                  metadata: finalMetadata
                    ? {
                        alias: finalMetadata.alias,
                        providerId: finalMetadata.providerId,
                        latencyMs: finalMetadata.latencyMs ?? 0,
                        tokens: finalMetadata.tokens
                          ? {
                              promptTokens: finalMetadata.tokens.promptTokens,
                              completionTokens: finalMetadata.tokens.completionTokens,
                              totalTokens: finalMetadata.tokens.totalTokens,
                            }
                          : undefined,
                        costUsd: finalMetadata.costUsd,
                      }
                    : undefined,
                },
              ];
            }
            const next = [...prev];
            const current = next[idx];
            if (!current) return next;
            next[idx] = {
              id: current.id,
              role: current.role,
              content: fullContent,
              timestamp: current.timestamp,
              metadata: finalMetadata
                ? {
                    alias: finalMetadata.alias,
                    providerId: finalMetadata.providerId,
                    latencyMs: finalMetadata.latencyMs ?? 0,
                    tokens: finalMetadata.tokens
                      ? {
                          promptTokens: finalMetadata.tokens.promptTokens,
                          completionTokens: finalMetadata.tokens.completionTokens,
                          totalTokens: finalMetadata.tokens.totalTokens,
                        }
                      : undefined,
                    costUsd: finalMetadata.costUsd,
                  }
                : undefined,
              toolCallId: current.toolCallId,
              toolCalls: current.toolCalls,
              decisionCards: current.decisionCards,
              suggestedActions: current.suggestedActions,
            };
            return next;
          });
        }

        if (fullContent.includes("DECISION_CARD:")) {
          const cards = parseDecisionCards(fullContent);
          decisionCards = cards;
          fullContent = fullContent.replace(/DECISION_CARD:.*?---/gs, "");
        }

        if (fullContent.includes("SUGGESTED_ACTION:")) {
          const actions = parseSuggestedActions(fullContent);
          suggestedActions = actions;
          fullContent = fullContent.replace(/SUGGESTED_ACTION:.*?---/gs, "");
        }

        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === assistantMessageId);
          if (idx === -1) return prev;
          const next = [...prev];
          const current = next[idx];
          if (!current) return prev;
          next[idx] = {
            id: current.id,
            role: current.role,
            content: fullContent,
            timestamp: current.timestamp,
            metadata: finalMetadata
              ? {
                  alias: finalMetadata.alias,
                  providerId: finalMetadata.providerId,
                  latencyMs: finalMetadata.latencyMs ?? 0,
                  tokens: finalMetadata.tokens
                    ? {
                        promptTokens: finalMetadata.tokens.promptTokens,
                        completionTokens: finalMetadata.tokens.completionTokens,
                        totalTokens: finalMetadata.tokens.totalTokens,
                      }
                    : undefined,
                  costUsd: finalMetadata.costUsd,
                }
              : undefined,
            toolCallId: current.toolCallId,
            toolCalls: current.toolCalls,
            decisionCards,
            suggestedActions,
          };
          return next;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === assistantMessageId);
          if (idx === -1) return prev;
          const next = [...prev];
          const current = next[idx];
          if (!current) return prev;
          next[idx] = {
            ...current,
            content: fullContent + "\n\n⚠️ " + (err instanceof Error ? err.message : "Error"),
          };
          return next;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages],
  );

  const handleSuggestion = useCallback((prompt: string) => {
    handleSend(prompt);
  }, [handleSend]);

  const handleRetry = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-(--color-border) bg-(--color-bg-warm) px-4 py-3">
        <div className="flex items-center gap-3">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex size-9 items-center justify-center rounded-(--radius-xl) bg-(--color-accent)/10"
          >
            <Sparkles className="size-5 text-(--color-accent)" aria-hidden />
          </motion.div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-(--letter-spacing-title) text-(--color-text-primary)">
              Novus
            </h1>
            <p className="text-[11px] text-(--color-text-muted)">Chief of Staff · Strategic Advisor · Second Brain</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isStreaming && (
            <motion.span
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-(--color-accent)/10 px-2.5 py-1 text-[11px] font-medium text-(--color-accent)"
            >
              <Loader2 className="size-3 animate-spin" aria-hidden />
              Pensando...
            </motion.span>
          )}
        </div>
      </header>

      <ScrollArea className="flex-1 overflow-y-auto" aria-label="Conversación">
        <div className="flex flex-col gap-4 px-4 py-4">
          <AnimatePresence initial={false}>
            {messages.length === 0 && !isStreaming && showSuggestions && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <motion.div
                  initial={false}
                  animate={{ scale: 1 }}
                  className="flex size-16 items-center justify-center rounded-2xl bg-(--color-accent)/10"
                >
                  <Sparkles className="size-8 text-(--color-accent)" aria-hidden />
                </motion.div>
                <div className="max-w-xs">
                  <h2 className="font-display text-xl font-semibold text-(--color-text-primary)">
                    {WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]}
                  </h2>
                  <p className="mt-2 text-sm text-(--color-text-tertiary)">
                    Soy tu AI Operating System. Puedo analizar finanzas, revisar metas, planificar tu agenda,
                    recordar lo importante y ayudarte a tomar mejores decisiones.
                  </p>
                </div>
                <SuggestedActionsList actions={SUGGESTED_PROMPTS} onSelect={handleSuggestion} reduce={reduce} />
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              isStreaming={isStreaming && message.id === messages[messages.length - 1]?.id && message.role === "assistant"}
              reduce={reduceMotion}
            />
          ))}

          {messages.length > 0 && messages[messages.length - 1]?.decisionCards && messages[messages.length - 1].decisionCards.length > 0 && (
            <DecisionCards cards={messages[messages.length - 1].decisionCards!} reduce={reduce} 
            />
          )}

          {messages.length > 0 && messages[messages.length - 1]?.suggestedActions && messages[messages.length - 1].suggestedActions.length > 0 && (
<SuggestedActionsList
            actions={messages[messages.length - 1].suggestedActions!}
            onSelect={handleSuggestion}
            reduce={reduce}
          />
          )}

          {isStreaming && <TypingIndicator reduce={reduce} />}

          {error && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-(--radius-xl) border border-(--color-danger-text)/30 bg-(--color-danger-text)/10 p-3 text-sm text-(--color-danger-text)"
              role="alert"
            >
              <AlertTriangle className="size-4 shrink-0" aria-hidden />
              <span className="flex-1">{error}</span>
              <button
                onClick={handleRetry}
                className="shrink-0 rounded font-semibold text-(--color-danger-text) hover:underline"
              >
                Reintentar
              </button>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}

function DecisionCards({ cards, reduce }: { cards: DecisionCard[]; reduce: boolean }) {
  if (!cards.length) return null;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 mt-3"
    >
      {cards.map((card) => (
        <DecisionCard key={card.id} card={card} reduce={reduce} />
      ))}
    </motion.div>
  );
}

function parseDecisionCards(content: string): DecisionCard[] {
  const cards: DecisionCard[] = [];
  const regex = /DECISION_CARD:\s*({[\s\S]*?})\s*---/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    try {
      const card = JSON.parse(match[1]);
      cards.push(card);
    } catch {
      // ignore malformed
    }
  }
  return cards;
}

function parseSuggestedActions(content: string): SuggestedAction[] {
  const actions: SuggestedAction[] = [];
  const regex = /SUGGESTED_ACTION:\s*({[\s\S]*?})\s*---/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    try {
      const action = JSON.parse(match[1]);
      actions.push(action);
    } catch {
      // ignore malformed
    }
  }
  return actions;
}