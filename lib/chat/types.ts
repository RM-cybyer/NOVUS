/** Chat data contracts. The UI consumes exactly these shapes;
    the backend (runtime engines + memory) will implement the same
    provider signature in a later module. */

export type ChatRole = "user" | "assistant" | "system" | "tool";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  toolCallId?: string;
  toolCalls?: ToolCall[];
  metadata?: ChatMessageMetadata;
  decisionCards?: DecisionCard[];
  suggestedActions?: SuggestedAction[];
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface ChatMessageMetadata {
  alias: string;
  modelId?: string;
  providerId?: string;
  latencyMs?: number;
  tokens?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  costUsd?: number;
  finishReason?: string;
  requestId?: string;
}

export interface DecisionCard {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  kind: "finance" | "goal" | "calendar" | "business" | "memory" | "info";
  priority: "high" | "medium" | "low";
}

export interface SuggestedAction {
  id: string;
  label: string;
  prompt: string;
  icon?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  messageCount: number;
  lastMessage?: string;
  context?: ChatContext;
}

export interface ChatContext {
  userProfile?: UserProfileSnapshot;
  activeGoals?: GoalSnapshot[];
  financialSummary?: FinancialSnapshot;
  upcomingEvents?: EventSnapshot[];
  recentMemories?: MemorySnapshot[];
}

export interface UserProfileSnapshot {
  name: string;
  focus?: string;
}

export interface GoalSnapshot {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadlineLabel: string;
  atRisk: boolean;
}

export interface FinancialSnapshot {
  income: number;
  expenses: number;
  cashFlow: number;
  savingsRate: number;
}

export interface EventSnapshot {
  id: string;
  title: string;
  timeLabel: string;
  kind: "evento" | "pago" | "recordatorio" | "reunion" | "compromiso";
}

export interface MemorySnapshot {
  kind: "meta" | "dato" | "preferencia" | "decision";
  text: string;
}

export type ChatStreamChunk =
  | { type: "delta"; delta: string; messageId?: string }
  /** Thinking tokens from a reasoning model, streamed so the UI can show
      progress. Never part of the answer shown to the user. */
  | { type: "reasoning"; delta: string; messageId?: string }
  | { type: "done"; messageId?: string; metadata?: ChatMessageMetadata }
  | { type: "error"; error: string };

export interface SendMessageRequest {
  sessionId: string;
  content: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
  session: ChatSession;
}