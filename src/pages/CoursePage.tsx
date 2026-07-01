import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Lightbulb, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/Badge";
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
        className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Trimester {course.trimester}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8">
        {/* Left Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[#EAECEF] bg-white p-5">
            <div className="rounded-xl bg-[#4F7CFF]/10 p-3 w-fit mb-4">
              <BookOpen className="w-6 h-6 text-[#4F7CFF]" />
            </div>
            <h2 className="font-semibold text-lg text-[#1F2937]">{course.course_name}</h2>
            <p className="text-sm text-[#4F7CFF] font-medium mt-0.5">{course.course_code}</p>
            <Badge className="mt-3">Trimester {course.trimester}</Badge>
          </div>

          <div className="rounded-2xl border border-[#EAECEF] bg-white p-5">
            <h3 className="font-semibold text-sm text-[#1F2937] mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`text-left px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF] font-medium"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50"
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
                        : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50"
                    }`}
                  >
                    {getResourceTypeLabel(tab.id as ResourceType)} ({typeCounts[tab.id]})
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div>
          <div className="rounded-2xl border border-[#EAECEF] bg-white p-6 mb-6">
            <h1 className="text-2xl font-bold text-[#1F2937]">{course.course_name}</h1>
            <p className="text-sm text-[#4F7CFF] font-medium mt-1">{course.course_code}</p>
            {course.description && (
              <p className="text-[#6B7280] mt-3">{course.description}</p>
            )}
            <div className="flex items-center gap-2 mt-4">
              <GraduationCap className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm text-[#6B7280]">
                {resources?.length ?? 0} resources available
              </span>
            </div>
          </div>

          <Tabs tabs={resourceTabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="mt-6 space-y-4">
            {resourcesLoading && <SkeletonLoader count={3} height="h-24" />}
            {error && <ErrorState message={error.message} onRetry={() => refetch()} />}
            {!resourcesLoading && !error && filteredResources.length === 0 && (
              <EmptyState
                title="No resources found"
                description={activeTab === "all" ? "No resources added for this course yet." : `No ${getResourceTypeLabel(activeTab as ResourceType).toLowerCase()} resources available.`}
              />
            )}
            {!resourcesLoading && filteredResources.map((resource: Resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-[#EAECEF] bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#6B7280]" />
              <h3 className="font-semibold text-sm text-[#1F2937]">Contributors</h3>
            </div>
            {contributors && contributors.length > 0 ? (
              <ul className="space-y-2">
                {contributors.map((c, i) => (
                  <li key={i}>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] shrink-0" />
                        {c.name}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] shrink-0" />
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#6B7280]">No contributors yet.</p>
            )}
          </div>

          <div className="rounded-2xl border border-[#EAECEF] bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#6B7280]" />
              <h3 className="font-semibold text-sm text-[#1F2937]">Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li className="flex gap-2"><span className="text-[#4F7CFF]">•</span><span>Use the tabs to filter resources by type.</span></li>
              <li className="flex gap-2"><span className="text-[#4F7CFF]">•</span><span>All resources open in a new tab.</span></li>
              <li className="flex gap-2"><span className="text-[#4F7CFF]">•</span><span>Authors and contributors are credited on each resource.</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
