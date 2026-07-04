import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { CourseCard } from "../components/ui/CourseCard";
import { EmptyState } from "../components/ui/EmptyState";
import { CardSkeleton } from "../components/ui/SkeletonLoader";
import { SEO } from "../components/SEO";
import { useAllCourses } from "../hooks/useCourses";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [input, setInput] = useState(urlQuery);
  const debouncedInput = useDebounce(input, 200);
  const { data: allCourses, isLoading } = useAllCourses();

  useEffect(() => {
    setSearchParams(debouncedInput ? { q: debouncedInput } : {}, { replace: true });
  }, [debouncedInput, setSearchParams]);

  const filtered = debouncedInput.trim()
    ? (allCourses ?? []).filter(
        (c) =>
          c.course_name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
          c.course_code.toLowerCase().includes(debouncedInput.toLowerCase())
      )
    : allCourses ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SEO
        title="Search Courses"
        description="Search for CSE courses by name or course code at Acadexa."
        url="/search"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937] dark:text-slate-100 mb-1">Search Courses</h1>
        <p className="text-[#6B7280] dark:text-slate-400">Find courses by name or course code.</p>
      </div>

      <div className="max-w-xl mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search by course name or code…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="w-full rounded-2xl border border-[#EAECEF] bg-white px-5 py-4 pl-12 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 text-lg dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {input && (
        <p className="text-sm text-[#6B7280] dark:text-slate-400 mb-6">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{input}"
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={input ? "No courses found" : "No courses available"}
          description={
            input
              ? `No results matching "${input}". Try a different term.`
              : "Courses will appear here once they are added."
          }
        />
      )}
    </div>
  );
}
