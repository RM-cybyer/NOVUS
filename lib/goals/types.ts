/** Goal data contracts, per blueprints/mvp-scope.md: create, update,
    progress tracking, deadlines, priorities and status.

    The UI consumes exactly these shapes. The provider behind them starts
    as a local snapshot and is replaced by Supabase queries keeping the
    same signature — the seam `lib/dashboard/demo-data.ts` documents.

    These are the goals the assistant reasons over. `lib/dashboard/types.ts`
    carries a narrower `GoalSummary` for the dashboard card; this module
    owns the full record. */

export type GoalStatus = "activa" | "pausada" | "completada" | "archivada";

export type GoalPriority = "alta" | "media" | "baja";

/** What `target` and `current` count. Goals are not always financial:
    "ahorrar $5.000" and "leer 12 libros" are both goals. */
export type GoalUnit = "moneda" | "cantidad";

export interface Goal {
  id: string;
  name: string;
  description: string;
  /** The value that completes the goal. Always > 0. */
  target: number;
  /** Progress so far, in the same unit. May exceed `target`. */
  current: number;
  unit: GoalUnit;
  /** ISO date, e.g. "2026-12-31". Null when the goal has no deadline. */
  deadline: string | null;
  priority: GoalPriority;
  status: GoalStatus;
  createdAt: number;
  updatedAt: number;
}

/** Fields a user sets when creating a goal. `current` starts at 0 and
    `status` starts as "activa"; neither is chosen at creation. */
export interface CreateGoalInput {
  name: string;
  description: string;
  target: number;
  unit: GoalUnit;
  deadline: string | null;
  priority: GoalPriority;
}

/** Every field optional: a partial update patches only what it carries. */
export type UpdateGoalInput = Partial<CreateGoalInput & {
  current: number;
  status: GoalStatus;
}>;

/** Completion as 0..1, clamped. Derived, never stored — a stored
    percentage drifts out of sync with `current` and `target`. */
export function goalProgress(goal: Pick<Goal, "current" | "target">): number {
  if (goal.target <= 0) return 0;
  return Math.min(goal.current / goal.target, 1);
}

/** A goal is at risk when its deadline has passed or is close while
    progress lags well behind. Used for the risk badge and, later, by the
    assistant. `now` is injected so the result stays deterministic. */
export function isGoalAtRisk(goal: Goal, now: number = Date.now()): boolean {
  if (goal.status !== "activa" || !goal.deadline) return false;

  const deadlineMs = new Date(goal.deadline).getTime();
  if (Number.isNaN(deadlineMs)) return false;
  if (deadlineMs < now) return true;

  const daysLeft = (deadlineMs - now) / 86_400_000;
  return daysLeft <= 30 && goalProgress(goal) < 0.75;
}
