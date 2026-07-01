import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "../components/ui/Input";
import { CourseCard } from "../components/ui/CourseCard";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { useSearchCourses } from "../hooks/useCourses";
import { SectionTitle } from "../components/ui/SectionTitle";
import { useDebounce } from "../hooks/useDebounce";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const debouncedQuery = useDebounce(query, 200);
  const { data: results, isLoading, error } = useSearchCourses(debouncedQuery);

  const handleChange = (value: string) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionTitle subtitle="Search by course code, course name, or faculty.">
        Search
      </SectionTitle>

      <div className="max-w-xl mb-8">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Search courses..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus
        />
      </div>

      {query && (
        <p className="text-sm text-[#6B7280] mb-6">
          {isLoading
            ? "Searching..."
            : `${results?.length ?? 0} result${results?.length !== 1 ? "s" : ""} for "${query}"`}
        </p>
      )}

      {error && <ErrorState message={error.message} />}

      {results && results.length === 0 && query && (
        <EmptyState
          title="No courses found"
          description={`No results matching "${query}". Try a different search term.`}
        />
      )}

      {results && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {!query && !results && (
        <EmptyState
          title="Search for courses"
          description="Type a course code, name, or faculty name to get started."
        />
      )}
    </div>
  );
}
