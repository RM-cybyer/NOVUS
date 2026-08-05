"use client";

import { useState, useRef, useCallback, useEffect, KeyboardEvent } from "react";
import { Mic, Paperclip, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/primitives/button";
import { cn } from "@/lib/utils/cn";

interface ChatInputProps {
  onSend: (text: string, attachments?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Escribe tu mensaje..." }: ChatInputProps) {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showAttachments, setShowAttachments] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;
    onSend(trimmed, attachments.length > 0 ? attachments : undefined);
    setText("");
    setAttachments([]);
    setShowAttachments(false);
    textareaRef.current?.focus();
  }, [text, attachments, onSend]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      setAttachments((prev) => [...prev, ...files]);
      setShowAttachments(true);
    }
    e.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="relative flex flex-col gap-2 border-t border-(--color-border) bg-(--color-bg-warm) p-4">
      {showAttachments && attachments.length > 0 && (
        <div className="flex flex-wrap gap-2" role="list" aria-label="Adjuntos">
          {attachments.map((file, i) => (
            <div key={`${file.name}-${i}`} className="flex items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) px-2.5 py-1 text-[12px] text-(--color-text-secondary)" role="listitem">
              <Paperclip className="size-3.5 text-(--color-accent)" aria-hidden />
              <span className="truncate max-w-[160px]">{file.name}</span>
              <span className="text-(--color-text-muted)">{Math.round(file.size / 1024)} KB</span>
              <button
                onClick={() => removeAttachment(i)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-(--color-text-muted) hover:text-(--color-text-secondary) hover:bg-(--color-surface-raised)"
                aria-label={`Quitar ${file.name}`}
              >
                <span className="text-[14px] leading-none">×</span>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) text-(--color-text-tertiary) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised) hover:text-(--color-text-secondary) disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Adjuntar archivo"
        >
          <Paperclip className="size-4.5" aria-hidden />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.txt,.md,.csv,.json,.png,.jpg,.jpeg,.webp"
            className="sr-only"
            onChange={handleFileSelect}
            disabled={disabled}
          />
        </button>

        <div className="relative flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className="w-full min-h-[44px] max-h-48 resize-none rounded-(--radius-xl) border border-(--color-border) bg-(--color-surface) px-4 py-3 text-[14.5px] text-(--color-text-secondary) placeholder-(--color-text-muted) focus:border-(--color-border-strong) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/20 transition-colors duration-(--duration-fast) disabled:opacity-50 disabled:cursor-not-allowed pr-12"
            aria-label="Mensaje"
            style={{ lineHeight: "1.5" }}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={disabled || (!text.trim() && attachments.length === 0)}
          variant="primary"
          size="sm"
          className="h-10 w-10 shrink-0 rounded-(--radius-xl)"
          aria-label="Enviar mensaje"
        >
          <Send className="size-4.5" aria-hidden />
        </Button>

        <button
          disabled={disabled}
          className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) text-(--color-text-tertiary) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-raised) hover:text-(--color-text-secondary) disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Modo voz (próximamente)"
        >
          <Mic className="size-4.5" aria-hidden />
        </button>
      </div>

      <p className="text-[11px] text-(--color-text-muted)">
        {text.length > 0 ? `${text.length}/4000` : "Enter para enviar · Shift+Enter para nueva línea"}
      </p>
    </div>
  );
}