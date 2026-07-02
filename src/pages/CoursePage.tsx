import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Lightbulb, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { ResourceCard } from "../components/ui/ResourceCard";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { useCourse } from "../hooks/useCourses";
import { useResourcesByCourse, useContributorsByCourse } from "../hooks/useResources";
import { getResourceTypeLabel } from "../utils/resourceHelpers";
import type { ResourceType, Resource } from "../types";

const resourceTabs = [
  { id: "all", label: "All" },
  { id: "playlist", label: "Playlists" },
  { id: "drive", label: "Drive" },
  { id: "github", label: "GitHub" },
  { id: "question_bank", label: "Question Banks" },
  { id: "notes", label: "Notes" },
  { id: "book", label: "Books" },
  { id: "other", label: "Other" },
];

export function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading: courseLoading } = useCourse(id!);
  const { data: resources, isLoading: resourcesLoading, error, refetch } = useResourcesByCourse(id!);
  const { data: contributors } = useContributorsByCourse(id!);
  const [activeTab, setActiveTab] = useState("all");

  if (courseLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <SkeletonLoader count={3} height="h-24" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <EmptyState title="Course not found" description="This course might have been removed." />
      </div>
    );
  }

  const filteredResources = activeTab === "all"
    ? (resources ?? [])
    : (resources ?? []).filter((r: Resource) => r.type === activeTab);

  const typeCounts = (resources ?? []).reduce<Record<string, number>>((acc, r: Resource) => {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to={`/trimester/${course.trimester}`}
        className="inline-flex items-center gap-1 text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Trimester {course.trimester}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,760px)_200px] gap-8 justify-center">
        {/* Left Sidebar */}
        <aside className="order-2 lg:order-none space-y-6">
          <div className="lg:hidden rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 w-fit">
                    <BookOpen className="w-5 h-5 text-[#4F7CFF]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100">
                      {course.course_name}
                    </h1>
                    <p className="text-sm text-[#4F7CFF] font-medium mt-1">
                      {course.course_code}
                    </p>
                  </div>
                </div>

                {course.description && (
                  <p className="text-[#6B7280] dark:text-slate-400 mt-3">{course.description}</p>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <GraduationCap className="w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                  <span className="text-sm text-[#6B7280] dark:text-slate-400">
                    {resources?.length ?? 0} resources available
                  </span>
                  {course.trimester && (
                    <Badge className="ml-3">Trimester {course.trimester}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h3 className="font-semibold text-sm text-[#1F2937] dark:text-slate-100 mb-3">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF] font-medium"
                    : "text-[#6B7280] dark:text-slate-400 hover:text-[#1F2937] dark:hover:text-slate-200 hover:bg-[#EAECEF]/50 dark:hover:bg-slate-800"
                }`}
              >
                All Resources
              </button>
              {resourceTabs.slice(1).map((tab) => {
                if (!typeCounts[tab.id]) return null;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#4F7CFF]/10 text-[#4F7CFF] font-medium"
                        : "text-[#6B7280] dark:text-slate-400 hover:text-[#1F2937] dark:hover:text-slate-200 hover:bg-[#EAECEF]/50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {getResourceTypeLabel(tab.id as ResourceType)} (
                    {typeCounts[tab.id]})
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="order-2 lg:order-none">
          <div className="hidden lg:block rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 w-fit">
                    <BookOpen className="w-5 h-5 text-[#4F7CFF]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100">
                      {course.course_name}
                    </h1>
                    <p className="text-sm text-[#4F7CFF] font-medium mt-1">
                      {course.course_code}
                    </p>
                  </div>
                </div>

                {course.description && (
                  <p className="text-[#6B7280] dark:text-slate-400 mt-3">{course.description}</p>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <GraduationCap className="w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                  <span className="text-sm text-[#6B7280] dark:text-slate-400">
                    {resources?.length ?? 0} resources available
                  </span>
                  {course.trimester && (
                    <Badge className="ml-3">Trimester {course.trimester}</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Tabs
            tabs={resourceTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="mt-6 space-y-4">
            {resourcesLoading && <SkeletonLoader count={3} height="h-24" />}
            {error && (
              <ErrorState message={error.message} onRetry={() => refetch()} />
            )}
            {!resourcesLoading && !error && filteredResources.length === 0 && (
              <EmptyState
                title="No resources found"
                description={
                  activeTab === "all"
                    ? "No resources added for this course yet."
                    : `No ${getResourceTypeLabel(activeTab as ResourceType).toLowerCase()} resources available.`
                }
              />
            )}
            {!resourcesLoading &&
              filteredResources.map((resource: Resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="order-3 lg:order-none space-y-6">
          <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#6B7280] dark:text-slate-400" />
              <h3 className="font-semibold text-sm text-[#1F2937] dark:text-slate-100">Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#6B7280] dark:text-slate-400">
              <li className="flex gap-2">
                <span className="text-[#4F7CFF]">•</span>
                <span>Use the tabs to filter resources by type.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#4F7CFF]">•</span>
                <span>All resources open in a new tab.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#4F7CFF]">•</span>
                <span>
                  Authors and contributors are credited on each resource.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#6B7280] dark:text-slate-400" />
              <h3 className="font-semibold text-sm text-[#1F2937] dark:text-slate-100">
                Contributors
              </h3>
            </div>
            {contributors && contributors.length > 0 ? (
              <ul className="space-y-2">
                {contributors.map((c, i) => (
                  <li key={i}>
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] shrink-0" />
                        {c.name}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] shrink-0" />
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#6B7280] dark:text-slate-400">No contributors yet.</p>
            )}
          </div>

          <div className="pt-1">
            <Link to="/contribute" className="inline-flex">
              <Button size="sm" variant="ghost">
                Contribute
              </Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
