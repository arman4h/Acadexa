import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "../components/ui/SectionTitle";
import { CourseCard } from "../components/ui/CourseCard";
import { Input } from "../components/ui/Input";
import { CardSkeleton } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { useTrimester } from "../hooks/useTrimesters";
import { useCoursesByTrimester } from "../hooks/useCourses";
import type { Course } from "../types";

export function TrimesterPage() {
  const { id } = useParams<{ id: string }>();
  const trimesterNum = parseInt(id ?? "0");
  const { data: trimester, isLoading: trimesterLoading } = useTrimester(id!);
  const { data: courses, isLoading: coursesLoading, error, refetch } = useCoursesByTrimester(trimesterNum);
  const [search, setSearch] = useState("");

  const filtered = (courses ?? []).filter(
    (c: Course) =>
      c.course_name.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code.toLowerCase().includes(search.toLowerCase())
  );

  if (trimesterLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="h-8 w-48 bg-[#EAECEF]/60 rounded animate-pulse mb-8" />
      </div>
    );
  }

  if (!trimester) {
    return <EmptyState title="Trimester not found" />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/trimesters"
        className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to trimesters
      </Link>

      <SectionTitle subtitle={`${courses?.length ?? 0} courses available`}>
        {trimester.name}
      </SectionTitle>

      <div className="max-w-md mb-8">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Filter courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {coursesLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      )}

      {error && <ErrorState message={error.message} onRetry={() => refetch()} />}

      {!coursesLoading && !error && filtered.length === 0 && (
        <EmptyState
          title="No courses found"
          description={search ? "Try a different search term." : "No courses available for this trimester yet."}
        />
      )}

      {!coursesLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
