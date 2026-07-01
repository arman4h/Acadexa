import { useQuery } from "@tanstack/react-query";
import { Check, Trash2, ExternalLink } from "lucide-react";
import { useContributions, useApproveContribution, useDeleteContribution } from "../../hooks/useResources";
import { getAllCourses } from "../../services/courseService";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { getResourceIcon, getResourceTypeLabel } from "../../utils/resourceHelpers";

export function AdminContributions() {
  const { data: contributions, isLoading } = useContributions();
  const { data: courses } = useQuery({ queryKey: ["courses", "all"], queryFn: getAllCourses });
  const approveMut = useApproveContribution();
  const deleteMut = useDeleteContribution();

  function getCourseName(courseId: string): string {
    return courses?.find((c) => c.id === courseId)?.course_code ?? courseId;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Contributions</h1>
      <p className="text-sm text-[#6B7280] mb-6">Review user-submitted resources. Approving creates a resource and removes the contribution.</p>

      {!isLoading && (!contributions || contributions.length === 0) && (
        <EmptyState title="No pending contributions" description="User-submitted resources will appear here for review." />
      )}

      <div className="space-y-3">
        {contributions?.map((c) => {
          const Icon = getResourceIcon(c.type);
          return (
            <div key={c.id} className="rounded-2xl border border-[#EAECEF] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 shrink-0">
                    <Icon className="w-4 h-4 text-[#4F7CFF]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-[#1F2937] truncate">{c.title}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#6B7280] mt-0.5">
                      <span>{getResourceTypeLabel(c.type)}</span>
                      <span>→ {getCourseName(c.course_id)}</span>
                      {c.author && <span>by {c.author}</span>}
                      {c.contributor_name && <span>submitted by {c.contributor_name}</span>}
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[#4F7CFF] hover:underline">
                        <ExternalLink className="w-3 h-3" /> preview
                      </a>
                    </div>
                    {c.description && (
                      <p className="text-sm text-[#6B7280] mt-1.5 line-clamp-2">{c.description}</p>
                    )}
                    {c.created_at && (
                      <p className="text-xs text-[#9CA3AF] mt-1">{new Date(c.created_at).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => approveMut.mutate(c.id!)}
                    disabled={approveMut.isPending}
                  >
                    <Check className="w-4 h-4" /> Approve
                  </Button>
                  <button
                    onClick={() => deleteMut.mutate(c.id!)}
                    disabled={deleteMut.isPending}
                    className="p-2 rounded-xl text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
