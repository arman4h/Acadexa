import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { Input } from "../components/ui/Input";
import { TrimesterCard } from "../components/ui/TrimesterCard";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { useTrimesters } from "../hooks/useTrimesters";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const { data: trimesters, isLoading, error, refetch } = useTrimesters();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] tracking-tight">
          Find. Learn. Succeed.
        </h1>
        <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto">
          Browse playlists, notes, question banks and study resources for every course.
        </p>
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
          <Input
            icon={<Search className="w-5 h-5" />}
            placeholder="Search courses by code or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#1F2937]">Trimesters</h2>
          <Link
            to="/trimesters"
            className="flex items-center gap-1 text-sm font-medium text-[#4F7CFF] hover:text-[#3B66E0] transition-colors duration-150"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

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
      </section>
    </div>
  );
}
