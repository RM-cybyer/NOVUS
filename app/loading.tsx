import { Skeleton } from "@/components/primitives/skeleton";

/** Route-level loading state. Mirrors the typical page layout. */
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 pt-10" aria-busy>
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-28 w-full rounded-(--radius-2xl)" />
      <Skeleton className="h-28 w-full rounded-(--radius-2xl)" />
    </div>
  );
}
