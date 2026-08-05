"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { ChatMessage, ChatRole } from "@/lib/chat/types";
import { MarkdownMessage, MessageMeta } from "./markdown-message";

const ROLE_AVATAR: Record<ChatRole, string> = {
  user: "👤",
  assistant: "🤖",
  system: "⚙️",
  tool: "🔧",
};

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
  reduce: boolean;
}

export function ChatMessageBubble({ message, isStreaming, reduce }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "flex gap-3 max-w-[85%]",
        isUser ? "self-end flex-row-reverse" : "self-start",
      )}
    >
      {!isUser && (
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-accent)/10 text-(--color-accent) text-[11px] font-medium"
          aria-hidden
        >
          {ROLE_AVATAR[message.role]}
        </div>
      )}

      <div
        className={cn(
          "relative rounded-(--radius-2xl) px-4 py-2.5 text-[14.5px] leading-relaxed",
          isUser
            ? "bg-(--color-accent) text-(--color-on-accent) rounded-br-sm"
            : "bg-(--color-surface) border border-(--color-border) text-(--color-text-secondary) rounded-bl-sm",
        )}
      >
        <MarkdownMessage message={message} isStreaming={isStreaming} />

        {!isStreaming && (
          <>
            <MessageMeta message={message} />
            {message.decisionCards && message.decisionCards.length > 0 && (
              <DecisionCards cards={message.decisionCards} reduce={reduce} />
            )}
            {message.suggestedActions && message.suggestedActions.length > 0 && (
              <SuggestedActionsList actions={message.suggestedActions} onSelect={() => {}} reduce={reduce} />
            )}
          </>
        )}
      </div>

      {isUser && (
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--color-surface-raised) text-(--color-text-tertiary) text-[11px] font-medium"
          aria-hidden
        >
          {ROLE_AVATAR.user}
        </div>
      )}
    </motion.div>
  );
}

function DecisionCards({ cards, reduce }: { cards: ChatMessage["decisionCards"]; reduce: boolean }) {
  const kindMeta: Record<NonNullable<ChatMessage["decisionCards"]>[number]["kind"], { label: string; icon: string }> = {
    finance: { label: "Finanzas", icon: "💰" },
    goal: { label: "Meta", icon: "🎯" },
    calendar: { label: "Agenda", icon: "📅" },
    business: { label: "Negocio", icon: "🏢" },
    memory: { label: "Memoria", icon: "🧠" },
    info: { label: "Info", icon: "ℹ️" },
  };

  if (!cards || cards.length === 0) return null;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-3 flex flex-col gap-2"
    >
      {cards.map((card) => {
        const meta = kindMeta[card.kind];
        return (
          <motion.div
            key={card.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex gap-3 rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface) p-4 transition-colors hover:border-(--color-border-strong)"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-lg) bg-(--color-surface-raised) text-[18px]" aria-hidden>
              {meta.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-(--color-accent)/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-(--letter-spacing-caps) text-(--color-accent)">
                  {meta.label}
                </span>
                <h4 className="font-semibold text-(--color-text-primary)">{card.title}</h4>
              </div>
              <p className="mt-1 text-[13px] text-(--color-text-secondary) line-clamp-2">{card.description}</p>
              <a
                href={card.actionHref}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-(--color-accent) hover:text-(--color-accent-text) transition-colors"
              >
                {card.actionLabel}
                <span className="text-[16px] leading-none" aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function SuggestedActionsList({ actions, onSelect, reduce }: { actions: ChatMessage["suggestedActions"]; onSelect: (prompt: string) => void; reduce: boolean }) {
  if (!actions || actions.length === 0) return null;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-3 flex flex-col gap-2"
    >
      <p className="text-[11px] font-semibold uppercase tracking-(--letter-spacing-caps) text-(--color-text-tertiary)">
        Sugerencias
      </p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            onClick={() => onSelect(action.prompt)}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) px-3 py-2 text-left text-sm font-medium text-(--color-text-secondary) transition-colors duration-(--duration-fast) hover:border-(--color-border-strong) hover:bg-(--color-surface-raised)"
          >
            <span className="text-[16px]" aria-hidden>{action.icon}</span>
            <span>{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}