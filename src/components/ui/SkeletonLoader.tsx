interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
}

export function SkeletonLoader({
  count = 3,
  height = "h-24",
  width = "w-full",
}: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} ${width} rounded-xl bg-[#EAECEF]/60 dark:bg-slate-800 animate-pulse`}
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 animate-pulse">
      <div className="h-4 w-24 bg-[#EAECEF]/60 dark:bg-slate-800 rounded mb-3" />
      <div className="h-5 w-3/4 bg-[#EAECEF]/60 dark:bg-slate-800 rounded mb-2" />
      <div className="h-4 w-1/2 bg-[#EAECEF]/60 dark:bg-slate-800 rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-[#EAECEF]/60 dark:bg-slate-800 rounded-full" />
        <div className="h-6 w-20 bg-[#EAECEF]/60 dark:bg-slate-800 rounded-full" />
      </div>
    </div>
  );
}
