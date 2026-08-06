/** Financial Hub data contracts, per blueprints/mvp-scope.md: income
    tracking, expense tracking, categories and financial overview.

    The UI consumes exactly these shapes. The provider behind them starts
    as a local snapshot and is replaced by Supabase queries keeping the
    same signature.

    Financial goals are not modelled here: they are goals with
    `unit: "moneda"` in `lib/goals/types.ts`. One concept, one module. */

export type TransactionKind = "ingreso" | "gasto";

export interface Category {
  id: string;
  name: string;
  kind: TransactionKind;
  /** Token name for the category dot, e.g. "--color-accent".
      Never a hex value: the UI resolves it through the token system. */
  colorToken: string;
}

export interface Transaction {
  id: string;
  kind: TransactionKind;
  /** Always positive. `kind` carries the direction, not the sign, so
      totals never depend on remembering to negate. */
  amount: number;
  description: string;
  categoryId: string;
  /** ISO date, e.g. "2026-08-05". */
  date: string;
  createdAt: number;
}

/** A category with its spend for the period being displayed. */
export interface CategoryTotal {
  category: Category;
  total: number;
  /** 0..1 relative to the largest category in the same period, for bar
      widths. Derived by the provider. */
  share: number;
}

/** Everything the overview needs, computed for one period. */
export interface FinanceOverview {
  income: number;
  expenses: number;
  /** income - expenses. May be negative. */
  cashFlow: number;
  /** 0..1. Zero when there is no income, never NaN. */
  savingsRate: number;
  byCategory: CategoryTotal[];
  /** Cash flow per period, oldest first, for the sparkline. */
  trend: number[];
}

export interface CreateTransactionInput {
  kind: TransactionKind;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

/** Income minus expenses over a set of transactions. */
export function netFlow(transactions: Transaction[]): number {
  return transactions.reduce(
    (acc, t) => acc + (t.kind === "ingreso" ? t.amount : -t.amount),
    0,
  );
}

/** Share of income not spent, clamped to 0..1. Returns 0 rather than
    NaN when there is no income. */
export function savingsRate(income: number, expenses: number): number {
  if (income <= 0) return 0;
  return Math.max(0, Math.min((income - expenses) / income, 1));
}
