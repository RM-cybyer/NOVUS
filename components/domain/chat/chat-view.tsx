"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Loader2, AlertTriangle } from "lucide-react";
import type {
  ChatMessage,
  ChatMessageMetadata,
  DecisionCard,
  SuggestedAction,
} from "@/lib/chat/types";
import type { ChatTurn } from "@/lib/chat/prompt";
import { streamChat } from "@/lib/chat/client";
import { ChatMessageBubble } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@/components/primitives/scroll-area";

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

function SuggestedActionsList({ actions, onSelect }: { actions: SuggestedAction[]; onSelect: (prompt: string) => void }) {
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

/** Patch the streaming assistant message in place, appending it on the
    first delta. */
function upsertAssistant(
  messages: ChatMessage[],
  id: string,
  patch: Partial<ChatMessage> & { content: string },
): ChatMessage[] {
  const idx = messages.findIndex((m) => m.id === id);
  if (idx === -1) {
    return [...messages, { id, role: "assistant", timestamp: Date.now(), ...patch }];
  }
  const current = messages[idx];
  if (!current) return messages;
  const next = [...messages];
  next[idx] = { ...current, ...patch };
  return next;
}

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isReasoning, setIsReasoning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const reduce = useReducedMotion() ?? false;

  // Abort an in-flight response if the view unmounts mid-stream.
  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [messages, isStreaming, reduce]);

  const handleSend = useCallback(
    async (text: string) => {
      // Built from the state we can read now: setMessages has not flushed,
      // so the new turn is appended explicitly.
      const turns: ChatTurn[] = [
        ...messages
          .filter((m): m is ChatMessage & { role: "user" | "assistant" } =>
            m.role === "user" || m.role === "assistant",
          )
          .map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: text },
      ];

      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, role: "user", content: text, timestamp: Date.now() },
      ]);
      setShowSuggestions(false);
      setIsStreaming(true);
      setError(null);

      const assistantId = `msg-${Date.now() + 1}`;
      const controller = new AbortController();
      abortRef.current = controller;

      let content = "";
      let metadata: ChatMessageMetadata | undefined;
      let streamError: string | null = null;

      try {
        for await (const chunk of streamChat(turns, controller.signal)) {
          if (chunk.type === "reasoning") {
            // Only a signal that thinking is underway; the trace itself is
            // deliberately not rendered.
            setIsReasoning(true);
          } else if (chunk.type === "delta") {
            setIsReasoning(false);
            content += chunk.delta;
            setMessages((prev) => upsertAssistant(prev, assistantId, { content }));
          } else if (chunk.type === "done") {
            metadata = chunk.metadata;
          } else {
            streamError = chunk.error;
          }
        }
      } catch (err) {
        // An abort is the user leaving, not a failure worth surfacing.
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          streamError = err instanceof Error ? err.message : "Error desconocido";
        }
      }

      if (streamError) setError(streamError);

      const decisionCards = content.includes("DECISION_CARD:")
        ? parseTaggedBlocks<DecisionCard>(content, "DECISION_CARD")
        : undefined;
      const suggestedActions = content.includes("SUGGESTED_ACTION:")
        ? parseTaggedBlocks<SuggestedAction>(content, "SUGGESTED_ACTION")
        : undefined;

      const cleaned = content
        .replace(/DECISION_CARD:.*?---/gs, "")
        .replace(/SUGGESTED_ACTION:.*?---/gs, "")
        .trim();

      if (cleaned || metadata) {
        setMessages((prev) =>
          upsertAssistant(prev, assistantId, {
            content: cleaned,
            metadata,
            decisionCards,
            suggestedActions,
          }),
        );
      }

      abortRef.current = null;
      setIsReasoning(false);
      setIsStreaming(false);
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
              {isReasoning ? "Razonando..." : "Escribiendo..."}
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
                <SuggestedActionsList actions={SUGGESTED_PROMPTS} onSelect={handleSuggestion} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decision cards and suggested actions render inside their own bubble. */}
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              isStreaming={isStreaming && message.id === messages[messages.length - 1]?.id && message.role === "assistant"}
              reduce={reduce}
            />
          ))}

          {/* Only while thinking: once answer tokens arrive the message
              itself carries the streaming cursor. */}
          {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
            <TypingIndicator reduce={reduce} />
          )}

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

/** Parse the inline `MARKER: {json} ---` blocks the model emits. */
function parseTaggedBlocks<T>(content: string, marker: string): T[] {
  const parsed: T[] = [];
  const regex = new RegExp(`${marker}:\\s*({[\\s\\S]*?})\\s*---`, "g");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const raw = match[1];
    if (!raw) continue;
    try {
      parsed.push(JSON.parse(raw) as T);
    } catch {
      // ignore malformed block
    }
  }
  return parsed;
}