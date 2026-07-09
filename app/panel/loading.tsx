import { Skeleton } from "@/components/primitives/skeleton";

/** Dashboard loading state mirroring the real layout. */
export default function PanelLoading() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 pt-2 md:gap-5" aria-busy>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Skeleton className="h-56 w-full rounded-(--radius-2xl)" />
      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-52 w-full rounded-(--radius-2xl)" />
          <Skeleton className="h-72 w-full rounded-(--radius-2xl)" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-48 w-full rounded-(--radius-2xl)" />
          <Skeleton className="h-56 w-full rounded-(--radius-2xl)" />
        </div>
      </div>
    </div>
  );
}
