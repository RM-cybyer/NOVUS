import Link from "next/link";
import { Compass } from "lucide-react";
import { EmptyState } from "@/components/primitives/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      icon={<Compass />}
      title="Esta pantalla no existe"
      description="El enlace puede estar desactualizado. Vuelve al inicio y sigue desde ahi."
      action={
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-(--radius-md) border border-(--color-border-strong) bg-(--color-surface-raised) px-5 text-sm font-semibold text-(--color-text-secondary) transition-colors duration-(--duration-fast) hover:bg-(--color-surface-pressed)"
        >
          Ir al inicio
        </Link>
      }
    />
  );
}
