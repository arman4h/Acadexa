import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "../components/ui/SectionTitle";
import { CourseCard } from "../components/ui/CourseCard";
import { Input } from "../components/ui/Input";
import { SkeletonLoader, CardSkeleton } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { useSemester } from "../hooks/useSemesters";
import { useCoursesBySemester } from "../hooks/useCourses";
import type { Course } from "../types";

export function SemesterPage() {
  const { id } = useParams<{ id: string }>();
  const { data: semester, isLoading: semesterLoading } = useSemester(id!);
  const { data: courses, isLoading: coursesLoading, error, refetch } = useCoursesBySemester(id!);
  const [search, setSearch] = useState("");

  const filtered = (courses ?? []).filter(
    (c: Course) =>
      c.course_name.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code.toLowerCase().includes(search.toLowerCase())
  );

  if (semesterLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <SkeletonLoader count={1} height="h-8" width="w-48" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/semesters"
        className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to semesters
      </Link>

      <SectionTitle subtitle={`${courses?.length ?? 0} courses available`}>
        {semester?.name ?? "Semester"}
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
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {error && <ErrorState message={error.message} onRetry={() => refetch()} />}

      {!coursesLoading && !error && filtered.length === 0 && (
        <EmptyState
          title="No courses found"
          description={search ? "Try a different search term." : "No courses available for this semester yet."}
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
