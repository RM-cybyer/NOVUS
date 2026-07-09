/** Dashboard data contracts. The UI consumes exactly these shapes;
    the backend (Supabase + runtime engines) will implement the same
    provider signature in a later module. */

export type SectionStatus = "ready" | "loading" | "empty" | "error" | "offline";

export type BriefingKind = "goal-risk" | "finance-alert" | "opportunity" | "info";

export interface BriefingItem {
  kind: BriefingKind;
  text: string;
  actionLabel: string;
  actionHref: string;
}

export interface Briefing {
  summary: string;
  items: BriefingItem[];
}

export type TaskPriority = "alta" | "media" | "baja";

export interface PriorityTask {
  id: string;
  title: string;
  priority: TaskPriority;
  done: boolean;
  estimatedMinutes: number;
  aiSuggested: boolean;
}

export interface CategorySpend {
  name: string;
  amount: number;
  share: number; // 0..1 relative to the largest category
  anomaly?: { overBy: number };
}

export interface FinanceOverview {
  income: number;
  expenses: number;
  cashFlow: number;
  savingsRate: number; // 0..1
  budgetUsed: number; // 0..1
  /** Cash-flow trend, oldest to newest, arbitrary units. */
  trend: number[];
  categories: CategorySpend[];
}

export interface GoalSummary {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadlineLabel: string;
  prediction: string;
  atRisk: boolean;
}

export interface BusinessSummary {
  monthRevenue: number;
  pendingInvoices: { count: number; amount: number };
  activeClients: number;
  activeProjects: number;
  opportunity: string;
}

export type MemoryKind = "meta" | "dato" | "preferencia" | "decision";

export interface MemoryInsight {
  kind: MemoryKind;
  text: string;
}

export type NotificationKind = "accent" | "danger" | "neutral";

export interface DashboardNotification {
  id: string;
  tag: string;
  kind: NotificationKind;
  body: string;
  timeLabel: string;
}

export interface DashboardSnapshot {
  userName: string;
  focus: string;
  briefing: Briefing;
  priorities: PriorityTask[];
  finance: FinanceOverview;
  goals: GoalSummary[];
  business: BusinessSummary;
  memories: MemoryInsight[];
  suggestedMemory: string;
  notifications: DashboardNotification[];
}
