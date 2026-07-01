import { SectionTitle } from "../components/ui/SectionTitle";
import { TrimesterCard } from "../components/ui/TrimesterCard";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { useTrimesters } from "../hooks/useTrimesters";

export function Trimesters() {
  const { data: trimesters, isLoading, error, refetch } = useTrimesters();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionTitle subtitle="Browse all trimesters and find the courses you need.">
        Trimesters
      </SectionTitle>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonLoader count={6} height="h-32" />
        </div>
      )}

      {error && <ErrorState message={error.message} onRetry={() => refetch()} />}

      {trimesters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trimesters.map((trimester) => (
            <TrimesterCard key={trimester.id} trimester={trimester} />
          ))}
        </div>
      )}
    </div>
  );
}
