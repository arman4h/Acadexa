import { SectionTitle } from "../components/ui/SectionTitle";
import { SemesterCard } from "../components/ui/SemesterCard";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { useSemesters } from "../hooks/useSemesters";

export function Semesters() {
  const { data: semesters, isLoading, error, refetch } = useSemesters();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionTitle subtitle="Browse all semesters and find the courses you need.">
        Semesters
      </SectionTitle>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonLoader count={6} height="h-32" />
        </div>
      )}

      {error && <ErrorState message={error.message} onRetry={() => refetch()} />}

      {semesters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {semesters.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} />
          ))}
        </div>
      )}
    </div>
  );
}
