import { Skeleton } from '@/components/ui/skeleton';

/** Mirrors the dashboard's layout while the applications load. */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-5xl p-4 sm:p-6"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading your applications...</span>
      <div aria-hidden className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-64 max-w-[50vw]" />
          </div>
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-[5.25rem] rounded-lg" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }, (_, index) => (
            <Skeleton key={index} className="h-6 w-20 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-9 w-full sm:max-w-sm" />
        <div className="divide-y rounded-lg border">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-3">
              <div className="flex flex-1 flex-col gap-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48 max-w-full" />
                <Skeleton className="h-3 w-40 max-w-full" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
