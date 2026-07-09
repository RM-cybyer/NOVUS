"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/primitives/button";
import { EmptyState } from "@/components/primitives/empty-state";

/** Route error boundary. Honest, recoverable, never exposes internals. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[novus] route error:", error);
  }, [error]);

  return (
    <EmptyState
      icon={<TriangleAlert />}
      title="Algo salio mal"
      description="No perdiste nada: tus datos estan a salvo. Puedes reintentar ahora mismo."
      action={
        <Button variant="secondary" onClick={reset}>
          <RotateCcw className="size-4" aria-hidden />
          Reintentar
        </Button>
      }
    />
  );
}
