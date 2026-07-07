import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "../components/ui/SectionTitle";
import { CourseCard } from "../components/ui/CourseCard";
import { CardSkeleton } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { SEO } from "../components/SEO";
import { useTrimester } from "../hooks/useTrimesters";
import { useCoursesByTrimester } from "../hooks/useCourses";
import { useDebounce } from "../hooks/useDebounce";

export function TrimesterPage() {
  const { id } = useParams<{ id: string }>();
  const trimesterNum = parseInt(id ?? "0");
  const { data: trimester, isLoading: trimesterLoading } = useTrimester(id!);
  const { data: courses, isLoading: coursesLoading, error, refetch } = useCoursesByTrimester(trimesterNum);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const filtered = (courses ?? []).filter(
    (c) =>
      c.course_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      c.course_code.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (trimesterLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="h-8 w-48 bg-[#EAECEF]/60 dark:bg-slate-800 rounded animate-pulse mb-8" />
      </div>
    );
  }

  if (!trimester) {
    return <EmptyState title="Trimester not found" />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SEO
        title={trimester.name}
        description={`${trimester.name} courses and resources at UIU CSE. Browse ${courses?.length ?? 0} courses with playlists, notes, question banks at United International University.`}
        url={`/trimester/${id}`}
        keywords={`${trimester.name}, UIU ${trimester.name}, UIU CSE courses, United International University courses`}
      />
      <Link
        to="/trimesters"
        className="inline-flex items-center gap-1 text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to trimesters
      </Link>

      <SectionTitle subtitle={`${courses?.length ?? 0} courses available`}>
        {trimester.name}
      </SectionTitle>

      <div className="max-w-md mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Filter courses by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 pl-11 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>
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
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
