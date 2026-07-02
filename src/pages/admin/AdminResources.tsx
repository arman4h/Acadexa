import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { getAllCourses } from "../../services/courseService";
import { getResourcesByCourse, createResource, updateResource, deleteResource } from "../../services/resourceService";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { EmptyState } from "../../components/ui/EmptyState";
import { resourceTypes, getResourceIcon } from "../../utils/resourceHelpers";
import type { Resource, ResourceType } from "../../types";

export function AdminResources() {
  const queryClient = useQueryClient();
  const { data: courses } = useQuery({ queryKey: ["courses", "all"], queryFn: getAllCourses });
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const { data: resources } = useQuery({
    queryKey: ["resources", "course", selectedCourseId],
    queryFn: () => getResourcesByCourse(selectedCourseId),
    enabled: !!selectedCourseId,
  });

  const [editing, setEditing] = useState<Resource | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [type, setType] = useState<ResourceType>("website");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [contributorUrl, setContributorUrl] = useState("");

  const createMut = useMutation({
    mutationFn: () => createResource({ course_id: courseId, type, title, description: description || undefined, url, author: author || undefined, contributor_name: contributorName || undefined, contributor_url: contributorUrl || undefined }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["resources"] }); resetForm(); },
  });

  const updateMut = useMutation({
    mutationFn: () => updateResource(editing!.id, { type, title, description: description || undefined, url, author: author || undefined, contributor_name: contributorName || undefined, contributor_url: contributorUrl || undefined }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["resources"] }); resetForm(); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteResource(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resources"] }),
  });

  function resetForm() { setShowForm(false); setEditing(null); setCourseId(""); setType("website"); setTitle(""); setDescription(""); setUrl(""); setAuthor(""); setContributorName(""); setContributorUrl(""); }

  function startEdit(r: Resource) {
    setEditing(r); setCourseId(r.course_id); setType(r.type); setTitle(r.title);
    setDescription(r.description ?? ""); setUrl(r.url); setAuthor(r.author ?? "");
    setContributorName(r.contributor_name ?? ""); setContributorUrl(r.contributor_url ?? ""); setShowForm(true);
  }

  function startCreate() {
    const nextCourseId = selectedCourseId || (courses?.length ? String(courses[0].id) : "");
    setEditing(null);
    setCourseId(nextCourseId);
    setType("website");
    setTitle("");
    setDescription("");
    setUrl("");
    setAuthor("");
    setContributorName("");
    setContributorUrl("");
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Resources</h1>
        <Button onClick={startCreate}><Plus className="w-4 h-4" /> Add Resource</Button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Filter by Course</label>
        <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} className="w-full max-w-md rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10">
          <option value="">Select a course</option>
          {courses?.map((c) => <option key={c.id} value={c.id}>{c.course_code} — {c.course_name}</option>)}
        </select>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-[#EAECEF] bg-white p-5 mb-6">
          <h2 className="font-semibold text-[#1F2937] mb-4">{editing ? "Edit Resource" : "New Resource"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Course</label>
              <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10">
                <option value="">-- Select a Course --</option>
                {courses?.map((c) => <option key={c.id} value={c.id}>{c.course_code} — {c.course_name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as ResourceType)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10">
                {resourceTypes.map((rt) => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Resource title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">URL</label>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Author (optional)</label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Teacher or writer name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Contributor Name (optional)</label>
              <Input value={contributorName} onChange={(e) => setContributorName(e.target.value)} placeholder="Who submitted this?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Contributor URL (optional)</label>
              <Input value={contributorUrl} onChange={(e) => setContributorUrl(e.target.value)} placeholder="Facebook, LinkedIn, etc." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Description (optional)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 resize-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => (editing ? updateMut : createMut).mutate()} disabled={createMut.isPending || updateMut.isPending || !title || !url || !courseId}>
              {editing ? "Save" : "Create"}
            </Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      {!selectedCourseId && <EmptyState title="Select a course" description="Choose a course from the dropdown to view its resources." />}

      {selectedCourseId && !resources?.length && <EmptyState title="No resources" description="This course has no resources yet. Add one." />}

      <div className="space-y-2">
        {resources?.map((r) => {
          const Icon = getResourceIcon(r.type);
          return (
            <div key={r.id} className="rounded-2xl border border-[#EAECEF] bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="rounded-xl bg-[#4F7CFF]/10 p-2 shrink-0">
                  <Icon className="w-4 h-4 text-[#4F7CFF]" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[#1F2937] truncate">{r.title}</p>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <span>{r.type}</span>
                    {r.author && <span>— {r.author}</span>}
                    {r.contributor_name && <span>(by {r.contributor_name})</span>}
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[#4F7CFF] hover:underline">
                      <ExternalLink className="w-3 h-3" /> open
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => startEdit(r)} className="p-2 rounded-xl text-[#6B7280] hover:text-[#4F7CFF] hover:bg-[#EAECEF]/50 transition-all duration-150 cursor-pointer" aria-label="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => deleteMut.mutate(r.id)} className="p-2 rounded-xl text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer" aria-label="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
