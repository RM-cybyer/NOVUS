"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/lib/chat/types";

const renderers: Record<string, React.ComponentType<any>> = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded bg-(--color-surface-raised) px-1.5 py-0.5 text-[12px] font-mono text-(--color-accent)">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-(--radius-lg) bg-(--color-surface-raised) p-3 text-[12px] font-mono text-(--color-text-secondary)">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-(--color-accent) pl-3 italic text-(--color-text-tertiary)">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-(--color-accent) hover:text-(--color-accent-text) underline underline-offset-2"
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ children }) => <h1 className="text-lg font-semibold mb-2 mt-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-semibold mb-2 mt-4">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-3">{children}</h3>,
};

interface MarkdownMessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function MarkdownMessage({ message, isStreaming }: MarkdownMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return <div className="whitespace-pre-wrap break-words">{message.content}</div>;
  }

  return (
    <div className="whitespace-pre-wrap break-words">
      <ReactMarkdown
        components={renderers}
        remarkPlugins={[remarkGfm]}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}

export function MessageMeta({ message }: { message: ChatMessage }) {
  if (!message.metadata) return null;

  return (
    <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-(--color-text-muted)">
      <span>{message.metadata.alias}</span>
      <span>·</span>
      <span>{message.metadata.latencyMs}ms</span>
      {message.metadata.tokens && (
        <>
          <span>·</span>
          <span>{message.metadata.tokens.totalTokens} tok</span>
        </>
      )}
      {message.metadata.costUsd && (
        <>
          <span>·</span>
          <span>${message.metadata.costUsd.toFixed(4)}</span>
        </>
      )}
    </div>
  );
}